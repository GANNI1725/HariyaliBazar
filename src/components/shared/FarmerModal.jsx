import PropTypes from 'prop-types'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MapPin, Star } from 'lucide-react'

const FarmerModal = ({ farmer, onClose }) => {
  if (!farmer) return null

  return (
    <AnimatePresence>
      <motion.div
        key="farmer-modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0, y: -10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`Details about ${farmer.name}`}
          className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-lg max-h-[90vh] overflow-y-auto"
        >
          <div className="relative">
            <img
              src={farmer.image}
              alt={`Portrait of ${farmer.name}`}
              width="300"
              height="300"
              className="w-full aspect-[4/3] object-cover rounded-t-2xl"
            />
            {farmer.farmerOfTheWeek && (
              <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-[var(--color-accent)] text-[var(--color-pure-white)] rounded-full px-2.5 py-1 text-xs font-bold shadow">
                <Star size={10} fill="currentColor" /> Farmer of the Week
              </span>
            )}
            <button
              onClick={onClose}
              className="absolute top-3 left-3 w-8 h-8 rounded-full bg-[var(--color-pure-black)]/40 text-[var(--color-pure-white)] hover:bg-[var(--color-pure-black)]/60 flex items-center justify-center transition-colors"
              aria-label="Close details"
            >
              <X size={16} />
            </button>
          </div>
          <div className="p-5 sm:p-6">
            <h2 className="font-[var(--font-heading)] text-xl text-[var(--color-forest)]">{farmer.name}</h2>
            <p className="nepali-text text-sm text-[var(--color-leaf)] mb-4">{farmer.nameNepali}</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-[var(--color-border)] rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider text-[var(--color-leaf)] font-semibold">District</p>
                <p className="font-semibold text-sm text-[var(--color-forest)] flex items-center gap-1 mt-0.5">
                  <MapPin size={12} /> {farmer.district}
                </p>
              </div>
              <div className="bg-[var(--color-border)] rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider text-[var(--color-leaf)] font-semibold">Specialty</p>
                <p className="font-semibold text-sm text-[var(--color-forest)] mt-0.5">{farmer.specialty}</p>
              </div>
              <div className="bg-[var(--color-border)] rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider text-[var(--color-leaf)] font-semibold">Years Organic</p>
                <p className="font-semibold text-sm text-[var(--color-forest)] mt-0.5">{farmer.yearsOrganic} years</p>
              </div>
              <div className="bg-[var(--color-border)] rounded-lg p-3">
                <p className="text-[10px] uppercase tracking-wider text-[var(--color-leaf)] font-semibold">Products</p>
                <p className="font-semibold text-sm text-[var(--color-forest)] mt-0.5">{farmer.products.length} items</p>
              </div>
            </div>
            <h3 className="font-[var(--font-heading)] text-sm text-[var(--color-forest)] mb-2">Their Story</h3>
            <p className="text-sm text-[var(--color-text)]/80 leading-relaxed">{farmer.story}</p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

FarmerModal.propTypes = {
  farmer: PropTypes.object,
  onClose: PropTypes.func.isRequired,
}

export default FarmerModal
