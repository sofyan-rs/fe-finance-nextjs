import { create } from "zustand";

type Setting = {
  currency: string;
};

type UserData = {
  token?: string;
  setToken: (token: string) => void;
  removeToken: () => void;
  setting: Setting;
  setSetting: (setting: Setting) => void;
};

export const useUserData = create<UserData>((set) => ({
  token: undefined,
  setToken: (token: string) => set({ token }),
  removeToken: () => set({ token: undefined }),
  setting: {
    currency: "IDR",
  },
  setSetting: (setting: Setting) => set({ setting }),
}));
