import { HeatmapCanvas } from './HeatmapCanvas';
import { HotspotCard } from './HotspotCard';
import { Spinner } from '../../../../components/atoms/Spinner/Spinner';
import { AlertBanner } from '../../../../components/molecules/AlertBanner/AlertBanner';
import { useHeatmap } from '../../../../hooks/useHeatmap';
import { useAuth } from '../../../../store/auth/useAuth';

export function HeatmapTab() {
  const { user } = useAuth();
  const { data: points, isLoading, error } = useHeatmap();

  const region = user?.region || 'Kukatpally';
  const heatmapData = points || [
    { area: 'Kukatpally', complaint_count: 8, severity: 'HIGH' as const, latitude: 17.4947, longitude: 78.3996 },
    { area: 'Mehdipatnam', complaint_count: 5, severity: 'MEDIUM' as const, latitude: 17.3945, longitude: 78.4440 },
    { area: 'Gachibowli', complaint_count: 3, severity: 'HIGH' as const, latitude: 17.4401, longitude: 78.3489 },
    { area: 'Begumpet', complaint_count: 2, severity: 'LOW' as const, latitude: 17.4441, longitude: 78.4646 },
  ];

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <div>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>
            Complaint Density Map — {region}
          </h3>
          <div style={{ display: 'flex', gap: 16, fontSize: '0.78rem' }}>
            {[
              ['HIGH', '#EF4444'],
              ['MEDIUM', '#F59E0B'],
              ['LOW', '#22C55E'],
            ].map(([l, c]) => (
              <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <div style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
                <span style={{ color: 'var(--muted)' }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Spinner size={32} />
        </div>
      ) : error ? (
        <AlertBanner type="error">{error.message}</AlertBanner>
      ) : (
        <>
          <HeatmapCanvas points={heatmapData} />

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
            {[...heatmapData]
              .sort((a, b) => b.complaint_count - a.complaint_count)
              .slice(0, 4)
              .map(p => (
                <HotspotCard key={p.area} point={p} />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
