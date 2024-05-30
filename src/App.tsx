import {
  RouterProvider
} from 'react-router-dom'
import { router } from "./routes/router"
import { AuthProvider } from './context/AuthContent'
import { Toaster } from 'react-hot-toast'

function App() {
  return <AuthProvider>
    <Toaster position='bottom-right' /> 
    <RouterProvider router={router} />
  </AuthProvider>
}

export default App