import ApiClient from "@/config/api-client";
import axios from "axios";

export const AuthService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { data: resData } = res.data;
      return resData;
    } catch (error) {
      throw error;
    }
  },
  register: async ({
    name,
    email,
    password,
  }: {
    name: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await axios.post("/api/auth/register", {
        name,
        email,
        password,
      });
      const { data: resData } = res.data;
      return resData;
    } catch (error) {
      throw error;
    }
  },
  loginWithGoogle: async () => {
    try {
      const res = await ApiClient.get("/auth/google");
      const { data: resData } = res.data;
      return resData;
    } catch (error) {
      throw error;
    }
  },
};
