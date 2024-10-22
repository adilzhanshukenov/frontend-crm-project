import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/mainLayout/MainLayout";
import Dashboard from "./pages/dashboard/Dashboard";
import AuthLayout from "./layouts/authLayout/AuthLayout";
import Login from "./pages/login/Login";
import Registration from "./pages/registration/Registration";
import UsersList from "./pages/usersList/UsersList";
import CompanyList from "./pages/companyList/CompanyList";
import ProjectList from "./pages/projectList/ProjectList";


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        children: [
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'users',
                element: <UsersList />
            },
            {
                path: 'companies',
                element: <CompanyList />
            },
            {
                path: 'companies/:companyId/projects',
                element: <ProjectList />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: 'login',
                element: <Login />
            },
            {
                path: 'register',
                element: <Registration />
            }
        ]
    }
])

export default router;