import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { paymentSchema } from '../src/schemas/payment.ts';

const validPayment = {
  cardNumber: '1234123412341234',
  expiry: '12/26',
  cvv: '543',
  fullName: 'Juan Pérez',
  amount: 1000,
  payerId: '3f2b8c1e-4d5a-4b6c-9e7f-1a2b3c4d5e6f',
  email: 'juan@example.com',
};

const withoutEmail = {
  cardNumber: '1234123412341234',
  expiry: '12/26',
  cvv: '543',
  fullName: 'Juan Pérez',
  amount: 1000,
  payerId: '3f2b8c1e-4d5a-4b6c-9e7f-1a2b3c4d5e6f',
}
describe('paymentSchema', () => {

  it('acepta un pago válido', () => {
    expect(paymentSchema.safeParse(validPayment).success).toBe(true);
  });

  it('rechaza una tarjeta vencida', () => {
    const result = paymentSchema.safeParse({ ...validPayment, expiry: '05/26' });
    expect(result.success).toBe(false);
    expect(result.error?.issues[0]?.message).toBe('La tarjeta está vencida');
  });


  it('rechaza campos faltantes', () => {
    expect(paymentSchema.safeParse(withoutEmail).success).toBe(false);
  });

  it.each([
    ['cardNumber con menos de 16 dígitos', { cardNumber: '123412341234' }],
    ['cardNumber con letras', { cardNumber: '1234abcd12341234' }],
    ['email inválido', { email: 'no-es-email' }],
  ])('rechaza %s', (_, override) => {
    const result = paymentSchema.safeParse({ ...validPayment, ...override });
    expect(result.success).toBe(false);
  });
});
