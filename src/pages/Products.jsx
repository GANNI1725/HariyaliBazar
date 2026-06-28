import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams, useNavigationType } from 'react-router-dom'
import { motion } from 'framer-motion'
import { SlidersHorizontal, Leaf } from 'lucide-react'
import { useProducts } from '../context/ProductContext'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { categories } from '../data/categories'
import ProductCard from '../components/products/ProductCard'
import ProductFilters from '../components/products/ProductFilters'
import QuickViewModal from '../components/products/QuickViewModal'

const sortOptions = [
  { value: 'newest', label: 'Newest' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'name_asc', label: 'Name: A–Z' },
]

const defaultFilters = {
  categories: [],
  minPrice: '',
  maxPrice: '',
  organicOnly: false,
  inStockOnly: false,
  sameDayOnly: false,
}

const Products = () => {
  useDocumentTitle('Products')
  const { products } = useProducts()
  const [searchParams, setSearchParams] = useSearchParams()
  const getInitialFilters = () => {
    const cat = searchParams.get('category')
    return {
      ...defaultFilters,
      categories: cat ? (cat === 'juices' ? [] : [cat]) : [],
    }
  }
  const [filters, setFilters] = useState(getInitialFilters)
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest')
  const [quickView, setQuickView] = useState(null)
  const [showMobileFilters, setShowMobileFilters] = useState(false)
  const isFirstRender = useRef(true)
  const navigationType = useNavigationType()

  const handleNavAway = useRef(() => {
    sessionStorage.setItem('productsScrollY', window.scrollY)
  })

  useLayoutEffect(() => {
    document.activeElement?.blur()
    const saved = sessionStorage.getItem('productsScrollY')
    if (saved && navigationType === 'POP') {
      window.scrollTo({ top: Number(saved), behavior: 'instant' })
      sessionStorage.removeItem('productsScrollY')
    }
  }, [searchParams, navigationType])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    const params = new URLSearchParams()
    if (filters.categories.length === 1) params.set('category', filters.categories[0])
    if (sort !== 'newest') params.set('sort', sort)
    const current = new URLSearchParams(searchParams)
    if (params.toString() !== current.toString()) {
      setSearchParams(params, { replace: true })
    }
  }, [filters.categories, sort, setSearchParams])

  const totalCount = useMemo(() => products.filter((p) => p.category !== 'juices').length, [products])

  const filtered = useMemo(() => {
    let list = [...products].filter((p) => p.category !== 'juices')
    if (filters.categories.length) {
      list = list.filter((p) => filters.categories.includes(p.category))
    }
    if (filters.minPrice) list = list.filter((p) => p.price >= Number(filters.minPrice))
    if (filters.maxPrice) list = list.filter((p) => p.price <= Number(filters.maxPrice))
    if (filters.organicOnly) list = list.filter((p) => p.isOrganic)
    if (filters.inStockOnly) list = list.filter((p) => p.inStock)
    if (filters.sameDayOnly) list = list.filter((p) => p.isSameDay)

    if (sort === 'price_asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price_desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'rating') list.sort((a, b) => b.rating - a.rating)
    else if (sort === 'name_asc') list.sort((a, b) => a.name.localeCompare(b.name))
    else list.sort((a, b) => b.id - a.id)

    return list
  }, [filters, sort, products])

  const clear = () => {
    setFilters(defaultFilters)
    setSort('newest')
  }

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
          className="mb-6 sm:mb-8"
        >
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-4xl text-[var(--color-forest)] mb-1 sm:mb-2">
            Products
          </h1>
          <p className="text-sm sm:text-base text-[var(--color-text)]/70">
            Fresh, organic produce from {categories.length} categories — sourced directly from Nepali farmers.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-8">
          <div className="hidden lg:block">
            <ProductFilters filters={filters} setFilters={setFilters} onClear={clear} />
          </div>

          <div>
            <div className="flex items-center justify-between mb-6 gap-3 flex-wrap">
              <p className="text-sm text-[var(--color-text)]/70">
                Showing <strong>{filtered.length}</strong> of {totalCount} products
              </p>
              <div className="flex gap-2 items-center">
                <button
                  onClick={() => setShowMobileFilters(true)}
                  className="lg:hidden inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--color-sprout)]/40 text-sm font-medium"
                >
                  <SlidersHorizontal size={14} /> Filters
                </button>
                <label className="text-sm text-[var(--color-text)]/70 flex items-center gap-2">
                  <span className="hidden sm:inline">Sort:</span>
                  <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="px-3 py-2 rounded-lg border border-[var(--color-sprout)]/40 bg-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                  >
                    {sortOptions.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-12 sm:py-20 bg-[var(--color-border)] rounded-2xl">
                <div className="w-20 h-20 rounded-full bg-[var(--color-card)] mx-auto mb-5 flex items-center justify-center">
                  <Leaf size={36} className="text-[var(--color-leaf)]" />
                </div>
                <h3 className="font-[var(--font-heading)] text-xl text-[var(--color-forest)] mb-2">
                  No products found
                </h3>
                <p className="text-[var(--color-text)]/70 mb-6 max-w-md mx-auto">
                  Nothing matches your current filters. Try clearing them to see all {totalCount} organic products.
                </p>
                <button
                  onClick={clear}
                  className="bg-[var(--color-forest)] text-[var(--color-pure-white)] font-semibold px-6 py-2.5 rounded-lg hover:bg-[var(--color-leaf)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
                >
                  Clear filters
                </button>
              </div>
            ) : (
              <div
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
                onClick={(e) => {
                  if (e.target.closest('a[href^="/products/"]')) {
                    handleNavAway.current()
                  }
                }}
              >
                {filtered.map((p) => (
                  <ProductCard key={p.id} product={p} onQuickView={setQuickView} />
                ))}
              </div>
            )}
          </div>
        </div>

        {showMobileFilters && (
          <div
            className="lg:hidden fixed inset-0 z-[80] bg-[var(--color-pure-black)]/60 backdrop-blur-sm flex items-end"
            onClick={() => setShowMobileFilters(false)}
          >
            <div
              className="w-full max-h-[85vh] overflow-y-auto bg-[var(--color-background)] rounded-t-2xl p-2"
              onClick={(e) => e.stopPropagation()}
            >
              <ProductFilters
                filters={filters}
                setFilters={setFilters}
                onClear={clear}
                onClose={() => setShowMobileFilters(false)}
              />
              <button
                onClick={() => setShowMobileFilters(false)}
                className="w-full mt-3 py-3 bg-[var(--color-forest)] text-[var(--color-pure-white)] font-medium rounded-lg"
              >
                Apply filters
              </button>
            </div>
          </div>
        )}

        <QuickViewModal product={quickView} onClose={() => setQuickView(null)} />
      </div>
    </motion.section>
  )
}

export default Products
