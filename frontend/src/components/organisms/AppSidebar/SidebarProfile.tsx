import { MapPin } from 'lucide-react';
import type { User } from '../../../types/auth.types';
import styles from './AppSidebar.module.css';

interface SidebarProfileProps {
  user: User | null;
}

export function SidebarProfile({ user }: SidebarProfileProps) {
  const initial = user?.name?.[0]?.toUpperCase() || 'U';
  const location = user?.region || user?.city || 'Telangana';

  return (
    <div className={styles.profile}>
      <div className={styles.avatar}>{initial}</div>
      <div style={{ overflow: 'hidden' }}>
        <div
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 700,
            fontSize: '0.88rem',
            color: '#fff',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {user?.name || 'User'}
        </div>
        <div
          style={{
            fontSize: '0.72rem',
            color: 'var(--muted)',
            display: 'flex',
            alignItems: 'center',
            gap: 4,
            marginTop: 2,
          }}
        >
          <MapPin size={10} style={{ color: 'var(--orange)' }} />
          <span>{location}</span>
        </div>
      </div>
    </div>
  );
}
