import { userService } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = ({ token }: { token?: string }) => {
  return useQuery({
    queryKey: ["getMe", token],
    queryFn: async () => userService.me({ token: token! }),
    enabled: !!token,
  });
};
