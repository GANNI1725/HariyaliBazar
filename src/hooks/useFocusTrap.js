import { useEffect, useRef, useCallback } from 'react'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

export function useFocusTrap(isOpen, onClose) {
  const containerRef = useRef(null)
  const previousFocusRef = useRef(null)

  const getFocusableElements = useCallback(() => {
    if (!containerRef.current) return []
    return containerRef.current.querySelectorAll(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  }, [])

  useEffect(() => {
    if (!isOpen) return

    previousFocusRef.current = document.activeElement

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const elements = getFocusableElements()
      if (elements.length === 0) return

      const first = elements[0]
      const last = elements[elements.length - 1]

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    lockScroll()
    const t = setTimeout(() => {
      const elements = getFocusableElements()
      if (elements.length > 0) elements[0].focus()
    }, 50)

    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      unlockScroll()
      clearTimeout(t)
      previousFocusRef.current?.focus?.()
    }
  }, [isOpen, onClose, getFocusableElements])

  return containerRef
}
