"use client";

import { Button } from "@/components/ui/button";
import { MonthRangePicker } from "@/components/ui/monthrangepicker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { format, isSameMonth } from "date-fns";

export default function FilterDashboard() {
  const initialDates = { start: new Date(), end: new Date() };
  const [dates, setDates] = useState<{ start: Date; end: Date }>(initialDates);
  const [wallet, setWallet] = useState<string>("all");

  useEffect(() => {
    console.log(dates);
  }, [dates]);

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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[190px] justify-start text-left font-normal",
              !dates && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="h-4 w-4" />
            {dates && isSameMonth(dates.start, dates.end) ? (
              `${format(dates.start, "MMM yyyy")}`
            ) : dates ? (
              `${format(dates.start, "MMM yyyy")} - ${format(dates.end, "MMM yyyy")}`
            ) : (
              <span>Pick a month range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <MonthRangePicker
            onMonthRangeSelect={setDates}
            selectedMonthRange={dates}
            maxDate={new Date()}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
