import LayoutClient from '../layouts/LayoutClient'
import CompaniesPage from '../pages/client/Companies'
import CompanyDetailPage from '../pages/client/CompanyDetail'
import HomePage from '../pages/shared/Home'
import JobDetailPage from '../pages/client/JobDetail'
import JobsPage from '../pages/client/Jobs'
import SignInPage from '../pages/shared/SignIn'
import SignUpPage from '../pages/shared/SignUp'
import { createBrowserRouter } from 'react-router-dom'

export default function useAppRouter() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <LayoutClient />,
      children: [
        { index: true, element: <HomePage /> },
        { path: '/companies', element: <CompaniesPage /> },
        { path: '/jobs', element: <JobsPage /> },
        { path: '/companies/:id', element: <CompanyDetailPage /> },
        { path: '/jobs/:id', element: <JobDetailPage /> },
      ],
    },
    {
      path: '/sign-up',
      element: <SignUpPage />,
    },
    {
      path: '/sign-in',
      element: <SignInPage />,
    },
  ])

  return appRouter
}

/*
/ (root)
│
├── "/sign-in" (SignInPage)
└── "/sign-up" (SignUpPage)
│
├── LayoutClient
│   ├── "/" (HomePage)
│   ├── "/job" (JobPage)
│   ├── "/job/:id" (JobDetailPage)
│   ├── "/company" (CompanyPage)
│   └── "/company/:id" (CompanyDetailPage)
│
├── /admin
│   ├── LayoutAdmin (ProtectedRoute)
│   │   ├── "/" (DashboardPage)
│   │   ├── "/company" (CompanyPage)
│   │   ├── "/user" (UserPage)
│   │   ├── "/job"
│   │   │   ├── "/" (JobPage)
│   │   │   └── "/upsert" (ViewUpsertJob)
│   │   ├── "/resume" (ResumePage)
│   │   ├── "/permission" (PermissionPage)
│   │   └── "/role" (RolePage)
*/
