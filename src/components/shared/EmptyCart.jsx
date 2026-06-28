import PropTypes from 'prop-types'
import { ShoppingBag } from 'lucide-react'
import { Link } from 'react-router-dom'

const EmptyCart = ({ title, subtitle, ctaLabel, ctaTo }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-20 h-20 rounded-full bg-[var(--color-forest)]/10 flex items-center justify-center mb-4">
        <ShoppingBag size={36} className="text-[var(--color-forest)]" />
      </div>
      <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">{title || 'Nothing here yet'}</h3>
      <p className="text-sm text-[var(--color-text-secondary)] mb-6 max-w-xs">
        {subtitle || 'Your cart is feeling lonely.'}
      </p>
      <Link
        to={ctaTo || '/products'}
        className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--color-forest)] text-white text-sm font-semibold hover:bg-[var(--color-leaf)] transition-colors"
      >
        {ctaLabel || 'Start Shopping'}
      </Link>
    </div>
  )
}

EmptyCart.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ctaLabel: PropTypes.string,
  ctaTo: PropTypes.string,
}

export default EmptyCart
