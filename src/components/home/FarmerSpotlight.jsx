import { useState, useEffect, memo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Calendar, Leaf, Star } from 'lucide-react'
import { farmers } from '../../data/farmers'
import SectionHeader from '../shared/SectionHeader'
import { lockScroll, unlockScroll } from '../../utils/scrollLock'

const FarmerSpotlight = memo(() => {
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!active) return
    const onKey = (e) => e.key === 'Escape' && setActive(null)
    document.addEventListener('keydown', onKey)

    lockScroll()

    return () => {
      document.removeEventListener('keydown', onKey)
      unlockScroll()
    }
  }, [active])

  return (
    <section className="w-full py-16 sm:py-20 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="The People Behind Your Food"
          title="Meet The Hands That Grow Your Food"
          subtitle="Every order supports a real Nepali farmer practising sustainable, organic agriculture."
        />

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {farmers.slice(0, 4).map((f, i) => (
            <motion.button
              key={f.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              onClick={() => setActive(f)}
              className="relative text-left bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-sm hover:shadow-strong hover:scale-[1.02] transition-all duration-300 group border-l-4 border-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
            >
              {f.farmerOfTheWeek && (
                <span className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 bg-[var(--color-accent)] text-[var(--color-pure-white)] rounded-full px-2.5 py-1 text-xs font-bold shadow">
                  <Star size={10} fill="currentColor" /> Farmer of the Week
                </span>
              )}
              <div className="relative aspect-square sm:aspect-auto sm:h-48 overflow-hidden">
                <img
                  src={f.image}
                  alt={`Portrait of ${f.name}, organic farmer from ${f.district}`}
                  loading="lazy"
                  width="400"
                  height="400"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 space-y-1.5">
                <h4 className="font-semibold text-lg text-[var(--color-charcoal)] leading-tight">{f.name}</h4>
                <p className="nepali-text text-lg text-[var(--color-leaf)] mb-2">{f.nameNepali}</p>
                <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                  <MapPin size={14} className="text-[var(--color-accent)]" />
                  {f.district}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                  <Leaf size={14} className="text-[var(--color-accent)]" />
                  {f.specialty}
                </div>
                <div className="flex items-center gap-1.5 text-sm text-[var(--color-text-secondary)]">
                  <Calendar size={14} className="text-[var(--color-accent)]" />
                  {f.yearsOrganic} years organic
                </div>
              </div>
            </motion.button>
          ))}
        </div>

        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-[var(--color-pure-black)]/70 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={() => setActive(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-[var(--color-card)] rounded-2xl max-w-lg w-full max-h-[80vh] overflow-y-auto relative shadow-2xl"
              >
                <button
                  onClick={() => setActive(null)}
                  aria-label="Close farmer profile"
                  className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-[var(--color-card)] text-[var(--color-text)] hover:bg-[var(--color-border)] flex items-center justify-center shadow"
                >
                  <X size={16} />
                </button>
                <img
                  src={active.image}
                  alt={active.name}
                  className="w-full h-auto max-h-[35vh] object-cover bg-[var(--color-border)]"
                />
                <div className="p-4 sm:p-5">
                  <h3 className="font-[var(--font-heading)] text-xl text-[var(--color-forest)] mb-0.5">
                    {active.name}
                  </h3>
                  <p className="nepali-text text-lg text-[var(--color-leaf)] mb-3">
                    {active.nameNepali}
                  </p>
                  <div className="grid grid-cols-2 gap-2 mb-4">
                    <div className="bg-[var(--color-border)] rounded-lg p-2.5">
                      <p className="text-xs uppercase tracking-wider text-[var(--color-leaf)]">District</p>
                      <p className="font-semibold text-sm text-[var(--color-forest)]">{active.district}</p>
                    </div>
                    <div className="bg-[var(--color-border)] rounded-lg p-2.5">
                      <p className="text-xs uppercase tracking-wider text-[var(--color-leaf)]">Specialty</p>
                      <p className="font-semibold text-sm text-[var(--color-forest)]">{active.specialty}</p>
                    </div>
                    <div className="bg-[var(--color-border)] rounded-lg p-2.5">
                      <p className="text-xs uppercase tracking-wider text-[var(--color-leaf)]">Years Organic</p>
                      <p className="font-semibold text-sm text-[var(--color-forest)]">{active.yearsOrganic} years</p>
                    </div>
                    <div className="bg-[var(--color-border)] rounded-lg p-2.5">
                      <p className="text-xs uppercase tracking-wider text-[var(--color-leaf)]">Products</p>
                      <p className="font-semibold text-sm text-[var(--color-forest)]">{active.products.length} items</p>
                    </div>
                  </div>
                  <h4 className="font-[var(--font-heading)] text-base text-[var(--color-forest)] mb-1.5">
                    Their Story
                  </h4>
                  <p className="text-sm text-[var(--color-text)]/80 leading-relaxed">
                    {active.story}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
})

FarmerSpotlight.displayName = 'FarmerSpotlight'

export default FarmerSpotlight
