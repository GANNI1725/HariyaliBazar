import { useState, useEffect, useMemo, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Edit3, Trash2, X, LogOut, Package, Users, ShoppingBag, AlertTriangle, ChevronDown, Upload, Tags, Truck } from 'lucide-react'
import toast from 'react-hot-toast'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../context/ProductContext'
import { farmers } from '../data/farmers'
import { deliveryZones as initialZones, saveDeliveryZones } from '../data/deliveryZones'


const EMPTY_PRODUCT = { name: '', nameNepali: '', category: 'vegetables', price: '', originalPrice: '', unit: 'kg', inStock: true, isOrganic: true, isSameDay: false, description: '', farmer: '', farmerId: '', images: [''] }
const EMPTY_ZONE = { area: '', district: 'Rupandehi', sameDay: true, fee: '' }

const AdminPanel = () => {
  const { user, logout, isAdmin } = useAuth()
  const { products, updateProducts, categories, updateCategories } = useProducts()
  const navigate = useNavigate()
  const [tab, setTab] = useState('products')
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState(EMPTY_PRODUCT)
  const [deleteId, setDeleteId] = useState(null)
  const [openDropdownId, setOpenDropdownId] = useState(null)
  const [dragOver, setDragOver] = useState(false)
  const fileRef = useRef(null)
  const [showCatModal, setShowCatModal] = useState(false)
  const [catForm, setCatForm] = useState({ icon: '', name: '', description: '' })
  const [zones, setZones] = useState(() => [...initialZones])
  const [showZoneModal, setShowZoneModal] = useState(false)
  const [editingZone, setEditingZone] = useState(null)
  const [zoneForm, setZoneForm] = useState(EMPTY_ZONE)
  const [pinPrompt, setPinPrompt] = useState(false)
  const [pinValue, setPinValue] = useState('')
  const [usersUnlocked, setUsersUnlocked] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  useEffect(() => {
    if (!isAdmin) { navigate('/login', { replace: true }); return }
    try { setOrders(JSON.parse(localStorage.getItem('hariyali-orders') || '[]')) } catch { setOrders([]) }
    try { setUsers(JSON.parse(localStorage.getItem('hariyali-users') || '[]')) } catch { setUsers([]) }
  }, [isAdmin, navigate])

  useEffect(() => {
    if (!openDropdownId) return
    const close = () => setOpenDropdownId(null)
    window.addEventListener('click', close)
    return () => window.removeEventListener('click', close)
  }, [openDropdownId])

  const grouped = useMemo(() => {
    const map = {}
    products.forEach(p => {
      if (!map[p.category]) map[p.category] = []
      map[p.category].push(p)
    })
    return categories.filter(c => map[c.id]).map(c => ({ category: c, items: map[c.id] }))
  }, [products, categories])

  const stats = useMemo(() => ({
    totalProducts: products.length,
    totalOrders: orders.length,
    totalUsers: users.length,
    revenue: orders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + o.total, 0),
  }), [products, orders, users])

  const handleLogout = () => setShowLogoutConfirm(true)
  const confirmLogout = () => { logout(); navigate('/') }

  const saveProducts = (updated) => {
    updateProducts(updated)
  }

  const openAdd = () => { setForm(EMPTY_PRODUCT); setEditing(null); setShowModal(true) }
  const openEdit = (p) => { setForm({ ...p, price: String(p.price), originalPrice: p.originalPrice ? String(p.originalPrice) : '', images: p.images?.length ? p.images : [''] }); setEditing(p.id); setShowModal(true) }

  const handleImage = (file) => {
    if (!file || !file.type.startsWith('image/')) { toast.error('Please select an image file'); return }
    const reader = new FileReader()
    reader.onload = (e) => setForm(f => ({ ...f, images: [e.target.result] }))
    reader.readAsDataURL(file)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleImage(e.dataTransfer.files[0])
  }

  const handleFileChange = (e) => {
    handleImage(e.target.files[0])
    e.target.value = ''
  }

  const handleSave = (e) => {
    e.preventDefault()
    if (!form.name || !form.price) { toast.error('Name and price are required'); return }
    const product = { ...form, price: Number(form.price), id: editing || Date.now() }
    if (editing) {
      saveProducts(products.map(p => p.id === editing ? product : p))
      toast.success('Product updated')
    } else {
      saveProducts([...products, product])
      toast.success('Product added')
    }
    setShowModal(false)
  }

  const confirmDelete = (id) => {
    saveProducts(products.filter(p => p.id !== id))
    setDeleteId(null)
    toast.success('Product deleted')
  }

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map(ord => ord.id === id ? { ...ord, status: newStatus } : ord)
    setOrders(updated)
    localStorage.setItem('hariyali-orders', JSON.stringify(updated))
    toast.success('Order ' + id + ' marked as ' + newStatus)
  }

  if (!isAdmin) return null

  const tabs = [
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Products', icon: Package },
    { id: 'delivery', label: 'Delivery', icon: Truck },
    { id: 'categories', label: 'Categories', icon: Tags },
    { id: 'users', label: 'Users', icon: Users, locked: true },
  ]

  const statCards = [
    { label: 'Products', value: stats.totalProducts, color: 'text-[var(--color-forest)]' },
    { label: 'Orders', value: stats.totalOrders, color: 'text-[var(--color-clay)]' },
    { label: 'Users', value: stats.totalUsers, color: 'text-[var(--color-info-text)]' },
    { label: 'Revenue (NPR)', value: 'Rs. ' + stats.revenue.toLocaleString(), color: 'text-[var(--color-success)]' },
  ]

  const statusStyles = {
    delivered: 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]',
    shipped: 'bg-[var(--color-info-bg)] text-[var(--color-info-text)]',
    cancelled: 'bg-[var(--color-error-bg)] text-[var(--color-error)]',
    pending: 'bg-[var(--color-warning-bg)] text-[var(--color-warning-text)]',
  }

  const inStockColor = (inStock) => inStock
    ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]'
    : 'bg-[var(--color-error-bg)] text-[var(--color-error)]'

  const roleColor = (role) => role === 'admin'
    ? 'bg-[var(--color-special-bg)] text-[var(--color-special-text)]'
    : 'bg-[var(--color-badge-default-bg)] text-[var(--color-text-secondary)]'

  const tabBtnColor = (active) => active
    ? 'bg-[var(--color-forest)] text-white'
    : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text)]'

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-[var(--font-heading)] font-bold text-[var(--color-forest)]">Admin Panel</h1>
          <p className="text-sm text-[var(--color-text-secondary)]">Welcome, {user?.name}</p>
        </div>
        <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-bg)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">
          <LogOut size={16} /> Logout
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8"
      >
        {statCards.map((s) => (
          <div key={s.label} className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-4">
            <p className="text-xs text-[var(--color-text-secondary)]">{s.label}</p>
            <p className={'text-2xl font-bold mt-1 ' + s.color}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-1 mb-6 bg-[var(--color-background)] rounded-lg p-1 border border-[var(--color-border)] overflow-x-auto w-full"
      >
        <div className="flex gap-1 min-w-max sm:min-w-0 w-full sm:w-auto sm:grid sm:grid-cols-5">
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => {
                if (t.locked && !usersUnlocked) { setPinPrompt(true); setPinValue(''); return }
                if (tab === 'users' && t.id !== 'users') { setUsersUnlocked(false) }
                setTab(t.id)
              }}
              className={`flex items-center justify-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-md text-xs sm:text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded whitespace-nowrap ${tabBtnColor(tab === t.id)}`}
            >
              <t.icon size={16} /> {t.label} {t.locked && !usersUnlocked && '🔒'}
            </button>
          ))}
        </div>
      </div>

      {tab === 'products' && (
        <div className="pb-16 md:pb-0">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[var(--color-text-secondary)]">{products.length} products</p>
            <button onClick={openAdd} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-forest)] text-white text-sm font-medium hover:bg-[var(--color-leaf)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">
              <Plus size={16} /> Add Product
            </button>
          </div>
          <div className="space-y-6">
            {grouped.map(({ category: cat, items }) => (
              <div key={cat.id} className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 bg-[var(--color-background)] border-b border-[var(--color-border)]">
                  <span>{cat.icon}</span>
                  <span className="font-semibold text-[var(--color-text)]">{cat.name}</span>
                  <span className="text-xs text-[var(--color-text-secondary)]">{cat.nameNepali}</span>
                  <span className="ml-auto text-xs text-[var(--color-text-secondary)]">{items.length} items</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-[var(--color-text-secondary)]">
                      <tr>
                        <th className="text-left px-4 py-3 font-medium">Name</th>
                        <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Farmer</th>
                        <th className="text-right px-4 py-3 font-medium">Price</th>
                        <th className="text-center px-4 py-3 font-medium hidden sm:table-cell">Stock</th>
                        <th className="text-right px-4 py-3 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[var(--color-border)]">
                      {items.map(p => (
                        <tr key={p.id} className="hover:bg-[var(--color-hover)] transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-medium text-[var(--color-text)]">{p.name}</p>
                            <p className="text-xs text-[var(--color-text-secondary)]">{p.nameNepali}</p>
                          </td>
                          <td className="px-4 py-3 hidden md:table-cell text-[var(--color-text-secondary)] text-xs">{p.farmer || '—'}</td>
                          <td className="px-4 py-3 text-right font-medium text-[var(--color-forest)]">Rs. {p.price}</td>
                          <td className="px-4 py-3 text-center hidden sm:table-cell">
                            <span className={'inline-block px-2 py-0.5 rounded-full text-xs font-medium ' + inStockColor(p.inStock)}>
                              {p.inStock ? 'In Stock' : 'Out'}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button onClick={() => openEdit(p)} aria-label={`Edit ${p.name}`} className="p-1.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-info-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"><Edit3 size={16} /></button>
                              <button onClick={() => setDeleteId(p.id)} aria-label={`Delete ${p.name}`} className="p-1.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-error)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"><Trash2 size={16} /></button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'categories' && (
        <div className="pb-16 md:pb-0">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[var(--color-text-secondary)]">{categories.length} categories</p>
            <button onClick={() => { setCatForm({ icon: '', name: '', description: '' }); setShowCatModal(true) }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-forest)] text-white text-sm font-medium hover:bg-[var(--color-leaf)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">
              <Plus size={16} /> Add Category
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map(cat => (
              <div key={cat.id} className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] p-4 flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[var(--color-text)]">{cat.name}</p>
                  <p className="text-xs text-[var(--color-text-secondary)] mt-0.5">
                    {products.filter(p => p.category === cat.id).length} products
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === 'delivery' && (
        <div className="pb-16 md:pb-0">
          <div className="flex justify-between items-center mb-4">
            <p className="text-sm text-[var(--color-text-secondary)]">{zones.length} delivery zones</p>
            <button onClick={() => { setZoneForm(EMPTY_ZONE); setEditingZone(null); setShowZoneModal(true) }} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--color-forest)] text-white text-sm font-medium hover:bg-[var(--color-leaf)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">
              <Plus size={16} /> Add Zone
            </button>
          </div>
          <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-[var(--color-background)] text-[var(--color-text-secondary)]">
                  <tr>
                    <th className="text-left px-4 py-3 font-medium">Area</th>
                    <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">District</th>
                    <th className="text-center px-4 py-3 font-medium hidden sm:table-cell">Same-Day</th>
                    <th className="text-right px-4 py-3 font-medium">Fee (NPR)</th>
                    <th className="text-right px-4 py-3 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--color-border)]">
                  {zones.map((z, i) => (
                    <tr key={`${z.area}-${i}`} className="hover:bg-[var(--color-hover)] transition-colors">
                      <td className="px-4 py-3 font-medium text-[var(--color-text)]">{z.area}</td>
                      <td className="px-4 py-3 hidden sm:table-cell text-[var(--color-text-secondary)]">{z.district}</td>
                      <td className="px-4 py-3 text-center hidden sm:table-cell">
                        <span className={'inline-block px-2 py-0.5 rounded-full text-xs font-medium ' + (z.sameDay ? 'bg-[var(--color-success-bg)] text-[var(--color-success-text)]' : 'bg-[var(--color-badge-default-bg)] text-[var(--color-text-secondary)]')}>
                          {z.sameDay ? 'Yes' : 'No'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right font-medium text-[var(--color-forest)]">Rs. {z.fee}</td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => { setZoneForm(z); setEditingZone(`${z.area}-${i}`); setShowZoneModal(true) }} aria-label={`Edit ${z.area}`} className="p-1.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-info-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"><Edit3 size={16} /></button>
                          <button onClick={() => { const updated = zones.filter((_, idx) => idx !== i); setZones(updated); saveDeliveryZones(updated); toast.success('Zone deleted') }} aria-label={`Delete ${z.area}`} className="p-1.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-error)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"><Trash2 size={16} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {tab === 'orders' && (
        <div className="bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] pb-16">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-background)] text-[var(--color-text-secondary)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Order ID</th>
                <th className="text-left px-4 py-3 font-medium hidden sm:table-cell">Items</th>
                <th className="text-right px-4 py-3 font-medium">Total</th>
                <th className="text-center px-4 py-3 font-medium">Status</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-[var(--color-hover)] transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-[var(--color-text)]">{o.id}</td>
                  <td className="px-4 py-3 hidden sm:table-cell text-[var(--color-text-secondary)]">{o.items.map(i => i.name).join(', ')}</td>
                  <td className="px-4 py-3 text-right font-medium text-[var(--color-forest)]">Rs. {o.total}</td>
                  <td className="px-4 py-3 text-center">
                    <div className="relative inline-block">
                      <button
                        onClick={e => { e.stopPropagation(); setOpenDropdownId(openDropdownId === o.id ? null : o.id) }}
                        className={'inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium capitalize border transition-colors ' + statusStyles[o.status]}
                      >
                        {o.status}
                        <ChevronDown size={12} />
                      </button>
                      <AnimatePresence>
                        {openDropdownId === o.id && (
                          <motion.div key="status-dropdown"
                            initial={{ opacity: 0, scale: 0.9, y: -4 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: -4 }}
                            transition={{ duration: 0.12 }}
                            className="absolute z-10 mt-1 right-0 min-w-[120px] bg-[var(--color-card)] border border-[var(--color-border)] rounded-lg shadow-lg overflow-hidden"
                          >
                            {['pending', 'shipped', 'delivered', 'cancelled'].map(s => (
                              <button
                                key={s}
                                onClick={() => { handleStatusChange(o.id, s) }}
                                className={'w-full text-left px-3 py-1.5 text-xs font-medium capitalize hover:bg-[var(--color-hover)] transition-colors ' + (o.status === s ? 'text-[var(--color-forest)] font-semibold' : 'text-[var(--color-text-secondary)]')}
                              >
                                {s}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell text-[var(--color-text-secondary)]">{new Date(o.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === 'users' && (
        <div className="pb-16 md:pb-0 bg-[var(--color-card)] rounded-xl border border-[var(--color-border)] overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-[var(--color-background)] text-[var(--color-text-secondary)]">
              <tr>
                <th className="text-left px-4 py-3 font-medium">Name</th>
                <th className="text-left px-4 py-3 font-medium">Email</th>
                <th className="text-left px-4 py-3 font-medium">Phone</th>
                <th className="text-center px-4 py-3 font-medium">Role</th>
                <th className="text-left px-4 py-3 font-medium hidden lg:table-cell">Address</th>
                <th className="text-left px-4 py-3 font-medium hidden md:table-cell">Joined</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--color-border)]">
              {users.map(u => (
                <tr key={u.id} className="hover:bg-[var(--color-hover)] transition-colors">
                  <td className="px-4 py-3 font-medium text-[var(--color-text)]">{u.name}</td>
                  <td className="px-4 py-3 text-[var(--color-text-secondary)]">{u.email}</td>
                  <td className="px-4 py-3 text-[var(--color-text-secondary)]">{u.phone || '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <span className={'inline-block px-2 py-0.5 rounded-full text-xs font-medium capitalize ' + roleColor(u.role)}>{u.role}</span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-[var(--color-text-secondary)] max-w-[200px] truncate">{u.address || '—'}</td>
                  <td className="px-4 py-3 hidden md:table-cell text-[var(--color-text-secondary)]">{new Date(u.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div key="product-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40" onClick={() => setShowModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-6 border-b border-[var(--color-border)]">
                <h2 className="text-lg font-bold text-[var(--color-forest)]">{editing ? 'Edit Product' : 'Add Product'}</h2>
                <button onClick={() => setShowModal(false)} aria-label="Close modal" className="p-1 rounded-md hover:bg-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"><X size={20} /></button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prod-name" className="block text-sm font-medium text-[var(--color-text)] mb-1">Name (English)</label>
                    <input id="prod-name" type="text" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]" />
                  </div>
                  <div>
                    <label htmlFor="prod-name-nep" className="block text-sm font-medium text-[var(--color-text)] mb-1">Name (Nepali)</label>
                    <input id="prod-name-nep" type="text" value={form.nameNepali} onChange={e => setForm(f => ({ ...f, nameNepali: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prod-category" className="block text-sm font-medium text-[var(--color-text)] mb-1">Category</label>
                    <select id="prod-category" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]">
                      {categories.map(c => <option key={c.id} value={c.id}>{c.icon} {c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="prod-unit" className="block text-sm font-medium text-[var(--color-text)] mb-1">Unit</label>
                    <select id="prod-unit" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]">
                      {['kg', 'bundle', 'litre', 'pack', 'bottle', 'piece', '250g', '500g', 'dozen', 'cup', 'box', 'pair'].map(u => <option key={u} value={u}>{u}</option>)}
                    </select>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="prod-price" className="block text-sm font-medium text-[var(--color-text)] mb-1">Price (NPR)</label>
                    <input id="prod-price" type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]" />
                  </div>
                  <div>
                    <label htmlFor="prod-og-price" className="block text-sm font-medium text-[var(--color-text)] mb-1">Original Price (NPR)</label>
                    <input id="prod-og-price" type="number" value={form.originalPrice} onChange={e => setForm(f => ({ ...f, originalPrice: e.target.value }))} placeholder="Leave empty for no discount" className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[var(--color-text)] mb-1">Product Image</label>
                  <div
                    onDragOver={e => { e.preventDefault(); setDragOver(true) }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={handleDrop}
                    onClick={() => fileRef.current?.click()}
                    className={'relative flex flex-col items-center justify-center w-full h-32 rounded-lg border-2 border-dashed cursor-pointer transition-colors ' + (dragOver ? 'border-[var(--color-forest)] bg-[var(--color-forest)]/5' : 'border-[var(--color-border)] hover:border-[var(--color-leaf)]')}
                  >
                    {form.images?.[0] && form.images[0].startsWith('data:') ? (
                      <img src={form.images[0]} alt="Preview" className="h-full object-contain rounded" />
                    ) : (
                      <div className="flex flex-col items-center gap-1 text-[var(--color-text-secondary)]">
                        <Upload size={24} />
                        <span className="text-xs">Browse or drag image here</span>
                      </div>
                    )}
                    {form.images?.[0] && form.images[0].startsWith('data:') && (
                      <button type="button" onClick={e => { e.stopPropagation(); setForm(f => ({ ...f, images: [''] })) }} aria-label="Remove image" className="absolute top-1 right-1 p-0.5 rounded-full bg-[var(--color-error)] text-white text-xs w-5 h-5 flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded"><X size={12} /></button>
                    )}
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                </div>
                <div>
                  <label htmlFor="prod-farmer" className="block text-sm font-medium text-[var(--color-text)] mb-1">Farmer</label>
                  <select id="prod-farmer" value={form.farmerId} onChange={e => { const f = farmers.find(fr => fr.id === Number(e.target.value)); setForm(s => ({ ...s, farmerId: Number(e.target.value), farmer: f ? f.name : '' })) }} className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]">
                    <option value="">— No farmer assigned —</option>
                    {farmers.map(f => <option key={f.id} value={f.id}>{f.name} ({f.district})</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="prod-desc" className="block text-sm font-medium text-[var(--color-text)] mb-1">Description</label>
                  <textarea id="prod-desc" rows={3} value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)] resize-none" />
                </div>
                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                    <input type="checkbox" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))} className="rounded border-[var(--color-border)] text-[var(--color-leaf)] focus:ring-[var(--color-leaf)]" />
                    In Stock
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                    <input type="checkbox" checked={form.isOrganic} onChange={e => setForm(f => ({ ...f, isOrganic: e.target.checked }))} className="rounded border-[var(--color-border)] text-[var(--color-leaf)] focus:ring-[var(--color-leaf)]" />
                    Organic
                  </label>
                  <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                    <input type="checkbox" checked={form.isSameDay} onChange={e => setForm(f => ({ ...f, isSameDay: e.target.checked }))} className="rounded border-[var(--color-border)] text-[var(--color-leaf)] focus:ring-[var(--color-leaf)]" />
                    Same Day
                  </label>
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--color-forest)] text-white text-sm font-medium hover:bg-[var(--color-leaf)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">{editing ? 'Update' : 'Add'} Product</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showCatModal && (
          <motion.div key="category-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40" onClick={() => setShowCatModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
                <h2 className="text-lg font-bold text-[var(--color-forest)]">Add Category</h2>
                <button onClick={() => setShowCatModal(false)} aria-label="Close modal" className="p-1 rounded-md hover:bg-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"><X size={20} /></button>
              </div>
              <form onSubmit={e => {
                e.preventDefault()
                if (!catForm.icon || !catForm.name) { toast.error('Emoji and name are required'); return }
                const id = catForm.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
                if (categories.find(c => c.id === id)) { toast.error('A category with this name already exists'); return }
                updateCategories([...categories, { ...catForm, id }])
                setShowCatModal(false)
                toast.success('Category added')
              }} className="p-5 space-y-4">
                <div>
                  <label htmlFor="cat-emoji" className="block text-sm font-medium text-[var(--color-text)] mb-1">Emoji</label>
                  <input id="cat-emoji" type="text" value={catForm.icon} onChange={e => setCatForm(f => ({ ...f, icon: e.target.value }))} maxLength={2} className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-lg text-center" />
                </div>
                <div>
                  <label htmlFor="cat-name" className="block text-sm font-medium text-[var(--color-text)] mb-1">Name (English)</label>
                  <input id="cat-name" type="text" value={catForm.name} onChange={e => setCatForm(f => ({ ...f, name: e.target.value }))} placeholder="e.g. Grains & Staples" className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm" />
                </div>

                <div>
                  <label htmlFor="cat-desc" className="block text-sm font-medium text-[var(--color-text)] mb-1">Description</label>
                  <textarea id="cat-desc" rows={2} value={catForm.description} onChange={e => setCatForm(f => ({ ...f, description: e.target.value }))} placeholder="Brief description of this category" className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm resize-none" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowCatModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--color-forest)] text-white text-sm font-medium hover:bg-[var(--color-leaf)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2">Add Category</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteId && (
          <motion.div key="delete-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40">
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-sm p-6 text-center">
              <AlertTriangle size={40} className="mx-auto text-[var(--color-error)] mb-3" />
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">Delete Product?</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">This action cannot be undone.</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setDeleteId(null)} className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">Cancel</button>
                <button onClick={() => confirmDelete(deleteId)} className="px-4 py-2 rounded-lg bg-[var(--color-error)] text-white text-sm font-medium hover:bg-[var(--color-error-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">Delete</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {pinPrompt && (
          <motion.div key="pin-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40 backdrop-blur-sm" onClick={() => setPinPrompt(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[var(--color-card)] rounded-3xl shadow-xl border border-[var(--color-border)] w-full max-w-xs p-8 text-center" onClick={e => e.stopPropagation()}>
              <div className="w-16 h-16 mx-auto rounded-full bg-[var(--color-forest)]/10 flex items-center justify-center mb-5">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-[var(--color-forest)]"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">Enter PIN</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">Admin access requires a PIN</p>

              <div className="relative flex justify-center gap-3 mb-6">
                {[0, 1, 2, 3].map(i => (
                  <div
                    key={i}
                    className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
                      pinValue.length > i
                        ? 'bg-[var(--color-forest)] border-[var(--color-forest)]'
                        : 'border-[var(--color-border)]'
                    }`}
                  />
                ))}
                <input
                  type="text" inputMode="numeric" maxLength={4} value={pinValue} autoFocus autoComplete="off" data-1p-ignore=""
                  onChange={e => {
                    const digits = e.target.value.replace(/\D/g, '')
                    setPinValue(digits)
                    if (digits.length === 4) {
                      if (digits === '8848') { setUsersUnlocked(true); setPinPrompt(false); setTab('users') }
                    }
                  }}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ caretColor: 'transparent', WebkitTextSecurity: 'disc' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showZoneModal && (
          <motion.div key="zone-modal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40" onClick={() => setShowZoneModal(false)}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-md" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)]">
                <h2 className="text-lg font-bold text-[var(--color-forest)]">{editingZone ? 'Edit Zone' : 'Add Zone'}</h2>
                <button onClick={() => setShowZoneModal(false)} aria-label="Close modal" className="p-1 rounded-md hover:bg-[var(--color-border)] focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"><X size={20} /></button>
              </div>
              <form onSubmit={e => {
                e.preventDefault()
                if (!zoneForm.area.trim() || !zoneForm.fee) { toast.error('Area and fee are required'); return }
                const zone = { area: zoneForm.area.trim(), district: zoneForm.district, sameDay: zoneForm.sameDay, fee: Number(zoneForm.fee) }
                let updated
                if (editingZone) {
                  updated = zones.map((z, i) => `${z.area}-${i}` === editingZone ? zone : z)
                } else {
                  if (zones.some(z => z.area.toLowerCase() === zone.area.toLowerCase())) { toast.error('Zone with this area already exists'); return }
                  updated = [...zones, zone]
                }
                setZones(updated)
                saveDeliveryZones(updated)
                setShowZoneModal(false)
                toast.success(editingZone ? 'Zone updated' : 'Zone added')
              }} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="zone-area" className="block text-sm font-medium text-[var(--color-text)] mb-1">Area</label>
                    <input id="zone-area" type="text" value={zoneForm.area} onChange={e => setZoneForm(f => ({ ...f, area: e.target.value }))} placeholder="e.g. Butwal" className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]" />
                  </div>
                  <div>
                    <label htmlFor="zone-district" className="block text-sm font-medium text-[var(--color-text)] mb-1">District</label>
                    <input id="zone-district" type="text" value={zoneForm.district} onChange={e => setZoneForm(f => ({ ...f, district: e.target.value }))} placeholder="e.g. Rupandehi" className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]" />
                  </div>
                </div>
                <div>
                  <label htmlFor="zone-fee" className="block text-sm font-medium text-[var(--color-text)] mb-1">Delivery Fee (NPR)</label>
                  <input id="zone-fee" type="number" value={zoneForm.fee} onChange={e => setZoneForm(f => ({ ...f, fee: e.target.value }))} placeholder="e.g. 30" className="w-full px-3 py-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-background)] text-sm text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-leaf)]" />
                </div>
                <label className="flex items-center gap-2 text-sm text-[var(--color-text)]">
                  <input type="checkbox" checked={zoneForm.sameDay} onChange={e => setZoneForm(f => ({ ...f, sameDay: e.target.checked }))} className="rounded border-[var(--color-border)] text-[var(--color-leaf)] focus:ring-[var(--color-leaf)]" />
                  Same-day delivery
                </label>
                <div className="flex justify-end gap-3 pt-2">
                  <button type="button" onClick={() => setShowZoneModal(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2">Cancel</button>
                  <button type="submit" className="px-4 py-2 rounded-lg bg-[var(--color-forest)] text-white text-sm font-medium hover:bg-[var(--color-leaf)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2">{editingZone ? 'Update' : 'Add'} Zone</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLogoutConfirm && (
          <motion.div key="admin-logout-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[var(--color-pure-black)]/40" onClick={() => setShowLogoutConfirm(false)}>
            <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-[var(--color-card)] rounded-2xl shadow-xl border border-[var(--color-border)] w-full max-w-sm p-6 text-center" onClick={e => e.stopPropagation()}>
              <LogOut size={40} className="mx-auto text-[var(--color-error)] mb-3" />
              <h3 className="text-lg font-bold text-[var(--color-text)] mb-1">Logout</h3>
              <p className="text-sm text-[var(--color-text-secondary)] mb-6">Are you sure you want to logout?</p>
              <div className="flex justify-center gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-[var(--color-text-secondary)] hover:bg-[var(--color-border)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">Cancel</button>
                <button onClick={confirmLogout} className="px-4 py-2 rounded-lg bg-[#B91C1C] text-white text-sm font-medium hover:brightness-75 transition-all focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 rounded">Logout</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdminPanel
