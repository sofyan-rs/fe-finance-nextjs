"use client";

import { CalendarDatePicker } from "@/components/calendar-date-picker";
import { useEffect, useState } from "react";
import { useWallets } from "../../wallet/hooks/use-wallet-queries";
import { useUserData } from "@/hooks/use-user-data";
import { Combobox } from "@/components/ui/combobox";
import { WalletType } from "@/types/wallet-types";
import { Banknote, ChartCandlestick, Landmark, Wallet } from "lucide-react";

export default function FilterDashboard({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
  wallet,
  setWallet,
}: {
  startDate: Date;
  endDate: Date;
  setStartDate: (date: Date) => void;
  setEndDate: (date: Date) => void;
  wallet: string;
  setWallet: (wallet: string) => void;
}) {
  const { token } = useUserData();

  const [selectedDateRange, setSelectedDateRange] = useState({
    from: startDate,
    to: endDate,
  });

  const { data: wallets } = useWallets({
    token: token!,
  });

  useEffect(() => {
    if (startDate && endDate) {
      setSelectedDateRange({
        from: startDate,
        to: endDate,
      });
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (selectedDateRange.from && selectedDateRange.to) {
      setStartDate?.(selectedDateRange.from);
      setEndDate?.(selectedDateRange.to);
    }
  }, [selectedDateRange, setStartDate, setEndDate]);

  return (
    <div className="flex flex-col lg:flex-row justify-end mb-4 gap-3">
      <Combobox
        data={
          [
            {
              id: "all",
              name: "All Wallet",
              type: WalletType.cash,
              color: "#EF4444",
            },
            ...(wallets || []),
          ].map((wallet) => ({
            value: wallet.id,
            label: wallet.name,
            icon:
              wallet.type === WalletType.cash ? (
                <Banknote className="size-4" style={{ color: wallet.color }} />
              ) : wallet.type === WalletType.bank ? (
                <Landmark className="size-4" style={{ color: wallet.color }} />
              ) : wallet.type === WalletType.investment ? (
                <ChartCandlestick
                  className="size-4"
                  style={{ color: wallet.color }}
                />
              ) : (
                <Wallet className="size-4" style={{ color: wallet.color }} />
              ),
          })) || []
        }
        placeholder="Select wallet"
        value={wallet}
        setValue={setWallet}
      />
      <CalendarDatePicker
        date={selectedDateRange}
        onDateSelect={setSelectedDateRange}
        variant="outline"
      />
    </div>
  );
}
