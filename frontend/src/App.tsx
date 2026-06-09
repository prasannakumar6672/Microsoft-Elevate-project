import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Loader2 } from 'lucide-react';
import './styles/globals.css';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage'));
const CitizenDashboard = lazy(() => import('./pages/CitizenDashboard'));
const OfficialDashboard = lazy(() => import('./pages/OfficialDashboard'));

function Loader() {
  return (
    <div style={{ background: 'var(--dark)', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <Loader2 style={{ color: 'var(--orange)', animation: 'spin 1s linear infinite' }} size={32} />
      <div style={{ color: 'var(--text)', fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1rem', fontWeight: 600 }}>Loading RoadGuard AI...</div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/citizen/dashboard"
              element={
                <ProtectedRoute requiredRole="citizen">
                  <CitizenDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/official/dashboard"
              element={
                <ProtectedRoute requiredRole="official">
                  <OfficialDashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}
