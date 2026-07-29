import type { SeverityLevel } from './detection.types';

export interface DashboardStats {
  total: number;
  pending: number;
  in_progress: number;
  resolved: number;
}

export interface HeatmapPoint {
  area: string;
  complaint_count: number;
  severity: SeverityLevel;
  latitude: number;
  longitude: number;
}

export interface TrendData {
  day: string;
  count: number;
}
