import { lazy } from "react";
import { Navigate, useRoutes } from "react-router-dom";
// guards
import { AuthGuard, GuestGuard } from "guards/admin";
import { AuthGuardUser, GuestGuardUser } from "guards/user";

// import RoleBasedGuard from '../guards/admin/RoleBasedGuard';

// project import
import { Loadable } from "components/Loadable";
import MainLayout from "layout/MainLayout/index";
import MainHome from "pages/home/MainHome/MainHome";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    // { path: "/", element: <Home /> },
    {
      path: "/",
      children: [
        {
          path: "/",
          element: <MainHome />,
        },
        {
          path: "login",
          element: (
            <GuestGuardUser>
              <AuthLoginUser />
            </GuestGuardUser>
          ),
        },
        {
          path: "register",
          element: (
            <GuestGuardUser>
              <Register />
            </GuestGuardUser>
          ),
        },
        {
          path: "dashboard",
          element: (
            <AuthGuardUser>
              <UserHome />
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
          path: `tripRouteList/:tripId`,
          element: (
            <AuthGuard>
              <TripRouteList />
            </AuthGuard>
          ),
        },
        {
          path: `tripRouteCreate/:tripId`,
          element: (
            <AuthGuard>
              <TripRouteCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `tripRouteUpdate/:tripId/:routeId`,
          element: (
            <AuthGuard>
              <TripRouteCreateUpdate />
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
          path: `tripItemList/:tripId`,
          element: (
            <AuthGuard>
              <TripItemList />
            </AuthGuard>
          ),
        },
        {
          path: `tripItemCreate/:tripId`,
          element: (
            <AuthGuard>
              <TripItemCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `tripItemUpdate/:tripId/:itemId`,
          element: (
            <AuthGuard>
              <TripItemCreateUpdate />
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
        {
          path: "itemList",
          element: (
            <AuthGuard>
              <ItemList />
            </AuthGuard>
          ),
        },

        {
          path: "itemCreate",
          element: (
            <AuthGuard>
              <ItemCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `itemUpdate/:itemId`,
          element: (
            <AuthGuard>
              <ItemCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: "itemCategoryList",
          element: (
            <AuthGuard>
              <CategoryList />
            </AuthGuard>
          ),
        },

        {
          path: "categoryCreate",
          element: (
            <AuthGuard>
              <CategoryCreateUpdate />
            </AuthGuard>
          ),
        },
        {
          path: `categoryUpdate/:categoryId`,
          element: (
            <AuthGuard>
              <CategoryCreateUpdate />
            </AuthGuard>
          ),
        },
        // { path: 'verify', element: <VerifyCode /> }
      ],
    },
    { path: "404", element: <NotFound /> },
    {
      path: `confirmPage/:memberId`,
      element: <ConfirmPageTrip />,
    },
    {
      path: `confirmPageUser/:userId`,
      element: <ConfirmPageUser />,
    },
    { path: "*", element: <Navigate to="404" replace /> },
  ]);
}

// IMPORT COMPONENTS
//     --------------USER------------------
// Authentication
const AuthLoginUser = Loadable(
  lazy(() => import("../pages/user/authentication/LoginUser"))
);
const Register = Loadable(
  lazy(() => import("../pages/user/authentication/Register"))
);
// Dashboard
const UserHome  = Loadable(
  lazy(() => import("../pages/home/UserHome/UserHome"))
);
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
const TripRouteList = Loadable(
  lazy(() => import("../pages/admin/tripManagement/route/tripRouteList"))
);
const TripRouteCreateUpdate = Loadable(
  lazy(() =>
    import("../pages/admin/tripManagement/route/tripRouteCreateUpdate")
  )
);
const TripMemberList = Loadable(
  lazy(() => import("../pages/admin/tripManagement/member/tripMemberList"))
);
const TripMemberCreateUpdate = Loadable(
  lazy(() =>
    import("../pages/admin/tripManagement/member/tripMemberCreateUpdate")
  )
);
const TripItemList = Loadable(
  lazy(() => import("../pages/admin/tripManagement/item/tripItemList"))
);
const TripItemCreateUpdate = Loadable(
  lazy(() => import("../pages/admin/tripManagement/item/tripItemCreateUpdate"))
);
const FeedbackList = Loadable(
  lazy(() => import("../pages/admin/feedbackManagement/feedbackList"))
);
const ItemList = Loadable(
  lazy(() => import("../pages/admin/itemManagement/itemList"))
);
const ItemCreateUpdate = Loadable(
  lazy(() => import("../pages/admin/itemManagement/itemCreateUpdate"))
);
const CategoryList = Loadable(
  lazy(() => import("../pages/admin/itemManagement/categoryList"))
);
const CategoryCreateUpdate = Loadable(
  lazy(() => import("../pages/admin/itemManagement/categoryCreateUpdate"))
);
const ConfirmPageTrip = Loadable(
  lazy(() => import("../pages/ConfirmPageTrip"))
);
const ConfirmPageUser = Loadable(
  lazy(() => import("../pages/ConfirmPageUser"))
);
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
