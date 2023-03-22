import React, { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// pages
import Login from '../pages/authentication/Login';
import { selectIsAuthenticated } from '../redux/modules/authenticate/authSlice';
import authSaga from '../redux/modules/authenticate/authSaga';

// ----------------------------------------------------------------------


export default function AuthGuard({ children }) {
    const isAuthenticated = Boolean(localStorage.getItem('access_token'));
    const { pathname } = useLocation();
    const [requestedLocation, setRequestedLocation] = useState (null);
    console.log(isAuthenticated, pathname)

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
