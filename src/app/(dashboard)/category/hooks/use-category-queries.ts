import { categoryService } from "@/services/category-service";
import { useQuery } from "@tanstack/react-query";

export const useCategories = ({ token }: { token: string }) => {
  return useQuery({
    queryKey: ["getCategories"],
    queryFn: () => categoryService.getAll({ token }),
    enabled: !!token,
  });
};
