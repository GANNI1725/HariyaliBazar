import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Sparkles } from 'lucide-react'
import VeggieBoxModal from '../products/VeggieBoxModal'

const FeaturedBanner = () => {
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <section className="w-full py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-earth)] text-[var(--color-pure-white)]"
        >
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="p-8 sm:p-12 lg:p-16 z-10">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--color-pure-white)]/20 text-xs uppercase tracking-[0.2em] font-semibold mb-4">
                <Sparkles size={14} /> Easy Pickups
              </span>
              <h3 className="font-[var(--font-heading)] !text-[var(--color-pure-white)] text-3xl sm:text-4xl lg:text-5xl mb-3">
                Weekly Veggie Box
              </h3>
              <p className="text-[var(--color-pure-white)]/90 text-base sm:text-lg mb-6 max-w-md">
                Pick 4 vegetables and 2 fruits of your choice — we'll add a mystery surprise from the farm!
              </p>
              <div className="flex flex-wrap items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold">₨899</span>
                <span className="text-lg line-through text-[var(--color-pure-white)]/60">₨1200</span>
                <span className="px-2 py-1 rounded-md bg-[var(--color-pure-white)] text-[var(--color-accent)] text-xs font-bold">
                  SAVE 25%
                </span>
              </div>
              <button
                onClick={() => setModalOpen(true)}
                className="inline-flex items-center gap-2 bg-[var(--color-pure-white)] text-[var(--color-earth)] font-semibold px-6 py-3 rounded-xl hover:bg-[var(--color-linen)] hover:shadow-lg transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"
              >
                Order Now <ArrowRight size={18} />
              </button>
            </div>
            <div className="relative h-48 sm:h-56 md:h-full min-h-[200px] md:min-h-[280px]">
              <img
                src="/Home-Logo_Section_Pics/Weekly-Veggie-Box.png"
                alt="Weekly veggie box"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-earth)]/40 to-transparent md:bg-none" />
            </div>
          </div>
        </motion.div>
      </div>

      <VeggieBoxModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </section>
  )
}

export default FeaturedBanner
