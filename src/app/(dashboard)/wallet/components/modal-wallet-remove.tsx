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
import { useWalletActions } from "../hooks/use-wallet-actions";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { walletService } from "@/services/wallet-service";
import { toast } from "sonner";
import { useState } from "react";
import { useUserData } from "@/hooks/use-user-data";

export const ModalWalletRemove = () => {
  const { token } = useUserData();

  const { showDeleteWallet, setShowDeleteWallet, currentWalletData } =
    useWalletActions();

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: walletService.delete,
    onSuccess: () => {
      toast.success("Wallet deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getWallets"] });
      setShowDeleteWallet(false);
    },
    onError: (error) => {
      console.error(error.message);
      toast.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const deleteWallet = async () => {
    setIsLoading(true);
    mutation.mutate({
      token: token!,
      id: currentWalletData?.id || "",
    });
  };

  return (
    <Dialog open={showDeleteWallet} onOpenChange={setShowDeleteWallet}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action will delete your wallet. Are you sure you want to
            proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={deleteWallet} isLoading={isLoading}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
