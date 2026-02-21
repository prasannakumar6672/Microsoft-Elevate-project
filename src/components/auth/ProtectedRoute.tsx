import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
    requiredRole: 'citizen' | 'official';
}

export function ProtectedRoute({ children, requiredRole }: Props) {
    const { isAuthenticated, user } = useAuth();
    if (!isAuthenticated || !user) return <Navigate to="/login" replace />;
    if (user.role !== requiredRole) {
        return <Navigate to={user.role === 'citizen' ? '/citizen/dashboard' : '/official/dashboard'} replace />;
    }
    return <>{children}</>;
}
