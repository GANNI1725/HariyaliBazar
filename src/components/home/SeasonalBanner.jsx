import { motion } from 'framer-motion'
import { Sprout } from 'lucide-react'
import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useProducts } from '../../context/ProductContext'

const monthToSeason = (month) => {
  if ([2, 3, 4].includes(month)) return 'spring'
  if ([5, 6, 7].includes(month)) return 'summer'
  if ([8, 9, 10].includes(month)) return 'autumn'
  return 'winter'
}

const SeasonalBanner = () => {
  const season = monthToSeason(new Date().getMonth())

  const { products } = useProducts()

  const inSeason = useMemo(() => {
    return products
      .filter((p) => p.season?.includes(season) || p.season?.includes('all'))
      .slice(0, 6)
  }, [season, products])

  const monthName = new Date().toLocaleString('en-US', { month: 'long' })

  return (
    <section className="w-full py-10 sm:py-12 bg-gradient-to-r from-[var(--color-sprout)]/20 via-[var(--color-surface)] to-[var(--color-sprout)]/20 overflow-hidden border-y border-[var(--color-border-light)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="flex flex-col lg:flex-row items-center gap-6"
        >
          <div className="flex items-center gap-3 shrink-0">
            <motion.div
              animate={{ rotate: [0, 8, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="w-12 h-12 rounded-full bg-[var(--color-leaf)] text-[var(--color-pure-white)] flex items-center justify-center"
            >
              <Sprout size={22} />
            </motion.div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--color-sprout)] font-semibold">
                {monthName} — In Season Now
              </p>
              <p className="font-[var(--font-heading)] text-lg sm:text-xl text-[var(--color-pure-white)] drop-shadow-sm">
                Eat with the season 🌿
              </p>
            </div>
          </div>

          <div className="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-2 seasonal-grid">
            {inSeason.map((p) => (
              <Link
                key={p.id}
                to={`/products/${p.id}`}
                className="px-3 py-2 rounded-lg bg-[var(--color-card)] backdrop-blur-sm text-sm font-medium text-[var(--color-text)] border border-[var(--color-sprout)]/40 hover:bg-[var(--color-surface)] hover:border-[var(--color-sprout)] hover:shadow-sm transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 text-center"
              >
                <span className="text-sm font-semibold block">{p.name}</span>
                <span className="nepali-text text-[var(--color-text-secondary)] text-xs">{p.nameNepali}</span>
              </Link>
            ))}
          </div>
          <style>{`
            @media (max-width: 639px) {
              .seasonal-grid > :last-child:nth-child(odd) {
                grid-column: 1 / -1;
                justify-self: center;
                width: calc(50% - 0.25rem);
              }
            }
          `}</style>
        </motion.div>
      </div>
    </section>
  )
}

export default SeasonalBanner
