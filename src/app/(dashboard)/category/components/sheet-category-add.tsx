"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { FormCategory } from "./form-category";
import { useCategoryActions } from "../hooks/use-category-actions";

export const SheetCategoryAdd = () => {
  const { showAddCategory, setShowAddCategory } = useCategoryActions();

  return (
    <Sheet open={showAddCategory} onOpenChange={setShowAddCategory}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Add Category</SheetTitle>
          <SheetDescription>
            Create a new wallet for your financial transactions.
          </SheetDescription>
        </SheetHeader>
        <FormCategory type="ADD" />
      </SheetContent>
    </Sheet>
  );
};
