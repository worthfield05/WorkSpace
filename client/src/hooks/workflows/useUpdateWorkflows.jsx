import { updateWorkflowAPI } from "@/apis/workflows.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

export const useUpdateWorkflows = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateWorkflowAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workflows"] });
    },
  });
};
