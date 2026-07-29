import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../../store/auth/useAuth';
import { ROUTES } from '../../../constants/routes';
import { ROLES } from '../../../constants/roles';

interface ProtectedRouteProps {
  children: ReactNode;
  requiredRole?: 'citizen' | 'official';
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to their assigned role's dashboard
    const dest = user?.role === ROLES.OFFICIAL ? ROUTES.OFFICIAL_DASHBOARD : ROUTES.CITIZEN_DASHBOARD;
    return <Navigate to={dest} replace />;
  }

  return <>{children}</>;
}
