'use client'

import { Card } from '@/components/ui/card'
import { TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react'

export function HealthIndicatorCard() {
  // Sample data - in production this would come from an API
  const netPosition = 2400 // positive = creditor, negative = debtor, zero = settled

  const getStatus = () => {
    if (netPosition > 0) {
      return {
        title: 'Healthy – You are overall creditor',
        color: 'text-emerald-400',
        bgColor: 'bg-emerald-500/10',
        borderColor: 'border-emerald-500/30',
        icon: TrendingUp,
      }
    } else if (netPosition < 0) {
      return {
        title: 'Attention – You owe overall',
        color: 'text-red-400',
        bgColor: 'bg-red-500/10',
        borderColor: 'border-red-500/30',
        icon: AlertCircle,
      }
    } else {
      return {
        title: 'All Settled 🎉',
        color: 'text-primary',
        bgColor: 'bg-primary/10',
        borderColor: 'border-primary/30',
        icon: CheckCircle2,
      }
    }
  }

  const status = getStatus()
  const StatusIcon = status.icon

  return (
    <Card className={`border ${status.borderColor} ${status.bgColor} backdrop-blur-sm p-6`}>
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${status.bgColor}`}>
          <StatusIcon className={`h-6 w-6 ${status.color}`} />
        </div>

        <div className="flex-1">
          <h3 className={`text-base font-semibold ${status.color}`}>{status.title}</h3>
          <p className="text-sm text-muted-foreground mt-1">
            {netPosition > 0
              ? `You are owed $${Math.abs(netPosition / 100).toFixed(2)} overall`
              : netPosition < 0
                ? `You owe $${Math.abs(netPosition / 100).toFixed(2)} overall`
                : 'All debts are settled'}
          </p>
        </div>
      </div>
    </Card>
  )
}
