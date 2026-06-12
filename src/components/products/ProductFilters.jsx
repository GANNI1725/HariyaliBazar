import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { categories } from '../../data/categories'
import { useProducts } from '../../context/ProductContext'
import { X } from 'lucide-react'

const ProductFilters = ({ filters, setFilters, onClear, onClose }) => {
  const { products } = useProducts()
  const togCategory = (id) => {
    setFilters((f) => {
      const has = f.categories.includes(id)
      return {
        ...f,
        categories: has ? f.categories.filter((c) => c !== id) : [...f.categories, id],
      }
    })
  }

  const filteredCategories = useMemo(() => categories.filter((c) => c.id !== 'juices'), [])

  const counts = useMemo(() => {
    const out = {}
    for (const c of filteredCategories) {
      out[c.id] = products.filter((p) => p.category === c.id).length
    }
    return out
  }, [filteredCategories, products])

  return (
    <aside className="bg-[var(--color-card)] rounded-2xl p-5 border border-[var(--color-border)] lg:sticky lg:top-24">
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-[var(--color-forest)]">Filters</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={onClear}
            className="text-sm text-[var(--color-leaf)] hover:underline focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"
          >
            Clear all
          </button>
          {onClose && (
            <button
              onClick={onClose}
              aria-label="Close filters"
              className="lg:hidden p-1 rounded-md hover:bg-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </div>

      <section className="mb-6">
        <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3 uppercase tracking-wider">
          Category
        </h4>
        <ul className="space-y-2">
          {filteredCategories.map((c) => (
            <li key={c.id}>
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(c.id)}
                  onChange={() => togCategory(c.id)}
                  className="w-4 h-4 accent-[var(--color-leaf)] cursor-pointer"
                />
                <span className="flex-1 text-sm group-hover:text-[var(--color-leaf)] transition-colors">
                  {c.icon} {c.name}
                </span>
                <span className="text-xs text-[var(--color-text)]/50 bg-[var(--color-border)] px-1.5 py-0.5 rounded-full">
                  ({counts[c.id] ?? 0})
                </span>
              </label>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h4 className="text-sm font-semibold text-[var(--color-text)] mb-3 uppercase tracking-wider">
          Price Range (₨)
        </h4>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => setFilters((f) => ({ ...f, minPrice: e.target.value }))}
            min="0"
            className="w-full px-3 py-2 text-sm rounded-md border border-[var(--color-sprout)]/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
          />
          <span className="text-[var(--color-text)]/50">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => setFilters((f) => ({ ...f, maxPrice: e.target.value }))}
            min="0"
            className="w-full px-3 py-2 text-sm rounded-md border border-[var(--color-sprout)]/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
          />
        </div>
      </section>

      <section className="space-y-3">
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium">🌿 Organic Only</span>
          <input
            type="checkbox"
            checked={filters.organicOnly}
            onChange={(e) => setFilters((f) => ({ ...f, organicOnly: e.target.checked }))}
            className="w-4 h-4 accent-[var(--color-leaf)] cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium">📦 In Stock Only</span>
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => setFilters((f) => ({ ...f, inStockOnly: e.target.checked }))}
            className="w-4 h-4 accent-[var(--color-leaf)] cursor-pointer"
          />
        </label>
        <label className="flex items-center justify-between cursor-pointer">
          <span className="text-sm font-medium">🚚 Same-Day Delivery</span>
          <input
            type="checkbox"
            checked={filters.sameDayOnly}
            onChange={(e) => setFilters((f) => ({ ...f, sameDayOnly: e.target.checked }))}
            className="w-4 h-4 accent-[var(--color-leaf)] cursor-pointer"
          />
        </label>
      </section>
    </aside>
  )
}

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  setFilters: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onClose: PropTypes.func,
}

export default ProductFilters
