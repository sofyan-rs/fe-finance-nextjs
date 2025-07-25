"use client";

import { DataTable } from "@/components/data-table";
import { PageHeader } from "./components/page-header";
import { useUserData } from "@/hooks/use-user-data";
import { useTransactions } from "./hooks/use-transaction-queries";
import { tableTransactionColumns } from "./components/table-transaction-columns";
import { SheetTransactionAdd } from "./components/sheet-transaction-add";
import { SheetTransactionEdit } from "./components/sheet-transaction-edit";
import { ModalTransactionRemove } from "./components/modal-transaction-remove";
import { useState } from "react";
import { endOfDay, startOfDay, subDays } from "date-fns";
import { toDate } from "date-fns-tz";

export default function Page() {
  const { token } = useUserData();

  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const initialStartDate = startOfDay(
    toDate(subDays(new Date(), 7), { timeZone })
  );
  const initialEndDate = endOfDay(toDate(new Date(), { timeZone }));

  const [startDate, setStartDate] = useState<Date>(initialStartDate);
  const [endDate, setEndDate] = useState<Date>(initialEndDate);

  const { data: transactions, isLoading } = useTransactions({
    token: token!,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
  });

  return (
    <>
      <PageHeader />
      <div className="flex-1 px-4 min-w-0">
        <DataTable
          columns={tableTransactionColumns}
          data={transactions || []}
          filterKey="title"
          isLoading={isLoading}
          startDate={startDate}
          endDate={endDate}
          setStartDate={setStartDate}
          setEndDate={setEndDate}
        />
        <SheetTransactionAdd />
        <SheetTransactionEdit />
        <ModalTransactionRemove />
      </div>
    </>
  );
}
