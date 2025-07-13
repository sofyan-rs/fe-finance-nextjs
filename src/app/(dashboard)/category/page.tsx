import { TitleContent } from "@/components/title-content";
import { AppConfig } from "@/config/app-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Category - " + AppConfig.title,
};

export default function Page() {
  return (
    <>
      <TitleContent title="Category" />
    </>
  );
}
