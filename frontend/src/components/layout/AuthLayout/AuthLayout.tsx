import React, { ReactNode } from 'react';
import { AppLogo } from '../../atoms/Logo/AppLogo';
import styles from './AuthLayout.module.css';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
  return (
    <div className={`mesh-bg ${styles.container}`}>
      <div className={`glass glass-glow-orange ${styles.card}`}>
        <div className={styles.brandHeader}>
          <AppLogo size={32} />
        </div>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.subtitle}>{subtitle}</p>
        {children}
      </div>
    </div>
  );
}
