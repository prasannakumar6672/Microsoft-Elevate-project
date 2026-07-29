import { ShieldCheck, MapPin } from 'lucide-react';
import { SeverityBadge } from '../../../../../components/atoms/Badge/SeverityBadge';
import { Button } from '../../../../../components/atoms/Button/Button';
import type { Detection } from '../../../../../types/detection.types';

interface ResultStepProps {
  detection: Detection | null;
  onProceed: () => void;
  onScanAgain: () => void;
}

export function ResultStep({ detection, onProceed, onScanAgain }: ResultStepProps) {
  if (!detection) return null;

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <ShieldCheck size={28} style={{ color: 'var(--green)' }} />
        <div>
          <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff' }}>
            AI Diagnostic Result Complete
          </h3>
          <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>
            Confidence: {detection.confidence}% • ID: {detection.detection_id}
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16, marginBottom: 24 }}>
        <div className="card" style={{ padding: 16 }}>
          <div style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600 }}>Damage Classification</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: '#fff', marginTop: 4 }}>
            {detection.damage_type}
          </div>
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600, marginBottom: 6 }}>Severity Assessment</div>
          <SeverityBadge level={detection.severity_level} />
        </div>

        <div className="card" style={{ padding: 16 }}>
          <div style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 600 }}>Severity Score</div>
          <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.3rem', color: 'var(--orange)', marginTop: 4 }}>
            {detection.severity_score} / 10
          </div>
        </div>
      </div>

      {detection.address && (
        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--border)', borderRadius: 10, padding: '12px 16px', marginBottom: 24, display: 'flex', alignItems: 'center', gap: 8, fontSize: '0.88rem' }}>
          <MapPin size={16} style={{ color: 'var(--orange)' }} />
          <span>Tagged Location: {detection.address}</span>
        </div>
      )}

      <div style={{ display: 'flex', gap: 12 }}>
        <Button variant="ghost" onClick={onScanAgain}>
          Re-scan Image
        </Button>
        <Button variant="primary" onClick={onProceed} style={{ flex: 1 }}>
          Proceed to Submit Complaint
        </Button>
      </div>
    </div>
  );
}
