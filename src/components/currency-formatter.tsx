"use client";

import { useUserData } from "@/hooks/use-user-data";

export const CurrencyFormatter = ({ value }: { value: number }) => {
  const { setting } = useUserData();

  const locale = setting.currency === "IDR" ? "id-ID" : "en-US";

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: setting.currency,
  }).format(value);
};
