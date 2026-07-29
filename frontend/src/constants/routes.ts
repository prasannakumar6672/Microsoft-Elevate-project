export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  CITIZEN_DASHBOARD: '/citizen/dashboard',
  OFFICIAL_DASHBOARD: '/official/dashboard',
} as const;

export type AppRoute = typeof ROUTES[keyof typeof ROUTES];
