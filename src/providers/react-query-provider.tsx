"use client";

import { getQueryClient } from "@/lib/get-query-client";
import { QueryClientProvider } from "@tanstack/react-query";
import type * as React from "react";

export default function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
