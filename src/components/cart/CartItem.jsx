import PropTypes from 'prop-types'
import { memo } from 'react'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { useCart } from '../../context/CartContext'

const getGramValue = (unit) => {
  if (!unit) return null
  const match = unit.match(/^(\d+)g$/)
  return match ? parseInt(match[1], 10) : null
}

const CartItem = memo(({ item }) => {
  const { updateQuantity, removeItem } = useCart()
  const isVeggieBox = item.selections
  const gramPerUnit = getGramValue(item.unit)
  const totalGrams = gramPerUnit ? item.quantity * gramPerUnit : null
  const quantityLabel = totalGrams !== null
    ? totalGrams >= 1000
      ? `${(totalGrams / 1000).toFixed(2)} kg`
      : `${totalGrams} g`
    : `${item.quantity} ${item.unit}`

  return (
    <div className="flex gap-3 sm:gap-4 py-4 border-b border-[var(--color-border-light)] last:border-0">
      <div className="shrink-0">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          width="96"
          height="96"
          className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2">
          <div className="min-w-0">
            <p className="font-semibold text-[var(--color-charcoal)] truncate">
              {item.name}
            </p>
            {item.nameNepali && (
              <p className="nepali-text text-base text-[var(--color-text-secondary)] truncate">
                {item.nameNepali}
              </p>
            )}
            {isVeggieBox && (
              <div className="mt-2 space-y-0.5">
                <p className="text-xs text-[var(--color-text-secondary)]">
                  🥦 {item.selections.vegetables.join(', ')}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  🍎 {item.selections.fruits.join(', ')}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  🎁 Farmer's Surprise
                </p>
                <p className="text-xs font-medium text-[var(--color-accent)] mt-1">
                  {item.selections.totalItems} items
                </p>
              </div>
            )}
          </div>
          <button
            onClick={() => removeItem(item.id)}
            aria-label={`Remove ${item.name}`}
            className="p-1.5 rounded-md hover:bg-[var(--color-error-bg)] text-[var(--color-error)] shrink-0 focus-visible:outline-2 focus-visible:outline-[var(--color-error)] focus-visible:outline-offset-2"
          >
            <Trash2 size={16} />
          </button>
        </div>

          <div className="mt-3 flex items-center justify-between gap-2">
          <div className="inline-flex items-center border border-[var(--color-leaf)]/30 rounded-lg">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - (item.unit === 'kg' ? 0.5 : 1))}
              aria-label="Decrease quantity"
              className="px-1.5 md:px-2 py-1 md:py-1.5 text-[var(--color-leaf)] hover:bg-[var(--color-hover)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
            >
              <Minus size={12} className="md:size-[14px]" />
            </button>
            <span className="px-2 text-xs md:text-sm font-medium min-w-[28px] text-center">
              {quantityLabel}
            </span>
            <button
              onClick={() => updateQuantity(item.id, item.quantity + (item.unit === 'kg' ? 0.5 : 1))}
              aria-label="Increase quantity"
              className="px-1.5 md:px-2 py-1 md:py-1.5 text-[var(--color-leaf)] hover:bg-[var(--color-hover)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
            >
              <Plus size={12} className="md:size-[14px]" />
            </button>
          </div>

          <div className="text-right">
            <p className="font-semibold text-[var(--color-forest)]">
              ₨ {item.price * item.quantity}
            </p>
            {item.originalPrice && (
              <p className="text-xs line-through text-[var(--color-text-secondary)]">
                ₨ {item.originalPrice * item.quantity}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
})

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
}

CartItem.displayName = 'CartItem'

export default CartItem
