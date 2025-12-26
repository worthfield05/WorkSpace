import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = ({ user }) => {
  if (user) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default ProtectedLayout;
