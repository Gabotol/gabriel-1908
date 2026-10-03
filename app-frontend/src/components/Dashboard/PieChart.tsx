import { PieChart, Pie } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartData = [
  { result: 'wins', value: 4, fill: 'var(--color-wins)' },
  { result: 'losses', value: 2, fill: 'var(--color-losses)' },
]

const chartConfig = {
  value: {
    label: 'Resultados',
  },
  wins: {
    label: 'Ganadas',
    color: '#2563eb',
  },
  losses: {
    label: 'Perdidas',
    color: '#60a5fa',
  },
} satisfies ChartConfig

export function PieChartCartSnails() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Ganadas vs. perdidas</CardTitle>
        <CardDescription>Resultado total de las carreras</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto h-[300px] w-full"
        >
          <PieChart accessibilityLayer>
            <ChartTooltip
              content={<ChartTooltipContent nameKey="result" hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="result"
              outerRadius="75%"
              label={({ value, percent }) =>
                `${value} (${Math.round((percent ?? 0) * 100)}%)`
              }
              labelLine={false}
              stroke="var(--background)"
              strokeWidth={2}
              fontSize={14}
            />
            <ChartLegend
              content={
                <ChartLegendContent nameKey="result" className="text-sm" />
              }
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
