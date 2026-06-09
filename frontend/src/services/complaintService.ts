import { api } from './api';
import { Complaint, ComplaintCreate, OfficialResponse, DashboardStats, HeatmapPoint, TrendData, Team, WorkOrder } from '../types';

export const complaintService = {
    async create(data: ComplaintCreate): Promise<Complaint> {
        const res = await api.post('/api/v1/complaints', data);
        return res.data;
    },
    async getMine(): Promise<Complaint[]> {
        const res = await api.get('/api/v1/complaints/mine');
        return res.data;
    },
    async getAll(params?: { severity?: string; status?: string; search?: string }): Promise<Complaint[]> {
        const res = await api.get('/api/v1/complaints', { params });
        return res.data;
    },
    async getOne(id: string): Promise<Complaint> {
        const res = await api.get(`/api/v1/complaints/${id}`);
        return res.data;
    },
    async updateStatus(id: string, status: string): Promise<Complaint> {
        const res = await api.patch(`/api/v1/complaints/${id}/status`, { status });
        return res.data;
    },
    async respond(id: string, message: string, status_changed_to?: string): Promise<OfficialResponse> {
        const res = await api.post(`/api/v1/complaints/${id}/respond`, { message, status_changed_to });
        return res.data;
    },
    async getResponses(id: string): Promise<OfficialResponse[]> {
        const res = await api.get(`/api/v1/complaints/${id}/responses`);
        return res.data;
    },
    async getStats(): Promise<DashboardStats> {
        const res = await api.get('/api/v1/dashboard/stats');
        return res.data;
    },
    async getHeatmap(): Promise<HeatmapPoint[]> {
        const res = await api.get('/api/v1/dashboard/heatmap');
        return res.data;
    },
    async getTrends(): Promise<TrendData[]> {
        const res = await api.get('/api/v1/dashboard/trends');
        return res.data;
    },
    async getTeams(): Promise<Team[]> {
        const res = await api.get('/api/v1/teams');
        return res.data;
    },
    async issueWorkOrder(data: { complaint_id: string; team_id: string; instructions?: string; priority: string }): Promise<WorkOrder> {
        const res = await api.post('/api/v1/teams/work-orders', data);
        return res.data;
    },
    async getWorkOrders(): Promise<WorkOrder[]> {
        const res = await api.get('/api/v1/teams/work-orders');
        return res.data;
    },
};
