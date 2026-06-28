import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronLeft, FileText } from 'lucide-react'

const sections = [
  { title: '1. Acceptance of Terms', body: 'By creating an account or using HariyaliBazar, you agree to these Terms. If you do not agree, please do not use the Platform.' },
  { title: '2. About HariyaliBazar', body: 'HariyaliBazar connects organic farmers from districts across Nepal with customers in the Kathmandu Valley, facilitating the sale of fresh organic produce.' },
  { title: '3. Eligibility', body: 'Users must be at least 18 years old and residents of Nepal. All registration information must be accurate and up to date.' },
  { title: '4. Account Responsibilities', body: 'Users are responsible for keeping credentials confidential. HariyaliBazar is not liable for loss resulting from unauthorised account access.' },
  { title: '5. Orders & Payments', body: 'All prices are in Nepali Rupees (NPR). Orders are subject to availability. HariyaliBazar may cancel any order and issue a full refund if a product becomes unavailable.' },
  { title: '6. Delivery', body: 'Delivery is available within the Kathmandu Valley. Timelines are estimated and may vary. HariyaliBazar is not responsible for delays outside our control.' },
  { title: '7. Returns & Refunds', body: 'Due to the perishable nature of produce, returns are accepted only for damaged or incorrectly delivered items. Requests must be made within 24 hours of delivery with photographic evidence. Approved refunds are processed within 5–7 business days.' },
  { title: '8. Prohibited Use', body: 'Users must not engage in fraudulent activity, post false reviews, resell products commercially without agreement, or violate Nepali law.' },
  { title: '9. Intellectual Property', body: 'All content — logos, images, text — is owned by HariyaliBazar or its content providers. Reproduction without written permission is prohibited.' },
  { title: '10. Limitation of Liability', body: 'HariyaliBazar provides the Platform on an "as is" basis and is not liable for indirect, incidental, or consequential damages.' },
  { title: '11. Changes to Terms', body: 'We may update these Terms. Continued use after changes constitutes acceptance. Registered users will be notified of significant changes by email.' },
  { title: '12. Governing Law', body: 'These Terms are governed by Nepali law. Disputes fall under the jurisdiction of courts in Kathmandu, Nepal.' },
  { title: '13. Contact', body: 'For questions, visit the Contact page or email support@hariyalibazar.com.' },
]

const TermsConditions = () => {
  return (
    <div className="min-h-screen bg-[var(--color-background)] pt-24 pb-10 sm:pb-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
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
            <FileText size={28} className="text-[var(--color-forest)]" />
          </div>
          <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[var(--color-forest)]">Terms & Conditions</h1>
          <p className="text-sm text-[var(--color-text-secondary)] mt-1">Last updated: June 2025</p>
        </div>

        <div className="bg-[var(--color-card)] rounded-2xl border border-[var(--color-border)] p-5 sm:p-8 space-y-5 sm:space-y-6">
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

export default TermsConditions