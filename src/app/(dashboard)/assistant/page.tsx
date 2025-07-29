import { TitleContent } from "@/components/title-content";
import { AppConfig } from "@/config/app-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assistant AI - " + AppConfig.title,
};

export default function Page() {
  return (
    <>
      <TitleContent title="Assistant AI" />
    </>
  );
}
