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

export const SheetWalletEdit = () => {
  const { showEditWallet, setShowEditWallet } = useWalletActions();

  return (
    <Sheet open={showEditWallet} onOpenChange={setShowEditWallet}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Wallet</SheetTitle>
          <SheetDescription>Edit your wallet details.</SheetDescription>
        </SheetHeader>
        <FormWallet type="EDIT" />
      </SheetContent>
    </Sheet>
  );
};
