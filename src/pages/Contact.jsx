import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import Button from '../components/shared/Button'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import DeliveryChecker from '../components/shared/DeliveryChecker'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const Contact = () => {
  useDocumentTitle('Contact Us')
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const onSubmit = () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error('Please fill in all required fields')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      toast.error('Please enter a valid email address')
      return
    }
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      toast.success('\u0927\u0928\u094D\u092F\u0935\u093E\u0926! We will reply within 24 hours \uD83D\uDC9A')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
    <div className="relative min-h-[calc(100vh-4rem)] lg:min-h-[calc(100vh-5rem)] flex flex-col mb-[-5rem] overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/Why-Organic/Let-talk.jpg')` }}
          initial={{ scale: 1.15 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.7, ease: [0.22, 1, 0.36, 1] }}
        />
        <div className="absolute inset-0 bg-[var(--color-pure-black)]/40" />
        <div className="relative z-10 flex flex-col flex-1">
        <section className="w-full py-3 sm:py-5 bg-[var(--color-surface)]/80 backdrop-blur-sm text-center">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="font-[var(--font-heading)] text-xl sm:text-4xl text-[var(--color-forest)] mb-1 sm:mb-1">
                Let's Talk
              </h1>
              <p className="text-[var(--color-forest)] text-sm sm:text-lg">
                Questions about our produce? Curious about partnership? Just want to say hi? We'd love to hear from you.
              </p>
            </motion.div>
          </div>
        </section>

      <section className="w-full pt-8 sm:pt-12 pb-0 flex-1 max-sm:flex-initial">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="flex flex-col gap-6 sm:gap-8">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl text-[var(--color-pure-white)]">
                Get in Touch
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-[var(--color-card)] rounded-2xl p-5 sm:p-6 border border-[var(--color-border)] shadow-sm h-fit"
            >
              <h2 className="font-[var(--font-heading)] text-xl sm:text-2xl text-[var(--color-forest)] mb-0.5">
                Send Us a Message
              </h2>
              <p className="text-sm text-[var(--color-text)]/70 mb-4">
                We reply within 24 hours, Sunday through Friday.
              </p>

              <div className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={update('name')}
                      placeholder="Your name"
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-sprout)]/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update('email')}
                      placeholder="you@example.com"
                      className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-sprout)]/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={form.subject}
                    onChange={update('subject')}
                    placeholder="What's this about?"
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-sprout)]/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">
                    Message *
                  </label>
                  <textarea
                    value={form.message}
                    onChange={update('message')}
                    placeholder="Tell us a little more..."
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-sprout)]/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] resize-none"
                  />
                </div>

                <Button onClick={onSubmit} disabled={loading} fullWidth size="lg">
                  {loading ? (
                    <>
                      <LoadingSpinner size="sm" /> Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} /> Send Message
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="space-y-3">
              {[
                { icon: MapPin, label: 'Visit us', value: 'Hariyali Bazar Pvt. Ltd.\nButwal, Rupandehi, Nepal' },
                { icon: Phone, label: 'Call us', value: '+977-9800000000\nSun \u2013 Fri \u00b7 8 AM \u2013 7 PM' },
                { icon: Mail, label: 'Email us', value: 'hello@hariyalibazar.com.np' },
                { icon: Clock, label: 'Same-Day Cut-Off', value: 'Order by 11 AM for same-day delivery in Butwal & Rupandehi' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex gap-4 p-4 rounded-xl bg-[var(--color-card)] border border-[var(--color-border)]"
                >
                  <div className="w-10 h-10 rounded-full bg-[var(--color-sprout)]/30 text-[var(--color-leaf)] flex items-center justify-center shrink-0">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[var(--color-leaf)] font-semibold mb-1">
                      {label}
                    </p>
                    <p className="text-[var(--color-text)] whitespace-pre-line text-sm">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <DeliveryChecker compact />
          </motion.div>
        </div>
      </section>
    </div>
    </div>

    </>
  )
}

export default Contact
