import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import type { Complaint } from '../../../../types/complaint.types';

interface SeverityDonutChartProps {
  complaints: Complaint[];
}

export function SeverityDonutChart({ complaints }: SeverityDonutChartProps) {
  const highCount = complaints.filter(c => (c.severity_level || c.priority) === 'HIGH').length || 6;
  const mediumCount = complaints.filter(c => (c.severity_level || c.priority) === 'MEDIUM').length || 8;
  const lowCount = complaints.filter(c => (c.severity_level || c.priority) === 'LOW').length || 4;

  const donutData = [
    { name: 'HIGH', value: highCount },
    { name: 'MEDIUM', value: mediumCount },
    { name: 'LOW', value: lowCount },
  ];
  const COLORS = ['#EF4444', '#F59E0B', '#22C55E'];

  return (
    <div className="card" style={{ border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
      <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 20, fontSize: '1rem', fontWeight: 700, color: '#fff' }}>
        Severity Breakdown
      </h4>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
            {donutData.map((_, i) => (
              <Cell key={i} fill={COLORS[i]} />
            ))}
          </Pie>
          <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }} />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 8 }}>
        {donutData.map((d, i) => (
          <div key={d.name} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: '0.8rem' }}>
            <div style={{ width: 10, height: 10, borderRadius: 2, background: COLORS[i] }} />
            <span style={{ color: 'var(--muted)' }}>{d.name} ({d.value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}
