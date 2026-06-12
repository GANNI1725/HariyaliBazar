import { Component } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Link } from 'react-router-dom'

class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    if (import.meta.env.DEV) {
      console.error('ErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null })
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="w-full min-h-screen flex items-center justify-center bg-[var(--color-background)] p-4">
          <div className="max-w-md w-full text-center">
            <div className="w-20 h-20 rounded-full bg-[var(--color-red)]/10 mx-auto mb-5 flex items-center justify-center">
              <AlertTriangle size={36} className="text-[var(--color-red)]" />
            </div>
            <h1 className="font-[var(--font-heading)] text-3xl text-[var(--color-forest)] mb-3">
              Something went wrong
            </h1>
            <p className="text-[var(--color-text)]/70 mb-6">
              An unexpected error occurred. Please try again, or head back to the homepage.
            </p>
            {import.meta.env.DEV && this.state.error && (
              <pre className="text-left text-xs bg-[var(--color-border)] p-3 rounded-lg mb-6 overflow-auto max-h-40">
                {this.state.error.toString()}
              </pre>
            )}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 bg-[var(--color-forest)] text-[var(--color-pure-white)] font-semibold px-5 py-2.5 rounded-lg hover:bg-[var(--color-leaf)] transition-colors"
              >
                <RefreshCw size={16} /> Try again
              </button>
              <Link
                to="/"
                onClick={this.handleReset}
                className="inline-flex items-center gap-2 bg-[var(--color-border)] text-[var(--color-forest)] font-semibold px-5 py-2.5 rounded-lg hover:bg-[var(--color-sprout)] hover:text-[var(--color-pure-white)] transition-colors"
              >
                <Home size={16} /> Go home
              </Link>
            </div>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

export default ErrorBoundary
