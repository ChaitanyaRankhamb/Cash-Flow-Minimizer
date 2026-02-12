'use client'

import { ArrowRight } from 'lucide-react'
import { useState } from 'react'

export function FlexibleSplitsFeature() {
  const [splitType, setSplitType] = useState<'equal' | 'exact' | 'percentage'>('equal')

  const [splits, setSplits] = useState({
    Chaitu: 3333.33,
    Roshan: 3333.33,
    Ayush: 3333.34,
  })

  const totalAmount = 10000
  const totalAllocated = Object.values(splits).reduce((a, b) => a + b, 0)
  const isValid = Math.abs(totalAllocated - totalAmount) < 0.01

  const avatarColors = [
    "bg-chart-1/15 text-chart-1",
    "bg-chart-2/15 text-chart-2",
    "bg-chart-3/15 text-chart-3",
  ]

  const handleSplitChange = (name: string, value: string) => {
    const numValue = parseFloat(value) || 0
    setSplits((prev) => ({
      ...prev,
      [name]: numValue,
    }))
  }

  const handleEqualSplit = () => {
    setSplitType('equal')
    const equalAmount = totalAmount / 3
    setSplits({
      Chaitu: equalAmount,
      Roshan: equalAmount,
      Ayush: totalAmount - 2 * equalAmount,
    })
  }

  const handleExactSplit = () => {
    setSplitType('exact')
    setSplits({
      Chaitu: 4000,
      Roshan: 3500,
      Ayush: 2500,
    })
  }

  const handlePercentageSplit = () => {
    setSplitType('percentage')
    setSplits({
      Chaitu: totalAmount * 0.5,
      Roshan: totalAmount * 0.3,
      Ayush: totalAmount * 0.2,
    })
  }

  return (
    <section className="w-full py-24 px-4 md:px-8 bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="mx-auto max-w-7xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            <h1 className="text-md md:text-xl font-bold text-foreground">
              2) Flexible Expense Engine
            </h1>

            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                Split expenses
              </span>{" "}
              your way.
            </h2>

            <p className="text-lg text-muted-foreground">
              Choose{" "}
              <span className="font-semibold text-primary">
                equal, exact, or percentage-based splits
              </span>{" "}
              with complete flexibility.
            </p>

            <p className="text-base text-muted-foreground leading-relaxed">
              Whether you're splitting a dinner bill equally, assigning custom
              amounts, or dividing costs by percentage, our system validates totals
              automatically and recalculates balances in real time.
            </p>

            <a
              href="#explore"
              className="inline-flex items-center gap-2 text-primary font-medium hover:opacity-80 transition-all duration-300 group"
            >
              Explore splitting logic
              <span className="group-hover:translate-x-1 transition-transform">
                <ArrowRight size={18} />
              </span>
            </a>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex justify-center md:justify-end relative">

            {/* Glow Effect */}
            {/* <div className="absolute -inset-6 bg-gradient-to-r from-primary/10 to-success/10 blur-2xl opacity-60 rounded-3xl" /> */}

            {/* Card */}
            <div className="relative w-full max-w-md bg-gradient-to-br from-card to-secondary/40 border border-border rounded-2xl shadow-[0_10px_40px_-15px_oklch(0.23_0.04_262/0.4)] backdrop-blur overflow-hidden">

              {/* Header */}
              <div className="p-6 border-b border-border space-y-4">

                <div>
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                    Expense Title
                  </label>
                  <input
                    type="text"
                    value="Goa Trip Hotel"
                    readOnly
                    className="w-full px-3 py-2 bg-muted border border-input rounded-lg text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                      Total Amount
                    </label>
                    <div className="px-3 py-2 bg-muted border border-input rounded-lg text-lg font-bold text-foreground">
                      ₹ {totalAmount.toLocaleString()}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-2">
                      Paid By
                    </label>
                    <select className="w-full px-3 py-2 bg-muted border border-input rounded-lg text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-ring">
                      <option>Chaitu</option>
                      <option>Roshan</option>
                      <option>Ayush</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Split Type */}
              <div className="p-6 border-b border-border">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block mb-3">
                  Split Type
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {['equal', 'exact', 'percentage'].map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        type === 'equal'
                          ? handleEqualSplit()
                          : type === 'exact'
                          ? handleExactSplit()
                          : handlePercentageSplit()
                      }
                      className={`py-2 px-3 rounded-lg font-medium text-sm transition-all duration-200
                        ${
                          splitType === type
                            ? 'bg-primary text-primary-foreground shadow-md ring-2 ring-ring'
                            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                        }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Split Allocation */}
              <div className="p-6 border-b border-border space-y-3">
                <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider block">
                  Split Allocation
                </label>

                {Object.entries(splits).map(([name, amount], index) => (
                  <div key={name} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${avatarColors[index]}`}>
                      <span className="text-xs font-bold">
                        {name[0]}
                      </span>
                    </div>

                    <span className="text-sm font-medium text-foreground min-w-[60px]">
                      {name}
                    </span>

                    <input
                      type="number"
                      value={amount.toFixed(2)}
                      onChange={(e) => handleSplitChange(name, e.target.value)}
                      className="flex-1 px-2 py-1 bg-muted border border-input rounded text-sm text-foreground text-right font-mono focus:outline-none focus:ring-2 focus:ring-ring"
                    />

                    <span className="text-sm font-medium text-muted-foreground">
                      ₹
                    </span>
                  </div>
                ))}
              </div>

              {/* Validation Footer */}
              <div className="p-6 bg-muted/40 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-foreground">
                    Total Allocated
                  </span>
                  <span
                    className={`text-sm font-bold ${
                      isValid ? 'text-success' : 'text-destructive'
                    }`}
                  >
                    ₹ {totalAllocated.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">
                    Target Amount
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    ₹ {totalAmount.toFixed(2)}
                  </span>
                </div>

                <div className="pt-2 border-t border-border/50">
                  {isValid ? (
                    <p className="text-xs text-success font-medium">
                      ✓ Perfect allocation
                    </p>
                  ) : (
                    <p className="text-xs text-destructive font-medium">
                      Difference: ₹ {Math.abs(totalAllocated - totalAmount).toFixed(2)}
                    </p>
                  )}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
