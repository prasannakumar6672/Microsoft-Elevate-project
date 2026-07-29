import { Routes, Route, Navigate } from 'react-router-dom';
import { ROUTE_CONFIGS } from './routes.config';
import { ProtectedRoute } from '../features/auth/guards/ProtectedRoute';
import { ROUTES } from '../constants/routes';

export function AppRouter() {
  return (
    <Routes>
      {ROUTE_CONFIGS.map(route => {
        const Component = route.component;

        if (route.isPublic) {
          return <Route key={route.path} path={route.path} element={<Component />} />;
        }

        return (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectedRoute requiredRole={route.requiredRole}>
                <Component />
              </ProtectedRoute>
            }
          />
        );
      })}

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  );
}
