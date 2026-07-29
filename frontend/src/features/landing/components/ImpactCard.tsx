import type { Impact } from '../data/landing.data';

interface ImpactCardProps {
  impact: Impact;
}

export function ImpactCard({ impact }: ImpactCardProps) {
  return (
    <div
      className="card"
      style={{
        padding: 32,
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <div
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: '2.6rem',
          color: impact.color,
          lineHeight: 1,
          marginBottom: 8,
        }}
      >
        {impact.stat}
      </div>
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: '1.05rem',
          color: '#fff',
          marginBottom: 8,
        }}
      >
        {impact.label}
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
        {impact.desc}
      </p>
    </div>
  );
}
