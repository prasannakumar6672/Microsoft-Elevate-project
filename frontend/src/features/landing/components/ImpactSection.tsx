import { ImpactCard } from './ImpactCard';
import { IMPACTS } from '../data/landing.data';

export function ImpactSection() {
  return (
    <section style={{ padding: '100px 48px', background: 'var(--dark)' }}>
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
            CIVIC IMPACT & METRICS
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
            Why Automated Road Diagnostics Matter
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}
        >
          {IMPACTS.map((imp, i) => (
            <ImpactCard key={i} impact={imp} />
          ))}
        </div>
      </div>
    </section>
  );
}
