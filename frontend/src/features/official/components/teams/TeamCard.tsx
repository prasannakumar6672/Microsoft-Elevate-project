import { HardHat, MapPin } from 'lucide-react';
import { ProgressBar } from '../../../../components/atoms/ProgressBar/ProgressBar';
import type { Team } from '../../../../types/team.types';

interface TeamCardProps {
  team: Team;
}

export function TeamCard({ team }: TeamCardProps) {
  const tasks = parseInt(team.tasks_count || '0', 10);
  const capacity = Math.min(100, Math.round((tasks / 5) * 100));

  return (
    <div
      className="card"
      style={{
        padding: 18,
        border: '1px solid rgba(255,255,255,0.04)',
        background: 'rgba(255,255,255,0.01)',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
            <HardHat size={16} style={{ color: 'var(--orange)' }} />
            <span>{team.name}</span>
          </div>
          <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: 2 }}>
            Lead Dispatch: {team.lead_name}
          </div>
        </div>
        <span className={`badge ${team.status === 'Active' ? 'badge-resolved' : 'badge-pending'}`}>
          {team.status}
        </span>
      </div>

      <div style={{ color: 'var(--muted)', fontSize: '0.78rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
        <MapPin size={12} />
        <span>Location: {team.current_location || team.region}</span>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500 }}>
          Crew Capacity: {team.tasks_count || 0} active orders
        </span>
        <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500 }}>
          {capacity}% load
        </span>
      </div>

      <ProgressBar progress={capacity} height={4} />
    </div>
  );
}
