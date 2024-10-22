import { RouterProvider } from 'react-router-dom'
import useAppRouter from './hooks/useAppRouter'

function App() {
  const router = useAppRouter()
  return <RouterProvider router={router} />
}

export default App
