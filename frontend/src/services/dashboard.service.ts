import { apiClient } from '../lib/axios';
import { API_ENDPOINTS } from '../constants/api.endpoints';
import type { DashboardStats, HeatmapPoint, TrendData } from '../types/dashboard.types';

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const res = await apiClient.get<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS);
    return res.data;
  },

  async getHeatmap(): Promise<HeatmapPoint[]> {
    const res = await apiClient.get<HeatmapPoint[]>(API_ENDPOINTS.DASHBOARD.HEATMAP);
    return res.data;
  },

  async getTrends(): Promise<TrendData[]> {
    const res = await apiClient.get<TrendData[]>(API_ENDPOINTS.DASHBOARD.TRENDS);
    return res.data;
  },
};
