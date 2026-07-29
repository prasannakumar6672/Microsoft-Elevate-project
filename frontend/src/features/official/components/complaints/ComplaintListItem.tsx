import { MapPin } from 'lucide-react';
import { StatusBadge } from '../../../../components/atoms/Badge/StatusBadge';
import { SeverityBadge } from '../../../../components/atoms/Badge/SeverityBadge';
import { ProgressBar } from '../../../../components/atoms/ProgressBar/ProgressBar';
import { STATUS_PROGRESS_PCT } from '../../../../constants/statuses';
import type { Complaint } from '../../../../types/complaint.types';

interface ComplaintListItemProps {
  complaint: Complaint;
  isSelected: boolean;
  onSelect: (c: Complaint) => void;
}

export function ComplaintListItem({ complaint, isSelected, onSelect }: ComplaintListItemProps) {
  const progressPct = STATUS_PROGRESS_PCT[complaint.status] || 20;

  return (
    <div
      onClick={() => onSelect(complaint)}
      style={{
        padding: 16,
        borderRadius: 14,
        cursor: 'pointer',
        background: isSelected ? 'rgba(255,92,0,0.05)' : 'rgba(255,255,255,0.01)',
        border: `1px solid ${isSelected ? 'var(--orange)' : 'rgba(255,255,255,0.04)'}`,
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'var(--orange)', fontSize: '0.85rem' }}>
          {complaint.complaint_number}
        </span>
        <StatusBadge status={complaint.status} />
      </div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}>
        <SeverityBadge level={complaint.severity_level || complaint.priority} />
        <span style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 500 }}>
          {complaint.damage_type || 'Defect'}
        </span>
      </div>

      <div style={{ color: 'var(--text)', fontSize: '0.85rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
        <MapPin size={12} style={{ color: 'var(--muted)' }} />
        <span>{complaint.address || complaint.title}</span>
      </div>

      <ProgressBar progress={progressPct} height={4} />
    </div>
  );
}
