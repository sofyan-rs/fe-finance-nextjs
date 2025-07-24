import ApiClient from "@/config/api-client";
import { IWallet, WalletType } from "@/types/wallet-types";

export const walletService = {
  getAll: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res.data;
      return data as IWallet[];
    } catch (error) {
      throw error;
    }
  },
  create: async ({
    token,
    name,
    balance,
    type,
    color,
  }: {
    token: string;
    name: string;
    balance: number;
    type: WalletType;
    color: string;
  }) => {
    try {
      const res = await ApiClient.post(
        "/wallet",
        {
          name,
          balance,
          type,
          color,
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
    name,
    balance,
    type,
    color,
  }: {
    token: string;
    id: string;
    name: string;
    balance: number;
    type: WalletType;
    color: string;
  }) => {
    try {
      const res = await ApiClient.put(
        `/wallet/${id}`,
        {
          name,
          balance,
          type,
          color,
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
      const res = await ApiClient.delete(`/wallet/${id}`, {
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
