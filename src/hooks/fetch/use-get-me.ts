import { UserService } from "@/services/user-service";
import { useQuery } from "@tanstack/react-query";

export const useGetMe = ({ token }: { token?: string }) => {
  return useQuery({
    queryKey: ["getMe"],
    queryFn: async () => UserService.me({ token: token! }),
    enabled: !!token,
  });
};
