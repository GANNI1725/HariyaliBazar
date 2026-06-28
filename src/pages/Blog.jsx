import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Tag, User } from 'lucide-react'
import { blogPosts, blogCategories, calculateReadingTime } from '../data/blogPosts'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Blog = () => {
  useDocumentTitle('Blog')
  const [category, setCategory] = useState('all')
  const filtered =
    category === 'all'
      ? blogPosts
      : blogPosts.filter((p) => p.category === category)

  return (
    <section className="w-full py-10 sm:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-[var(--color-leaf)]">
            HariyaliBazar Journal
          </span>
          <h1 className="font-[var(--font-heading)] text-2xl sm:text-4xl lg:text-5xl text-[var(--color-forest)] mt-2 mb-3">
            Stories from the Soil
          </h1>
          <p className="text-[var(--color-text)]/70 max-w-2xl mx-auto">
            Recipes, farmer voices, seasonal guides and our small contributions to a more sustainable Nepali kitchen.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {blogCategories.map((c) => (
            <button
              key={c.id}
              onClick={() => setCategory(c.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                category === c.id
                  ? 'bg-[var(--color-forest)] text-[var(--color-pure-white)] shadow-md'
                  : 'bg-[var(--color-linen)] text-[var(--color-text)] hover:bg-[var(--color-sprout)] hover:text-[var(--color-pure-white)]'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="text-center py-12 sm:py-20 text-[var(--color-text)]/60">
            No posts in this category yet.
          </p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 blog-page-grid">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.1 }}
                className="bg-[var(--color-card)] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow group flex flex-col"
              >
                <Link to={`/blog/${p.slug}`} className="block">
                  <div className="aspect-[4/3] sm:aspect-[16/10] max-h-36 sm:max-h-none overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                </Link>
                <div className="p-3 sm:p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text)]/60 mb-3 flex-wrap">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-border)] text-[var(--color-leaf)] font-medium">
                      <Tag size={11} /> {p.categoryLabel}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Clock size={11} /> {calculateReadingTime(p.content)} min read
                    </span>
                  </div>
                  <Link to={`/blog/${p.slug}`}>
                    <h3 className="font-[var(--font-heading)] text-xl text-[var(--color-forest)] mb-2 group-hover:text-[var(--color-leaf)] transition-colors line-clamp-2">
                      {p.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-[var(--color-text)]/70 line-clamp-3 flex-1 mb-3">
                    {p.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-xs text-[var(--color-text)]/60 mt-auto">
                    <span className="inline-flex items-center gap-1">
                      <User size={12} /> {p.author}
                    </span>
                    <span>
                      {new Date(p.date).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
        <style>{`
          @media (max-width: 1023px) {
            .blog-page-grid > :last-child:nth-child(odd) {
              grid-column: 1 / -1;
              justify-self: center;
              width: calc(50% - 0.5rem);
            }
          }
        `}</style>
      </div>
    </section>
  )
}

export default Blog
