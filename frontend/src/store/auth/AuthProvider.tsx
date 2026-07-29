import React, { useReducer, useCallback, useEffect, ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { authReducer, initialAuthState, buildUser } from './auth.reducer';
import { authService } from '../../services/auth.service';
import { tokenStore, userStorage } from '../../lib/storage';
import type { LoginPayload, RegisterPayload } from '../../types/auth.types';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  // ── Rehydrate session from storage on mount ─────────────────────
  useEffect(() => {
    const token = tokenStore.getAccess();
    const storedUser = userStorage.get();
    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);
        dispatch({ type: 'REHYDRATE', payload: user });
      } catch {
        tokenStore.clear();
      }
    }
  }, []);

  // ── Listen for 401 auto-logout event from axios interceptor ────
  useEffect(() => {
    const handleAuthLogout = () => {
      tokenStore.clear();
      dispatch({ type: 'LOGOUT' });
    };
    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, []);

  const login = useCallback(async (payload: LoginPayload) => {
    const data = await authService.login(payload);
    tokenStore.set(data.access_token, data.refresh_token);

    const user = buildUser({
      user_id: data.user_id,
      name: data.name,
      email: payload.email,
      role: data.role,
      region: data.region,
    });

    userStorage.set(JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
    return { role: data.role };
  }, []);

  const register = useCallback(async (payload: RegisterPayload) => {
    const data = await authService.register(payload);
    tokenStore.set(data.access_token, data.refresh_token);

    const user = buildUser({
      user_id: data.user_id,
      name: data.name,
      email: payload.email,
      role: 'citizen',
    });

    userStorage.set(JSON.stringify(user));
    dispatch({ type: 'LOGIN_SUCCESS', payload: user });
  }, []);

  const logout = useCallback(() => {
    tokenStore.clear();
    dispatch({ type: 'LOGOUT' });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
