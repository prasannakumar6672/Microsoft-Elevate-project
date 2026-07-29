import { useNavigate } from 'react-router-dom';
import { AppLogo } from '../../../components/atoms/Logo/AppLogo';
import { Button } from '../../../components/atoms/Button/Button';
import { ROUTES } from '../../../constants/routes';

export function LandingNavbar() {
  const navigate = useNavigate();

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 48px',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 20,
        background: 'linear-gradient(180deg, rgba(10,10,15,0.9) 0%, transparent 100%)',
      }}
    >
      <AppLogo />
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <Button variant="ghost" onClick={() => navigate(ROUTES.LOGIN)}>
          Portal Login
        </Button>
        <Button variant="primary" onClick={() => navigate(ROUTES.REGISTER)}>
          Report Defect Now
        </Button>
      </div>
    </nav>
  );
}
