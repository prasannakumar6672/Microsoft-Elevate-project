import { CheckCircle2, ArrowRight } from 'lucide-react';
import { Button } from '../../../../../components/atoms/Button/Button';
import type { Complaint } from '../../../../../types/complaint.types';

interface SuccessStepProps {
  complaint: Complaint | null;
  onTrack: () => void;
  onReset: () => void;
}

export function SuccessStep({ complaint, onTrack, onReset }: SuccessStepProps) {
  return (
    <div style={{ textAlign: 'center', padding: '30px 20px' }}>
      <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(34,197,94,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
        <CheckCircle2 size={36} style={{ color: 'var(--green)' }} />
      </div>

      <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.5rem', color: '#fff', marginBottom: 8 }}>
        Complaint Submitted Successfully!
      </h3>
      <p style={{ color: 'var(--muted)', fontSize: '0.92rem', marginBottom: 20 }}>
        Your report has been logged with municipal authorities under Ticket ID:
      </p>

      {complaint && (
        <div style={{ display: 'inline-block', padding: '10px 24px', background: 'var(--card2)', border: '1px solid var(--orange)', borderRadius: 10, fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.2rem', color: 'var(--orange)', marginBottom: 28 }}>
          {complaint.complaint_number}
        </div>
      )}

      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Button variant="ghost" onClick={onReset}>
          Report Another Defect
        </Button>
        <Button variant="primary" onClick={onTrack}>
          <span>Track Complaint Status</span>
          <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
}
