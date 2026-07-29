import styles from './PulseDot.module.css';

interface PulseDotProps {
  color?: 'green' | 'red' | 'orange';
  className?: string;
}

export function PulseDot({ color = 'green', className = '' }: PulseDotProps) {
  return <span className={`${styles.dot} ${styles[color]} ${className}`} />;
}
