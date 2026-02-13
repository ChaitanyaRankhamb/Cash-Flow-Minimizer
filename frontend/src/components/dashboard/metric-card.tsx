import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface MetricCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  subtitle?: string
}

export function MetricCard({ icon: Icon, label, value, subtitle }: MetricCardProps) {
  return (
    <Card className="relative overflow-hidden border border-border/40 bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 p-6">
      <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent"></div>
      </div>

      <div className="relative">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-2">{label}</p>
            <p className="text-3xl font-bold text-foreground">{value}</p>
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="h-6 w-6 text-primary" />
          </div>
        </div>

        <div className="absolute bottom-0 left-0 w-1 h-1 bg-primary rounded-full opacity-0 hover:opacity-100 transition-opacity"></div>
      </div>
    </Card>
  )
}
