import { createContext } from 'react';
import type { User } from '../../types/auth.types';
import type { LoginPayload, RegisterPayload } from '../../types/auth.types';

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (payload: LoginPayload) => Promise<{ role: string }>;
  register: (payload: RegisterPayload) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
