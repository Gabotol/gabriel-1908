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
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { usePurchase } from '@/hooks/usePurchase'
import { PaymentResultDialog } from '@/components/Purchase/PaymentResult'

export function PaymentForm(props: React.ComponentProps<typeof Card>) {
  const { form, onSubmit, result, closeResult } = usePurchase()
  const {
    register,
    formState: { errors, isSubmitting },
  } = form

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Recargar saldo</CardTitle>
        <CardDescription>
          Ingresa los datos de tu tarjeta y el monto que quieres recargar.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} noValidate>
          <FieldGroup>
            <Field data-invalid={!!errors.cardNumber}>
              <FieldLabel htmlFor="cardNumber">Número de tarjeta</FieldLabel>
              <Input
                id="cardNumber"
                inputMode="numeric"
                autoComplete="cc-number"
                maxLength={16}
                placeholder="1234567812345678"
                aria-invalid={!!errors.cardNumber}
                {...register('cardNumber')}
              />
              <FieldError errors={[errors.cardNumber]} />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field data-invalid={!!errors.expiry}>
                <FieldLabel htmlFor="expiry">Fecha de vencimiento</FieldLabel>
                <Input
                  id="expiry"
                  autoComplete="cc-exp"
                  maxLength={5}
                  placeholder="MM/AA"
                  aria-invalid={!!errors.expiry}
                  {...register('expiry')}
                />
                <FieldError errors={[errors.expiry]} />
              </Field>
              <Field data-invalid={!!errors.cvv}>
                <FieldLabel htmlFor="cvv">CVV</FieldLabel>
                <Input
                  id="cvv"
                  type="password"
                  inputMode="numeric"
                  autoComplete="cc-csc"
                  maxLength={3}
                  placeholder="123"
                  aria-invalid={!!errors.cvv}
                  {...register('cvv')}
                />
                <FieldError errors={[errors.cvv]} />
              </Field>
            </div>
            <Field data-invalid={!!errors.fullName}>
              <FieldLabel htmlFor="fullName">Nombre completo</FieldLabel>
              <Input
                id="fullName"
                autoComplete="cc-name"
                placeholder="John Doe"
                aria-invalid={!!errors.fullName}
                {...register('fullName')}
              />
              <FieldError errors={[errors.fullName]} />
            </Field>
            <Field data-invalid={!!errors.amount}>
              <FieldLabel htmlFor="amount">Monto de la recarga</FieldLabel>
              <Input
                id="amount"
                type="number"
                min={1}
                step="any"
                placeholder="10000"
                aria-invalid={!!errors.amount}
                {...register('amount', { valueAsNumber: true })}
              />
              <FieldError errors={[errors.amount]} />
            </Field>
            <Field>
              <Button type="submit" disabled={isSubmitting}>
                <span className="loader" hidden={!isSubmitting} />
                {isSubmitting ? 'Procesando' : 'Recargar'}
              </Button>
            </Field>
          </FieldGroup>
        </form>
        <PaymentResultDialog result={result} onClose={closeResult} />
      </CardContent>
    </Card>
  )
}
