"use client";

import { TitleContent } from "@/components/title-content";
import { useCategoryActions } from "../hooks/use-category-actions";

export const PageHeader = () => {
  const { setShowAddCategory, setCurrentCategoryData } = useCategoryActions();

  return (
    <TitleContent
      title="Category"
      btnText="Add Category"
      btnOnClick={() => {
        setCurrentCategoryData(null);
        setShowAddCategory(true);
      }}
    />
  );
};
