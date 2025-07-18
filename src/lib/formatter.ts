export const Format = {
  currency: (value: number, currency: string) => {
    const locale = currency === "IDR" ? "id-ID" : "en-US";
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(value);
  },
};
