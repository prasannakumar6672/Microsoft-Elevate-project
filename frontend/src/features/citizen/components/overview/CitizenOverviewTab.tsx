import { Building2 } from 'lucide-react';
import { PageBanner } from '../../../../components/organisms/PageBanner/PageBanner';
import { CitizenStatCards } from './CitizenStatCards';
import { ActivityFeed } from './ActivityFeed';
import { Spinner } from '../../../../components/atoms/Spinner/Spinner';
import { AlertBanner } from '../../../../components/molecules/AlertBanner/AlertBanner';
import { useComplaints } from '../../../../hooks/useComplaints';
import { useAuth } from '../../../../store/auth/useAuth';
import type { Complaint } from '../../../../types/complaint.types';

interface CitizenOverviewTabProps {
  onNavigateToTab?: (tab: string) => void;
}

export function CitizenOverviewTab({ onNavigateToTab }: CitizenOverviewTabProps) {
  const { user } = useAuth();
  const { data: complaints, isLoading, error } = useComplaints();

  const handleSelect = (_c: Complaint) => {
    onNavigateToTab?.('track');
  };

  return (
    <div>
      <PageBanner
        icon={Building2}
        title={`Welcome back, ${user?.name || 'Citizen'} 👋`}
        subtitle="Monitor road repair progress, submit AI-assisted damage reports, and track resolution timelines."
      />

      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 40 }}>
          <Spinner size={32} />
        </div>
      ) : error ? (
        <AlertBanner type="error">{error.message}</AlertBanner>
      ) : (
        <>
          <CitizenStatCards complaints={complaints || []} />
          <ActivityFeed complaints={complaints || []} onSelectComplaint={handleSelect} />
        </>
      )}
    </div>
  );
}
