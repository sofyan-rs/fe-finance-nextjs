"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { TableCategoryActions } from "./table-category-actions";
import { ICategory } from "@/types/category-types";
import { TransactionType } from "@/types/transaction-types";

export const tableCategoryColumns: ColumnDef<ICategory>[] = [
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
    cell: ({ row }) => {
      const name = row.original.name;
      return (
        <div className="flex items-center gap-2">
          <span>{row.original.icon}</span>
          {name}
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const type = row.original.type;
      return (
        <div className="flex items-center gap-2">
          {type === TransactionType.income ? (
            <BanknoteArrowUp className="size-4 text-green-500" />
          ) : (
            <BanknoteArrowDown className="size-4 text-red-500" />
          )}
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
      );
    },
  },
  {
    accessorKey: "color",
    header: "Color",
    cell: ({ row }) => {
      const color = row.original.color;
      return (
        <div
          className="size-3 rounded-full"
          style={{ backgroundColor: color }}
        />
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
