import { api } from './api';

// ── Demo users (mirrors seed.py) — used when backend is offline ──
const DEMO_USERS: Record<string, { password: string; role: string; name: string; region?: string; user_id: string }> = {
    'prasanna@test.com': { password: 'Test@123', role: 'citizen', name: 'Prasanna Kumar', user_id: 'demo-c1' },
    'ravi@telangana.gov.in': { password: 'Official@123', role: 'official', name: 'Officer Ravi Kumar', region: 'Kukatpally', user_id: 'demo-o1' },
    'sunita@telangana.gov.in': { password: 'Official@123', role: 'official', name: 'Officer Sunita Rao', region: 'Mehdipatnam', user_id: 'demo-o2' },
    'priya@telangana.gov.in': { password: 'Official@123', role: 'official', name: 'Officer Priya Sharma', region: 'Gachibowli', user_id: 'demo-o3' },
};

function demoLogin(email: string, password: string) {
    const user = DEMO_USERS[email.toLowerCase().trim()];
    if (!user || user.password !== password) {
        throw new Error('Invalid credentials. Check email/password and try again.');
    }
    return {
        access_token: 'demo-token',
        refresh_token: 'demo-refresh',
        role: user.role,
        name: user.name,
        user_id: user.user_id,
        region: user.region,
    };
}

export const authService = {
    async login(email: string, password: string) {
        try {
            const res = await api.post('/api/v1/auth/login', { email, password });
            return res.data;
        } catch (err: any) {
            // If backend is unreachable (network error / 502), use demo mode
            if (!err.response || err.code === 'ERR_NETWORK' || err.response?.status >= 500) {
                return demoLogin(email, password);
            }
            throw err;
        }
    },
    async register(data: { name: string; email: string; phone?: string; password: string; city?: string }) {
        try {
            const res = await api.post('/api/v1/auth/register', data);
            return res.data;
        } catch (err: any) {
            if (!err.response || err.code === 'ERR_NETWORK' || err.response?.status >= 500) {
                // Demo registration — simulate success
                return {
                    access_token: 'demo-token',
                    refresh_token: 'demo-refresh',
                    role: 'citizen',
                    name: data.name,
                    user_id: 'demo-new-' + Date.now(),
                };
            }
            throw err;
        }
    },
};

