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
import { CategoryService } from "@/services/category-service";
import { toast } from "sonner";
import { useState } from "react";
import { useUserData } from "@/hooks/use-user-data";
import { useCategoryActions } from "../hooks/use-category-actions";

export const ModalCategoryRemove = () => {
  const { token } = useUserData();

  const { showDeleteCategory, setShowDeleteCategory, currentCategoryData } =
    useCategoryActions();

  const [isLoading, setIsLoading] = useState(false);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: CategoryService.delete,
    onSuccess: () => {
      toast.success("Category deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["getCategories"] });
      setShowDeleteCategory(false);
    },
    onError: (error) => {
      console.error(error.message);
      toast.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  const deleteCategory = async () => {
    setIsLoading(true);
    mutation.mutate({
      token: token!,
      id: currentCategoryData?.id || "",
    });
  };

  return (
    <Dialog open={showDeleteCategory} onOpenChange={setShowDeleteCategory}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure?</DialogTitle>
          <DialogDescription>
            This action will delete your category. Are you sure you want to
            proceed?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" onClick={deleteCategory} isLoading={isLoading}>
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
