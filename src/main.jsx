import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './index.css'
import HomePage from './components/HomePage.jsx'
import LoginPage from './components/LoginPage.jsx'
import RegisterPage from './components/Register.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'
import ResetPassword from './components/ResetPassword.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <div>Ooooooooopsie! 404 </div>,
  },
  {
    path: '/auth/login',
    element: <LoginPage />,
  },
  {
   path: '/auth/register',
    element: <RegisterPage />, 
  },
  {
    path: '/auth/forgot-password',
    element: <ForgotPassword />,
  },
  {
     path: '/auth/reset-password',
     element: <ResetPassword />, 
   }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
