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
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="w-full py-16 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Shop by Category"
          title="Fresh from the Field"
          subtitle="Hand-picked, never sprayed. Every category sourced from trusted Nepali farmers."
        />

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {visibleCategories.map((c) => (
            <motion.button
              key={c.id}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActive(c.id)}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-sm font-medium transition-colors flex items-center gap-2 ${
                active === c.id
                  ? 'bg-[var(--color-forest)] text-[var(--color-pure-white)] shadow-md'
                  : 'bg-[var(--color-linen)] text-[var(--color-text)] hover:bg-[var(--color-sprout)] hover:text-[var(--color-pure-white)]'
              }`}
            >
              <motion.span
                whileHover={{ rotate: [0, -10, 10, -5, 0] }}
                transition={{ duration: 0.4 }}
              >{c.icon}</motion.span>
              <span>{c.name}</span>
            </motion.button>
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
            {filtered.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
                className={i >= 2 ? 'hidden lg:block' : ''}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        <style>{`
          @media (max-width: 1023px) {
            .category-grid > :last-child:nth-child(odd) {
              grid-column: 1 / -1;
              justify-self: center;
              width: calc(50% - 0.5rem);
            }
            .category-grid > :last-child:nth-child(odd) > * {
              max-width: 100%;
            }
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
    </motion.section>
  )
}

export default CategoryTabs
