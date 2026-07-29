import { createContext } from 'react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration: number;
}

export interface NotifyOptions {
  type: ToastType;
  message: string;
  duration?: number;
}

export interface NotificationContextType {
  notifications: Toast[];
  notify: (options: NotifyOptions) => void;
  dismiss: (id: string) => void;
}

export const NotificationContext = createContext<NotificationContextType | null>(null);
