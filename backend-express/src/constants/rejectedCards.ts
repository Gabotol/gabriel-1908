import type { ApprovedCard } from "./approvedCards.ts";

interface RejectedCard extends ApprovedCard { reason: string }

export const rejectedCards: RejectedCard[] = [
  {
    cardNumber: '1111111111111111',
    expiry: '12/26',
    cvv: '543',
    reason: 'Tarjeta bloqueada por el banco emisor',
  },
  {
    cardNumber: '2222222222222222',
    expiry: '12/26',
    cvv: '543',
    reason: 'Fondos insuficientes',
  },
  {
    cardNumber: '3333333333333333',
    expiry: '12/26',
    cvv: '543',
    reason: 'Tarjeta vencida',
  },
  {
    cardNumber: '4444444444444444',
    expiry: '12/26',
    cvv: '543',
    reason: 'Número de tarjeta inválido',
  },
  {
    cardNumber: '5555555555555555',
    expiry: '12/26',
    cvv: '543',
    reason: 'CVV incorrecto',
  },
  {
    cardNumber: '6666666666666666',
    expiry: '12/26',
    cvv: '543',
    reason: 'Transacción no autorizada',
  },
  {
    cardNumber: '7777777777777777',
    expiry: '12/26',
    cvv: '543',
    reason: 'Límite de crédito excedido',
  },
  {
    cardNumber: '8888888888888888',
    expiry: '12/26',
    cvv: '543',
    reason: 'Tarjeta reportada como perdida o robada',
  }
];
