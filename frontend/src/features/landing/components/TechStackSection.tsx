import { Cpu, MapPin, Activity, Layers, ShieldCheck, Zap } from 'lucide-react';

interface TechFeature {
  icon: typeof Cpu;
  tag: string;
  title: string;
  desc: string;
  badgeColor: string;
}

const FEATURES: TechFeature[] = [
  {
    icon: Cpu,
    tag: 'COMPUTER VISION',
    title: 'YOLO Damage Detection',
    desc: 'Sub-second multi-class defect classification detecting potholes, longitudinal cracks, and road surface erosion.',
    badgeColor: 'rgba(255,92,0,0.15)',
  },
  {
    icon: MapPin,
    tag: 'GIS & TELEMETRY',
    title: 'Geospatial Location Tagging',
    desc: 'Automatic GPS coordinate capture, reverse geocoding, and interactive spatial defect clustering.',
    badgeColor: 'rgba(59,130,246,0.15)',
  },
  {
    icon: Activity,
    tag: 'ALGORITHMIC SCORING',
    title: 'Automated Severity Scoring',
    desc: 'Dynamic severity index (HIGH / MED / LOW) computed instantly from detection confidence and defect parameters.',
    badgeColor: 'rgba(234,179,8,0.15)',
  },
  {
    icon: Layers,
    tag: 'FULL-STACK ARCHITECTURE',
    title: 'Role-Based Dual Portals',
    desc: 'Dedicated interfaces for Citizen Defect Reporting and Official Municipal Inspection & Work Order Management.',
    badgeColor: 'rgba(168,85,247,0.15)',
  },
  {
    icon: ShieldCheck,
    tag: 'SECURITY & AUTH',
    title: 'JWT & Session Protection',
    desc: 'Secure authentication flow featuring token storage, role-based route guards, and auto-logout interceptors.',
    badgeColor: 'rgba(34,197,94,0.15)',
  },
  {
    icon: Zap,
    tag: 'HIGH PERFORMANCE',
    title: 'REST API & Real-Time Telemetry',
    desc: 'Node.js & Express backend architecture delivering fast payload parsing, image processing, and live status updates.',
    badgeColor: 'rgba(236,72,153,0.15)',
  },
];

export function TechStackSection() {
  return (
    <section style={{ padding: '100px 48px', background: 'var(--dark)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span
            style={{
              color: 'var(--orange)',
              fontSize: '0.8rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
            }}
          >
            PROJECT ARCHITECTURE & CAPABILITIES
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
            Powered by Deep Learning & Modern Web Stack
          </h2>
          <p style={{ color: 'var(--muted)', fontSize: '0.96rem', marginTop: 12, maxWidth: 640, margin: '12px auto 0' }}>
            An end-to-end AI system designed to streamline road hazard identification, priority assessment, and civic resolution workflows.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: 24,
          }}
        >
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <div
                key={i}
                className="card"
                style={{
                  padding: 28,
                  background: 'rgba(255,255,255,0.015)',
                  border: '1px solid rgba(255,255,255,0.05)',
                  borderRadius: 12,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '6px 12px',
                      borderRadius: 6,
                      background: f.badgeColor,
                      color: 'var(--orange)',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      letterSpacing: '0.08em',
                      marginBottom: 16,
                    }}
                  >
                    <Icon size={16} />
                    <span>{f.tag}</span>
                  </div>

                  <h3
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: 10,
                    }}
                  >
                    {f.title}
                  </h3>

                  <p style={{ color: 'var(--muted)', fontSize: '0.88rem', lineHeight: 1.6 }}>
                    {f.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
