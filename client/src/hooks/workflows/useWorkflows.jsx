import { listWorkflowsAPI } from "@/apis/workflows.api";
import { useQuery } from "@tanstack/react-query";

export const useWorkflows = () => {
  return useQuery({
    queryKey: ["workflows"],
    queryFn: listWorkflowsAPI,
    staleTime: 1000 * 60,
  });
};
