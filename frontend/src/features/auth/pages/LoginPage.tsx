import { Link } from 'react-router-dom';
import { AuthLayout } from '../../../components/layout/AuthLayout/AuthLayout';
import { LoginForm } from '../components/LoginForm';
import { ROUTES } from '../../../constants/routes';

export function LoginPage() {
  return (
    <AuthLayout
      title="RoadGuard AI Portal"
      subtitle="AI-Powered Civic Road Damage Reporting System"
    >
      <LoginForm />
      <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.85rem', color: 'var(--muted)' }}>
        Don't have a citizen account?{' '}
        <Link to={ROUTES.REGISTER} style={{ color: 'var(--orange)', fontWeight: 600 }}>
          Register here
        </Link>
      </div>
    </AuthLayout>
  );
}
