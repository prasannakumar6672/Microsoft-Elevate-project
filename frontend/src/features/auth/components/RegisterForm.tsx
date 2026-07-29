import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../store/auth/useAuth';
import { FormField } from '../../../components/molecules/FormField/FormField';
import { Input } from '../../../components/atoms/Input/Input';
import { Button } from '../../../components/atoms/Button/Button';
import { AlertBanner } from '../../../components/molecules/AlertBanner/AlertBanner';
import { Spinner } from '../../../components/atoms/Spinner/Spinner';
import { ROUTES } from '../../../constants/routes';

export function RegisterForm() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Hyderabad',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await register(form);
      navigate(ROUTES.CITIZEN_DASHBOARD);
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Registration failed. Try again.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <AlertBanner type="error">{error}</AlertBanner>}

      <FormField label="Full Name">
        <Input
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          placeholder="e.g. Prasanna Kumar"
          required
        />
      </FormField>

      <FormField label="Email Address">
        <Input
          type="email"
          value={form.email}
          onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
          placeholder="e.g. prasanna@example.com"
          required
        />
      </FormField>

      <FormField label="Phone Number (Optional)">
        <Input
          type="tel"
          value={form.phone}
          onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
          placeholder="+91 98765 43210"
        />
      </FormField>

      <FormField label="City / Region">
        <Input
          value={form.city}
          onChange={e => setForm(f => ({ ...f, city: e.target.value }))}
          placeholder="e.g. Hyderabad"
        />
      </FormField>

      <FormField label="Password">
        <Input
          type="password"
          value={form.password}
          onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
          placeholder="Minimum 6 characters"
          required
          minLength={6}
        />
      </FormField>

      <Button type="submit" fullWidth disabled={loading} style={{ marginTop: 12 }}>
        {loading ? <Spinner size={18} /> : null}
        <span>{loading ? 'Creating Account...' : 'Register Citizen Account'}</span>
      </Button>
    </form>
  );
}
