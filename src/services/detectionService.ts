import { api } from './api';
import { Detection } from '../types';

export const detectionService = {
    async predict(file: File): Promise<Detection> {
        const form = new FormData();
        form.append('file', file);
        const res = await api.post('/api/v1/detect/predict', form, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return res.data;
    },
    async getDetection(id: string): Promise<Detection> {
        const res = await api.get(`/api/v1/detect/${id}`);
        return res.data;
    },
};
