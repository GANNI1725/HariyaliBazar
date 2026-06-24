import { NavLink } from 'react-router-dom'
import { Home, Sprout, Search as SearchIcon, Heart, User } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useWishlist } from '../../context/WishlistContext'
import SearchModal from '../shared/SearchModal'

const MobileBottomNav = () => {
  const { user } = useAuth()
  const { count: wishlistCount } = useWishlist()
  const [searchOpen, setSearchOpen] = useState(false)

  const linkCls = ({ isActive }) =>
    `flex flex-col items-center justify-center gap-0.5 h-full min-w-[56px] min-h-[44px] text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 ${
      isActive ? 'text-[var(--color-leaf)]' : 'text-[var(--color-text)]/70'
    }`

  return (
    <>
      <nav
        aria-label="Mobile navigation"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--color-background)] border-t border-[var(--color-border)] shadow-[0_-4px_12px_rgba(0,0,0,0.04)]"
      >
        <ul className="grid grid-cols-5 h-14">
          <li>
            <NavLink to="/" end className={linkCls}>
              <Home size={20} />
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/products" className={linkCls}>
              <Sprout size={20} />
              <span>Shop</span>
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => setSearchOpen(true)}
              aria-label="Open search"
              className="flex flex-col items-center justify-center gap-0.5 h-full w-full min-h-[44px] text-xs font-medium text-[var(--color-text)]/70 focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2"
            >
              <SearchIcon size={20} />
              <span>Search</span>
            </button>
          </li>
          <li>
            <NavLink to="/wishlist" className={linkCls}>
              <span className="relative">
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-2 min-w-[16px] h-[16px] px-1 rounded-full bg-[var(--color-clay)] text-[var(--color-pure-white)] text-[9px] font-bold flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </span>
              <span>Wishlist</span>
            </NavLink>
          </li>
          <li>
            <NavLink to={user ? '/account' : '/login'} className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 h-full min-w-[56px] min-h-[44px] text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[var(--color-leaf)] focus-visible:outline-offset-2 ${
                isActive ? 'text-[var(--color-leaf)]' : 'text-[var(--color-text)]/70'
              }`
            }>
              <User size={20} />
              <span>{user ? 'Profile' : 'Login'}</span>
            </NavLink>
          </li>

        </ul>
      </nav>
      <div className="md:hidden h-14" aria-hidden />
      <SearchModal isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}

export default MobileBottomNav
