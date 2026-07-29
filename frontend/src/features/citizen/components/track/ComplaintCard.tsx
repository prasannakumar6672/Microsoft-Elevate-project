import { MapPin, Calendar, UserCheck } from 'lucide-react';
import { StatusBadge } from '../../../../components/atoms/Badge/StatusBadge';
import { SeverityBadge } from '../../../../components/atoms/Badge/SeverityBadge';
import { ComplaintTimeline } from './ComplaintTimeline';
import type { Complaint } from '../../../../types/complaint.types';

interface ComplaintCardProps {
  complaint: Complaint;
  isSelected?: boolean;
  onSelect?: () => void;
}

export function ComplaintCard({ complaint, isSelected = false, onSelect }: ComplaintCardProps) {
  const formattedDate = complaint.created_at
    ? new Date(complaint.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Recently';

  return (
    <div
      onClick={onSelect}
      className="card"
      style={{
        padding: 20,
        cursor: onSelect ? 'pointer' : 'default',
        border: `1px solid ${isSelected ? 'var(--orange)' : 'rgba(255,255,255,0.04)'}`,
        background: isSelected ? 'rgba(255,92,0,0.04)' : 'rgba(255,255,255,0.01)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div>
          <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: 'var(--orange)', fontSize: '0.9rem' }}>
            {complaint.complaint_number}
          </span>
          <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '1.05rem', color: '#fff', marginTop: 2 }}>
            {complaint.title}
          </h4>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <SeverityBadge level={complaint.severity_level || complaint.priority} />
        {complaint.damage_type && (
          <span style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600 }}>
            {complaint.damage_type}
          </span>
        )}
      </div>

      <div style={{ display: 'grid', gap: 6, fontSize: '0.82rem', color: 'var(--muted)', marginBottom: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <MapPin size={14} style={{ color: 'var(--orange)' }} />
          <span style={{ color: 'var(--text)' }}>{complaint.address || 'Location registered'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Calendar size={14} />
          <span>Reported: {formattedDate}</span>
        </div>
        {complaint.officer_name && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <UserCheck size={14} style={{ color: 'var(--green)' }} />
            <span>Assigned Officer: {complaint.officer_name}</span>
          </div>
        )}
      </div>

      <ComplaintTimeline status={complaint.status} />
    </div>
  );
}
