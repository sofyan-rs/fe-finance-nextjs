import { TransactionType } from "./transaction-types";

export interface ICategory {
  id: string;
  name: string;
  type: TransactionType;
  icon: string;
  userId: string;
  createdAt: string;
  modifiedAt: string;
}
