import { AnimatePresence, motion } from 'framer-motion'
import { X, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useCart } from '../../context/CartContext'
import CartItem from './CartItem'
import Button from '../shared/Button'
import ConfirmModal from '../shared/ConfirmModal'
import { lockScroll, unlockScroll } from '../../utils/scrollLock'

const CartDrawer = () => {
  const { items, isOpen, closeCart, subtotal, totalItems, clearCart } = useCart()
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => e.key === 'Escape' && closeCart()
    document.addEventListener('keydown', onKey)

    lockScroll()

    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [isOpen, closeCart])

  const onCheckout = () => {
    toast('Checkout coming soon! 🚀', {
      icon: '🛒',
      duration: 3000,
    })
  }

  return (
    <>
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={closeCart}
            className="fixed inset-0 z-[90] bg-[var(--color-pure-black)]/50 backdrop-blur-sm"
          />
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
            className="fixed top-0 right-0 z-[91] h-full w-full max-w-md bg-[var(--color-background)] shadow-2xl flex flex-col"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-drawer-title"
          >
              <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
                <h2 id="cart-drawer-title" className="font-[var(--font-heading)] text-xl text-[var(--color-forest)] flex items-center gap-2">
                  <ShoppingBag size={20} />
                  Your Cart ({totalItems})
                </h2>
                <div className="flex items-center gap-1">
                  {items.length > 0 && (
                    <button
                      onClick={() => setShowClearConfirm(true)}
                      aria-label="Clear cart"
                      className="p-2 rounded-md hover:bg-[var(--color-error-bg)] text-[var(--color-error)] hover:text-[var(--color-error-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
                    >
                      <Trash2 size={18} />
                    </button>
                  )}
                  <button
                    onClick={closeCart}
                    aria-label="Close cart"
                    className="p-2 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

            <div className="flex-1 overflow-y-auto px-5">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center py-16">
                  <div className="w-20 h-20 rounded-full bg-[var(--color-border)] flex items-center justify-center mb-4">
                    <ShoppingBag size={32} className="text-[var(--color-leaf)]" />
                  </div>
                  <p className="text-[var(--color-text)]/70 mb-2">
                    Your cart is empty
                  </p>
                  <p className="text-sm text-[var(--color-text)]/60 mb-6">
                    Start adding some fresh organic produce!
                  </p>
                  <Link to="/products" onClick={closeCart}>
                    <Button>
                      Browse Products <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              ) : (
                <div>
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-[var(--color-border)] p-5 space-y-3 bg-[var(--color-surface)]">
                <div className="flex justify-between text-sm text-[var(--color-text)]/70">
                  <span>Subtotal</span>
                  <span>₨ {subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-[var(--color-text)]/70">
                  <span>Delivery</span>
                  <span className="text-[var(--color-leaf)] font-medium">Calculated at checkout</span>
                </div>
                <div className="flex justify-between text-lg font-semibold text-[var(--color-forest)] pt-2 border-t border-[var(--color-border)]">
                  <span>Total</span>
                  <span>₨ {subtotal}</span>
                </div>
                <div className="flex flex-col gap-2 pt-2">
                  <Button onClick={onCheckout} fullWidth>
                    Proceed to Checkout
                  </Button>
                  <Link to="/cart" onClick={closeCart}>
                    <Button variant="secondary" fullWidth>
                      View Full Cart
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>

      <ConfirmModal
        isOpen={showClearConfirm}
        title="Clear cart?"
        message="Remove all items from your cart? This can't be undone."
        confirmLabel="Clear All"
        onConfirm={() => { clearCart(); setShowClearConfirm(false); closeCart(); toast.success('Cart cleared') }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </>
  )
}

export default CartDrawer
