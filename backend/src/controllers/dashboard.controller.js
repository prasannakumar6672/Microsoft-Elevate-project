import { dashboardService } from '../services/dashboard.service.js';

export const getStats = async (req, res) => {
  const result = await dashboardService.getStats(req.user);
  return res.json(result);
};

export const getHeatmap = async (req, res) => {
  const result = await dashboardService.getHeatmapPoints(req.user);
  return res.json(result);
};

export const getTrends = async (req, res) => {
  const result = await dashboardService.getTrends(req.user);
  return res.json(result);
};
