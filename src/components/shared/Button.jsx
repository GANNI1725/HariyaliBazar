import PropTypes from 'prop-types'

const variants = {
  primary:
    'bg-[var(--color-forest)] text-[var(--color-pure-white)] hover:bg-[var(--color-leaf)] hover:shadow-warm focus:ring-[var(--color-forest)]',
  secondary:
    'bg-[var(--color-card)] text-[var(--color-forest)] border-2 border-[var(--color-forest)] hover:bg-[var(--color-forest)] hover:text-[var(--color-pure-white)] focus:ring-[var(--color-forest)]',
  outline:
    'border-2 border-[var(--color-leaf)] text-[var(--color-forest)] hover:bg-[var(--color-leaf)] hover:text-[var(--color-pure-white)] focus:ring-[var(--color-leaf)]',
  ghost:
    'text-[var(--color-forest)] hover:bg-[var(--color-hover)] focus:ring-[var(--color-leaf)]',
  accent:
    'bg-[var(--color-accent)] text-[var(--color-pure-white)] hover:bg-[var(--color-accent-hover)] hover:shadow-warm focus:ring-[var(--color-accent)]',
}

const sizes = {
  sm: 'px-3 py-1.5 text-sm rounded-lg',
  md: 'px-5 py-2.5 text-base rounded-xl',
  lg: 'px-8 py-3.5 text-lg rounded-xl',
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
  disabled = false,
  onClick,
  ...rest
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline', 'ghost', 'accent']),
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  fullWidth: PropTypes.bool,
  className: PropTypes.string,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
}

export default Button
