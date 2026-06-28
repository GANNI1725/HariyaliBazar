import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Search,
  Heart,
  ShoppingCart,
  Menu,
  X,
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import { useWishlist } from '../../context/WishlistContext'
import SearchModal from '../shared/SearchModal'
import ThemeToggle from '../shared/ThemeToggle'
import { lockScroll, unlockScroll } from '../../utils/scrollLock'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Products' },
  { to: '/juices', label: 'Juice Bar' },
  { to: '/why-organic', label: 'Why Organic' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const { user, logout, isAdmin } = useAuth()
  const { totalItems, openCart } = useCart()
  const { count: wishlistCount } = useWishlist()
  const { pathname } = useLocation()
  const isAuthPage = pathname === '/login' || pathname === '/signup'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      lockScroll()
    } else {
      unlockScroll()
    }
    return () => unlockScroll()
  }, [mobileOpen])

  return (
    <>
      <header
        className={`w-full z-50 transition-all duration-300 ${
          isAuthPage
            ? 'fixed top-0 bg-[var(--color-card)]/90 backdrop-blur-sm'
            : `sticky top-0 ${scrolled ? 'bg-[var(--color-background)]/85 backdrop-blur-md shadow-sm' : 'bg-[var(--color-background)]'}`
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2.5 group" aria-label="HariyaliBazar home">
              <motion.img
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={{ type: 'spring', stiffness: 300, damping: 12 }}
                src="/Home-Logo_Section_Pics/logo.png"
                alt="HariyaliBazar"
                width="48"
                height="48"
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="leading-tight">
                <span className="font-[var(--font-heading)] text-base sm:text-2xl text-[var(--color-forest)] font-bold">
                  HariyaliBazar
                </span>
                <span className="hidden sm:block nepali-text text-[10px] sm:text-base text-[var(--color-leaf)] tracking-wider">
                  किसानसँग जोड्छ, घरसम्म पुर्‍याउँछ।
                </span>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((l) => (
                <NavLink
                  key={l.to}
                  to={l.to}
                  end={l.to === '/'}
                  className={({ isActive }) =>
                    `relative px-3 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 ${
                      isActive
                        ? 'text-[var(--color-forest)] font-semibold'
                        : 'text-[var(--color-text-secondary)] hover:text-[var(--color-forest)] hover:bg-[var(--color-hover)]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && (
                        <motion.div
                          layoutId="nav-indicator"
                          className="absolute -bottom-1 left-2 right-2 h-0.5 bg-[var(--color-forest)] rounded-full"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Open search"
                className="min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] p-1.5 sm:p-2.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
              >
                <Search size={18} className="sm:size-[20px]" />
              </button>

              <ThemeToggle />

              <Link
                to="/wishlist"
                aria-label={`Wishlist with ${wishlistCount} items`}
                className="hidden sm:flex relative min-w-[44px] min-h-[44px] p-2.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text)] transition-colors items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                    <span className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] px-0.5 rounded-full bg-[var(--color-clay)] text-[var(--color-pure-white)] text-[10px] font-bold flex items-center justify-center">
                    {wishlistCount}
                    </span>
                )}
              </Link>

              {!isAdmin && (
                <button
                  onClick={openCart}
                  aria-label={`Cart with ${totalItems} items`}
                  className="relative min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] p-1.5 sm:p-2.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text)] transition-colors flex items-center justify-center focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
                >
                  <ShoppingCart size={18} className="sm:size-[20px]" />
                  {totalItems > 0 && (
                    <span className="absolute top-0.5 right-0.5 min-w-[16px] h-[16px] px-0.5 rounded-full bg-[var(--color-leaf)] text-[var(--color-pure-white)] text-[10px] font-bold flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </button>
              )}

              <button
                onClick={() => setMobileOpen((o) => !o)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                className="lg:hidden min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] p-1.5 sm:p-2.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
              >
                {mobileOpen ? <X size={18} className="sm:size-[22px]" /> : <Menu size={18} className="sm:size-[22px]" />}
              </button>

              <div className="hidden sm:contents">
                {user ? (
                  <div className="flex items-center gap-1">
                    {isAdmin ? (
                      <Link to="/admin" className="min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] p-1.5 sm:p-2.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text)] transition-colors flex items-center justify-center" title="Admin Panel">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
                      </Link>
                    ) : (
                      <Link to="/account" className="min-w-[40px] sm:min-w-[44px] min-h-[40px] sm:min-h-[44px] p-1.5 sm:p-2.5 rounded-md hover:bg-[var(--color-border)] text-[var(--color-text)] transition-colors flex items-center justify-center" title="My Account">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                      </Link>
                    )}
                    <button onClick={logout} className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-bg)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium text-[var(--color-forest)] hover:bg-[var(--color-border)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)]">
                    <motion.svg
                      width="16" height="16" viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                      animate={{ x: [0, 3, 0] }}
                      transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                      style={{ stroke: 'var(--color-leaf)' }}
                    >
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                      <polyline points="10 17 15 12 10 7"/>
                      <line x1="15" y1="12" x2="3" y2="12"/>
                    </motion.svg>
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {mobileOpen && (
          <AnimatePresence>
            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
              className="lg:hidden border-t border-[var(--color-border)] bg-[var(--color-background)] overflow-hidden"
            >
              <nav className="px-4 py-3 space-y-1">
                {navLinks.map((l) => (
                  <NavLink
                    key={l.to}
                    to={l.to}
                    end={l.to === '/'}
                    onClick={() => setMobileOpen(false)}
                    className={({ isActive }) =>
                      `block px-3 py-2.5 rounded-md text-sm font-medium ${
                        isActive
                          ? 'text-[var(--color-leaf)] bg-[var(--color-border)]'
                          : 'text-[var(--color-text)] hover:bg-[var(--color-border)]'
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
                <hr className="border-[var(--color-border)] my-2" />
                {user ? (
                  <>
                    <NavLink to={isAdmin ? '/admin' : '/account'} onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-border)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 1 0-16 0"/></svg>
                      {isAdmin ? 'Admin Panel' : 'My Account'}
                    </NavLink>
                    <button onClick={() => { logout(); setMobileOpen(false) }} className="flex items-center gap-2 w-full text-left px-3 py-2.5 rounded-md text-sm font-medium text-[var(--color-error)] hover:bg-[var(--color-error-bg)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <NavLink to="/login" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-[var(--color-forest)] hover:bg-[var(--color-border)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
                      Login
                    </NavLink>
                    <NavLink to="/signup" onClick={() => setMobileOpen(false)} className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-[var(--color-text)] hover:bg-[var(--color-border)]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg>
                      Sign Up
                    </NavLink>
                  </>
                )}
              </nav>
            </motion.div>
          </AnimatePresence>
        )}
      </header>

      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default Navbar
