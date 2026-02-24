"use client";

import { MetricCard } from "@/components/dashboard/metric-card";
import { CircularProgressCard } from "@/components/dashboard/circular-progress";
import { OptimizationImpactCard } from "@/components/dashboard/optimization-impact";
import { HealthIndicatorCard } from "@/components/dashboard/health-indicator";
import { Users, DollarSign, Clock, CheckCircle2 } from "lucide-react";
import { ExpenseDistributionCard } from "@/components/dashboard/exprense-distribution";
import { Sidebar } from "@/components/leftbar";
import { Header } from "@/components/dashboard/header";
import { useGroups } from "@/context/GroupContext";
import { useSuggestions } from "@/context/SuggestionContext";

export default function Dashboard() {
  const { groups, loading, error } = useGroups();
  const groupCount: number = groups.length;

  const {
    suggestions,
    loading: suggestionsLoading,
    error: suggestionsError,
  } = useSuggestions();
  const suggestionCount: number = suggestions.length;

  let settledSuggestion: number = 0;

  for (const suggestion of suggestions) {
    if (suggestion.isSettled) {
      settledSuggestion++;
    }
  }



  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar already uses sidebar tokens */}
      <Sidebar />

      <div className="ml-64 flex-1 flex-col overflow-hidden">
        {/* Header should use bg-card + border-border internally */}
        <Header />

        <main className="flex-1 px-8 py-10 max-w-7xl w-full mx-auto">
          {/* =========================
              Section 1: Global Financial Overview
          ========================== */}
          <section className="mb-10">
            <h2 className="text-xl font-semibold tracking-tight text-primary mb-6">
              Global Financial Overview
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                icon={Users}
                label="Total Groups Joined"
                value={loading ? "..." : error ? "0" : groupCount.toString()}
                subtitle={
                  loading
                    ? "Loading Groups"
                    : error
                    ? "Error in Groups Loading"
                    : "Active Groups"
                }
              />
              <MetricCard
                icon={DollarSign}
                label="Total Expenses Recorded"
                value={
                  suggestionsLoading
                    ? "..."
                    : suggestionsError
                    ? "0"
                    : suggestionCount.toString()
                }
                subtitle={
                  suggestionsLoading 
                    ? "Expense Records Loading"
                    : suggestionsError
                    ? "Error in Expenses Loading"
                    : "Total Expenses"
                }
              />

              <MetricCard
                icon={Clock}
                label="Total Pending Settlements"
                value={
                  suggestionsLoading
                    ? "..."
                    : suggestionsError
                    ? "0"
                    : (suggestionCount - settledSuggestion).toString()
                }
                subtitle="Pending"
              />
              <MetricCard
                icon={CheckCircle2}
                label="Total Settled Transactions"
                value={
                  suggestionsLoading
                    ? "..."
                    : suggestionsError
                    ? "0"
                    : settledSuggestion.toString()
                }
                subtitle="Completed"
              />
            </div>
          </section>

          {/* =========================
              Section 2 & 3
          ========================== */}
          <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
            <CircularProgressCard />
            <ExpenseDistributionCard />
          </section>

          {/* =========================
              Section 4: Optimization Impact
          ========================== */}
          <section className="mb-10">
            <OptimizationImpactCard />
          </section>

          {/* =========================
              Section 5: Financial Health
          ========================== */}
          <section>
            <h2 className="text-xl font-semibold tracking-tight text-primary mb-6">
              Financial Health
            </h2>
            <HealthIndicatorCard />
          </section>
        </main>
      </div>
    </div>
  );
}
