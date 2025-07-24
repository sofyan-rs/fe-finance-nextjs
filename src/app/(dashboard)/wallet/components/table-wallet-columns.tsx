"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import {
  ArrowUpDown,
  Banknote,
  ChartCandlestick,
  Landmark,
  Wallet,
} from "lucide-react";
import { TableWalletActions } from "./table-wallet-actions";
import { IWallet, WalletType } from "@/types/wallet-types";
import { CurrencyFormatter } from "@/components/currency-formatter";

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
      const color = row.original.color;
      return (
        <div className="flex items-center gap-2">
          {type === WalletType.cash ? (
            <Banknote className="size-4" style={{ color: color }} />
          ) : type === WalletType.bank ? (
            <Landmark className="size-4" style={{ color: color }} />
          ) : type === WalletType.investment ? (
            <ChartCandlestick className="size-4" style={{ color: color }} />
          ) : (
            <Wallet className="size-4" style={{ color: color }} />
          )}
          {type === WalletType.ewallet
            ? "E-Wallet"
            : type.charAt(0).toUpperCase() + type.slice(1)}
        </div>
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
      return <CurrencyFormatter value={balance} />;
    },
  },
  {
    accessorKey: "income",
    header: ({ column }) => {
      return (
        <Button
          className="!p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Income
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const income = row.original.income;
      return (
        <span className="text-green-500">
          + <CurrencyFormatter value={income} />
        </span>
      );
    },
  },
  {
    accessorKey: "expense",
    header: ({ column }) => {
      return (
        <Button
          className="!p-0"
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Expense
          <ArrowUpDown className="size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const expense = row.original.expense;
      return (
        <span className="text-red-500">
          - <CurrencyFormatter value={expense} />
        </span>
      );
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
