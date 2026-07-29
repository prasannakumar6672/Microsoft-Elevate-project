import { apiClient } from '../lib/axios';
import { API_ENDPOINTS } from '../constants/api.endpoints';
import type { Detection } from '../types/detection.types';

export const detectionService = {
  async predict(file: File): Promise<Detection> {
    const form = new FormData();
    form.append('file', file);
    const res = await apiClient.post<Detection>(API_ENDPOINTS.DETECTION.PREDICT, form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },

  async getDetection(id: string): Promise<Detection> {
    const res = await apiClient.get<Detection>(API_ENDPOINTS.DETECTION.BY_ID(id));
    return res.data;
  },
};
