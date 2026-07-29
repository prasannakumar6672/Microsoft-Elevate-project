import { StepCard } from './StepCard';
import { STEPS } from '../data/landing.data';

export function HowItWorksSection() {
  return (
    <section
      style={{
        padding: '100px 48px',
        background: 'var(--dark2)',
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span
            style={{
              color: 'var(--orange)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
            }}
          >
            END-TO-END WORKFLOW
          </span>
          <h2
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontSize: '2.4rem',
              fontWeight: 800,
              color: '#fff',
              marginTop: 8,
            }}
          >
            How RoadGuard AI Works
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 24,
          }}
        >
          {STEPS.map((st, i) => (
            <StepCard key={i} step={st} />
          ))}
        </div>
      </div>
    </section>
  );
}
