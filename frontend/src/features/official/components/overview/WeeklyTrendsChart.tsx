import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import type { TrendData } from '../../../../types/dashboard.types';

interface WeeklyTrendsChartProps {
  trends: TrendData[];
}

export function WeeklyTrendsChart({ trends }: WeeklyTrendsChartProps) {
  const data = trends.length > 0 ? trends : [
    { day: 'Mon', count: 3 }, { day: 'Tue', count: 5 }, { day: 'Wed', count: 2 },
    { day: 'Thu', count: 7 }, { day: 'Fri', count: 4 }, { day: 'Sat', count: 6 }, { day: 'Sun', count: 1 },
  ];

  return (
    <div className="card" style={{ border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
      <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 20, fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
        Weekly Complaint Trends
      </h4>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} barSize={20}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
          <XAxis dataKey="day" tick={{ fill: '#7A7A8C', fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: '#7A7A8C', fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }} />
          <Bar dataKey="count" fill="var(--orange)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
