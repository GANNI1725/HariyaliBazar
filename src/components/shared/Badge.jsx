import PropTypes from 'prop-types'
import { Leaf, MapPin, Truck, ShieldCheck, Star } from 'lucide-react'

const map = {
  organic: { label: 'Organic', icon: Leaf, classes: 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]' },
  local: { label: 'Local', icon: MapPin, classes: 'bg-[var(--color-info-bg)] text-[var(--color-info-text)]' },
  sameday: { label: 'Same-Day', icon: Truck, classes: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]' },
  pesticidefree: {
    label: 'Pesticide-Free',
    icon: ShieldCheck,
    classes: 'bg-[var(--color-special-bg)] text-[var(--color-special-text)]',
  },
  featured: { label: 'Featured', icon: Star, classes: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]' },
}

const Badge = ({ type, children, className = '', size = 'md' }) => {
  const config = map[type]
  const Icon = config?.icon
  const sizeCls = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-2.5 py-1 text-xs'

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${
        config?.classes ?? 'bg-[var(--color-badge-default-bg)] text-[var(--color-badge-default-text)]'
      } ${sizeCls} ${className}`}
    >
      {Icon && <Icon size={size === 'sm' ? 10 : 12} aria-hidden />}
      {children ?? config?.label}
    </span>
  )
}

Badge.propTypes = {
  type: PropTypes.oneOf(['organic', 'local', 'sameday', 'pesticidefree']),
  children: PropTypes.node,
  className: PropTypes.string,
  size: PropTypes.oneOf(['sm', 'md']),
}

export default Badge
