export const PAYMENT_STATUS = {
  APPROVED: 'approved',
  REJECTED: 'rejected',
  ERROR: 'error'
} as const;

export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
