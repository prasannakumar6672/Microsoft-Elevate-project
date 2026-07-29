import React, { ReactNode } from 'react';
import { Inbox } from 'lucide-react';
import styles from './EmptyState.module.css';

interface EmptyStateProps {
  icon?: React.ElementType;
  title?: string;
  message?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  icon: Icon = Inbox,
  title = 'No Data Found',
  message = 'There are no records matching your request at this time.',
  action,
  className = '',
}: EmptyStateProps) {
  return (
    <div className={`${styles.container} ${className}`}>
      <Icon size={40} className={styles.icon} />
      <h4 className={styles.title}>{title}</h4>
      <p className={styles.message}>{message}</p>
      {action}
    </div>
  );
}
