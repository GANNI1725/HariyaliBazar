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
  return (
    <>
      <HeroBanner />
      <TrustBar />
      <SeasonalBanner />
      <MarqueeStrip />
      <CategoryTabs />
      <FeaturedBanner />

      <div className="divider-leaf max-w-7xl mx-auto" />

      <PhilosophySection />

      <div className="divider-leaf max-w-7xl mx-auto" />

      <FarmerSpotlight />

      <section className="w-full py-16 relative">
        <div className="absolute inset-0 bg-dhaka-pattern" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <DeliveryChecker />
        </div>
      </section>

      <JuiceBarSection />

      <div className="divider-leaf max-w-7xl mx-auto" />

      <TestimonialsSlider />
      <BlogPreview />
      <NewsletterSection />
    </>
  )
}

export default Home
