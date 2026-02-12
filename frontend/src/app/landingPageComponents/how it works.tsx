"use client";

import React from "react";
import { Users, Receipt, Scale, Lightbulb, CheckCircle } from "lucide-react";

interface Step {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const steps: Step[] = [
  {
    icon: <Users className="w-6 h-6" />,
    title: "Group Creation",
    description: "Create a group for shared expenses.",
  },
  {
    icon: <Receipt className="w-6 h-6" />,
    title: "Expense Creation",
    description: "Add expenses paid by group members.",
  },
  {
    icon: <Scale className="w-6 h-6" />,
    title: "Balance Extraction",
    description: "System calculates net balances for each member.",
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: "Greedy Algorithm",
    description:
      "System identifies optimal payment paths and minimizes transactions.",
  },
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "Settlement Confirmation",
    description: "Members confirm payments and balances become zero.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="w-full py-28 px-6 bg-background relative overflow-hidden">
      {/* Subtle theme-aware dot background */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      {/* Dark mode subtle radial glow */}
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl opacity-0 dark:opacity-100 pointer-events-none" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 dark:bg-primary/5 rounded-full blur-3xl opacity-0 dark:opacity-100 pointer-events-none" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            See how the Cash-Flow Minimizer transforms messy group expenses into
            optimized settlements.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Horizontal Timeline Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-primary via-primary/70 to-primary/40 rounded-full" />

          {/* Timeline Steps */}
          <div className="grid md:grid-cols-5 gap-8 md:gap-4">
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative flex flex-col items-center group"
              >
                {/* Vertical Connector Line (Desktop) */}
                <div className="hidden md:block absolute w-1 h-24 top-0 left-1/2 transform -translate-x-1/2 -translate-y-full bg-gradient-to-b from-border via-border/60 to-transparent" />

                {/* Circular Node */}
                <div className="relative mb-6">
                  {/* Subtle glow on hover (theme aware) */}
                  <div className="absolute inset-0 rounded-3xl bg-primary/20 blur-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Circle */}
                  <div
                    className={`
                      relative w-20 h-20 rounded-3xl flex items-center justify-center
                      transition-all duration-300
                      group-hover:scale-110
                      shadow-md hover:shadow-lg
                      border
                      ${
                        index === 3
                          ? "bg-primary/10 border-primary/30"
                          : "bg-muted/50 border-border"
                      }
                    `}
                  >
                    {/* Icon */}
                    <div
                      className={`relative z-10 ${
                        index === 3 ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {step.icon}
                    </div>
                  </div>

                  {/* Step Number Badge */}
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card border border-border text-foreground text-xs font-bold flex items-center justify-center shadow-sm">
                    {index + 1}
                  </div>
                </div>

                {/* Step Content */}
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Timeline Indicator */}
        <div className="md:hidden mt-12 flex justify-center gap-2">
          {steps.map((_, index) => (
            <div
              key={index}
              className="h-2 w-2 rounded-full bg-muted-foreground/30"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
