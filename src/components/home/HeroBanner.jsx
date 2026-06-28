import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination, EffectFade } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sprout, MapPin, ShieldCheck } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'

const slides = [
  {
    eyebrow: 'Freshly Harvested',
    title: '100% Organic.',
    titleAccent: '100% Nepali.',
    subtitle:
      'Hand-picked vegetables, fruits and spices straight from local Nepali farms — never sprayed, never frozen.',
    primaryLabel: 'Shop Fresh Produce',
    primaryTo: '/products',
    secondaryLabel: 'Meet Our Farmers',
    secondaryTo: '/about',
    image:
      '/Home-Logo_Section_Pics/Organic-100p-Nepali.jpg',
    tagline: 'खेतबाट भान्सासम्म',
    districts: 'Tilottama · Dhading · Ilam',
  },
  {
    eyebrow: 'Direct from the Hills',
    title: "From Nepal's Hills",
    titleAccent: 'to Your Kitchen',
    subtitle:
      'We work directly with certified organic farmers across Nepal — paying them fairly, sourcing them seasonally.',
    primaryLabel: 'Explore Farmers',
    primaryTo: '/about',
    secondaryLabel: 'Why Organic?',
    secondaryTo: '/why-organic',
    image:
      '/Home-Logo_Section_Pics/from-nepals-hill-to-your-kitchen.png',
    tagline: 'हाम्रो कथा, हजुरको परिवारको लागि',
    districts: 'Hand-picked · Farmer-direct',
  },
  {
    eyebrow: 'Lightning Fast',
    title: 'Same-Day Delivery',
    titleAccent: 'in Butwal & Tilottama',
    subtitle:
      "Order by 11 AM and we deliver to your door before sundown. Farm-fresh produce shouldn't wait days to reach you.",
    primaryLabel: 'Check Delivery Area',
    primaryTo: '/contact',
    secondaryLabel: 'Browse Products',
    secondaryTo: '/products',
    image:
      '/Home-Logo_Section_Pics/Same-Day-Delivery-in-Butwal.png',
    tagline: 'तुरुन्तै हजुरको घरमा',
    districts: 'Butwal · Siddharthanagar · Tilottama',
  },
]

const wordVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: { delay: i * 0.06, duration: 0.4, ease: 'easeOut' },
  }),
}

const AnimatedWords = ({ text, className }) => {
  const words = text.split(' ')
  return (
    <span className={className} aria-label={text}>
      {words.map((w, i) => (
        <motion.span
          key={`${w}-${i}`}
          custom={i}
          variants={wordVariants}
          initial="hidden"
          animate="visible"
          className="inline-block mr-[0.35em]"
        >
          {w}
        </motion.span>
      ))}
    </span>
  )
}

const SlideImage = ({ image, isActive }) => {
  return (
    <motion.div
      className="absolute inset-0 bg-cover bg-center will-change-transform"
      style={{ backgroundImage: `url(${image})` }}
      initial={{ scale: 1.15 }}
      animate={{
        scale: isActive ? 1 : 1.15,
      }}
      transition={{
        scale: { duration: 2.7, ease: [0.22, 1, 0.36, 1] },
      }}
      aria-hidden
    />
  )
}

const HeroBanner = () => {
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section className="w-full relative h-full">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        autoplay={{ delay: 5500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        effect="fade"
        loop
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="hero-swiper h-full"
      >
        {slides.map((s, i) => (
          <SwiperSlide key={`${s.title}-${i}`} className="h-full">
            <div className="relative min-h-full overflow-hidden h-full">
              <SlideImage image={s.image} isActive={i === activeIndex} />
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-pure-black)]/75 via-[var(--color-pure-black)]/35 to-transparent" />

              <div className="slide-content relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-full flex items-center">
                <div className="max-w-2xl text-[var(--color-pure-white)] py-8 sm:py-12 min-w-0">
                  <motion.span
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                      className="inline-flex items-center gap-2 px-2.5 sm:px-3 py-1 rounded-full bg-[var(--color-forest)]/40 backdrop-blur-sm text-[10px] sm:text-xs uppercase tracking-[0.2em] font-semibold text-[var(--color-sprout)] mb-3 sm:mb-5"
                  >
                    <Sprout size={14} /> {s.eyebrow}
                  </motion.span>

                  <div className="heading-xl !text-[var(--color-pure-white)] leading-tight mb-1 hero-title-mobile">
                    <AnimatedWords text={s.title} />
                  </div>
                  <div className="heading-xl hero-accent-title leading-tight mb-4 sm:mb-6 hero-title-mobile">
                    <AnimatedWords text={s.titleAccent} />
                  </div>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="text-sm sm:text-lg text-[var(--color-pure-white)]/85 mb-3 sm:mb-4 max-w-xl leading-relaxed"
                  >
                    {s.subtitle}
                  </motion.p>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.75 }}
                    className="nepali-text text-[var(--color-clay)]/90 text-base sm:text-xl mb-2"
                  >
                    {s.tagline}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.82 }}
                    className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[var(--color-pure-white)]/70 mb-5 sm:mb-7"
                  >
                    <span className="flex items-center gap-1.5">
                      <MapPin size={12} /> {s.districts}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck size={12} /> Organic
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="flex flex-wrap gap-3"
                  >
                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }} transition={{ type: 'spring', stiffness: 400, damping: 15 }}>
                    <Link
                      to={s.primaryTo}
                      className="hero-btn inline-flex items-center gap-2 bg-[var(--color-forest)] text-[var(--color-pure-white)] font-semibold px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl hover:bg-[var(--color-leaf)] hover:shadow-2xl transition-all duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-pure-white)] focus-visible:outline-offset-2 text-sm sm:text-base"
                    >
                      {s.primaryLabel} <ArrowRight size={16} className="sm:size-[18px]" />
                    </Link>
                    </motion.div>
                    <Link
                      to={s.secondaryTo}
                      className="inline-flex items-center gap-2 bg-[var(--color-pure-white)]/10 text-[var(--color-pure-white)] border border-[var(--color-pure-white)]/25 font-medium px-5 sm:px-7 py-2.5 sm:py-3.5 rounded-xl hover:bg-[var(--color-pure-white)]/20 hover:border-[var(--color-pure-white)]/40 focus-visible:outline-2 focus-visible:outline-[var(--color-pure-white)] focus-visible:outline-offset-2 text-sm sm:text-base"
                    >
                      {s.secondaryLabel}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style>{`
        .hero-swiper .swiper-pagination {
          bottom: 24px !important;
        }
        .hero-swiper .swiper-pagination-bullet {
          background: var(--color-pure-white);
          opacity: 0.4;
          width: 10px;
          height: 10px;
        }
        .hero-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: var(--color-accent);
          width: 28px;
          border-radius: 5px;
        }
        .hero-swiper .swiper-slide .slide-content {
          opacity: 0;
          visibility: hidden;
          transition: opacity 0.35s ease, visibility 0.35s ease;
        }
        .hero-swiper .swiper-slide-active .slide-content {
          opacity: 1;
          visibility: visible;
          transition: opacity 0.5s ease 0.15s, visibility 0s linear 0.15s;
        }
        .hero-swiper .swiper-wrapper,
        .hero-swiper .swiper-slide {
          height: 100%;
        }
        @media (max-width: 639px) {
          .hero-title-mobile { font-size: clamp(1.75rem, 8vw, 2.5rem) !important; }
        }
        .hero-accent-title { color: var(--color-accent); }
        :root[data-theme="dark"] .hero-btn {
          background-color: var(--color-forest);
        }
        :root[data-theme="dark"] .hero-btn:hover {
          background-color: var(--color-leaf);
        }
      `}</style>
    </section>
  )
}

export default HeroBanner
