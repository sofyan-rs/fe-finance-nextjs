"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { TableWalletActions } from "./table-wallet-actions";
import { IWallet } from "@/types/wallet-types";
import { Format } from "@/lib/formatter";

export const tableWalletColumns: ColumnDef<IWallet>[] = [
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
    accessorKey: "balance",
    header: ({ column }) => {
      return (
        <Button
          className="!p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Balance
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const balance = row.original.balance;
      return Format.currency(balance, "IDR");
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const wallet = row.original;
      return <TableWalletActions wallet={wallet} />;
    },
  },
];
