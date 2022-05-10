import { PATH_AFTER_LOGIN } from "config";
import AuthGuard from "guards/AuthGuard";
import GuestGuard from "guards/GuestGuard";
import LogoOnlyLayout from "layouts/LogoOnlyLayout";
import DashBoard from "pages/Dashboard";
import { lazy, Suspense } from "react";
import { Navigate, useLocation, useRoutes } from "react-router-dom";
import LoadingScreen from "../components/LoadingScreen";

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes("/dashboard")} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: "auth",
      element: <LogoOnlyLayout />,
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: "login-unprotected", element: <Login /> },
        { path: "register-unprotected", element: <Register /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <AuthGuard>
          <LogoOnlyLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: "app", element: <DashBoard /> },
      ],
    },
    {
      path: "*",
      element: <LogoOnlyLayout />,
      children: [
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: "/",
      children: [
        { element: <Navigate to="/dashboard/app" replace />, index: true },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

const Login = Loadable(lazy(() => import("../pages/auth/Login")));
const Register = Loadable(lazy(() => import("../pages/auth/Register")));

const Page404 = Loadable(lazy(() => import("../pages/Page404")));
