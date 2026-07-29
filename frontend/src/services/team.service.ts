import { apiClient } from '../lib/axios';
import { API_ENDPOINTS } from '../constants/api.endpoints';
import type { Team, WorkOrder } from '../types/team.types';
import type { SeverityLevel } from '../types/detection.types';

interface IssueWorkOrderPayload {
  complaint_id: string;
  team_id: string;
  instructions?: string;
  priority: SeverityLevel;
}

export const teamService = {
  async getTeams(): Promise<Team[]> {
    const res = await apiClient.get<Team[]>(API_ENDPOINTS.TEAMS.BASE);
    return res.data;
  },

  async getWorkOrders(): Promise<WorkOrder[]> {
    const res = await apiClient.get<WorkOrder[]>(API_ENDPOINTS.TEAMS.WORK_ORDERS);
    return res.data;
  },

  async issueWorkOrder(data: IssueWorkOrderPayload): Promise<WorkOrder> {
    const res = await apiClient.post<WorkOrder>(API_ENDPOINTS.TEAMS.WORK_ORDERS, data);
    return res.data;
  },
};
