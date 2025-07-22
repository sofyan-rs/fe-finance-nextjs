import { ICategory } from "@/types/category-types";
import { create } from "zustand";

type CategoryActions = {
  showAddCategory: boolean;
  setShowAddCategory: (value: boolean) => void;
  showEditCategory: boolean;
  setShowEditCategory: (value: boolean) => void;
  showDeleteCategory: boolean;
  setShowDeleteCategory: (value: boolean) => void;
  currentCategoryData: ICategory | null;
  setCurrentCategoryData: (data: ICategory | null) => void;
};

export const useCategoryActions = create<CategoryActions>((set) => ({
  showAddCategory: false,
  setShowAddCategory: (value: boolean) => set({ showAddCategory: value }),
  showEditCategory: false,
  setShowEditCategory: (value: boolean) => set({ showEditCategory: value }),
  showDeleteCategory: false,
  setShowDeleteCategory: (value: boolean) => set({ showDeleteCategory: value }),
  currentCategoryData: null,
  setCurrentCategoryData: (data: ICategory | null) =>
    set({ currentCategoryData: data }),
}));
