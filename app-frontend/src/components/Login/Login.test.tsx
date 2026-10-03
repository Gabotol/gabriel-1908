import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { LoginForm } from './Login'

describe('LoginForm', () => {
  it('Errores con campos vacíos', async () => {
    render(<LoginForm />, { wrapper: MemoryRouter })

    await userEvent.click(screen.getByRole('button', { name: 'Login' }))

    expect(
      await screen.findByText('Correo electrónico inválido')
    ).toBeInTheDocument()
    expect(
      screen.getByText('Debe tener al menos 8 caracteres')
    ).toBeInTheDocument()
  })
})
