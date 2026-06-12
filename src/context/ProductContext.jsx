import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react'
import { products as staticProducts } from '../data/products'
import { categories as staticCategories } from '../data/categories'

const STORAGE_KEY = 'hariyali-products'
const CATEGORIES_KEY = 'hariyali-categories'

const ProductContext = createContext(null)

const getProductBySlugFn = (list, slug) => list.find(p => p.slug === slug)
const getProductByIdFn = (list, id) => list.find(p => p.id === Number(id))
const getProductsByCategoryFn = (list, category) => list.filter(p => p.category === category)
const getFeaturedProductsFn = (list) => list.filter(p => p.isFeatured)
const getRelatedProductsFn = (list, product, count = 4) =>
  list.filter(p => p.category === product.category && p.id !== product.id).slice(0, count)

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      setProducts(JSON.parse(stored))
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(staticProducts))
      setProducts(staticProducts)
    }
    const catStored = localStorage.getItem(CATEGORIES_KEY)
    if (catStored) {
      setCategories(JSON.parse(catStored))
    } else {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(staticCategories))
      setCategories(staticCategories)
    }
    setReady(true)
  }, [])

  const helpers = useMemo(() => ({
    getProductById: (id) => getProductByIdFn(products, id),
    getProductBySlug: (slug) => getProductBySlugFn(products, slug),
    getProductsByCategory: (cat) => getProductsByCategoryFn(products, cat),
    getFeaturedProducts: () => getFeaturedProductsFn(products),
    getRelatedProducts: (product, count) => getRelatedProductsFn(products, product, count),
  }), [products])

  const updateProducts = useCallback((updated) => {
    setProducts(updated)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  }, [])

  const updateCategories = useCallback((updated) => {
    setCategories(updated)
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(updated))
  }, [])

  return (
    <ProductContext.Provider value={{ products, ...helpers, updateProducts, categories, updateCategories, ready }}>
      {children}
    </ProductContext.Provider>
  )
}

export const useProducts = () => {
  const ctx = useContext(ProductContext)
  if (!ctx) throw new Error('useProducts must be used within ProductProvider')
  return ctx
}
