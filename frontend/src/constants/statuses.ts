import type { ComplaintStatus } from '../types/complaint.types';

export const COMPLAINT_STATUS = {
  PENDING: 'Pending',
  IN_PROGRESS: 'In Progress',
  RESOLVED: 'Resolved',
} as const satisfies Record<string, ComplaintStatus>;

export const WORK_ORDER_STATUS = {
  ISSUED: 'Issued',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
} as const;

// Maps status → progress bar percentage
export const STATUS_PROGRESS_PCT: Record<ComplaintStatus, number> = {
  Pending: 20,
  'In Progress': 65,
  Resolved: 100,
};

// Maps status → CSS variable colors
export const STATUS_COLORS: Record<ComplaintStatus, { bg: string; text: string; border: string }> = {
  Pending: {
    bg: 'rgba(245,158,11,0.15)',
    text: 'var(--yellow)',
    border: 'rgba(245,158,11,0.3)',
  },
  'In Progress': {
    bg: 'rgba(59,130,246,0.15)',
    text: 'var(--blue)',
    border: 'rgba(59,130,246,0.3)',
  },
  Resolved: {
    bg: 'rgba(34,197,94,0.15)',
    text: 'var(--green)',
    border: 'rgba(34,197,94,0.3)',
  },
};
