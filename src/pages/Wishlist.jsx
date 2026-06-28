import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Heart, HeartCrack, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/products/ProductCard'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import Button from '../components/shared/Button'

const Wishlist = () => {
  useDocumentTitle('Wishlist')
  const { ids, count, clear } = useWishlist()
  const { products } = useProducts()
  const items = products.filter((p) => ids.includes(p.id))

  return (
    <div className="relative min-h-screen bg-[#1a2e1a] bg-fixed bg-cover bg-center" style={{ backgroundImage: `url('/Why-Organic/WishList.jpg')` }}>
      <div className="absolute inset-0 bg-[var(--color-pure-black)]/70" />
      <div className="relative z-10">
        <section className="w-full py-6 sm:py-14">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            <div className="flex items-center justify-between mb-1 sm:mb-2 gap-3 flex-wrap">
              <h1 className="font-[var(--font-heading)] text-2xl sm:text-4xl text-[var(--color-text-on-dark)]">
                Wishlist
              </h1>
              {count > 0 && (
                <button
                  onClick={clear}
                  className="text-sm text-[var(--color-text-on-dark)]/80 border border-[var(--color-text-on-dark)]/30 px-3 py-1.5 rounded-lg hover:bg-[var(--color-text-on-dark)]/10 hover:text-[var(--color-text-on-dark)] focus-visible:outline-2 focus-visible:outline-[var(--color-text-on-dark)] focus-visible:outline-offset-2 flex items-center gap-1.5"
                >
                  <HeartCrack size={16} /> Clear
                </button>
              )}
            </div>
            <p className="text-sm sm:text-base text-[var(--color-text-on-dark)]/80 mb-6 sm:mb-8">
              {count > 0
                ? `${count} item${count > 1 ? 's' : ''} saved for later`
                : 'Save your favourite products to come back to later'}
            </p>

            {count === 0 ? (
              <div className="text-center py-12 sm:py-20 bg-[var(--color-card)] rounded-2xl">
                <div className="w-20 h-20 rounded-full bg-[var(--color-card)] mx-auto mb-5 flex items-center justify-center">
                  <Heart size={36} className="text-[var(--color-clay)]" />
                </div>
                <h2 className="font-[var(--font-heading)] text-2xl text-[var(--color-forest)] mb-2">
                  No favourites yet
                </h2>
                <p className="text-[var(--color-text)]/70 mb-6 max-w-md mx-auto">
                  Tap the heart on any product to save it here for later.
                </p>
                <Link to="/products">
                  <Button size="lg">
                    Browse Products <ArrowRight size={18} />
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                {items.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </motion.div>
        </section>
      </div>
      <style>{`@media (max-width: 639px) { .bg-fixed { background-attachment: scroll !important; } }`}</style>
    </div>
  )
}

export default Wishlist
