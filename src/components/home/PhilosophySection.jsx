import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Sprout, Heart, Users, Truck } from 'lucide-react'

const pillars = [
  {
    icon: Sprout,
    title: 'Grown Naturally',
    text: 'No synthetic pesticides. No chemical fertilisers. Just soil, sun and traditional Nepali wisdom.',
  },
  {
    icon: Users,
    title: 'Farmer First',
    text: 'We pay our partner farmers fairly and within days, not months. Their livelihoods are not an afterthought.',
  },
  {
    icon: Heart,
    title: 'Picked Fresh',
    text: 'Hand-harvested early in the morning and packed within hours — so the food on your plate hasn\'t lost its life.',
  },
  {
    icon: Truck,
    title: 'Delivered Same-Day',
    text: 'Across Butwal & Rupandehi we deliver the same day you order. Freshness shouldn\'t require waiting.',
  },
]

const PhilosophySection = () => {
  return (
    <section className="w-full py-16 sm:py-20 relative">
      <div className="absolute inset-0 bg-dhaka-pattern" />
      <div className="absolute inset-0 bg-grain" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative"
        >
          <img
            src="/Home-Logo_Section_Pics/From-Farm-to-Table.png"
            alt="From Farm to Table"
            loading="lazy"
            className="rounded-3xl shadow-strong w-full aspect-[4/3] sm:aspect-[4/5] object-cover"
          />
          <div className="absolute -bottom-6 -right-6 hidden md:block bg-[var(--color-accent)] text-[var(--color-pure-white)] p-6 rounded-2xl shadow-strong max-w-[220px]">
            <p className="font-[var(--font-heading)] text-3xl mb-1 !text-[var(--color-pure-white)]">6</p>
            <p className="text-sm text-[var(--color-pure-white)]/90">Partner Farmers across 4 districts</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="eyebrow">Our Philosophy</span>
          <h2 className="heading-sm text-[var(--color-charcoal)] mt-3 mb-4">
            From Farm to Table — Honestly.
          </h2>
          <p className="text-[var(--color-text-secondary)] mb-6 leading-relaxed">
            HariyaliBazar isn't a supermarket. It's a direct line between Nepali farmers and Nepali kitchens. We measure ourselves not on margin, but on the freshness of every leaf and the fairness of every rupee.
          </p>

          <div className="grid sm:grid-cols-2 gap-4">
            {pillars.map((p) => {
              const Icon = p.icon
              return (
                <div
                  key={p.title}
                  className="p-4 rounded-xl bg-[var(--color-card)] border border-[var(--color-border-light)] shadow-sm"
                >
                  <Icon className="text-[var(--color-accent)] mb-2" size={22} />
                  <h4 className="font-semibold text-[var(--color-charcoal)] mb-1">
                    {p.title}
                  </h4>
                  <p className="text-sm text-[var(--color-text-secondary)]">
                    {p.text}
                  </p>
                </div>
              )
            })}
          </div>

          <Link
            to="/about"
            className="inline-block mt-6 text-[var(--color-leaf)] hover:text-[var(--color-forest)] font-semibold"
          >
            Read our full story →
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default PhilosophySection
