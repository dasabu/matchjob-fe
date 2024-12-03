import { createBrowserRouter } from 'react-router-dom'

import LayoutClient from '../layouts/LayoutClient'
import CompanyListPage from '../pages/CompanyList'
import CompanyDetailPage from '../pages/CompanyDetail'
import HomePage from '../pages/HomePage'
import JobDetailPage from '../pages/JobDetail'
import JobListPage from '../pages/JobList'
import SignInPage from '../pages/SignIn'
import SignUpPage from '../pages/SignUp'
import LayoutAdmin from '../layouts/LayoutAdmin'
import CompanyManagementPage from '../pages/admin/CompanyManagement'
import JobManagementPage from '../pages/admin/JobManagement'
import UserManagementPage from '../pages/admin/UserManagement'
import JobUpsertPage from '../pages/admin/JobUpsert'
import ResumeManagementPage from '../pages/admin/ResumeManagement'

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
          children: [
            {
              index: true,
              element: <JobManagementPage />,
            },
            {
              path: 'upsert',
              element: <JobUpsertPage />,
            },
          ],
        },
        {
          path: 'users',
          element: <UserManagementPage />,
        },
        {
          path: 'resumes',
          element: <ResumeManagementPage />,
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
