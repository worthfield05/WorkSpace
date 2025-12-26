import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router";
import HomeLayout from "./layouts/HomeLayout";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { useQuery } from "@tanstack/react-query";
import { getMeAPI } from "./apis/auth";
import ProtectedLayout from "./layouts/ProtectedLayout";
import CredentialPage from "./pages/CredentialPage";
import CredentialDetail from "./components/Credential/CredentialDetail";
import AuthLayout from "./layouts/AuthLayout";
import ExecutionsPage from "./pages/ExecutionsPage";
import ExecutionDetail from "./components/Execution/ExecutionDetail";
import WorkflowPage from "./pages/WorkflowPage";
import WorkflowDetail from "./components/Workflow/WorkflowDetail";

const App = () => {
  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: getMeAPI,
    retry: false,
    staleTime: 0,
  });

  if (isLoading) {
    return <div>Checking authentication....</div>;
  }
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeLayout />}>
          <Route element={<ProtectedLayout user={user} />}>
            {/* <Route index element={<HomePage />} /> */}
            <Route index element={<Navigate to="/workflows" replace />} />
            <Route path="workflows">
              <Route index element={<WorkflowPage />} />
              <Route path=":id" element={<WorkflowDetail />} />
            </Route>
            <Route path="credentials">
              <Route index element={<CredentialPage />} />
              <Route path=":id" element={<CredentialDetail />} />
            </Route>
            <Route path="executions">
              <Route index element={<ExecutionsPage />} />
              <Route path=":id" element={<ExecutionDetail />} />
            </Route>
          </Route>

          <Route element={<AuthLayout user={user} />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
