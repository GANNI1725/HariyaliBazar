import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import Button from '../components/shared/Button'

describe('Button component', () => {
  it('renders with children text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('renders with default variant styles', () => {
    render(<Button>Test</Button>)
    const btn = screen.getByText('Test')
    expect(btn.tagName).toBe('BUTTON')
    expect(btn).toHaveAttribute('type', 'button')
  })

  it('disables when disabled prop is true', () => {
    render(<Button disabled>Disabled</Button>)
    expect(screen.getByText('Disabled')).toBeDisabled()
  })
})
