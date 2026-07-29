import { StatusBadge } from '../../../../components/atoms/Badge/StatusBadge';
import type { OfficialResponse } from '../../../../types/complaint.types';

interface ResponseHistoryProps {
  responses: OfficialResponse[];
}

export function ResponseHistory({ responses }: ResponseHistoryProps) {
  if (responses.length === 0) return null;

  return (
    <div style={{ marginTop: 24 }}>
      <h5 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 12, color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600 }}>
        Log History Feed
      </h5>
      {responses.map(r => (
        <div key={r.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 6, display: 'flex', alignItems: 'center', gap: 6 }}>
            <span>{r.officer_name || 'Officer'}</span>
            <span>•</span>
            <span>{r.created_at ? new Date(r.created_at).toLocaleDateString() : 'Recently'}</span>
            {r.status_changed_to && (
              <>
                <span>•</span>
                <StatusBadge status={r.status_changed_to} />
              </>
            )}
          </div>
          <div style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.4 }}>{r.message}</div>
        </div>
      ))}
    </div>
  );
}
