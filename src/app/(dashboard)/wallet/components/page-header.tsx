"use client";

import { TitleContent } from "@/components/title-content";
import { useWalletActions } from "@/app/(dashboard)/wallet/hooks/use-wallet-actions";

export const PageHeader = () => {
  const { setShowAddWallet, setCurrentWalletData } = useWalletActions();

  return (
    <TitleContent
      title="Wallet"
      btnText="Add Wallet"
      btnOnClick={() => {
        setCurrentWalletData(null);
        setShowAddWallet(true);
      }}
    />
  );
};
