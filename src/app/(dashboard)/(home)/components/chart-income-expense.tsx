"use client";

import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendCustom,
  // ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns-tz";
import { CurrencyFormatter } from "@/components/currency-formatter";
import { useLineChartData } from "../hooks/use-summary-queries";
import { useUserData } from "@/hooks/use-user-data";
import { Skeleton } from "@/components/ui/skeleton";

const chartConfig = {
  income: {
    label: "Income",
    color: "var(--color-green-500)",
  },
  expense: {
    label: "Expense",
    color: "var(--color-red-500)",
  },
} satisfies ChartConfig;

export function ChartIncomeExpense({
  wallet,
  startDate,
  endDate,
}: {
  wallet: string;
  startDate: Date;
  endDate: Date;
}) {
  const { token } = useUserData();

  // State to track which data series are visible
  const [visibleKeys, setVisibleKeys] = useState({
    income: true,
    expense: true,
  });

  const { data: chartData, isPending: isLoading } = useLineChartData({
    token: token!,
    walletId: wallet === "all" ? undefined : wallet,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  // Handler to toggle visibility of data series
  const handleLegendToggle = (dataKey: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey as keyof typeof prev],
    }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
        <CardDescription>
          {format(startDate, "dd MMM yyyy")} - {format(endDate, "dd MMM yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <AreaChart
              accessibilityLayer
              data={chartData}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) => value.slice(0, 3)}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
                formatter={(value, name) => (
                  <>
                    <div
                      className="h-2.5 w-2.5 shrink-0 rounded-[2px] bg-(--color-bg)"
                      style={
                        {
                          "--color-bg": `var(--color-${name})`,
                        } as React.CSSProperties
                      }
                    />
                    {chartConfig[name as keyof typeof chartConfig]?.label ||
                      name}
                    <div className="text-foreground ml-auto flex items-baseline gap-0.5 font-mono font-medium tabular-nums">
                      <CurrencyFormatter value={Number(value)} />
                    </div>
                  </>
                )}
              />
              <defs>
                <linearGradient id="fillIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-green-500)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-green-500)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
                <linearGradient id="fillExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor="var(--color-red-500)"
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor="var(--color-red-500)"
                    stopOpacity={0.1}
                  />
                </linearGradient>
              </defs>
              {visibleKeys.income && (
                <Area
                  dataKey="income"
                  type="natural"
                  fill="url(#fillIncome)"
                  fillOpacity={0.4}
                  stroke="var(--color-green-500)"
                  stackId="a"
                />
              )}
              {visibleKeys.expense && (
                <Area
                  dataKey="expense"
                  type="natural"
                  fill="url(#fillExpense)"
                  fillOpacity={0.4}
                  stroke="var(--color-red-500)"
                  stackId="b"
                />
              )}
              <ChartLegend
                content={() => (
                  <ChartLegendCustom
                    visibleKeys={visibleKeys}
                    onToggle={handleLegendToggle}
                    chartConfig={chartConfig}
                  />
                )}
              />
            </AreaChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
