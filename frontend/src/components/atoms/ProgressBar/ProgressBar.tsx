import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  progress: number; // 0 to 100
  height?: number;
  className?: string;
}

export function ProgressBar({ progress, height = 6, className = '' }: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={`${styles.track} ${className}`} style={{ height }}>
      <div className={styles.fill} style={{ width: `${clamped}%` }} />
    </div>
  );
}
