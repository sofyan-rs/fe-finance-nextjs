"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useWalletActions } from "../hooks/use-wallet-actions";
import { FormWallet } from "./form-wallet";

export const SheetWalletAdd = () => {
  const { showAddWallet, setShowAddWallet } = useWalletActions();

  return (
    <Sheet open={showAddWallet} onOpenChange={setShowAddWallet}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Wallet</SheetTitle>
          <SheetDescription>
            Create a new wallet for your financial transactions.
          </SheetDescription>
        </SheetHeader>
        <FormWallet type="ADD" />
      </SheetContent>
    </Sheet>
  );
};
