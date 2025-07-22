import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { cookies } from "next/headers";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = (await cookies()).get("token")?.value ?? "";
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-col flex-1 min-w-0">
        <AppHeader token={token} />
        <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
