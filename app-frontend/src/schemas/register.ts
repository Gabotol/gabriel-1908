import z from 'zod'

export const registerSchema = z
  .object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z.email('Correo electrónico inválido'),
    password: z.string().min(8, 'Debe tener al menos 8 caracteres'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })

export type RegisterValues = z.infer<typeof registerSchema>
