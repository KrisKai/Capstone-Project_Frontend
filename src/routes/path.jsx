// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
  }
  
  const ROOTS_AUTH = '/auth';
  const ROOTS_DASHBOARD = '/dashboard';
  
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
      trip: path(ROOTS_DASHBOARD, '/trip'),
      plan: path(ROOTS_DASHBOARD, '/plan'),
      analytics: path(ROOTS_DASHBOARD, '/analytics'),
      banking: path(ROOTS_DASHBOARD, '/banking'),
      booking: path(ROOTS_DASHBOARD, '/booking')
    },
    trip: {
      root: path(ROOTS_DASHBOARD, '/trip'),
      all: path(ROOTS_DASHBOARD, '/trip/all')
    },
    // chat: {
    //   root: path(ROOTS_DASHBOARD, '/chat'),
    //   new: path(ROOTS_DASHBOARD, '/chat/new'),
    //   conversation: path(ROOTS_DASHBOARD, '/chat/:conversationKey')
    // },
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
  
  export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
  export const PATH_SEARCHPAGE = '/project';
  export const PATH_FIELDPAGE = '/all_field';
  // export const PATH_FIELDPAGE_DETAILS = '/all_field/:name';