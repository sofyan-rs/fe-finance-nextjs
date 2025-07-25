import { Button } from "@/components/ui/button";
import { useTransactionActions } from "../hooks/use-transaction-actions";
import { ITransaction } from "@/types/transaction-types";

export const TableTransactionActions = ({
  transaction,
}: {
  transaction: ITransaction;
}) => {
  const {
    setCurrentTransactionData,
    setShowEditTransaction,
    setShowDeleteTransaction,
  } = useTransactionActions();

  return (
    <div className="flex justify-end gap-2">
      <Button
        variant="outline"
        onClick={() => {
          setCurrentTransactionData(transaction);
          setShowEditTransaction(true);
        }}
      >
        Edit
      </Button>
      <Button
        onClick={() => {
          setCurrentTransactionData(transaction);
          setShowDeleteTransaction(true);
        }}
      >
        Delete
      </Button>
    </div>
  );
};
