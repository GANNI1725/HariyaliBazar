import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, Tag, User, ArrowLeft, ChevronRight } from 'lucide-react'
import { blogPosts, calculateReadingTime } from '../data/blogPosts'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const BlogPost = () => {
  const { slug } = useParams()
  const post = blogPosts.find((p) => p.slug === slug)
  useDocumentTitle(post?.title)
  if (!post) return <Navigate to="/blog" replace />

  const others = blogPosts.filter((p) => p.slug !== slug).slice(0, 3)
  const paragraphs = (post.content || '').split('\n\n')

  const renderParagraph = (text, key) => {
    if (text.startsWith('**') && text.endsWith('**')) {
      return (
        <h3 key={key} className="font-[var(--font-heading)] text-xl text-[var(--color-forest)] mt-6 mb-2">
          {text.replace(/\*\*/g, '')}
        </h3>
      )
    }
    if (text.match(/^\d+\.\s/) || text.startsWith('- ')) {
      const items = text.split('\n').map((l) => l.replace(/^(\d+\.\s|-\s)/, ''))
      const ordered = text.match(/^\d+\.\s/)
      const ListTag = ordered ? 'ol' : 'ul'
      return (
        <ListTag
          key={key}
          className={`${ordered ? 'list-decimal' : 'list-disc'} pl-6 my-4 space-y-2 text-[var(--color-text)]/85`}
        >
          {items.map((it, i) => (
            <li key={`${it}-${i}`}>{it}</li>
          ))}
        </ListTag>
      )
    }
    return (
      <p key={key} className="mb-4 leading-relaxed text-[var(--color-text)]/85">
        {text}
      </p>
    )
  }

  return (
    <article className="w-full py-10 sm:py-14">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center gap-1.5 text-xs sm:text-sm text-[var(--color-text)]/70 mb-6">
          <Link to="/" className="hover:text-[var(--color-leaf)]">Home</Link>
          <ChevronRight size={14} />
          <Link to="/blog" className="hover:text-[var(--color-leaf)]">Blog</Link>
          <ChevronRight size={14} />
          <span className="text-[var(--color-forest)] truncate">{post.title}</span>
        </nav>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-sm text-[var(--color-leaf)] mb-4 hover:text-[var(--color-forest)]"
          >
            <ArrowLeft size={14} /> Back to all posts
          </Link>

          <div className="flex items-center gap-3 flex-wrap text-xs text-[var(--color-text)]/60 mb-3">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[var(--color-border)] text-[var(--color-leaf)] font-medium">
              <Tag size={11} /> {post.categoryLabel}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock size={11} /> {calculateReadingTime(post.content)} min read
            </span>
            <span className="inline-flex items-center gap-1">
              <User size={11} /> {post.author}
            </span>
            <span>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          <h1 className="font-[var(--font-heading)] text-2xl sm:text-4xl lg:text-5xl text-[var(--color-forest)] mb-2 leading-tight">
            {post.title}
          </h1>
          <p className="nepali-text text-lg sm:text-xl text-[var(--color-leaf)] mb-4 sm:mb-6">
            {post.titleNepali}
          </p>

          <img
            src={post.image}
            alt={post.title}
            className="w-full aspect-[16/9] object-cover rounded-2xl shadow-lg mb-8"
          />

          <p className="text-base sm:text-lg text-[var(--color-text)]/80 leading-relaxed font-medium mb-4 sm:mb-6 italic border-l-4 border-[var(--color-sprout)] pl-4">
            {post.excerpt}
          </p>

          <div className="prose-content text-base">
            {paragraphs.map(renderParagraph)}
          </div>

          <div className="mt-10 pt-6 border-t border-[var(--color-border)] flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[var(--color-forest)] text-[var(--color-sprout)] flex items-center justify-center font-bold text-lg">
              {post.author[0]}
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--color-leaf)]">Written by</p>
              <p className="font-semibold text-[var(--color-forest)]">{post.author}</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mt-10 sm:mt-16 pt-8 sm:pt-10 border-t border-[var(--color-border)]"
        >
          <h3 className="font-[var(--font-heading)] text-xl sm:text-2xl text-[var(--color-forest)] mb-4 sm:mb-5">
            Keep Reading
          </h3>
          <div className="grid sm:grid-cols-3 gap-5">
            {others.map((p) => (
              <Link
                key={p.id}
                to={`/blog/${p.slug}`}
                className="group block bg-[var(--color-card)] rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full aspect-[16/10] object-cover"
                />
                <div className="p-4">
                  <p className="text-xs text-[var(--color-leaf)] uppercase tracking-wider mb-1">
                    {p.categoryLabel}
                  </p>
                  <h4 className="font-semibold text-[var(--color-forest)] text-sm group-hover:text-[var(--color-leaf)] transition-colors line-clamp-2">
                    {p.title}
                  </h4>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>
      </div>
    </article>
  )
}

export default BlogPost
