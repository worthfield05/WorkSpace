import { loginAPI } from "@/apis/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const useLogin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: loginAPI,
    onSuccess: () => {
      toast.success("Login successful");
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
};
