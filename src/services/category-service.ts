import ApiClient from "@/config/api-client";
import { ICategory } from "@/types/category-types";
import { TransactionType } from "@/types/transaction-types";

export const CategoryService = {
  getAll: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: resData } = res.data;
      return resData as ICategory[];
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
      type: TransactionType;
      icon: string;
      color: string;
    };
  }) => {
    try {
      const res = await ApiClient.post("/category", data, {
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
      type: TransactionType;
      icon: string;
      color: string;
    };
  }) => {
    try {
      const res = await ApiClient.put(`/category/${id}`, data, {
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
      const res = await ApiClient.delete(`/category/${id}`, {
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
