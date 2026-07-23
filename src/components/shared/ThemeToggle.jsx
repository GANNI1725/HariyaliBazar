import { useRef, useState } from 'react'
import { useTheme } from '../../context/ThemeContext'

const ThemeToggle = ({ className = '' }) => {
  const { isDark, toggleTheme } = useTheme()
  const btnRef = useRef(null)
  const [animating, setAnimating] = useState(false)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()

    setAnimating(true)
    setTimeout(() => setAnimating(false), 600)

    const doToggle = () => {
      toggleTheme()
    }

    if (!document.startViewTransition) {
      doToggle()
      return
    }

    const btn = btnRef.current
    if (!btn) {
      doToggle()
      return
    }

    const rect = btn.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2

    document.documentElement.style.setProperty('--x', `${cx}px`)
    document.documentElement.style.setProperty('--y', `${cy}px`)

    document.startViewTransition(doToggle)
  }

  return (
    <button
      ref={btnRef}
      type="button"
      onClick={handleClick}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      aria-pressed={isDark}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={`relative flex items-center justify-center min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] p-1.5 sm:p-2.5 rounded-md text-[var(--color-text)] transition-colors hover:bg-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 ${animating ? 'btn-toggle-anim' : ''} ${className}`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sm:size-[20px] absolute inset-0 m-auto pointer-events-none"
        style={{
          transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isDark ? 'rotate(0deg) scale(1)' : 'rotate(90deg) scale(0)',
          opacity: isDark ? 1 : 0,
        }}
      >
        <circle cx="12" cy="12" r="5" />
        <line x1="12" y1="1" x2="12" y2="3" />
        <line x1="12" y1="21" x2="12" y2="23" />
        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
        <line x1="1" y1="12" x2="3" y2="12" />
        <line x1="21" y1="12" x2="23" y2="12" />
        <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
        <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="sm:size-[20px] absolute inset-0 m-auto pointer-events-none"
        style={{
          transition: 'all 400ms cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isDark ? 'rotate(-90deg) scale(0)' : 'rotate(0deg) scale(1)',
          opacity: isDark ? 0 : 1,
        }}
      >
        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
      </svg>
    </button>
  )
}

export default ThemeToggle
