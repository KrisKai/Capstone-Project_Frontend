import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// guards
import { AuthGuard, GuestGuard } from "guards/admin";
import { AuthGuardUser, GuestGuardUser } from "guards/user";

// import RoleBasedGuard from '../guards/admin/RoleBasedGuard';

// project import
import Loadable from "components/Loadable";
import MainLayout from "layout/MainLayout/index";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <GuestGuard>
          <AuthLoginUser />
        </GuestGuard>
      ),
      children: [
        {
          path: "login",
          element: (
            <GuestGuardUser>
              <AuthLoginUser />
            </GuestGuardUser>
          ),
        },
        {
          path: "dashboard",
          element: (
            <AuthGuardUser>
              <AuthLoginUser />
            </AuthGuardUser>
          ),
        },
      ],
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <AuthLogin />
            </GuestGuard>
          ),
        },
        // {
        //   path: 'register',
        //   element: (
        //     <GuestGuard>
        //       <Register />
        //     </GuestGuard>
        //   )
        // },
        { path: "login-unprotected", element: <AuthLogin /> },
        // { path: 'register-unprotected', element: <Register /> },
        // { path: 'verify', element: <VerifyCode /> }
      ],
    },
    {
      path: "admin",
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: "dashboard",
          element: (
            <AuthGuard>
              <DashboardDefault />
            </AuthGuard>
          ),
        },
        {
          path: "userList",
          element: (
            <AuthGuard>
              <UserList />
            </AuthGuard>
          ),
        },
        {
          path: "userCreate",
          element: (
            <AuthGuard>
              <UserCreate />
            </AuthGuard>
          ),
        },
        {
          path: "tripList",
          element: (
            <AuthGuard>
              <TripList />
            </AuthGuard>
          ),
        },
        {
          path: "tripCreate",
          element: (
            <AuthGuard>
              <TripCreate />
            </AuthGuard>
          ),
        },
        {
          path: `tripUpdate/:tripId`,
          element: (
            <AuthGuard>
              <TripUpdate />
            </AuthGuard>
          ),
        },
        // { path: 'verify', element: <VerifyCode /> }
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS
//     --------------USER------------------
// Authentication
const AuthLoginUser  = Loadable(lazy(() => import("../pages/user/authentication/LoginUser")));
// const Register = Loadable(lazy(() => import('../pages/user/authentication/Register')));

//     --------------ADMIN------------------
// Authentication
const AuthLogin = Loadable(
  lazy(() => import("../pages/admin/authentication/Login"))
);
// const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
// const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const DashboardDefault = Loadable(
  lazy(() => import("../pages/admin/dashboard/Dashboard"))
);

const UserList = Loadable(
  lazy(() => import("../pages/admin/userManagement/userList"))
);
const UserCreate = Loadable(
  lazy(() => import("../pages/admin/userManagement/userCreate"))
);
const TripList = Loadable(
  lazy(() => import("../pages/admin/tripManagement/tripList"))
);
const TripCreate = Loadable(
  lazy(() => import("../pages/admin/tripManagement/tripCreate"))
);
const TripUpdate = Loadable(
  lazy(() => import("../pages/admin/tripManagement/tripUpdate"))
);
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
