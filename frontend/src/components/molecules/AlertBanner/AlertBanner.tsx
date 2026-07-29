import React, { ReactNode } from 'react';
import { AlertCircle, AlertTriangle, Info, CheckCircle } from 'lucide-react';
import styles from './AlertBanner.module.css';

interface AlertBannerProps {
  type?: 'error' | 'warning' | 'info' | 'success';
  children: ReactNode;
  className?: string;
}

export function AlertBanner({ type = 'error', children, className = '' }: AlertBannerProps) {
  const icons = {
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
    success: CheckCircle,
  };

  const Icon = icons[type];

  return (
    <div className={`${styles.alert} ${styles[type]} ${className}`}>
      <Icon size={18} style={{ flexShrink: 0 }} />
      <div>{children}</div>
    </div>
  );
}
