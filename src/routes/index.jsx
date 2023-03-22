import React from 'react';
import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');
  console.log(pathname)
  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        // {
        //   path: 'register',
        //   element: (
        //     <GuestGuard>
        //       <Register />
        //     </GuestGuard>
        //   )
        // },
        { path: 'login-unprotected', element: <Login /> },
        // { path: 'register-unprotected', element: <Register /> },
        // { path: 'verify', element: <VerifyCode /> }
      ]
    },
    {
      path: 'admin',
      children: [
        {
          path: 'dashboard',
          element: (
            <AuthGuard>
              <DashboardDefault />
            </AuthGuard>
          )
        }
        // { path: 'register-unprotected', element: <Register /> },
        // { path: 'verify', element: <VerifyCode /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
// const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
// const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/Dashboard')));
// //Learn
// const DealTerm = Loadable(lazy(() => import('../pages/learn/DealTerm')));
// const LearnHowItWork = Loadable(lazy(() => import('../pages/learn/LearnHowItWork')));
// const WhatIGetInvest = Loadable(lazy(() => import('../pages/learn/WhatIGetInvest')));
// const RiskInvest = Loadable(lazy(() => import('../pages/learn/RiskInvest')));
// const RiskFranchise = Loadable(lazy(() => import('../pages/learn/RiskFranchise')));
// const RiskManager = Loadable(lazy(() => import('../pages/learn/RiskManager')));
// const RiskForField = Loadable(lazy(() => import('../pages/learn/RiskForField')));
// const HowReturnWork = Loadable(lazy(() => import('../pages/learn/HowReturnWork')));
// const HowToInvest = Loadable(lazy(() => import('../pages/learn/HowToInvest')));
// const HowToCallInvest = Loadable(lazy(() => import('../pages/learn/HowToCallInvest')));
// const HowToJoinKrowdEco = Loadable(lazy(() => import('../pages/learn/HowToJoinKrowdEco')));
// const HowToContact = Loadable(lazy(() => import('../pages/learn/HowToContact')));
// const PrivaryPolicy = Loadable(lazy(() => import('../pages/learn/PrivaryPolicy')));
// const TermOfService = Loadable(lazy(() => import('../pages/learn/TermOfService')));
// const Communication = Loadable(lazy(() => import('../pages/learn/Communication')));
// //
// const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
// const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
// const WalletBanking = Loadable(lazy(() => import('../pages/dashboard/WalletBanking')));
// const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));
// const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));

// const EcommerceProductDetails = Loadable(
//   lazy(() => import('../pages/dashboard/EcommerceProductDetails'))
// );
// const EcommerceProductList = Loadable(
//   lazy(() => import('../pages/dashboard/EcommerceProductList'))
// );
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
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
// Components
// const ComponentsOverview = Loadable(lazy(() => import('../pages/ComponentsOverview')));
///