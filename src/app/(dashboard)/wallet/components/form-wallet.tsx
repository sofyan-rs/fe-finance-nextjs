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

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
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
