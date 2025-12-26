import React from "react";
import { Outlet } from "react-router";

const CredentialPage = () => {
  return (
    <div>
      <h1>Credential page</h1>
      <Outlet />
    </div>
  );
};

export default CredentialPage;
