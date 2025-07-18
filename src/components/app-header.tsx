"use client";

import { ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton, SidebarTrigger } from "./ui/sidebar";
import Link from "next/link";
import { AppBreadcrumb } from "./app-breadcrumb";
import { Separator } from "./ui/separator";
import { useGetMe } from "@/hooks/fetch/use-get-me";
import { useEffect } from "react";
import { useUserData } from "@/hooks/zustand/use-user-data";

export const AppHeader = ({ token }: { token: string }) => {
  const { setToken, removeToken } = useUserData();

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
    removeToken();
  };

  const { data: user } = useGetMe({ token });

  useEffect(() => {
    setToken(token);
  }, [token, setToken]);

  return (
    <div className="border-b p-2 flex items-center justify-between gap-5">
      <div className="flex items-center">
        <SidebarTrigger />
        <Separator
          orientation="vertical"
          className="ml-2 mr-4 data-[orientation=vertical]:h-4"
        />
        <AppBreadcrumb />
      </div>
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <User /> {user?.name}
              <ChevronDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            side="bottom"
            className="w-[--radix-popper-anchor-width]"
          >
            <DropdownMenuItem asChild>
              <Link href="/account">Account</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={logout} variant="destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
