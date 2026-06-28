import PropTypes from 'prop-types'
import { Eye, EyeOff, Lock } from 'lucide-react'

const PasswordInput = ({ value, onChange, placeholder, showPassword, onToggle, autoComplete, id }) => {
  return (
    <div className="relative">
      <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
      <input
        id={id}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] placeholder:text-[var(--color-text-secondary)]/50"
      />
      <button
        type="button"
        onClick={onToggle}
        aria-label={showPassword ? 'Hide password' : 'Show password'}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}

PasswordInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  showPassword: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
  autoComplete: PropTypes.string,
  id: PropTypes.string,
}

export default PasswordInput
