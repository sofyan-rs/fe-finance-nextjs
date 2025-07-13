import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1">
        <AppHeader />
        <div className="flex flex-col flex-1">{children}</div>
      </main>
    </SidebarProvider>
  );
}
