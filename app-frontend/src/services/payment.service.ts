import type { PaymentRequest, PaymentResponse } from '@/types/payment'
import axios from 'axios'

const url = `${import.meta.env.VITE_API_SNAIL_PAYMENTS_URL}payment`

export const apiPayments = {
  payment: async (data: PaymentRequest) => {
    return axios
      .request<PaymentResponse>({
        method: 'POST',
        url,
        data,
        // headers: { 'x-api-key': '' },
      })
      .then((res) => res.data)
  },
}
