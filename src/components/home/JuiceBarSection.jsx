import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useProducts } from '../../context/ProductContext'
import ProductCard from '../products/ProductCard'

const JuiceBarSection = () => {
  const { getProductsByCategory } = useProducts()
  const juices = useMemo(() => getProductsByCategory('juices').slice(0, 3), [getProductsByCategory])

  return (
    <section className="w-full py-16 sm:py-20 bg-[var(--color-linen)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-5 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="lg:col-span-2"
        >
          <span className="eyebrow flex items-center gap-2 mb-3">
            <Sparkles size={14} /> New
          </span>
          <h2 className="heading-sm text-[var(--color-charcoal)] mb-3">
            HariyaliBazar Juice Bar
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-5 leading-relaxed">
            Cold-pressed every morning from our own fresh produce. Delivered alongside your daily order — no straws, no sugar, no shortcuts.
          </p>
          <Link
            to="/juices"
            className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-[var(--color-pure-white)] font-semibold px-6 py-3 rounded-xl hover:bg-[var(--color-accent-hover)] transition-all duration-300"
          >
            Browse All Juices <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="lg:col-span-3 grid sm:grid-cols-3 gap-4">
          {juices.map((j, i) => (
            <motion.div
              key={j.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <ProductCard product={j} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default JuiceBarSection
