// ── User ─────────────────────────────────────────────────────────
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'citizen' | 'official';
  region?: string;
  city?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

// ── Detection ─────────────────────────────────────────────────────
export interface Detection {
  detection_id: string;
  damage_type: 'Pothole' | 'Crack' | 'No Damage';
  confidence: number;
  severity_level: 'HIGH' | 'MEDIUM' | 'LOW';
  severity_score: number;
  damage_count: number;
  annotated_image_url?: string;
  latitude?: number;
  longitude?: number;
  address?: string;
}

// ── Complaint ─────────────────────────────────────────────────────
export interface Complaint {
  id: string;
  complaint_number: string;
  title: string;
  description?: string;
  status: 'Pending' | 'In Progress' | 'Resolved';
  priority: string;
  region?: string;
  address?: string;
  damage_type?: string;
  severity_level?: string;
  severity_score?: string;
  confidence?: string;
  citizen_id: string;
  assigned_officer_id?: string;
  created_at?: string;
  updated_at?: string;
  officer_name?: string;
  citizen_name?: string;
}

export interface ComplaintCreate {
  detection_id?: string;
  title: string;
  description?: string;
  latitude?: string;
  longitude?: string;
  address?: string;
  damage_type?: string;
  severity_level?: string;
  severity_score?: string;
  confidence?: string;
  region?: string;
}

// ── Response ──────────────────────────────────────────────────────
export interface OfficialResponse {
  id: string;
  complaint_id: string;
  officer_id: string;
  message: string;
  status_changed_to?: string;
  created_at?: string;
  officer_name?: string;
}

// ── Team ──────────────────────────────────────────────────────────
export interface Team {
  id: string;
  name: string;
  lead_name: string;
  region: string;
  status: 'Active' | 'On Break';
  current_location?: string;
  tasks_count?: string;
}

// ── Work Order ────────────────────────────────────────────────────
export interface WorkOrder {
  id: string;
  complaint_id: string;
  team_id: string;
  instructions?: string;
  priority: string;
  status: string;
  issued_by: string;
  created_at?: string;
  team_name?: string;
  complaint_number?: string;
}

// ── Dashboard ─────────────────────────────────────────────────────
export interface DashboardStats {
  total: number;
  pending: number;
  in_progress: number;
  resolved: number;
}

export interface HeatmapPoint {
  area: string;
  complaint_count: number;
  severity: string;
  latitude: number;
  longitude: number;
}

export interface TrendData {
  day: string;
  count: number;
}
