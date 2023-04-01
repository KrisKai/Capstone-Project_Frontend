import React from "react";
import { Suspense, lazy } from "react";
import { Navigate, useRoutes, useLocation } from "react-router-dom";
import LogoOnlyLayout from "../layouts/LogoOnlyLayout";
// guards
import GuestGuard from "../guards/admin/GuestGuard";
import AuthGuard from "../guards/admin/AuthGuard";
// import RoleBasedGuard from '../guards/admin/RoleBasedGuard';
// components
import LoadingScreen from "../components/LoadingScreen";

// project import
import Loadable from "../components/Loadable";
import MainLayout from "../layout/MainLayout/index";
import GuestGuardUser from "../guards/user/GuestGuardUser";
import AuthGuardUser from "../guards/user/AuthGuardUser";

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: (
        <GuestGuard>
          <AuthLogin/>
        </GuestGuard>
      ),
      children: [
        {
          path: "login",
          element: (
            <GuestGuardUser>
              <AuthLogin/>
            </GuestGuardUser>
          ),
        },
        {
          path: "dashboard",
          element: (
            <AuthGuardUser>
              <AuthLogin/>
            </AuthGuardUser>
          ),
        },
      ]
    },
    {
      path: "auth",
      children: [
        {
          path: "login",
          element: (
            <GuestGuard>
              <AuthLogin/>
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
        // { path: 'verify', element: <VerifyCode /> }
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}

// IMPORT COMPONENTS

// Authentication
const AuthLogin  = Loadable(lazy(() => import("../pages/authentication/Login")));
// const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
// const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const DashboardDefault = Loadable(
  lazy(() => import("../pages/dashboard/Dashboard"))
);

const UserList = Loadable(
  lazy(() => import("../pages/userManagement/userList"))
);
const UserCreate = Loadable(
  lazy(() => import("../pages/userManagement/userCreate"))
);
const TripList = Loadable(
  lazy(() => import("../pages/tripManagement/tripList"))
);
// const EcommerceProductCreate = Loadable(
//   lazy(() => import('../pages/dashboard/EcommerceProductCreate'))
// );
// const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/PackageVoucherCheckout')));
// const EcommerceInvoice = Loadable(lazy(() => import('../pages/dashboard/EcommerceInvoice')));
// const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
// const KrowdNewProject = Loadable(lazy(() => import('../pages/dashboard/KrowdNewProject')));
// //project Entity
// const KrowdNewProjectEntity = Loadable(
//   lazy(() => import('../pages/dashboard/KrowdNewProjectEntity'))
// );

// const KrowdNewProjectMedia = Loadable(
//   lazy(() => import('../pages/dashboard/KrowdNewProjectMedia'))
// );
// const KrowdNewProjectOwner = Loadable(
//   lazy(() => import('../pages/dashboard/KrowdNewProjectOwner'))
// );
// const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
// const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
// const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
// const UserAccount = Loadable(lazy(() => import('../pages/dashboard/AccountManager/UserAccount')));
// const UserAccountTransaction = Loadable(
//   lazy(() => import('../pages/dashboard/AccountManager/UserAccountTransaction'))
// );
// const UserWithDrawTransaction = Loadable(
//   lazy(() => import('../pages/dashboard/AccountManager/UserWithDrawTransaction'))
// );
// const UserWalletTransaction = Loadable(
//   lazy(() => import('../pages/dashboard/AccountManager/UserWalletTransaction'))
// );
// const UserPaymentProject = Loadable(
//   lazy(() => import('../pages/dashboard/AccountManager/UserPaymentProject'))
// );
// const UserPeriodRevenueHistory = Loadable(
//   lazy(() => import('../pages/dashboard/AccountManager/UserPeriodRevenueHistory'))
// );
// const UserInvestment = Loadable(
//   lazy(() => import('../pages/dashboard/AccountManager/UserInvestment'))
// );
// const UserInvestmentAll = Loadable(
//   lazy(() => import('../pages/dashboard/AccountManager/UserInvestmentAll'))
// );
// //===========================SIDEBAR PROJECT===================================
// const ProjectListInvested = Loadable(
//   lazy(() => import('../pages/dashboard/ProjectKrowdManager/ProjectListInvested'))
// );
// const ReportDailyProject = Loadable(
//   lazy(() => import('../pages/dashboard/ProjectKrowdManager/ReportDailyProject'))
// );
// const PaymentHistory = Loadable(
//   lazy(() => import('../pages/dashboard/ProjectKrowdManager/PaymentHistory'))
// );
// const BillReportDailyProject = Loadable(
//   lazy(() => import('../pages/dashboard/ProjectKrowdManager/BillReportDailyProject'))
// );
// const ProjectStageReport = Loadable(
//   lazy(() => import('../pages/dashboard/ProjectKrowdManager/ProjectStageReport'))
// );

// //==============================================================================
// const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));
// const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
// const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
// // Main
// const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
// const About = Loadable(lazy(() => import('../pages/About')));
// const Contact = Loadable(lazy(() => import('../pages/Contact')));
// const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
// const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));

// const Details = Loadable(lazy(() => import('../pages/Details')));
//Page
// const Projects = Loadable(lazy(() => import('../pages/project/Project')));
// const SearchPage = Loadable(lazy(() => import('../pages/SearchPage')));
const Maintenance = Loadable(lazy(() => import("../pages/Maintenance")));
const Page500 = Loadable(lazy(() => import("../pages/Page500")));
const NotFound = Loadable(lazy(() => import("../pages/Page404")));
// Components
// const ComponentsOverview = Loadable(lazy(() => import('../pages/ComponentsOverview')));
///
