import { SettingService } from "@/services/setting-service";
import { useQuery } from "@tanstack/react-query";

export const useGetSetting = ({ token }: { token?: string }) => {
  return useQuery({
    queryKey: ["getSetting", token],
    queryFn: async () => SettingService.getSetting({ token: token! }),
    enabled: !!token,
  });
};
