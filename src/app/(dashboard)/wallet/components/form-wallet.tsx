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
import { useState } from "react";
import { toast } from "sonner";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { walletService } from "@/services/wallet-service";
import { useWalletActions } from "../hooks/use-wallet-actions";
import { useUserData } from "@/hooks/use-user-data";
import { WalletType } from "@/types/wallet-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COLORS } from "@/constants/colors";
import { Banknote, ChartCandlestick, Landmark, Wallet } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  balance: z.number().min(0, {
    message: "Balance must be greater than 0.",
  }),
  type: z.enum(WalletType),
  color: z.string().min(1, {
    message: "Color is required.",
  }),
});

export function FormWallet({ type }: { type: "ADD" | "EDIT" }) {
  const { token } = useUserData();

  const { setShowAddWallet, setShowEditWallet, currentWalletData } =
    useWalletActions();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentWalletData?.name || "",
      balance: currentWalletData?.balance || 0,
      type: currentWalletData?.type || WalletType.cash,
      color: currentWalletData?.color || COLORS[0],
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: type === "ADD" ? walletService.create : walletService.update,
    onSuccess: () => {
      toast.success("Wallet saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["getWallets"] });
      if (type === "ADD") {
        setShowAddWallet(false);
      } else {
        setShowEditWallet(false);
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
      name: values.name,
      id: currentWalletData?.id || "",
      balance: values.balance,
      type: values.type,
      color: values.color,
    });
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col flex-1"
      >
        <div className="flex flex-1 flex-col gap-6 px-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Bank BCA" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="balance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  {type === "ADD" ? "Initial Balance" : "Balance"}
                </FormLabel>
                <FormControl>
                  <Input
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
                      {Object.values(WalletType).map((type) => (
                        <SelectItem key={type} value={type}>
                          <div className="flex items-center gap-2">
                            {type === WalletType.cash ? (
                              <Banknote className="size-4" />
                            ) : type === WalletType.bank ? (
                              <Landmark className="size-4" />
                            ) : type === WalletType.investment ? (
                              <ChartCandlestick className="size-4" />
                            ) : (
                              <Wallet className="size-4" />
                            )}
                            {type === WalletType.ewallet
                              ? "E-Wallet"
                              : type.charAt(0).toUpperCase() + type.slice(1)}
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
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select color" />
                    </SelectTrigger>
                    <SelectContent>
                      {COLORS.map((color) => (
                        <SelectItem key={color} value={color}>
                          <div
                            className="size-3 rounded-full"
                            style={{ backgroundColor: color }}
                          />
                          {color}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
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
