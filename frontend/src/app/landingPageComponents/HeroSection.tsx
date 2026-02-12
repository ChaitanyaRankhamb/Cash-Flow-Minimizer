'use client'

import { ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section id='hero' className="relative w-full min-h-screen flex items-center justify-center overflow-hidden px-6">

      {/* ================= BACKGROUND ================= */}
      <div className="absolute inset-0 -z-10">

        {/* Base Background */}
        <div className="absolute inset-0 bg-background" />

        {/* Network Image */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-50 dark:opacity-10"
          style={{
            backgroundImage: 'url("/network-bg.png")',
          }}
        />

        {/* Subtle Grid Overlay using primary tone */}
        <div
          className="absolute inset-0 opacity-[0.04] dark:opacity-[0.08]"
          style={{
            backgroundImage: `
              linear-gradient(var(--primary) 1px, transparent 1px),
              linear-gradient(90deg, var(--primary) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Radial Glow using success color (financial positivity) */}
        <div
          className="absolute right-[-200px] top-1/2 -translate-y-1/2 w-[700px] h-[700px] blur-[140px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, var(--success), transparent 70%)',
          }}
        />
      </div>

      {/* ================= CONTENT ================= */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-foreground">
          Smart Cash-Flow Optimization
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(to right, var(--primary), var(--success))',
            }}
          >
            with Fewer Transactions
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Track shared expenses, manage loans, and let our intelligent
          cash-flow minimization engine compute the most efficient
          settlement strategy for your group.
        </p>

        {/* CTA */}
        <div className="mt-10 flex justify-center gap-4 flex-wrap">

          <Button
            size="lg"
            className="bg-primary text-primary-foreground hover:opacity-90 transition shadow-lg"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>

          <Button
            variant="outline"
            size="lg"
            className="border-border text-foreground hover:bg-accent"
          >
            See How It Works
          </Button>
        </div>

        {/* Trust Line */}
        <p className="mt-6 text-sm text-muted-foreground">
          Secure • Real-time Balances • Optimized Settlements
        </p>

      </div>
    </section>
  )
}
