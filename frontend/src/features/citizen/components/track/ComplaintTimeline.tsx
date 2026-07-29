import { STATUS_PROGRESS_PCT } from '../../../../constants/statuses';
import type { ComplaintStatus } from '../../../../types/complaint.types';

interface ComplaintTimelineProps {
  status: ComplaintStatus;
}

export function ComplaintTimeline({ status }: ComplaintTimelineProps) {
  const steps: { label: ComplaintStatus; desc: string }[] = [
    { label: 'Pending', desc: 'Complaint registered, awaiting official review' },
    { label: 'In Progress', desc: 'Field crew assigned, repair work ongoing' },
    { label: 'Resolved', desc: 'Repair complete and quality verified' },
  ];

  const pct = STATUS_PROGRESS_PCT[status] || 20;

  return (
    <div style={{ margin: '16px 0' }}>
      {/* Progress track */}
      <div className="progress-track" style={{ height: 6, marginBottom: 16 }}>
        <div className="progress-fill" style={{ width: `${pct}%` }} />
      </div>

      {/* Steps indicators */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {steps.map(s => {
          const isDone =
            status === 'Resolved' ||
            (status === 'In Progress' && s.label !== 'Resolved') ||
            (status === 'Pending' && s.label === 'Pending');

          return (
            <div key={s.label} style={{ opacity: isDone ? 1 : 0.4, flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: isDone ? 'var(--orange)' : 'var(--muted)' }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
