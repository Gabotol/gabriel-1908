import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { SignupForm } from './SignUp'

describe('SignupForm', () => {
  it('muestra errores cuando los campos están vacíos', async () => {
    render(<SignupForm />, { wrapper: MemoryRouter })

    await userEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }))

    expect(
      await screen.findByText('El nombre es obligatorio')
    ).toBeInTheDocument()
    expect(screen.getByText('Correo electrónico inválido')).toBeInTheDocument()
    expect(
      screen.getByText('Debe tener al menos 8 caracteres')
    ).toBeInTheDocument()
  })

  it('muestra un error cuando las contraseñas no coinciden', async () => {
    render(<SignupForm />, { wrapper: MemoryRouter })

    await userEvent.type(screen.getByLabelText('Contraseña'), '12345678')
    await userEvent.type(
      screen.getByLabelText('Confirmar Contraseña'),
      '87654321'
    )
    await userEvent.click(screen.getByRole('button', { name: 'Crear Cuenta' }))

    expect(
      await screen.findByText('Las contraseñas no coinciden')
    ).toBeInTheDocument()
  })
})
