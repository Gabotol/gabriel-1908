import { act, render, renderHook, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { Welcome } from '@/components/Dashboard/Welcome'
import { apiPayments } from '@/services/payment.service'
import { useSessionStore } from '@/store/useSessionStore'
import type { PaymentResponse } from '@/types/payment'
import { PaymentForm } from './PaymentForm'

vi.mock('@/services/payment.service', () => ({
  apiPayments: { payment: vi.fn() },
}))

describe('PaymentForm', () => {
  it('actualiza el saldo del dashboard tras un cobro exitoso', async () => {
    vi.mocked(apiPayments.payment).mockResolvedValue({
      status_detail: 'El pago fue aprobado exitosamente',
      card_number: '************1111',
      cvv: '***',
    } as PaymentResponse)

    const { result } = renderHook(() => useSessionStore())
    act(() =>
      result.current.saveUserSession({
        id: 'user-1',
        name: 'Gabo Tolentino',
        email: 'gabo@example.com',
        password: 'hash',
        amount: 100,
      })
    )

    render(
      <>
        <Welcome />
        <PaymentForm />
      </>
    )
    const balance = screen.getByText('Saldo').parentElement!
    expect(within(balance).getByText('$100.00')).toBeInTheDocument()

    await userEvent.type(
      screen.getByLabelText('Número de tarjeta'),
      '4111111111111111'
    )
    await userEvent.type(screen.getByLabelText('Fecha de vencimiento'), '12/99')
    await userEvent.type(screen.getByLabelText('CVV'), '123')
    await userEvent.type(screen.getByLabelText('Nombre completo'), 'Gabo T')
    await userEvent.type(screen.getByLabelText('Monto de la recarga'), '500')
    await userEvent.click(screen.getByRole('button', { name: 'Recargar' }))

    expect(await screen.findByText('Recarga exitosa')).toBeInTheDocument()
    expect(within(balance).getByText('$600.00')).toBeInTheDocument()
  })
})
