import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { lockScroll, unlockScroll } from '../utils/scrollLock'

describe('scrollLock utilities', () => {
  beforeEach(() => {
    document.body.style.overflow = ''
    document.body.style.paddingRight = ''
  })

  afterEach(() => {
    unlockScroll()
  })

  it('lockScroll sets overflow to hidden and paddingRight to scrollbar width', () => {
    lockScroll()
    expect(document.body.style.overflow).toBe('hidden')
    expect(typeof document.body.style.paddingRight).toBe('string')
    expect(document.body.style.paddingRight).toMatch(/px$/)
  })

  it('unlockScroll resets overflow and paddingRight to empty', () => {
    lockScroll()
    unlockScroll()
    expect(document.body.style.overflow).toBe('')
    expect(document.body.style.paddingRight).toBe('')
  })

  it('unlockScroll works even if lockScroll was not called', () => {
    expect(() => unlockScroll()).not.toThrow()
    expect(document.body.style.overflow).toBe('')
    expect(document.body.style.paddingRight).toBe('')
  })
})
