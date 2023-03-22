import React from 'react';
import { Navigate } from "react-router-dom";
import authSaga from '../redux/modules/authenticate/authSaga';
import { selectIsAuthenticated } from '../redux/modules/authenticate/authSlice';
// routes
import { PATH_DASHBOARD } from "../routes/path";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const { isAuthenticated } = authSaga;

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
