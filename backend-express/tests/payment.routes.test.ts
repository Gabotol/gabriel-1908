import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest';
import request from 'supertest';
import app from '../src/app.ts';
import { rejectedCards } from '../src/constants/rejectedCards.ts';
import { PAYMENT_STATUS } from '../src/constants/statusPayment.ts';

const validPayment = {
  cardNumber: '1234123412341234',
  expiry: '12/26',
  cvv: '543',
  fullName: 'Juan Pérez',
  amount: 1000,
  payerId: '3f2b8c1e-4d5a-4b6c-9e7f-1a2b3c4d5e6f',
  email: 'juan@example.com',
};

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

const pay = (body: object) => request(app).post('/api/payment').send(body);

afterEach(() => {
  delete process.env.TURN_OFF_SISTEM;
});

describe('Escenario 1: pago exitoso', () => {
  it('aprueba el pago con la tarjeta de prueba', async () => {
    const res = await pay(validPayment);

    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      status: PAYMENT_STATUS.APPROVED,
      status_detail: 'El pago fue aprobado exitosamente',
      transaction_amount: validPayment.amount,
      payer_id: validPayment.payerId,
      payer_email: validPayment.email,
    });
    expect(res.body.id).toMatch(UUID_REGEX);
    expect(res.body.reference).toMatch(UUID_REGEX);
    expect(res.body.authorization_code).toMatch(/^[0-9A-F]{6}$/);
    expect(new Date(res.body.date_created).toISOString()).toBe(res.body.date_created);
  });
});

describe('Escenario 2: error de transacción', () => {
  it.each(rejectedCards)('prueba las tarjetas rechazadas', async (card) => {
    const res = await pay({ ...validPayment, cardNumber: card.cardNumber, expiry: card.expiry, cvv: card.cvv });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe(PAYMENT_STATUS.REJECTED);
    expect(res.body.status_detail).toBe(card.reason);
    expect(res.body.authorization_code).toBe('');
  });

  it('rechaza una tarjeta no registrada', async () => {
    const res = await pay({ ...validPayment, cardNumber: '9999999999999999' });

    expect(res.status).toBe(400);
    expect(res.body.status).toBe(PAYMENT_STATUS.REJECTED);
    expect(res.body.status_detail).toBe('Error desconocido - contacte a soporte');
  });

});

describe('Escenario 3: error de sistema', () => {
  beforeEach(() => {
    process.env.TURN_OFF_SISTEM = 'true';
  });

  it('Simula el error interno', async () => {
    const res = await pay(validPayment);

    expect(res.status).toBe(503);
    expect(res.body).toEqual({
      status: PAYMENT_STATUS.ERROR,
      status_detail: 'el servicio de pagos presenta un problema interno y no puede procesar solicitudes',
    });
  });
});
