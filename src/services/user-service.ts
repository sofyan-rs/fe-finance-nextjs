import ApiClient from "@/config/api-client";
import { IUser } from "@/types/user-types";

export const userService = {
  me: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res;
      return data as IUser;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async ({
    token,
    name,
    email,
  }: {
    token: string;
    name: string;
    email: string;
  }) => {
    try {
      const res = await ApiClient.put(
        "/user/profile",
        {
          name,
          email,
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
  updatePassword: async ({
    token,
    currentPassword,
    newPassword,
  }: {
    token: string;
    currentPassword: string;
    newPassword: string;
  }) => {
    try {
      const res = await ApiClient.put(
        "/user/profile",
        {
          currentPassword,
          newPassword,
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
};
