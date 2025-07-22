import { AppConfig } from "@/config/app-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wallet - " + AppConfig.title,
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
