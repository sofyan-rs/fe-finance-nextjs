import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import ReactQueryProvider from "@/providers/react-query-provider";
import { Toaster } from "@/components/ui/sonner";
import { AppConfig } from "@/config/app-config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: AppConfig.title,
  description: AppConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${inter.variable} ${inter.variable} antialiased font-[family-name:var(--font-inter)]`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <ReactQueryProvider>
              {children}
              <Toaster />
            </ReactQueryProvider>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
