import { create } from "zustand";

type UserData = {
  token?: string;
  setToken: (token: string) => void;
  removeToken: () => void;
};

export const useUserData = create<UserData>((set) => ({
  token: undefined,
  setToken: (token: string) => set({ token }),
  removeToken: () => set({ token: undefined }),
}));
