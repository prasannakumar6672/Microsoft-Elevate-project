import React, { useState } from 'react';
import { Textarea } from '../../../../components/atoms/Input/Textarea';
import { Button } from '../../../../components/atoms/Button/Button';
import { Spinner } from '../../../../components/atoms/Spinner/Spinner';
import type { ComplaintStatus } from '../../../../types/complaint.types';

interface ResponseFormProps {
  currentStatus: ComplaintStatus;
  onSubmit: (response: string, newStatus: ComplaintStatus) => Promise<void>;
  isSubmitting: boolean;
}

export function ResponseForm({ currentStatus, onSubmit, isSubmitting }: ResponseFormProps) {
  const [response, setResponse] = useState('');
  const [newStatus, setNewStatus] = useState<ComplaintStatus>(currentStatus);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!response.trim()) return;
    await onSubmit(response, newStatus);
    setResponse('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginTop: 20 }}>
      <h5 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 10, fontSize: '0.88rem', color: 'var(--orange)', fontWeight: 700 }}>
        Deploy Response Dispatch
      </h5>

      <Textarea
        value={response}
        onChange={e => setResponse(e.target.value)}
        placeholder="Type updates for citizen portal (e.g. Inspector dispatched, repair crew scheduled)..."
        style={{ marginBottom: 14, background: 'rgba(255,255,255,0.01)' }}
        required
      />

      <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
        {(['Pending', 'In Progress', 'Resolved'] as const).map(s => (
          <button
            key={s}
            type="button"
            onClick={() => setNewStatus(s)}
            style={{
              padding: '8px 16px',
              borderRadius: 8,
              border: `1px solid ${newStatus === s ? 'var(--orange)' : 'rgba(255,255,255,0.06)'}`,
              background: newStatus === s ? 'rgba(255,92,0,0.12)' : 'rgba(255,255,255,0.01)',
              color: newStatus === s ? 'var(--orange)' : 'var(--muted)',
              fontSize: '0.78rem',
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 700,
              cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}
          >
            {s}
          </button>
        ))}
      </div>

      <Button type="submit" variant="primary" fullWidth disabled={isSubmitting || !response.trim()}>
        {isSubmitting ? <Spinner size={18} /> : null}
        <span>{isSubmitting ? 'Dispatching...' : 'Dispatch Response Updates'}</span>
      </Button>
    </form>
  );
}
