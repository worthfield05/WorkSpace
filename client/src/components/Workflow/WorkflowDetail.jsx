import React from "react";
import { Outlet } from "react-router";

const WorkflowDetail = () => {
  return (
    <div>
      <h1>Workflow details</h1>
      <Outlet />
    </div>
  );
};

export default WorkflowDetail;
