import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { complaintService } from '../services/complaintService';
import { Complaint, DashboardStats, HeatmapPoint, TrendData, Team, WorkOrder, OfficialResponse } from '../types';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend,
} from 'recharts';

// ── Badge helpers ──────────────────────────────────────────────────
function SevBadge({ level }: { level?: string }) {
    const cls = level === 'HIGH' ? 'badge-high' : level === 'MEDIUM' ? 'badge-medium' : 'badge-low';
    return <span className={`badge ${cls}`}>{level || 'LOW'}</span>;
}
function StatBadge({ status }: { status?: string }) {
    const cls = status === 'Pending' ? 'badge-pending' : status === 'In Progress' ? 'badge-in-progress' : 'badge-resolved';
    return <span className={`badge ${cls}`}>{status}</span>;
}

// ── TAB 1: OVERVIEW ────────────────────────────────────────────────
function OverviewTab() {
    const [stats, setStats] = useState<DashboardStats>({ total: 18, pending: 7, in_progress: 6, resolved: 5 });
    const [trends, setTrends] = useState<TrendData[]>([
        { day: 'Mon', count: 3 }, { day: 'Tue', count: 5 }, { day: 'Wed', count: 2 },
        { day: 'Thu', count: 7 }, { day: 'Fri', count: 4 }, { day: 'Sat', count: 6 }, { day: 'Sun', count: 1 },
    ]);
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        complaintService.getStats().then(setStats).catch(() => { });
        complaintService.getTrends().then(setTrends).catch(() => { });
        complaintService.getAll().then(data => setComplaints(data)).catch(() => {
            setComplaints([
                { id: '1', complaint_number: 'RG-2401', title: 'Pothole at Kukatpally', status: 'Pending', priority: 'HIGH', severity_level: 'HIGH', address: 'Kukatpally', citizen_id: 'c1', officer_name: 'Officer Ravi Kumar' },
                { id: '3', complaint_number: 'RG-2403', title: 'Pothole at Gachibowli', status: 'In Progress', priority: 'HIGH', severity_level: 'HIGH', address: 'Gachibowli', citizen_id: 'c1', officer_name: 'Officer Ravi Kumar' },
            ]);
        });
    }, []);

    const donutData = [
        { name: 'HIGH', value: complaints.filter(c => c.severity_level === 'HIGH').length || 6 },
        { name: 'MEDIUM', value: complaints.filter(c => c.severity_level === 'MEDIUM').length || 8 },
        { name: 'LOW', value: complaints.filter(c => c.severity_level === 'LOW').length || 4 },
    ];
    const COLORS = ['#EF4444', '#F59E0B', '#22C55E'];

    const highPriority = complaints.filter(c => c.severity_level === 'HIGH' && c.status !== 'Resolved');

    return (
        <div>
            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
                {[
                    { icon: '📊', num: stats.total, label: 'Total Complaints', color: 'var(--orange)' },
                    { icon: '⏳', num: stats.pending, label: 'Pending', color: 'var(--yellow)' },
                    { icon: '🔧', num: stats.in_progress, label: 'In Progress', color: 'var(--blue)' },
                    { icon: '✅', num: stats.resolved, label: 'Resolved', color: 'var(--green)' },
                ].map(s => (
                    <div key={s.label} className="card">
                        <div style={{ fontSize: '1.6rem', marginBottom: 6 }}>{s.icon}</div>
                        <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '2.2rem', color: s.color }}>{s.num}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>{s.label}</div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                <div className="card">
                    <h4 style={{ fontFamily: 'Syne', marginBottom: 16 }}>Severity Breakdown</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie data={donutData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={4} dataKey="value">
                                {donutData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
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
                <div className="card">
                    <h4 style={{ fontFamily: 'Syne', marginBottom: 16 }}>Weekly Complaints</h4>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={trends} barSize={20}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="day" tick={{ fill: '#7A7A8C', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fill: '#7A7A8C', fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip contentStyle={{ background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text)' }} />
                            <Bar dataKey="count" fill="var(--orange)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* High Priority */}
            <div className="card">
                <h4 style={{ fontFamily: 'Syne', marginBottom: 4, color: 'var(--red)' }}>🚨 High Priority — Immediate Action Required</h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: 16 }}>Complaints marked HIGH severity requiring urgent response</p>
                {highPriority.length === 0
                    ? <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>No high-priority complaints pending.</p>
                    : highPriority.map(c => (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                            <span className="pulse-dot pulse-dot-red" />
                            <span style={{ fontFamily: 'Syne', fontWeight: 700, color: 'var(--orange)', minWidth: 90 }}>{c.complaint_number}</span>
                            <span style={{ color: 'var(--muted)', fontSize: '0.85rem', flex: 1 }}>📍 {c.address}</span>
                            <StatBadge status={c.status} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

// ── TAB 2: HEATMAP ────────────────────────────────────────────────
function HeatmapTab({ region }: { region: string }) {
    const [points, setPoints] = useState<HeatmapPoint[]>([]);
    const [hovered, setHovered] = useState<HeatmapPoint | null>(null);

    useEffect(() => {
        complaintService.getHeatmap().then(setPoints).catch(() => {
            setPoints([
                { area: 'Kukatpally', complaint_count: 8, severity: 'HIGH', latitude: 17.4947, longitude: 78.3996 },
                { area: 'Mehdipatnam', complaint_count: 5, severity: 'MEDIUM', latitude: 17.3945, longitude: 78.4440 },
                { area: 'Gachibowli', complaint_count: 3, severity: 'HIGH', latitude: 17.4401, longitude: 78.3489 },
                { area: 'Begumpet', complaint_count: 2, severity: 'LOW', latitude: 17.4441, longitude: 78.4646 },
            ]);
        });
    }, []);

    const sevColor = (s: string) => s === 'HIGH' ? '#EF4444' : s === 'MEDIUM' ? '#F59E0B' : '#22C55E';

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <div>
                    <h3 style={{ fontFamily: 'Syne', marginBottom: 4 }}>Complaint Density — {region}</h3>
                    <div style={{ display: 'flex', gap: 16, fontSize: '0.78rem' }}>
                        {[['HIGH', '#EF4444'], ['MEDIUM', '#F59E0B'], ['LOW', '#22C55E']].map(([l, c]) => (
                            <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                                <div style={{ width: 10, height: 10, borderRadius: '50%', background: c as string }} />
                                <span style={{ color: 'var(--muted)' }}>{l}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* SVG Map */}
            <div style={{
                background: 'var(--card2)', borderRadius: 16, border: '1px solid var(--border)',
                overflow: 'hidden', position: 'relative', height: 380, marginBottom: 24,
                backgroundImage: `linear-gradient(rgba(255,92,0,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,92,0,0.04) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
            }}>
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                    {/* Road lines */}
                    <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,92,0,0.15)" strokeWidth="3" strokeDasharray="8 4" />
                    <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(255,92,0,0.15)" strokeWidth="3" strokeDasharray="8 4" />
                    <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="rgba(255,92,0,0.08)" strokeWidth="2" strokeDasharray="6 4" />

                    {/* Complaint dots */}
                    {points.map((p, i) => {
                        const x = 15 + ((i % 4) * 22) + '%';
                        const y = 20 + (Math.floor(i / 2) * 40) + '%';
                        const r = Math.max(18, p.complaint_count * 4);
                        const color = sevColor(p.severity);
                        return (
                            <g key={p.area}
                                onMouseEnter={() => setHovered(p)}
                                onMouseLeave={() => setHovered(null)}
                                style={{ cursor: 'pointer' }}>
                                <circle cx={x} cy={y} r={r} fill={color} opacity="0.15">
                                    <animate attributeName="r" from={r} to={r + 8} dur="1.8s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="0.15" to="0" dur="1.8s" repeatCount="indefinite" />
                                </circle>
                                <circle cx={x} cy={y} r={r * 0.6} fill={color} opacity="0.6" />
                                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#fff" fontSize="11" fontWeight="bold">{p.complaint_count}</text>
                            </g>
                        );
                    })}
                </svg>

                {/* Tooltip */}
                {hovered && (
                    <div style={{
                        position: 'absolute', top: 16, right: 16,
                        background: 'var(--card)', border: '1px solid var(--border)',
                        borderRadius: 10, padding: '12px 16px', minWidth: 160,
                    }}>
                        <div style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 4 }}>{hovered.area}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 4 }}>📊 {hovered.complaint_count} complaints</div>
                        <SevBadge level={hovered.severity} />
                    </div>
                )}
            </div>

            {/* Hotspot cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 14 }}>
                {[...points].sort((a, b) => b.complaint_count - a.complaint_count).slice(0, 4).map(p => (
                    <div key={p.area} className="card" style={{ padding: 16 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                            <span style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.9rem' }}>{p.area}</span>
                            <SevBadge level={p.severity} />
                        </div>
                        <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '2rem', color: sevColor(p.severity) }}>{p.complaint_count}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>complaints</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ── TAB 3: ALL COMPLAINTS ─────────────────────────────────────────
function ComplaintsTab() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [filter, setFilter] = useState('All');
    const [search, setSearch] = useState('');
    const [selected, setSelected] = useState<Complaint | null>(null);
    const [response, setResponse] = useState('');
    const [newStatus, setNewStatus] = useState('');
    const [responding, setResponding] = useState(false);
    const [responses, setResponses] = useState<OfficialResponse[]>([]);

    const fetchData = () => {
        complaintService.getAll().then(setComplaints).catch(() => {
            setComplaints([
                { id: '1', complaint_number: 'RG-2401', title: 'Pothole at Kukatpally', status: 'Pending', priority: 'HIGH', severity_level: 'HIGH', damage_type: 'Pothole', address: 'KPHB Phase 6, Kukatpally', citizen_id: 'c1', citizen_name: 'Prasanna Kumar', officer_name: 'Officer Ravi Kumar', created_at: new Date().toISOString(), description: 'Large pothole near bus stop.' },
                { id: '2', complaint_number: 'RG-2402', title: 'Crack at Mehdipatnam', status: 'In Progress', priority: 'MEDIUM', severity_level: 'MEDIUM', damage_type: 'Crack', address: 'Mehdipatnam Circle', citizen_id: 'c1', citizen_name: 'Prasanna Kumar', officer_name: 'Officer Ravi Kumar', created_at: new Date().toISOString(), description: 'Multiple cracks visible.' },
                { id: '3', complaint_number: 'RG-2405', title: 'Potholes after rain', status: 'In Progress', priority: 'MEDIUM', severity_level: 'MEDIUM', damage_type: 'Pothole', address: 'Mehdipatnam Flyover', citizen_id: 'c1', citizen_name: 'Prasanna Kumar', officer_name: 'Officer Ravi Kumar', created_at: new Date().toISOString(), description: 'Cluster of potholes.' },
            ]);
        });
    };

    useEffect(() => { fetchData(); }, []);

    const filters = ['All', 'HIGH', 'MEDIUM', 'LOW', 'Pending', 'In Progress', 'Resolved'];
    const filtered = complaints.filter(c => {
        const matchFilter = filter === 'All' || c.severity_level === filter || c.status === filter;
        const matchSearch = !search || c.complaint_number.includes(search) || (c.address || '').toLowerCase().includes(search.toLowerCase());
        return matchFilter && matchSearch;
    });

    const handleSelect = async (c: Complaint) => {
        setSelected(c); setResponse(''); setNewStatus(c.status);
        complaintService.getResponses(c.id).then(setResponses).catch(() => setResponses([]));
    };

    const sendResponse = async () => {
        if (!selected) return; setResponding(true);
        try {
            await complaintService.respond(selected.id, response, newStatus);
            await fetchData();
            setSelected(prev => prev ? { ...prev, status: newStatus as any } : prev);
            setResponse('');
        } catch { }
        setResponding(false);
    };

    const progressPct = (s: string) => s === 'Pending' ? 15 : s === 'In Progress' ? 60 : 100;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1fr 1.2fr' : '1fr', gap: 20, transition: 'all 0.3s' }}>
            {/* Left: list */}
            <div>
                {/* Filters */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: '5px 12px', borderRadius: 20, border: `1px solid ${filter === f ? 'var(--orange)' : 'var(--border)'}`,
                            background: filter === f ? 'rgba(255,92,0,0.15)' : 'transparent',
                            color: filter === f ? 'var(--orange)' : 'var(--muted)',
                            fontSize: '0.78rem', fontFamily: 'Syne', fontWeight: 700, cursor: 'pointer',
                        }}>{f}</button>
                    ))}
                </div>
                <input className="input" placeholder="🔍 Search by ID or area..." value={search} onChange={e => setSearch(e.target.value)} style={{ marginBottom: 14 }} />

                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, maxHeight: 500, overflowY: 'auto' }}>
                    {filtered.map(c => (
                        <div key={c.id} onClick={() => handleSelect(c)} style={{
                            padding: 14, borderRadius: 12, cursor: 'pointer',
                            background: selected?.id === c.id ? 'rgba(255,92,0,0.08)' : 'var(--card2)',
                            border: `1px solid ${selected?.id === c.id ? 'var(--orange)' : 'var(--border)'}`,
                            transition: 'all 0.2s',
                        }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontFamily: 'Syne', fontWeight: 700, color: 'var(--orange)', fontSize: '0.85rem' }}>{c.complaint_number}</span>
                                <StatBadge status={c.status} />
                            </div>
                            <div style={{ display: 'flex', gap: 6, marginBottom: 4 }}><SevBadge level={c.severity_level} /><span style={{ color: 'var(--muted)', fontSize: '0.78rem' }}>{c.damage_type}</span></div>
                            <div style={{ color: 'var(--text)', fontSize: '0.85rem', marginBottom: 4 }}>📍 {c.address}</div>
                            <div className="progress-track"><div className="progress-fill" style={{ width: `${progressPct(c.status)}%` }} /></div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: respond panel */}
            {selected && (
                <div style={{ background: 'var(--card)', borderRadius: 16, border: '1px solid var(--border)', padding: 20, maxHeight: 600, overflowY: 'auto' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                        <h4 style={{ fontFamily: 'Syne' }}>Complaint Detail</h4>
                        <button onClick={() => setSelected(null)} style={{ background: 'none', color: 'var(--muted)', fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>✕</button>
                    </div>
                    {/* Details */}
                    <div style={{ display: 'grid', gap: 8, marginBottom: 16 }}>
                        {[
                            ['ID', selected.complaint_number],
                            ['Damage Type', selected.damage_type || '—'],
                            ['Location', selected.address || '—'],
                            ['Citizen', selected.citizen_name || '—'],
                            ['Description', selected.description || '—'],
                        ].map(([k, v]) => (
                            <div key={k} style={{ display: 'flex', gap: 8 }}>
                                <span style={{ color: 'var(--muted)', fontSize: '0.78rem', minWidth: 90 }}>{k}:</span>
                                <span style={{ fontSize: '0.85rem', flex: 1 }}>{v}</span>
                            </div>
                        ))}
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                            <span style={{ color: 'var(--muted)', fontSize: '0.78rem', minWidth: 90 }}>Severity:</span>
                            <SevBadge level={selected.severity_level} />
                        </div>
                    </div>

                    {/* Response form */}
                    <h5 style={{ fontFamily: 'Syne', marginBottom: 10, color: 'var(--orange)' }}>Official Response</h5>
                    <textarea className="input" value={response} onChange={e => setResponse(e.target.value)}
                        placeholder="e.g., Complaint received. Team Alpha assigned. Work starts 24-Feb."
                        style={{ marginBottom: 12 }} />
                    <div style={{ display: 'flex', gap: 6, marginBottom: 14, flexWrap: 'wrap' }}>
                        {['Pending', 'In Progress', 'Resolved'].map(s => (
                            <button key={s} onClick={() => setNewStatus(s)} style={{
                                padding: '7px 14px', borderRadius: 8, border: `1px solid ${newStatus === s ? 'var(--orange)' : 'var(--border)'}`,
                                background: newStatus === s ? 'rgba(255,92,0,0.12)' : 'transparent',
                                color: newStatus === s ? 'var(--orange)' : 'var(--muted)',
                                fontSize: '0.78rem', fontFamily: 'Syne', fontWeight: 700, cursor: 'pointer',
                            }}>{s}</button>
                        ))}
                    </div>
                    <button className="btn-primary" onClick={sendResponse} disabled={responding || !response} style={{ width: '100%', justifyContent: 'center' }}>
                        {responding ? '⏳ Sending...' : '→ Send Response to Citizen'}
                    </button>

                    {/* Response history */}
                    {responses.length > 0 && (
                        <div style={{ marginTop: 20 }}>
                            <h5 style={{ fontFamily: 'Syne', marginBottom: 12, color: 'var(--muted)' }}>Response History</h5>
                            {responses.map(r => (
                                <div key={r.id} style={{ padding: '10px 0', borderBottom: '1px solid var(--border)' }}>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 4 }}>
                                        {r.officer_name} • {r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}
                                        {r.status_changed_to && <> • <StatBadge status={r.status_changed_to} /></>}
                                    </div>
                                    <div style={{ fontSize: '0.85rem' }}>{r.message}</div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

// ── TAB 4: TEAMS ──────────────────────────────────────────────────
function TeamsTab() {
    const [teams, setTeams] = useState<Team[]>([]);
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [workOrders, setWorkOrders] = useState<WorkOrder[]>([]);
    const [form, setForm] = useState({ complaint_id: '', team_id: '', instructions: '', priority: 'MEDIUM' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        complaintService.getTeams().then(setTeams).catch(() => {
            setTeams([
                { id: 't1', name: 'Team Alpha', lead_name: 'Suresh M.', region: 'Kukatpally', status: 'Active', current_location: 'KPHB Phase 1', tasks_count: '3' },
                { id: 't2', name: 'Team Beta', lead_name: 'Kavitha R.', region: 'Kukatpally', status: 'Active', current_location: 'Kukatpally Main Road', tasks_count: '2' },
                { id: 't3', name: 'Team Gamma', lead_name: 'Raju K.', region: 'Kukatpally', status: 'On Break', current_location: 'Kukatpally Depot', tasks_count: '1' },
            ]);
        });
        complaintService.getAll().then(d => setComplaints(d.filter(c => c.status !== 'Resolved'))).catch(() => { });
        complaintService.getWorkOrders().then(setWorkOrders).catch(() => { });
    }, []);

    const submitOrder = async () => {
        setSubmitting(true);
        try {
            const wo = await complaintService.issueWorkOrder(form);
            setWorkOrders(prev => [wo, ...prev]);
            setForm({ complaint_id: '', team_id: '', instructions: '', priority: 'MEDIUM' });
        } catch { alert('Work order logged (demo mode).'); }
        setSubmitting(false);
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Left: Teams */}
            <div>
                <h4 style={{ fontFamily: 'Syne', marginBottom: 16 }}>Field Teams</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {teams.map(t => (
                        <div key={t.id} className="card" style={{ padding: 16 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                                <div>
                                    <div style={{ fontFamily: 'Syne', fontWeight: 700, marginBottom: 2 }}>{t.name}</div>
                                    <div style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>Lead: {t.lead_name}</div>
                                </div>
                                <span className={`badge ${t.status === 'Active' ? 'badge-resolved' : 'badge-pending'}`}>{t.status}</span>
                            </div>
                            <div style={{ color: 'var(--muted)', fontSize: '0.78rem', marginBottom: 8 }}>📍 {t.current_location}</div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>Tasks: {t.tasks_count}</span>
                                <span style={{ fontSize: '0.78rem', color: 'var(--muted)' }}>{Math.round(parseInt(t.tasks_count || '0') / 5 * 100)}% capacity</span>
                            </div>
                            <div className="progress-track">
                                <div className="progress-fill" style={{ width: `${Math.round(parseInt(t.tasks_count || '0') / 5 * 100)}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Right: issue work order */}
            <div>
                <h4 style={{ fontFamily: 'Syne', marginBottom: 16 }}>Issue Work Order</h4>
                <div className="card" style={{ marginBottom: 20 }}>
                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>Select Complaint</label>
                    <select className="input" value={form.complaint_id} onChange={e => setForm(f => ({ ...f, complaint_id: e.target.value }))} style={{ marginBottom: 14 }}>
                        <option value="">-- Select Complaint --</option>
                        {complaints.map(c => <option key={c.id} value={c.id}>{c.complaint_number} — {c.address}</option>)}
                    </select>

                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>Assign to Team</label>
                    <select className="input" value={form.team_id} onChange={e => setForm(f => ({ ...f, team_id: e.target.value }))} style={{ marginBottom: 14 }}>
                        <option value="">-- Select Team --</option>
                        {teams.filter(t => t.status === 'Active').map(t => <option key={t.id} value={t.id}>{t.name} — Lead: {t.lead_name}</option>)}
                    </select>

                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>Work Instructions</label>
                    <textarea className="input" placeholder="Instructions for the local body team..." value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} style={{ marginBottom: 14 }} />

                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6 }}>Priority Level</label>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
                        {['HIGH', 'MEDIUM', 'LOW'].map(p => (
                            <button key={p} onClick={() => setForm(f => ({ ...f, priority: p }))} style={{
                                flex: 1, padding: '8px', borderRadius: 8, border: `1px solid ${form.priority === p ? 'var(--orange)' : 'var(--border)'}`,
                                background: form.priority === p ? 'rgba(255,92,0,0.12)' : 'transparent',
                                color: form.priority === p ? 'var(--orange)' : 'var(--muted)',
                                fontSize: '0.8rem', fontFamily: 'Syne', fontWeight: 700, cursor: 'pointer',
                            }}>{p}</button>
                        ))}
                    </div>

                    <button className="btn-primary" onClick={submitOrder} disabled={submitting || !form.complaint_id || !form.team_id} style={{ width: '100%', justifyContent: 'center' }}>
                        {submitting ? '⏳ Issuing...' : '📋 Issue Work Order to Local Body →'}
                    </button>
                </div>

                {/* Work order history */}
                {workOrders.length > 0 && (
                    <div>
                        <h5 style={{ fontFamily: 'Syne', marginBottom: 10, color: 'var(--muted)' }}>Order History</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {workOrders.slice(0, 5).map(wo => (
                                <div key={wo.id} style={{ padding: '10px 14px', background: 'var(--card2)', borderRadius: 10, border: '1px solid var(--border)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontFamily: 'Syne', fontSize: '0.8rem', color: 'var(--orange)' }}>{wo.complaint_number}</span>
                                        <span className={`badge ${wo.status === 'Issued' ? 'badge-pending' : wo.status === 'Completed' ? 'badge-resolved' : 'badge-in-progress'}`}>{wo.status}</span>
                                    </div>
                                    <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>Team: {wo.team_name} • Priority: {wo.priority}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

// ── OFFICIAL DASHBOARD ────────────────────────────────────────────
export default function OfficialDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'heatmap' | 'complaints' | 'teams' | 'respond'>('overview');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const tabs = [
        { id: 'overview' as const, label: '📊 Overview' },
        { id: 'heatmap' as const, label: '🗺️ Heatmap' },
        { id: 'complaints' as const, label: '📋 All Complaints' },
        { id: 'teams' as const, label: '👷 Teams' },
        { id: 'respond' as const, label: '💬 Respond' },
    ];

    return (
        <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
            {/* Sticky header */}
            <header style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 40px', background: 'var(--dark2)',
                borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.4rem' }}>🛡️</span>
                    <span style={{ fontFamily: 'Syne', fontWeight: 800 }}>RoadGuard <span style={{ color: 'var(--orange)' }}>AI</span></span>
                    <span style={{ background: 'rgba(255,92,0,0.12)', color: 'var(--orange)', borderRadius: 6, padding: '2px 10px', fontSize: '0.72rem', fontFamily: 'Syne', fontWeight: 700, marginLeft: 8 }}>OFFICIAL</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.9rem' }}>{user?.name}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.72rem' }}>📍 {user?.region}</div>
                    </div>
                    <button className="btn-ghost" style={{ padding: '7px 16px', fontSize: '0.85rem' }}
                        onClick={() => { logout(); navigate('/login'); }}>Logout</button>
                </div>
            </header>

            {/* Tab nav */}
            <nav style={{ background: 'var(--dark2)', borderBottom: '1px solid var(--border)', padding: '0 40px' }}>
                <div style={{ display: 'flex', gap: 4, overflowX: 'auto' }}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                            padding: '12px 18px', border: 'none', background: 'transparent',
                            fontFamily: 'Syne', fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                            color: activeTab === t.id ? 'var(--orange)' : 'var(--muted)',
                            borderBottom: `2px solid ${activeTab === t.id ? 'var(--orange)' : 'transparent'}`,
                            transition: 'all 0.2s', whiteSpace: 'nowrap',
                        }}>{t.label}</button>
                    ))}
                </div>
            </nav>

            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '32px 24px' }}>
                {activeTab === 'overview' && <OverviewTab />}
                {activeTab === 'heatmap' && <HeatmapTab region={user?.region || 'Kukatpally'} />}
                {activeTab === 'complaints' && <ComplaintsTab />}
                {activeTab === 'teams' && <TeamsTab />}
                {activeTab === 'respond' && <ComplaintsTab />}
            </div>
        </div>
    );
}
