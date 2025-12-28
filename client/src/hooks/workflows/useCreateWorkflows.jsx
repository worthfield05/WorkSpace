import { createWorkflowAPI } from "@/apis/workflows.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateWorkflows = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkflowAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
};
