import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// pages
import Login from '../pages/authentication/Login';
import { React } from "react";
import { selectIsAuthenticated } from '../redux/modules/authSlice';
import authSaga from '../redux/modules/authSaga';

// ----------------------------------------------------------------------


export default function AuthGuard({ children }) {
    const { isAuthenticated } = authSaga;
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState (null);

    if (!isAuthenticated) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Login />;
    }

    if (requestedLocation && pathname !== requestedLocation) {
        setRequestedLocation(null);
        return <Navigate to={requestedLocation} />;
    }

    return <>{children}</>;
}
