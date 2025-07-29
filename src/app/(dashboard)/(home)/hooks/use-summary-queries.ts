import { ReportService } from "@/services/report-service";
import { useQuery } from "@tanstack/react-query";

export const useWalletSummary = ({
  token,
  walletId,
  startDate,
  endDate,
}: {
  token: string;
  walletId?: string;
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ["getWalletSummary", walletId, startDate, endDate],
    queryFn: () =>
      ReportService.getSummary({ token, walletId, startDate, endDate }),
    enabled: !!token,
  });
};

export const useLineChartData = ({
  token,
  walletId,
  startDate,
  endDate,
}: {
  token: string;
  walletId?: string;
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ["getLineChartData", walletId, startDate, endDate],
    queryFn: () =>
      ReportService.getLineChartData({ token, walletId, startDate, endDate }),
    enabled: !!token,
  });
};

export const usePieChartData = ({
  token,
  walletId,
  startDate,
  endDate,
}: {
  token: string;
  walletId?: string;
  startDate: string;
  endDate: string;
}) => {
  return useQuery({
    queryKey: ["getPieChartData", walletId, startDate, endDate],
    queryFn: () =>
      ReportService.getPieChartData({ token, walletId, startDate, endDate }),
    enabled: !!token,
    // initialData: [],
  });
};
