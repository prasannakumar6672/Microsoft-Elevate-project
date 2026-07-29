export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/api/v1/auth/login',
    REGISTER: '/api/v1/auth/register',
    REFRESH: '/api/v1/auth/refresh',
  },
  COMPLAINTS: {
    BASE: '/api/v1/complaints',
    MINE: '/api/v1/complaints/mine',
    BY_ID: (id: string) => `/api/v1/complaints/${id}`,
    STATUS: (id: string) => `/api/v1/complaints/${id}/status`,
    RESPOND: (id: string) => `/api/v1/complaints/${id}/respond`,
    RESPONSES: (id: string) => `/api/v1/complaints/${id}/responses`,
  },
  DETECTION: {
    PREDICT: '/api/v1/detect/predict',
    BY_ID: (id: string) => `/api/v1/detect/${id}`,
  },
  DASHBOARD: {
    STATS: '/api/v1/dashboard/stats',
    HEATMAP: '/api/v1/dashboard/heatmap',
    TRENDS: '/api/v1/dashboard/trends',
  },
  TEAMS: {
    BASE: '/api/v1/teams',
    WORK_ORDERS: '/api/v1/teams/work-orders',
  },
} as const;
