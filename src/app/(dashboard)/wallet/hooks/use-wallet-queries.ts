import { walletService } from "@/services/wallet-service";
import { useQuery } from "@tanstack/react-query";

export const useWallets = ({ token }: { token: string }) => {
  return useQuery({
    queryKey: ["getWallets"],
    queryFn: () => walletService.getAll({ token }),
    enabled: !!token,
  });
};
