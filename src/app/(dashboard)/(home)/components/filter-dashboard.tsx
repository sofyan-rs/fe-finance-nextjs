"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export default function FilterDashboard() {
  const [wallet, setWallet] = useState<string>("all");

  return (
    <div className="flex justify-end mb-4 gap-3">
      <Select value={wallet} onValueChange={setWallet}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Wallet" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Wallet</SelectItem>
          <SelectItem value="bank-bca">Bank BCA</SelectItem>
          <SelectItem value="bank-jago">Bank Jago</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
