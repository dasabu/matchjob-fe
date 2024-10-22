import CompaniesPage from '../pages/Companies'
import HomePage from '../pages/Home'
import JobsPage from '../pages/Jobs'
import SignInPage from '../pages/SignIn'
import SignUpPage from '../pages/SignUp'
import { createBrowserRouter } from 'react-router-dom'

export default function useAppRouter() {
  const appRouter = createBrowserRouter([
    {
      path: '/',
      children: [
        { index: true, element: <HomePage /> },
        { path: '/companies', element: <CompaniesPage /> },
        { path: '/jobs', element: <JobsPage /> },
      ],
    },
    {
      path: '/signup',
      element: <SignUpPage />,
    },
    {
      path: '/signin',
      element: <SignInPage />,
    },
  ])

  return appRouter
}

/*
/ (root)
│
├── "/signin" (SignInPage)
└── "/signup" (SignUpPage)
│
├── LayoutClient
│   ├── "/" (HomePage)
│   ├── "/job" (ClientJobPage)
│   ├── "/job/:id" (ClientJobDetailPage)
│   ├── "/company" (ClientCompanyPage)
│   └── "/company/:id" (ClientCompanyDetailPage)
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
