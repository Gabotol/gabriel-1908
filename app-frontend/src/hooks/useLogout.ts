import { PUBLIC_ROUTES } from '@/constants/routes'
import { useSessionStore } from '@/store/useSessionStore'
import { useNavigate } from 'react-router-dom'

export function useLogout() {
  const navigate = useNavigate()
  const { logout } = useSessionStore()

  const handleLogout = () => {
    logout()
    navigate(PUBLIC_ROUTES.LOGIN, { replace: true })
  }

  return { handleLogout }
}
