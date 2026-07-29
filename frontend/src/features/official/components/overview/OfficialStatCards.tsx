import { LayoutDashboard, Clock, Wrench, CheckCircle2 } from 'lucide-react';
import { DataCard } from '../../../../components/molecules/DataCard/DataCard';
import type { DashboardStats } from '../../../../types/dashboard.types';

interface OfficialStatCardsProps {
  stats: DashboardStats | null;
}

export function OfficialStatCards({ stats }: OfficialStatCardsProps) {
  const current = stats || { total: 18, pending: 7, in_progress: 6, resolved: 5 };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 16, marginBottom: 28 }}>
      <DataCard icon={LayoutDashboard} value={current.total} label="Total Complaints" color="var(--orange)" shadowColor="rgba(255,92,0,0.12)" />
      <DataCard icon={Clock} value={current.pending} label="Pending Response" color="var(--yellow)" shadowColor="rgba(245,158,11,0.12)" />
      <DataCard icon={Wrench} value={current.in_progress} label="In Progress" color="var(--blue)" shadowColor="rgba(59,130,246,0.12)" />
      <DataCard icon={CheckCircle2} value={current.resolved} label="Resolved Tickets" color="var(--green)" shadowColor="rgba(34,197,94,0.12)" />
    </div>
  );
}
