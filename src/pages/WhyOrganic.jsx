import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { CheckCircle2, XCircle, Sprout, Heart, Leaf, ArrowRight } from 'lucide-react'
import SectionHeader from '../components/shared/SectionHeader'
import Button from '../components/shared/Button'

const benefits = [
  {
    title: 'No Chemical Residue',
    text: 'Our produce is grown without synthetic pesticides, herbicides or chemical fertilisers — what you taste is just food.',
  },
  {
    title: 'Higher Nutritional Density',
    text: 'Studies show organic vegetables can contain higher levels of antioxidants, vitamin C, and key minerals like iron and magnesium.',
  },
  {
    title: 'Better for the Soil',
    text: 'Composting, cover-cropping and rotation keep our partner farms\' soil alive — and alive soil grows tastier food year after year.',
  },
  {
    title: 'Safe for Farm Workers',
    text: 'No chemical exposure means our farmers and their families are not paying the hidden health price of cheap conventional produce.',
  },
  {
    title: 'Protects Water Sources',
    text: 'Without chemical runoff, the streams and groundwater of the Rupandehi region stay cleaner for the next generation.',
  },
  {
    title: 'Climate Friendly',
    text: 'Organic methods sequester carbon in the soil and use less fossil-fuel intensive inputs than chemical agriculture.',
  },
]

const compare = [
  { feature: 'Synthetic pesticides', conventional: false, organic: true },
  { feature: 'Chemical fertilisers', conventional: false, organic: true },
  { feature: 'GMO crops', conventional: false, organic: true },
  { feature: 'Soil biodiversity', conventional: false, organic: true },
  { feature: 'Higher antioxidants', conventional: false, organic: true },
  { feature: 'Fair price for farmers', conventional: false, organic: true },
]

const WhyOrganic = () => {
  return (
    <>
    <div className="relative min-h-screen bg-[#1a2e1a] bg-cover bg-center" style={{ backgroundImage: `url('/Why-Organic/Why-Organic.jpg')` }}>
      <div className="absolute inset-0 bg-[var(--color-pure-black)]/40" />
      <div className="relative z-10">
        <section className="w-full py-12 sm:py-20 bg-[var(--color-surface)]/90">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-[var(--color-forest)] dark:bg-[var(--color-leaf)] text-[var(--color-pure-white)] mb-3 sm:mb-5">
                <Leaf size={20} className="sm:size-[28px]" />
              </div>
              <h1 className="font-[var(--font-heading)] text-2xl sm:text-5xl text-[var(--color-forest)] mb-2 sm:mb-4">
                Why Choose Organic?
              </h1>
              <p className="text-sm sm:text-lg text-[var(--color-text)]/80 max-w-2xl mx-auto">
                Six reasons that explain why every rupee you spend on organic produce is an investment in your health, your community and Nepal's soil.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="w-full py-10 sm:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
              {benefits.map((b, i) => (
                <motion.div
                  key={b.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className="p-4 sm:p-6 bg-[var(--color-card)]/95 rounded-2xl border border-[var(--color-border)] shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="w-11 h-11 rounded-full bg-[var(--color-sprout)]/30 text-[var(--color-leaf)] flex items-center justify-center mb-3">
                    <Sprout size={20} />
                  </div>
                  <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-forest)] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text)]/80 leading-relaxed">
                    {b.text}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full py-10 sm:py-16 bg-[var(--color-linen)]/90"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <SectionHeader
              eyebrow="At a Glance"
              title="Organic vs Conventional"
              subtitle="The honest difference between how most produce reaches Nepali markets and how ours does."
            />

            <div className="overflow-x-auto rounded-2xl bg-[var(--color-card)] shadow-sm border border-[var(--color-border)]">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-[var(--color-border)] bg-[var(--color-border)]">
                    <th className="p-4 text-sm font-semibold text-[var(--color-text)]">Feature</th>
                    <th className="p-4 text-sm font-semibold text-[var(--color-text)] text-center">Conventional</th>
                    <th className="p-4 text-sm font-semibold text-[var(--color-leaf)] text-center">HariyaliBazar Organic</th>
                  </tr>
                </thead>
                <tbody>
                  {compare.map((row) => (
                    <tr key={row.feature} className="border-b border-[var(--color-border)] last:border-0">
                      <td className="p-4 text-sm font-medium">{row.feature}</td>
                      <td className="p-4 text-center">
                        {row.conventional ? (
                          <CheckCircle2 className="inline text-[var(--color-success)]" size={20} />
                        ) : (
                          <XCircle className="inline text-[var(--color-error)]" size={20} />
                        )}
                      </td>
                      <td className="p-4 text-center">
                        {row.organic ? (
                          <CheckCircle2 className="inline text-[var(--color-success)]" size={20} />
                        ) : (
                          <XCircle className="inline text-[var(--color-error)]" size={20} />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="w-full py-10 sm:py-16 bg-[var(--color-card)]/95"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Heart className="mx-auto text-[var(--color-clay)] mb-3 sm:mb-4" size={28} />
            <h3 className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--color-forest)] mb-2 sm:mb-3">
              Eat Well. Live Well. Support Nepal.
            </h3>
            <p className="text-sm sm:text-base text-[var(--color-text)]/70 mb-6 sm:mb-7 max-w-2xl mx-auto">
              Every organic purchase you make is a vote for healthier soil, fairer prices and a more sustainable Nepal.
            </p>
            <Link to="/products">
              <Button size="lg">
                Shop Organic Now <ArrowRight size={18} />
              </Button>
            </Link>
          </div>
        </motion.section>
      </div>
    </div>

    </>
  )
}

export default WhyOrganic