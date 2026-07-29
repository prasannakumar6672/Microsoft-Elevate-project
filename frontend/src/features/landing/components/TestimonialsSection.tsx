import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/landing.data';

export function TestimonialsSection() {
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
            COMMUNITY FEEDBACK
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
            Trusted by Citizens & Municipal Officers
          </h2>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 24,
          }}
        >
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: 28,
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid rgba(255,255,255,0.04)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: 4, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, r) => (
                    <Star key={r} size={16} fill="var(--yellow)" color="var(--yellow)" />
                  ))}
                </div>
                <p style={{ color: 'var(--text)', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: 20 }}>
                  "{t.quote}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 16 }}>
                <div
                  style={{
                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                    fontWeight: 700,
                    color: '#fff',
                    fontSize: '0.92rem',
                  }}
                >
                  {t.name}
                </div>
                <div style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>
                  {t.role} • {t.location}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
