"use client";

import { User, AlertCircle, CheckCircle2 } from "lucide-react";

export function CashFlowComparison() {
  const problemUsers = [
    { id: 1, top: "15%", left: "30%" },
    { id: 2, top: "25%", left: "45%" },
    { id: 3, top: "35%", left: "35%" },
    { id: 4, top: "50%", left: "50%" },
    { id: 5, top: "60%", left: "30%" },
    { id: 6, top: "70%", left: "45%" },
  ];

  const solutionUsers = [
    { id: 1, top: "20%", left: "50%" },
    { id: 2, top: "35%", left: "20%" },
    { id: 3, top: "35%", left: "40%" },
    { id: 4, top: "50%", left: "60%" },
    { id: 5, top: "65%", left: "30%" },
    { id: 6, top: "75%", left: "55%" },
  ];

  return (
    <section id="problem" className="w-full py-28 px-6 bg-background">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-foreground mb-6">
            Group Trip Cash Flow
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            See how our greedy algorithm transforms messy group expenses into optimized settlements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 relative">

          {/* ---------------- PROBLEM ---------------- */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-6">
              <AlertCircle className="w-4 h-4" />
              The Problem
            </div>

            <h2 className="text-3xl font-semibold text-foreground mb-8">
              Messy Payments & Confusion
            </h2>

            {/* Graph Card */}
            <div className="relative h-80 rounded-3xl bg-linear-to-br from-card to-muted/40 border border-border shadow-lg backdrop-blur-sm overflow-hidden mb-8">

              <svg className="absolute inset-0 w-full h-full">
                <g stroke="var(--muted-foreground)" strokeWidth="1.5" opacity="0.7">
                  <line x1="30%" y1="15%" x2="45%" y2="25%" />
                  <line x1="30%" y1="15%" x2="35%" y2="35%" />
                  <line x1="45%" y1="25%" x2="50%" y2="50%" />
                  <line x1="45%" y1="25%" x2="30%" y2="60%" />
                  <line x1="35%" y1="35%" x2="50%" y2="50%" />
                  <line x1="35%" y1="35%" x2="45%" y2="70%" />
                  <line x1="50%" y1="50%" x2="30%" y2="60%" />
                  <line x1="50%" y1="50%" x2="45%" y2="70%" />
                </g>
              </svg>

              {problemUsers.map((user) => (
                <div
                  key={user.id}
                  className="absolute w-10 h-10 bg-secondary border border-border rounded-full flex items-center justify-center shadow-md"
                  style={{
                    top: user.top,
                    left: user.left,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <User className="w-5 h-5 text-secondary-foreground" />
                </div>
              ))}
            </div>

            <ul className="space-y-3 text-muted-foreground text-lg">
              <li>• Too many cross-payments</li>
              <li>• Hard to track who owes whom</li>
              <li>• Manual calculations</li>
              <li>• Financial stress</li>
            </ul>
          </div>

          {/* ---------------- SOLUTION ---------------- */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium mb-6">
              <CheckCircle2 className="w-4 h-4" />
              The Solution
            </div>

            <h2 className="text-3xl font-semibold text-foreground mb-8">
              Instant Optimized Settlement
            </h2>

            {/* Graph Card */}
            <div className="relative h-80 rounded-3xl bg-linear-to-br from-card to-primary/5 border border-border shadow-xl overflow-hidden mb-8">

              <svg className="absolute inset-0 w-full h-full">
                <g stroke="var(--primary)" strokeWidth="2.2" opacity="0.8">
                  <line x1="50%" y1="20%" x2="40%" y2="35%" />
                  <line x1="50%" y1="20%" x2="60%" y2="50%" />
                  <line x1="20%" y1="35%" x2="30%" y2="65%" />
                  <line x1="60%" y1="50%" x2="55%" y2="75%" />
                </g>
              </svg>

              {solutionUsers.map((user) => (
                <div
                  key={user.id}
                  className="absolute w-11 h-11 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-lg ring-4 ring-ring/20"
                  style={{
                    top: user.top,
                    left: user.left,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <User className="w-5 h-5" />
                </div>
              ))}
            </div>

            <ul className="space-y-3 text-muted-foreground text-lg">
              <li>• Minimal required transactions</li>
              <li>
                • Clear debtor{" "}
                <span className="text-primary font-medium">→</span> creditor mapping
              </li>
              <li>• No manual math</li>
              <li>• Algorithm-driven clarity</li>
            </ul>
          </div>

          {/* Vertical Divider */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border" />
        </div>
      </div>
    </section>
  );
}
