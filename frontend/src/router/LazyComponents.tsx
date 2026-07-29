import { lazy } from 'react';

/**
 * Lazy-loaded page components for optimal code splitting.
 * Bundles are split so users only download the code they need:
 * - Unauthenticated users don't download dashboard code
 * - Citizens don't download Recharts chart library used in Official dashboard
 */
export const LandingPage = lazy(() => import('../features/landing/pages/LandingPage').then(m => ({ default: m.LandingPage })));
export const LoginPage = lazy(() => import('../features/auth/pages/LoginPage').then(m => ({ default: m.LoginPage })));
export const RegisterPage = lazy(() => import('../features/auth/pages/RegisterPage').then(m => ({ default: m.RegisterPage })));
export const CitizenDashboardPage = lazy(() => import('../features/citizen/pages/CitizenDashboardPage'));
export const OfficialDashboardPage = lazy(() => import('../features/official/pages/OfficialDashboardPage'));
