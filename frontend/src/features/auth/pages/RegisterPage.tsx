import { Link } from 'react-router-dom';
import { AuthLayout } from '../../../components/layout/AuthLayout/AuthLayout';
import { RegisterForm } from '../components/RegisterForm';
import { ROUTES } from '../../../constants/routes';

export function RegisterPage() {
  return (
    <AuthLayout
      title="Citizen Registration"
      subtitle="Join RoadGuard AI to report infrastructure defects"
    >
      <RegisterForm />
      <div style={{ marginTop: 24, textAlign: 'center', fontSize: '0.85rem', color: 'var(--muted)' }}>
        Already registered?{' '}
        <Link to={ROUTES.LOGIN} style={{ color: 'var(--orange)', fontWeight: 600 }}>
          Sign in to portal
        </Link>
      </div>
    </AuthLayout>
  );
}
