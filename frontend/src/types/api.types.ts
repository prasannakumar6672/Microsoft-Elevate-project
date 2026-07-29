export type ApiErrorCode =
  | 'AUTH_FAILED'
  | 'NOT_FOUND'
  | 'VALIDATION'
  | 'SERVER_ERROR'
  | 'NETWORK_ERROR'
  | 'UNKNOWN';

export class ApiError extends Error {
  code: ApiErrorCode;
  field?: string;
  status?: number;

  constructor(code: ApiErrorCode, message: string, field?: string, status?: number) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.field = field;
    this.status = status;
  }
}

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}
