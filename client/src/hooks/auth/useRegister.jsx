import { registerAPI } from "@/apis/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { toast } from "sonner";

export const useRegister = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: registerAPI,
    onSuccess: () => {
      toast.success("Registration successful");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      navigate("/workflows");
    },
  });
};
