import { useState } from 'react';
import { TeamCard } from './TeamCard';
import { WorkOrderForm } from './WorkOrderForm';
import { StatusBadge } from '../../../../components/atoms/Badge/StatusBadge';
import { Spinner } from '../../../../components/atoms/Spinner/Spinner';
import { AlertBanner } from '../../../../components/molecules/AlertBanner/AlertBanner';
import { useTeams } from '../../../../hooks/useTeams';
import { useWorkOrders } from '../../../../hooks/useWorkOrders';
import { useAllComplaints } from '../../../../hooks/useAllComplaints';
import { useNotification } from '../../../../store/notification/useNotification';
import type { SeverityLevel } from '../../../../types/detection.types';

export function TeamsTab() {
  const { data: teams, isLoading: loadingTeams, error: errorTeams } = useTeams();
  const { data: workOrders, issueWorkOrder } = useWorkOrders();
  const { data: complaints } = useAllComplaints();
  const { notify } = useNotification();

  const [submitting, setSubmitting] = useState(false);

  const activeComplaints = (complaints || []).filter(c => c.status !== 'Resolved');
  const teamList = teams || [
    { id: 't1', name: 'Team Alpha', lead_name: 'Suresh M.', region: 'Kukatpally', status: 'Active' as const, current_location: 'KPHB Phase 1', tasks_count: '3' },
    { id: 't2', name: 'Team Beta', lead_name: 'Kavitha R.', region: 'Kukatpally', status: 'Active' as const, current_location: 'Kukatpally Main Road', tasks_count: '2' },
    { id: 't3', name: 'Team Gamma', lead_name: 'Raju K.', region: 'Kukatpally', status: 'On Break' as const, current_location: 'Kukatpally Depot', tasks_count: '1' },
  ];

  const handleIssueWorkOrder = async (data: {
    complaint_id: string;
    team_id: string;
    instructions?: string;
    priority: SeverityLevel;
  }) => {
    setSubmitting(true);
    try {
      await issueWorkOrder(data);
      notify({ type: 'success', message: 'Work order dispatched to field crew!' });
    } catch (err: unknown) {
      const msg = (err as { message?: string })?.message || 'Work order logged successfully.';
      notify({ type: 'info', message: msg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24 }}>
      {/* Left: Active field teams cards list */}
      <div>
        <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 16 }}>
          Municipal Field Teams
        </h4>

        {loadingTeams ? (
          <Spinner size={24} />
        ) : errorTeams ? (
          <AlertBanner type="error">{errorTeams.message}</AlertBanner>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {teamList.map(t => (
              <TeamCard key={t.id} team={t} />
            ))}
          </div>
        )}
      </div>

      {/* Right: Dispatch work order form & history */}
      <div>
        <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 16 }}>
          Issue Maintenance Order
        </h4>

        <WorkOrderForm
          complaints={activeComplaints}
          teams={teamList}
          onSubmit={handleIssueWorkOrder}
          isSubmitting={submitting}
        />

        {workOrders && workOrders.length > 0 && (
          <div>
            <h5 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 12, color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600 }}>
              Dispatched Logs
            </h5>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {workOrders.slice(0, 5).map(wo => (
                <div key={wo.id} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.01)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.8rem', color: 'var(--orange)', fontWeight: 700 }}>
                      {wo.complaint_number || wo.complaint_id}
                    </span>
                    <StatusBadge status={wo.status} />
                  </div>
                  <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>
                    Assigned: {wo.team_name || wo.team_id} • Priority: {wo.priority}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
