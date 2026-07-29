import { LucideIcon } from 'lucide-react';
import styles from './DataCard.module.css';

interface DataCardProps {
  icon: LucideIcon;
  value: number | string;
  label: string;
  color?: string;
  shadowColor?: string;
  className?: string;
}

export function DataCard({
  icon: Icon,
  value,
  label,
  color = 'var(--orange)',
  shadowColor = 'rgba(255,92,0,0.12)',
  className = '',
}: DataCardProps) {
  return (
    <div
      className={`${styles.card} ${className}`}
      style={{ boxShadow: `0 12px 32px ${shadowColor}` }}
    >
      <div className={styles.icon} style={{ color }}>
        <Icon size={24} />
      </div>
      <div className={styles.value} style={{ color }}>
        {value}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  );
}
