import { AppConfig } from "@/config/app-config";
import { Wallet } from "lucide-react";

export const Logo = () => (
  <div className="flex items-center gap-2">
    <Wallet className="text-red-500" />
    <span className="font-semibold text-xl">{AppConfig.title}</span>
  </div>
);
