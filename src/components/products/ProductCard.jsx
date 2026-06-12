import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { memo } from 'react'
import { Heart, ShoppingCart, Star, Eye, MapPin } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import Badge from '../shared/Badge'

const ProductCard = memo(({ product, onQuickView }) => {
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const inWish = isWishlisted(product.id)

  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0

  return (
    <motion.article
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-sm hover:shadow-strong border border-[var(--color-border-light)] hover:border-[var(--color-leaf)]/30 flex flex-col h-full transition-all duration-300"
    >
      <div className="relative overflow-hidden aspect-square bg-[var(--color-border-light)]">
        <Link to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
          <img
            src={product.images?.[0] || product.image || ''}
            alt={`${product.name} (${product.nameNepali})`}
            loading="lazy"
            width="500"
            height="500"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {discount > 0 && (
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-[var(--color-accent)] text-[var(--color-pure-white)] shadow-sm">
              -{discount}%
            </span>
          )}
          {!product.inStock && (
            <span className="px-2 py-1 rounded-full text-xs font-bold bg-[var(--color-error)] text-[var(--color-pure-white)] shadow-sm">
              Out of Stock
            </span>
          )}
          {product.isFeatured && product.inStock && (
            <Badge type="featured" size="sm" />
          )}
        </div>

        <button
          onClick={() => toggle(product)}
          aria-label={inWish ? 'Remove from wishlist' : 'Add to wishlist'}
          aria-pressed={inWish}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 ${
            inWish
              ? 'bg-[var(--color-accent)] text-[var(--color-pure-white)]'
              : 'bg-[var(--color-pure-white)]/90 text-[var(--color-text-secondary)] hover:bg-[var(--color-pure-white)] hover:scale-110 hover:text-[var(--color-accent)]'
          }`}
        >
          <Heart size={16} fill={inWish ? 'currentColor' : 'none'} />
        </button>

        {onQuickView && (
          <button
            onClick={() => onQuickView(product)}
            aria-label={`Quick view ${product.name}`}
            className="absolute bottom-3 right-3 w-9 h-9 rounded-full bg-[var(--color-pure-white)]/90 text-[var(--color-forest)] hover:bg-[var(--color-pure-white)] hover:scale-110 flex items-center justify-center shadow-sm transition-all duration-200 opacity-0 group-hover:opacity-100 focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
          >
            <Eye size={16} />
          </button>
        )}

        <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={() => product.inStock && addItem(product)}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            className="w-full bg-[var(--color-forest)] hover:bg-[var(--color-leaf)] text-[var(--color-pure-white)] text-xs font-semibold py-1.5 md:py-3 inline-flex items-center justify-center gap-1 disabled:bg-[var(--color-disabled)] disabled:cursor-not-allowed transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-[var(--color-pure-white)] focus-visible:outline-offset-[-2px]"
          >
            <ShoppingCart size={12} className="md:size-[14px]" /> Add to Cart
          </button>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-1">
          <Link
            to={`/products/${product.id}`}
            className="font-semibold text-[var(--color-charcoal)] hover:text-[var(--color-forest)] line-clamp-1 text-lg"
          >
            {product.name}
          </Link>
          <div className="flex items-center gap-0.5 text-xs text-[var(--color-gold)] shrink-0">
            <Star size={12} fill="currentColor" />
            <span className="font-medium">{product.rating}</span>
          </div>
        </div>

        <p className="nepali-text text-lg text-[var(--color-text-secondary)] mb-2 line-clamp-1">
          {product.nameNepali}
        </p>

        <div className="flex flex-wrap gap-1 mb-2">
          {product.isOrganic && <Badge type="organic" size="sm" />}
          {product.isSameDay && <Badge type="sameday" size="sm" />}
        </div>

        {product.district && (
          <p className="flex items-center gap-1 text-xs text-[var(--color-text-secondary)] mb-3">
            <MapPin size={10} />
            {product.district}
          </p>
        )}

        <div className="mt-auto flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-[var(--color-forest)]">
                ₨ {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs line-through text-[var(--color-text-secondary)]/60">
                  ₨ {product.originalPrice}
                </span>
              )}
            </div>
            <span className="text-xs text-[var(--color-text-secondary)]">
              per {product.unit}
            </span>
          </div>
          <button
            onClick={() => product.inStock && addItem(product)}
            disabled={!product.inStock}
            aria-label={`Add ${product.name} to cart`}
            className="md:hidden bg-[var(--color-forest)] hover:bg-[var(--color-leaf)] text-[var(--color-pure-white)] text-xs font-semibold py-1.5 px-3 rounded-lg inline-flex items-center justify-center gap-1 disabled:bg-[var(--color-disabled)] disabled:cursor-not-allowed transition-colors duration-200 shrink-0"
          >
            <ShoppingCart size={12} /> Add
          </button>
        </div>
      </div>
    </motion.article>
  )
})

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  onQuickView: PropTypes.func,
}

ProductCard.displayName = 'ProductCard'

export default ProductCard
