export const SEVERITY = {
  HIGH: 'HIGH',
  MEDIUM: 'MEDIUM',
  LOW: 'LOW',
} as const;

export const SEVERITY_COLORS = {
  HIGH: {
    bg: 'rgba(239,68,68,0.15)',
    text: 'var(--red)',
    border: 'rgba(239,68,68,0.3)',
    hex: '#EF4444',
  },
  MEDIUM: {
    bg: 'rgba(245,158,11,0.15)',
    text: 'var(--yellow)',
    border: 'rgba(245,158,11,0.3)',
    hex: '#F59E0B',
  },
  LOW: {
    bg: 'rgba(34,197,94,0.15)',
    text: 'var(--green)',
    border: 'rgba(34,197,94,0.3)',
    hex: '#22C55E',
  },
} as const;
