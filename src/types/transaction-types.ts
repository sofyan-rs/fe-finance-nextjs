export enum TransactionType {
  income = "income",
  expense = "expense",
}

export interface ITransaction {
  amount: number;
  category: ICategory;
  categoryId: string;
  createdAt: string;
  date: string;
  id: string;
  modifiedAt: string;
  title: string;
  type: string;
  userId: string;
  wallet: IWallet;
  walletId: string;
}

interface ICategory {
  color: string;
  createdAt: string;
  icon: string;
  id: string;
  modifiedAt: string;
  name: string;
  type: string;
  userId: string;
}

interface IWallet {
  balance: number;
  color: string;
  createdAt: string;
  id: string;
  modifiedAt: string;
  name: string;
  type: string;
  userId: string;
}
