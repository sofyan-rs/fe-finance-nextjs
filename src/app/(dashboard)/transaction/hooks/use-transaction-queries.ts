import { transactionService } from "@/services/transaction-service";
import { useQuery } from "@tanstack/react-query";

export const useTransactions = ({
  token,
  startDate,
  endDate,
}: {
  token: string;
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ["getTransactions", startDate, endDate],
    queryFn: () => transactionService.getAll({ token, startDate, endDate }),
    enabled: !!token,
  });
};
