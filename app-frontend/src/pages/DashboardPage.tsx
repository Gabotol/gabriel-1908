import { BarChartWinner } from '@/components/Dashboard/BarChart'
import { DashboardHeader } from '@/components/Dashboard/Header'
import { Welcome } from '@/components/Dashboard/Welcome'
import { PieChartCartSnails } from '@/components/Dashboard/PieChart'

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <DashboardHeader />
      <Welcome />
      <main className="grid grid-cols-12 gap-6 p-6">
        <div className="col-span-12 md:col-span-8">
          <BarChartWinner />
        </div>
        <div className="col-span-12 md:col-span-4">
          <PieChartCartSnails />
        </div>
      </main>
    </div>
  )
}
