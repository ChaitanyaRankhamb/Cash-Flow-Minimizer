"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useGroups } from "@/context/GroupContext";
import { useSuggestions } from "@/context/SuggestionContext";
import { useUser } from "@/context/UserContext";
import { useNetBalances } from "@/context/netBalance.Context";

interface ChartItem {
  name: string;
  value: number;
  color: string;
}

function getColorFromClass(className: string) {
  const temp = document.createElement("div");
  temp.className = className;
  temp.style.display = "none";
  document.body.appendChild(temp);

  const color = getComputedStyle(temp).backgroundColor;
  document.body.removeChild(temp);

  return color;
}

export function CircularProgressCard() {
  const [data, setData] = useState<ChartItem[]>([]);
  const { groups } = useGroups();
  const { netBalances } = useNetBalances();
  const { user } = useUser();

  // group data
  const totalGroups = groups.length;
  let totalActiveGroups = 0;

  for (const group of groups) {
    if (group.isActive) {
      totalActiveGroups++;
    }
  }

  // net balance data
  let totalOwed: number = 0;
  let totalOwe: number = 0;

  const currentUserId = user?.id;

  for (const netBalance of netBalances) {
    if (!currentUserId) continue;
    if (netBalance.userId.value !== currentUserId) continue;

    if (netBalance.role === "CREDITOR") {
      totalOwed += netBalance.netBalance;
    } else if (netBalance.role === "DEBTOR") {
      totalOwe += Math.abs(netBalance.netBalance);
    } 
  }

  const totalActiveAmount: number = totalOwed + totalOwe;



  useEffect(() => {
    const success = getColorFromClass("bg-success");
    const destructive = getColorFromClass("bg-destructive");
    const neutral = getColorFromClass("bg-chart-3");

    setData([
      { name: "You are owed", value: totalOwed, color: success },
      { name: "You owe", value: totalOwe, color: destructive },
      { name: "Balanced groups", value: 2100, color: neutral },
    ]);
  }, []);

  return (
    <Card className="bg-card border border-border rounded-2xl p-6 h-full transition-all duration-300 hover:shadow-md">
      <h3 className="text-lg font-semibold tracking-tight text-primary mb-6">
        Active Debt Status
      </h3>

      <div className="flex gap-10">
        {/* Chart */}
        <div className="flex-1 flex items-center justify-center">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={90}
                paddingAngle={4}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Stats */}
        <div className="flex flex-col justify-center gap-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Total Active Amount
            </p>
            <p className="text-2xl font-semibold tracking-tight text-foreground">
              ₹ {totalActiveAmount.toFixed(2)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {totalActiveGroups} / {totalGroups} Groups Active
            </p>
          </div>

          <div className="space-y-3">
            {data.map((item) => (
              <div key={item.name} className="flex items-center gap-3">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-xs text-muted-foreground">
                  {item.name} { item.value }
                </span>
                
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
