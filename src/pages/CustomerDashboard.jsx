import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { User, Package, LogOut, MapPin, Calendar, CreditCard, Edit3, X, Check } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const statusColors = {
  delivered: 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]',
  shipped: 'bg-[var(--color-info-bg)] text-[var(--color-info-text)]',
  pending: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]',
  cancelled: 'bg-[var(--color-error-bg)] text-[var(--color-error)]',
}

const CustomerDashboard = () => {
  const { user, logout, isCustomer, updateAddress } = useAuth()
  const navigate = useNavigate()
  const [orders, setOrders] = useState([])
  const [editingAddress, setEditingAddress] = useState(false)
  const [addressDraft, setAddressDraft] = useState('')
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    if (!isCustomer) { navigate('/login', { replace: true }); return }
    const allOrders = (() => {
      try { return JSON.parse(localStorage.getItem('hariyali-orders') || '[]') } catch { return [] }
    })()
    setOrders(allOrders.filter(o => o.userId === user?.id))
  }, [isCustomer, user, navigate])

  const handleLogout = () => setShowLogoutConfirm(true)
  const confirmLogout = () => { logout(); navigate('/') }

  const startEditAddress = () => {
    setAddressDraft(user?.address || '')
    setEditingAddress(true)
  }

  const saveAddress = () => {
    if (addressDraft.trim()) {
      updateAddress(addressDraft.trim())
    }
    setEditingAddress(false)
  }

  if (!isCustomer) return null

  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'cancelled')

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[var(--color-forest)]">My Account</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Welcome back, {user?.name}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-bg)] transition-colors">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-8"
      >
        <div className="md:col-span-1">
          <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-6 text-center">
            <div className="w-20 h-20 mx-auto rounded-full bg-[var(--color-forest)]/10 flex items-center justify-center mb-4">
              <User size={36} className="text-[var(--color-forest)]" />
            </div>
            <h2 className="text-lg font-bold text-[var(--color-text)]">{user?.name}</h2>
            <p className="text-sm text-[var(--color-text-secondary)]">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-xs font-medium bg-[var(--color-forest)]/10 text-[var(--color-forest)] capitalize">{user?.role}</span>

            <div className="mt-4 pt-4 border-t border-[var(--color-border)]">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-medium text-[var(--color-text-secondary)] uppercase tracking-wider flex items-center gap-1">
                  <MapPin size={12} /> Delivery Address
                </p>
                {!editingAddress && (
                  <button onClick={startEditAddress} className="p-1 rounded hover:bg-[var(--color-border)] text-[var(--color-leaf)] transition-colors">
                    <Edit3 size={14} />
                  </button>
                )}
              </div>
              <AnimatePresence mode="wait">
                {editingAddress ? (
                  <motion.div key="edit" initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} className="space-y-2">
                    <input
                      type="text"
                      value={addressDraft}
                      onChange={e => setAddressDraft(e.target.value)}
                      placeholder="Enter your delivery address"
                      className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]"
                    />
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditingAddress(false)} className="p-1.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text-secondary)] transition-colors">
                        <X size={16} />
                      </button>
                      <button onClick={saveAddress} className="p-1.5 rounded-md bg-[var(--color-forest)] text-white hover:bg-[var(--color-leaf)] transition-colors">
                        <Check size={16} />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.p key="display" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-sm text-[var(--color-text)]">
                    {user?.address || 'Not set'}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Total Orders', value: orders.length, color: 'text-[var(--color-forest)]' },
              { label: 'Active Orders', value: activeOrders.length, color: 'text-[var(--color-clay)]' },
              { label: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'text-[var(--color-success)]' },
              { label: 'Total Spent', value: `Rs. ${orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0).toLocaleString()}`, color: 'text-[var(--color-info-text)]' },
            ].map((s) => (
              <div key={s.label} className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-4">
                <p className="text-xs text-[var(--color-text-secondary)]">{s.label}</p>
                <p className={`text-xl font-bold mt-1 ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center gap-2 mb-4">
          <Package size={20} className="text-[var(--color-forest)]" />
          <h2 className="text-lg font-bold text-[var(--color-text)]">Order History</h2>
        </div>

        {orders.length === 0 ? (
          <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-8 sm:p-12 text-center">
            <Package size={48} className="mx-auto text-[var(--color-text-secondary)]/40 mb-3" />
            <p className="text-[var(--color-text-secondary)] font-medium">No orders yet</p>
            <p className="text-sm text-[var(--color-text-secondary)]/70 mt-1">Start shopping to see your orders here</p>
          </div>
        ) : (
          <div className="space-y-3">
            {orders.map(o => (
              <motion.div key={o.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs bg-[var(--color-background)] px-2 py-1 rounded text-[var(--color-text-secondary)]">{o.id}</span>
                    <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${statusColors[o.status]}`}>{o.status}</span>
                  </div>
                  <span className="text-sm text-[var(--color-text-secondary)] flex items-center gap-1">
                    <Calendar size={14} /> {new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </span>
                </div>
                <div className="space-y-1.5 mb-3">
                  {o.items.map((item, i) => (
                    <div key={`${item.name}-${i}`} className="flex justify-between text-sm">
                      <span className="text-[var(--color-text)]">{item.name} <span className="text-[var(--color-text-secondary)]">x{item.qty}</span></span>
                      <span className="text-[var(--color-text-secondary)]">Rs. {item.price * item.qty}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[var(--color-border)]">
                  <div className="flex items-center gap-3 text-xs text-[var(--color-text-secondary)]">
                    <span className="flex items-center gap-1"><MapPin size={12} /> {o.address}</span>
                    <span className="flex items-center gap-1"><CreditCard size={12} /> {o.paymentMethod}</span>
                  </div>
                  <span className="text-base font-bold text-[var(--color-forest)]">Rs. {o.total}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div key="logout-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40" onClick={() => setShowLogoutConfirm(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-sm p-6 text-center" onClick={e => e.stopPropagation()}>
              <LogOut size={40} className="mx-auto text-[var(--color-error)] mb-3" />
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">Logout</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">Cancel</button>
                <button onClick={confirmLogout} className="px-4 py-2 rounded-lg bg-[var(--color-error)] text-white text-sm font-medium hover:bg-[var(--color-error-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">Logout</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default CustomerDashboard
