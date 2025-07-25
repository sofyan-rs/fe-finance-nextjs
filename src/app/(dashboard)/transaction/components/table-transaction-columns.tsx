"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
  ChartCandlestick,
  Landmark,
  Wallet,
} from "lucide-react";
import { TableTransactionActions } from "./table-transaction-actions";
import { ITransaction, TransactionType } from "@/types/transaction-types";
import { format } from "date-fns";
import { WalletType } from "@/types/wallet-types";
import { CurrencyFormatter } from "@/components/currency-formatter";

export const tableTransactionColumns: ColumnDef<ITransaction>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          className="!p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Title
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const title = row.original.title;
      return <div className="flex items-center gap-2">{title}</div>;
    },
  },

  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          className="!p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Amount
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = row.original.amount;
      return (
        <div className="flex items-center gap-2">
          <CurrencyFormatter value={amount} />
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          className="!p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const date = row.original.date;
      return (
        <div className="flex items-center gap-2">
          {format(new Date(date), "dd MMMM yyyy")}
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
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => {
      const category = row.original.category;
      return (
        <div className="flex items-center gap-2">
          <span>{category.icon}</span>
          {category.name}
        </div>
      );
    },
  },
  {
    accessorKey: "wallet",
    header: "Wallet",
    cell: ({ row }) => {
      const wallet = row.original.wallet;
      return (
        <div className="flex items-center gap-2">
          {wallet.type === WalletType.cash ? (
            <Banknote className="size-4" style={{ color: wallet.color }} />
          ) : wallet.type === WalletType.bank ? (
            <Landmark className="size-4" style={{ color: wallet.color }} />
          ) : wallet.type === WalletType.investment ? (
            <ChartCandlestick
              className="size-4"
              style={{ color: wallet.color }}
            />
          ) : (
            <Wallet className="size-4" style={{ color: wallet.color }} />
          )}
          {wallet.name}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      return <TableTransactionActions transaction={transaction} />;
    },
  },
];
