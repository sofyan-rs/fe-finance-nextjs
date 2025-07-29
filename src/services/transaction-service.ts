import ApiClient from "@/config/api-client";
import { ITransaction, TransactionType } from "@/types/transaction-types";

export const TransactionService = {
  getAll: async ({
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
    try {
      const res = await ApiClient.get("/transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          startDate,
          endDate,
          walletId,
        },
      });
      const { data: resData } = res.data;
      return resData as ITransaction[];
    } catch (error) {
      throw error;
    }
  },
  create: async ({
    token,
    data,
  }: {
    token: string;
    data: {
      title: string;
      amount: number;
      type: TransactionType;
      date: string;
      categoryId: string;
      walletId: string;
    };
  }) => {
    try {
      const res = await ApiClient.post("/transaction", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: resData } = res.data;
      return resData;
    } catch (error) {
      throw error;
    }
  },
  update: async ({
    token,
    id,
    data,
  }: {
    token: string;
    id: string;
    data: {
      title: string;
      amount: number;
      type: TransactionType;
      date: string;
      categoryId: string;
      walletId: string;
    };
  }) => {
    try {
      const res = await ApiClient.put(`/transaction/${id}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: resData } = res.data;
      return resData;
    } catch (error) {
      throw error;
    }
  },
  delete: async ({ token, id }: { token: string; id: string }) => {
    try {
      const res = await ApiClient.delete(`/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: resData } = res.data;
      return resData;
    } catch (error) {
      throw error;
    }
  },
};
