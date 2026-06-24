import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  ChevronRight,
  Heart,
  ShoppingCart,
  Star,
  Minus,
  Plus,
  Leaf,
  MapPin,
  Truck,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { farmers } from '../data/farmers'
import { categories } from '../data/categories'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext'
import Button from '../components/shared/Button'
import RelatedProducts from '../components/products/RelatedProducts'

const getGramValue = (unit) => {
  if (!unit) return null
  const match = unit.match(/^(\d+)g$/)
  return match ? parseInt(match[1], 10) : null
}

const ProductDetail = () => {
  const { id } = useParams()
  const { getProductById } = useProducts()
  const product = getProductById(id)
  const [quantity, setQuantity] = useState(1)
  const [tab, setTab] = useState('description')
  const [activeImg, setActiveImg] = useState(0)
  const [stickyVisible, setStickyVisible] = useState(false)
  const { addItem } = useCart()
  const { isWishlisted, toggle } = useWishlist()
  const gramPerUnit = getGramValue(product?.unit)

  useEffect(() => {
    window.scrollTo({ top: 0 })
    setQuantity(1)
    setActiveImg(0)
  }, [id])

  useEffect(() => {
    const onScroll = () => setStickyVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!product) return <Navigate to="/products" replace />

  const inWish = isWishlisted(product.id)
  const farmer = farmers.find((f) => f.id === product.farmerId)
  const categoryInfo = categories.find((c) => c.id === product.category)

  return (
    <section className="w-full py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-[var(--color-text)]/70 mb-6 flex-wrap">
          <Link to="/" className="hover:text-[var(--color-leaf)]">Home</Link>
          <ChevronRight size={14} />
          <Link to="/products" className="hover:text-[var(--color-leaf)]">Products</Link>
          <ChevronRight size={14} />
          <Link
            to={`/products?category=${product.category}`}
            className="hover:text-[var(--color-leaf)] capitalize"
          >
            {categoryInfo?.name}
          </Link>
          <ChevronRight size={14} />
          <span className="text-[var(--color-forest)] font-medium truncate">
            {product.name}
          </span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="rounded-2xl overflow-hidden bg-[var(--color-border)] aspect-square mb-4 group">
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-2">
                {product.images.map((img, i) => (
                  <button
                    key={img}
                    onClick={() => setActiveImg(i)}
                    aria-label={`View image ${i + 1}`}
                    className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition ${
                      activeImg === i
                        ? 'border-[var(--color-leaf)]'
                        : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Link
              to="/products"
              className="lg:hidden inline-flex items-center gap-1 text-sm text-[var(--color-leaf)] mb-3"
            >
              <ArrowLeft size={14} /> Back to products
            </Link>

            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs uppercase tracking-wider text-[var(--color-leaf)] font-semibold">
                {categoryInfo?.name}
              </span>
              {!product.inStock && (
                <span className="px-2 py-0.5 rounded-md bg-[var(--color-red)] text-[var(--color-pure-white)] text-xs font-bold">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="font-[var(--font-heading)] text-3xl sm:text-4xl text-[var(--color-forest)] mb-1">
              {product.name}
            </h1>
            <p className="nepali-text text-2xl text-[var(--color-leaf)] mb-4">
              {product.nameNepali}
            </p>

            <div className="flex items-center gap-3 mb-5">
              <div className="flex gap-0.5 text-[var(--color-gold)]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={`star-${i}`}
                    size={16}
                    fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-[var(--color-text)]">
                {product.rating}
              </span>
              <span className="text-sm text-[var(--color-text)]/60">
                ({product.reviewCount} reviews)
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-5">
              <span className="text-4xl font-bold text-[var(--color-leaf)]">
                ₨ {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg line-through text-[var(--color-text)]/50">
                  ₨ {product.originalPrice}
                </span>
              )}
              <span className="text-sm text-[var(--color-text)]/60">
                / {product.unit}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
              {product.isOrganic && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-success-bg)] text-[var(--color-success-text)] text-xs font-medium">
                  <Leaf size={14} /> Organic
                </div>
              )}
              {product.isLocal && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-info-bg)] text-[var(--color-info-text)] text-xs font-medium">
                  <MapPin size={14} /> Local
                </div>
              )}
              {product.isSameDay && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-warning-bg)] text-[var(--color-warning-text)] text-xs font-medium">
                  <Truck size={14} /> Same-Day
                </div>
              )}
              {product.pesticide_free && (
                <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--color-special-bg)] text-[var(--color-special-text)] text-xs font-medium">
                  <ShieldCheck size={14} /> Pesticide-Free
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mb-6">
              <div className="inline-flex items-center border-2 border-[var(--color-sprout)]/50 rounded-lg">
                <button
                  onClick={() => setQuantity((q) => Math.max(product.unit === 'kg' ? 0.5 : 1, q - (product.unit === 'kg' ? 0.5 : 1)))}
                  aria-label="Decrease quantity"
                  className="px-3 py-2.5 text-[var(--color-leaf)] hover:bg-[var(--color-border)]"
                >
                  <Minus size={16} />
                </button>
                <span className="px-4 py-2 font-semibold min-w-[44px] text-center">
                  {gramPerUnit ? `${gramPerUnit * quantity}g` : `${quantity} ${product.unit}`}
                </span>
                <button
                  onClick={() => setQuantity((q) => q + (product.unit === 'kg' ? 0.5 : 1))}
                  aria-label="Increase quantity"
                  className="px-3 py-2.5 text-[var(--color-leaf)] hover:bg-[var(--color-border)]"
                >
                  <Plus size={16} />
                </button>
              </div>
              <Button
                onClick={() => addItem(product, quantity)}
                disabled={!product.inStock}
                size="lg"
                className="flex-1 sm:flex-none"
              >
                <ShoppingCart size={18} />
                {product.inStock ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                onClick={() => toggle(product)}
                aria-label="Toggle wishlist"
              >
                <Heart size={18} fill={inWish ? 'currentColor' : 'none'} />
              </Button>
            </div>

            {farmer && (
              <div className="rounded-2xl bg-[var(--color-border)] p-4 sm:p-5 flex gap-4 items-center">
                <img
                  src={farmer.image}
                  alt={farmer.name}
                  className="w-16 h-16 rounded-full object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs uppercase tracking-wider text-[var(--color-leaf)] font-semibold mb-0.5">
                    Grown by
                  </p>
                  <p className="font-semibold text-[var(--color-forest)] truncate">
                    {farmer.name}
                  </p>
                  <p className="text-sm text-[var(--color-text)]/70 truncate">
                    <MapPin size={12} className="inline mr-1" />
                    {farmer.district} · {farmer.yearsOrganic} years organic
                  </p>
                </div>
              </div>
            )}

            <div className="mt-8">
              <div className="flex border-b border-[var(--color-border)]">
                {[
                  ['description', 'Description'],
                  ['method', 'Farming Method'],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    onClick={() => setTab(id)}
                    className={`px-4 py-3 text-sm font-semibold border-b-2 transition-colors ${
                      tab === id
                        ? 'border-[var(--color-leaf)] text-[var(--color-forest)]'
                        : 'border-transparent text-[var(--color-text)]/60 hover:text-[var(--color-leaf)]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div className="py-4 text-[var(--color-text)]/80 leading-relaxed">
                {tab === 'description' ? product.description : product.farmingMethod}
              </div>
            </div>
          </motion.div>
        </div>

        <RelatedProducts product={product} />
      </div>

      <div
        className={`fixed bottom-0 inset-x-0 z-30 bg-[var(--color-background)] border-t border-[var(--color-border)] shadow-lg transition-transform duration-300 ${
          stickyVisible ? 'translate-y-0' : 'translate-y-full'
        } md:bottom-0`}
      >
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-12 h-12 rounded-lg object-cover hidden sm:block"
          />
          <div className="min-w-0 flex-1">
            <p className="font-semibold text-[var(--color-forest)] truncate">
              {product.name}
            </p>
            <p className="text-sm">
              <span className="font-bold text-[var(--color-leaf)]">₨ {product.price}</span>
              <span className="text-[var(--color-text)]/60"> / {product.unit}</span>
            </p>
          </div>
          <Button
            onClick={() => addItem(product, quantity)}
            disabled={!product.inStock}
            className="shrink-0"
          >
            <ShoppingCart size={16} />
            <span className="hidden sm:inline">Add to Cart</span>
            <span className="sm:hidden">Add</span>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProductDetail
