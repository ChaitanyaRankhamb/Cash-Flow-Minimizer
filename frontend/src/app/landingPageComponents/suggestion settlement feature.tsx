'use client'

import { ArrowRight, TrendingDown } from 'lucide-react'

export function SettlementEngineFeature() {
  const members = [
    { id: 1, name: 'Chaitu', amount: 4000, type: 'positive' },
    { id: 2, name: 'Roshan', amount: -2000, type: 'negative' },
    { id: 3, name: 'Ayush', amount: -1000, type: 'negative' },
    { id: 4, name: 'Karan', amount: -1000, type: 'negative' },
  ]

  const settlements = [
    { id: 1, from: 'Roshan', to: 'Chaitu', amount: 2000 },
    { id: 2, from: 'Ayush', to: 'Chaitu', amount: 1000 },
    { id: 3, from: 'Karan', to: 'Chaitu', amount: 1000 },
  ]

  const avatarColors = [
    "bg-chart-1/15 text-chart-1",
    "bg-chart-2/15 text-chart-2",
    "bg-chart-3/15 text-chart-3",
    "bg-chart-5/15 text-chart-5",
  ]

  const getNameInitial = (name: string) => name.charAt(0).toUpperCase()

  return (
    <section className="w-full py-24 md:py-32 px-4 md:px-8 bg-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* RIGHT SIDE */}
          <div className="relative">

            {/* Left Side Glow */}
            {/* <div className="hidden md:block absolute -inset-6 left-0 right-auto w-[130%] -translate-x-1/6 bg-gradient-to-l from-primary/10 to-success/10 blur-2xl opacity-60 rounded-3xl pointer-events-none" /> */}
            {/* Right Side Glow (original) */}
            {/* <div className="absolute -inset-6 bg-gradient-to-r from-primary/10 to-success/10 blur-2xl opacity-60 rounded-3xl" />  */}

            <div className="relative bg-card border border-border rounded-2xl shadow-xl overflow-hidden">

              {/* Header */}
              <div className="flex items-center justify-between px-6 py-3 border-b border-border">
                <h3 className="text-lg font-semibold text-card-foreground">
                  Settlement Summary
                </h3>

                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-success/15 text-success rounded-full text-xs font-semibold">
                  <span className="w-2 h-2 bg-success rounded-full" />
                  Optimized
                </span>
              </div>

              <div className="p-6 space-y-3">

                {/* Net Balances */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Net Balances
                  </h4>

                  {members.map((member) => (
                    <div
                      key={member.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[members.indexOf(member)]}`}
                        >
                          {getNameInitial(member.name)}
                        </div>
                        <span className="font-medium text-foreground">
                          {member.name}
                        </span>
                      </div>

                      <span
                        className={`font-semibold ${
                          member.type === 'positive'
                            ? 'text-success'
                            : 'text-destructive'
                        }`}
                      >
                        {member.type === 'positive' ? '+' : '-'}₹
                        {Math.abs(member.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border" />

                {/* Suggested Settlements */}
                <div className="space-y-3">
                  <h4 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Suggested Settlements (3 transactions)
                  </h4>

                  {settlements.map((settlement) => (
                    <div
                      key={settlement.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-muted/50 hover:bg-muted transition group"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[members.findIndex(m => m.name === settlement.from)]}`}
                        >
                          {getNameInitial(settlement.from)}
                        </div>

                        <span className="text-sm font-medium text-foreground">
                          {settlement.from}
                        </span>

                        <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition" />

                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[members.findIndex(m => m.name === settlement.to)]}`}
                        >
                          {getNameInitial(settlement.to)}
                        </div>

                        <span className="text-sm font-medium text-foreground">
                          {settlement.to}
                        </span>
                      </div>

                      <span className="font-semibold text-primary">
                        ₹{settlement.amount.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="h-px bg-border" />

                {/* Reduction Footer */}
                <div className="flex items-center justify-between pt-2">
                  <div className="space-y-1">
                    <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide">
                      Transaction Reduction
                    </p>
                    <p className="text-sm text-foreground">
                      Reduced from{' '}
                      <span className="font-semibold line-through text-destructive">
                        6
                      </span>{' '}
                      to{' '}
                      <span className="font-semibold text-success">
                        3
                      </span>
                    </p>
                  </div>

                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-success/15">
                    <TrendingDown className="w-6 h-6 text-success" />
                  </div>
                </div>

              </div>
            </div>
          </div>
          
          {/* LEFT SIDE */}
          <div className="space-y-8">

            <h1 className="text-md md:text-xl font-bold text-foreground">
            3) Smart Settlement Engine
            </h1>


            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
              Minimize payments.
              </span>{" "}
              Maximize clarity.
            </h2>

            <p className="text-lg text-muted-foreground font-medium">
              Automatically reduces complex group debts into the smallest
              number of transactions.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              Our algorithm analyzes balances and generates optimized settlement
              suggestions so your group pays fewer times and closes faster.
            </p>

            <a
              href="#"
              className="inline-flex items-center gap-2 text-primary font-semibold hover:opacity-80 transition"
            >
              See how optimization works
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>

          

        </div>
      </div>
    </section>
  )
}
