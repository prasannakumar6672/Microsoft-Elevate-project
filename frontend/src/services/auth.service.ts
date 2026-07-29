import { apiClient } from '../lib/axios';
import { API_ENDPOINTS } from '../constants/api.endpoints';
import type { LoginPayload, RegisterPayload, LoginResponse } from '../types/auth.types';

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.LOGIN, payload);
    return res.data;
  },

  async register(payload: RegisterPayload): Promise<LoginResponse> {
    const res = await apiClient.post<LoginResponse>(API_ENDPOINTS.AUTH.REGISTER, payload);
    return res.data;
  },
};
