import { getComplaintRepository } from '../repositories/index.js';

const REGION_CENTROIDS = {
  Kukatpally: { lat: 17.4849, lng: 78.3889 },
  Mehdipatnam: { lat: 17.3916, lng: 78.4385 },
  Gachibowli: { lat: 17.4401, lng: 78.3489 },
  'Hitech City': { lat: 17.4435, lng: 78.3772 },
  Secunderabad: { lat: 17.4399, lng: 78.4983 },
  Begumpet: { lat: 17.4447, lng: 78.4664 },
};

export class DashboardService {
  async getStats(user) {
    const complaintRepo = getComplaintRepository();
    const query = {};
    if (user.role === 'official' && user.region) {
      query.region = user.region;
    }
    return await complaintRepo.countStats(query);
  }

  async getHeatmapPoints(user) {
    const complaintRepo = getComplaintRepository();
    const queryFilters = {};
    if (user.role === 'official' && user.region) {
      queryFilters.region = user.region;
    }

    const complaints = await complaintRepo.findAll(queryFilters);
    const heatmapGroups = {};

    for (const comp of complaints) {
      const areaName = comp.region || 'Kukatpally';
      const lat =
        comp.latitude || (REGION_CENTROIDS[areaName]?.lat || 17.4849) + (Math.random() - 0.5) * 0.01;
      const lng =
        comp.longitude || (REGION_CENTROIDS[areaName]?.lng || 78.3889) + (Math.random() - 0.5) * 0.01;

      if (!heatmapGroups[areaName]) {
        heatmapGroups[areaName] = {
          area: `${areaName} Sector`,
          complaint_count: 0,
          severity: 'LOW',
          latitude: lat,
          longitude: lng,
          highCount: 0,
        };
      }

      heatmapGroups[areaName].complaint_count += 1;
      if (comp.severity_level === 'HIGH') {
        heatmapGroups[areaName].highCount += 1;
      }
    }

    const heatmapData = Object.values(heatmapGroups).map(group => {
      const ratio = group.highCount / group.complaint_count;
      group.severity = ratio > 0.4 ? 'HIGH' : ratio > 0.1 ? 'MEDIUM' : 'LOW';
      delete group.highCount;
      return group;
    });

    if (heatmapData.length === 0) {
      const defaultRegion = user.region || 'Kukatpally';
      const defaultCentroid = REGION_CENTROIDS[defaultRegion] || REGION_CENTROIDS['Kukatpally'];
      heatmapData.push({
        area: `${defaultRegion} Sector A`,
        complaint_count: 0,
        severity: 'LOW',
        latitude: defaultCentroid.lat,
        longitude: defaultCentroid.lng,
      });
    }

    return heatmapData;
  }

  async getTrends(user) {
    const complaintRepo = getComplaintRepository();
    const queryFilters = {};
    if (user.role === 'official' && user.region) {
      queryFilters.region = user.region;
    }

    const complaints = await complaintRepo.findAll(queryFilters);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const trendMap = {};

    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayName = daysOfWeek[d.getDay()];
      last7Days.push(dayName);
      trendMap[dayName] = 0;
    }

    for (const comp of complaints) {
      const dateVal = comp.created_at || comp.createdAt;
      if (dateVal) {
        const dayName = daysOfWeek[new Date(dateVal).getDay()];
        if (dayName in trendMap) {
          trendMap[dayName] += 1;
        }
      }
    }

    return last7Days.map(day => ({
      day,
      count: trendMap[day] || 0,
    }));
  }
}

export const dashboardService = new DashboardService();
