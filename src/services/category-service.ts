import ApiClient from "@/config/api-client";
import { ICategory } from "@/types/category-types";

export const categoryService = {
  getAll: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/category", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      return data as ICategory[];
    } catch (error) {
      throw error;
    }
  },
  create: async ({
    token,
    name,
    type,
    icon,
  }: {
    token: string;
    name: string;
    type: string;
    icon: string;
  }) => {
    try {
      const res = await ApiClient.post(
        "/category",
        {
          name,
          type,
          icon,
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
    type,
    icon,
  }: {
    token: string;
    id: string;
    name: string;
    type: string;
    icon: string;
  }) => {
    try {
      const res = await ApiClient.put(
        `/category/${id}`,
        {
          name,
          type,
          icon,
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
      const res = await ApiClient.delete(`/category/${id}`, {
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
