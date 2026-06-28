import PropTypes from 'prop-types'
import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Search, X, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useProducts } from '../../context/ProductContext'
import { lockScroll, unlockScroll } from '../../utils/scrollLock'

const SearchModal = ({ isOpen, onClose }) => {
  const { products } = useProducts()
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)

    lockScroll()

    const t = setTimeout(() => inputRef.current?.focus(), 50)
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
      clearTimeout(t)
    }
  }, [isOpen, onClose])

  useEffect(() => {
    if (!isOpen) setQuery('')
  }, [isOpen])

  const results = useMemo(() => {
    if (!query.trim()) return []
    const q = query.trim().toLowerCase()
    return products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.nameNepali.includes(query.trim()) ||
          p.category.includes(q) ||
          p.tags?.some((t) => t.includes(q)),
      )
      .slice(0, 8)
  }, [query, products])

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] bg-[var(--color-pure-black)]/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: -20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-[var(--color-card)] w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Search products"
          >
            <div className="flex items-center gap-3 p-4 border-b border-[var(--color-border)]">
              <Search className="text-[var(--color-leaf)] shrink-0" size={22} />
              <input
                ref={inputRef}
                type="text"
                placeholder="Search products… try 'spinach', 'tea', 'dal'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="flex-1 bg-transparent outline-none text-lg placeholder:text-[var(--color-text-placeholder)] text-[var(--color-text)]"
                aria-label="Search products"
              />
              <button
                onClick={onClose}
                aria-label="Close search"
                className="p-1.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
              >
                <X size={20} />
              </button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto" aria-live="polite" aria-atomic="true">
              {!query.trim() && (
                <div className="p-8 text-center text-[var(--color-text)]/60">
                  <p className="mb-2">Start typing to search 30+ organic products</p>
                  <p className="text-sm"><span className="hidden sm:inline">Press <kbd className="px-1.5 py-0.5 bg-[var(--color-border)] rounded">Esc</kbd> to close</span><span className="sm:hidden">Tap <kbd className="px-1.5 py-0.5 bg-[var(--color-border)] rounded">✕</kbd> to close</span></p>
                </div>
              )}

              {query.trim() && results.length === 0 && (
                <div className="p-8 text-center text-[var(--color-text)]/60">
                  No products found for "{query}"
                </div>
              )}

              {results.length > 0 && (
                <ul className="divide-y divide-[var(--color-border)]">
                  {results.map((p) => (
                    <li key={p.id}>
                      <Link
                        to={`/products/${p.id}`}
                        onClick={onClose}
                        className="flex items-center gap-4 p-3 hover:bg-[var(--color-border)] transition-colors group"
                      >
                        <img
                          src={p.images?.[0] || p.image || ''}
                          alt={p.name}
                          loading="lazy"
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-[var(--color-forest)] truncate">{p.name}</p>
                          <p className="text-lg nepali-text text-[var(--color-text)]/70 truncate">{p.nameNepali}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-semibold text-[var(--color-leaf)]">₨ {p.price}</p>
                          <p className="text-xs text-[var(--color-text)]/60">/{p.unit}</p>
                        </div>
                        <ArrowRight size={18} className="text-[var(--color-leaf)] opacity-0 group-hover:opacity-100 transition-opacity" />
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

SearchModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func.isRequired,
}

export default SearchModal
