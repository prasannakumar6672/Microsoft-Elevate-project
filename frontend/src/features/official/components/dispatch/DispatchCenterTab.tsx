import { AllComplaintsTab } from '../complaints/AllComplaintsTab';

export function DispatchCenterTab() {
  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 4 }}>
          Dispatch Center — Direct Escalation Unit
        </h3>
        <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>
          Select any open complaint to send official status dispatches, update field crew notes, and notify citizens.
        </p>
      </div>

      <AllComplaintsTab />
    </div>
  );
}
