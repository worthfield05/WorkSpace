import { Toaster } from "sonner";
import { Outlet } from "react-router";

const HomeLayout = () => {
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
};

export default HomeLayout;
