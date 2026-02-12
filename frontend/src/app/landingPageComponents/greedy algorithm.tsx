"use client";

import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const avatarColors = [
  "bg-chart-1/15 text-chart-1",
  "bg-chart-2/15 text-chart-2",
  "bg-chart-3/15 text-chart-3",
];

export function GreedyAlgorithmFeature() {
  return (
    <section id="features" className="py-24 px-4 md:px-8 bg-background">
      <div className="mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="mb-10 flex flex-col items-center text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover how our platform leverages a greedy algorithm to quickly
            and efficiently minimize group transactions.
          </p>
        </div>

        <div className="mb-4">
          <h1 className="text-md md:text-xl font-bold text-foreground mb-2 text-balance">
            1) Greedy Cash-Flow Minimization
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative order-2 md:order-1">
            <div className="absolute -inset-6 right-0 left-auto w-[130%] translate-x-1/6 bg-gradient-to-r from-primary/10 to-success/10 blur-2xl opacity-60 rounded-3xl pointer-events-none" />

            <Card className="bg-card border border-border rounded-2xl shadow-xl overflow-hidden relative z-10">
              {/* Terminal Header */}
              <div className="bg-muted/40 px-6 py-4 flex items-center gap-2 border-b border-border">
                <div className="w-3 h-3 rounded-full bg-destructive/80" />
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-success/40" />
                <span className="ml-4 text-xs font-mono text-muted-foreground">
                  algorithm.ts
                </span>
              </div>

              <div className="p-6 space-y-6">
                {/* Net Balances */}
                <div>
                  <div className="text-xs font-semibold text-card-foreground mb-3 font-mono">
                    NET BALANCES
                  </div>

                  <div className="space-y-2 text-sm font-mono">
                    {/* Chaitu */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[0]}`}
                        >
                          C
                        </div>
                        <span className="font-medium text-foreground">
                          Chaitu
                        </span>
                      </div>
                      <span className="text-success font-semibold">+50</span>
                    </div>

                    {/* Roshan */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[1]}`}
                        >
                          R
                        </div>
                        <span className="font-medium text-foreground">
                          Roshan
                        </span>
                      </div>
                      <span className="text-destructive font-semibold">
                        -30
                      </span>
                    </div>

                    {/* Ayush */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[2]}`}
                        >
                          A
                        </div>
                        <span className="font-medium text-foreground">
                          Ayush
                        </span>
                      </div>
                      <span className="text-destructive font-semibold">
                        -20
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-border" />

                {/* Settlement Suggestions */}
                <div>
                  <div className="text-xs font-semibold text-card-foreground mb-3 font-mono">
                    SETTLEMENT SUGGESTIONS
                  </div>

                  <div className="space-y-3 text-sm font-mono">
                    <div className="flex items-center justify-between bg-muted/40 rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[1]}`}
                        >
                          R
                        </div>
                        <span className="text-foreground">Roshan</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[0]}`}
                        >
                          C
                        </div>
                        <span className="text-foreground">Chaitu</span>
                      </div>
                      <span className="text-primary font-semibold">30</span>
                    </div>

                    <div className="flex items-center justify-between bg-muted/40 rounded-lg px-4 py-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[2]}`}
                        >
                          A
                        </div>
                        <span className="text-foreground">Ayush</span>
                      </div>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center font-semibold text-sm ${avatarColors[0]}`}
                        >
                          C
                        </div>
                        <span className="text-foreground">Chaitu</span>
                      </div>
                      <span className="text-primary font-semibold">20</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* RIGHT SIDE */}
          <div className="order-1 md:order-2 space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight">
              <span className="bg-gradient-to-r from-primary to-success bg-clip-text text-transparent">
                Settle debts
              </span>{" "}
              with mathematical precision.
            </h2>

            <p className="text-lg md:text-xl leading-relaxed text-foreground">
              Automatically reduce transactions using a{" "}
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent font-semibold">
                greedy optimization algorithm
              </span>
              .
            </p>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              We compute each member's net balance, identify the maximum
              creditor and debtor, and iteratively settle the minimum amount
              required. The result is fewer transactions, faster settlements,
              and complete financial clarity.
            </p>

            <a className="inline-flex items-center gap-2 text-base font-semibold text-primary hover:opacity-80 transition group">
              See how the algorithm works
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
