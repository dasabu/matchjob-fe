import LayoutClient from '../layouts/LayoutClient'
import CompanyListPage from '../pages/client/CompanyList'
import CompanyDetailPage from '../pages/client/CompanyDetail'
import HomePage from '../pages/shared/Home'
import JobDetailPage from '../pages/client/JobDetail'
import JobListPage from '../pages/client/JobList'
import SignInPage from '../pages/shared/SignIn'
import SignUpPage from '../pages/shared/SignUp'
import { createBrowserRouter } from 'react-router-dom'
import LayoutAdmin from '../layouts/LayoutAdmin'
import CompanyManagementPage from '../pages/admin/CompanyManagement'
import JobManagementPage from '../pages/admin/JobManagement'
import UserManagementPage from '../pages/admin/UserManagement'

export default function useAppRouter() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      element: <LayoutClient />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'companies', element: <CompanyListPage /> },
        { path: 'jobs', element: <JobListPage /> },
        { path: 'companies/:id', element: <CompanyDetailPage /> },
        { path: 'jobs/:id', element: <JobDetailPage /> },
      ],
    },
    {
      path: '/admin',
      element: <LayoutAdmin />,
      children: [
        {
          path: 'companies',
          element: <CompanyManagementPage />,
        },
        {
          path: 'jobs',
          element: <JobManagementPage />,
        },
        {
          path: 'users',
          element: <UserManagementPage />,
        },
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
