import z from "zod"

const isExpired = (value: string) => {
  const [month, year]:number[] = value.split("/").map(Number)
 if (month === undefined || year === undefined) return false

  const expiry = new Date(2000 + year, month, 0, 23, 59, 59)
  return expiry < new Date()
}

export const paymentSchema = z.object({
  cardNumber: z
    .string()
    .regex(/^\d{16}$/, "El número de tarjeta debe tener 16 dígitos"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Usa el formato MM/AA")
    .refine((value) => !isExpired(value), "La tarjeta está vencida"),
  cvv: z.string().regex(/^\d{3}$/, "El CVV debe tener 3 dígitos"),
  fullName: z.string().trim().min(1, "Ingresa tu nombre completo"),
  amount: z
    .number({ error: "Ingresa un monto válido" })
    .positive("El monto debe ser mayor a 0"),
  payerId: z.uuid("El ID del pagador no es válido"),
  email: z.email("Ingresa un email válido"),
})

export type PaymentValues = z.infer<typeof paymentSchema>
