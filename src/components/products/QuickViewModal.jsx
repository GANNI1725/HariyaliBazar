import PropTypes from 'prop-types'
import { AnimatePresence, motion } from 'framer-motion'
import { X, ShoppingCart, Heart, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import Badge from '../shared/Badge'
import Button from '../shared/Button'
import { lockScroll, unlockScroll } from '../../utils/scrollLock'

const QuickViewModal = ({ product, onClose }) => {
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const dialogRef = useRef(null)
  const closeBtnRef = useRef(null)
  const headingId = `qv-title-${product?.id ?? 'none'}`

  useEffect(() => {
    if (!product) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab' && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll(
          'a, button, input, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusables.length) return
        const first = focusables[0]
        const last = focusables[focusables.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)

    lockScroll()

    const t = setTimeout(() => closeBtnRef.current?.focus(), 30)
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
      clearTimeout(t)
    }
  }, [product, onClose])

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-[var(--color-pure-black)]/70 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={onClose}
        >
          <motion.div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={headingId}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--color-card)] rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative"
          >
            <button
              ref={closeBtnRef}
              onClick={onClose}
              aria-label="Close quick view"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-[var(--color-pure-white)] shadow text-[var(--color-text)] hover:bg-[var(--color-surface)] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
            >
              <X size={18} />
            </button>

            <div className="grid md:grid-cols-2 gap-0">
              <img
                src={product.images?.[0] || product.image || ''}
                alt={product.name}
                width="400"
                height="400"
                className="w-full h-72 md:h-full object-cover"
              />
              <div className="p-6 md:p-8 flex flex-col">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {product.isOrganic && <Badge type="organic" />}
                  {product.isLocal && <Badge type="local" />}
                  {product.isSameDay && <Badge type="sameday" />}
                </div>

                <h2 id={headingId} className="font-[var(--font-heading)] text-2xl text-[var(--color-forest)] mb-1">
                  {product.name}
                </h2>
                <p className="nepali-text text-xl text-[var(--color-text)]/70 mb-4">
                  {product.nameNepali}
                </p>

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-3xl font-bold text-[var(--color-leaf)]">
                    ₨ {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm line-through text-[var(--color-text)]/50">
                      ₨ {product.originalPrice}
                    </span>
                  )}
                  <span className="text-sm text-[var(--color-text)]/60">
                    / {product.unit}
                  </span>
                </div>

                <p className="text-sm text-[var(--color-text)]/80 mb-5">
                  {product.description}
                </p>

                <div className="flex gap-2 mb-4">
                  <Button
                    onClick={() => {
                      addItem(product)
                      onClose()
                    }}
                    disabled={!product.inStock}
                    className="flex-1"
                  >
                    <ShoppingCart size={16} />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => toggle(product)}
                    aria-label="Toggle wishlist"
                  >
                    <Heart
                      size={16}
                      fill={isWishlisted(product.id) ? 'currentColor' : 'none'}
                    />
                  </Button>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  onClick={onClose}
                  className="text-sm text-[var(--color-leaf)] hover:text-[var(--color-forest)] flex items-center gap-1 mt-auto"
                >
                  View full details <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

QuickViewModal.propTypes = {
  product: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}

export default QuickViewModal
