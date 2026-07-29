/**
 * lib/demo.data.ts
 *
 * All mock API response fixtures, centralized here.
 * Replaces the dozens of hardcoded fallback arrays scattered
 * across every catch() block in the old codebase.
 *
 * This file is ONLY imported by demo.interceptor.ts.
 * Services and features have zero knowledge of demo data.
 */

export const DEMO_USERS: Record<string, {
  password: string;
  role: 'citizen' | 'official';
  name: string;
  region?: string;
  user_id: string;
}> = {
  'prasanna@test.com': {
    password: 'Test@123',
    role: 'citizen',
    name: 'Prasanna Kumar',
    user_id: 'demo-c1',
  },
  'ravi@telangana.gov.in': {
    password: 'Official@123',
    role: 'official',
    name: 'Officer Ravi Kumar',
    region: 'Kukatpally',
    user_id: 'demo-o1',
  },
  'sunita@telangana.gov.in': {
    password: 'Official@123',
    role: 'official',
    name: 'Officer Sunita Rao',
    region: 'Mehdipatnam',
    user_id: 'demo-o2',
  },
};

export const DEMO_COMPLAINTS = [
  {
    id: '1', complaint_number: 'RG-2401', title: 'Pothole at Kukatpally Main Road',
    status: 'Pending' as const, priority: 'HIGH' as const, severity_level: 'HIGH' as const,
    damage_type: 'Pothole', address: 'KPHB Phase 6, Kukatpally', citizen_id: 'demo-c1',
    citizen_name: 'Prasanna Kumar', officer_name: 'Officer Ravi Kumar',
    description: 'Large pothole near bus stop causing vehicle damage.',
    created_at: new Date(Date.now() - 3 * 86400000).toISOString(),
  },
  {
    id: '2', complaint_number: 'RG-2402', title: 'Crack at Mehdipatnam Circle',
    status: 'In Progress' as const, priority: 'MEDIUM' as const, severity_level: 'MEDIUM' as const,
    damage_type: 'Crack', address: 'Mehdipatnam Circle, Mehdipatnam', citizen_id: 'demo-c1',
    citizen_name: 'Prasanna Kumar', officer_name: 'Officer Sunita Rao',
    description: 'Multiple cracks visible on road surface.',
    created_at: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
  {
    id: '3', complaint_number: 'RG-2403', title: 'Road damage near Gachibowli IT Hub',
    status: 'Resolved' as const, priority: 'LOW' as const, severity_level: 'LOW' as const,
    damage_type: 'Crack', address: 'Gachibowli, Hyderabad', citizen_id: 'demo-c1',
    citizen_name: 'Prasanna Kumar', officer_name: 'Officer Ravi Kumar',
    description: 'Minor surface cracks near junction.',
    created_at: new Date(Date.now() - 14 * 86400000).toISOString(),
  },
];

export const DEMO_STATS = {
  total: 18, pending: 7, in_progress: 6, resolved: 5,
};

export const DEMO_TRENDS = [
  { day: 'Mon', count: 3 }, { day: 'Tue', count: 5 }, { day: 'Wed', count: 2 },
  { day: 'Thu', count: 7 }, { day: 'Fri', count: 4 }, { day: 'Sat', count: 6 }, { day: 'Sun', count: 1 },
];

export const DEMO_HEATMAP = [
  { area: 'Kukatpally', complaint_count: 8, severity: 'HIGH' as const, latitude: 17.4947, longitude: 78.3996 },
  { area: 'Mehdipatnam', complaint_count: 5, severity: 'MEDIUM' as const, latitude: 17.3945, longitude: 78.4440 },
  { area: 'Gachibowli', complaint_count: 3, severity: 'HIGH' as const, latitude: 17.4401, longitude: 78.3489 },
  { area: 'Begumpet', complaint_count: 2, severity: 'LOW' as const, latitude: 17.4441, longitude: 78.4646 },
];

export const DEMO_TEAMS = [
  { id: 't1', name: 'Team Alpha', lead_name: 'Suresh M.', region: 'Kukatpally', status: 'Active' as const, current_location: 'KPHB Phase 1', tasks_count: '3' },
  { id: 't2', name: 'Team Beta', lead_name: 'Kavitha R.', region: 'Kukatpally', status: 'Active' as const, current_location: 'Kukatpally Main Road', tasks_count: '2' },
  { id: 't3', name: 'Team Gamma', lead_name: 'Raju K.', region: 'Kukatpally', status: 'On Break' as const, current_location: 'Kukatpally Depot', tasks_count: '1' },
];

export const DEMO_DETECTION = {
  detection_id: 'demo-det-001',
  damage_type: 'Pothole' as const,
  confidence: 94.2,
  severity_level: 'HIGH' as const,
  severity_score: 8.5,
  damage_count: 3,
  latitude: 17.4947,
  longitude: 78.3996,
  address: 'Kukatpally, Hyderabad, Telangana',
};
