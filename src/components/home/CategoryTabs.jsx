import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { categories } from '../../data/categories'
import { useProducts } from '../../context/ProductContext'
import ProductCard from '../products/ProductCard'
import SectionHeader from '../shared/SectionHeader'

const CategoryTabs = () => {
  const { products } = useProducts()
  const [active, setActive] = useState('vegetables')

  const filtered = useMemo(
    () => products.filter((p) => p.category === active).slice(0, 8),
    [active, products],
  )

  const visibleCategories = useMemo(() => categories.filter((c) => c.id !== 'juices'), [])

  const activeCat = visibleCategories.find((c) => c.id === active)

  return (
    <section className="w-full py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Shop by Category"
          title="Fresh from the Field"
          subtitle="Hand-picked, never sprayed. Every category sourced from trusted Nepali farmers."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {visibleCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActive(c.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                active === c.id
                  ? 'bg-[var(--color-forest)] text-[var(--color-pure-white)] shadow-md'
                  : 'bg-[var(--color-linen)] text-[var(--color-text)] hover:bg-[var(--color-sprout)] hover:text-[var(--color-pure-white)]'
              }`}
            >
              <span>{c.icon}</span>
              <span>{c.name}</span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 category-grid"
          >
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </motion.div>
        </AnimatePresence>
        <style>{`
          .category-grid > :last-child:nth-child(odd) {
            grid-column: 1 / -1;
            justify-self: center;
            width: calc(50% - 0.5rem);
          }
          .category-grid > :last-child:nth-child(odd) > * {
            max-width: 100%;
          }
        `}</style>

        <div className="mt-10 text-center">
          <Link
            to={`/products?category=${active}`}
            className="inline-flex items-center gap-2 text-[var(--color-leaf)] hover:text-[var(--color-forest)] font-semibold text-lg transition-colors"
          >
            View all {activeCat?.name} <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CategoryTabs
