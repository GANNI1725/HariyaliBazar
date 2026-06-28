import { AnimatePresence, motion } from 'framer-motion'
import { X, Check, Sparkles } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { useCart } from '../../context/CartContext'
import { useProducts } from '../../context/ProductContext'
import { lockScroll, unlockScroll } from '../../utils/scrollLock'

const MAX_VEG = 4
const MAX_FRUIT = 2
const BOX_PRICE = 899
const BOX_ORIGINAL = 1200
const BOX_ID = 'veggie-box'
const BOX_NAME = 'Weekly Veggie Box'
const BOX_IMAGE = '/Home-Logo_Section_Pics/Weekly-Veggie-Box.jpg'

const getRandomSurprise = (allProducts, selectedIds) => {
  const pool = allProducts.filter((p) => !selectedIds.includes(p.id) && p.inStock)
  return pool[Math.floor(Math.random() * pool.length)]
}

const SelectableGrid = ({ items, selected, onToggle, max, label, icon }) => {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold text-[var(--color-charcoal)]">{label}</span>
        <span className={`text-xs font-medium ${selected.length >= max ? 'text-[var(--color-forest)]' : 'text-[var(--color-text-secondary)]'}`}>
          {selected.length}/{max}
        </span>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
        {items.map((item) => {
          const isSelected = selected.includes(item.id)
          const isMaxed = selected.length >= max && !isSelected
          return (
            <button
              key={item.id}
              onClick={() => !isMaxed && onToggle(item.id)}
              disabled={isMaxed}
              className={`relative flex flex-col items-center gap-1.5 p-2 rounded-xl border text-center transition-all duration-200 ${
                isSelected
                  ? 'border-[var(--color-forest)] bg-[var(--color-forest)]/10 shadow-sm'
                  : isMaxed
                    ? 'border-[var(--color-border-light)] opacity-40 cursor-not-allowed'
                    : 'border-[var(--color-border-light)] hover:border-[var(--color-leaf)] hover:bg-[var(--color-hover)]'
              }`}
            >
              {isSelected && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[var(--color-forest)] text-[var(--color-pure-white)] flex items-center justify-center">
                  <Check size={10} strokeWidth={3} />
                </span>
              )}
              <span className="text-lg">{icon}</span>
              <span className="text-xs font-medium text-[var(--color-charcoal)] leading-tight">{item.name}</span>
              <span className="text-xs text-[var(--color-text-secondary)]">₨ {item.price}/{item.unit}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

const VeggieBoxModal = ({ isOpen, onClose }) => {
  const { products } = useProducts()
  const { addItem, openCart } = useCart()
  const [vegetableIds, setVegetableIds] = useState([])
  const [fruitIds, setFruitIds] = useState([])
  const [added, setAdded] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setVegetableIds([])
      setFruitIds([])
      setAdded(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    lockScroll()
    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [isOpen, onClose])

  const veggies = useMemo(() => products.filter((p) => p.category === 'vegetables'), [products])
  const fruits = useMemo(() => products.filter((p) => p.category === 'fruits'), [products])

  const selectedVeg = useMemo(() => veggies.filter((v) => vegetableIds.includes(v.id)), [vegetableIds, veggies])
  const selectedFruit = useMemo(() => fruits.filter((f) => fruitIds.includes(f.id)), [fruitIds, fruits])

  const allSelectedIds = useMemo(() => [...vegetableIds, ...fruitIds], [vegetableIds, fruitIds])

  const currentSurprise = useMemo(() => {
    if (allSelectedIds.length < MAX_VEG + MAX_FRUIT) return null
    return getRandomSurprise(products, allSelectedIds)
  }, [allSelectedIds, products])

  const canAdd = vegetableIds.length === MAX_VEG && fruitIds.length === MAX_FRUIT

  const handleAddToCart = () => {
    if (!canAdd) return
    const sVeg = selectedVeg.map((v) => v.name)
    const sFruit = selectedFruit.map((f) => f.name)
    const sSurprise = 'Farmer\'s Surprise Pick'

    addItem({
      id: BOX_ID,
      name: BOX_NAME,
      nameNepali: 'साप्ताहिक तरकारी बक्स',
      slug: 'veggie-box',
      price: BOX_PRICE,
      originalPrice: BOX_ORIGINAL,
      unit: 'box',
      image: BOX_IMAGE,
      selections: {
        vegetables: sVeg,
        fruits: sFruit,
        surprise: sSurprise,
        totalItems: MAX_VEG + MAX_FRUIT,
      },
    })
    setAdded(true)
    setTimeout(() => {
      onClose()
      openCart()
    }, 800)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-[var(--color-pure-black)]/60 backdrop-blur-sm"
          />
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-[var(--color-card)] rounded-3xl max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-strong" role="dialog" aria-modal="true" aria-label="Customise your Weekly Veggie Box">
              <div className="sticky top-0 bg-[var(--color-card)] z-10 flex items-center justify-between p-5 border-b border-[var(--color-border-light)]">
                <div>
                  <h2 className="heading-sm text-[var(--color-charcoal)]">Weekly Veggie Box</h2>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">Customise your box</p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close modal"
                  className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--color-hover)] text-[var(--color-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-5 space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-[var(--color-forest)]/10 to-[var(--color-accent)]/10 border border-[var(--color-border-light)]">
                  <div>
                    <p className="text-2xl font-bold text-[var(--color-charcoal)]">₨ {BOX_PRICE}</p>
                    <p className="text-xs line-through text-[var(--color-text-secondary)]">₨ {BOX_ORIGINAL}</p>
                  </div>
                  <span className="px-2 py-1 rounded-full bg-[var(--color-accent)] text-[var(--color-pure-white)] text-xs font-bold">SAVE 25%</span>
                </div>

                <SelectableGrid
                  items={veggies}
                  selected={vegetableIds}
                  onToggle={(id) => setVegetableIds((p) => p.includes(id) ? p.filter((v) => v !== id) : [...p, id])}
                  max={MAX_VEG}
                  label={`Choose ${MAX_VEG} Vegetables`}
                  icon="🥦"
                />

                <SelectableGrid
                  items={fruits}
                  selected={fruitIds}
                  onToggle={(id) => setFruitIds((p) => p.includes(id) ? p.filter((v) => v !== id) : [...p, id])}
                  max={MAX_FRUIT}
                  label={`Choose ${MAX_FRUIT} Fruits`}
                  icon="🍎"
                />

                  {currentSurprise && (
                  <div className="p-4 rounded-2xl bg-[var(--color-surface)] border border-[var(--color-border-light)]">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles size={16} className="text-[var(--color-accent)]" />
                      <span className="text-sm font-semibold text-[var(--color-charcoal)]">Farmer's Surprise</span>
                    </div>
                    <p className="text-sm text-[var(--color-text-secondary)]">
                      A mystery item chosen by our farmers — fresh, seasonal, and a total surprise!
                    </p>
                  </div>
                )}

                <div className="flex items-center justify-between text-sm text-[var(--color-text-secondary)] border-t border-[var(--color-border-light)] pt-4">
                  <span>{MAX_VEG} veggies, {MAX_FRUIT} fruit + surprise</span>
                  <span className="font-semibold text-[var(--color-charcoal)]">₨ {BOX_PRICE}</span>
                </div>
              </div>

              <div className="sticky bottom-0 bg-[var(--color-card)] border-t border-[var(--color-border-light)] p-5">
                <button
                  onClick={handleAddToCart}
                  disabled={!canAdd || added}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                    added
                      ? 'bg-[var(--color-success)] text-[var(--color-pure-white)]'
                      : canAdd
                        ? 'bg-[var(--color-forest)] text-[var(--color-pure-white)] hover:bg-[var(--color-leaf)] shadow-elevated'
                        : 'bg-[var(--color-disabled)] text-[var(--color-pure-white)] cursor-not-allowed'
                  }`}
                >
                  {added ? (
                    <>✓ Added to Cart</>
                  ) : (
                    <>Add to Cart — ₨ {BOX_PRICE}</>
                  )}
                </button>
                {!canAdd && (
                  <p className="text-center text-xs text-[var(--color-text-secondary)] mt-2">
                    {MAX_VEG - vegetableIds.length > 0 && <>Pick {MAX_VEG - vegetableIds.length} more vegetable{MAX_VEG - vegetableIds.length !== 1 ? 's' : ''}</>}
                    {MAX_VEG - vegetableIds.length > 0 && MAX_FRUIT - fruitIds.length > 0 && <> and </>}
                    {MAX_FRUIT - fruitIds.length > 0 && <>Pick {MAX_FRUIT - fruitIds.length} fruit</>}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

export default VeggieBoxModal
