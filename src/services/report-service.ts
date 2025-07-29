import ApiClient from "@/config/api-client";
import {
  ILineChartData,
  IPieChartData,
  IWalletSummary,
} from "@/types/report-types";

export const ReportService = {
  getSummary: async ({
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
    try {
      const res = await ApiClient.get("/report/wallet-summary", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          walletId,
          startDate,
          endDate,
        },
      });
      const { data: resData } = res.data;
      return resData as IWalletSummary;
    } catch (error) {
      throw error;
    }
  },
  getLineChartData: async ({
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
    try {
      const res = await ApiClient.get("/report/chart/line", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          walletId,
          startDate,
          endDate,
        },
      });
      const { data: resData } = res.data;
      return resData as ILineChartData[];
    } catch (error) {
      throw error;
    }
  },
  getPieChartData: async ({
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
    try {
      const res = await ApiClient.get("/report/chart/pie", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          walletId,
          startDate,
          endDate,
        },
      });
      const { data: resData } = res.data;
      return resData as IPieChartData[];
    } catch (error) {
      throw error;
    }
  },
};
