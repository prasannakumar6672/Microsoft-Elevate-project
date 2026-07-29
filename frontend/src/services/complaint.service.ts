import { apiClient } from '../lib/axios';
import { API_ENDPOINTS } from '../constants/api.endpoints';
import type { Complaint, ComplaintCreate, ComplaintFilters, OfficialResponse } from '../types/complaint.types';

export const complaintService = {
  async create(data: ComplaintCreate): Promise<Complaint> {
    const res = await apiClient.post<Complaint>(API_ENDPOINTS.COMPLAINTS.BASE, data);
    return res.data;
  },

  async getMine(): Promise<Complaint[]> {
    const res = await apiClient.get<Complaint[]>(API_ENDPOINTS.COMPLAINTS.MINE);
    return res.data;
  },

  async getAll(filters?: ComplaintFilters): Promise<Complaint[]> {
    const res = await apiClient.get<Complaint[]>(API_ENDPOINTS.COMPLAINTS.BASE, {
      params: filters,
    });
    return res.data;
  },

  async getOne(id: string): Promise<Complaint> {
    const res = await apiClient.get<Complaint>(API_ENDPOINTS.COMPLAINTS.BY_ID(id));
    return res.data;
  },

  async updateStatus(id: string, status: string): Promise<Complaint> {
    const res = await apiClient.patch<Complaint>(API_ENDPOINTS.COMPLAINTS.STATUS(id), { status });
    return res.data;
  },

  async respond(
    id: string,
    message: string,
    status_changed_to?: string
  ): Promise<OfficialResponse> {
    const res = await apiClient.post<OfficialResponse>(API_ENDPOINTS.COMPLAINTS.RESPOND(id), {
      message,
      status_changed_to,
    });
    return res.data;
  },

  async getResponses(id: string): Promise<OfficialResponse[]> {
    const res = await apiClient.get<OfficialResponse[]>(API_ENDPOINTS.COMPLAINTS.RESPONSES(id));
    return res.data;
  },
};
