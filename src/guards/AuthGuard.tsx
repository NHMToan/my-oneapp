import { ReactNode, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// components
import LoadingScreen from "../components/LoadingScreen";
// hooks
import useAuth from "../hooks/useAuth";
// pages
import Login from "../pages/auth/Login";

// ----------------------------------------------------------------------

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized } = useAuth();

  const { pathname } = useLocation();

  // useEffect(() => {
  //   if (!isAuthenticated) logout();
  // }, []);

  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    // logout();
    return <Login />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    console.log(requestedLocation);
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
