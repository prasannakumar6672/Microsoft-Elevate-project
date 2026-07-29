import type { ROLES } from '../constants/roles';

export type Role = typeof ROLES[keyof typeof ROLES];

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  region?: string;
  city?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone?: string;
  password: string;
  city?: string;
}

export interface TokenPair {
  access_token: string;
  refresh_token: string;
}

export interface LoginResponse extends TokenPair {
  user_id: string;
  name: string;
  role: Role;
  region?: string;
}

export type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'REHYDRATE'; payload: User };
