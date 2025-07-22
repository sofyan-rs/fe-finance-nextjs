import ApiClient from "@/config/api-client";
import { IWallet } from "@/types/wallet-types";

export const walletService = {
  getAll: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/wallet", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      return data as IWallet[];
    } catch (error) {
      throw error;
    }
  },
  create: async ({ token, name }: { token: string; name: string }) => {
    try {
      const res = await ApiClient.post(
        "/wallet",
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { data } = res;
      return data;
    } catch (error) {
      throw error;
    }
  },
  update: async ({
    token,
    id,
    name,
  }: {
    token: string;
    id: string;
    name: string;
  }) => {
    try {
      const res = await ApiClient.put(
        `/wallet/${id}`,
        {
          name,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      const { data } = res;
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
      const { data } = res;
      return data;
    } catch (error) {
      throw error;
    }
  },
};
