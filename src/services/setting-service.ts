import ApiClient from "@/config/api-client";
import { ISetting } from "@/types/setting-types";

export const settingService = {
  getSetting: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/setting", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data } = res.data;
      return data as ISetting;
    } catch (error) {
      throw error;
    }
  },
  updateSetting: async ({
    token,
    currency,
  }: {
    token: string;
    currency: string;
  }) => {
    try {
      const res = await ApiClient.put(
        "/setting",
        {
          currency,
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
};
