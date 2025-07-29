import ApiClient from "@/config/api-client";
import { IUser } from "@/types/user-types";

export const UserService = {
  me: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: resData } = res.data;
      return resData as IUser;
    } catch (error) {
      throw error;
    }
  },
  updateProfile: async ({
    token,
    data,
  }: {
    token: string;
    data: {
      name: string;
      email: string;
    };
  }) => {
    try {
      const res = await ApiClient.put("/user/profile", data, {
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
  updatePassword: async ({
    token,
    data,
  }: {
    token: string;
    data: {
      currentPassword: string;
      newPassword: string;
    };
  }) => {
    try {
      const res = await ApiClient.put("/user/change-password", data, {
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
  setPassword: async ({
    token,
    data,
  }: {
    token: string;
    data: { newPassword: string };
  }) => {
    try {
      const res = await ApiClient.put("/user/set-password", data, {
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
  getStatusPassword: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/user/password-status", {
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
