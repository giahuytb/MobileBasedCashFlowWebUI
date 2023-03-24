import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
// layouts
import { useEffect } from 'react';
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import EventCardsPage from './pages/EventCardsPage';
import ListPage from './pages/ListPage';


// ----------------------------------------------------------------------

export default function Router() {
  
  const navigate = useNavigate();

  // Check if the user is authenticated before rendering the dashboard
  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      navigate("/login");
    }
  });

  const routes = useRoutes([
    {
      path: '/login',
      element: <LoginPage />
    },

    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'eventcard', element: <EventCardsPage /> ,
        //   children: [{
        //   path: 'listpage',
        //   element: <ListPage/>
        // },],},
      },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: '/listpage',
      element: <ListPage/>
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
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
