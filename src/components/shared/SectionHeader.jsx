import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const SectionHeader = ({ eyebrow, title, subtitle, center = true, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mb-8 sm:mb-12 ${center ? 'text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <span className="eyebrow mb-2 sm:mb-4">
          {eyebrow}
        </span>
      )}
      <h2 className="heading-md text-[var(--color-charcoal)] mb-2 sm:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p
          className={`text-[var(--color-text-secondary)] max-w-2xl ${
            center ? 'mx-auto' : ''
          } text-base sm:text-lg leading-relaxed`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

SectionHeader.propTypes = {
  eyebrow: PropTypes.string,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  center: PropTypes.bool,
  className: PropTypes.string,
}

export default SectionHeader
