import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { LogIn } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from './AuthContext'

const CartContext = createContext(null)

const STORAGE_KEY = 'hariyali-cart'

const readStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const CartProvider = ({ children }) => {
  const { isLoggedIn, isAdmin } = useAuth()
  const [items, setItems] = useState(() => readStorage())
  const [isOpen, setIsOpen] = useState(false)
  const [loginPromptOpen, setLoginPromptOpen] = useState(false)
  const cartToastId = useRef(null)
  const prevLoggedIn = useRef(isLoggedIn)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* ignore storage errors */
    }
  }, [items])

  useEffect(() => {
    if (prevLoggedIn.current && !isLoggedIn) {
      setItems([])
    }
    prevLoggedIn.current = isLoggedIn
  }, [isLoggedIn])

  const addItem = useCallback((product, qty = 1) => {
    if (!isLoggedIn) {
      setLoginPromptOpen(true)
      return
    }
    if (isAdmin) {
      toast.dismiss(cartToastId.current)
      const confirmed = window.confirm('Add item to cart?')
      if (!confirmed) return
    }
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id && !i.selections)
      if (existing) {
        return prev.map((i) =>
          i.id === product.id && !i.selections ? { ...i, quantity: i.quantity + qty } : i,
        )
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          nameNepali: product.nameNepali,
          slug: product.slug,
          price: product.price,
          unit: product.unit,
          image: product.images?.[0] || product.image,
          quantity: qty,
          originalPrice: product.originalPrice,
          selections: product.selections,
        },
      ]
    })
    toast.dismiss(cartToastId.current)
    cartToastId.current = toast.success(`${product.name} added to cart`, { icon: '🛒', duration: 1000 })
  }, [isLoggedIn, isAdmin])

  const removeItem = useCallback((id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }, [])

  const updateQuantity = useCallback((id, quantity) => {
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.id !== id))
      return
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)))
  }, [])

  const clearCart = useCallback(() => setItems([]), [])

  const openCart = useCallback(() => setIsOpen(true), [])
  const closeCart = useCallback(() => setIsOpen(false), [])

  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0)
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0)

  const value = {
    items,
    isOpen,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    subtotal,
    totalItems,
  }

  return (
    <CartContext.Provider value={value}>
      {children}

      <AnimatePresence>
        {loginPromptOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/40"
            onClick={() => setLoginPromptOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-sm p-6 text-center"
              onClick={e => e.stopPropagation()}
            >
              <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-forest)]/10 flex items-center justify-center mb-4">
                <LogIn size={28} className="text-[var(--color-forest)]" />
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">Login Required</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">
                Please log in to add items to your cart.
              </p>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setLoginPromptOpen(false)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { window.location.href = '/login' }}
                  className="px-4 py-2 rounded-lg bg-[var(--color-forest)] text-white text-sm font-medium hover:bg-[var(--color-leaf)] transition-colors"
                >
                  Log In
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
