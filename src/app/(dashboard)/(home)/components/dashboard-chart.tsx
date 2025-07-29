import { ChartIncomeExpense } from "./chart-income-expense";
import { ChartTransactionCategory } from "./chart-transaction-category";

export function DashboardChart({
  startDate,
  endDate,
}: {
  startDate: Date;
  endDate: Date;
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <ChartIncomeExpense startDate={startDate} endDate={endDate} />
      <ChartTransactionCategory startDate={startDate} endDate={endDate} />
    </div>
  );
}
