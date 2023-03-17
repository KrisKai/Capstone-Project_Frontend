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
    // {
    //   path: 'projectBoard',
    //   element: (
    //     <AuthGuard>
    //       <DashboardProjectLayout />
    //     </AuthGuard>
    //   ),
    //   children: [
    //     { element: <Navigate to="/projectBoard/project" replace /> },
    //     { path: 'project/general', element: <GeneralApp /> },
    //     { path: 'project/projectDetail', element: <Details /> },
    //     { path: 'project/projectDetail/:id', element: <Details /> },
    //     { path: 'project/daily-revenue', element: <ReportDailyProject /> },
    //     { path: 'project/payment_history', element: <PaymentHistory /> },
    //     { path: 'project/bills/daily', element: <BillReportDailyProject /> },
    //     { path: 'project/investment-wallet', element: <UserInvestment /> },
    //     { path: 'project/report_update', element: <ProjectStageReport /> }
    //   ]
    // },
    // Dashboard Routes

    // {
    //   path: 'dashboard',
    //   element: (
    //     <AuthGuard>
    //       <DashboardLayout />
    //     </AuthGuard>
    //   ),
    //   children: [
        // { element: <Navigate to="/dashboard/banking" replace /> },
        // { path: 'app', element: <GeneralApp /> },
        // { path: 'ecommerce', element: <GeneralEcommerce /> },
        // { path: 'analytics', element: <GeneralAnalytics /> },
        // { path: 'banking', element: <WalletBanking /> },
        // { path: 'booking', element: <GeneralBooking /> },

        // {
        //   path: 'e-commerce',
        //   children: [
        //     { element: <Navigate to="/dashboard/e-commerce/shop" replace /> },
        //     { path: 'shop', element: <EcommerceShop /> },
        //     { path: 'product/:name', element: <EcommerceProductDetails /> },
        //     { path: 'list', element: <EcommerceProductList /> },
        //     { path: 'product/new', element: <EcommerceProductCreate /> },
        //     { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
        //     { path: 'checkout', element: <EcommerceCheckout /> },
        //     { path: 'invoice', element: <EcommerceInvoice /> }
        //   ]
        // },
        // {
        //   path: 'user',
        //   children: [
        //     { element: <Navigate to="/dashboard/user/profile" replace /> },
        //     { path: 'profile', element: <UserProfile /> },
        //     { path: 'cards', element: <UserCards /> },
        //     { path: 'list', element: <UserList /> },
        //     { path: 'new', element: <UserCreate /> },
        //     { path: ':name/edit', element: <UserCreate /> },
        //     { path: 'account', element: <UserAccount /> }
        //   ]
        // },
        // {
        //   path: 'project-invested',
        //   children: [
        //     { element: <Navigate to="/dashboard/project-invested/list" replace /> },

        //     { path: 'list', element: <ProjectListInvested /> }
        //   ]
        // },
        // {
        //   path: 'project-investment',
        //   children: [
        //     { element: <Navigate to="/dashboard/project-investment/list" replace /> },
        //     { path: 'list', element: <UserInvestmentAll /> }
        //   ]
        // },
        // {
        //   path: 'account-transaction',
        //   children: [
        //     { element: <Navigate to="/dashboard/account-transaction/list" replace /> },
        //     { path: 'list', element: <UserAccountTransaction /> },
        //     { path: 'withdraw-request', element: <UserWithDrawTransaction /> },
        //     { path: 'wallet-transaction', element: <UserWalletTransaction /> },
        //     // { path: 'payments/list', element: <UserPaymentProject /> },
        //     { path: 'revenue-history', element: <UserPeriodRevenueHistory /> }
        //   ]
        // },
        // {
        //   path: 'userKrowd',
        //   children: [
        //     { element: <Navigate to="/dashboard/userKrowd/profile" replace /> },
        //     { path: 'cards', element: <UserCards /> },
        //     { path: 'new', element: <UserCreate /> },
        //     { path: ':name/edit', element: <UserCreate /> },
        //     { path: 'account', element: <UserAccount /> }
        //   ]
        // },

        // {
        //   path: 'blog',
        //   children: [
        //     { element: <Navigate to="/dashboard/blog/posts" replace /> },
        //     { path: 'post/:title', element: <BlogPost /> },
        //     { path: 'new-post', element: <KrowdNewProject /> }
        //   ]
        // },
        // {
        //   path: 'mail',
        //   children: [
        //     { element: <Navigate to="/dashboard/mail/all" replace /> },
        //     { path: 'label/:customLabel', element: <Mail /> },
        //     { path: 'label/:customLabel/:mailId', element: <Mail /> },
        //     { path: ':systemLabel', element: <Mail /> },
        //     { path: ':systemLabel/:mailId', element: <Mail /> }
        //   ]
        // },
        // {
        //   path: 'chat',
        //   children: [
        //     { element: <Chat /> },
        //     { path: 'new', element: <Chat /> },
        //     { path: ':conversationKey', element: <Chat /> }
        //   ]
        // }
    //   ]
    // },
    // {
    //   path: 'learn',
    //   element: <DashboardLayoutLearn />,
    //   children: [
    //     { element: <Navigate to="/learn/investors/what-the-deal-terms-mean" replace /> },
    //     { path: '/learn/investors/how-it-works', element: <LearnHowItWork /> },
    //     { path: '/learn/investors/what-the-deal-terms-mean', element: <DealTerm /> },
    //     { path: '/learn/investors/what-do-i-get-when-i-invest', element: <WhatIGetInvest /> },
    //     { path: '/learn/investors/risks_invested', element: <RiskInvest /> },
    //     { path: '/learn/investors/how_return_work', element: <HowReturnWork /> },
    //     { path: '/learn/investors/how_to_invest', element: <HowToInvest /> },
    //     { path: '/learn/investors/how_to_call_invest', element: <HowToCallInvest /> },
    //     { path: '/learn/investors/how_to_join_krowdeco', element: <HowToJoinKrowdEco /> },
    //     { path: '/learn/investors/how_to_contact', element: <HowToContact /> },
    //     { path: '/learn/investors/privacy_policy', element: <PrivaryPolicy /> },
    //     { path: '/learn/investors/term_of_service', element: <TermOfService /> },
    //     { path: '/learn/investors/communication', element: <Communication /> },
    //     { path: '/learn/investors/risk_franchise', element: <RiskFranchise /> },
    //     { path: '/learn/investors/risk_manager', element: <RiskManager /> },
    //     { path: '/learn/investors/risk_for_field', element: <RiskForField /> },
    //     { path: '/learn/investors/coming-soon', element: <ComingSoon /> }
    //   ]
    // },

    // Main Routes
    // {
    //   path: '*',
    //   element: <LogoOnlyLayout />,
    //   children: [
    //     { path: 'coming-soon', element: <ComingSoon /> },
    //     { path: 'maintenance', element: <Maintenance /> },
    //     { path: '500', element: <Page500 /> },
    //     { path: 'page-success', element: <PageSuccess /> },
    //     { path: '404', element: <NotFound /> },
    //     { path: '*', element: <Navigate to="/404" replace /> }
    //   ]
    // },
    // {
    //   path: '/',
    //   element: <MainLayout />,
    //   children: [
    //     { element: <LandingPage /> },
    //     { path: 'about-us', element: <About /> },
    //     { path: 'contact-us', element: <Contact /> },
    //     { path: 'faqs', element: <Faqs /> },
    //     { path: 'project/:id', element: <Details /> },
    //     // { path: 'package/invest/:id', element: <KrowdPackage /> },

    //     { path: 'project', element: <Projects /> },
    //     {
    //       path: 'components',
    //       children: [{ element: <ComponentsOverview /> }]
    //     }
    //   ]
    // },
    // {
    //   path: '/',
    //   element: (
    //     <AuthGuard>
    //       <MainNavbar />
    //       <KrowdPackage />
    //       <Divider />
    //       <MainFooter />
    //     </AuthGuard>
    //   ),
    //   children: [
    //     { element: <Navigate to="/package/invest/:id" replace /> },
    //     { path: 'package/invest/:id', element: <KrowdPackage /> }
    //   ]
    // },

    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
// const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
// const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
// Dashboard
// const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
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