import { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { PATH_DASHBOARD } from "Router/paths";
import useAuth from "../hooks/useAuth";

// ----------------------------------------------------------------------

interface GuestGuardProps {
  children: ReactNode;
}
export default function GuestGuard({ children }: GuestGuardProps) {
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
