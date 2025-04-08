import { Navigate } from 'react-router-dom';
import { getUserRole } from '../utils/auth';

const RoleProtectedRoute = ({ children, role }) => {
  const userRole = getUserRole();

  if (!userRole) return <Navigate to="/login" />;
  if (userRole !== role) return <Navigate to={`/${userRole}-dashboard`} />;

  return children;
};

export default RoleProtectedRoute;
