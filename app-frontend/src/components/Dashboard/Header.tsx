import { LogOut, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import { useLogout } from '@/hooks/useLogout'
import { PRIVATE_ROUTES } from '@/constants/routes'

export function DashboardHeader() {
  const { handleLogout } = useLogout()

  return (
    <header className="flex flex-wrap items-center justify-end gap-4 border-b px-6 py-4">
      <div className="flex items-center gap-2">
        <Button asChild>
          <Link to={PRIVATE_ROUTES.PURCHASE}>
            <Wallet />
            Recargar saldo
          </Link>
        </Button>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut />
          Cerrar sesión
        </Button>
      </div>
    </header>
  )
}
