import { settingService } from "@/services/setting-service";
import { useQuery } from "@tanstack/react-query";

export const useGetSetting = ({ token }: { token?: string }) => {
  return useQuery({
    queryKey: ["getSetting", token],
    queryFn: async () => settingService.getSetting({ token: token! }),
    enabled: !!token,
  });
};
