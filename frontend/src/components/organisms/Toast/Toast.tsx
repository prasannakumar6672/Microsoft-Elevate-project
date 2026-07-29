import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';
import type { Toast as ToastModel } from '../../../store/notification/NotificationContext';
import styles from './Toast.module.css';

interface ToastProps {
  toast: ToastModel;
  onDismiss: (id: string) => void;
}

export function ToastItem({ toast, onDismiss }: ToastProps) {
  const icons = {
    success: <CheckCircle2 size={18} style={{ color: 'var(--green)' }} />,
    error: <AlertCircle size={18} style={{ color: 'var(--red)' }} />,
    warning: <AlertTriangle size={18} style={{ color: 'var(--yellow)' }} />,
    info: <Info size={18} style={{ color: 'var(--blue)' }} />,
  };

  return (
    <div className={`${styles.toast} ${styles[toast.type]}`}>
      {icons[toast.type]}
      <div style={{ flex: 1 }}>{toast.message}</div>
      <button
        onClick={() => onDismiss(toast.id)}
        className={styles.dismissBtn}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
