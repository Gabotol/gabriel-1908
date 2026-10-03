import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginValues } from '@/schemas/login'
import bcrypt from 'bcryptjs'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useUsersStore } from '@/store/useUsersStore'
import { useSessionStore } from '@/store/useSessionStore'
import { PRIVATE_ROUTES } from '@/constants/routes'

export function useLogin() {
  const navigate = useNavigate()
  const { findUserByEmail } = useUsersStore()
  const { saveUserSession } = useSessionStore()

  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    const existAccount = findUserByEmail(values.email)
    console.log('existAccount =>', existAccount)
    const isPasswordValid = await bcrypt.compare(
      values.password,
      String(existAccount?.password)
    )
    if (existAccount && isPasswordValid) {
      saveUserSession(existAccount)
      navigate(PRIVATE_ROUTES.DASHBOARD)
    } else {
      setErrorMessage('Usuario o contraseña incorrectos')
      console.log('Invalid email or password')
    }
  })

  return { form, onSubmit, errorMessage }
}
