import { PUBLIC_ROUTES } from '@/constants/routes'
import { useSessionStore } from '@/store/useSessionStore'
import { Navigate, Outlet } from 'react-router-dom'

export function ProtectedRoute() {
  const { isLogged } = useSessionStore()

  if (!isLogged) {
    return <Navigate to={PUBLIC_ROUTES.LOGIN} replace />
  }

  return <Outlet />
}
