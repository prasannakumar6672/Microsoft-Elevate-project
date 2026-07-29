import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { InfoRow } from '../../../../components/molecules/InfoRow/InfoRow';
import { SeverityBadge } from '../../../../components/atoms/Badge/SeverityBadge';
import { ResponseForm } from './ResponseForm';
import { ResponseHistory } from './ResponseHistory';
import { complaintService } from '../../../../services/complaint.service';
import { useNotification } from '../../../../store/notification/useNotification';
import type { Complaint, OfficialResponse, ComplaintStatus } from '../../../../types/complaint.types';

interface ComplaintDetailDrawerProps {
  complaint: Complaint;
  onClose: () => void;
  onRefresh: () => void;
}

export function ComplaintDetailDrawer({ complaint, onClose, onRefresh }: ComplaintDetailDrawerProps) {
  const [responses, setResponses] = useState<OfficialResponse[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { notify } = useNotification();

  useEffect(() => {
    complaintService
      .getResponses(complaint.id)
      .then(setResponses)
      .catch(() => setResponses([]));
  }, [complaint.id]);

  const handleResponseSubmit = async (message: string, newStatus: ComplaintStatus) => {
    setIsSubmitting(true);
    try {
      await complaintService.respond(complaint.id, message, newStatus);
      notify({ type: 'success', message: 'Response dispatched and status updated!' });

      const updated = await complaintService.getResponses(complaint.id);
      setResponses(updated);
      onRefresh();
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Failed to submit response.';
      notify({ type: 'error', message: msg });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="glass"
      style={{
        borderRadius: 16,
        border: '1px solid rgba(255,255,255,0.06)',
        padding: 24,
        maxHeight: 620,
        overflowY: 'auto',
        boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
        position: 'sticky',
        top: 20,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', color: '#fff' }}>
          Complaint Detail Drawer
        </h4>
        <button
          onClick={onClose}
          style={{ background: 'none', color: 'var(--muted)', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}
          aria-label="Close detail panel"
        >
          <X size={18} />
        </button>
      </div>

      <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
        <InfoRow label="ID Number" value={complaint.complaint_number} />
        <InfoRow label="Damage Parameter" value={complaint.damage_type} />
        <InfoRow label="GPS Location" value={complaint.address || complaint.title} />
        <InfoRow label="Reporting Citizen" value={complaint.citizen_name} />
        <InfoRow label="Logs Description" value={complaint.description} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
          <span style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600 }}>Severity Rank:</span>
          <SeverityBadge level={complaint.severity_level || complaint.priority} />
        </div>
      </div>

      <ResponseForm
        currentStatus={complaint.status}
        onSubmit={handleResponseSubmit}
        isSubmitting={isSubmitting}
      />

      <ResponseHistory responses={responses} />
    </div>
  );
}
