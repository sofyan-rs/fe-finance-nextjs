import { CurrencyFormatter } from "@/components/currency-formatter";
import {
  Card,
  CardAction,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

export function DashboardCards() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardDescription className="text-center">
            Total Balance
          </CardDescription>
          <CardTitle className="text-center text-3xl font-semibold tabular-nums">
            <CurrencyFormatter value={200000} />
          </CardTitle>
        </CardHeader>
      </Card>
      <Card>
        <CardHeader>
          <CardDescription>Income</CardDescription>
          <CardTitle className="text-3xl font-semibold tabular-nums text-green-500">
            <CurrencyFormatter value={20000} />
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
            <CurrencyFormatter value={50000} />
          </CardTitle>
          <CardAction className="bg-red-100 text-red-500 dark:bg-zinc-950 p-3 rounded-lg">
            <BanknoteArrowDown />
          </CardAction>
        </CardHeader>
      </Card>
    </div>
  );
}
