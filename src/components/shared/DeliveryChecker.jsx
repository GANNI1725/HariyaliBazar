import PropTypes from 'prop-types'
import { useState, useRef, useEffect } from 'react'
import { MapPin, CheckCircle2, XCircle, Truck, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { deliveryZones, checkDelivery } from '../../data/deliveryZones'
import Button from './Button'

const DeliveryChecker = ({ compact = false }) => {
  const [query, setQuery] = useState('')
  const [suggestions, setSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [result, setResult] = useState(null)
  const [checked, setChecked] = useState(false)
  const inputRef = useRef(null)
  const suggestionRef = useRef(null)

  useEffect(() => {
    if (query.trim().length < 1) {
      setSuggestions([])
      setShowSuggestions(false)
      return
    }
    const q = query.trim().toLowerCase()
    const matches = deliveryZones.filter((z) =>
      z.area.toLowerCase().includes(q),
    )
    setSuggestions(matches)
    setShowSuggestions(matches.length > 0)
  }, [query])

  useEffect(() => {
    const onOutsideClick = (e) => {
      if (
        suggestionRef.current &&
        !suggestionRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [])

  const selectSuggestion = (area) => {
    setQuery(area)
    setShowSuggestions(false)
    const r = checkDelivery(area)
    setResult(r)
    setChecked(true)
  }

  const onCheck = () => {
    const r = checkDelivery(query)
    setResult(r)
    setChecked(true)
    setShowSuggestions(false)
  }

  const onKeyDown = (e) => {
    if (e.key === 'Enter') onCheck()
  }

  return (
    <div
      className={`rounded-2xl bg-[var(--color-border)] p-6 border border-[var(--color-sprout)]/30 ${
        compact ? '' : 'sm:p-8'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-[var(--color-leaf)] flex items-center justify-center text-[var(--color-pure-white)]">
          <Truck size={20} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[var(--color-forest)]">
            Check Delivery to Your Area
          </h3>
          <p className="text-sm text-[var(--color-text)]/70">
            We deliver across Butwal & Rupandehi
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex-1 relative">
          <MapPin
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-leaf)]"
          />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
            placeholder="Enter your area in Butwal/Rupandehi…"
            aria-label="Enter delivery area"
            className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--color-sprout)]/40 bg-[var(--color-card)] text-[var(--color-text)] placeholder:text-[var(--color-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
          />
          <AnimatePresence>
            {showSuggestions && (
              <motion.ul
                key="suggestions"
                ref={suggestionRef}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 right-0 top-full mt-1 bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-lg z-50 max-h-48 overflow-y-auto"
              >
                {suggestions.map((z, i) => (
                  <li
                    key={`${z.area}-${i}`}
                    role="option" tabIndex={0}
                    onClick={() => selectSuggestion(z.area)}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); selectSuggestion(z.area); } }}
                    className="flex items-center gap-2 px-3 py-2.5 text-sm cursor-pointer hover:bg-[var(--color-hover)] transition-colors"
                  >
                    <Search size={14} className="text-[var(--color-text-secondary)] shrink-0" />
                    <span className="text-[var(--color-text)]">{z.area}</span>
                    <span className="ml-auto text-xs text-[var(--color-text-secondary)]">
                      ₨{z.fee}{!z.sameDay ? ' · 1-2 days' : ''}
                    </span>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
        <Button onClick={onCheck} disabled={!query.trim()} className="shrink-0">
          Check
        </Button>
      </div>

      <AnimatePresence mode="wait">
        {checked && (
          <motion.div
            key={result ? 'ok' : 'no'}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`mt-4 p-4 rounded-lg flex items-start gap-3 ${
              result
                ? 'bg-[var(--color-success-bg)] border border-[var(--color-success-border)] text-[var(--color-success-text)]'
                : 'bg-[var(--color-warning-bg)] border border-[var(--color-warning-border)] text-[var(--color-warning-text)]'
            }`}
          >
            {result ? (
              <>
                <CheckCircle2 size={22} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">
                    Great news! We deliver to {result.area} 🚚
                  </p>
                  <p className="text-sm mt-1">
                    {result.sameDay ? '✓ Same-day delivery available' : '📦 1–2 day delivery'} ·{' '}
                    Delivery fee: ₨{result.fee}
                  </p>
                </div>
              </>
            ) : (
              <>
                <XCircle size={22} className="shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Coming soon to your area!</p>
                  <p className="text-sm mt-1">
                    We currently serve Butwal, Siddharthanagar, Tilottama, Devdaha and nearby areas of Rupandehi. Sign up to be notified when we expand further.
                  </p>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

DeliveryChecker.propTypes = {
  compact: PropTypes.bool,
}

export default DeliveryChecker
