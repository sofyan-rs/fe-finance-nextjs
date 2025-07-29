"use client";

import { Pie, PieChart } from "recharts";
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
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { format } from "date-fns-tz";
import { CurrencyFormatter } from "@/components/currency-formatter";
import { useUserData } from "@/hooks/use-user-data";
import { usePieChartData } from "../hooks/use-summary-queries";
import { Skeleton } from "@/components/ui/skeleton";
import { useState, useEffect } from "react";

export function ChartTransactionCategory({
  wallet,
  startDate,
  endDate,
}: {
  wallet: string;
  startDate: Date;
  endDate: Date;
}) {
  const { token } = useUserData();

  // State to track which categories are visible
  const [visibleKeys, setVisibleKeys] = useState<Record<string, boolean>>({});

  const { data: chartData, isPending: isLoading } = usePieChartData({
    token: token!,
    walletId: wallet === "all" ? undefined : wallet,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  // Initialize visibleKeys when chartData changes
  useEffect(() => {
    if (chartData && chartData.length > 0) {
      const initialVisibleKeys = chartData.reduce((acc, item) => {
        acc[item.category] = true;
        return acc;
      }, {} as Record<string, boolean>);
      setVisibleKeys(initialVisibleKeys);
    }
  }, [chartData]);

  const chartConfig = (chartData || []).reduce((config, item) => {
    config[item.category] = {
      label: item.icon + " " + item.category,
      color: item.fill,
    };
    return config;
  }, {} as Record<string, { label: string; color: string }>) satisfies ChartConfig;

  // Filter chartData based on visible keys
  const filteredChartData = (chartData || []).filter(
    (item) => visibleKeys[item.category]
  );

  // Handler to toggle visibility of categories
  const handleLegendToggle = (dataKey: string) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [dataKey]: !prev[dataKey],
    }));
  };

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total Transaction by Category</CardTitle>
        <CardDescription>
          {format(startDate, "dd MMM yyyy")} - {format(endDate, "dd MMM yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <Skeleton className="h-[300px] w-full" />
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
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
              <Pie
                data={filteredChartData}
                dataKey="total"
                nameKey="category"
              />
              <ChartLegend
                content={() => (
                  <ChartLegendCustom
                    visibleKeys={visibleKeys}
                    onToggle={handleLegendToggle}
                    chartConfig={chartConfig}
                  />
                )}
              />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}
