'use client'

import {
  Zap,
  Shield,
  Lock,
  TrendingDown,
  ArrowRight,
  GitBranch,
  Lightbulb,
} from 'lucide-react'

export function Footer() {
  const trustIndicators = [
    {
      icon: Zap,
      title: 'Greedy Optimization Algorithm',
      description: 'O(N log N) complexity for optimal settlements',
    },
    {
      icon: TrendingDown,
      title: 'Real-Time Net Balance Calculation',
      description: 'Instant balance updates across all participants',
    },
    {
      icon: Lock,
      title: 'Secure JWT Authentication',
      description: 'Enterprise-grade security for your data',
    },
    {
      icon: Shield,
      title: 'Transparent Loan Interest Tracking',
      description: 'Configurable rates with detailed accounting',
    },
  ]

  const productLinks = [
    'Features',
    'How It Works',
    'Algorithm Overview',
    'Loan & Interest Tracking',
    'Security',
  ]

  const technologyLinks = [
    'Next.js Frontend',
    'Express.js Backend',
    'MongoDB Database',
    'JWT Authentication',
    'Greedy Algorithm (O(N log N))',
  ]

  return (
    <footer
      className="
      w-full 
      bg-slate-950 text-slate-300
      dark:bg-[#060B16] dark:text-slate-300
      relative
      before:absolute before:top-0 before:left-0 before:w-full before:h-px
      before:bg-gradient-to-r before:from-transparent before:via-emerald-500/30 before:to-transparent
    "
    >
      {/* Trust Banner */}
      <div className="border-b border-slate-800 dark:border-[#1A2335] px-4 md:px-8 py-14 md:py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
              Why Trust Cash-Flow Minimizer
            </h3>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Built on proven algorithms and enterprise-grade security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trustIndicators.map((indicator, index) => {
              const IconComponent = indicator.icon
              return (
                <div
                  key={index}
                  className="
                  p-5 rounded-xl
                  border border-slate-800
                  bg-slate-900/60
                  dark:bg-[#0E1628]
                  dark:border-[#1A2335]
                  hover:border-emerald-500/50
                  hover:dark:border-emerald-500/40
                  hover:dark:shadow-[0_0_20px_rgba(16,185,129,0.15)]
                  transition-all duration-300
                "
                >
                  <div className="flex items-start gap-3">
                    <div className="p-2.5 rounded-lg bg-slate-800 dark:bg-[#111C33]">
                      <IconComponent className="w-5 h-5 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white mb-1">
                        {indicator.title}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {indicator.description}
                      </p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="px-4 md:px-8 py-16 md:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <Lightbulb className="w-6 h-6 text-emerald-400" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Cash-Flow Minimizer
                </h2>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                Simplifying shared finances with intelligent cash-flow optimization.
              </p>
              <p className="text-xs text-slate-500">
                Built using an efficient greedy algorithm (O(N log N)) for fair and optimized settlements.
              </p>
            </div>

            {/* Product */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-5">
                Product
              </h3>
              <ul className="space-y-3">
                {productLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-emerald-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Technology */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-5">
                Technology
              </h3>
              <ul className="space-y-3">
                {technologyLinks.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2"
                    >
                      <GitBranch className="w-3.5 h-3.5 text-emerald-500" />
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-5">
                Get Started
              </h3>
              <p className="text-sm text-slate-400 mb-5">
                Ready to simplify group finances?
              </p>
              <div className="space-y-3">
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-500 text-white rounded-lg font-medium text-sm hover:bg-emerald-600 transition-colors">
                  Get Started
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-700 dark:border-[#1A2335] text-white rounded-lg font-medium text-sm hover:border-emerald-500/50 hover:text-emerald-400 transition-colors">
                  View Demo
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-800 dark:border-[#1A2335] pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
              <p>© 2026 Cash-Flow Minimizer. All rights reserved.</p>
              <div className="flex items-center gap-6">
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Terms
                </a>
                <a href="#" className="hover:text-emerald-400 transition-colors">
                  Security
                </a>
              </div>
            </div>
          </div>

        </div>
      </div>
    </footer>
  )
}
