import { useNavigate } from 'react-router-dom';
import { ArrowRight, Shield } from 'lucide-react';
import { Button } from '../../../components/atoms/Button/Button';
import { ROUTES } from '../../../constants/routes';

export function CtaSection() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        padding: '80px 48px',
        background: 'linear-gradient(135deg, rgba(255,92,0,0.12) 0%, rgba(59,130,246,0.06) 100%)',
        borderTop: '1px solid rgba(255,92,0,0.2)',
        textAlign: 'center',
      }}
    >
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <Shield size={40} style={{ color: 'var(--orange)', marginBottom: 16 }} />
        <h2
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: '2.2rem',
            fontWeight: 800,
            color: '#fff',
            marginBottom: 12,
          }}
        >
          Ready to Report Road Hazards in Your Area?
        </h2>
        <p style={{ color: 'var(--muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: 32 }}>
          Join thousands of citizens making municipal roadways safer. Free, instant AI diagnosis, no registration required to scan.
        </p>
        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => navigate(ROUTES.REGISTER)} style={{ padding: '16px 36px' }}>
            <span>Create Citizen Account</span>
            <ArrowRight size={18} />
          </Button>
          <Button variant="ghost" onClick={() => navigate(ROUTES.LOGIN)}>
            <span>Official Login</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
