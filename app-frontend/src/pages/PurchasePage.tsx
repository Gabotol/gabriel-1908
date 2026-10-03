import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { DashboardHeader } from '@/components/Dashboard/Header'
import { Welcome } from '@/components/Dashboard/Welcome'
import { PaymentForm } from '@/components/Purchase/PaymentForm'
import { Button } from '@/components/ui/button'
import { PRIVATE_ROUTES } from '@/constants/routes'

export default function PurchasePage() {
  return (
    <div className="flex min-h-svh flex-col bg-background">
      <DashboardHeader />
      <Welcome />
      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="flex w-full max-w-md flex-col gap-4">
          <Button variant="ghost" className="self-start" asChild>
            <Link to={PRIVATE_ROUTES.DASHBOARD}>
              <ArrowLeft />
              Volver al inicio
            </Link>
          </Button>
          <PaymentForm />
        </div>
      </main>
    </div>
  )
}
