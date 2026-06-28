import { memo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MapPin, Calendar, Leaf, Star } from 'lucide-react'
import { farmers } from '../../data/farmers'
import SectionHeader from '../shared/SectionHeader'

const FarmerSpotlight = memo(() => {

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
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
              className=""
            >
              <Link
                to={`/about#farmer-${f.id}`}
                className="relative block text-left bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-sm hover:shadow-strong hover:scale-[1.02] transition-all duration-300 group border-l-4 border-[var(--color-accent)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2"
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
              </Link>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  )
})

FarmerSpotlight.displayName = 'FarmerSpotlight'

export default FarmerSpotlight
