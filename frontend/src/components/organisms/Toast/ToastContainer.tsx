import { createPortal } from 'react-dom';
import { useNotification } from '../../../store/notification/useNotification';
import { ToastItem } from './Toast';
import styles from './Toast.module.css';

export function ToastContainer() {
  const { notifications, dismiss } = useNotification();

  if (notifications.length === 0) return null;

  return createPortal(
    <div className={styles.container}>
      {notifications.map(toast => (
        <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
      ))}
    </div>,
    document.body
  );
}
