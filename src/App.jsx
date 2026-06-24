import { BrowserRouter, Routes, Route, useLocation, useNavigationType, Navigate } from 'react-router-dom'
import { Suspense, lazy, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import { WishlistProvider } from './context/WishlistContext'
import { ThemeProvider } from './context/ThemeContext'
import { ProductProvider } from './context/ProductContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import MobileBottomNav from './components/layout/MobileBottomNav'
import CartDrawer from './components/cart/CartDrawer'
import FloatingCart from './components/cart/FloatingCart'
import ErrorBoundary from './components/shared/ErrorBoundary'
import LoadingSpinner from './components/shared/LoadingSpinner'

const Home = lazy(() => import('./pages/Home'))
const Products = lazy(() => import('./pages/Products'))
const ProductDetail = lazy(() => import('./pages/ProductDetail'))
const Juices = lazy(() => import('./pages/Juices'))
const Cart = lazy(() => import('./pages/Cart'))
const Wishlist = lazy(() => import('./pages/Wishlist'))
const About = lazy(() => import('./pages/About'))
const WhyOrganic = lazy(() => import('./pages/WhyOrganic'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Contact = lazy(() => import('./pages/Contact'))
const Login = lazy(() => import('./pages/Login'))
const Signup = lazy(() => import('./pages/Signup'))
const AdminPanel = lazy(() => import('./pages/AdminPanel'))
const CustomerDashboard = lazy(() => import('./pages/CustomerDashboard'))
const TermsConditions = lazy(() => import('./pages/TermsConditions'))
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'))
const NotFound = lazy(() => import('./pages/NotFound'))

const AnimatedRoutes = () => {
  const location = useLocation()
  const navigationType = useNavigationType()
  const { pathname } = location

  useEffect(() => {
    if (navigationType !== 'POP') {
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [pathname, navigationType])

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="w-full"
      >
        <Suspense fallback={<LoadingSpinner fullscreen />}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/juices" element={<Juices />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/about" element={<About />} />
            <Route path="/why-organic" element={<WhyOrganic />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/terms" element={<TermsConditions />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/account" element={<CustomerDashboard />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Suspense>
      </motion.div>
    </AnimatePresence>
  )
}

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductProvider>
          <BrowserRouter>
          <ErrorBoundary>
            <div className="w-full min-h-screen flex flex-col bg-[var(--color-background)] text-[var(--color-text)]">
              <Navbar />
              <main className="w-full flex-1 pb-14 md:pb-0">
                <AnimatedRoutes />
              </main>
              <Footer />
              <MobileBottomNav />
              <CartDrawer />
              <FloatingCart />
              <Toaster
                position="top-right"
                gutter={80}
                limit={1}
                toastOptions={{
                  duration: 3000,
                  style: {
                    background: 'var(--color-card)',
                    color: 'var(--color-text)',
                    border: '1px solid var(--color-border-light)',
                    boxShadow: 'var(--shadow-elevated)',
                    padding: '12px 16px',
                    borderRadius: '12px',
                    marginTop: '4rem',
                  },
                  success: {
                    iconTheme: { primary: 'var(--color-forest)', secondary: 'var(--color-card)' },
                  },
                  error: {
                    style: {
                      background: 'var(--color-error)',
                      color: 'var(--color-pure-white)',
                    },
                  },
                }}
              />
            </div>
          </ErrorBoundary>
          </BrowserRouter>
          </ProductProvider>
        </WishlistProvider>
      </CartProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
