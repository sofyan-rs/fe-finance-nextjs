import { TitleContent } from "@/components/title-content";
import { Card, CardContent } from "@/components/ui/card";
import { AppConfig } from "@/config/app-config";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Assistant AI - " + AppConfig.title,
};

export default function Page() {
  return (
    <>
      <TitleContent title="Assistant AI" />
      <Card className="m-5">
        <CardContent>
          <p className="text-center text-2xl font-bold">Coming Soon</p>
        </CardContent>
      </Card>
    </>
  );
}
