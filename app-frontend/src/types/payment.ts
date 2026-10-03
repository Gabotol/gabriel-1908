export type PaymentStatus = 'success' | 'failed'

export interface PaymentResult {
  status: PaymentStatus
  last4: string
  date: string
  fullName: string
  amount: number
  statusDetail: string
}

export interface PaymentResponse {
  id: string
  status: string
  status_detail: string
  transaction_amount: number
  date_created: string
  authorization_code: string
  reference: string
  payer_id: string
  payer_email: string
  card_number: string
  cvv: string
}

export interface PaymentRequest {
  cardNumber: string
  expiry: string
  cvv: string
  fullName: string
  amount: number
  payerId: string
  email: string
}
