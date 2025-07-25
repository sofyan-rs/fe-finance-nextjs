"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useTransactionActions } from "../hooks/use-transaction-actions";
import { FormTransaction } from "./form-transaction";

export const SheetTransactionEdit = () => {
  const { showEditTransaction, setShowEditTransaction } =
    useTransactionActions();

  return (
    <Sheet open={showEditTransaction} onOpenChange={setShowEditTransaction}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Transaction</SheetTitle>
          <SheetDescription>Edit your transaction details.</SheetDescription>
        </SheetHeader>
        <FormTransaction type="EDIT" />
      </SheetContent>
    </Sheet>
  );
};
