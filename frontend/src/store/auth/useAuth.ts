import { useContext } from 'react';
import { AuthContext } from './AuthContext';

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('[useAuth] must be used within <AuthProvider>. Wrap your app or component tree with AuthProvider.');
  }
  return ctx;
}
