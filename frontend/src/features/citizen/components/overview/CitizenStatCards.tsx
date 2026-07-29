import { LayoutDashboard, Clock, Wrench, CheckCircle2 } from 'lucide-react';
import { DataCard } from '../../../../components/molecules/DataCard/DataCard';
import type { Complaint } from '../../../../types/complaint.types';

interface CitizenStatCardsProps {
  complaints: Complaint[];
}

export function CitizenStatCards({ complaints }: CitizenStatCardsProps) {
  const total = complaints.length;
  const pending = complaints.filter(c => c.status === 'Pending').length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
      <DataCard icon={LayoutDashboard} value={total} label="Total Reports" color="var(--orange)" shadowColor="rgba(255,92,0,0.12)" />
      <DataCard icon={Clock} value={pending} label="Under Review" color="var(--yellow)" shadowColor="rgba(245,158,11,0.12)" />
      <DataCard icon={Wrench} value={inProgress} label="In Repair" color="var(--blue)" shadowColor="rgba(59,130,246,0.12)" />
      <DataCard icon={CheckCircle2} value={resolved} label="Resolved" color="var(--green)" shadowColor="rgba(34,197,94,0.12)" />
    </div>
  );
}
