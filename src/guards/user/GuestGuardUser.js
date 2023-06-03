import React from 'react';
import { Navigate } from "react-router-dom";
// routes
import { PATH_USER_SITE } from "../../routes/path";

// ----------------------------------------------------------------------

export default function GuestGuardUser({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('access_token_user'));
  if (isAuthenticated) {
    return <Navigate to={PATH_USER_SITE.general.dashboard} />;
  }
  return <>{children}</>;
}
