import z from 'zod'

export const loginSchema = z.object({
  email: z.email('Correo electrónico inválido'),
  password: z.string().min(8, 'Debe tener al menos 8 caracteres'),
})

export type LoginValues = z.infer<typeof loginSchema>
