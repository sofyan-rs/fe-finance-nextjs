import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Wallet } from "lucide-react";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <Wallet className="text-red-500" />
                  <span className="font-semibold text-xl">Finance Tracker</span>
                </div>
                <ThemeToggle />
              </div>
              <Separator />
            </CardHeader>
            {children}
            <Separator />
            <CardFooter className="flex justify-center gap-1 text-sm opacity-70">
              © Created by
              <a className="font-medium" href="https://sofyan.id">
                Sofyan R
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
