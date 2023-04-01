import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("access_token"));
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to="/auth/login" />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
