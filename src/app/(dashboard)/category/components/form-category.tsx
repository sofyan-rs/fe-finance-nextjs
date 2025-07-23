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
import { categoryService } from "@/services/category-service";
import { useUserData } from "@/hooks/use-user-data";
import { useCategoryActions } from "../hooks/use-category-actions";
import { TransactionType } from "@/types/transaction-types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EmojiPicker,
  EmojiPickerContent,
  EmojiPickerFooter,
  EmojiPickerSearch,
} from "@/components/ui/emoji-picker";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { COLORS } from "@/constants/colors";
import { BanknoteArrowDown, BanknoteArrowUp } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  icon: z.string(),
  color: z.string().min(1, {
    message: "Color is required.",
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
});

export function FormCategory({ type }: { type: "ADD" | "EDIT" }) {
  const { token } = useUserData();

  const { setShowAddCategory, setShowEditCategory, currentCategoryData } =
    useCategoryActions();

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: currentCategoryData?.name || "",
      type: currentCategoryData?.type || TransactionType.income,
      icon: currentCategoryData?.icon || "😊",
      color: currentCategoryData?.color || COLORS[0],
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn:
      type === "ADD" ? categoryService.create : categoryService.update,
    onSuccess: () => {
      toast.success("Category saved successfully!");
      queryClient.invalidateQueries({ queryKey: ["getCategories"] });
      if (type === "ADD") {
        setShowAddCategory(false);
      } else {
        setShowEditCategory(false);
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
      type: values.type,
      icon: values.icon,
      id: currentCategoryData?.id || "",
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
            name="icon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Icon</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        aria-label="Pick icon"
                      >
                        {field.value || "😊"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <EmojiPicker
                        className="h-[342px]"
                        onEmojiSelect={({ emoji }) => {
                          field.onChange(emoji);
                        }}
                      >
                        <EmojiPickerSearch />
                        <EmojiPickerContent />
                        <EmojiPickerFooter />
                      </EmojiPicker>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Salary" {...field} />
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
                    defaultValue={field.value.toString()}
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
            name="color"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Color</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
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
