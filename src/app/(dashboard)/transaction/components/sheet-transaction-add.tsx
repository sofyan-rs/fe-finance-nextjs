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

export const SheetTransactionAdd = () => {
  const { showAddTransaction, setShowAddTransaction } = useTransactionActions();

  return (
    <Sheet open={showAddTransaction} onOpenChange={setShowAddTransaction}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Transaction</SheetTitle>
          <SheetDescription>
            Create a new transaction for your financial transactions.
          </SheetDescription>
        </SheetHeader>
        <FormTransaction type="ADD" />
      </SheetContent>
    </Sheet>
  );
};
