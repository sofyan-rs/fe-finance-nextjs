import { IWallet } from "@/types/wallet-types";
import { create } from "zustand";

type WalletActions = {
  showAddWallet: boolean;
  setShowAddWallet: (value: boolean) => void;
  showEditWallet: boolean;
  setShowEditWallet: (value: boolean) => void;
  showDeleteWallet: boolean;
  setShowDeleteWallet: (value: boolean) => void;
  currentWalletData: IWallet | null;
  setCurrentWalletData: (data: IWallet | null) => void;
};

export const useWalletActions = create<WalletActions>((set) => ({
  showAddWallet: false,
  setShowAddWallet: (value: boolean) => set({ showAddWallet: value }),
  showEditWallet: false,
  setShowEditWallet: (value: boolean) => set({ showEditWallet: value }),
  showDeleteWallet: false,
  setShowDeleteWallet: (value: boolean) => set({ showDeleteWallet: value }),
  currentWalletData: null,
  setCurrentWalletData: (data: IWallet | null) =>
    set({ currentWalletData: data }),
}));
