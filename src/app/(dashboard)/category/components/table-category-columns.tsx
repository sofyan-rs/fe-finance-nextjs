"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { TableCategoryActions } from "./table-category-actions";
import { ICategory } from "@/types/category-types";
import { TransactionType } from "@/types/transaction-types";
import { Badge } from "@/components/ui/badge";

export const tableCategoryColumns: ColumnDef<ICategory>[] = [
  {
    accessorKey: "icon",
    header: "Icon",
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          className="!p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          className="!p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="flex items-center">
          {type === TransactionType.expense ? (
            <Badge variant="secondary" className="text-red-500">
              Expense
            </Badge>
          ) : (
            <Badge variant="secondary" className="text-green-500">
              Income
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;
      return <TableCategoryActions category={category} />;
    },
  },
];
