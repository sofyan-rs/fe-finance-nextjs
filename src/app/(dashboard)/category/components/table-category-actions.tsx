import { Button } from "@/components/ui/button";
import { useCategoryActions } from "../hooks/use-category-actions";
import { ICategory } from "@/types/category-types";

export const TableCategoryActions = ({ category }: { category: ICategory }) => {
  const { setCurrentCategoryData, setShowEditCategory, setShowDeleteCategory } =
    useCategoryActions();

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={() => {
          setCurrentCategoryData(category);
          setShowEditCategory(true);
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          setCurrentCategoryData(category);
          setShowDeleteCategory(true);
        }}
      >
        Delete
      </Button>
    </div>
  );
};
