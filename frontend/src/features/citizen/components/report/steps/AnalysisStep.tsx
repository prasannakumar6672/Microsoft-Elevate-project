import { Spinner } from '../../../../../components/atoms/Spinner/Spinner';
import type { DetectionPhase } from '../../../../../types/detection.types';

interface AnalysisStepProps {
  previewUrl: string | null;
  phase: DetectionPhase;
}

export function AnalysisStep({ previewUrl, phase }: AnalysisStepProps) {
  const phases = [
    'Scanning road surface features...',
    'Detecting pothole / crack boundaries...',
    'Calculating severity score & depth ratio...',
    'Finalizing diagnostic report...',
  ];

  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      {previewUrl && (
        <div style={{ position: 'relative', width: 280, height: 180, margin: '0 auto 24px', borderRadius: 12, overflow: 'hidden', border: '2px solid var(--orange)' }}>
          <img src={previewUrl} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 0%, rgba(255,92,0,0.2) 100%)' }} />
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: 'var(--orange)', animation: 'scanLine 1.5s ease-in-out infinite' }} />
        </div>
      )}

      <Spinner size={36} />
      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginTop: 16, marginBottom: 6 }}>
        AI Computer Vision Scan In Progress
      </h3>
      <p style={{ color: 'var(--orange)', fontSize: '0.92rem', fontWeight: 600, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
        {phases[phase] || phases[0]}
      </p>
    </div>
  );
}
