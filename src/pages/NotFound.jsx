import { Link } from 'react-router-dom'
import { Sprout } from 'lucide-react'

const NotFound = () => {
  return (
    <section className="w-full py-24 sm:py-32 text-center px-4">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 rounded-full bg-[var(--color-border)] mx-auto mb-6 flex items-center justify-center">
          <Sprout size={42} className="text-[var(--color-leaf)]" />
        </div>
        <p className="text-7xl font-[var(--font-heading)] text-[var(--color-leaf)] mb-3">
          404
        </p>
        <h1 className="font-[var(--font-heading)] text-2xl sm:text-3xl text-[var(--color-forest)] mb-3">
          This page has wandered off the field
        </h1>
        <p className="text-[var(--color-text)]/70 mb-6 max-w-md mx-auto">
          The page you’re looking for doesn’t exist or has been moved. Let’s get you back to fresh produce.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[var(--color-forest)] text-[var(--color-pure-white)] font-semibold px-6 py-3 rounded-lg hover:bg-[var(--color-leaf)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
        >
          Take me home
        </Link>
      </div>
    </section>
  )
}

export default NotFound
