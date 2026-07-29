import React, { ReactNode } from 'react';
import { AppSidebar } from '../../organisms/AppSidebar/AppSidebar';
import { NavItemConfig } from '../../organisms/AppSidebar/SidebarNavItem';
import { useAuth } from '../../../store/auth/useAuth';
import styles from './DashboardLayout.module.css';

interface DashboardLayoutProps {
  navItems: NavItemConfig[];
  activeTab: string;
  onTabChange: (id: string) => void;
  children: ReactNode;
}

export function DashboardLayout({
  navItems,
  activeTab,
  onTabChange,
  children,
}: DashboardLayoutProps) {
  const { user, logout } = useAuth();

  return (
    <div className={`mesh-bg ${styles.container}`}>
      <AppSidebar
        navItems={navItems}
        activeTab={activeTab}
        onTabChange={onTabChange}
        user={user}
        onLogout={logout}
      />
      <main className={`glass glass-glow-blue ${styles.main}`}>
        {children}
      </main>
    </div>
  );
}
