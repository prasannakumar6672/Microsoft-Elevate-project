import { AlertOctagon, MapPin } from 'lucide-react';
import { StatusBadge } from '../../../../components/atoms/Badge/StatusBadge';
import { PulseDot } from '../../../../components/molecules/PulseDot/PulseDot';
import type { Complaint } from '../../../../types/complaint.types';

interface HighPriorityAlertsProps {
  complaints: Complaint[];
}

export function HighPriorityAlerts({ complaints }: HighPriorityAlertsProps) {
  const highPriority = complaints.filter(
    c => (c.severity_level || c.priority) === 'HIGH' && c.status !== 'Resolved'
  );

  return (
    <div className="card" style={{ border: '1px solid rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.02)', boxShadow: '0 12px 32px rgba(239,68,68,0.05)' }}>
      <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 8 }}>
        <AlertOctagon size={20} />
        <span>High Priority — Immediate Action Required</span>
      </h4>
      <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: 16 }}>
        Complaints marked HIGH severity requiring urgent response
      </p>

      {highPriority.length === 0 ? (
        <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>No high-priority complaints pending.</p>
      ) : (
        highPriority.map(c => (
          <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
            <PulseDot color="red" />
            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'var(--orange)', minWidth: 90 }}>
              {c.complaint_number}
            </span>
            <span style={{ color: 'var(--muted)', fontSize: '0.85rem', flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
              <MapPin size={12} />
              <span>{c.address || c.title}</span>
            </span>
            <StatusBadge status={c.status} />
          </div>
        ))
      )}
    </div>
  );
}
