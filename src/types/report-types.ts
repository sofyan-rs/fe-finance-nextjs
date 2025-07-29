export interface IWalletSummary {
  totalBalance: number;
  totalIncome: number;
  totalExpense: number;
}

export interface ILineChartData {
  date: string;
  income: number;
  expense: number;
}

export interface IPieChartData {
  category: string;
  total: number;
  fill: string;
  icon: string;
}
