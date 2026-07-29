import { SeverityBadge } from '../../../../components/atoms/Badge/SeverityBadge';
import { SEVERITY_COLORS } from '../../../../constants/severity';
import type { HeatmapPoint } from '../../../../types/dashboard.types';

interface HotspotCardProps {
  point: HeatmapPoint;
}

export function HotspotCard({ point }: HotspotCardProps) {
  const color = SEVERITY_COLORS[point.severity]?.hex || '#22C55E';

  return (
    <div className="card" style={{ padding: 18, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>
          {point.area}
        </span>
        <SeverityBadge level={point.severity} />
      </div>
      <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2rem', color, lineHeight: 1, marginBottom: 4 }}>
        {point.complaint_count}
      </div>
      <div style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600 }}>complaints logged</div>
    </div>
  );
}
