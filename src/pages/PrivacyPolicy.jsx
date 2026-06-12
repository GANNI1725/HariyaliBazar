import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, ShieldCheck } from 'lucide-react'

const sections = [
  { title: '1. Introduction', body: 'HariyaliBazar is committed to protecting your personal information. This Policy explains how we collect, use, and safeguard your data.' },
  { title: '2. Information We Collect', body: 'When you register or place an order, we collect: Identity data: full name. Contact data: email address and phone number. Delivery data: delivery address within the Kathmandu Valley. Transaction data: orders, payment status, purchase history. Usage data: pages visited, products viewed, session information.' },
  { title: '3. How We Use Your Information', body: 'We use your data to: Process and deliver orders. Send order confirmations and delivery updates via SMS or email. Improve the Platform and personalise your experience. Respond to support enquiries. Send promotional offers (with consent only). Comply with legal obligations under Nepali law.' },
  { title: '4. Data Sharing', body: 'We do not sell your data. We share it only where necessary: Delivery partners — to fulfil orders. Payment processors — to complete transactions securely. Government or regulatory authorities — if required by law. Farmer partners receive only aggregated demand data, not personal details.' },
  { title: '5. Data Storage & Security', body: 'Data is stored on servers within Nepal using industry-standard encryption. Passwords are stored in hashed form and are never visible to staff.' },
  { title: '6. Cookies & Tracking', body: 'We use cookies and localStorage for login persistence, cart state, and usage analytics. You may disable cookies in browser settings, though some features may not function correctly.' },
  { title: '7. Your Rights', body: 'You may: access your data, request corrections, request account deletion, and opt out of marketing at any time. Contact privacy@hariyalibazar.com.' },
  { title: '8. Children\'s Privacy', body: 'HariyaliBazar is not intended for users under 18. We do not knowingly collect data from minors. Contact us immediately if a minor has registered.' },
  { title: '9. Retention', body: 'Data is retained while your account is active or as needed to provide services. Certain records may be kept up to 3 years for legal and accounting purposes.' },
  { title: '10. Changes to This Policy', body: 'We will notify you of significant changes by email or site notice. Continued use after notice constitutes acceptance.' },
  { title: '11. Contact', body: 'For privacy concerns: privacy@hariyalibazar.com or visit the Contact page.' },
]

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Link
          to="/signup"
          className="inline-flex items-center gap-1 text-sm text-[var(--color-leaf)] hover:underline mb-6"
        >
          <ChevronLeft size={16} /> Back to Sign Up
        </Link>

        <div className="text-center mb-8">
          <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-forest)]/10 flex items-center justify-center mb-4">
            <ShieldCheck size={28} className="text-[var(--color-forest)]" />
          </div>
          <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[var(--color-forest)]">Privacy Policy</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Last updated: June 2025</p>
        </div>

        <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-8 space-y-6">
          {sections.map((s) => (
            <div key={s.title}>
              <h2 className="text-lg font-semibold text-[var(--color-forest)] mb-2">{s.title}</h2>
              <p className="text-sm text-[var(--color-text)]/80 leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-[var(--color-text-secondary)] mt-8">
          &copy; 2025 HariyaliBazar &middot; Sweven Incorporate Pvt. Ltd. &middot; Butwal, Nepal
        </p>
      </motion.div>
    </div>
  )
}

export default PrivacyPolicy