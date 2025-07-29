import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
  CardAction,
} from "@/components/ui/card";
import { useUserData } from "@/hooks/use-user-data";
import { useTransactions } from "../../transaction/hooks/use-transaction-queries";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  TableHeader,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";
import { TransactionType } from "@/types/transaction-types";
import { format } from "date-fns-tz";
import { CurrencyFormatter } from "@/components/currency-formatter";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function RecentTransactions({
  wallet,
  startDate,
  endDate,
}: {
  wallet: string;
  startDate: Date;
  endDate: Date;
}) {
  const { token } = useUserData();

  const { data: transactions, isPending: isLoading } = useTransactions({
    token: token!,
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(),
    walletId: wallet === "all" ? undefined : wallet,
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>List of your recent transactions.</CardDescription>
        <CardAction>
          <Link href="/transaction">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  <Skeleton className="h-10 w-full" />
                </TableCell>
              </TableRow>
            ) : transactions?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-left">
                  No transactions found.
                </TableCell>
              </TableRow>
            ) : (
              transactions?.slice(0, 10).map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {transaction.title}
                  </TableCell>
                  <TableCell>
                    <CurrencyFormatter value={transaction.amount} />
                  </TableCell>
                  <TableCell>
                    {" "}
                    <div className="flex items-center gap-2">
                      {transaction.type === TransactionType.income ? (
                        <BanknoteArrowUp className="size-4 text-green-500" />
                      ) : (
                        <BanknoteArrowDown className="size-4 text-red-500" />
                      )}
                      {transaction.type.charAt(0).toUpperCase() +
                        transaction.type.slice(1)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{transaction.category.icon}</span>
                      {transaction.category.name}
                    </div>
                  </TableCell>
                  <TableCell>
                    {format(new Date(transaction.date), "dd MMMM yyyy")}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
