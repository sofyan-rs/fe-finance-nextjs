import { WalletService } from "@/services/wallet-service";
import { useQuery } from "@tanstack/react-query";

export const useWallets = ({ token }: { token: string }) => {
  return useQuery({
    queryKey: ["getWallets"],
    queryFn: () => WalletService.getAll({ token }),
    enabled: !!token,
  });
};
