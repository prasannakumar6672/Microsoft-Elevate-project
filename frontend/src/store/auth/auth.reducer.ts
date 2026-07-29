import type { AuthState, AuthAction, User } from '../../types/auth.types';

export const initialAuthState: AuthState = {
  user: null,
  isAuthenticated: false,
};

export function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REHYDRATE':
      return {
        user: action.payload,
        isAuthenticated: true,
      };
    case 'LOGOUT':
      return initialAuthState;
    default:
      return state;
  }
}

// Helper to build a User from login response fields
export function buildUser(data: {
  user_id: string;
  name: string;
  email: string;
  role: User['role'];
  region?: string;
}): User {
  return {
    id: data.user_id,
    name: data.name,
    email: data.email,
    role: data.role,
    region: data.region,
  };
}
