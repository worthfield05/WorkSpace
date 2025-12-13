import React from "react";
import { Outlet } from "react-router";

const ProtectedLayout = () => {
  return <Outlet />;
};

export default ProtectedLayout;
