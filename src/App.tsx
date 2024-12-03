import { RouterProvider } from 'react-router-dom'
import useAppRouter from './hooks/useAppRouter'
import { Toaster } from './components/ui/toaster'
import { useEffect } from 'react'
import { useAuthStore } from './store/authStore'

function App() {
  const router = useAppRouter()

  const authCheck = useAuthStore((state) => state.authCheck)
  useEffect(() => {
    authCheck()
  }, [authCheck])

  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  )
}

export default App
