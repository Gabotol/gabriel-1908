// Número de tarjeta: 1234123412341234
// ● Fecha de vencimiento: 12/26
// ● CVV: 543
// ● Nombre completo: cualquier valor no vacío.
// ● Monto: cualquier cantidad válida mayor que cero.
export interface ApprovedCard {
  cardNumber: string;
  expiry: string;
  cvv: string;
}

export const approvedCards: ApprovedCard[] = [
  {
    cardNumber: '1234123412341234',
    expiry: '12/26',
    cvv: '543',
  },
];
