import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { purchaseSchema, type PurchaseValues } from '@/schemas/purchase'
import { apiPayments } from '@/services/payment.service'
import axios from 'axios'
import { useSessionStore } from '@/store/useSessionStore'
import { useUsersStore } from '@/store/useUsersStore'
import type { PaymentResult, PaymentResponse } from '@/types/payment'

export function usePurchase() {
  const { loggedUser, updateUser } = useSessionStore()
  const { updateUser: updateInRegister } = useUsersStore()
  const [result, setResult] = useState<PaymentResult | null>(null)
  const form = useForm<PurchaseValues>({
    resolver: zodResolver(purchaseSchema),
    defaultValues: { cardNumber: '', expiry: '', cvv: '', fullName: '' },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const details = {
      last4: values.cardNumber.slice(-4),
      date: new Date().toISOString(),
      fullName: values.fullName,
      amount: values.amount,
      statusDetail: '',
    }

    try {
      const response: PaymentResponse = await apiPayments.payment({
        cardNumber: values.cardNumber,
        expiry: values.expiry,
        cvv: values.cvv,
        fullName: values.fullName,
        amount: values.amount,
        payerId: loggedUser.id,
        email: loggedUser.email,
      })
      details.statusDetail = response.status_detail

      console.log('response =>', response)
      const balance = loggedUser.amount
      const newBalance = balance + values.amount
      updateUser({
        ...loggedUser,
        amount: newBalance,
        cardNumber: response.card_number,
        cvv: response.cvv,
      })
      updateInRegister({
        ...loggedUser,
        amount: newBalance,
        cardNumber: response.card_number,
        cvv: response.cvv,
      })

      setResult({ status: 'success', ...details })
      form.reset()
    } catch (err) {
      details.statusDetail = 'Error en el servicio de pagos'

      if (axios.isAxiosError(err)) {
        console.log(err.response?.status, err.response?.data)
        details.statusDetail = String(err.response?.data?.status_detail)
      }

      setResult({ status: 'failed', ...details })
    }
  })

  const closeResult = () => setResult(null)

  return { form, onSubmit, result, closeResult }
}
