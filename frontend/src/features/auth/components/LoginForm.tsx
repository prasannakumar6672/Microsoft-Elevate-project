import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/auth/useAuth';
import { RoleTabSelector } from './RoleTabSelector';
import { DemoFillButton } from './DemoFillButton';
import { FormField } from '../../../components/molecules/FormField/FormField';
import { Input } from '../../../components/atoms/Input/Input';
import { Button } from '../../../components/atoms/Button/Button';
import { AlertBanner } from '../../../components/molecules/AlertBanner/AlertBanner';
import { Spinner } from '../../../components/atoms/Spinner/Spinner';
import { ROUTES } from '../../../constants/routes';
import { ROLES } from '../../../constants/roles';

export function LoginForm() {
  const [role, setRole] = useState<'citizen' | 'official'>('citizen');
  const [email, setEmail] = useState('prasanna@test.com');
  const [password, setPassword] = useState('Test@123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRoleChange = (newRole: 'citizen' | 'official') => {
    setRole(newRole);
    if (newRole === 'citizen') {
      setEmail('prasanna@test.com');
      setPassword('Test@123');
    } else {
      setEmail('ravi@telangana.gov.in');
      setPassword('Official@123');
    }
  };

  const handleFillDemo = () => {
    if (role === 'citizen') {
      setEmail('prasanna@test.com');
      setPassword('Test@123');
    } else {
      setEmail('ravi@telangana.gov.in');
      setPassword('Official@123');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const res = await login({ email, password });
      if (res.role === ROLES.OFFICIAL) {
        navigate(ROUTES.OFFICIAL_DASHBOARD);
      } else {
        navigate(ROUTES.CITIZEN_DASHBOARD);
      }
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Login failed. Check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <RoleTabSelector role={role} onChange={handleRoleChange} />

      {error && <AlertBanner type="error">{error}</AlertBanner>}

      <FormField label="Email Address">
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your.email@example.com"
          required
        />
      </FormField>

      <FormField label="Password">
        <Input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="••••••••"
          required
        />
      </FormField>

      <DemoFillButton onFill={handleFillDemo} />

      <Button type="submit" fullWidth disabled={loading} style={{ marginTop: 8 }}>
        {loading ? <Spinner size={18} /> : null}
        <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
      </Button>
    </form>
  );
}
