import '@testing-library/jest-dom'

class MockIntersectionObserver {
  constructor(fn) { this.fn = fn }
  observe() { this.fn([{ isIntersecting: true }]) }
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query) => ({
    matches: false,
    media: query,
    addEventListener: () => {},
    removeEventListener: () => {},
  }),
})
