import { Shield } from 'lucide-react';
import styles from './AppLogo.module.css';

interface AppLogoProps {
  size?: number;
  className?: string;
}

export function AppLogo({ size = 26, className = '' }: AppLogoProps) {
  return (
    <div className={`${styles.logo} ${className}`}>
      <Shield size={size} className={styles.icon} />
      <span className={styles.text}>
        RoadGuard <span className={styles.accent}>AI</span>
      </span>
    </div>
  );
}
