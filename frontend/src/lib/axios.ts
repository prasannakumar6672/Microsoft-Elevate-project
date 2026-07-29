import axios from 'axios';
import { tokenStore } from './storage';
import { ApiError } from '../types/api.types';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 15000,
});

// ── Request Interceptor — inject auth token ─────────────────────
apiClient.interceptors.request.use((config) => {
  const token = tokenStore.getAccess();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response Interceptor — normalize errors ─────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!error.response) {
      // Network error — no response from server
      throw new ApiError(
        'NETWORK_ERROR',
        'Unable to reach the server. Please check your connection.',
        undefined,
        undefined
      );
    }

    const { status, data } = error.response;

    if (status === 401) {
      // Fire event — AuthProvider listens and calls logout()
      window.dispatchEvent(new Event('auth:logout'));
      throw new ApiError('AUTH_FAILED', 'Session expired. Please login again.', undefined, 401);
    }

    if (status === 404) {
      throw new ApiError('NOT_FOUND', data?.detail || 'Resource not found.', undefined, 404);
    }

    if (status === 422 || status === 400) {
      // Validation error — may contain field info
      const detail = data?.detail;
      const field = Array.isArray(detail) ? detail[0]?.loc?.join('.') : undefined;
      const message = Array.isArray(detail)
        ? detail[0]?.msg
        : typeof detail === 'string'
        ? detail
        : 'Validation failed. Please check your input.';
      throw new ApiError('VALIDATION', message, field, status);
    }

    if (status >= 500) {
      throw new ApiError(
        'SERVER_ERROR',
        'Server error. Please try again in a moment.',
        undefined,
        status
      );
    }

    // Fallback for other HTTP errors
    throw new ApiError('UNKNOWN', data?.detail || 'An unexpected error occurred.', undefined, status);
  }
);
