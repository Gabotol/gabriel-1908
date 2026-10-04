import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterValues } from '@/schemas/register'
import bcrypt from 'bcryptjs'
import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useUsersStore } from '@/store/useUsersStore'
import { SALT_ROUNDS } from '@/constants/bcrypt'

export function useRegister() {
  const { addUser, findUserByEmail } = useUsersStore()
  const [success, setSuccess] = useState(false)
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  const onSubmit = form.handleSubmit(async (values) => {
    // verify if exist
    const alreadyExist = findUserByEmail(values.email)
    if (alreadyExist) {
      form.setError('email', {
        message: 'Ya existe una cuenta con este correo',
      })
      return
    }

    const hashedPassword = await hashPassword(values.password)

    const objectToSave = {
      id: uuidv4(),
      name: values.name,
      email: values.email,
      password: hashedPassword,
      amount: 0,
    }
    addUser(objectToSave)
    setSuccess(true)
  })

  const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(SALT_ROUNDS)
    const hashedPassword = await bcrypt.hash(password, salt)
    return hashedPassword
  }
  return { form, onSubmit, success }
}
