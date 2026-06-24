import { createContext, useContext, useEffect, useLayoutEffect, useMemo, useState, useCallback } from 'react'

const ThemeContext = createContext(null)
const STORAGE_KEY = 'hariyali-theme'

const readInitialTheme = () => {
  if (typeof document === 'undefined') return 'light'
  const fromDom = document.documentElement.getAttribute('data-theme')
  if (fromDom === 'dark' || fromDom === 'light') return fromDom
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {
    /* ignore */
  }
  return 'light'
}

const applyTheme = (theme) => {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', theme)
  document.documentElement.classList.toggle('dark', theme === 'dark')
  try {
    localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    /* ignore */
  }
}

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readInitialTheme)

  useIsomorphicLayoutEffect(() => {
    applyTheme(theme)
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  const setThemeValue = useCallback((next) => {
    setTheme(next === 'dark' ? 'dark' : 'light')
  }, [])

  const value = useMemo(
    () => ({
      theme,
      isDark: theme === 'dark',
      toggleTheme,
      setTheme: setThemeValue,
    }),
    [theme, toggleTheme, setThemeValue]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
