import { TransactionService } from "@/services/transaction-service";
import { useQuery } from "@tanstack/react-query";

export const useTransactions = ({
  token,
  startDate,
  endDate,
  walletId,
}: {
  token: string;
  startDate: string;
  endDate: string;
  walletId?: string;
}) => {
  return useQuery({
    queryKey: ["getTransactions", startDate, endDate, walletId],
    queryFn: () =>
      TransactionService.getAll({ token, startDate, endDate, walletId }),
    enabled: !!token,
  });
};
