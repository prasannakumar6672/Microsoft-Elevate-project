import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { complaintService } from '../services/complaintService';
import { Complaint, DashboardStats, HeatmapPoint, TrendData, Team, WorkOrder, OfficialResponse } from '../types';
import {
    PieChart, Pie, Cell, Tooltip, ResponsiveContainer,
    BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';
import {
    Shield,
    LayoutDashboard,
    Clock,
    Wrench,
    CheckCircle2,
    AlertOctagon,
    MapPin,
    Search,
    X,
    Users,
    ClipboardList,
    Map,
    MessageSquare,
    LogOut,
    ArrowRight,
    Building2,
    HardHat,
    AlertTriangle,
    Zap,
    Check
} from 'lucide-react';

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
interface OverviewTabProps {
    region: string;
}
function OverviewTab({ region }: OverviewTabProps) {
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
            {/* Operation Banner */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(255,92,0,0.08) 0%, rgba(59,130,246,0.04) 100%)',
                border: '1px solid rgba(255,92,0,0.15)',
                borderRadius: 16,
                padding: '24px 32px',
                marginBottom: 28,
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 220, height: 220, background: 'radial-gradient(circle, rgba(255,92,0,0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.8rem', color: '#fff', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Building2 size={24} style={{ color: 'var(--orange)' }} />
                    Operations Command Center
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: 620 }}>
                    Monitoring municipal roadway infrastructure diagnostics for the region: **{region}**. Priority escalation loops are activated for high-severity hazards.
                </p>
            </div>

            {/* Stat cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 28 }}>
                {[
                    { icon: LayoutDashboard, num: stats.total, label: 'Total Complaints', color: 'var(--orange)', shadow: 'rgba(255,92,0,0.12)' },
                    { icon: Clock, num: stats.pending, label: 'Pending Response', color: 'var(--yellow)', shadow: 'rgba(245,158,11,0.12)' },
                    { icon: Wrench, num: stats.in_progress, label: 'In Progress', color: 'var(--blue)', shadow: 'rgba(59,130,246,0.12)' },
                    { icon: CheckCircle2, num: stats.resolved, label: 'Resolved Tickets', color: 'var(--green)', shadow: 'rgba(34,197,94,0.12)' },
                ].map(s => {
                    const Icon = s.icon;
                    return (
                        <div key={s.label} className="card" style={{ boxShadow: `0 12px 32px ${s.shadow}`, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
                            <div style={{ color: s.color, marginBottom: 12 }}>
                                <Icon size={24} />
                            </div>
                            <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2.4rem', color: s.color, lineHeight: 1, marginBottom: 4 }}>{s.num}</div>
                            <div style={{ color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600 }}>{s.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Charts */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 28 }}>
                <div className="card" style={{ border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                    <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 20, fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Severity Breakdown</h4>
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
                <div className="card" style={{ border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                    <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 20, fontSize: '1rem', fontWeight: 700, color: '#fff' }}>Weekly Complaints</h4>
                    <ResponsiveContainer width="100%" height={220}>
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

            {/* High Priority Alerts */}
            <div className="card" style={{ border: '1px solid rgba(239,68,68,0.15)', background: 'rgba(239,68,68,0.02)', boxShadow: '0 12px 32px rgba(239,68,68,0.05)' }}>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4, color: 'var(--red)', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <AlertOctagon size={20} />
                    <span>High Priority — Immediate Action Required</span>
                </h4>
                <p style={{ color: 'var(--muted)', fontSize: '0.8rem', marginBottom: 16 }}>Complaints marked HIGH severity requiring urgent response</p>
                {highPriority.length === 0
                    ? <p style={{ color: 'var(--muted)', fontSize: '0.85rem' }}>No high-priority complaints pending.</p>
                    : highPriority.map(c => (
                        <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                            <span className="pulse-dot pulse-dot-red" />
                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'var(--orange)', minWidth: 90 }}>{c.complaint_number}</span>
                            <span style={{ color: 'var(--muted)', fontSize: '0.85rem', flex: 1, display: 'flex', alignItems: 'center', gap: 4 }}>
                                <MapPin size={12} />
                                <span>{c.address}</span>
                            </span>
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
                    <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 4 }}>Complaint Density Map — {region}</h3>
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

            {/* SVG Diagnostic Map Terminal */}
            <div style={{
                background: 'rgba(10, 10, 15, 0.6)', borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)',
                overflow: 'hidden', position: 'relative', height: 380, marginBottom: 24,
                backgroundImage: `linear-gradient(rgba(255,92,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,92,0,0.03) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                boxShadow: 'inset 0 0 40px rgba(0,0,0,0.8)'
            }}>
                <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0 }}>
                    {/* Glowing grid lines */}
                    <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="rgba(255,92,0,0.2)" strokeWidth="3" strokeDasharray="8 6" />
                    <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="rgba(255,92,0,0.2)" strokeWidth="3" strokeDasharray="8 6" />
                    <line x1="20%" y1="30%" x2="80%" y2="70%" stroke="rgba(59,130,246,0.12)" strokeWidth="2" strokeDasharray="6 6" />

                    {/* Complaint Radar hotspots */}
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
                                <circle cx={x} cy={y} r={r} fill={color} opacity="0.18">
                                    <animate attributeName="r" from={r} to={r + 12} dur="1.8s" repeatCount="indefinite" />
                                    <animate attributeName="opacity" from="0.18" to="0" dur="1.8s" repeatCount="indefinite" />
                                </circle>
                                <circle cx={x} cy={y} r={r * 0.5} fill={color} opacity="0.75" />
                                <circle cx={x} cy={y} r={r * 0.2} fill="#fff" opacity="0.9" />
                                <text x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="#000" fontSize="10" fontWeight="bold">{p.complaint_count}</text>
                            </g>
                        );
                    })}
                </svg>

                {/* Tooltip drawer overlay */}
                {hovered && (
                    <div className="glass" style={{
                        position: 'absolute', top: 16, right: 16,
                        borderRadius: 12, padding: '14px 18px', minWidth: 180,
                        border: '1px solid rgba(255,255,255,0.08)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.5)'
                    }}>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: '#fff', marginBottom: 4 }}>{hovered.area}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--muted)', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                            <LayoutDashboard size={12} />
                            <span>{hovered.complaint_count} complaints</span>
                        </div>
                        <SevBadge level={hovered.severity} />
                    </div>
                )}
            </div>

            {/* Hotspot details cards grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
                {[...points].sort((a, b) => b.complaint_count - a.complaint_count).slice(0, 4).map(p => (
                    <div key={p.area} className="card" style={{ padding: 18, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
                            <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.9rem', color: '#fff' }}>{p.area}</span>
                            <SevBadge level={p.severity} />
                        </div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2rem', color: sevColor(p.severity), lineHeight: 1, marginBottom: 4 }}>{p.complaint_count}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600 }}>complaints logged</div>
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
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1.2fr 1.3fr' : '1fr', gap: 24, transition: 'all 0.3s' }}>
            {/* Left: list */}
            <div>
                {/* Filters */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 16 }}>
                    {filters.map(f => (
                        <button key={f} onClick={() => setFilter(f)} style={{
                            padding: '6px 14px', borderRadius: 20, border: `1px solid ${filter === f ? 'var(--orange)' : 'rgba(255,255,255,0.06)'}`,
                            background: filter === f ? 'rgba(255,92,0,0.15)' : 'rgba(255,255,255,0.01)',
                            color: filter === f ? 'var(--orange)' : 'var(--muted)',
                            fontSize: '0.78rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, cursor: 'pointer',
                            transition: 'all 0.2s'
                        }}>{f}</button>
                    ))}
                </div>
                <div style={{ position: 'relative', marginBottom: 16 }}>
                    <input className="input" placeholder="Search by ID number or street area..." value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: 42, background: 'rgba(255,255,255,0.01)' }} />
                    <Search size={16} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, maxHeight: 500, overflowY: 'auto', paddingRight: 4 }}>
                    {filtered.map(c => {
                        const isActive = selected?.id === c.id;
                        return (
                            <div key={c.id} onClick={() => handleSelect(c)} style={{
                                padding: 16, borderRadius: 14, cursor: 'pointer',
                                background: isActive ? 'rgba(255,92,0,0.05)' : 'rgba(255,255,255,0.01)',
                                border: `1px solid ${isActive ? 'var(--orange)' : 'rgba(255,255,255,0.04)'}`,
                                transition: 'all 0.2s',
                            }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'var(--orange)', fontSize: '0.85rem' }}>{c.complaint_number}</span>
                                    <StatBadge status={c.status} />
                                </div>
                                <div style={{ display: 'flex', gap: 6, marginBottom: 8 }}><SevBadge level={c.severity_level} /><span style={{ color: 'var(--muted)', fontSize: '0.78rem', fontWeight: 500 }}>{c.damage_type}</span></div>
                                <div style={{ color: 'var(--text)', fontSize: '0.85rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <MapPin size={12} style={{ color: 'var(--muted)' }} />
                                    <span>{c.address}</span>
                                </div>
                                <div className="progress-track" style={{ height: 4 }}><div className="progress-fill" style={{ width: `${progressPct(c.status)}%` }} /></div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right: Respond detail sidebar */}
            {selected && (
                <div className="glass" style={{
                    borderRadius: 16, border: '1px solid rgba(255,255,255,0.06)', padding: 24, maxHeight: 620, overflowY: 'auto',
                    boxShadow: '0 12px 40px rgba(0,0,0,0.4)', position: 'sticky', top: 20
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', color: '#fff' }}>Complaint Detail Drawer</h4>
                        <button onClick={() => setSelected(null)} style={{ background: 'none', color: 'var(--muted)', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    </div>
                    {/* Key values details */}
                    <div style={{ display: 'grid', gap: 10, marginBottom: 20 }}>
                        {[
                            ['ID Number', selected.complaint_number],
                            ['Damage Parameter', selected.damage_type || '—'],
                            ['GPS Location', selected.address || '—'],
                            ['Reporting Citizen', selected.citizen_name || '—'],
                            ['Logs Description', selected.description || '—'],
                        ].map(([k, v]) => (
                            <div key={k}>
                                <div style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600, marginBottom: 2 }}>{k}</div>
                                <div style={{ fontSize: '0.88rem', color: '#fff' }}>{v}</div>
                            </div>
                        ))}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                            <span style={{ color: 'var(--muted)', fontSize: '0.75rem', fontWeight: 600 }}>Severity Rank:</span>
                            <SevBadge level={selected.severity_level} />
                        </div>
                    </div>

                    {/* Response form */}
                    <h5 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 10, fontSize: '0.88rem', color: 'var(--orange)', fontWeight: 700 }}>Deploy Response Dispatch</h5>
                    <textarea className="input" value={response} onChange={e => setResponse(e.target.value)}
                        placeholder="Type updates for the citizen portal (e.g. Inspector dispatched, scheduled for repair)..."
                        style={{ marginBottom: 14, background: 'rgba(255,255,255,0.01)' }} />
                    <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
                        {['Pending', 'In Progress', 'Resolved'].map(s => (
                            <button key={s} onClick={() => setNewStatus(s)} style={{
                                padding: '8px 16px', borderRadius: 8, border: `1px solid ${newStatus === s ? 'var(--orange)' : 'rgba(255,255,255,0.06)'}`,
                                background: newStatus === s ? 'rgba(255,92,0,0.12)' : 'rgba(255,255,255,0.01)',
                                color: newStatus === s ? 'var(--orange)' : 'var(--muted)',
                                fontSize: '0.78rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>{s}</button>
                        ))}
                    </div>
                    <button className="btn-primary" onClick={sendResponse} disabled={responding || !response} style={{ width: '100%', justifyContent: 'center' }}>
                        {responding ? 'Dispatching...' : 'Dispatch Response Updates'}
                    </button>

                    {/* Response history */}
                    {responses.length > 0 && (
                        <div style={{ marginTop: 24 }}>
                            <h5 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 12, color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600 }}>Log History Feed</h5>
                            {responses.map(r => (
                                <div key={r.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                    <div style={{ fontSize: '0.78rem', color: 'var(--muted)', marginBottom: 6 }}>
                                        {r.officer_name} • {r.created_at ? new Date(r.created_at).toLocaleDateString() : '—'}
                                        {r.status_changed_to && <> • <StatBadge status={r.status_changed_to} /></>}
                                    </div>
                                    <div style={{ fontSize: '0.85rem', color: '#e2e8f0', lineHeight: 1.4 }}>{r.message}</div>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 24 }}>
            {/* Left: Active field teams cards list */}
            <div>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 16 }}>Municipal Field Teams</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {teams.map(t => {
                        const tasks = parseInt(t.tasks_count || '0');
                        const capacity = Math.min(100, Math.round(tasks / 5 * 100));
                        return (
                            <div key={t.id} className="card" style={{ padding: 18, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)', boxShadow: '0 8px 24px rgba(0,0,0,0.15)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                                    <div>
                                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
                                            <HardHat size={16} style={{ color: 'var(--orange)' }} />
                                            <span>{t.name}</span>
                                        </div>
                                        <div style={{ color: 'var(--muted)', fontSize: '0.8rem', marginTop: 2 }}>Lead Dispatch: {t.lead_name}</div>
                                    </div>
                                    <span className={`badge ${t.status === 'Active' ? 'badge-resolved' : 'badge-pending'}`}>{t.status}</span>
                                </div>
                                <div style={{ color: 'var(--muted)', fontSize: '0.78rem', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 4 }}>
                                    <MapPin size={12} />
                                    <span>Location: {t.current_location}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500 }}>Crew Capacity: {t.tasks_count} active orders</span>
                                    <span style={{ fontSize: '0.78rem', color: 'var(--muted)', fontWeight: 500 }}>{capacity}% load</span>
                                </div>
                                <div className="progress-track" style={{ height: 4 }}>
                                    <div className="progress-fill" style={{ width: `${capacity}%` }} />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Right: Dispatch work order card forms */}
            <div>
                <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 16 }}>Issue Maintenance Order</h4>
                <div className="card" style={{ marginBottom: 24, border: '1px solid rgba(255,255,255,0.04)', background: 'rgba(255,255,255,0.01)' }}>
                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6, fontWeight: 600 }}>Select Pothole / Defect Ticket</label>
                    <select className="input" value={form.complaint_id} onChange={e => setForm(f => ({ ...f, complaint_id: e.target.value }))} style={{ marginBottom: 14, background: 'rgba(255,255,255,0.01)' }}>
                        <option value="">-- Choose Active Complaint --</option>
                        {complaints.map(c => <option key={c.id} value={c.id}>{c.complaint_number} — {c.address}</option>)}
                    </select>

                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6, fontWeight: 600 }}>Assign Field Crew</label>
                    <select className="input" value={form.team_id} onChange={e => setForm(f => ({ ...f, team_id: e.target.value }))} style={{ marginBottom: 14, background: 'rgba(255,255,255,0.01)' }}>
                        <option value="">-- Choose Field Crew --</option>
                        {teams.filter(t => t.status === 'Active').map(t => <option key={t.id} value={t.id}>{t.name} — Lead: {t.lead_name}</option>)}
                    </select>

                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6, fontWeight: 600 }}>Operational Instructions</label>
                    <textarea className="input" placeholder="Type instructions for material usage, lane closures, or speed limits..." value={form.instructions} onChange={e => setForm(f => ({ ...f, instructions: e.target.value }))} style={{ marginBottom: 14, background: 'rgba(255,255,255,0.01)' }} />

                    <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6, fontWeight: 600 }}>Priority Escalation</label>
                    <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
                        {['HIGH', 'MEDIUM', 'LOW'].map(p => (
                            <button key={p} onClick={() => setForm(f => ({ ...f, priority: p }))} style={{
                                flex: 1, padding: '9px', borderRadius: 8, border: `1px solid ${form.priority === p ? 'var(--orange)' : 'rgba(255,255,255,0.06)'}`,
                                background: form.priority === p ? 'rgba(255,92,0,0.12)' : 'rgba(255,255,255,0.01)',
                                color: form.priority === p ? 'var(--orange)' : 'var(--muted)',
                                fontSize: '0.8rem', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, cursor: 'pointer',
                                transition: 'all 0.2s'
                            }}>{p}</button>
                        ))}
                    </div>

                    <button className="btn-primary" onClick={submitOrder} disabled={submitting || !form.complaint_id || !form.team_id} style={{ width: '100%', justifyContent: 'center' }}>
                        {submitting ? 'Issuing Work Order...' : 'Issue Work Order to Local Crew'}
                    </button>
                </div>

                {/* Work order history tracker */}
                {workOrders.length > 0 && (
                    <div>
                        <h5 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 12, color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600 }}>Dispatched Logs</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {workOrders.slice(0, 5).map(wo => (
                                <div key={wo.id} style={{ padding: '12px 14px', background: 'rgba(255,255,255,0.01)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.04)' }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                                        <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.8rem', color: 'var(--orange)', fontWeight: 700 }}>{wo.complaint_number}</span>
                                        <span className={`badge ${wo.status === 'Issued' ? 'badge-pending' : wo.status === 'Completed' ? 'badge-resolved' : 'badge-in-progress'}`}>{wo.status}</span>
                                    </div>
                                    <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>Assigned: {wo.team_name} • Priority: {wo.priority}</div>
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
        { id: 'overview' as const, label: 'Overview', icon: LayoutDashboard },
        { id: 'heatmap' as const, label: 'Heatmap Radar', icon: Map },
        { id: 'complaints' as const, label: 'All Complaints', icon: ClipboardList },
        { id: 'teams' as const, label: 'Field Teams', icon: Users },
        { id: 'respond' as const, label: 'Dispatch Center', icon: MessageSquare },
    ];

    return (
        <div className="mesh-bg" style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: 'var(--dark)' }}>
            {/* Sidebar Left */}
            <aside className="glass glass-glow-orange" style={{
                width: 280,
                height: 'calc(100vh - 32px)',
                margin: 16,
                borderRadius: 16,
                display: 'flex',
                flexDirection: 'column',
                padding: '24px 20px',
                gap: 24,
                flexShrink: 0,
                zIndex: 5
            }}>
                {/* Branding */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 8px' }}>
                    <Shield size={26} style={{ color: 'var(--orange)', filter: 'drop-shadow(0 0 8px rgba(255,92,0,0.5))' }} />
                    <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.25rem', color: '#fff', letterSpacing: '-0.02em' }}>
                        RoadGuard <span style={{ color: 'var(--orange)' }}>AI</span>
                    </span>
                </div>

                {/* Profile module */}
                <div style={{
                    background: 'rgba(255,255,255,0.02)',
                    border: '1px solid rgba(255,255,255,0.05)',
                    borderRadius: 12,
                    padding: 16,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12
                }}>
                    <div style={{
                        width: 42, height: 42, borderRadius: '50%',
                        background: 'linear-gradient(135deg, var(--orange), var(--orange-light))',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, color: '#fff',
                        boxShadow: '0 4px 12px rgba(255,92,0,0.3)',
                        flexShrink: 0
                    }}>
                        {user?.name?.[0]?.toUpperCase() || 'O'}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: 4, marginTop: 2 }}>
                            <MapPin size={10} style={{ color: 'var(--orange)' }} />
                            <span>{user?.region}</span>
                        </div>
                    </div>
                </div>

                {/* Navigation menu */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    {tabs.map(t => {
                        const Icon = t.icon;
                        const active = activeTab === t.id;
                        return (
                            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                                display: 'flex', alignItems: 'center', gap: 12,
                                padding: '12px 16px', border: 'none', borderRadius: 10,
                                fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.88rem',
                                cursor: 'pointer', transition: 'all 0.25s',
                                background: active ? 'var(--orange)' : 'transparent',
                                color: active ? '#fff' : 'var(--muted)',
                                boxShadow: active ? '0 4px 16px rgba(255,92,0,0.35)' : 'none',
                                textAlign: 'left'
                            }}
                                onMouseOver={e => { if(!active) { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.04)'; (e.currentTarget as HTMLElement).style.color = '#fff'; } }}
                                onMouseOut={e => { if(!active) { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--muted)'; } }}
                            >
                                <Icon size={18} />
                                <span>{t.label}</span>
                            </button>
                        );
                    })}
                </nav>

                {/* Logout Button */}
                <button className="btn-ghost" onClick={() => { logout(); navigate('/login'); }} style={{
                    justifyContent: 'center', gap: 8, padding: '12px', borderRadius: 10,
                    width: '100%'
                }}>
                    <LogOut size={16} />
                    <span>Logout</span>
                </button>
            </aside>

            {/* Main Content Area */}
            <main className="glass glass-glow-blue" style={{
                flex: 1,
                height: 'calc(100vh - 32px)',
                margin: '16px 16px 16px 0',
                borderRadius: 16,
                padding: '36px 32px',
                overflowY: 'auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 32,
                zIndex: 1
            }}>
                {activeTab === 'overview' && <OverviewTab region={user?.region || 'Kukatpally'} />}
                {activeTab === 'heatmap' && <HeatmapTab region={user?.region || 'Kukatpally'} />}
                {activeTab === 'complaints' && <ComplaintsTab />}
                {activeTab === 'teams' && <TeamsTab />}
                {activeTab === 'respond' && <ComplaintsTab />}
            </main>
        </div>
    );
}
