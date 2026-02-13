'use client'

import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

const expenseData = [
  { name: 'Trip', value: 40, amount: 8400, color: '#f97316' },
  { name: 'Flatmates', value: 30, amount: 6300, color: '#8b5cf6' },
  { name: 'Office', value: 20, amount: 4200, color: '#06b6d4' },
  { name: 'Others', value: 10, amount: 2100, color: '#6366f1' },
]

export function ExpenseDistributionCard() {
  return (
    <Card className="border border-border/40 bg-card/50 backdrop-blur-sm p-6 h-full">
      <h3 className="text-lg font-semibold text-foreground mb-6">Expense Distribution</h3>

      <div className="flex gap-8">
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-col justify-center gap-4 min-w-[200px]">
          {expenseData.map((item) => (
            <div
              key={item.name}
              className="p-3 rounded-lg bg-background/30 hover:bg-background/50 transition-colors"
            >
              <div className="flex items-center gap-2 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm font-medium text-foreground">{item.name}</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-xs text-muted-foreground">{item.value}%</span>
                <span className="text-sm font-semibold text-foreground">${(item.amount / 100).toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
