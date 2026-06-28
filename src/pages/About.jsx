import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sprout, Users, Heart, Award, Star, MapPin } from 'lucide-react'
import { farmers } from '../data/farmers'
import { products } from '../data/products'
import SectionHeader from '../components/shared/SectionHeader'
import Button from '../components/shared/Button'
import FarmerModal from '../components/shared/FarmerModal'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { useCountUp } from '../hooks/useCountUp'

const stats = [
  { icon: Users, target: farmers.length, suffix: '', label: 'Partner Farmers' },
  { icon: Sprout, target: products.length, suffix: '', label: 'Products' },
  { icon: Heart, target: 1000, suffix: '+', label: 'Happy Families' },
  { icon: Award, target: new Set(farmers.map(f => f.district)).size, suffix: '', label: 'Districts Sourced' },
]

const StatCard = ({ s, i }) => {
  const Icon = s.icon
  const [ref, display] = useCountUp(s.target, 1400)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      className="text-center p-4 sm:p-6 bg-[var(--color-border)] rounded-2xl"
    >
      <Icon className="mx-auto text-[var(--color-leaf)] mb-2 sm:mb-3" size={32} />
      <p className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--color-forest)] mb-1">
        {display}{s.suffix}
      </p>
      <p className="text-sm text-[var(--color-text)]/70">{s.label}</p>
    </motion.div>
  )
}

const About = () => {
  useDocumentTitle('About Us')
  const [selectedFarmer, setSelectedFarmer] = useState(null)

  return (
    <>
      <section className="w-full relative bg-[var(--color-dark-section-bg)] text-[var(--color-pure-white)] py-14 sm:py-28">
        <div className="absolute inset-0 opacity-50 bg-cover bg-center" style={{
          backgroundImage: `url(/About_Section/We-believe-in-honest-food.png)`
        }} />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block text-[10px] sm:text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-sprout)] mb-2 sm:mb-3">
              Our Story
            </span>
            <h1 className="font-[var(--font-heading)] !text-[var(--color-pure-white)] text-3xl sm:text-5xl lg:text-6xl mb-3 sm:mb-5">
              We Believe in Honest Food
            </h1>
            <p className="text-sm sm:text-lg text-[var(--color-pure-white)]/90 max-w-2xl mx-auto">
              HariyaliBazar was born from a simple idea: Nepali families deserve fresh, organic produce, and Nepali farmers deserve a fair price for growing it.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
            {stats.map((s, i) => (
              <StatCard key={s.label} s={s} i={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="w-full py-10 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center"
          >
            <img
              src="/About_Section/How-It-Started.png"
              alt="Internship at Sweven Incorporate, Butwal"
              width="1536"
              height="1024"
              loading="lazy"
              className="rounded-2xl shadow-lg w-full aspect-[3/2] object-cover"
            />
            <div>
              <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--color-forest)] mb-3">
                How It Started
              </h3>
              <p className="text-[var(--color-text)]/80 leading-relaxed">
                In Butwal's bazaars, vegetables look fine but their origin and what was sprayed on them is a mystery. The farms around Rupandehi grow pesticide-free greens, and the hills supply lentils, spices, and coffee from trusted farmers. But middlemen mix them with chemically treated stock and the story is lost. HariyaliBazar delivers straight from these farmers to your door, so your family knows exactly what they are eating.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8 items-center md:[direction:rtl]"
          >
            <img
              src="/About_Section/How-We-Work.png"
              alt="Locally packed, organic produce being delivered"
              width="1536"
              height="1024"
              loading="lazy"
              className="rounded-2xl shadow-lg w-full aspect-[3/2] object-cover md:[direction:ltr]"
            />
            <div className="md:[direction:ltr]">
              <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--color-forest)] mb-3">
                How We Work
              </h3>
              <p className="text-[var(--color-text)]/80 leading-relaxed">
                We partner directly with farmer cooperatives across Rupandehi, Dhading, Ilam, and Dhanusha, no brokers or warehouses in between. Orders before 11 AM go straight to the cooperative, farmers harvest only what was ordered, and it reaches your door the same day, never sitting in cold storage or near chemically treated produce. You order, they harvest, we deliver.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-10 sm:py-16 bg-[var(--color-border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            eyebrow="Our Family"
            title="The Farmers Behind HariyaliBazar"
            subtitle="Every product we sell can be traced back to one of these dedicated organic farmers."
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5 items-start">
            {farmers.map((f, i) => (
              <div key={f.id}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-sm text-center cursor-pointer hover:shadow-strong transition-shadow duration-300"
                  onClick={() => setSelectedFarmer(f)}
                >
                  <div className="relative">
                    <img
                      src={f.image}
                      alt={`Portrait of ${f.name}, organic farmer from ${f.district}`}
                      loading="lazy"
                      width="300"
                      height="300"
                      className="w-full aspect-square object-cover"
                    />
                    {f.farmerOfTheWeek && (
                      <span className="absolute top-3 right-3 inline-flex items-center gap-1 bg-[var(--color-accent)] text-[var(--color-pure-white)] rounded-full px-2.5 py-1 text-xs font-bold shadow">
                        <Star size={10} fill="currentColor" /> Farmer of the Week
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-[var(--color-forest)] text-sm">
                      {f.name}
                    </h4>
                    <p className="text-xs text-[var(--color-text)]/60 mt-0.5">
                      {f.district} · {f.specialty}
                    </p>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full py-10 sm:py-16"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--color-forest)] mb-3">
            A Project by Ganesh Prasad Bhandari
          </h3>
          <p className="text-[var(--color-text)]/70 mb-6 max-w-2xl mx-auto">
            BCA Frontend Internship · Sweven Incorporate Pvt. Ltd. · Butwal, Nepal
            <br />
            Lumbini City College, Tribhuvan University
            <br />
            Mentor: Mr. Sandesh Tiwari · Supervisor: Mr. Suraj Kumar Khattri
          </p>
          <Link to="/products">
            <Button size="lg">Start Shopping</Button>
          </Link>
        </div>
      </motion.section>

      <FarmerModal farmer={selectedFarmer} onClose={() => setSelectedFarmer(null)} />
    </>
  )
}

export default About
