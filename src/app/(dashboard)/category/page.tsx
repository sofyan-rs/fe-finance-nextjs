"use client";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "./components/page-header";
import { useUserData } from "@/hooks/use-user-data";
import { useCategories } from "./hooks/use-category-queries";
import { tableCategoryColumns } from "./components/table-category-columns";
import { SheetCategoryAdd } from "./components/sheet-category-add";
import { SheetCategoryEdit } from "./components/sheet-category-edit";
import { ModalCategoryRemove } from "./components/modal-category-remove";

export default function Page() {
  const { token } = useUserData();

  const { data: categories, isLoading } = useCategories({ token: token! });

  return (
    <>
      <PageHeader />
      <div className="mx-4">
        <DataTable
          columns={tableCategoryColumns}
          data={categories || []}
          filterKey="name"
          isLoading={isLoading}
        />
        <SheetCategoryAdd />
        <SheetCategoryEdit />
        <ModalCategoryRemove />
      </div>
    </>
  );
}
