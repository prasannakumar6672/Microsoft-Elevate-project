import { useState } from 'react';
import { LayoutDashboard, Map, ClipboardList, Users, MessageSquare } from 'lucide-react';
import { DashboardLayout } from '../../../components/layout/DashboardLayout/DashboardLayout';
import { OfficialOverviewTab } from '../components/overview/OfficialOverviewTab';
import { HeatmapTab } from '../components/heatmap/HeatmapTab';
import { AllComplaintsTab } from '../components/complaints/AllComplaintsTab';
import { TeamsTab } from '../components/teams/TeamsTab';
import { DispatchCenterTab } from '../components/dispatch/DispatchCenterTab';
import type { NavItemConfig } from '../../../components/organisms/AppSidebar/SidebarNavItem';

const NAV_ITEMS: NavItemConfig[] = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'heatmap', label: 'Heatmap Radar', icon: Map },
  { id: 'complaints', label: 'All Complaints', icon: ClipboardList },
  { id: 'teams', label: 'Field Teams', icon: Users },
  { id: 'respond', label: 'Dispatch Center', icon: MessageSquare },
];

export function OfficialDashboardPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <DashboardLayout
      navItems={NAV_ITEMS}
      activeTab={activeTab}
      onTabChange={setActiveTab}
    >
      {activeTab === 'overview' && <OfficialOverviewTab />}
      {activeTab === 'heatmap' && <HeatmapTab />}
      {activeTab === 'complaints' && <AllComplaintsTab />}
      {activeTab === 'teams' && <TeamsTab />}
      {activeTab === 'respond' && <DispatchCenterTab />}
    </DashboardLayout>
  );
}

export default OfficialDashboardPage;
