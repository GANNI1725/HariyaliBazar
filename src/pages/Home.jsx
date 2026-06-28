import { useDocumentTitle } from '../hooks/useDocumentTitle'
import { motion } from 'framer-motion'
import HeroBanner from '../components/home/HeroBanner'
import TrustBar from '../components/home/TrustBar'
import SeasonalBanner from '../components/home/SeasonalBanner'
import MarqueeStrip from '../components/home/MarqueeStrip'
import CategoryTabs from '../components/home/CategoryTabs'
import FeaturedBanner from '../components/home/FeaturedBanner'
import PhilosophySection from '../components/home/PhilosophySection'
import FarmerSpotlight from '../components/home/FarmerSpotlight'
import JuiceBarSection from '../components/home/JuiceBarSection'
import TestimonialsSlider from '../components/home/TestimonialsSlider'
import BlogPreview from '../components/home/BlogPreview'
import NewsletterSection from '../components/home/NewsletterSection'
import DeliveryChecker from '../components/shared/DeliveryChecker'

const Home = () => {
  useDocumentTitle('Home')
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.08 } },
      }}
    >
      <div className="flex flex-col h-[calc(100dvh-4rem)] lg:h-[calc(100dvh-5rem)]">
        <div className="flex-1 min-h-0">
          <HeroBanner />
        </div>
        <TrustBar />
      </div>
      <SeasonalBanner />
      <MarqueeStrip />
      <CategoryTabs />
      <FeaturedBanner />

      <div className="divider-leaf max-w-7xl mx-auto" />

      <PhilosophySection />

      <div className="divider-leaf max-w-7xl mx-auto" />

      <FarmerSpotlight />

      <motion.section
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="w-full py-16 relative"
      >
        <div className="absolute inset-0 bg-dhaka-pattern" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <DeliveryChecker />
        </div>
      </motion.section>

      <JuiceBarSection />

      <div className="divider-leaf max-w-7xl mx-auto" />

      <TestimonialsSlider />
      <BlogPreview />
      <NewsletterSection />
    </motion.div>
  )
}

export default Home
