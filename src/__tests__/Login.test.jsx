import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../context/AuthContext'
import Login from '../pages/Login'

const renderLogin = () =>
  render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>,
  )

describe('Login page', () => {
  it('shows error when submitting with empty fields', async () => {
    renderLogin()
    const signInBtn = screen.getByRole('button', { name: /sign in/i })
    fireEvent.click(signInBtn)
    expect(await screen.findByText('Please fill in all fields')).toBeInTheDocument()
  })

  it('shows error for invalid credentials', async () => {
    renderLogin()
    const emailInput = screen.getByPlaceholderText('you@gmail.com')
    const passwordInput = screen.getByPlaceholderText('Enter your password')
    const signInBtn = screen.getByRole('button', { name: /sign in/i })

    fireEvent.change(emailInput, { target: { value: 'wrong@email.com' } })
    fireEvent.change(passwordInput, { target: { value: 'wrongpass' } })
    fireEvent.click(signInBtn)

    expect(await screen.findByText('Invalid email or password')).toBeInTheDocument()
  })
})
