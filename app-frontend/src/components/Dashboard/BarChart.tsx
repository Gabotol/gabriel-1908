import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'

const chartData = [
  { snail: 'Gary', wins: 1 },
  { snail: 'Snellie', wins: 2 },
  { snail: 'Larry', wins: 1 },
  { snail: 'Esmeralda', wins: 1 },
  { snail: 'Flash', wins: 1 },
  { snail: 'Speed', wins: 0 },
]

const chartConfig = {
  wins: {
    label: 'Victorias',
    color: '#2563eb',
  },
} satisfies ChartConfig

export function BarChartWinner() {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Victorias por caracol</CardTitle>
        <CardDescription>Carreras ganadas por cada caracol</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px] w-full">
          <BarChart accessibilityLayer data={chartData} margin={{ top: 24 }}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="snail"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={14}
            />
            <YAxis
              allowDecimals={false}
              tickLine={false}
              axisLine={false}
              width={24}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey="wins"
              fill="var(--color-wins)"
              radius={6}
              maxBarSize={88}
            >
              <LabelList
                dataKey="wins"
                position="top"
                className="fill-foreground"
                fontSize={14}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
