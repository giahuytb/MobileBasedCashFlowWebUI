import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import React, { useEffect } from 'react';

import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/User/UserPage';
import LoginPage from './pages/User/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import ViewEventCard from './pages/EventCard/index';
import ViewJobCard from './pages/JobCard/index';

// const ViewEventCard = React.lazy(() => import('./pages/EventCard/index'));

// ----------------------------------------------------------------------

export default function Router() {
  
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  // Check if the user is authenticated before rendering the dashboard
  useEffect(() => {
    console.log("On Checking Access Token...");
    if (!authToken) {
      navigate("/login");
    }
  },[authToken, navigate]);

  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />,
      index: true,
    },

    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true},
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'viewEventCard', element: <ViewEventCard/>},
        { path: 'viewJobCard', element: <ViewJobCard/>},
      ],
    },

    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true},
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },

    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },

  ]);

  return routes;
}
