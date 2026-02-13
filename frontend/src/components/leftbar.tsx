import { LayoutDashboard, Users, CreditCard, Zap, Settings, User } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface SidebarProps {
  userName: string
}

export function Sidebar({ userName }: SidebarProps) {
  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', active: true },
    { icon: Users, label: 'Groups', active: false },
    { icon: CreditCard, label: 'Expenses', active: false },
    { icon: Zap, label: 'Loans', active: false },
    { icon: Users, label: 'Settlements', active: false },
  ]

  return (
    <aside className="w-64 bg-sidebar-background border-r border-sidebar-border flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <h1 className="font-bold text-lg text-sidebar-foreground">Cash-Flow</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.label}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
              item.active
                ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                : 'text-sidebar-foreground hover:bg-sidebar-accent hover:bg-opacity-50'
            }`}
          >
            <item.icon className="w-5 h-5" />
            <span className="font-medium">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-sidebar-accent transition-colors group">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sidebar-primary-foreground font-bold">
            {userName.charAt(0)}
          </div>
          <div className="flex-1 text-left">
            <p className="text-sm font-medium text-sidebar-foreground">{userName}</p>
            <p className="text-xs text-sidebar-foreground opacity-60">Profile</p>
          </div>
        </button>
      </div>
    </aside>
  )
}
