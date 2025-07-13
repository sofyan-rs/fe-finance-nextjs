"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Bookmark,
  Home,
  ReceiptText,
  Settings,
  Wallet,
  WalletMinimal,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function AppSidebar() {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const { setOpenMobile } = useSidebar();

  const isActive = (url: string) => url === pathname;

  const items = [
    {
      title: "Dashboard",
      url: "/",
      icon: Home,
    },
    {
      title: "Transaction",
      url: "/transaction",
      icon: ReceiptText,
    },
    {
      title: "Wallet",
      url: "/wallet",
      icon: WalletMinimal,
    },
    {
      title: "Category",
      url: "/category",
      icon: Bookmark,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ];

  useEffect(() => {
    if (isMobile) {
      setOpenMobile(false);
    }
  }, [pathname, isMobile]);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center justify-between gap-2 px-2 pt-2">
          <div className="flex items-center gap-2">
            <Wallet className="text-red-500 size-5" />
            <span className="font-semibold text-lg">Finance Tracker</span>
          </div>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={isActive(item.url)}>
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
