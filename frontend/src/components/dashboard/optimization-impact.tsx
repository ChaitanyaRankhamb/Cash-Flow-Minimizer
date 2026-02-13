'use client'

import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { ArrowDown, Zap } from 'lucide-react'

export function OptimizationImpactCard() {
  const naiveCount = 28
  const optimizedCount = 9
  const reduction = Math.round(((naiveCount - optimizedCount) / naiveCount) * 100)

  return (
    <Card className="border border-border/40 bg-card/50 backdrop-blur-sm p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-1">Greedy Optimization Impact</h3>
        <p className="text-sm text-muted-foreground">Cash-Flow Minimization Efficiency</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-background/30 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Naïve Transactions</p>
          <p className="text-3xl font-bold text-foreground">{naiveCount}</p>
        </div>

        <div className="bg-background/30 rounded-lg p-4 flex flex-col items-center justify-center">
          <ArrowDown className="h-6 w-6 text-primary mb-2" />
          <p className="text-xs text-muted-foreground text-center">Reduced By</p>
        </div>

        <div className="bg-background/30 rounded-lg p-4">
          <p className="text-xs text-muted-foreground mb-1">Optimized Transactions</p>
          <p className="text-3xl font-bold text-primary">{optimizedCount}</p>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Reduction Rate</p>
          <p className="text-sm font-bold text-primary">{reduction}%</p>
        </div>
        <div className="w-full bg-background/30 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-primary to-primary/70 h-full rounded-full transition-all duration-500"
            style={{ width: `${reduction}%` }}
          ></div>
        </div>
      </div>

      <div className="flex items-center justify-between p-4 bg-primary/10 rounded-lg border border-primary/20">
        <div className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <span className="text-sm font-semibold text-foreground">Algorithm Optimized</span>
        </div>
        <Badge variant="outline" className="border-primary/30 text-primary">
          O(N log N)
        </Badge>
      </div>
    </Card>
  )
}
