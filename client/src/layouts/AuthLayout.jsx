import React from "react";
import { Navigate, Outlet } from "react-router";

const AuthLayout = ({ user }) => {
  if (user) {
    return <Navigate to={"/"} replace />;
  } else {
    return (
      <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <Outlet />
        </div>
      </div>
    );
  }
};

export default AuthLayout;
