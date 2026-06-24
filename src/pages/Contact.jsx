import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react'
import toast from 'react-hot-toast'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../components/shared/SocialIcons'
import Button from '../components/shared/Button'
import LoadingSpinner from '../components/shared/LoadingSpinner'
import DeliveryChecker from '../components/shared/DeliveryChecker'

const Contact = () => {
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
      toast.success('धन्यवाद! We will reply within 24 hours 💚')
      setForm({ name: '', email: '', subject: '', message: '' })
    }, 1500)
  }

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <section className="w-full py-10 sm:py-20 bg-[var(--color-border)] text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-[var(--font-heading)] text-2xl sm:text-5xl text-[var(--color-forest)] mb-2 sm:mb-3">
              Let’s Talk
            </h1>
            <p className="text-[var(--color-text)]/80 text-sm sm:text-lg">
              Questions about our produce? Curious about partnership? Just want to say hi? We’d love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="w-full py-10 sm:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 sm:gap-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--color-forest)]">
              Get in Touch
            </h2>

            <div className="space-y-4">
              {[
                { icon: MapPin, label: 'Visit us', value: 'Sweven Incorporate Pvt. Ltd.\nButwal, Rupandehi, Nepal' },
                { icon: Phone, label: 'Call us', value: '+977-9800000000\nSun – Fri · 8 AM – 7 PM' },
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

            <div>
              <p className="text-xs uppercase tracking-wider text-[var(--color-leaf)] font-semibold mb-2">
                Follow our story
              </p>
              <div className="flex gap-2">
                {[[FacebookIcon, 'Facebook'], [InstagramIcon, 'Instagram'], [YoutubeIcon, 'YouTube']].map(([Icon, label]) => (
                  <a
                    key={label}
                    href="#"
                    aria-label={label}
                    className="w-10 h-10 rounded-full bg-[var(--color-forest)] text-[var(--color-pure-white)] hover:bg-[var(--color-leaf)] flex items-center justify-center transition-colors"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <DeliveryChecker compact />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-[var(--color-card)] rounded-2xl p-6 sm:p-8 border border-[var(--color-border)] shadow-sm h-fit"
          >
            <h2 className="font-[var(--font-heading)] text-2xl text-[var(--color-forest)] mb-1">
              Send Us a Message
            </h2>
            <p className="text-sm text-[var(--color-text)]/70 mb-5">
              We reply within 24 hours, Sunday through Friday.
            </p>

            <div className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
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
                  placeholder="What’s this about?"
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
                  placeholder="Tell us a little more…"
                  rows={5}
                  className="w-full px-4 py-2.5 rounded-lg border border-[var(--color-sprout)]/40 bg-transparent focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] resize-none"
                />
              </div>

              <Button onClick={onSubmit} disabled={loading} fullWidth size="lg">
                {loading ? (
                  <>
                    <LoadingSpinner size="sm" /> Sending…
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
      </section>
    </>
  )
}

export default Contact
