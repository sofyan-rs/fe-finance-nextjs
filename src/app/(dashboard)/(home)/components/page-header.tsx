"use client";

import { TitleContent } from "@/components/title-content";
import { useTransactionActions } from "../../transaction/hooks/use-transaction-actions";

export const PageHeader = () => {
  const { setShowAddTransaction, setCurrentTransactionData } =
    useTransactionActions();

  return (
    <TitleContent
      title="Dashboard"
      btnText="Add Transaction"
      btnOnClick={() => {
        setCurrentTransactionData(null);
        setShowAddTransaction(true);
      }}
    />
  );
};
