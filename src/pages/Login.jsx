import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { LogIn, Eye, EyeOff, Mail, Lock } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email.trim() || !password.trim()) { setError('Please fill in all fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const result = login(email, password)
    setLoading(false)
    if (!result.success) { setError(result.error); return }
    navigate(result.role === 'admin' ? '/admin' : '/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative bg-cover bg-center pt-20" style={{ backgroundImage: 'url(/Home-Logo_Section_Pics/Login-Page.-BG.png)' }}>
      <div className="absolute inset-0 bg-[var(--color-pure-black)]/60" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative">
        <div className="bg-[var(--color-card)] rounded-2xl shadow-lg border border-[var(--color-border)] p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-forest)]/10 flex items-center justify-center mb-4">
              <LogIn size={28} className="text-[var(--color-forest)]" />
            </div>
            <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[var(--color-forest)]">Welcome Back</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] placeholder:text-[var(--color-text-secondary)]/50 autofill:bg-[var(--color-background)] autofill:text-[var(--color-text)]"
                  autoComplete="email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] placeholder:text-[var(--color-text-secondary)]/50 autofill:bg-[var(--color-background)] autofill:text-[var(--color-text)]"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw(o => !o)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-bg)] px-3 py-2 rounded-lg">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[var(--color-forest)] text-white font-semibold hover:bg-[var(--color-leaf)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Sign In'}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-[var(--color-leaf)] font-medium hover:underline">Sign up</Link>
          </p>

          <div className="mt-6 pt-5 border-t border-[var(--color-border)]">
            <p className="text-xs text-[var(--color-text-secondary)] text-center mb-3">Demo Credentials</p>
            <div className="space-y-2 text-xs text-[var(--color-text-secondary)]">
              <div className="flex justify-between items-center px-3 py-1.5 rounded-lg bg-[var(--color-background)]">
                <span className="font-medium text-[var(--color-forest)]">Admin</span>
                <span>Ganesh@gmail.com / Admin@123</span>
              </div>
              <div className="flex justify-between items-center px-3 py-1.5 rounded-lg bg-[var(--color-background)]">
                <span className="font-medium text-[var(--color-forest)]">Customer</span>
                <span>Customer@gmail.com / Customer@123</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default Login
