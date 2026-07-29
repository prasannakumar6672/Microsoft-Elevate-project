import React, { useState, useCallback, ReactNode } from 'react';
import { NotificationContext } from './NotificationContext';
import type { Toast, NotifyOptions } from './NotificationContext';

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Toast[]>([]);

  const notify = useCallback((options: NotifyOptions) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const toast: Toast = {
      id,
      type: options.type,
      message: options.message,
      duration: options.duration ?? 4000,
    };
    setNotifications(prev => [...prev, toast]);

    // Auto-dismiss after duration
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, toast.duration);
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  return (
    <NotificationContext.Provider value={{ notifications, notify, dismiss }}>
      {children}
    </NotificationContext.Provider>
  );
}
