/**
 * lib/demo.interceptor.ts
 *
 * Axios adapter that intercepts requests and returns mock data.
 * This module is ONLY imported when VITE_DEMO_MODE=true.
 *
 * Usage in main.tsx:
 *   if (import.meta.env.VITE_DEMO_MODE === 'true') {
 *     import('./lib/demo.interceptor').then(m => m.installDemoInterceptor());
 *   }
 */

import { apiClient } from './axios';
import {
  DEMO_USERS, DEMO_COMPLAINTS, DEMO_STATS,
  DEMO_TRENDS, DEMO_HEATMAP, DEMO_TEAMS, DEMO_DETECTION,
} from './demo.data';
import { API_ENDPOINTS } from '../constants/api.endpoints';

function delay(ms = 200): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms + Math.random() * 200));
}

function makeResponse<T>(data: T) {
  return { data, status: 200, statusText: 'OK', headers: {}, config: {} as never };
}

export function installDemoInterceptor(): void {
  apiClient.interceptors.request.use(async (config) => {
    const url = config.url ?? '';
    const method = (config.method ?? 'get').toLowerCase();
    await delay();

    // AUTH
    if (url === API_ENDPOINTS.AUTH.LOGIN && method === 'post') {
      const body = config.data ? JSON.parse(config.data) : {};
      const user = DEMO_USERS[body.email?.toLowerCase()?.trim()];
      if (!user || user.password !== body.password) {
        const err = new Error('Invalid credentials') as never;
        (err as never as { response: unknown }).response = {
          status: 401, data: { detail: 'Invalid email or password.' },
        };
        throw err;
      }
      config.adapter = async () => makeResponse({
        access_token: 'demo-token',
        refresh_token: 'demo-refresh',
        user_id: user.user_id,
        name: user.name,
        role: user.role,
        region: user.region,
      });
      return config;
    }

    if (url === API_ENDPOINTS.AUTH.REGISTER && method === 'post') {
      const body = config.data ? JSON.parse(config.data) : {};
      config.adapter = async () => makeResponse({
        access_token: 'demo-token',
        refresh_token: 'demo-refresh',
        user_id: 'demo-new-' + Date.now(),
        name: body.name || 'New User',
        role: 'citizen',
      });
      return config;
    }

    // COMPLAINTS — mine
    if (url === API_ENDPOINTS.COMPLAINTS.MINE && method === 'get') {
      config.adapter = async () => makeResponse(DEMO_COMPLAINTS);
      return config;
    }

    // COMPLAINTS — all
    if (url === API_ENDPOINTS.COMPLAINTS.BASE && method === 'get') {
      config.adapter = async () => makeResponse(DEMO_COMPLAINTS);
      return config;
    }

    // COMPLAINTS — create
    if (url === API_ENDPOINTS.COMPLAINTS.BASE && method === 'post') {
      const newComplaint = {
        ...DEMO_COMPLAINTS[0],
        id: 'new-' + Date.now(),
        complaint_number: 'RG-' + Math.floor(2400 + Math.random() * 100),
        status: 'Pending' as const,
        created_at: new Date().toISOString(),
      };
      config.adapter = async () => makeResponse(newComplaint);
      return config;
    }

    // COMPLAINTS — responses
    if (url.includes('/respond') || url.includes('/responses')) {
      config.adapter = async () => makeResponse([]);
      return config;
    }

    // DETECTION
    if (url === API_ENDPOINTS.DETECTION.PREDICT && method === 'post') {
      config.adapter = async () => makeResponse({
        ...DEMO_DETECTION,
        detection_id: 'demo-' + Date.now(),
      });
      return config;
    }

    // DASHBOARD
    if (url === API_ENDPOINTS.DASHBOARD.STATS) {
      config.adapter = async () => makeResponse(DEMO_STATS);
      return config;
    }
    if (url === API_ENDPOINTS.DASHBOARD.TRENDS) {
      config.adapter = async () => makeResponse(DEMO_TRENDS);
      return config;
    }
    if (url === API_ENDPOINTS.DASHBOARD.HEATMAP) {
      config.adapter = async () => makeResponse(DEMO_HEATMAP);
      return config;
    }

    // TEAMS
    if (url === API_ENDPOINTS.TEAMS.BASE && method === 'get') {
      config.adapter = async () => makeResponse(DEMO_TEAMS);
      return config;
    }
    if (url === API_ENDPOINTS.TEAMS.WORK_ORDERS) {
      config.adapter = async () => makeResponse([]);
      return config;
    }

    return config;
  });

  console.info('[RoadGuard AI] Demo mode active — all API calls intercepted');
}
