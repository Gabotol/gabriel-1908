import { CircleCheck, CircleX } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useSessionStore } from '@/store/useSessionStore'
import type { PaymentResult } from '@/types/payment'
import { currencyFormatter } from '@/utils/currencyFormatter'

const content = {
  success: {
    icon: CircleCheck,
    iconClass: 'text-green-500',
    title: 'Recarga exitosa',
    description: 'Tu saldo fue recargado correctamente.',
  },
  failed: {
    icon: CircleX,
    iconClass: 'text-destructive',
    title: 'Recarga fallida',
    description: 'No pudimos procesar tu pago. No se realizó ningún cargo.',
  },
}

type Props = {
  result: PaymentResult | null
  onClose: () => void
}

export function PaymentResultDialog({ result, onClose }: Props) {
  const { loggedUser } = useSessionStore()

  if (!result) {
    return null
  }

  const { icon: Icon, iconClass, title, description } = content[result.status]

  const details = [
    { label: 'Tarjeta', value: `•••• ${result.last4}` },
    {
      label: 'Fecha y hora',
      value: new Date(result.date).toLocaleString('es-MX', {
        dateStyle: 'long',
        timeStyle: 'short',
      }),
    },
    { label: 'Nombre', value: result.fullName },
    { label: 'Monto', value: currencyFormatter(result.amount) },
    { label: 'Saldo actual', value: currencyFormatter(loggedUser.amount) },
    { label: 'Estado', value: result.statusDetail },
  ]

  // el modal solo se cierra con el botón de cerrar
  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(event) => event.preventDefault()}
        onInteractOutside={(event) => event.preventDefault()}
      >
        <DialogHeader className="items-center text-center">
          <Icon className={`mx-auto size-12 ${iconClass}`} />
          <DialogTitle className="text-xl">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <dl className="divide-y rounded-lg border">
          {details.map((detail) => (
            <div
              key={detail.label}
              className="flex justify-between gap-4 px-4 py-3 text-sm"
            >
              <dt className="text-muted-foreground">{detail.label}</dt>
              <dd className="text-right font-medium">{detail.value}</dd>
            </div>
          ))}
        </dl>
        <DialogFooter>
          <Button className="w-full" onClick={onClose}>
            Cerrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
