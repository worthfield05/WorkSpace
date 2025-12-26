import React from "react";
import { Outlet } from "react-router";

const ExecutionsPage = () => {
  return (
    <div>
      <h1>Execution page</h1>
      <Outlet />
    </div>
  );
};

export default ExecutionsPage;
