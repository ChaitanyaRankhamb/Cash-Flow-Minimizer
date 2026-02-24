'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowDown, Zap } from 'lucide-react'

export function OptimizationImpactCard() {
  const naiveCount = 28
  const optimizedCount = 9
  const reduction = Math.round(((naiveCount - optimizedCount) / naiveCount) * 100)

  return (
    <Card className="bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-md">

      {/* Header */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold tracking-tight text-primary mb-1">
          Greedy Optimization Impact
        </h3>
        <p className="text-sm text-muted-foreground">
          Cash-Flow Minimization Efficiency
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-6">

        <div className="bg-secondary border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">
            Naïve Transactions
          </p>
          <p className="text-3xl font-bold text-foreground">
            {naiveCount}
          </p>
        </div>

        <div className="bg-muted border border-border rounded-xl p-4 flex flex-col items-center justify-center">
          <ArrowDown className="h-6 w-6 text-primary mb-2" />
          <p className="text-xs text-muted-foreground text-center">
            Reduced By
          </p>
        </div>

        <div className="bg-secondary border border-border rounded-xl p-4">
          <p className="text-xs text-muted-foreground mb-1">
            Optimized Transactions
          </p>
          <p className="text-3xl font-bold text-primary">
            {optimizedCount}
          </p>
        </div>

      </div>

      {/* Reduction Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">
            Reduction Rate
          </p>
          <p className="text-sm font-bold text-primary">
            {reduction}%
          </p>
        </div>

        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
          <div
            className="bg-primary h-full rounded-full transition-all duration-500"
            style={{ width: `${reduction}%` }}
          />
        </div>
      </div>

      {/* Algorithm Info */}
      <div className="flex items-center justify-between p-4 bg-secondary border border-border rounded-xl">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">
            Algorithm Optimized
          </span>
        </div>

        <Badge
          variant="secondary"
          className="text-primary font-medium"
        >
          O(N log N)
        </Badge>
      </div>

    </Card>
  )
}
