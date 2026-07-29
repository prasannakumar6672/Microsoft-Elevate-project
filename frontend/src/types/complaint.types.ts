import type { SeverityLevel } from './detection.types';

export type ComplaintStatus = 'Pending' | 'In Progress' | 'Resolved';

export interface ComplaintFilters {
  severity?: SeverityLevel;
  status?: ComplaintStatus;
  search?: string;
}

export interface Complaint {
  id: string;
  complaint_number: string;
  title: string;
  description?: string;
  status: ComplaintStatus;
  priority: SeverityLevel;
  region?: string;
  address?: string;
  damage_type?: string;
  severity_level?: SeverityLevel;
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
  severity_level?: SeverityLevel;
  severity_score?: string;
  confidence?: string;
  region?: string;
}

export interface OfficialResponse {
  id: string;
  complaint_id: string;
  officer_id: string;
  message: string;
  status_changed_to?: ComplaintStatus;
  created_at?: string;
  officer_name?: string;
}
