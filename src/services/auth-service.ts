import axios from "axios";

export const authService = {
  login: async ({ email, password }: { email: string; password: string }) => {
    try {
      const res = await axios.post("/api/auth/login", { email, password });
      const { data } = res;
      return data;
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
      const { data } = res;
      return data;
    } catch (error) {
      throw error;
    }
  },
};
