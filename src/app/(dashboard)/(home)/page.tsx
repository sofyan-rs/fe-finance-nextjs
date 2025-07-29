"use client";

import { DashboardCards } from "./components/dashboard-cards";
import FilterDashboard from "./components/filter-dashboard";
import { useUserData } from "@/hooks/use-user-data";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { toDate } from "date-fns-tz";
import { useState } from "react";
import { useWalletSummary } from "./hooks/use-summary-queries";
import { RecentTransactions } from "./components/recent-transactions";
import { ChartIncomeExpense } from "./components/chart-income-expense";
import { ChartTransactionCategory } from "./components/chart-transaction-category";
import { PageHeader } from "./components/page-header";
import { SheetTransactionAdd } from "../transaction/components/sheet-transaction-add";

export default function Page() {
  const { token } = useUserData();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const initialStartDate = startOfDay(
    toDate(subDays(new Date(), 6), { timeZone })
  );
  const initialEndDate = endOfDay(toDate(new Date(), { timeZone }));

  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);
  const [wallet, setWallet] = useState<string>("all");

  const { data: walletSummary, isPending: isLoading } = useWalletSummary({
    token: token!,
    walletId: wallet === "all" ? undefined : wallet,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  return (
    <>
      <PageHeader />
      <div className="m-5 space-y-5">
        <FilterDashboard
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
          wallet={wallet}
          setWallet={setWallet}
        />
        <DashboardCards walletSummary={walletSummary} isLoading={isLoading} />
        <ChartIncomeExpense
          wallet={wallet}
          startDate={startDate}
          endDate={endDate}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <RecentTransactions
            wallet={wallet}
            startDate={startDate}
            endDate={endDate}
          />
          <ChartTransactionCategory
            wallet={wallet}
            startDate={startDate}
            endDate={endDate}
          />
        </div>
      </div>
      <SheetTransactionAdd />
    </>
  );
}
