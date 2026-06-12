import PropTypes from 'prop-types'

const LoadingSpinner = ({ size = 'md', label = 'Loading', fullscreen = false }) => {
  const dim =
    size === 'sm'
      ? 'w-4 h-4 border-2'
      : size === 'lg'
      ? 'w-12 h-12 border-4'
      : 'w-8 h-8 border-[3px]'

  const spinner = (
    <span
      role="status"
      aria-label={label}
      className={`inline-block ${dim} border-[var(--color-sprout)] border-t-transparent rounded-full animate-spin`}
    />
  )

  if (fullscreen) {
    return (
      <div className="w-full min-h-[60vh] flex flex-col items-center justify-center gap-3">
        {spinner}
        <p className="text-sm text-[var(--color-text)]/60">{label}…</p>
      </div>
    )
  }

  return spinner
}

LoadingSpinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg']),
  label: PropTypes.string,
  fullscreen: PropTypes.bool,
}

export default LoadingSpinner
