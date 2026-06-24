import { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import toast from 'react-hot-toast'

const WishlistContext = createContext(null)
const STORAGE_KEY = 'hariyali-wishlist'

const readStorage = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const WishlistProvider = ({ children }) => {
  const [ids, setIds] = useState(() => readStorage())
  const wishlistToastId = useRef(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
    } catch {
      /* ignore */
    }
  }, [ids])

  const isWishlisted = useCallback((id) => ids.includes(id), [ids])

  const toggle = useCallback((product) => {
    const willRemove = ids.includes(product.id)
    setIds((prev) =>
      willRemove
        ? prev.filter((i) => i !== product.id)
        : [...prev, product.id]
    )
    toast.dismiss(wishlistToastId.current)
    if (willRemove) {
      wishlistToastId.current = toast(`Removed from wishlist`, {
        icon: <span className="text-[var(--color-leaf)]">💔</span>,
      })
    } else {
      wishlistToastId.current = toast.success(`Added to wishlist`, { icon: '💚' })
    }
  }, [ids])

  const remove = useCallback((id) => {
    setIds((prev) => prev.filter((i) => i !== id))
  }, [])

  const clear = useCallback(() => setIds([]), [])

  const value = {
    ids,
    count: ids.length,
    isWishlisted,
    toggle,
    remove,
    clear,
  }

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>
}

export const useWishlist = () => {
  const ctx = useContext(WishlistContext)
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider')
  return ctx
}
