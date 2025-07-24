"use client";

import { ChevronDown, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { SidebarMenuButton, SidebarTrigger } from "./ui/sidebar";
import { AppBreadcrumb } from "./app-breadcrumb";
import { Separator } from "./ui/separator";
import { useGetMe } from "@/hooks/fetch/use-get-me";
import { useEffect, useState } from "react";
import { useUserData } from "@/hooks/use-user-data";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { useGetSetting } from "@/hooks/fetch/use-get-setting";

export const AppHeader = ({ token }: { token: string }) => {
  const { setToken, removeToken, setSetting } = useUserData();

  const [showModalLogout, setShowModalLogout] = useState(false);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
    removeToken();
  };

  const { data: user } = useGetMe({ token });
  const { data: setting } = useGetSetting({ token });

  useEffect(() => {
    setToken(token);
  }, [token, setToken]);

  useEffect(() => {
    if (setting) {
      setSetting({ currency: setting.currency });
    }
  }, [setting, setSetting]);

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
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                setShowModalLogout(true);
              }}
            >
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <Dialog open={showModalLogout} onOpenChange={setShowModalLogout}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action will log you out of your account. Are you sure you
              want to proceed?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" onClick={logout}>
              Yes, Logout
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
