import ApiClient from "@/config/api-client";
import { ISetting } from "@/types/setting-types";

export const SettingService = {
  getSetting: async ({ token }: { token: string }) => {
    try {
      const res = await ApiClient.get("/setting", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: resData } = res.data;
      return resData as ISetting;
    } catch (error) {
      throw error;
    }
  },
  updateSetting: async ({
    token,
    data,
  }: {
    token: string;
    data: {
      currency: string;
    };
  }) => {
    try {
      const res = await ApiClient.put("/setting", data, {
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
