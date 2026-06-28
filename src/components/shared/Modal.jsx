import PropTypes from 'prop-types'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useFocusTrap } from '../../hooks/useFocusTrap'

const Modal = ({ isOpen, onClose, ariaLabel, children }) => {
  const containerRef = useFocusTrap(isOpen, onClose)

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            ref={containerRef}
            initial={{ scale: 0.95, opacity: 0, y: -10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={ariaLabel}
            className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-sm p-6"
          >
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  ariaLabel: PropTypes.string.isRequired,
  children: PropTypes.node,
}

export default Modal
