import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Tag } from 'lucide-react'
import { blogPosts, calculateReadingTime } from '../../data/blogPosts'
import SectionHeader from '../shared/SectionHeader'

const BlogPreview = () => {
  const latest = blogPosts.slice(0, 3)
  return (
    <section className="w-full py-16 sm:py-20 bg-[var(--color-surface)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="From the Blog"
          title="Stories, Recipes & Wisdom"
          subtitle="Glimpses of life from the farms, plus easy recipes for what's in season."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {latest.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-sm hover:shadow-strong transition-all duration-300 group"
            >
              <Link to={`/blog/${p.slug}`} className="block">
                <div className="aspect-[16/10] sm:aspect-[16/10] max-h-48 sm:max-h-none overflow-hidden">
                  <img
                    src={p.image}
                    alt={p.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text)]/60 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-hover)] text-[var(--color-forest)] font-medium">
                      <Tag size={11} /> {p.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} /> {calculateReadingTime(p.content || '')} min read
                    </span>
                  </div>
                  <h3 className="font-[var(--font-heading)] text-xl text-[var(--color-forest)] mb-2 group-hover:text-[var(--color-leaf)] transition-colors line-clamp-2">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text)]/70 line-clamp-3 mb-4">
                    {p.excerpt}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[var(--color-leaf)] font-medium text-sm">
                    Read more <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[var(--color-leaf)] hover:text-[var(--color-forest)] font-semibold text-lg"
          >
            View all articles <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default BlogPreview
