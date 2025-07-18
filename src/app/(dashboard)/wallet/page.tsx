import { DataTable } from "@/components/data-table";
import { TitleContent } from "@/components/title-content";
import { AppConfig } from "@/config/app-config";
import { Metadata } from "next";
import { IWallet, tableWalletColumns } from "./components/table-wallet-columns";

export const metadata: Metadata = {
  title: "Wallet - " + AppConfig.title,
};

async function getData(): Promise<IWallet[]> {
  return [
    {
      id: "728ed52f",
      name: "Bank BCA",
    },
    {
      id: "728essaf",
      name: "Bank JAGO",
    },
  ];
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <TitleContent title="Wallet" />
      <div className="m-4">
        <DataTable columns={tableWalletColumns} data={data} />
      </div>
    </>
  );
}
