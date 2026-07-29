import { LogOut } from 'lucide-react';
import { AppLogo } from '../../atoms/Logo/AppLogo';
import { SidebarProfile } from './SidebarProfile';
import { SidebarNavItem, NavItemConfig } from './SidebarNavItem';
import type { User } from '../../../types/auth.types';
import styles from './AppSidebar.module.css';

interface AppSidebarProps {
  navItems: NavItemConfig[];
  activeTab: string;
  onTabChange: (id: string) => void;
  user: User | null;
  onLogout: () => void;
  className?: string;
}

export function AppSidebar({
  navItems,
  activeTab,
  onTabChange,
  user,
  onLogout,
  className = '',
}: AppSidebarProps) {
  return (
    <aside className={`glass glass-glow-orange ${styles.sidebar} ${className}`}>
      {/* Branding */}
      <div style={{ padding: '0 8px' }}>
        <AppLogo />
      </div>

      {/* Profile module */}
      <SidebarProfile user={user} />

      {/* Navigation menu */}
      <nav className={styles.nav}>
        {navItems.map(item => (
          <SidebarNavItem
            key={item.id}
            item={item}
            isActive={activeTab === item.id}
            onClick={() => onTabChange(item.id)}
          />
        ))}
      </nav>

      {/* Logout Button */}
      <button className="btn-ghost" onClick={onLogout} style={{ justifyContent: 'center', width: '100%' }}>
        <LogOut size={16} />
        <span>Logout</span>
      </button>
    </aside>
  );
}
