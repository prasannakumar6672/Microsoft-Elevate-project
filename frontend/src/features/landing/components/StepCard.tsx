import type { Step } from '../data/landing.data';

interface StepCardProps {
  step: Step;
}

export function StepCard({ step }: StepCardProps) {
  return (
    <div
      className="card"
      style={{
        padding: 32,
        position: 'relative',
        background: 'rgba(255,255,255,0.01)',
        border: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <span
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
          fontSize: '2.5rem',
          color: 'rgba(255,92,0,0.25)',
          position: 'absolute',
          top: 20,
          right: 24,
        }}
      >
        {step.num}
      </span>
      <span
        style={{
          fontSize: '0.72rem',
          fontWeight: 700,
          color: 'var(--orange)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          display: 'block',
          marginBottom: 12,
        }}
      >
        {step.tag}
      </span>
      <h3
        style={{
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 700,
          fontSize: '1.2rem',
          color: '#fff',
          marginBottom: 10,
        }}
      >
        {step.title}
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>
        {step.desc}
      </p>
    </div>
  );
}
