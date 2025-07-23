export interface IWallet {
  id: string;
  name: string;
  balance: number;
  type: WalletType;
  color: string;
  income: number;
  expense: number;
  userId: string;
  createdAt: string;
  modifiedAt: string;
}

export enum WalletType {
  cash = "cash",
  bank = "bank",
  ewallet = "ewallet",
  investment = "investment",
}
