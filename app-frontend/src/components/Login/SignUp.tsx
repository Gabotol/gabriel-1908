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
import { useRegister } from '@/hooks/useRegister'
import { useNavigate } from 'react-router-dom'
import { SuccessAccountDialog } from './SuccessAccount'
import { PUBLIC_ROUTES } from '@/constants/routes'

export function SignupForm() {
  const navigate = useNavigate()
  const { form, onSubmit, success } = useRegister()
  const {
    register,
    formState: { errors, isSubmitting },
  } = form

  return (
    <>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Crea tú cuenta</CardTitle>
          <CardDescription>
            Completa la información para crear tu cuenta y empezar a usar este
            sistema.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit} noValidate>
            <FieldGroup>
              <Field data-invalid={!!errors.name}>
                <FieldLabel htmlFor="name">Nombre Completo</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  aria-invalid={!!errors.name}
                  {...register('name')}
                />
                <FieldError errors={[errors.name]} />
              </Field>
              <Field data-invalid={!!errors.email}>
                <FieldLabel htmlFor="email">Correo Electrónico</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  aria-invalid={!!errors.email}
                  {...register('email')}
                />
                <FieldError errors={[errors.email]} />
                <FieldDescription>
                  Tu correo electrónico será usado para iniciar sesión.
                </FieldDescription>
              </Field>
              <Field data-invalid={!!errors.password}>
                <FieldLabel htmlFor="password">Contraseña</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  aria-invalid={!!errors.password}
                  {...register('password')}
                />
                <FieldError errors={[errors.password]} />
                <FieldDescription>
                  Tu contraseña debe tener al menos 8 caracteres.
                </FieldDescription>
              </Field>
              <Field data-invalid={!!errors.confirmPassword}>
                <FieldLabel htmlFor="confirm-password">
                  Confirmar Contraseña
                </FieldLabel>
                <Input
                  id="confirm-password"
                  type="password"
                  aria-invalid={!!errors.confirmPassword}
                  {...register('confirmPassword')}
                />
                <FieldError errors={[errors.confirmPassword]} />
                <FieldDescription>
                  Por favor, confirma tu contraseña.
                </FieldDescription>
              </Field>
              <FieldGroup>
                <Field>
                  <Button type="submit" disabled={isSubmitting}>
                    Crear Cuenta
                  </Button>
                  <FieldDescription className="px-6 text-center">
                    Ya tienes una cuenta?
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(PUBLIC_ROUTES.LOGIN)
                      }}
                      className="cursor-pointer text-blue-500 hover:underline"
                    >
                      Inicia sesión aquí
                    </button>
                  </FieldDescription>
                </Field>
              </FieldGroup>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
      <SuccessAccountDialog
        open={success}
        onOpenChange={() => {
          navigate(PUBLIC_ROUTES.LOGIN)
        }}
      />
    </>
  )
}
