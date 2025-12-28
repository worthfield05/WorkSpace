import EntityHeader, {
  EntityContainer,
} from "@/components/Workflow/entity-components";
import React from "react";
import { useCreateWorkflows, useWorkflows } from "@/hooks/workflows";
const WorkflowPage = () => {
  const { data } = useWorkflows();

  return (
    <div className="flex flex-1 justify-center items-center">
      <div>
        {data?.map((item) => {
          return <div key={item._id}>{item.name}</div>;
        })}
      </div>
    </div>
  );
};

export default WorkflowPage;
export const WorkflowsHeader = () => {
  const createWorkflow = useCreateWorkflows();
  const handleCreate = () => {
    createWorkflow.mutate();
  };
  return (
    <>
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={handleCreate}
        newButtonLabel="New workflow"
        isCreating={createWorkflow?.isPending}
      />
    </>
  );
};

export const WorkflowsContainer = ({ children }) => {
  return (
    <EntityContainer
      header={<WorkflowsHeader />}
      search={<></>}
      pagination={<></>}
    >
      {children}
    </EntityContainer>
  );
};
