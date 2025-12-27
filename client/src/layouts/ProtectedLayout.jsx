import AppSidebar from "@/components/AppSidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { WorkflowsContainer } from "@/pages/WorkflowPage";
import React from "react";
import { Navigate, Outlet } from "react-router";

const ProtectedLayout = ({ user }) => {
  if (user) {
    return (
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <WorkflowsContainer>
            <Outlet />
          </WorkflowsContainer>
        </SidebarInset>
      </SidebarProvider>
    );
  } else {
    return <Navigate to={"/login"} replace />;
  }
};

export default ProtectedLayout;
