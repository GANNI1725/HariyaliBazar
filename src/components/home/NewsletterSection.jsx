import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Mail, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../shared/Button'
import LoadingSpinner from '../shared/LoadingSpinner'

const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)

const NewsletterSection = () => {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const loadingTimer = useRef(null)
  const successTimer = useRef(null)

  useEffect(() => {
    return () => {
      if (loadingTimer.current) clearTimeout(loadingTimer.current)
      if (successTimer.current) clearTimeout(successTimer.current)
    }
  }, [])

  const onSubmit = () => {
    if (!isValidEmail(email)) {
      toast.error('Please enter a valid email address')
      return
    }
    setLoading(true)
    loadingTimer.current = setTimeout(() => {
      setLoading(false)
      setSuccess(true)
      toast.success('Welcome to HariyaliBazar! 💚 Check your inbox.')
      setEmail('')
      successTimer.current = setTimeout(() => setSuccess(false), 5000)
    }, 1500)
  }

  return (
    <section className="w-full pt-10 pb-0 sm:pt-14 sm:pb-0 -mb-6">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="rounded-2xl bg-gradient-to-br from-[var(--color-dark-section-from)] to-[var(--color-dark-section-to)] text-[var(--color-pure-white)] p-8 sm:p-10 lg:p-12 text-center relative overflow-hidden"
        >
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-[var(--color-sprout)]/20" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full bg-[var(--color-sprout)]/15" />

          <div className="relative">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-accent)] text-[var(--color-pure-white)] mb-4">
              <Mail size={22} />
            </div>
            <h3 className="font-[var(--font-heading)] !text-[var(--color-pure-white)] text-2xl sm:text-3xl mb-2">
              Join Our Hariyali Family
            </h3>
            <p className="text-[var(--color-pure-white)]/90 mb-1 max-w-xl mx-auto text-sm">
              Subscribe for seasonal recipes, farmer stories and early access to new harvests.
            </p>
            <p className="text-[var(--color-sprout)] text-sm font-semibold mb-5">
              Get ₨100 off your first order
            </p>

            <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} className="flex flex-col sm:flex-row gap-2 max-w-sm mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                aria-label="Email address"
                disabled={loading}
                className="flex-1 px-3 py-2.5 rounded-lg bg-[var(--color-pure-white)] text-[var(--color-text)] text-sm placeholder:text-[var(--color-text-placeholder)] outline-none focus:ring-2 focus:ring-[var(--color-sprout)] disabled:opacity-50"
              />
              <Button
                type="submit"
                variant="accent"
                size="sm"
                disabled={loading}
                className="shrink-0"
              >
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" /> Sending…
                  </>
                ) : success ? (
                  <>
                    <CheckCircle2 size={16} /> Subscribed
                  </>
                ) : (
                  'Subscribe'
                )}
              </Button>
            </form>

            <p className="text-xs text-[var(--color-pure-white)]/60 mt-4">
              We respect your inbox. Unsubscribe anytime.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default NewsletterSection
