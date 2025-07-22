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

export const SheetCategoryEdit = () => {
  const { showEditCategory, setShowEditCategory } = useCategoryActions();

  return (
    <Sheet open={showEditCategory} onOpenChange={setShowEditCategory}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Category</SheetTitle>
          <SheetDescription>Edit your category details.</SheetDescription>
        </SheetHeader>
        <FormCategory type="EDIT" />
      </SheetContent>
    </Sheet>
  );
};
