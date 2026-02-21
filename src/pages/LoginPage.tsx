import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
    const [tab, setTab] = useState<'citizen' | 'official'>('citizen');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { role } = await login(email, password);
            if (role === 'citizen') navigate('/citizen/dashboard');
            else navigate('/official/dashboard');
        } catch (err: any) {
            setError(err?.response?.data?.detail || 'Invalid credentials. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const fillDemo = (type: 'citizen' | 'official') => {
        if (type === 'citizen') { setEmail('prasanna@test.com'); setPassword('Test@123'); }
        else { setEmail('ravi@telangana.gov.in'); setPassword('Official@123'); }
    };

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'var(--dark)', padding: '24px',
            backgroundImage: `
        linear-gradient(rgba(255,92,0,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,92,0,0.03) 1px, transparent 1px)
      `,
            backgroundSize: '60px 60px',
        }}>
            <div style={{ width: '100%', maxWidth: 440 }}>
                {/* Logo */}
                <div style={{ textAlign: 'center', marginBottom: 32 }}>
                    <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ fontSize: '1.8rem' }}>🛡️</span>
                        <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.4rem' }}>
                            RoadGuard <span style={{ color: 'var(--orange)' }}>AI</span>
                        </span>
                    </Link>
                </div>

                {/* Card */}
                <div style={{
                    background: 'var(--card)', border: '1px solid var(--border)',
                    borderRadius: 20, padding: '36px 32px',
                    boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
                }}>
                    {/* Tabs */}
                    <div style={{
                        display: 'flex', background: 'var(--dark2)',
                        borderRadius: 10, padding: 4, marginBottom: 28,
                    }}>
                        {(['citizen', 'official'] as const).map(t => (
                            <button key={t} onClick={() => setTab(t)} style={{
                                flex: 1, padding: '10px', border: 'none', borderRadius: 7,
                                fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem',
                                cursor: 'pointer', transition: 'all 0.2s',
                                background: tab === t ? 'var(--orange)' : 'transparent',
                                color: tab === t ? '#fff' : 'var(--muted)',
                            }}>
                                {t === 'citizen' ? "👤 I'm a Citizen" : "🏛 I'm a Government Official"}
                            </button>
                        ))}
                    </div>

                    <h2 style={{ fontFamily: 'Syne', fontSize: '1.5rem', marginBottom: 6 }}>
                        {tab === 'citizen' ? 'Citizen Login' : 'Official Login'}
                    </h2>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 24 }}>
                        {tab === 'citizen'
                            ? 'Log in to report road damage in your area.'
                            : 'Access restricted to pre-registered government officials.'}
                    </p>

                    {/* Demo fill */}
                    <button onClick={() => fillDemo(tab)} style={{
                        width: '100%', marginBottom: 18, padding: '9px',
                        background: 'rgba(255,92,0,0.08)', border: '1px dashed rgba(255,92,0,0.3)',
                        borderRadius: 8, color: 'var(--orange)', fontSize: '0.8rem',
                        fontFamily: 'DM Sans', cursor: 'pointer',
                    }}>
                        ⚡ Fill Demo Credentials
                    </button>

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: 14 }}>
                            <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', marginBottom: 6 }}>Email</label>
                            <input
                                type="email" className="input" required
                                placeholder={tab === 'citizen' ? 'prasanna@test.com' : 'officer@telangana.gov.in'}
                                value={email} onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div style={{ marginBottom: 20 }}>
                            <label style={{ display: 'block', color: 'var(--muted)', fontSize: '0.8rem', marginBottom: 6 }}>Password</label>
                            <input
                                type="password" className="input" required
                                placeholder="••••••••"
                                value={password} onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        {error && (
                            <div style={{
                                background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)',
                                borderRadius: 8, padding: '10px 14px', marginBottom: 16,
                                color: 'var(--red)', fontSize: '0.85rem',
                            }}>{error}</div>
                        )}
                        <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center', padding: 14 }}>
                            {loading ? '⏳ Logging in...' : `Login as ${tab === 'citizen' ? 'Citizen' : 'Official'} →`}
                        </button>
                    </form>

                    {tab === 'citizen' && (
                        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem', marginTop: 20 }}>
                            New citizen?{' '}
                            <Link to="/register" style={{ color: 'var(--orange)', fontWeight: 500 }}>Create account →</Link>
                        </p>
                    )}
                    {tab === 'official' && (
                        <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.8rem', marginTop: 18, lineHeight: 1.5 }}>
                            Official accounts are pre-registered by admin only.
                        </p>
                    )}
                </div>

                <p style={{ textAlign: 'center', color: 'var(--muted)', fontSize: '0.78rem', marginTop: 20 }}>
                    <Link to="/" style={{ color: 'var(--muted)' }}>← Back to Home</Link>
                </p>
            </div>
        </div>
    );
}
