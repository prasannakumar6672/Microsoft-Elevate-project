import React, { ReactNode } from 'react';
import styles from './InfoRow.module.css';

interface InfoRowProps {
  label: string;
  value: ReactNode;
  className?: string;
}

export function InfoRow({ label, value, className = '' }: InfoRowProps) {
  return (
    <div className={`${styles.row} ${className}`}>
      <div className={styles.label}>{label}</div>
      <div className={styles.value}>{value ?? '—'}</div>
    </div>
  );
}
