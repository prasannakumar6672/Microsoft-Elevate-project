import { AlertTriangle, ShieldCheck, Zap, Activity } from 'lucide-react';

export function AwarenessStrip() {
  const items = [
    { icon: AlertTriangle, text: 'Real-Time Road Damage Detection' },
    { icon: ShieldCheck, text: 'Automated Severity Scoring' },
    { icon: Zap, text: 'Instant Work Order Dispatch' },
    { icon: Activity, text: 'Transparent SLA Tracking' },
  ];

  return (
    <div
      style={{
        background: 'var(--card2)',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        padding: '16px 48px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 20,
      }}
    >
      {items.map((item, i) => {
        const Icon = item.icon;
        return (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, color: 'var(--muted)', fontSize: '0.88rem', fontWeight: 600 }}>
            <Icon size={18} style={{ color: 'var(--orange)' }} />
            <span>{item.text}</span>
          </div>
        );
      })}
    </div>
  );
}
