import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query' // For React Query
import Home from '../src/Pages/Home/Home'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from 'react-router-dom'
import Login from './Auth/Login'
import Register from './Auth/Register'
import { check_token } from './Auth/authslice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react'
import Jobs from './Pages/Jobs/Jobs';
import Categorydetails from './Pages/Jobs/Categorydetails';
import Employmentstatusdetails from './Pages/Jobs/Employmentstatusdetails';
import Experiencedetails from './Pages/Jobs/Experiencedetails';
import Locationdetails from './Pages/Jobs/Locationdetails';
import Jobdetails from './Pages/Jobs/Jobdetails';
import Verifyotp from './Auth/Verifyotp';
import Applynow from './Pages/Jobs/Applynow';
import Dashboard from './Auth/Dashboard';
import Emailverify from './Auth/Emailverify';
import Forgetpassword from './Auth/Forgetpassword';
import Updatepassword from './Auth/Updatepassword';
import Team from './Pages/Home/Team';


const App = () => {

  const dispatch = useDispatch();
  // Create Query Client For React Query
  const queryClient = new QueryClient()


  //check token avable or not
  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/signin" />
    );
  }

  const private_routing = [
    {
      path: '/categorydetails/:slug',
      component: <Categorydetails />
    },
    {
      path: '/employmentstatusdetails/:slug',
      component: <Employmentstatusdetails />
    },
    {
      path: '/experiencedetails/:slug',
      component: <Experiencedetails />
    },
    {
      path: '/locationdetails/:slug',
      component: <Locationdetails />
    },
    {
      path: '/jobdetails/:id',
      component: <Jobdetails />
    },
    {
      path: '/applynow/:id',
      component: <Applynow />
    },
    {
      path: '/dashboard',
      component: <Dashboard />
    },
    {
      path: '/updatepassword',
      component: <Updatepassword />
    }

  ]

  const public_routing = [
    {
      path: '/',
      component: <Home />
    },
    {
      path: '/team',
      component: <Team/>
    },
    {
      path: '/jobs',
      component: <Jobs />
    },
    {
      path: '/signin',
      component: <Login />
    },
    {
      path: '/signup',
      component: <Register />
    },
    {
      path: '/forgetpassword/:id/:token',
      component: <Forgetpassword />
    },
    {
      path: '/verifyotp',
      component: <Verifyotp />
    },
    {
      path: '/emailverify',
      component: <Emailverify />
    }

  ]

  // This step is required for to stop page refreshing problem in logout button
  useEffect(() => {
    dispatch(check_token())
  }, [])

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      {/*Cover with QueryClientProvider*/}
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>

            {/*Area of private routing*/}
            {public_routing?.map((routing) => {
              return (
                <>
                  <Route path={routing?.path} element={routing?.component} />
                </>
              )
            })}


            {/*Area of public routing*/}
            {private_routing?.map((routing) => {
              return (
                <>
                  <Route path={routing?.path} element={<PrivateRoute>{routing?.component}</PrivateRoute>} />
                </>
              )
            })}

          </Routes>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App