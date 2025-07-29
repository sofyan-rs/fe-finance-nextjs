import { CurrencyFormatter } from "@/components/currency-formatter";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IWalletSummary } from "@/types/report-types";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export function DashboardCards({
  walletSummary,
  isLoading,
}: {
  walletSummary?: IWalletSummary;
  isLoading: boolean;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardDescription className="text-center">
            Total Balance
          </CardDescription>
          <CardTitle className="text-center text-3xl font-semibold tabular-nums flex items-center justify-center">
            {isLoading ? (
              <Skeleton className="w-24 h-8" />
            ) : (
              <CurrencyFormatter value={walletSummary?.totalBalance || 0} />
            )}
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Income</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums text-green-500">
            {isLoading ? (
              <Skeleton className="w-24 h-8" />
            ) : (
              <CurrencyFormatter value={walletSummary?.totalIncome || 0} />
            )}
          </CardTitle>
          <CardAction className="bg-green-100 text-green-500 dark:bg-zinc-950 p-3 rounded-lg">
            <BanknoteArrowUp />
          </CardAction>
        </CardHeader>
        {/* <CardFooter className="text-muted-foreground text-sm">
          0% from last period
        </CardFooter> */}
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Expenses</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums text-red-500">
            {isLoading ? (
              <Skeleton className="w-24 h-8" />
            ) : (
              <CurrencyFormatter value={walletSummary?.totalExpense || 0} />
            )}
          </CardTitle>
          <CardAction className="bg-red-100 text-red-500 dark:bg-zinc-950 p-3 rounded-lg">
            <BanknoteArrowDown />
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
