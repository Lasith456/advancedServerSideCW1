import { Navigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserRole } from '../utils/auth';

const RoleProtectedRoute = ({ children, userrole }) => {
  const [role, setRole] = useState(undefined); 
  const location = useLocation();

  useEffect(() => {
    const currentRole = getUserRole();
    setRole(currentRole);
  }, [location.pathname]);

  if (role === undefined) {
    return <div className="text-center py-10 text-gray-500">Checking role...</div>;
  }

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (role !== userrole) {
    return <Navigate to={`/${role}-dashboard`} replace />;
  }

  return children;
};

export default RoleProtectedRoute;
