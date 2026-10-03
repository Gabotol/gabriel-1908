import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { PUBLIC_ROUTES } from '@/constants/routes'
import { useLogin } from '@/hooks/useLogin'
import { useNavigate } from 'react-router-dom'

export function LoginForm() {
  const { form, onSubmit, errorMessage } = useLogin()
  const {
    register,
    formState: { errors, isSubmitting },
  } = form

  const navigate = useNavigate()

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Inicio de sesión</CardTitle>
          <CardDescription>
            Ingresa tu correo electrónico y contraseña para iniciar sesión.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} noValidate>
            <FieldGroup>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Correo electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  {...register('email')}
                  aria-invalid={!!errors.email}
                />
                <FieldError errors={[errors.email]} />
              </Field>
              <Field data-invalid={!!errors.password}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                </div>
                <Input
                  id="password"
                  type="password"
                  {...register('password')}
                />
              </Field>
              <FieldError errors={[errors.password]} />
              <Field>
                <FieldDescription
                  className="text-center text-red-500"
                  hidden={!errorMessage}
                >
                  {errorMessage}
                </FieldDescription>
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  Login
                </Button>
                <FieldDescription className="text-center">
                  No tienes cuenta?{' '}
                  <button
                    onClick={(e) => {
                      e.preventDefault()
                      navigate(PUBLIC_ROUTES.SIGNUP)
                    }}
                    className="cursor-pointer text-blue-500 hover:underline"
                  >
                    Creala aqui
                  </button>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
