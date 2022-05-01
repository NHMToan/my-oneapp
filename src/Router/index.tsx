import LogoOnlyLayout from "layouts/LogoOnlyLayout";
import DashBoard from "pages/Dashboard";
import Login from "pages/Login";
import NotFound from "pages/Page404";
import Register from "pages/Register";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import RequireAuth from "./Authentication/RequireAuth";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <RequireAuth>
          <Outlet />
        </RequireAuth>
      ),
      children: [{ path: "dashboard", element: <DashBoard /> }],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
