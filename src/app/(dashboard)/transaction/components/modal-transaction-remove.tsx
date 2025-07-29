"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useState } from "react";
import { useUserData } from "@/hooks/use-user-data";
import { useTransactionActions } from "../hooks/use-transaction-actions";
import { TransactionService } from "@/services/transaction-service";

export const ModalTransactionRemove = () => {
  const { token } = useUserData();

  const {
    showDeleteTransaction,
    setShowDeleteTransaction,
    currentTransactionData,
  } = useTransactionActions();

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: TransactionService.delete,
    onSuccess: () => {
      toast.success("Transaction deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["getWallets"] });
      queryClient.invalidateQueries({ queryKey: ["getWalletSummary"] });
      queryClient.invalidateQueries({ queryKey: ["getPieChartData"] });
      queryClient.invalidateQueries({ queryKey: ["getLineChartData"] });
      setShowDeleteTransaction(false);
    },
    onError: (error) => {
      console.error(error.message);
      toast.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const deleteTransaction = async () => {
    setIsLoading(true);
    mutation.mutate({
      token: token!,
      id: currentTransactionData?.id || "",
    });
  };

  return (
    <Dialog
      open={showDeleteTransaction}
      onOpenChange={setShowDeleteTransaction}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action will delete your transaction. Are you sure you want to
            proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            onClick={deleteTransaction}
            isLoading={isLoading}
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
