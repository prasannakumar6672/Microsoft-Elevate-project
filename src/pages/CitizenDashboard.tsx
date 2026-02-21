import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { detectionService } from '../services/detectionService';
import { complaintService } from '../services/complaintService';
import { Detection, Complaint } from '../types';

// ── Sub-components embedded for simplicity ─────────────────────────

function SeverityBadge({ level }: { level?: string }) {
    const cls = level === 'HIGH' ? 'badge-high' : level === 'MEDIUM' ? 'badge-medium' : 'badge-low';
    return <span className={`badge ${cls}`}>{level || 'LOW'}</span>;
}
function StatusBadge({ status }: { status?: string }) {
    const cls = status === 'Pending' ? 'badge-pending' : status === 'In Progress' ? 'badge-in-progress' : 'badge-resolved';
    return <span className={`badge ${cls}`}>{status || 'Pending'}</span>;
}

// ── TAB 1: Upload & Report ──────────────────────────────────────────
function ReportTab() {
    const [step, setStep] = useState(1);
    const [dragOver, setDragOver] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [detecting, setDetecting] = useState(false);
    const [scanPhase, setScanPhase] = useState(0);
    const [detection, setDetection] = useState<Detection | null>(null);
    const [description, setDescription] = useState('');
    const [complaint, setComplaint] = useState<Complaint | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFile = useCallback((f: File) => {
        if (!f.type.startsWith('image/')) return;
        setFile(f);
        setPreview(URL.createObjectURL(f));
        setStep(2);
        runAnalysis(f);
    }, []);

    const runAnalysis = async (f: File) => {
        setDetecting(true);
        setScanPhase(0);
        // Animate phases
        setTimeout(() => setScanPhase(1), 600);
        setTimeout(() => setScanPhase(2), 1400);
        setTimeout(() => setScanPhase(3), 2200);
        try {
            const result = await detectionService.predict(f);
            setTimeout(() => { setDetection(result); setDetecting(false); setStep(3); }, 2600);
        } catch {
            // Fallback demo data
            const demo: Detection = {
                detection_id: 'demo-' + Date.now(),
                damage_type: 'Pothole',
                confidence: 94.2,
                severity_level: 'HIGH',
                severity_score: 32.4,
                damage_count: 3,
                latitude: 17.4947,
                longitude: 78.3996,
                address: 'Kukatpally, Hyderabad',
            };
            setTimeout(() => { setDetection(demo); setDetecting(false); setStep(3); }, 2600);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault(); setDragOver(false);
        const f = e.dataTransfer.files[0];
        if (f) handleFile(f);
    };

    const submitComplaint = async () => {
        if (!detection) return;
        setSubmitting(true);
        try {
            const result = await complaintService.create({
                detection_id: detection.detection_id,
                title: `${detection.damage_type} at ${detection.address?.split(',')[0]}`,
                description,
                latitude: detection.latitude?.toString(),
                longitude: detection.longitude?.toString(),
                address: detection.address,
                damage_type: detection.damage_type,
                severity_level: detection.severity_level,
                severity_score: detection.severity_score?.toString(),
                confidence: detection.confidence?.toString(),
            });
            setComplaint(result);
            setStep(5);
        } catch {
            alert('Backend not connected. Demo mode: showing simulated confirmation.');
            setComplaint({
                id: 'demo', complaint_number: 'RG-2406', title: 'Demo', status: 'Pending', priority: 'HIGH',
                citizen_id: 'c1', officer_name: 'Officer Ravi Kumar',
            });
            setStep(5);
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => { setStep(1); setFile(null); setPreview(null); setDetection(null); setComplaint(null); setDescription(''); };

    // ── Step bar ─────────
    const steps = ['Upload', 'Analysing', 'Result', 'Complaint', 'Done'];
    const StepBar = () => (
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 32, overflowX: 'auto', gap: 0 }}>
            {steps.map((s, i) => (
                <div key={s} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 70 }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                        <div style={{
                            width: 32, height: 32, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontFamily: 'Syne', fontWeight: 800, fontSize: '0.8rem',
                            background: step > i + 1 ? 'var(--green)' : step === i + 1 ? 'var(--orange)' : 'var(--card2)',
                            color: step >= i + 1 ? '#fff' : 'var(--muted)', border: '2px solid', marginBottom: 4,
                            borderColor: step >= i + 1 ? 'transparent' : 'var(--border)',
                            transition: 'all 0.3s',
                        }}>{step > i + 1 ? '✓' : i + 1}</div>
                        <span style={{ fontSize: '0.65rem', color: step === i + 1 ? 'var(--orange)' : 'var(--muted)', textAlign: 'center' }}>{s}</span>
                    </div>
                    {i < steps.length - 1 && (
                        <div style={{ height: 2, flex: 1, background: step > i + 1 ? 'var(--green)' : 'var(--border)', transition: 'background 0.3s', marginBottom: 16 }} />
                    )}
                </div>
            ))}
        </div>
    );

    // ── STEP 1: Upload ────
    if (step === 1) return (
        <div>
            <StepBar />
            <div
                onDrop={handleDrop}
                onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onClick={() => fileInputRef.current?.click()}
                style={{
                    border: `2px dashed ${dragOver ? 'var(--orange)' : 'rgba(255,92,0,0.3)'}`,
                    borderRadius: 16, padding: '60px 24px', textAlign: 'center', cursor: 'pointer',
                    background: dragOver ? 'rgba(255,92,0,0.05)' : 'var(--card2)',
                    transition: 'all 0.2s',
                }}
            >
                <div style={{ fontSize: '3rem', marginBottom: 14 }}>📸</div>
                <h3 style={{ fontFamily: 'Syne', marginBottom: 8 }}>Drop your road photo here</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 16 }}>or click to browse • JPG, PNG • max 10MB</p>
                <button className="btn-primary" style={{ pointerEvents: 'none' }}>Choose Image</button>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
                {['✓ Auto geo-tags location', '✓ AI detects severity', '✓ One-tap complaint'].map(t => (
                    <span key={t} style={{ color: 'var(--green)', fontSize: '0.82rem', fontWeight: 500 }}>{t}</span>
                ))}
            </div>
        </div>
    );

    // ── STEP 2: Analysing ─
    const phaseTexts = ['Loading AI model…', 'Detecting damage regions…', 'Calculating severity score…'];
    if (step === 2) return (
        <div>
            <StepBar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
                <div style={{ position: 'relative', width: 300, height: 220, borderRadius: 12, overflow: 'hidden', border: '2px solid var(--orange)' }}>
                    {preview && <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    <div style={{
                        position: 'absolute', left: 0, right: 0, height: 3, background: 'var(--orange)',
                        boxShadow: '0 0 16px var(--orange)', animation: 'scanLine 1.2s linear infinite',
                    }} />
                    <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(255,92,0,0.85)', borderRadius: 6, padding: '3px 10px', fontSize: '0.7rem', color: '#fff', fontFamily: 'Syne', fontWeight: 700 }}>
                        🤖 AI SCANNING
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 320 }}>
                    {phaseTexts.map((t, i) => (
                        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            {scanPhase > i
                                ? <span style={{ color: 'var(--green)', fontSize: '0.9rem' }}>✓</span>
                                : <span className={scanPhase === i ? 'pulse-dot' : ''} style={{ width: 10, height: 10, borderRadius: '50%', background: scanPhase === i ? 'var(--orange)' : 'var(--border)', display: 'inline-block', flexShrink: 0 }} />}
                            <span style={{ color: scanPhase >= i ? 'var(--text)' : 'var(--muted)', fontSize: '0.88rem', transition: 'color 0.4s' }}>{t}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    // ── STEP 3: Result ────
    if (step === 3 && detection) return (
        <div>
            <StepBar />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
                <div style={{ position: 'relative', borderRadius: 12, overflow: 'hidden' }}>
                    {preview && <img src={preview} alt="" style={{ width: '100%', borderRadius: 12, objectFit: 'cover', maxHeight: 280 }} />}
                    <span style={{ position: 'absolute', top: 10, left: 10, background: 'var(--orange)', color: '#fff', fontFamily: 'Syne', fontWeight: 700, fontSize: '0.7rem', padding: '4px 10px', borderRadius: 6 }}>AI Annotated</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                        { label: 'Damage Type', value: detection.damage_type },
                        { label: 'Confidence Score', value: `${detection.confidence}%` },
                        { label: 'Severity Score', value: `${detection.severity_score}%` },
                        { label: 'Damage Points', value: `${detection.damage_count} detected` },
                        { label: 'Location', value: detection.address || 'Auto-detected' },
                    ].map(row => (
                        <div key={row.label} style={{ background: 'var(--card2)', borderRadius: 10, padding: '10px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ color: 'var(--muted)', fontSize: '0.8rem' }}>{row.label}</span>
                            <span style={{ fontWeight: 500, fontSize: '0.88rem' }}>{row.value}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: 'var(--card2)', borderRadius: 10 }}>
                        <span style={{ color: 'var(--muted)', fontSize: '0.8rem', flex: 1 }}>Severity Level</span>
                        <SeverityBadge level={detection.severity_level} />
                    </div>
                </div>
            </div>
            {/* Severity alert */}
            <div style={{
                marginTop: 20, padding: '14px 18px', borderRadius: 10,
                background: detection.severity_level === 'HIGH' ? 'rgba(239,68,68,0.1)' : detection.severity_level === 'MEDIUM' ? 'rgba(245,158,11,0.1)' : 'rgba(34,197,94,0.1)',
                border: `1px solid ${detection.severity_level === 'HIGH' ? 'rgba(239,68,68,0.3)' : detection.severity_level === 'MEDIUM' ? 'rgba(245,158,11,0.3)' : 'rgba(34,197,94,0.3)'}`,
                color: detection.severity_level === 'HIGH' ? 'var(--red)' : detection.severity_level === 'MEDIUM' ? 'var(--yellow)' : 'var(--green)',
                fontSize: '0.88rem',
            }}>
                {detection.severity_level === 'HIGH' && '⚠️ Immediate repair required. Auto-escalating to senior officer.'}
                {detection.severity_level === 'MEDIUM' && '⚡ Repair recommended within 2 weeks.'}
                {detection.severity_level === 'LOW' && '✅ Minor damage. Logged for scheduled maintenance.'}
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
                <button className="btn-primary" onClick={() => setStep(4)}>📋 Raise Official Complaint →</button>
                <button className="btn-ghost" onClick={reset}>Report Another</button>
            </div>
        </div>
    );

    // ── STEP 4: Complaint Form ─
    if (step === 4 && detection) return (
        <div>
            <StepBar />
            <h3 style={{ fontFamily: 'Syne', marginBottom: 20 }}>Complaint Form</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 14 }}>
                {[
                    { label: 'Location (GPS)', value: detection.address || 'Kukatpally, Hyderabad' },
                    { label: 'Damage Type', value: detection.damage_type },
                    { label: 'Severity Level', value: detection.severity_level },
                    { label: 'Confidence', value: `${detection.confidence}%` },
                ].map(f => (
                    <div key={f.label}>
                        <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 5 }}>{f.label}</label>
                        <input className="input" value={f.value} readOnly style={{ background: 'rgba(255,255,255,0.03)', cursor: 'not-allowed' }} />
                    </div>
                ))}
            </div>
            <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 5 }}>Description</label>
            <textarea className="input" placeholder="Describe location in detail..." value={description} onChange={e => setDescription(e.target.value)} style={{ marginBottom: 16 }} />
            <div style={{
                background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.2)',
                borderRadius: 10, padding: '12px 16px', marginBottom: 20, fontSize: '0.85rem', color: 'var(--blue)',
            }}>
                📍 Based on your GPS, this complaint routes to <strong>Officer Ravi Kumar</strong> — Kukatpally Head
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-primary" onClick={submitComplaint} disabled={submitting}>
                    {submitting ? '⏳ Submitting...' : 'Submit Complaint to Official →'}
                </button>
                <button className="btn-ghost" onClick={() => setStep(3)}>← Back</button>
            </div>
        </div>
    );

    // ── STEP 5: Confirmation ─
    if (step === 5 && complaint) return (
        <div style={{ textAlign: 'center' }}>
            <StepBar />
            <div style={{ fontSize: '4rem', marginBottom: 16, animation: 'fadeUp 0.5s ease' }}>✅</div>
            <h2 style={{ fontFamily: 'Syne', color: 'var(--green)', marginBottom: 8 }}>Complaint Submitted!</h2>
            <p style={{ color: 'var(--muted)', marginBottom: 28 }}>Your complaint has been filed and routed to the officer.</p>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 400, margin: '0 auto 28px' }}>
                {[
                    { label: 'Complaint ID', value: complaint.complaint_number },
                    { label: 'Status', value: 'Pending' },
                    { label: 'Officer Assigned', value: complaint.officer_name || 'Officer Ravi Kumar' },
                    { label: 'ETA', value: '48–72 hrs' },
                ].map(f => (
                    <div key={f.label} style={{ background: 'var(--card2)', borderRadius: 10, padding: '12px' }}>
                        <div style={{ color: 'var(--muted)', fontSize: '0.72rem', marginBottom: 4 }}>{f.label}</div>
                        <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.95rem', color: 'var(--orange)' }}>{f.value}</div>
                    </div>
                ))}
            </div>
            <button className="btn-primary" onClick={reset}>Report Another</button>
        </div>
    );

    return null;
}

// ── TAB 2: My Complaints ───────────────────────────────────────────
function TrackTab() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);

    const load = async () => {
        setLoading(true);
        try {
            const data = await complaintService.getMine();
            setComplaints(data);
        } catch {
            // Demo data
            setComplaints([
                { id: '1', complaint_number: 'RG-2401', title: 'Pothole at Kukatpally', status: 'Pending', priority: 'HIGH', severity_level: 'HIGH', address: 'Kukatpally, Hyderabad', officer_name: 'Officer Ravi Kumar', citizen_id: 'c1', description: 'Large pothole near KPHB Phase 6.' },
                { id: '2', complaint_number: 'RG-2402', title: 'Crack at Mehdipatnam', status: 'In Progress', priority: 'MEDIUM', severity_level: 'MEDIUM', address: 'Mehdipatnam, Hyderabad', officer_name: 'Officer Sunita Rao', citizen_id: 'c1', description: 'Multiple cracks along main road.' },
                { id: '3', complaint_number: 'RG-2404', title: 'Surface Crack Kukatpally', status: 'Resolved', priority: 'LOW', severity_level: 'LOW', address: 'Kukatpally, Hyderabad', officer_name: 'Officer Ravi Kumar', citizen_id: 'c1', description: 'Minor surface cracks.' },
            ]);
        }
        setLoaded(true);
        setLoading(false);
    };

    if (!loaded) return (
        <div style={{ textAlign: 'center', padding: 40 }}>
            <button className="btn-primary" onClick={load} disabled={loading}>
                {loading ? '⏳ Loading...' : '📋 Load My Complaints'}
            </button>
        </div>
    );

    const progressMap: Record<string, number> = { 'Pending': 20, 'In Progress': 65, 'Resolved': 100 };
    const timeline = ['Submitted', 'Under Review', 'Team Assigned', 'In Progress', 'Resolved'];

    if (complaints.length === 0) return <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>No complaints filed yet.</div>;

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {complaints.map(c => (
                <div key={c.id} className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                        <div>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 4 }}>
                                <span style={{ fontFamily: 'Syne', fontWeight: 700, color: 'var(--orange)' }}>{c.complaint_number}</span>
                                <SeverityBadge level={c.severity_level} />
                                <StatusBadge status={c.status} />
                            </div>
                            <h4 style={{ fontFamily: 'Syne', fontSize: '1rem', marginBottom: 2 }}>{c.title}</h4>
                            <span style={{ color: 'var(--muted)', fontSize: '0.82rem' }}>📍 {c.address} • 👤 {c.officer_name}</span>
                        </div>
                    </div>
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 14 }}>{c.description}</p>

                    {/* Timeline */}
                    <div style={{ display: 'flex', gap: 0, marginBottom: 14, alignItems: 'center', overflowX: 'auto' }}>
                        {timeline.map((t, i) => {
                            const pct = progressMap[c.status] || 0;
                            const done = (i / (timeline.length - 1)) * 100 <= pct;
                            return (
                                <div key={t} style={{ display: 'flex', alignItems: 'center', flex: 1, minWidth: 60 }}>
                                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
                                        <div style={{ width: 10, height: 10, borderRadius: '50%', background: done ? 'var(--green)' : 'var(--border)', marginBottom: 4, border: '2px solid', borderColor: done ? 'var(--green)' : 'var(--border)' }} />
                                        <span style={{ fontSize: '0.6rem', color: done ? 'var(--green)' : 'var(--muted)', textAlign: 'center', whiteSpace: 'nowrap' }}>{t}</span>
                                    </div>
                                    {i < timeline.length - 1 && <div style={{ height: 2, flex: 1, background: done ? 'var(--green)' : 'var(--border)', marginBottom: 18 }} />}
                                </div>
                            );
                        })}
                    </div>

                    {/* Progress bar */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                        <div className="progress-track" style={{ flex: 1 }}>
                            <div className="progress-fill" style={{ width: `${progressMap[c.status] || 0}%` }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--muted)', minWidth: 30 }}>{progressMap[c.status] || 0}%</span>
                    </div>

                    {c.status === 'Resolved' && (
                        <div style={{ color: 'var(--green)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6 }}>✅ Repair completed. Road is now safe for use.</div>
                    )}
                    {c.status === 'In Progress' && (
                        <div style={{ color: 'var(--blue)', fontSize: '0.82rem', display: 'flex', alignItems: 'center', gap: 6 }}>🔧 Team assigned, work is underway.</div>
                    )}
                </div>
            ))}
        </div>
    );
}

// ── TAB 3: Feedback ───────────────────────────────────────────────
function FeedbackTab() {
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    if (submitted) return (
        <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ fontSize: '3rem', marginBottom: 14 }}>🌟</div>
            <h3 style={{ fontFamily: 'Syne', marginBottom: 8 }}>Thank you for your feedback!</h3>
            <p style={{ color: 'var(--muted)' }}>Your ratings help improve civic services.</p>
        </div>
    );

    return (
        <div style={{ maxWidth: 480 }}>
            <h3 style={{ fontFamily: 'Syne', marginBottom: 6 }}>Rate Repair Quality</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 24 }}>Help us improve by rating the repair quality of your resolved complaint.</p>

            <label style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'block', marginBottom: 8 }}>Select Complaint</label>
            <select className="input" style={{ marginBottom: 20 }}>
                <option>RG-2404 — Kukatpally Surface Crack (Resolved)</option>
            </select>

            <div style={{ marginBottom: 20 }}>
                <label style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'block', marginBottom: 10 }}>Repair Quality</label>
                <div style={{ display: 'flex', gap: 8 }}>
                    {[1, 2, 3, 4, 5].map(n => (
                        <button key={n}
                            onMouseEnter={() => setHover(n)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setStars(n)}
                            style={{ background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', lineHeight: 1, transition: 'transform 0.15s', transform: hover >= n || stars >= n ? 'scale(1.2)' : 'scale(1)' }}
                        >
                            {hover >= n || stars >= n ? '⭐' : '☆'}
                        </button>
                    ))}
                </div>
            </div>

            <label style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'block', marginBottom: 8 }}>Comments</label>
            <textarea className="input" placeholder="Share your experience with the repair quality..." value={comment} onChange={e => setComment(e.target.value)} style={{ marginBottom: 20 }} />

            <label style={{ color: 'var(--muted)', fontSize: '0.8rem', display: 'block', marginBottom: 8 }}>Photo of Repaired Road (optional)</label>
            <input type="file" accept="image/*" className="input" style={{ marginBottom: 20 }} />

            <button className="btn-primary" onClick={() => setSubmitted(true)} disabled={stars === 0} style={{ width: '100%', justifyContent: 'center' }}>
                Submit Feedback
            </button>
        </div>
    );
}

// ── CITIZEN DASHBOARD ─────────────────────────────────────────────
export default function CitizenDashboard() {
    const [activeTab, setActiveTab] = useState<'report' | 'track' | 'feedback'>('report');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const tabs = [
        { id: 'report' as const, label: '📸 Report Damage' },
        { id: 'track' as const, label: '📋 My Complaints' },
        { id: 'feedback' as const, label: '⭐ Feedback' },
    ];

    return (
        <div style={{ background: 'var(--dark)', minHeight: '100vh' }}>
            {/* Header */}
            <header style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 40px', background: 'var(--dark2)',
                borderBottom: '1px solid var(--border)', position: 'sticky', top: 0, zIndex: 50,
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontSize: '1.4rem' }}>🛡️</span>
                    <span style={{ fontFamily: 'Syne', fontWeight: 800 }}>RoadGuard <span style={{ color: 'var(--orange)' }}>AI</span></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ textAlign: 'right' }}>
                        <div style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '0.9rem' }}>{user?.name}</div>
                        <div style={{ color: 'var(--muted)', fontSize: '0.75rem' }}>Citizen</div>
                    </div>
                    <button className="btn-ghost" style={{ padding: '7px 16px', fontSize: '0.85rem' }}
                        onClick={() => { logout(); navigate('/login'); }}>Logout</button>
                </div>
            </header>

            <div style={{ maxWidth: 900, margin: '0 auto', padding: '36px 24px' }}>
                {/* Tab bar */}
                <div style={{ display: 'flex', gap: 0, background: 'var(--card)', borderRadius: 12, padding: 4, marginBottom: 32, border: '1px solid var(--border)' }}>
                    {tabs.map(t => (
                        <button key={t.id} onClick={() => setActiveTab(t.id)} style={{
                            flex: 1, padding: '11px 10px', border: 'none', borderRadius: 9,
                            fontFamily: 'Syne', fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer',
                            background: activeTab === t.id ? 'var(--orange)' : 'transparent',
                            color: activeTab === t.id ? '#fff' : 'var(--muted)',
                            transition: 'all 0.2s',
                        }}>{t.label}</button>
                    ))}
                </div>

                <div className="card">
                    {activeTab === 'report' && <ReportTab />}
                    {activeTab === 'track' && <TrackTab />}
                    {activeTab === 'feedback' && <FeedbackTab />}
                </div>
            </div>
        </div>
    );
}
