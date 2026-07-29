import type { SeverityLevel } from './detection.types';

export type TeamStatus = 'Active' | 'On Break';
export type WorkOrderStatus = 'Issued' | 'In Progress' | 'Completed';

export interface Team {
  id: string;
  name: string;
  lead_name: string;
  region: string;
  status: TeamStatus;
  current_location?: string;
  tasks_count?: string;
}

export interface WorkOrder {
  id: string;
  complaint_id: string;
  team_id: string;
  instructions?: string;
  priority: SeverityLevel;
  status: WorkOrderStatus;
  issued_by: string;
  created_at?: string;
  team_name?: string;
  complaint_number?: string;
}
