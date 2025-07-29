"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { useUserData } from "@/hooks/use-user-data";
import { useTransactionActions } from "../hooks/use-transaction-actions";
import { TransactionType } from "@/types/transaction-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Banknote,
  BanknoteArrowDown,
  BanknoteArrowUp,
  CalendarIcon,
  ChartCandlestick,
  Landmark,
  Wallet,
} from "lucide-react";
import { TransactionService } from "@/services/transaction-service";
import { useCategories } from "../../category/hooks/use-category-queries";
import { useWallets } from "../../wallet/hooks/use-wallet-queries";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { ICategory } from "@/types/category-types";
import { ComboboxForm } from "@/components/ui/combobox-form";
import { WalletType } from "@/types/wallet-types";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  type: z
    .string()
    .refine(
      (value) =>
        Object.values(TransactionType).includes(value as TransactionType),
      {
        message: "Invalid transaction type",
      }
    ),
  amount: z.number().min(1, {
    message: "Amount must be at least 1.",
  }),
  date: z.date(),
  categoryId: z.string().min(1, {
    message: "Category is required.",
  }),
  walletId: z.string().min(1, {
    message: "Wallet is required.",
  }),
});

export function FormTransaction({ type }: { type: "ADD" | "EDIT" }) {
  const { token } = useUserData();

  const {
    setShowAddTransaction,
    setShowEditTransaction,
    currentTransactionData,
  } = useTransactionActions();

  const [isLoading, setIsLoading] = useState(false);

  const { data: categories } = useCategories({
    token: token!,
  });
  const { data: wallets } = useWallets({
    token: token!,
  });

  const [filteredCategories, setFilteredCategories] = useState<ICategory[]>(
    categories || []
  );

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: currentTransactionData?.title || "",
      type: currentTransactionData?.type || TransactionType.income,
      amount: currentTransactionData?.amount || 0,
      date: new Date(currentTransactionData?.date || new Date()),
      categoryId: currentTransactionData?.categoryId || "",
      walletId: currentTransactionData?.walletId || "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:
      type === "ADD" ? TransactionService.create : TransactionService.update,
    onSuccess: () => {
      toast.success("Transaction saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["getTransactions"] });
      queryClient.invalidateQueries({ queryKey: ["getWallets"] });
      queryClient.invalidateQueries({ queryKey: ["getWalletSummary"] });
      queryClient.invalidateQueries({ queryKey: ["getPieChartData"] });
      queryClient.invalidateQueries({ queryKey: ["getLineChartData"] });
      if (type === "ADD") {
        setShowAddTransaction(false);
      } else {
        setShowEditTransaction(false);
      }
    },
    onError: (error) => {
      console.error(error.message);
      toast.error(error.message);
    },
    onSettled: () => {
      setIsLoading(false);
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    mutation.mutate({
      token: token!,
      id: currentTransactionData?.id || "",
      data: {
        title: values.title,
        type: values.type as TransactionType,
        amount: values.amount,
        date: values.date.toISOString(),
        categoryId: values.categoryId,
        walletId: values.walletId,
      },
    });
  }

  useEffect(() => {
    const type = form.watch("type") as TransactionType;
    const filteredCats =
      categories?.filter((category) => category.type === type) || [];
    setFilteredCategories(filteredCats);

    // Reset categoryId if current selection doesn't match the new type
    const currentCategoryId = form.getValues("categoryId");
    if (
      currentCategoryId &&
      !filteredCats.some((cat) => cat.id === currentCategoryId)
    ) {
      form.setValue("categoryId", "");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.watch("type"), categories, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-1"
      >
        <div className="flex flex-1 flex-col gap-6 px-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Salary for this month" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Type</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.values(TransactionType).map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center gap-2">
                            {type === TransactionType.income ? (
                              <BanknoteArrowUp className="size-4 text-green-500" />
                            ) : (
                              <BanknoteArrowDown className="size-4 text-red-500" />
                            )}
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    isCurrency
                    type="number"
                    placeholder="1000000"
                    {...field}
                    onChange={(e) => {
                      field.onChange(Number(e.target.value));
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd MMMM yyyy")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date: Date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      captionLayout="dropdown"
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <ComboboxForm
                  data={filteredCategories.map((category) => ({
                    value: category.id,
                    label: category.name,
                    icon: <span>{category.icon}</span>,
                  }))}
                  placeholder="Select category"
                  field={field}
                  form={form}
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="walletId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Wallet</FormLabel>
                <ComboboxForm
                  data={
                    wallets?.map((wallet) => ({
                      value: wallet.id,
                      label: wallet.name,
                      icon:
                        wallet.type === WalletType.cash ? (
                          <Banknote
                            className="size-4"
                            style={{ color: wallet.color }}
                          />
                        ) : wallet.type === WalletType.bank ? (
                          <Landmark
                            className="size-4"
                            style={{ color: wallet.color }}
                          />
                        ) : wallet.type === WalletType.investment ? (
                          <ChartCandlestick
                            className="size-4"
                            style={{ color: wallet.color }}
                          />
                        ) : (
                          <Wallet
                            className="size-4"
                            style={{ color: wallet.color }}
                          />
                        ),
                    })) || []
                  }
                  placeholder="Select wallet"
                  field={field}
                  form={form}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <SheetFooter>
          <Button type="submit" isLoading={isLoading}>
            Save
          </Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </form>
    </Form>
  );
}
