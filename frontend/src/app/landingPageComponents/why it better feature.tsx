"use client";

import {
  TrendingDown,
  Zap,
  Calculator,
  Lock,
  Gauge,
  CheckCircle2,
  ArrowRight,
  Check,
  X,
} from "lucide-react";

const features = [
  {
    icon: TrendingDown,
    title: "Greedy Cash-Flow Optimization",
    description:
      "Minimizes the number of transactions using an optimized greedy algorithm to settle debts efficiently.",
  },
  {
    icon: Zap,
    title: "Smart Loan & Interest Tracking",
    description:
      "Supports configurable simple and compound interest calculations for real-world borrowing scenarios.",
  },
  {
    icon: Calculator,
    title: "Accurate Net Balance Engine",
    description:
      "Computes each user's receivable and payable amounts precisely in real time.",
  },
  {
    icon: Lock,
    title: "Secure by Design",
    description:
      "JWT authentication and bcrypt hashing ensure protected financial data.",
  },
  {
    icon: Gauge,
    title: "Scalable Performance",
    description:
      "Optimized backend algorithm runs efficiently even as group size increases.",
  },
  {
    icon: CheckCircle2,
    title: "Transparent & Dispute-Free",
    description:
      "Clear settlement suggestions eliminate confusion and financial disputes.",
  },
];

const comparisonData = [
  { feature: "Transaction Optimization", traditional: false, cashFlow: true },
  { feature: "Real-time Balance Updates", traditional: false, cashFlow: true },
  { feature: "Interest Tracking", traditional: false, cashFlow: true },
  { feature: "Dispute Resolution", traditional: false, cashFlow: true },
  { feature: "Secure Authentication", traditional: false, cashFlow: true },
];

export function WhyBetterFeatures() {
  return (
    <section id="why-better"
      className="
      relative w-full py-24 md:py-32 px-4 md:px-8
      bg-gradient-to-b
      from-background
      via-indigo-50/40
      to-background
      dark:from-background
      dark:via-indigo-950/20
      dark:to-background
    "
    >
      <div className="mx-auto max-w-7xl">
        {/* ================= HEADER ================= */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Why it's better
          </h2>

          <p className="text-lg md:text-xl text-muted-foreground">
            Built with algorithmic intelligence and secure architecture, the
            system ensures optimized settlements, transparent balances, and
            scalable performance.
          </p>
        </div>

        {/* ================= FEATURES GRID ================= */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <div
                key={index}
                className="
                  group relative rounded-2xl border border-border
                  p-8 bg-card shadow-sm
                  hover:shadow-xl hover:-translate-y-1
                  transition-all duration-300
                "
              >
                {/* Icon */}
                <div className="mb-5 inline-flex">
                  <div
                    className="
                      p-3 rounded-xl
                      bg-indigo-100 dark:bg-indigo-900/30
                      text-indigo-600 dark:text-indigo-400
                    "
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* ================= COMPARISON SECTION ================= */}
        <div
          className="
            rounded-2xl border border-indigo-200/40
            dark:border-indigo-800/40
            bg-gradient-to-br
            from-card
            to-indigo-50/40
            dark:to-indigo-950/20
            p-8 md:p-12 shadow-sm
          "
        >
          <div className="mb-10 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Traditional Splitting vs Cash-Flow Minimizer
            </h3>
            <p className="text-muted-foreground">
              See how we outperform standard solutions
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-4 px-4 font-semibold text-foreground">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-muted-foreground">
                    Traditional
                  </th>
                  <th className="text-center py-4 px-4 font-semibold text-foreground">
                    Cash-Flow Minimizer
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, index) => (
                  <tr
                    key={index}
                    className="
                      border-b border-border/50
                      hover:bg-secondary/30 dark:hover:bg-secondary/10
                      transition-colors
                    "
                  >
                    <td className="py-4 px-4 text-foreground font-medium">
                      {row.feature}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {row.traditional ? (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      ) : (
                        <X className="w-5 h-5 text-rose-500 mx-auto" />
                      )}
                    </td>

                    <td className="py-4 px-4 text-center">
                      {row.cashFlow && (
                        <Check className="w-5 h-5 text-emerald-500 mx-auto" />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CTA */}
          <div className="mt-10 flex justify-center">
            <button
              className="
                inline-flex items-center gap-2
                px-6 py-3 rounded-xl
                bg-primary text-primary-foreground
                font-semibold
                hover:bg-primary/90
                transition-all duration-200
                shadow-md hover:shadow-lg
              "
            >
              Get Started Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
