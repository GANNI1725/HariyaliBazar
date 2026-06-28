import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ShoppingBag, ArrowRight, Trash2, Sprout, X, Construction } from 'lucide-react'
import toast from 'react-hot-toast'
import { useCart } from '../context/CartContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import CartItem from '../components/cart/CartItem'
import Button from '../components/shared/Button'
import ConfirmModal from '../components/shared/ConfirmModal'

const ComingSoonModal = ({ onClose }) => {
  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[120] bg-[var(--color-pure-black)]/70 backdrop-blur-sm flex items-center justify-center p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
      >
        <motion.div
          initial={{ scale: 0.85, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: 'spring', duration: 0.45 }}
          onClick={(e) => e.stopPropagation()}
          className="bg-[var(--color-card)] rounded-3xl shadow-2xl max-w-md w-full p-8 text-center relative overflow-hidden"
        >
          <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full bg-[var(--color-sprout)]/20" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-[var(--color-leaf)]/10" />

          <button
            onClick={onClose}
            aria-label="Close"
            className="absolute top-3 right-3 p-2 rounded-full hover:bg-[var(--color-border)] text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"
          >
            <X size={18} />
          </button>

          <div className="w-20 h-20 mx-auto mb-5 rounded-full bg-[var(--color-clay)]/20 flex items-center justify-center">
            <Construction size={40} className="text-[var(--color-clay)]" />
          </div>

          <h2 className="font-[var(--font-heading)] text-2xl text-[var(--color-forest)] mb-2">
            Coming Soon!
          </h2>
          <p className="text-[var(--color-text)]/70 mb-6 max-w-xs mx-auto">
            Online ordering is almost here! We're working hard to bring you a smooth checkout experience. Stay tuned!
          </p>
          <Button onClick={onClose}>Got it</Button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

const Cart = () => {
  useDocumentTitle('Cart')
  const { items, subtotal, totalItems, clearCart } = useCart()
  const [showComingSoon, setShowComingSoon] = useState(false)
  const [showClearConfirm, setShowClearConfirm] = useState(false)

  const onPlaceOrder = () => {
    setShowComingSoon(true)
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full py-6 sm:py-14"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-[var(--font-heading)] text-2xl sm:text-4xl text-[var(--color-forest)] mb-1 sm:mb-2">
          Shopping Cart
        </h1>
        <p className="text-sm sm:text-base text-[var(--color-text)]/70 mb-6 sm:mb-8">
          {totalItems > 0
            ? `You have ${totalItems} item${totalItems > 1 ? 's' : ''} in your cart`
            : 'Your cart is currently empty'}
        </p>

        {items.length === 0 && !showComingSoon && (
          <div className="text-center py-12 sm:py-20 bg-[var(--color-border)] rounded-2xl">
            <div className="w-20 h-20 rounded-full bg-[var(--color-card)] mx-auto mb-5 flex items-center justify-center">
              <ShoppingBag size={36} className="text-[var(--color-leaf)]" />
            </div>
            <h2 className="font-[var(--font-heading)] text-2xl text-[var(--color-forest)] mb-2">
              Nothing here yet
            </h2>
            <p className="text-[var(--color-text)]/70 mb-6 max-w-md mx-auto">
              Discover fresh, organic produce from Nepali farmers and start filling your cart.
            </p>
            <Link to="/products">
              <Button size="lg">
                Browse Products <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        )}

        {items.length > 0 && (
          <div className="grid lg:grid-cols-[1fr_360px] gap-8">
            <div className="bg-[var(--color-card)] rounded-2xl p-2 sm:p-6 border border-[var(--color-border)]">
              <div className="divide-y divide-[var(--color-border)]">
                {items.map((item) => (
                  <CartItem key={item.id} item={item} />
                ))}
              </div>
              <div className="flex justify-between items-center pt-4 mt-2 border-t border-[var(--color-border)]">
                <Link to="/products" className="text-sm text-[var(--color-leaf)] hover:text-[var(--color-forest)]">
                  ← Continue shopping
                </Link>
                <button
                  onClick={() => setShowClearConfirm(true)}
                  className="text-sm text-[var(--color-red)] hover:brightness-75 inline-flex items-center gap-1 focus-visible:outline-2 focus-visible:outline-[var(--color-red)] focus-visible:outline-offset-2 rounded"
                >
                  <Trash2 size={14} /> Clear cart
                </button>
              </div>
            </div>

            <aside className="bg-[var(--color-border)] rounded-2xl p-6 h-fit sticky top-24">
              <h3 className="font-[var(--font-heading)] text-xl text-[var(--color-forest)] mb-5">
                Order Summary
              </h3>
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-[var(--color-text)]/70">
                    Subtotal ({totalItems} items)
                  </span>
                  <span className="font-medium">₨ {subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[var(--color-text)]/70">Delivery</span>
                  <span className="text-[var(--color-leaf)] font-medium">
                    Calculated at checkout
                  </span>
                </div>
                <div className="flex justify-between pt-3 mt-3 border-t border-[var(--color-sprout)]/30 text-base font-semibold text-[var(--color-forest)]">
                  <span>Total</span>
                  <span>₨ {subtotal}</span>
                </div>
              </div>

              <Button fullWidth onClick={onPlaceOrder} className="mt-5">
                <Sprout size={18} /> Place Order
              </Button>
              <p className="text-xs text-[var(--color-text)]/60 text-center mt-3">
                Secure checkout · eSewa, Khalti, COD accepted
              </p>
            </aside>
          </div>
        )}
      </div>

      {showComingSoon && <ComingSoonModal onClose={() => setShowComingSoon(false)} />}

      <ConfirmModal
        isOpen={showClearConfirm}
        title="Clear cart?"
        message="Remove all items from your cart? This can't be undone."
        confirmLabel="Clear All"
        onConfirm={() => { clearCart(); setShowClearConfirm(false); toast.success('Cart cleared') }}
        onCancel={() => setShowClearConfirm(false)}
      />
    </motion.section>
  )
}

export default Cart
