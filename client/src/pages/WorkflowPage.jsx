import EntityHeader, {
  EntityContainer,
} from "@/components/Workflow/entity-components";
import React from "react";

const WorkflowPage = () => {
  return (
    <div className="flex flex-1 justify-center items-center">
      <div> workflow</div>
    </div>
  );
};

export default WorkflowPage;
export const WorkflowsHeader = () => {
  return (
    <>
      <EntityHeader
        title="Workflows"
        description="Create and manage your workflows"
        onNew={() => {}}
        newButtonLabel="New workflow"
        isCreating={false}
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
