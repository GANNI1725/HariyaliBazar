import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Sparkles, GlassWater } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/products/ProductCard'
import QuickViewModal from '../components/products/QuickViewModal'

const juiceTypes = [
  { value: 'all', label: 'All Juices' },
  { value: 'citrus', label: 'Citrus' },
  { value: 'green', label: 'Greens' },
  { value: 'fruit', label: 'Fruit' },
  { value: 'creamy', label: 'Creamy' },
  { value: 'savoury', label: 'Savoury' },
]

const typeTags = {
  citrus: ['citrus'],
  green: ['green', 'detox', 'refreshing'],
  fruit: ['antioxidant', 'premium', 'fruit'],
  creamy: ['creamy'],
  savoury: ['savoury', 'spicy'],
}

const Juices = () => {
  const { getProductsByCategory } = useProducts()
  const [activeType, setActiveType] = useState('all')
  const [quickView, setQuickView] = useState(null)

  const juices = useMemo(() => getProductsByCategory('juices'), [getProductsByCategory])

  const filtered = useMemo(() => {
    if (activeType === 'all') return juices
    const tags = typeTags[activeType] || []
    return juices.filter((j) => (j.tags || []).some((t) => tags.includes(t)))
  }, [juices, activeType])

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="w-full py-6 sm:py-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8 text-center"
        >
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-clay)] mb-2 sm:mb-3">
            <Sparkles size={12} className="sm:size-[14px]" /> Cold-Pressed Daily
          </div>
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-4xl text-[var(--color-forest)] mb-2 flex items-center justify-center gap-2 sm:gap-3">
            <GlassWater size={24} className="sm:size-[32px] text-[var(--color-leaf)]" />
            Juice Bar
          </h1>
          <p className="text-[var(--color-text)]/70 max-w-xl mx-auto">
            Cold-pressed every morning from our own fresh produce. No straws, no sugar, no shortcuts — just pure, honest nutrition.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {juiceTypes.map((t) => (
            <button
              key={t.value}
              onClick={() => setActiveType(t.value)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all ${
                activeType === t.value
                  ? 'bg-[var(--color-forest)] text-[var(--color-pure-white)] shadow-md'
                  : 'bg-[var(--color-linen)] text-[var(--color-text)] hover:bg-[var(--color-sprout)] hover:text-[var(--color-pure-white)]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 bg-[var(--color-border)] rounded-2xl">
            <div className="w-20 h-20 rounded-full bg-[var(--color-card)] mx-auto mb-5 flex items-center justify-center">
              <GlassWater size={36} className="text-[var(--color-leaf)]" />
            </div>
            <h3 className="font-[var(--font-heading)] text-xl text-[var(--color-forest)] mb-2">
              No juices match this type
            </h3>
            <p className="text-[var(--color-text)]/70 mb-6 max-w-md mx-auto">
              Try selecting a different category above to browse all our fresh juices.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {filtered.map((j) => (
              <ProductCard key={j.id} product={j} onQuickView={setQuickView} />
            ))}
          </div>
        )}

        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
      </div>
    </motion.section>
  )
}

export default Juices