import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import HomePage from './components/HomePage.jsx'
import LoginPage from './components/LoginPage.jsx'
import RegisterPage from './components/Register.jsx'
import ForgotPassword from './components/ForgotPassword.jsx'

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
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
