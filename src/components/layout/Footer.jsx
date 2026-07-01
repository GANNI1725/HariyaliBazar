import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react'
import { motion } from 'framer-motion'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from '../shared/SocialIcons'

const Footer = () => {
  const year = new Date().getFullYear()
  return (
    <motion.footer
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.2 }}
      className="w-full bg-[var(--color-dark-section-bg)] text-[var(--color-pure-white)] mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <img
                src="/Home-Logo_Section_Pics/logo.png"
                alt="HariyaliBazar"
                width="44"
                height="44"
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover bg-[var(--color-sprout)]"
              />
              <span className="font-[var(--font-heading)] text-2xl font-bold">
                HariyaliBazar
              </span>
            </Link>
            <p className="nepali-text text-[var(--color-sprout)] text-lg mb-4">
              किसानसँग जोड्छ, घरसम्म पुर्‍याउँछ।
            </p>
            <p className="text-sm text-[var(--color-pure-white)]/80 leading-relaxed">
              Connecting Nepal's organic farmers with families who care about
              what's on their table.
            </p>
            <div className="flex items-center gap-2 mt-4 text-sm text-[var(--color-sprout)] font-medium">
              <img src="/Home-Logo_Section_Pics/Flag_of_Nepal.gif" alt="Nepal Flag" width="18" height="22" className="rounded" />
              <span className="text-base">Proudly Made in Nepal</span>
            </div>
          </div>

          <div>
            <h4 className="font-[var(--font-heading)] text-lg mb-4 text-[var(--color-sprout)]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ['/', 'Home'],
                ['/products', 'Products'],
                ['/about', 'About Us'],
                ['/why-organic', 'Why Organic'],
                ['/blog', 'Blog'],
                ['/contact', 'Contact'],
              ].map(([to, label]) => (
                <li key={to}>
                  <Link
                    to={to}
                    className="hover:text-[var(--color-sprout)] transition-colors text-[var(--color-pure-white)]/80"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[var(--font-heading)] text-lg mb-4 text-[var(--color-sprout)]">
              Categories
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                ['vegetables', 'Vegetables'],
                ['fruits', 'Fruits'],
                ['tea-coffee', 'Tea & Coffee'],
                ['lentils', 'Lentils'],
                ['spices', 'Spices'],
                ['dairy', 'Dairy'],
              ].map(([cat, label]) => (
                <li key={cat}>
                  <Link
                    to={`/products?category=${cat}`}
                    className="hover:text-[var(--color-sprout)] transition-colors text-[var(--color-pure-white)]/80"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-[var(--font-heading)] text-lg mb-4 text-[var(--color-sprout)]">
              Visit Us
            </h4>
            <ul className="space-y-3 text-sm text-[var(--color-pure-white)]/80">
              <li className="flex items-start gap-2">
                <MapPin size={16} className="mt-0.5 shrink-0 text-[var(--color-sprout)]" />
                <span>Hariyali Bazar Pvt. Ltd.<br />Butwal, Rupandehi, Nepal</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone size={16} className="mt-0.5 shrink-0 text-[var(--color-sprout)]" />
                <a href="tel:+9779800000000" className="hover:text-[var(--color-sprout)]">
                  +977-9800000000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={16} className="mt-0.5 shrink-0 text-[var(--color-sprout)]" />
                <a
                  href="mailto:hello@hariyalibazar.com.np"
                  className="hover:text-[var(--color-sprout)]"
                >
                  hello@hariyalibazar.com.np
                </a>
              </li>
            </ul>

            <div className="mt-5">
              <p className="text-xs uppercase tracking-wider text-[var(--color-sprout)] mb-2">
                Follow Us
              </p>
              <div className="flex gap-3">
                {[
                  [FacebookIcon, 'Facebook', 'https://facebook.com', 'hover:bg-[#1877F2] hover:shadow-[0_0_12px_#1877F2]'],
                  [InstagramIcon, 'Instagram', 'https://instagram.com', 'hover:bg-[#E4405F] hover:shadow-[0_0_12px_#E4405F]'],
                  [YoutubeIcon, 'YouTube', 'https://youtube.com', 'hover:bg-[#FF0000] hover:shadow-[0_0_12px_#FF0000]'],
                ].map(([Icon, label, href, hoverCls], i) => (
                  <motion.a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in new tab)`}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ delay: i * 0.1, duration: 0.3 }}
                    whileHover={{ scale: 1.15, rotate: [0, -8, 8, -4, 0] }}
                    className={`w-9 h-9 rounded-full bg-[var(--color-forest)] text-[var(--color-pure-white)] flex items-center justify-center transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-[var(--color-pure-white)] focus-visible:outline-offset-2 ${hoverCls}`}
                  >
                    <Icon size={16} />
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-[var(--color-leaf)]/40">
          <p className="text-xs uppercase tracking-wider text-[var(--color-sprout)] mb-3">
            Payment Methods
          </p>
          <div className="flex flex-wrap gap-4 items-center">
            <img src="/Footer-Payment-Method/E-sewa.png" alt="eSewa" loading="lazy" width="80" height="28" className="h-7 w-auto object-contain" />
            <img src="/Footer-Payment-Method/Khalti.png" alt="Khalti" loading="lazy" width="80" height="28" className="h-7 w-auto object-contain" />
            <img src="/Footer-Payment-Method/Cash-On-Delivery.png" alt="Cash on Delivery" loading="lazy" width="80" height="28" className="h-7 w-auto object-contain" />
            <img src="/Footer-Payment-Method/Bank-Transfer.png" alt="Bank Transfer" loading="lazy" width="80" height="28" className="h-7 w-auto object-contain" />
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[var(--color-leaf)]/40 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--color-pure-white)]/70">
          <p>
            © {year} HariyaliBazar. All rights reserved.<br />
            Designed & Developed under the mentorship of Sweven Incorporate Pvt. Ltd. ·{' '}
            <a
              href="/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 hover:text-[var(--color-sprout)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-pure-white)] focus-visible:outline-offset-2"
            >
              Privacy Policy<ExternalLink size={11} className="mb-0.5" />
            </a>
          </p>
          <p className="italic">
            Grown in Nepal's soil. Delivered with care. 🌿
          </p>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
