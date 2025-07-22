"use client";
import { DataTable } from "@/components/data-table";
import { tableWalletColumns } from "./components/table-wallet-columns";
import { PageHeader } from "./components/page-header";
import { ModalWalletRemove } from "./components/modal-wallet-remove";
import { SheetWalletAdd } from "./components/sheet-wallet-add";
import { useWallets } from "./hooks/use-wallet-queries";
import { useUserData } from "@/hooks/use-user-data";
import { SheetWalletEdit } from "./components/sheet-wallet-edit";

export default function Page() {
  const { token } = useUserData();
  const { data: wallets, isLoading } = useWallets({ token: token! });
  return (
    <>
      <PageHeader />
      <div className="flex-1 px-4 min-w-0">
        <DataTable
          columns={tableWalletColumns}
          data={wallets || []}
          filterKey="name"
          isLoading={isLoading}
        />
        <SheetWalletAdd />
        <SheetWalletEdit />
        <ModalWalletRemove />
      </div>
    </>
  );
}
