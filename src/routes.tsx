import { createBrowserRouter } from 'react-router-dom';
import MainLayout from './layouts/mainLayout/MainLayout';
import Dashboard from './pages/dashboard/Dashboard';
import AuthLayout from './layouts/authLayout/AuthLayout';
import Login from './pages/auth/login/Login';
import Registration from './pages/auth/registration/Registration';
import UsersList from './pages/user/usersList/UsersList';
import CompanyList from './pages/company/companyList/CompanyList';
import ProjectList from './pages/project/projectList/ProjectList';
import CompanyLayout from './layouts/companyLayout/CompanyLayout';
import ProjectPage from './pages/project/projectPage/ProjectPage';
import CompanySettings from './pages/company/companySettings/CompanySettings';
import ProjectSettings from './pages/project/projectSettings/ProjectSettings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
      {
        path: 'users',
        element: <UsersList />,
      },
      {
        path: 'companies',
        element: <CompanyList />,
      },
      {
        path: 'companies/:companyId/projects',
        element: <ProjectList />,
      },
      {
        path: 'companies/:companyId/settings',
        element: <CompanySettings />,
      },
    ],
  },
  {
    path: '/companies/:companyId',
    element: <CompanyLayout />,
    children: [
      {
        path: 'project/:projectId',
        element: <ProjectPage />,
      },
      {
        path: 'project/:projectId/settings',
        element: <ProjectSettings />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Registration />,
      },
    ],
  },
]);

export default router;
