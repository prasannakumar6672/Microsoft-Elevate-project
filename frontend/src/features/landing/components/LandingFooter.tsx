import { AppLogo } from '../../../components/atoms/Logo/AppLogo';

export function LandingFooter() {
  return (
    <footer
      style={{
        background: 'var(--dark2)',
        borderTop: '1px solid var(--border)',
        padding: '36px 48px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
      }}
    >
      <AppLogo size={20} />
      <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
        © {new Date().getFullYear()} RoadGuard AI Systems • AI Road Damage & Civic Complaint Platform
      </div>
    </footer>
  );
}
