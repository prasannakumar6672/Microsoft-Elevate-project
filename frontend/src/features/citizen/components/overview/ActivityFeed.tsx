import { MapPin } from 'lucide-react';
import { StatusBadge } from '../../../../components/atoms/Badge/StatusBadge';
import { SeverityBadge } from '../../../../components/atoms/Badge/SeverityBadge';
import { EmptyState } from '../../../../components/molecules/EmptyState/EmptyState';
import type { Complaint } from '../../../../types/complaint.types';

interface ActivityFeedProps {
  complaints: Complaint[];
  onSelectComplaint?: (c: Complaint) => void;
}

export function ActivityFeed({ complaints, onSelectComplaint }: ActivityFeedProps) {
  if (complaints.length === 0) {
    return <EmptyState title="No Activity Yet" message="You have not submitted any complaint reports. Click 'Report Damage' to get started." />;
  }

  return (
    <div className="card">
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 16, fontSize: '1.05rem', color: '#fff' }}>
        Recent Activity & Complaint Tracking
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {complaints.slice(0, 5).map(c => (
          <div
            key={c.id}
            onClick={() => onSelectComplaint?.(c)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 16px',
              borderRadius: 10,
              background: 'rgba(255,255,255,0.01)',
              border: '1px solid rgba(255,255,255,0.04)',
              cursor: onSelectComplaint ? 'pointer' : 'default',
              transition: 'border-color 0.2s ease',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'var(--orange)', fontSize: '0.88rem' }}>
                  {c.complaint_number}
                </span>
                <SeverityBadge level={c.severity_level || c.priority} />
              </div>
              <div style={{ color: 'var(--text)', fontSize: '0.88rem', fontWeight: 600 }}>
                {c.title}
              </div>
              <div style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4, marginTop: 4 }}>
                <MapPin size={12} />
                <span>{c.address || 'Location logged'}</span>
              </div>
            </div>

            <StatusBadge status={c.status} />
          </div>
        ))}
      </div>
    </div>
  );
}
