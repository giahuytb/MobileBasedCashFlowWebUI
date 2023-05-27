import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import React, { useEffect } from 'react';

import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import UserPage from './pages/User/UserPage';
import LoginPage from './pages/User/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardPage/DashboardAppPage';
import ViewEventCard from './pages/EventCard/index';
import ViewJobCard from './pages/JobCard/index';
import GameModPage from './pages/GameMod';
import ViewDream from './pages/Dream';
import ViewGameAccount from './pages/GameAccount';
import ViewAsset from './pages/Asset';

// const ViewEventCard = React.lazy(() => import('./pages/EventCard/index'));

// ----------------------------------------------------------------------

export default function Router() {
  
  const navigate = useNavigate();
  const authToken = localStorage.getItem("authToken");
  const roles = localStorage.getItem("user");
  // Check if the user is authenticated before rendering the dashboard
  useEffect(() => {
    // console.log(localStorage.getItem('user'))
    // console.log(localStorage.getItem('authToken'))
    if (!authToken && roles !== 'Admin') {
      navigate("/login");
    }
  },[authToken, navigate, roles]);

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
        { path: 'gamemod', element: <GameModPage /> },
        { path: 'eventcardlist', element: <ViewEventCard/>},
        { path: 'jobcardlist', element: <ViewJobCard/>},
        { path: 'dreamlist', element: <ViewDream/>},
        { path: 'gameaccountlist', element: <ViewGameAccount/>},
        { path: 'assetList', element: <ViewAsset/>},
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
