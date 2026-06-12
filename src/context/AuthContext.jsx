import { createContext, useContext, useState, useEffect, useCallback } from 'react'
import toast from 'react-hot-toast'

const SEED_USERS = [
  { id: 'admin-1', name: 'Ganesh Admin', email: 'Ganesh@gmail.com', password: 'Admin@123', role: 'admin', createdAt: new Date().toISOString(), address: '' },
  { id: 'customer-1', name: 'Customer', email: 'Customer@gmail.com', password: 'Customer@123', role: 'customer', createdAt: new Date().toISOString(), address: 'Butwal, Rupandehi' },
]

const SEED_ORDERS = [
  { id: 'ord-1001', userId: 'customer-1', items: [{ productId: 1, name: 'Green Onion', qty: 2, price: 60 }, { productId: 5, name: 'Spinach', qty: 1, price: 40 }], total: 160, status: 'delivered', date: '2026-05-28', address: 'Butwal, Rupandehi', paymentMethod: 'Cash on Delivery' },
  { id: 'ord-1002', userId: 'customer-1', items: [{ productId: 10, name: 'Apples', qty: 1, price: 180 }], total: 180, status: 'shipped', date: '2026-06-02', address: 'Butwal, Rupandehi', paymentMethod: 'Cash on Delivery' },
  { id: 'ord-1003', userId: 'customer-1', items: [{ productId: 15, name: 'Milk', qty: 3, price: 90 }], total: 270, status: 'pending', date: '2026-06-08', address: 'Butwal, Rupandehi', paymentMethod: 'eSewa' },
  { id: 'ord-1004', userId: 'customer-1', items: [{ productId: 3, name: 'Tomato', qty: 2, price: 50 }, { productId: 7, name: 'Cauliflower', qty: 1, price: 120 }], total: 220, status: 'cancelled', date: '2026-05-20', address: 'Butwal, Rupandehi', paymentMethod: 'Cash on Delivery' },
]

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!localStorage.getItem('hariyali-users')) {
      localStorage.setItem('hariyali-users', JSON.stringify(SEED_USERS))
    }
    if (!localStorage.getItem('hariyali-orders')) {
      localStorage.setItem('hariyali-orders', JSON.stringify(SEED_ORDERS))
    }
    const stored = localStorage.getItem('hariyali-current-user')
    if (stored) {
      try { setUser(JSON.parse(stored)) } catch { localStorage.removeItem('hariyali-current-user') }
    }
    setLoading(false)
  }, [])

  const login = useCallback((email, password) => {
    const users = JSON.parse(localStorage.getItem('hariyali-users') || '[]')
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!found) return { success: false, error: 'Invalid email or password' }
    const session = { id: found.id, name: found.name, email: found.email, role: found.role, address: found.address || '' }
    localStorage.setItem('hariyali-current-user', JSON.stringify(session))
    setUser(session)
    toast.success(`Welcome back, ${found.name}!`)
    return { success: true, role: found.role }
  }, [])

  const signup = useCallback((name, email, password, phone) => {
    const emailPattern = /@gmail\.com$/i
    if (!emailPattern.test(email)) return { success: false, error: 'Email must be a @gmail.com address' }
    if (!phone || phone.trim().length < 10) return { success: false, error: 'Please enter a valid phone number' }
    if (password.length < 8) return { success: false, error: 'Password must be at least 8 characters' }
    if (!/[A-Z]/.test(password)) return { success: false, error: 'Password must contain an uppercase letter' }
    if (!/[a-z]/.test(password)) return { success: false, error: 'Password must contain a lowercase letter' }
    if (!/[0-9]/.test(password)) return { success: false, error: 'Password must contain a number' }
    if (!/[^A-Za-z0-9]/.test(password)) return { success: false, error: 'Password must contain a special character' }

    const users = JSON.parse(localStorage.getItem('hariyali-users') || '[]')
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) return { success: false, error: 'Email already registered' }

    const newUser = { id: 'user-' + Date.now(), name, email, phone, password, role: 'customer', createdAt: new Date().toISOString(), address: '' }
    users.push(newUser)
    localStorage.setItem('hariyali-users', JSON.stringify(users))
    const session = { id: newUser.id, name: newUser.name, email: newUser.email, phone: newUser.phone, role: newUser.role, address: '' }
    localStorage.setItem('hariyali-current-user', JSON.stringify(session))
    setUser(session)
    toast.success('Account created successfully!')
    return { success: true }
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('hariyali-current-user')
    setUser(null)
    toast.success('Logged out successfully')
  }, [])

  const updateAddress = useCallback((address) => {
    const users = JSON.parse(localStorage.getItem('hariyali-users') || '[]')
    const updated = users.map(u => u.id === user?.id ? { ...u, address } : u)
    localStorage.setItem('hariyali-users', JSON.stringify(updated))
    const session = { ...user, address }
    localStorage.setItem('hariyali-current-user', JSON.stringify(session))
    setUser(session)
    toast.success('Delivery address updated')
  }, [user])

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateAddress, isAdmin: user?.role === 'admin', isCustomer: user?.role === 'customer', isLoggedIn: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
