import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import PropTypes from 'prop-types'

const ConfirmModal = ({ isOpen, title, message, confirmLabel, cancelLabel, onConfirm, onCancel }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="confirm-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40 backdrop-blur-sm"
          onClick={onCancel}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-label={title}
            className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-sm p-6 text-center"
          >
            <div className="w-12 h-12 mx-auto rounded-full bg-[var(--color-error-bg)] flex items-center justify-center mb-4">
              <AlertTriangle size={24} className="text-[var(--color-error)]" />
            </div>
            <h3 className="font-[var(--font-heading)] text-lg text-[var(--color-forest)] mb-2">{title}</h3>
            <p className="text-sm text-[var(--color-text-secondary)] mb-6">{message}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={onCancel}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] bg-[var(--color-border)] hover:bg-[var(--color-border-light)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
              >
                {cancelLabel || 'Cancel'}
              </button>
              <button
                onClick={onConfirm}
                className="px-5 py-2.5 rounded-lg text-sm font-medium text-[var(--color-pure-white)] bg-[#B91C1C] hover:brightness-75 transition-all focus-visible:outline-2 focus-visible:outline-[#B91C1C] focus-visible:outline-offset-2"
              >
                {confirmLabel || 'Clear'}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  title: PropTypes.string,
  message: PropTypes.string,
  confirmLabel: PropTypes.string,
  cancelLabel: PropTypes.string,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
}

export default ConfirmModal
