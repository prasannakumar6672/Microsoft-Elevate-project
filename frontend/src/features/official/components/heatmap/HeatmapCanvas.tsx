import { useState } from 'react';
import { LayoutDashboard } from 'lucide-react';
import { SeverityBadge } from '../../../../components/atoms/Badge/SeverityBadge';
import { SEVERITY_COLORS } from '../../../../constants/severity';
import type { HeatmapPoint } from '../../../../types/dashboard.types';

interface HeatmapCanvasProps {
  points: HeatmapPoint[];
}

export function HeatmapCanvas({ points }: HeatmapCanvasProps) {
  const [hovered, setHovered] = useState<HeatmapPoint | null>(null);

  return (
    <div
      style={{
        background: 'rgba(10, 10, 15, 0.6)',
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)',
        overflow: 'hidden',
        position: 'relative',
        height: 380,
        marginBottom: 24,
        backgroundImage: `linear-gradient(rgba(255,92,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,92,0,0.03) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
        boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)',
      }}
    >
      <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
        {/* Glowing grid lines */}
        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,92,0,0.2)" strokeWidth="3" strokeDasharray="8 6" />
        <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(255,92,0,0.2)" strokeWidth="3" strokeDasharray="8 6" />
        <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="rgba(59,130,246,0.12)" strokeWidth="2" strokeDasharray="6 6" />

        {/* Complaint Radar hotspots */}
        {points.map((p, i) => {
          const x = 15 + (i % 4) * 22 + '%';
          const y = 20 + Math.floor(i / 2) * 40 + '%';
          const r = Math.max(18, p.complaint_count * 4);
          const color = SEVERITY_COLORS[p.severity]?.hex || '#22C55E';

          return (
            <g
              key={p.area}
              onMouseEnter={() => setHovered(p)}
              onMouseLeave={() => setHovered(null)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={x} cy={y} r={r} fill={color} opacity="0.18">
                <animate attributeName="r" from={r} to={r + 12} dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.18" to="0" dur="1.8s" repeatCount="indefinite" />
              </circle>
              <circle cx={x} cy={y} r={r * 0.5} fill={color} opacity="0.75" />
              <circle cx={x} cy={y} r={r * 0.2} fill="#fff" opacity="0.9" />
              <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="10" fontWeight="bold">
                {p.complaint_count}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip drawer overlay */}
      {hovered && (
        <div
          className="glass"
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            borderRadius: 12,
            padding: '14px 18px',
            minWidth: 180,
            border: '1px solid rgba(255,255,255,0.08)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: '#fff', marginBottom: 4 }}>
            {hovered.area}
          </div>
          <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
            <LayoutDashboard size={12} />
            <span>{hovered.complaint_count} complaints</span>
          </div>
          <SeverityBadge level={hovered.severity} />
        </div>
      )}
    </div>
  );
}
