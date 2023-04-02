import React, { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
// ----------------------------------------------------------------------

export default function AuthGuardUser({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem("access_token_user"));
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState(null);

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    return <Navigate to="/login" />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <>{children}</>;
}
