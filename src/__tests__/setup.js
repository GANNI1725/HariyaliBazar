import '@testing-library/jest-dom'

class MockIntersectionObserver {
  constructor(fn) { this.fn = fn }
  observe() { this.fn([{ isIntersecting: true }]) }
  unobserve() {}
  disconnect() {}
}
window.IntersectionObserver = MockIntersectionObserver
