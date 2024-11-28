import { Navigate } from 'react-router-dom';
import { hasRole } from '../../utils/hasRole';

type ProtectedRouteProps = {
  user: { roles: string[] } | null; // Current user information
  requiredRoles: string | string[]; // Roles required to access the route
  children: React.ReactNode;
  redirectTo?: string; // Redirect path if access is denied
};

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  user,
  requiredRoles,
  children,
  redirectTo = '/auth/login',
}) => {
  const isAuthenticated = hasRole(user, requiredRoles);
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
