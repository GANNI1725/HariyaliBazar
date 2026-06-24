import { Link } from 'react-router-dom'
import { Heart, ArrowRight } from 'lucide-react'
import { useWishlist } from '../context/WishlistContext'
import { useProducts } from '../context/ProductContext'
import ProductCard from '../components/products/ProductCard'
import Button from '../components/shared/Button'

const Wishlist = () => {
  const { ids, count, clear } = useWishlist()
  const { products } = useProducts()
  const items = products.filter((p) => ids.includes(p.id))

  return (
    <section className="w-full py-6 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-1 sm:mb-2 gap-3 flex-wrap">
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-4xl text-[var(--color-forest)]">
            Wishlist
          </h1>
          {count > 0 && (
            <button
              onClick={clear}
              className="text-sm text-[var(--color-red)] hover:underline hover:text-[var(--color-red)]/80 focus-visible:outline-2 focus-visible:outline-[var(--color-red)] focus-visible:outline-offset-2 rounded"
            >
              Clear
            </button>
          )}
        </div>
        <p className="text-sm sm:text-base text-[var(--color-text)]/70 mb-6 sm:mb-8">
          {count > 0
            ? `${count} item${count > 1 ? 's' : ''} saved for later`
            : 'Save your favourite products to come back to later'}
        </p>

        {count === 0 ? (
          <div className="text-center py-12 sm:py-20 bg-[var(--color-border)] rounded-2xl">
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
      </div>
    </section>
  )
}

export default Wishlist
