import { Building2 } from 'lucide-react';
import { PageBanner } from '../../../../components/organisms/PageBanner/PageBanner';
import { OfficialStatCards } from './OfficialStatCards';
import { SeverityDonutChart } from './SeverityDonutChart';
import { WeeklyTrendsChart } from './WeeklyTrendsChart';
import { HighPriorityAlerts } from './HighPriorityAlerts';
import { useComplaintStats } from '../../../../hooks/useComplaintStats';
import { useTrends } from '../../../../hooks/useTrends';
import { useAllComplaints } from '../../../../hooks/useAllComplaints';
import { useAuth } from '../../../../store/auth/useAuth';

export function OfficialOverviewTab() {
  const { user } = useAuth();
  const { data: stats } = useComplaintStats();
  const { data: trends } = useTrends();
  const { data: complaints } = useAllComplaints();

  const region = user?.region || 'Kukatpally';

  return (
    <div>
      <PageBanner
        icon={Building2}
        title="Operations Command Center"
        subtitle={`Monitoring municipal roadway infrastructure diagnostics for region: ${region}. Priority escalation loops are active.`}
      />

      <OfficialStatCards stats={stats} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 20, marginBottom: 28 }}>
        <SeverityDonutChart complaints={complaints || []} />
        <WeeklyTrendsChart trends={trends || []} />
      </div>

      <HighPriorityAlerts complaints={complaints || []} />
    </div>
  );
}
