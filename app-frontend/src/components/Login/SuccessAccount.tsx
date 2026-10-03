import { useNavigate } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PUBLIC_ROUTES } from '@/constants/routes'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function SuccessAccountDialog({ open, onOpenChange }: Props) {
  const navigate = useNavigate()

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle className="text-lg">Cuenta creada con éxito</DialogTitle>
          <DialogDescription>
            Tu cuenta ha sido creada correctamente. Ahora puedes iniciar sesión
            con tu correo y contraseña.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={() => navigate(PUBLIC_ROUTES.LOGIN)}>
            Iniciar sesión
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
