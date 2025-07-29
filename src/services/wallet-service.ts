import ApiClient from "@/config/api-client";
import { IWallet, WalletType } from "@/types/wallet-types";

export const WalletService = {
  getAll: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: resData } = res.data;
      return resData as IWallet[];
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
      name: string;
      balance: number;
      type: WalletType;
      color: string;
    };
  }) => {
    try {
      const res = await ApiClient.post("/wallet", data, {
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
      name: string;
      balance: number;
      type: WalletType;
      color: string;
    };
  }) => {
    try {
      const res = await ApiClient.put(`/wallet/${id}`, data, {
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
      const res = await ApiClient.delete(`/wallet/${id}`, {
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
