import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// guards
import { AuthGuard, GuestGuard } from "guards/admin";
import { AuthGuardUser, GuestGuardUser } from "guards/user";

// import RoleBasedGuard from '../guards/admin/RoleBasedGuard';

// project import
import { Loadable } from "components/Loadable";
import MainLayout from "layout/MainLayout/index";
import Home from "pages/home/Home";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <GuestGuardUser>
          <AuthLoginUser />
        </GuestGuardUser>
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
              <UserCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `userUpdate/:userId`,
          element: (
            <AuthGuard>
              <UserCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `userView/:userId`,
          element: (
            <AuthGuard>
              <UserView />
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
              <TripCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `tripUpdate/:tripId`,
          element: (
            <AuthGuard>
              <TripCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `tripView/:tripId`,
          element: (
            <AuthGuard>
              <TripView />
            </AuthGuard>
          ),
        },
        {
          path: `tripDetail/:tripId`,
          element: (
            <AuthGuard>
              <TripDetail />
            </AuthGuard>
          ),
        },
        {
          path: `tripPlanList/:tripId`,
          element: (
            <AuthGuard>
              <TripPlanList />
            </AuthGuard>
          ),
        },
        {
          path: `tripPlanCreate/:tripId`,
          element: (
            <AuthGuard>
              <TripPlanCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `tripPlanUpdate/:tripId/:planId`,
          element: (
            <AuthGuard>
              <TripPlanCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `tripMemberList/:tripId`,
          element: (
            <AuthGuard>
              <TripMemberList />
            </AuthGuard>
          ),
        },
        {
          path: `tripMemberCreate/:tripId`,
          element: (
            <AuthGuard>
              <TripMemberCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `tripMemberUpdate/:tripId/:memberId`,
          element: (
            <AuthGuard>
              <TripMemberCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `tripRoleList/:tripId`,
          element: (
            <AuthGuard>
              <TripRoleList />
            </AuthGuard>
          ),
        },
        {
          path: `tripRoleCreate/:tripId`,
          element: (
            <AuthGuard>
              <TripRoleCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `tripRoleUpdate/:tripId/:roleId`,
          element: (
            <AuthGuard>
              <TripRoleCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: "feedbackList",
          element: (
            <AuthGuard>
              <FeedbackList />
            </AuthGuard>
          ),
        },
        // { path: 'verify', element: <VerifyCode /> }
      ],
    },
    { path: "/home", element: <Home /> },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS
//     --------------USER------------------
// Authentication
const AuthLoginUser = Loadable(
  lazy(() => import("../pages/user/authentication/LoginUser"))
);
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
const UserCreateUpdate = Loadable(
  lazy(() => import("../pages/admin/userManagement/userCreateUpdate"))
);
const UserView = Loadable(
  lazy(() => import("../pages/admin/userManagement/userView"))
);
const TripList = Loadable(
  lazy(() => import("../pages/admin/tripManagement/tripList"))
);
const TripCreateUpdate = Loadable(
  lazy(() => import("../pages/admin/tripManagement/tripCreateUpdate"))
);
const TripView = Loadable(
  lazy(() => import("../pages/admin/tripManagement/tripView"))
);
const TripDetail = Loadable(
  lazy(() => import("../pages/admin/tripManagement/tripDetail"))
);
const TripPlanList = Loadable(
  lazy(() => import("../pages/admin/tripManagement/plan/tripPlanList"))
);
const TripPlanCreateUpdate = Loadable(
  lazy(() => import("../pages/admin/tripManagement/plan/tripPlanCreateUpdate"))
);
const TripMemberList = Loadable(
  lazy(() => import("../pages/admin/tripManagement/member/tripMemberList"))
);
const TripMemberCreateUpdate = Loadable(
  lazy(() =>
    import("../pages/admin/tripManagement/member/tripMemberCreateUpdate")
  )
);
const TripRoleList = Loadable(
  lazy(() => import("../pages/admin/tripManagement/role/tripRoleList"))
);
const TripRoleCreateUpdate = Loadable(
  lazy(() => import("../pages/admin/tripManagement/role/tripRoleCreateUpdate"))
);
const FeedbackList = Loadable(
  lazy(() => import("../pages/admin/feedbackManagement/feedbackList"))
);
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
