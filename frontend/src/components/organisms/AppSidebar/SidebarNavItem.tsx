import { LucideIcon } from 'lucide-react';
import styles from './AppSidebar.module.css';

export interface NavItemConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  badge?: number;
}

interface SidebarNavItemProps {
  item: NavItemConfig;
  isActive: boolean;
  onClick: () => void;
}

export function SidebarNavItem({ item, isActive, onClick }: SidebarNavItemProps) {
  const Icon = item.icon;

  return (
    <button
      onClick={onClick}
      className={`${styles.navItem} ${isActive ? styles.active : ''}`}
      type="button"
    >
      <Icon size={18} />
      <span style={{ flex: 1 }}>{item.label}</span>
      {item.badge !== undefined && item.badge > 0 && (
        <span
          style={{
            background: isActive ? 'rgba(255,255,255,0.2)' : 'var(--orange)',
            color: '#fff',
            fontSize: '0.7rem',
            fontWeight: 800,
            padding: '2px 7px',
            borderRadius: 10,
          }}
        >
          {item.badge}
        </span>
      )}
    </button>
  );
}
