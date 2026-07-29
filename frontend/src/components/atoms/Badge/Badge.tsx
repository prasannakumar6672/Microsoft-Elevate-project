import React, { ReactNode } from 'react';
import styles from './Badge.module.css';

export interface BadgeProps {
  children: ReactNode;
  bg?: string;
  color?: string;
  borderColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  children,
  bg = 'rgba(255, 255, 255, 0.05)',
  color = 'var(--text)',
  borderColor = 'var(--border)',
  className = '',
  style,
}: BadgeProps) {
  return (
    <span
      className={`${styles.badge} ${className}`}
      style={{
        background: bg,
        color,
        border: `1px solid ${borderColor}`,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
