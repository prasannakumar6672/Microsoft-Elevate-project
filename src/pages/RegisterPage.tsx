import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', phone: '', password: '', city: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(f => ({ ...f, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await register(form);
            navigate('/citizen/dashboard');
        } catch (err: any) {
            setError(err?.response?.data?.detail || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--dark)', padding: '24px',
            backgroundImage: `linear-gradient(rgba(255,92,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,92,0,0.03) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
        }}>
            <div style={{ width: '100%', maxWidth: 440 }}>
                <div style={{ textAlign: 'center', marginBottom: 28 }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '1.8rem' }}>🛡️</span>
                        <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.4rem' }}>RoadGuard <span style={{ color: 'var(--orange)' }}>AI</span></span>
                    </Link>
                </div>

                <div style={{
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 20, padding: '36px 32px',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                }}>
                    <h2 style={{ fontFamily: 'Syne', fontSize: '1.5rem', marginBottom: 6 }}>Create Citizen Account</h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 26 }}>
                        Join RoadGuard AI to report road damage in your city.
                    </p>

                    <form onSubmit={handleSubmit}>
                        {[
                            { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Prasanna Kumar' },
                            { name: 'email', label: 'Email', type: 'email', placeholder: 'prasanna@mail.com' },
                            { name: 'phone', label: 'Phone Number', type: 'tel', placeholder: '9876543210' },
                            { name: 'city', label: 'City / Area', type: 'text', placeholder: 'Hyderabad' },
                            { name: 'password', label: 'Password', type: 'password', placeholder: '••••••••' },
                        ].map(field => (
                            <div key={field.name} style={{ marginBottom: 14 }}>
                                <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', marginBottom: 6 }}>{field.label}</label>
                                <input
                                    className="input"
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={form[field.name as keyof typeof form]}
                                    onChange={handleChange}
                                    required={field.name !== 'phone' && field.name !== 'city'}
                                />
                            </div>
                        ))}

                        {error && (
                            <div style={{
                                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                                borderRadius: 8, padding: '10px 14px', marginBottom: 16,
                                color: 'var(--red)', fontSize: '0.85rem',
                            }}>{error}</div>
                        )}
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: 14, marginTop: 6 }}>
                            {loading ? '⏳ Registering...' : 'Create Account →'}
                        </button>
                    </form>

                    <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', marginTop: 20 }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: 'var(--orange)', fontWeight: 500 }}>Login →</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
