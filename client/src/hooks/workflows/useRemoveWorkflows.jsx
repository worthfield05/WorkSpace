import { removeWorkflowAPI } from "@/apis/workflows.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveWorkflows = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeWorkflowAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
};
