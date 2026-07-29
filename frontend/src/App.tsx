import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './store/auth/AuthProvider';
import { NotificationProvider } from './store/notification/NotificationProvider';
import { AppRouter } from './router/AppRouter';
import { ToastContainer } from './components/organisms/Toast/ToastContainer';
import { Spinner } from './components/atoms/Spinner/Spinner';
import './styles/globals.css';

function PageLoader() {
  return (
    <div
      style={{
        background: 'var(--dark)',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 12,
      }}
    >
      <Spinner size={36} />
      <div
        style={{
          color: 'var(--text)',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontSize: '1rem',
          fontWeight: 600,
        }}
      >
        Loading RoadGuard AI...
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <NotificationProvider>
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <AppRouter />
          </Suspense>
          <ToastContainer />
        </BrowserRouter>
      </NotificationProvider>
    </AuthProvider>
  );
}
