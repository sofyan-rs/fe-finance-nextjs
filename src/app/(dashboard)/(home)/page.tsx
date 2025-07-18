import { TitleContent } from "@/components/title-content";
import { AppConfig } from "@/config/app-config";
import { Metadata } from "next";
import { DashboardCards } from "./components/dashboard-cards";
import FilterDashboard from "./components/filter-dashboard";

export const metadata: Metadata = {
  title: "Dashboard - " + AppConfig.title,
};

export default function Page() {
  return (
    <>
      <TitleContent title="Dashboard" />
      <div className="m-5">
        <FilterDashboard />
        <DashboardCards />
      </div>
    </>
  );
}
