import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { UserPlus, Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Signup = () => {
  const { signup } = useAuth()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPw, setConfirmPw] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [showConfirmPw, setShowConfirmPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordTouched, setPasswordTouched] = useState(false)
  const [agreed, setAgreed] = useState(false)

  const passwordRules = [
    { label: 'At least 8 characters', test: p => p.length >= 8 },
    { label: 'One uppercase letter', test: p => /[A-Z]/.test(p) },
    { label: 'One lowercase letter', test: p => /[a-z]/.test(p) },
    { label: 'One number', test: p => /[0-9]/.test(p) },
    { label: 'One special character', test: p => /[^A-Za-z0-9]/.test(p) },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !phone.trim() || !password.trim() || !confirmPw.trim()) { setError('Please fill in all fields'); return }
    if (password !== confirmPw) { setError('Passwords do not match'); return }
    if (!agreed) { setError('You must agree to the Terms & Conditions and Privacy Policy'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 400))
    const result = signup(name, email, password, phone)
    setLoading(false)
    if (!result.success) { setError(result.error); return }
    navigate('/')
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-12 relative bg-cover bg-center pt-20" style={{ backgroundImage: 'url(/Home-Logo_Section_Pics/Login-Page.-BG.png)' }}>
      <div className="absolute inset-0 bg-[var(--color-pure-black)]/60" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md relative">
        <div className="bg-[var(--color-card)] rounded-2xl shadow-lg border border-[var(--color-border)] p-8">
          <div className="text-center mb-8">
            <div className="w-14 h-14 mx-auto rounded-full bg-[var(--color-forest)]/10 flex items-center justify-center mb-4">
              <UserPlus size={28} className="text-[var(--color-forest)]" />
            </div>
            <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[var(--color-forest)]">Create Account</h1>
            <p className="text-sm text-[var(--color-text-secondary)] mt-1">Join HariyaliBazar today</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Full Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  type="text" value={name} onChange={e => setName(e.target.value)}
                  placeholder="Your name" autoFocus
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] placeholder:text-[var(--color-text-secondary)]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Email</label>
              <div className="relative">
                <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="you@gmail.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] placeholder:text-[var(--color-text-secondary)]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  type="tel" value={phone} onChange={e => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] placeholder:text-[var(--color-text-secondary)]/50"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  type={showPw ? 'text' : 'password'} value={password} onChange={e => { setPassword(e.target.value); if (!passwordTouched) setPasswordTouched(true) }}
                  placeholder="Create a strong password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] placeholder:text-[var(--color-text-secondary)]/50"
                />
                <button type="button" onClick={() => setShowPw(o => !o)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {passwordTouched && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-2 overflow-hidden"
                >
                  {passwordRules.every(r => r.test(password)) ? (
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-xs text-green-600 font-medium flex items-center gap-1"
                    >
                      <span className="text-green-600 text-sm">✓</span> Strong password
                    </motion.p>
                  ) : (
                    <div className="space-y-1">
                      {passwordRules.map((rule) => (
                        <div key={rule.label} className={`flex items-center gap-1.5 text-xs ${rule.test(password) ? 'text-green-600' : 'text-[var(--color-text-secondary)]'}`}>
                          <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${rule.test(password) ? 'border-[var(--color-success)] bg-[var(--color-success-bg)]' : 'border-[var(--color-border)]'}`}>
                            {rule.test(password) ? <span className="text-green-600 text-[8px]">✓</span> : <span className="text-[8px]">○</span>}
                          </span>
                          {rule.label}
                        </div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)]" />
                <input
                  type={showConfirmPw ? 'text' : 'password'} value={confirmPw} onChange={e => setConfirmPw(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] placeholder:text-[var(--color-text-secondary)]/50"
                />
                <button type="button" onClick={() => setShowConfirmPw(o => !o)} aria-label="Toggle password visibility" className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-text-secondary)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">
                  {showConfirmPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p className="text-sm text-[var(--color-error)] bg-[var(--color-error-bg)] px-3 py-2 rounded-lg">{error}</p>}

            <label className="flex items-start gap-2 text-sm text-[var(--color-text-secondary)] cursor-pointer leading-relaxed">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="mt-1 shrink-0 rounded border-[var(--color-border)] text-[var(--color-leaf)] focus:ring-[var(--color-leaf)]" />
              <span>
                I agree to the{' '}
                <Link to="/terms" target="_blank" rel="noopener noreferrer" className="text-[var(--color-leaf)] hover:brightness-75 font-medium">
                  Terms & Conditions
                </Link>{' '}and{' '}
                <Link to="/privacy" target="_blank" rel="noopener noreferrer" className="text-[var(--color-leaf)] hover:brightness-75 font-medium">
                  Privacy Policy
                </Link>
              </span>
            </label>

            <button
              type="submit" disabled={loading}
              className="w-full py-2.5 rounded-lg bg-[var(--color-forest)] text-white font-semibold hover:bg-[var(--color-leaf)] transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-[var(--color-text-secondary)] mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-[var(--color-leaf)] font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}

export default Signup
