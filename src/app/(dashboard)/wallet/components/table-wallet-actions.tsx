import { Button } from "@/components/ui/button";
import { useWalletActions } from "@/app/(dashboard)/wallet/hooks/use-wallet-actions";
import { IWallet } from "@/types/wallet-types";

export const TableWalletActions = ({ wallet }: { wallet: IWallet }) => {
  const { setCurrentWalletData, setShowEditWallet, setShowDeleteWallet } =
    useWalletActions();

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={() => {
          setCurrentWalletData(wallet);
          setShowEditWallet(true);
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          setCurrentWalletData(wallet);
          setShowDeleteWallet(true);
        }}
      >
        Delete
      </Button>
    </div>
  );
};
