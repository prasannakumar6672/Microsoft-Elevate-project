import { useState } from 'react';
import { LayoutDashboard, Camera, ClipboardList, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout/DashboardLayout';
import { CitizenOverviewTab } from '../components/overview/CitizenOverviewTab';
import { ReportWizard } from '../components/report/ReportWizard';
import { TrackTab } from '../components/track/TrackTab';
import { FeedbackTab } from '../components/feedback/FeedbackTab';
import type { NavItemConfig } from '../../../components/organisms/AppSidebar/SidebarNavItem';

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'report', label: 'Report Damage', icon: Camera },
  { id: 'track', label: 'Track Tickets', icon: ClipboardList },
  { id: 'feedback', label: 'Service Feedback', icon: MessageSquare },
];

export function CitizenDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'overview' && <CitizenOverviewTab onNavigateToTab={setActiveTab} />}
      {activeTab === 'report' && <ReportWizard onTrackRedirect={() => setActiveTab('track')} />}
      {activeTab === 'track' && <TrackTab />}
      {activeTab === 'feedback' && <FeedbackTab />}
    </DashboardLayout>
  );
}

export default CitizenDashboardPage;
