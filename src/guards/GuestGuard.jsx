import React from 'react';
import { Navigate } from "react-router-dom";
import authSaga from '../redux/modules/authenticate/authSaga';
import { selectIsAuthenticated } from '../redux/modules/authenticate/authSlice';
// routes
import { PATH_DASHBOARD } from "../routes/path";

// ----------------------------------------------------------------------

export default function GuestGuard({ children }) {
  const isAuthenticated = Boolean(localStorage.getItem('access_token'));
  console.log(isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={PATH_DASHBOARD.general.dashboard} />;
  }

  return <>{children}</>;
}
