# Journey Sick - Frontend

A React-based travel trip planning web application that allows users to create, manage, and collaborate on trip itineraries. The platform features both a user-facing site and an admin management dashboard.

## Tech Stack

- **Framework**: React 18 with React Router v6
- **State Management**: Redux Toolkit + Redux Persist
- **UI Library**: MUI (Material-UI) v5, Ant Design Icons, Bootstrap 5
- **Form Handling**: Formik + Yup validation
- **HTTP Client**: Axios (separate instances for admin/user and JSON/multipart)
- **Authentication**: JWT-based auth with Firebase social login (Google, Facebook, Twitter)
- **Date Handling**: Day.js with UTC plugin
- **Notifications**: React Toastify
- **Internationalization**: react-i18next
- **Other**: Framer Motion, react-snap-carousel, notistack

## Project Structure

```
src/
├── api/                    # API layer (Axios service wrappers)
│   ├── admin/              # Admin API endpoints
│   │   ├── authenticate/   # Admin auth (login, getCurrentUser)
│   │   ├── feedback/       # Feedback CRUD
│   │   ├── itemStatistic/  # Items & item categories
│   │   ├── trip/           # Trips, routes, members, trip items
│   │   └── user/           # User management
│   ├── user/               # User-facing API endpoints
│   │   ├── authenticate/   # User auth (login, register, social login)
│   │   ├── feedback/       # User feedback
│   │   ├── trip/           # User trips, routes, members, items
│   │   └── user/           # User profile management
│   └── index.js            # Barrel export for admin APIs
├── assets/                 # Static assets (images, icons, data)
├── components/
│   ├── Extend/             # Reusable components (AnimateButton, Breadcrumbs, Carousel, etc.)
│   ├── Home/               # Home page components (MainHome, HomeUser, TripCreateUser)
│   ├── Layout/             # Layout components (MainCard, ScrollTop)
│   ├── Loadable/           # Lazy loading wrapper with Suspense
│   ├── item/               # Item table component
│   └── trip-item/          # Trip item table component
├── guards/
│   ├── admin/              # Admin auth guards (AuthGuard, GuestGuard, RoleBasedGuard)
│   └── user/               # User auth guards (AuthGuardUser, GuestGuardUser)
├── hooks/                  # Custom hooks (useLocales)
├── layout/
│   ├── MainLayout/         # Admin dashboard layout (Drawer, Header, Navigation)
│   └── MinimalLayout/      # Minimal layout (Outlet only)
├── menu-items/             # Sidebar navigation configuration
├── pages/
│   ├── admin/              # Admin pages
│   │   ├── authentication/ # Admin login/register
│   │   ├── dashboard/      # Admin dashboard
│   │   ├── feedbackManagement/
│   │   ├── itemManagement/
│   │   ├── tripManagement/ # Trips, routes, members, items
│   │   └── userManagement/
│   ├── home/               # Public & user home pages
│   ├── user/               # User auth & trip pages
│   └── *.jsx               # Error pages (404, 500, Maintenance, etc.)
├── redux/
│   ├── modules/
│   │   ├── admin/          # Admin auth slice, menu slice
│   │   └── user/           # User auth slice
│   ├── hooks.js            # Typed dispatch/selector hooks
│   ├── rootReducer.js      # Combined reducers with persist config
│   └── store.js            # Redux store configuration
├── routes/
│   ├── index.js            # Route definitions (lazy-loaded)
│   └── path.js             # Route path constants
├── themes/                 # MUI theme customization
└── utils/                  # Utilities (axios instances, firebase, password strength, etc.)
```

## Features

### User Site
- User registration and login (credentials + social login via Google/Facebook/Twitter)
- Browse suggested travel destinations
- Create and manage trip itineraries with date planning
- Invite trip members via email
- View trip history with feedback system
- Trip route planning

### Admin Dashboard
- Admin authentication (separate from user auth)
- Dashboard with trip statistics
- User management (CRUD, status changes, password reset)
- Trip management (CRUD, view details, routes, members, items)
- Feedback management
- Item and category management
- Responsive sidebar navigation

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn
- Backend API server running at the configured URL

### Installation

```bash
# Clone the repository
git clone https://github.com/KrisKai/journey-sick-fe.git

# Navigate to the project directory
cd Capstone-Project_Frontend

# Install dependencies
npm install
```

### Configuration

The app is configured through `src/config.js`. Key settings:

- `REACT_APP_API_URL` - Backend API base URL (default: `https://localhost:7184/api/v1.0`)
- `GOOGLE_MAP_API` - Google Maps API key
- `PLACE_API` - Geoapify Places API key
- `GOOGLE_CLIENT_ID` - Google OAuth client ID

HTTPS is enabled by default for local development using certificates in the `ssl/` directory. The `.env` file controls:
```
HTTPS=true
SSL_CRT_FILE=./ssl/cert.pem
SSL_KEY_FILE=./ssl/key.pem
```

### Running the App

```bash
# Start the development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

The app will be available at `https://localhost:3000` (HTTPS) by default.

### Route Overview

| Path | Description |
|------|-------------|
| `/` | Public landing page |
| `/login` | User login |
| `/register` | User registration |
| `/dashboard` | User home (authenticated) |
| `/tripCreate` | Create a new trip |
| `/tripUpdate/:tripId` | Update an existing trip |
| `/auth/login` | Admin login |
| `/admin/dashboard` | Admin dashboard |
| `/admin/userList` | Admin user management |
| `/admin/tripList` | Admin trip management |
| `/admin/feedbackList` | Admin feedback management |
| `/admin/itemList` | Admin item management |

## Authentication

The app uses two separate authentication flows:

- **Admin**: Token stored as `access_token` in localStorage, protected by `AuthGuard`
- **User**: Token stored as `access_token_user` in localStorage, protected by `AuthGuardUser`

Both use JWT Bearer tokens sent via Axios interceptors.

## License

This project is part of a Capstone Project.
