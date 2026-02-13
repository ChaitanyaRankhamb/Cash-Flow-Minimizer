'use client'

import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'You are owed', value: 4200, color: '#22c55e' },
  { name: 'You owe', value: 1800, color: '#ef4444' },
  { name: 'Balanced groups', value: 2100, color: '#fbbf24' },
]

export function CircularProgressCard() {
  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className="border border-border/40 bg-card/50 backdrop-blur-sm p-6 h-full">
      <h3 className="text-lg font-semibold text-foreground mb-6">Active Debt Status</h3>

      <div className="flex gap-8">
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">Total Active Amount</p>
            <p className="text-2xl font-bold text-foreground">${(total / 100).toFixed(2)}</p>
            <p className="text-xs text-muted-foreground mt-1">4 / 4 Groups Active</p>
          </div>

          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-xs text-muted-foreground">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  )
}
