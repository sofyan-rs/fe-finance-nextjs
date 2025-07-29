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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUserData } from "@/hooks/use-user-data";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CURRENCY_LIST } from "@/constants/curency";
import { SettingService } from "@/services/setting-service";
import { useGetSetting } from "@/hooks/fetch/use-get-setting";

const formSchema = z.object({
  currency: z.string().min(1, {
    message: "Currency is required.",
  }),
});

export function FormCurrency() {
  const { token } = useUserData();
  const { data: setting } = useGetSetting({ token });
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currency: setting?.currency || "",
    },
  });

  const mutation = useMutation({
    mutationFn: SettingService.updateSetting,
    onSuccess: () => {
      toast.success("Currency updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["getSetting"],
      });
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
      data: {
        currency: values.currency,
      },
    });
  }

  useEffect(() => {
    if (setting) {
      form.setValue("currency", setting.currency);
    }
  }, [setting, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="currency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Currency</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    {CURRENCY_LIST.map((currency) => (
                      <SelectItem key={currency.name} value={currency.name}>
                        <div className="flex items-center gap-2">
                          {currency.name} ({currency.symbol})
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

        <div className="flex">
          <Button type="submit" isLoading={isLoading}>
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}
