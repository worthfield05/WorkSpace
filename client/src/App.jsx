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

const App = () => {
  const query = useQuery({
    queryKey: ["me"],
    queryFn: getMeAPI,
    retry: false,
    staleTime: 0,
  });
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route path="/" element={<HomeLayout />}>
          <Route
            element={
              query.data !== null ? (
                <ProtectedLayout />
              ) : (
                <Navigate to={"login"} />
              )
            }
          >
            <Route index element={<HomePage />} />
          </Route>
          <Route
            path="login"
            element={
              query.data === null ? <LoginPage /> : <Navigate to={"/"} />
            }
          />
          <Route
            path="register"
            element={
              query.data === null ? <RegisterPage /> : <Navigate to={"/"} />
            }
          />
        </Route>
      </>
    )
  );
  return <RouterProvider router={router} />;
};

export default App;
