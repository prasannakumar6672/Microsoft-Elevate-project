import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';
import styles from './PageBanner.module.css';

interface PageBannerProps {
  icon?: LucideIcon;
  title: ReactNode;
  subtitle?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function PageBanner({ icon: Icon, title, subtitle, action, className = '' }: PageBannerProps) {
  return (
    <div className={`${styles.banner} ${className}`}>
      <div className={styles.glow} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 className={styles.title}>
            {Icon && <Icon size={24} style={{ color: 'var(--orange)' }} />}
            <span>{title}</span>
          </h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        {action}
      </div>
    </div>
  );
}
