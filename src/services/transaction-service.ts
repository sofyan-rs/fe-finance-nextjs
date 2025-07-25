import ApiClient from "@/config/api-client";
import { ITransaction, TransactionType } from "@/types/transaction-types";

export const transactionService = {
  getAll: async ({
    token,
    startDate,
    endDate,
  }: {
    token: string;
    startDate: string;
    endDate: string;
  }) => {
    try {
      const res = await ApiClient.get("/transaction", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          startDate,
          endDate,
        },
      });
      const { data } = res.data;
      return data as ITransaction[];
    } catch (error) {
      throw error;
    }
  },
  create: async ({
    token,
    title,
    amount,
    type,
    date,
    categoryId,
    walletId,
  }: {
    token: string;
    title: string;
    amount: number;
    type: TransactionType;
    date: string;
    categoryId: string;
    walletId: string;
  }) => {
    try {
      const res = await ApiClient.post(
        "/transaction",
        {
          title,
          amount,
          type,
          date,
          categoryId,
          walletId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  },
  update: async ({
    token,
    id,
    title,
    amount,
    type,
    date,
    categoryId,
    walletId,
  }: {
    token: string;
    id: string;
    title: string;
    amount: number;
    type: TransactionType;
    date: string;
    categoryId: string;
    walletId: string;
  }) => {
    try {
      const res = await ApiClient.put(
        `/transaction/${id}`,
        {
          title,
          amount,
          type,
          date,
          categoryId,
          walletId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const { data } = res.data;
      return data;
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
      const { data } = res.data;
      return data;
    } catch (error) {
      throw error;
    }
  },
};
