import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart } from 'lucide-react'
import { useCart } from '../../context/CartContext'
import { useAuth } from '../../context/AuthContext'

const FloatingCart = () => {
  const { totalItems, openCart } = useCart()
  const { isAdmin } = useAuth()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const check = () => {
      const navbar = document.querySelector('header')
      if (!navbar) return
      const rect = navbar.getBoundingClientRect()
      setVisible(rect.bottom < 0)
    }
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
  }, [])

  if (isAdmin || totalItems === 0) return null

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="fab"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 20 }}
          onClick={openCart}
          aria-label={`Cart with ${totalItems} items`}
          className="fixed bottom-20 md:bottom-6 right-4 z-50 w-14 h-14 rounded-full bg-[var(--color-forest)] text-[var(--color-pure-white)] shadow-lg hover:bg-[var(--color-leaf)] transition-colors flex items-center justify-center cursor-pointer"
        >
          <ShoppingCart size={22} />
          <span className="absolute -top-1 -right-1 min-w-[22px] h-[22px] px-1 rounded-full bg-[var(--color-clay)] text-[var(--color-pure-white)] text-xs font-bold flex items-center justify-center border-2 border-[var(--color-card)]">
            {totalItems}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  )
}

export default FloatingCart
