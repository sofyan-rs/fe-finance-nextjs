import { ITransaction } from "@/types/transaction-types";
import { create } from "zustand";

type TransactionActions = {
  showAddTransaction: boolean;
  setShowAddTransaction: (value: boolean) => void;
  showEditTransaction: boolean;
  setShowEditTransaction: (value: boolean) => void;
  showDeleteTransaction: boolean;
  setShowDeleteTransaction: (value: boolean) => void;
  currentTransactionData: ITransaction | null;
  setCurrentTransactionData: (data: ITransaction | null) => void;
};

export const useTransactionActions = create<TransactionActions>((set) => ({
  showAddTransaction: false,
  setShowAddTransaction: (value: boolean) => set({ showAddTransaction: value }),
  showEditTransaction: false,
  setShowEditTransaction: (value: boolean) =>
    set({ showEditTransaction: value }),
  showDeleteTransaction: false,
  setShowDeleteTransaction: (value: boolean) =>
    set({ showDeleteTransaction: value }),
  currentTransactionData: null,
  setCurrentTransactionData: (data: ITransaction | null) =>
    set({ currentTransactionData: data }),
}));
