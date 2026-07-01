import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { Quote, Star, User } from 'lucide-react'
import SectionHeader from '../shared/SectionHeader'
import 'swiper/css'
import 'swiper/css/pagination'

const testimonials = [
  {
    name: 'Anita Shrestha',
    location: 'Butwal',
    text: 'I switched to HariyaliBazar six months ago and the difference is real. My kids actually finish their saag now — the spinach is that much sweeter and crisper.',
    rating: 5,
  },
  {
    name: 'Prakash Adhikari',
    location: 'Siddharthanagar',
    text: 'The Ilam tea is the best I have had outside Ilam itself. Krishna ji\'s story added to my morning cup just makes it special.',
    rating: 4.5,
  },
  {
    name: 'Sunita Tamang',
    location: 'Tilottama',
    text: 'Same-day delivery, fair prices for the farmers, no plastic packaging — finally an online shop in Nepal that I can recommend without hesitation.',
    rating: 5,
  },
  {
    name: 'Rajesh Bhattarai',
    location: 'Devdaha',
    text: 'Pure cow ghee from Maya didi tastes exactly like what my grandmother used to make. That alone is worth every rupee.',
    rating: 5,
  },
  {
    name: 'Renu Thapa',
    location: 'Butwal',
    text: 'I love that I can order fresh vegetables in the morning and have them by lunch. The quality is always consistent and the farmers deserve every bit of support.',
    rating: 4.5,
  },
  {
    name: 'Dipendra KC',
    location: 'Tilottama',
    text: 'The vegetable box subscription is a game changer. I no longer have to think about what to cook — I just open the box and build my meal around what\'s seasonal.',
    rating: 5,
  },
  {
    name: 'Sabina Nepal',
    location: 'Siddharthanagar',
    text: 'My skin has improved noticeably since I switched to organic produce from HariyaliBazar. Less bloated, more energetic. And the masala ko chill sauce is addictive!',
    rating: 4.5,
  },
  {
    name: 'Kiran Basnet',
    location: 'Butwal',
    text: 'Finally, a platform that pays farmers fairly and delivers top-quality produce. The dhading ginger I ordered was incredibly fresh. Highly recommended for anyone who cares about real food.',
    rating: 5,
  },
  {
    name: 'Mina Acharya',
    location: 'Devdaha',
    text: 'I started with just the lentils and now I order almost everything from here. The black rice and mustard oil are staples in my kitchen. Keep up the great work, team!',
    rating: 5,
  },
]

const TestimonialsSlider = () => {
  return (
    <motion.section
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className="w-full py-10 sm:py-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Loved across Butwal & Rupandehi"
          title="What Our Customers Say"
          subtitle="Honest reviews from Nepali families who chose to eat better."
        />

        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          spaceBetween={24}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="testimonial-swiper pb-12"
        >
          {testimonials.map((t, i) => (
            <SwiperSlide key={`${t.name}-${i}`}>
              <motion.div
                whileHover={{ y: -4, scale: 1.02 }}
                transition={{ duration: 0.25 }}
                className="bg-[var(--color-card)] rounded-2xl p-6 shadow-sm hover:shadow-elevated border border-[var(--color-border-light)] h-full flex flex-col transition-shadow duration-300"
              >
                <Quote className="text-[var(--color-accent)] mb-4" size={28} />
                <p className="text-[var(--color-text-secondary)] italic leading-relaxed mb-5 flex-1">
                  "{t.text}"
                </p>
                <div className="flex gap-0.5 mb-3 text-[var(--color-gold)]">
                  {Array.from({ length: Math.floor(t.rating) }).map((_, idx) => (
                    <Star key={idx} size={14} fill="currentColor" />
                  ))}
                  {t.rating % 1 !== 0 && (
                    <span className="relative">
                      <Star size={14} className="text-[var(--color-gold)]/30" fill="currentColor" />
                      <span className="absolute inset-0 overflow-hidden w-1/2">
                        <Star size={14} fill="currentColor" />
                      </span>
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[var(--color-accent)]/20 flex items-center justify-center text-[var(--color-accent)]">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-[var(--color-charcoal)]">{t.name}</p>
                    <p className="text-xs text-[var(--color-text-secondary)]">{t.location}</p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

        <style>{`
          .testimonial-swiper .swiper-pagination-bullet {
            background: var(--color-accent);
            opacity: 0.35;
          }
          .testimonial-swiper .swiper-pagination-bullet-active {
            opacity: 1;
            width: 24px;
            border-radius: 4px;
          }
        `}</style>
      </div>
    </motion.section>
  )
}

export default TestimonialsSlider
