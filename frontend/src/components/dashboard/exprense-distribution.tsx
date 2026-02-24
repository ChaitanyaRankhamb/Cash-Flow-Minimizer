'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'

interface ExpenseItem {
  name: string
  value: number
  amount: number
  color: string
}

function getColorFromClass(className: string) {
  const temp = document.createElement('div')
  temp.className = className
  temp.style.display = 'none'
  document.body.appendChild(temp)

  const color = getComputedStyle(temp).backgroundColor
  document.body.removeChild(temp)

  return color
}

export function ExpenseDistributionCard() {
  const [expenseData, setExpenseData] = useState<ExpenseItem[]>([])

  useEffect(() => {
    const chart1 = getColorFromClass('bg-chart-1')
    const chart2 = getColorFromClass('bg-chart-2')
    const chart3 = getColorFromClass('bg-chart-3')
    const chart4 = getColorFromClass('bg-chart-4')

    setExpenseData([
      { name: 'Trip', value: 40, amount: 8400, color: chart1 },
      { name: 'Flatmates', value: 30, amount: 6300, color: chart2 },
      { name: 'Office', value: 20, amount: 4200, color: chart3 },
      { name: 'Others', value: 10, amount: 2100, color: chart4 },
    ])
  }, [])

  return (
    <Card className="bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-md">

      <h3 className="text-lg font-semibold tracking-tight text-primary mb-6">
        Expense Distribution
      </h3>

      <div className="flex gap-10">

        {/* Chart */}
        <div className="flex-1">
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={expenseData}
                cx="50%"
                cy="50%"
                innerRadius={55}
                outerRadius={85}
                paddingAngle={3}
                dataKey="value"
              >
                {expenseData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Breakdown */}
        <div className="flex flex-col justify-center gap-4 min-w-[200px]">
          {expenseData.map((item) => (
            <div
              key={item.name}
              className="
                p-4 
                rounded-xl 
                border border-border 
                bg-secondary 
                transition-all duration-200
                hover:border-primary/30
              "
            >
              <div className="flex items-center gap-3 mb-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm font-medium text-foreground">
                  {item.name}
                </span>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-xs text-muted-foreground">
                  {item.value}%
                </span>
                <span className="text-sm font-semibold tracking-tight text-foreground">
                  ₹ {(item.amount / 100).toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </Card>
  )
}
