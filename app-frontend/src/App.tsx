import { Routes, Route } from 'react-router-dom'
import { SignupPage } from './pages/SignupPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import PurchasePage from './pages/PurchasePage'
import { ProtectedRoute } from './components/ProtectedRoute'
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from './constants/routes'

export function App() {
  return (
    <Routes>
      <Route path={PUBLIC_ROUTES.SIGNUP} element={<SignupPage />} />
      <Route path={PUBLIC_ROUTES.LOGIN} element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path={PRIVATE_ROUTES.DASHBOARD} element={<DashboardPage />} />
        <Route path={PRIVATE_ROUTES.PURCHASE} element={<PurchasePage />} />
      </Route>
      <Route path="*" element={<LoginPage />} />
    </Routes>
  )
}

export default App
