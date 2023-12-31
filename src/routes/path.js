// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
  }
  
  const ROOTS_AUTH = '/auth';
  const ROOTS_DASHBOARD = '/admin';
  const ROOTS_USER_SITE = '/'
  
  // ----------------------------------------------------------------------
  
  export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    loginUnprotected: path(ROOTS_AUTH, '/login'),
    register: path(ROOTS_AUTH, '/register'),
    registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    verify: path(ROOTS_AUTH, '/verify')
  };
  
  export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    pricing: '/pricing',
    payment: '/payment',
    about: '/about-us',
    contact: '/contact-us',
    faqs: '/faqs',
    page404: '/404',
    page500: '/500',
    homePage: '/',
    paymentSuccess: '/payment-success',
    details: '/project'
  };
  
  export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
      dashboard: path(ROOTS_DASHBOARD, '/dashboard')
    },
    trip: {
      root: path(ROOTS_DASHBOARD, '/trip'),
      all: path(ROOTS_DASHBOARD, '/trip/all')
    },
    user: {
      root: path(ROOTS_DASHBOARD, '/user'),
      profile: path(ROOTS_DASHBOARD, '/user/profile'),
      cards: path(ROOTS_DASHBOARD, '/user/cards'),
      list: path(ROOTS_DASHBOARD, '/user/list'),
      newUser: path(ROOTS_DASHBOARD, '/user/new'),
      editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
      account: path(ROOTS_DASHBOARD, '/user/account')
    }
  };

  export const PATH_USER_SITE = {
    root: ROOTS_USER_SITE,
    login: path(ROOTS_USER_SITE, 'login'),
    general: {
      dashboard: path(ROOTS_USER_SITE, 'dashboard')
    }
  }
  
  export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
  export const PATH_SEARCHPAGE = '/project';
  export const PATH_FIELDPAGE = '/all_field';
  // export const PATH_FIELDPAGE_DETAILS = '/all_field/:name';