let lockCount = 0
let originalOverflow = ''
let originalPaddingRight = ''

export function lockScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  if (lockCount === 0) {
    originalOverflow = document.body.style.overflow
    originalPaddingRight = document.body.style.paddingRight
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarWidth}px`
  }
  lockCount++
}

export function unlockScroll() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  lockCount--
  if (lockCount <= 0) {
    lockCount = 0
    document.body.style.overflow = originalOverflow
    document.body.style.paddingRight = originalPaddingRight
  }
}
