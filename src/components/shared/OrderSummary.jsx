import PropTypes from 'prop-types'
import { ShoppingBag } from 'lucide-react'
import Button from './Button'

const OrderSummary = ({ subtotal, totalItems, onCheckout, checkoutLabel, deliveryFee }) => {
  const total = subtotal + (deliveryFee ?? 0)

  return (
    <div className="p-4 border-t border-[var(--color-border)] space-y-2">
      <div className="flex justify-between text-sm">
        <span className="text-[var(--color-text)]/70">Subtotal ({totalItems} items)</span>
        <span className="font-medium text-[var(--color-text)]">₨ {subtotal.toLocaleString('ne-NP')}</span>
      </div>
      {deliveryFee !== undefined && (
        <div className="flex justify-between text-sm">
          <span className="text-[var(--color-text)]/70">Delivery</span>
          <span className="font-medium text-[var(--color-text)]">{deliveryFee === 0 ? 'Free' : `₨ ${deliveryFee}`}</span>
        </div>
      )}
      <div className="flex justify-between text-base font-semibold pt-2 border-t border-[var(--color-border)]">
        <span>Total</span>
        <span>₨ {total.toLocaleString('ne-NP')}</span>
      </div>
      <Button variant="primary" fullWidth onClick={onCheckout} className="mt-2">
        <ShoppingBag size={16} /> {checkoutLabel || 'Checkout'}
      </Button>
    </div>
  )
}

OrderSummary.propTypes = {
  subtotal: PropTypes.number.isRequired,
  totalItems: PropTypes.number.isRequired,
  onCheckout: PropTypes.func.isRequired,
  checkoutLabel: PropTypes.string,
  deliveryFee: PropTypes.number,
}

export default OrderSummary
