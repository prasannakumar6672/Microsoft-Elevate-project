import React, { useState } from 'react';
import { FormField } from '../../../../components/molecules/FormField/FormField';
import { Select } from '../../../../components/atoms/Input/Select';
import { Textarea } from '../../../../components/atoms/Input/Textarea';
import { Button } from '../../../../components/atoms/Button/Button';
import { Spinner } from '../../../../components/atoms/Spinner/Spinner';
import type { Complaint } from '../../../../types/complaint.types';
import type { Team } from '../../../../types/team.types';
import type { SeverityLevel } from '../../../../types/detection.types';

interface WorkOrderFormProps {
  complaints: Complaint[];
  teams: Team[];
  onSubmit: (data: { complaint_id: string; team_id: string; instructions?: string; priority: SeverityLevel }) => Promise<void>;
  isSubmitting: boolean;
}

export function WorkOrderForm({ complaints, teams, onSubmit, isSubmitting }: WorkOrderFormProps) {
  const [complaintId, setComplaintId] = useState('');
  const [teamId, setTeamId] = useState('');
  const [instructions, setInstructions] = useState('');
  const [priority, setPriority] = useState<SeverityLevel>('MEDIUM');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!complaintId || !teamId) return;

    await onSubmit({ complaint_id: complaintId, team_id: teamId, instructions, priority });
    setComplaintId('');
    setTeamId('');
    setInstructions('');
  };

  return (
    <form onSubmit={handleSubmit} className="card" style={{ marginBottom: 24, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
      <FormField label="Select Pothole / Defect Ticket">
        <Select value={complaintId} onChange={e => setComplaintId(e.target.value)} required>
          <option value="">-- Choose Active Complaint --</option>
          {complaints.map(c => (
            <option key={c.id} value={c.id}>
              {c.complaint_number} — {c.address || c.title}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Assign Field Crew">
        <Select value={teamId} onChange={e => setTeamId(e.target.value)} required>
          <option value="">-- Choose Field Crew --</option>
          {teams.filter(t => t.status === 'Active').map(t => (
            <option key={t.id} value={t.id}>
              {t.name} — Lead: {t.lead_name}
            </option>
          ))}
        </Select>
      </FormField>

      <FormField label="Operational Instructions">
        <Textarea
          placeholder="Type instructions for material usage, lane closures, or speed limits..."
          value={instructions}
          onChange={e => setInstructions(e.target.value)}
        />
      </FormField>

      <FormField label="Priority Escalation">
        <div style={{ display: 'flex', gap: 8 }}>
          {(['HIGH', 'MEDIUM', 'LOW'] as const).map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              style={{
                flex: 1,
                padding: '9px',
                borderRadius: 8,
                border: `1px solid ${priority === p ? 'var(--orange)' : 'rgba(255,255,255,0.06)'}`,
                background: priority === p ? 'rgba(255,92,0,0.12)' : 'rgba(255,255,255,0.01)',
                color: priority === p ? 'var(--orange)' : 'var(--muted)',
                fontSize: '0.8rem',
                fontFamily: "'Plus Jakarta Sans', sans-serif",
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </FormField>

      <Button type="submit" variant="primary" fullWidth disabled={isSubmitting || !complaintId || !teamId}>
        {isSubmitting ? <Spinner size={18} /> : null}
        <span>{isSubmitting ? 'Issuing Work Order...' : 'Issue Work Order to Local Crew'}</span>
      </Button>
    </form>
  );
}
