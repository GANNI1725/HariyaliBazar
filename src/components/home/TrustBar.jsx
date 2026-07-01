import { motion } from 'framer-motion'

const stats = [
  { icon: '🌱', value: 40, suffix: '+', label: 'Organic Products' },
  { icon: '👨‍🌾', value: 5, suffix: '+', label: 'Partner Farmers' },
  { icon: '🚚', value: 65, suffix: '+', label: 'Delivery Zones' },
  { icon: '⭐', value: 1, suffix: '', label: 'Same-Day Delivery', noValue: true },
  { icon: '📍', value: 1, suffix: '', label: 'Rupandehi & Beyond', noValue: true },
]

import { useCountUp } from '../../hooks/useCountUp'

const StatItem = ({ stat }) => {
  const [ref, display] = useCountUp(stat.value, 5000, stat.decimals || 0)
  return (
    <motion.span
      ref={ref}
      whileHover={{ y: -4, scale: 1.04 }}
      transition={{ duration: 0.3 }}
      className="inline-flex flex-col sm:flex-row items-center gap-0.5 sm:gap-2 text-[10px] sm:text-xs font-medium text-center sm:text-left whitespace-nowrap"
    >
      <span aria-hidden>{stat.icon}</span>
      {stat.noValue ? (
        <span>{stat.label}</span>
      ) : (
        <span><span className="tabular-nums">{display}</span>{stat.suffix} {stat.label}</span>
      )}
    </motion.span>
  )
}

const TrustBar = () => {
  return (
    <div className="w-full bg-[var(--color-background)] text-[var(--color-text)] overflow-hidden border-b border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-5">
        <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 sm:gap-4">
          {stats.map((s) => (
            <StatItem key={s.label} stat={s} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default TrustBar