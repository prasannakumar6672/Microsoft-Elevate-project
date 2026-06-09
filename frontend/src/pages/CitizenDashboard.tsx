import { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { detectionService } from '../services/detectionService';
import { complaintService } from '../services/complaintService';
import { Detection, Complaint } from '../types';
import {
    Shield,
    Camera,
    Cpu,
    MapPin,
    Check,
    FileText,
    Star,
    LogOut,
    Loader2,
    Wrench,
    Sparkles,
    CheckCircle2,
    AlertTriangle,
    Zap,
    UploadCloud,
    Home,
    AlertOctagon,
    ArrowRight,
    X
} from 'lucide-react';

// ── Badge helpers ──────────────────────────────────────────────────
function SeverityBadge({ level }: { level?: string }) {
    const cls = level === 'HIGH' ? 'badge-high' : level === 'MEDIUM' ? 'badge-medium' : 'badge-low';
    return <span className={`badge ${cls}`}>{level || 'LOW'}</span>;
}
function StatusBadge({ status }: { status?: string }) {
    const cls = status === 'Pending' ? 'badge-pending' : status === 'In Progress' ? 'badge-in-progress' : 'badge-resolved';
    return <span className={`badge ${cls}`}>{status || 'Pending'}</span>;
}

// ── TAB 1: OVERVIEW (HOME) ─────────────────────────────────────────
interface OverviewProps {
    onNavigate: (tab: 'report' | 'track' | 'feedback') => void;
}
function OverviewTab({ onNavigate }: OverviewProps) {
    const { user } = useAuth();
    const [stats, setStats] = useState({ total: 3, pending: 2, resolved: 1 });
    const [complaints, setComplaints] = useState<Complaint[]>([]);

    useEffect(() => {
        complaintService.getMine().then(data => {
            const resolved = data.filter(c => c.status === 'Resolved').length;
            const pending = data.filter(c => c.status !== 'Resolved').length;
            setStats({ total: data.length, pending, resolved });
            setComplaints(data.slice(0, 3));
        }).catch(() => {
            // Default demo statistics
            setStats({ total: 3, pending: 2, resolved: 1 });
        });
    }, []);

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {/* Greeting billboard */}
            <div style={{
                background: 'linear-gradient(135deg, rgba(255,92,0,0.08) 0%, rgba(59,130,246,0.04) 100%)',
                border: '1px solid rgba(255,92,0,0.15)',
                borderRadius: 16,
                padding: '28px 32px',
                position: 'relative',
                overflow: 'hidden',
                boxShadow: 'inset 0 0 24px rgba(255,92,0,0.03)'
            }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 250, height: 250, background: 'radial-gradient(circle, rgba(255,92,0,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
                <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '1.9rem', color: '#fff', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                    Welcome back, {user?.name || 'Citizen'}! <span style={{ animation: 'float 3s ease-in-out infinite', display: 'inline-block' }}>👋</span>
                </h2>
                <p style={{ color: 'var(--muted)', fontSize: '0.92rem', lineHeight: 1.6, maxWidth: 620 }}>
                    Help make our municipal infrastructure safer. You can instantly report potholes, cracks, or road hazards using our AI scanning model and trace updates in real-time.
                </p>
            </div>

            {/* Glowing Widget Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20 }}>
                {[
                    { label: 'Total Reported', num: stats.total, icon: FileText, color: 'var(--orange)', shadow: 'rgba(255,92,0,0.12)' },
                    { label: 'Active Inspections', num: stats.pending, icon: Wrench, color: 'var(--blue)', shadow: 'rgba(59,130,246,0.12)' },
                    { label: 'Resolved Repairs', num: stats.resolved, icon: CheckCircle2, color: 'var(--green)', shadow: 'rgba(34,197,94,0.12)' }
                ].map(card => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} style={{
                            background: 'rgba(255,255,255,0.01)',
                            border: '1px solid rgba(255,255,255,0.04)',
                            borderRadius: 16,
                            padding: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            boxShadow: `0 12px 32px ${card.shadow}`,
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{ position: 'absolute', inset: 0, background: `radial-gradient(circle at 80% 20%, rgba(${card.color === 'var(--orange)' ? '255,92,0' : card.color === 'var(--blue)' ? '59,130,246' : '34,197,94'}, 0.02) 0%, transparent 60%)`, pointerEvents: 'none' }} />
                            <div>
                                <div style={{ color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 600, marginBottom: 8, letterSpacing: '0.03em' }}>{card.label}</div>
                                <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '2.5rem', color: '#fff', lineHeight: 1 }}>{card.num}</div>
                            </div>
                            <div style={{
                                width: 50, height: 50, borderRadius: 12,
                                background: `rgba(${card.color === 'var(--orange)' ? '255,92,0' : card.color === 'var(--blue)' ? '59,130,246' : '34,197,94'}, 0.08)`,
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                color: card.color,
                                boxShadow: `inset 0 0 12px rgba(${card.color === 'var(--orange)' ? '255,92,0' : card.color === 'var(--blue)' ? '59,130,246' : '34,197,94'}, 0.1)`
                            }}>
                                <Icon size={24} />
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Activities & Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
                {/* Recent activity timeline */}
                <div style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 16, padding: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
                    <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 20 }}>Recent Activity Feed</h4>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 20, position: 'relative' }}>
                        <div style={{ position: 'absolute', top: 8, bottom: 8, left: 15, width: 2, background: 'rgba(255,255,255,0.05)' }} />
                        {[
                            { time: '2 hours ago', title: 'Complaint RG-2404 Resolved', desc: 'Team Alpha completed asphalt patching at Kukatpally.', icon: CheckCircle2, color: 'var(--green)' },
                            { time: 'Yesterday', title: 'Work Order Dispatched for RG-2402', desc: 'Team Beta assigned to repair structural cracking at Mehdipatnam.', icon: Wrench, color: 'var(--blue)' },
                            { time: '3 days ago', title: 'Complaint Registered RG-2401', desc: 'Auto-detected Pothole GPS logged and routed to Officer Ravi Kumar.', icon: FileText, color: 'var(--orange)' }
                        ].map((act, i) => {
                            const ActIcon = act.icon;
                            return (
                                <div key={i} style={{ display: 'flex', gap: 16, position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                        width: 32, height: 32, borderRadius: '50%',
                                        background: 'var(--card)', border: `2px solid ${act.color}`,
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                        color: act.color, flexShrink: 0
                                    }}>
                                        <ActIcon size={14} />
                                    </div>
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                                            <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{act.title}</span>
                                            <span style={{ fontSize: '0.72rem', color: 'var(--muted)' }}>• {act.time}</span>
                                        </div>
                                        <p style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.4 }}>{act.desc}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Quick actions/Launcher */}
                <div style={{
                    background: 'rgba(255,255,255,0.01)',
                    border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: 16,
                    padding: 28,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    gap: 16,
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'radial-gradient(circle at 50% 50%, rgba(255,92,0,0.02) 0%, transparent 60%)', pointerEvents: 'none' }} />
                    <div style={{
                        width: 68, height: 68, borderRadius: '50%',
                        background: 'rgba(255,92,0,0.08)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--orange)',
                        boxShadow: '0 8px 24px rgba(255,92,0,0.25)',
                        marginBottom: 4
                    }}>
                        <Camera size={30} />
                    </div>
                    <div>
                        <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', fontWeight: 700, color: '#fff', marginBottom: 6 }}>Ready to Report?</h4>
                        <p style={{ color: 'var(--muted)', fontSize: '0.8rem', lineHeight: 1.5, maxWidth: 220, margin: '0 auto' }}>
                            Upload a photo of any road defect. Let the AI model instantly rate severity and GPS locate the issue.
                        </p>
                    </div>
                    <button className="btn-primary" onClick={() => onNavigate('report')} style={{ width: '100%', justifyContent: 'center', gap: 8, marginTop: 8 }}>
                        <span>Start AI Road Scan</span>
                        <Sparkles size={16} />
                    </button>
                </div>
            </div>
        </div>
    );
}

// ── TAB 2: Upload & Report ──────────────────────────────────────────
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
        // Animate scanning phases
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
                            fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 800, fontSize: '0.8rem',
                            background: step > i + 1 ? 'var(--green)' : step === i + 1 ? 'var(--orange)' : 'var(--card2)',
                            color: step >= i + 1 ? '#fff' : 'var(--muted)', border: '2px solid', marginBottom: 4,
                            borderColor: step >= i + 1 ? 'transparent' : 'var(--border)',
                            transition: 'all 0.3s',
                        }}>{step > i + 1 ? <Check size={14} /> : i + 1}</div>
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
                    border: `2px dashed ${dragOver ? 'var(--orange)' : 'rgba(255,92,0,0.2)'}`,
                    borderRadius: 20, padding: '70px 24px', textAlign: 'center', cursor: 'pointer',
                    background: dragOver ? 'rgba(255,92,0,0.04)' : 'rgba(255,255,255,0.01)',
                    boxShadow: dragOver ? '0 12px 40px rgba(255,92,0,0.1)' : 'none',
                    transition: 'all 0.3s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'rgba(255,92,0,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--orange)',
                    marginBottom: 16,
                    boxShadow: '0 8px 24px rgba(255,92,0,0.1)',
                    transition: 'transform 0.3s ease',
                }}
                    onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'; }}
                    onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)'; }}
                >
                    <UploadCloud size={30} />
                </div>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.2rem', color: '#fff', marginBottom: 8 }}>Drop your road photo here</h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 20 }}>or click to browse from device • JPG, PNG • max 10MB</p>
                <button className="btn-primary" style={{ pointerEvents: 'none' }}>Choose Image</button>
                <input ref={fileInputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => e.target.files?.[0] && handleFile(e.target.files[0])} />
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
                {['Auto geo-tags location', 'AI detects severity', 'One-tap complaint'].map(t => (
                    <span key={t} style={{ color: 'var(--green)', fontSize: '0.82rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <CheckCircle2 size={14} />
                        <span>{t}</span>
                    </span>
                ))}
            </div>
        </div>
    );

    // ── STEP 2: Analysing ─
    const phaseTexts = ['Loading AI model…', 'Detecting damage regions…', 'Calculating severity score…'];
    if (step === 2) return (
        <div>
            <StepBar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28, padding: '20px 0' }}>
                <div style={{
                    position: 'relative', width: 340, height: 240, borderRadius: 16, overflow: 'hidden',
                    border: '1px solid rgba(255,92,0,0.3)', boxShadow: '0 12px 40px rgba(255,92,0,0.15)'
                }}>
                    {preview && <img src={preview} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
                    {/* Glowing Scanning Line */}
                    <div style={{
                        position: 'absolute', left: 0, right: 0, height: 4, background: 'linear-gradient(to right, transparent, var(--orange), transparent)',
                        boxShadow: '0 0 20px var(--orange), 0 0 8px var(--orange)', animation: 'scanLine 1.5s ease-in-out infinite',
                    }} />
                    <div style={{
                        position: 'absolute', top: 12, left: 12, background: 'rgba(255,92,0,0.9)', borderRadius: 6, padding: '4px 12px',
                        fontSize: '0.72rem', color: '#fff', fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700,
                        display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(255,92,0,0.3)'
                    }}>
                        <Sparkles size={12} className="float-anim" />
                        <span>AI CORE DIAGNOSTICS</span>
                    </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%', maxWidth: 340 }}>
                    {phaseTexts.map((t, i) => (
                        <div key={t} style={{
                            display: 'flex', alignItems: 'center', gap: 12,
                            background: scanPhase >= i ? 'rgba(255,255,255,0.02)' : 'transparent',
                            border: '1px solid',
                            borderColor: scanPhase >= i ? 'rgba(255,255,255,0.04)' : 'transparent',
                            padding: '10px 14px', borderRadius: 10,
                            transition: 'all 0.3s'
                        }}>
                            {scanPhase > i ? (
                                <CheckCircle2 size={16} style={{ color: 'var(--green)' }} />
                            ) : scanPhase === i ? (
                                <Loader2 size={16} style={{ color: 'var(--orange)', animation: 'spin 1s linear infinite' }} />
                            ) : (
                                <div style={{ width: 16, height: 16, borderRadius: '50%', border: '2px solid var(--border)', boxSizing: 'border-box' }} />
                            )}
                            <span style={{ color: scanPhase >= i ? '#fff' : 'var(--muted)', fontSize: '0.88rem', fontWeight: scanPhase === i ? 600 : 400 }}>{t}</span>
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
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
                <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', height: 'fit-content' }}>
                    {preview && <img src={preview} alt="" style={{ width: '100%', borderRadius: 16, objectFit: 'cover', maxHeight: 310 }} />}
                    <span style={{
                        position: 'absolute', top: 12, left: 12, background: 'var(--orange)', color: '#fff',
                        fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.72rem',
                        padding: '5px 12px', borderRadius: 6, display: 'flex', alignItems: 'center', gap: 6,
                        boxShadow: '0 4px 12px rgba(255,92,0,0.35)'
                    }}>
                        <Cpu size={12} />
                        <span>AI Annotated Result</span>
                    </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {[
                        { label: 'Damage Type', value: detection.damage_type, color: 'var(--orange)' },
                        { label: 'Confidence Score', value: `${detection.confidence}%`, color: '#fff' },
                        { label: 'Severity Score', value: `${detection.severity_score}%`, color: '#fff' },
                        { label: 'Damage Points', value: `${detection.damage_count} detected`, color: '#fff' },
                        { label: 'GPS Telemetry', value: detection.address || 'Auto-detected', color: '#fff' },
                    ].map(row => (
                        <div key={row.label} style={{
                            background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)',
                            borderRadius: 12, padding: '12px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                        }}>
                            <span style={{ color: 'var(--muted)', fontSize: '0.82rem', fontWeight: 500 }}>{row.label}</span>
                            <span style={{ fontWeight: 700, fontSize: '0.92rem', color: row.color }}>{row.value}</span>
                        </div>
                    ))}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '12px 16px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 12 }}>
                        <span style={{ color: 'var(--muted)', fontSize: '0.82rem', flex: 1, fontWeight: 500 }}>Severity Level</span>
                        <SeverityBadge level={detection.severity_level} />
                    </div>
                </div>
            </div>
            {/* Severity alert card */}
            <div style={{
                marginTop: 24, padding: '14px 20px', borderRadius: 12,
                background: detection.severity_level === 'HIGH' ? 'rgba(239,68,68,0.08)' : detection.severity_level === 'MEDIUM' ? 'rgba(245,158,11,0.08)' : 'rgba(34,197,94,0.08)',
                border: `1px solid ${detection.severity_level === 'HIGH' ? 'rgba(239,68,68,0.2)' : detection.severity_level === 'MEDIUM' ? 'rgba(245,158,11,0.2)' : 'rgba(34,197,94,0.2)'}`,
                color: detection.severity_level === 'HIGH' ? 'var(--red)' : detection.severity_level === 'MEDIUM' ? 'var(--yellow)' : 'var(--green)',
                fontSize: '0.88rem',
                display: 'flex',
                alignItems: 'center',
                gap: 10
            }}>
                {detection.severity_level === 'HIGH' ? <AlertTriangle size={18} /> : detection.severity_level === 'MEDIUM' ? <Zap size={18} /> : <CheckCircle2 size={18} />}
                <span>
                    {detection.severity_level === 'HIGH' && 'Critical structural threat detected. Requiring high priority dispatcher routing.'}
                    {detection.severity_level === 'MEDIUM' && 'Moderate road defect detected. Scheduled within the general 2-week maintenance loop.'}
                    {detection.severity_level === 'LOW' && 'Minor surface wear. Logged for standard routing.'}
                </span>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
                <button className="btn-primary" onClick={() => setStep(4)} style={{ gap: 8 }}>
                    <span>Raise Official Complaint</span>
                    <ArrowRight size={16} />
                </button>
                <button className="btn-ghost" onClick={reset}>Scan New Photo</button>
            </div>
        </div>
    );

    // ── STEP 4: Complaint Form ─
    if (step === 4 && detection) return (
        <div>
            <StepBar />
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 20 }}>File Official Complaint</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
                {[
                    { label: 'Location (GPS)', value: detection.address || 'Kukatpally, Hyderabad' },
                    { label: 'Damage Type', value: detection.damage_type },
                    { label: 'Severity Level', value: detection.severity_level },
                    { label: 'Confidence', value: `${detection.confidence}%` },
                ].map(f => (
                    <div key={f.label}>
                        <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6, fontWeight: 600 }}>{f.label}</label>
                        <input className="input" value={f.value} readOnly style={{ background: 'rgba(255,255,255,0.02)', cursor: 'not-allowed', borderColor: 'rgba(255,255,255,0.03)' }} />
                    </div>
                ))}
            </div>
            <div style={{ marginBottom: 20 }}>
                <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6, fontWeight: 600 }}>Description Details</label>
                <textarea className="input" placeholder="Provide details like nearby landmarks to help the local maintenance team locate it..." value={description} onChange={e => setDescription(e.target.value)} />
            </div>
            <div style={{
                background: 'rgba(59,130,246,0.06)', border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: 12, padding: '14px 18px', marginBottom: 24, fontSize: '0.85rem', color: 'var(--blue)',
                display: 'flex', alignItems: 'center', gap: 10
            }}>
                <MapPin size={18} />
                <span>GPS telemetry automatically routes this ticket to **Officer Ravi Kumar** (Kukatpally Infrastructure Lead).</span>
            </div>
            <div style={{ display: 'flex', gap: 12 }}>
                <button className="btn-primary" onClick={submitComplaint} disabled={submitting}>
                    {submitting ? 'Submitting...' : 'Submit Complaint to Local Body'}
                </button>
                <button className="btn-ghost" onClick={() => setStep(3)}>← Back</button>
            </div>
        </div>
    );

    // ── STEP 5: Confirmation ─
    if (step === 5 && complaint) return (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <StepBar />
            <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--green)', marginBottom: 20, filter: 'drop-shadow(0 0 12px rgba(34,197,94,0.3))' }}>
                <CheckCircle2 size={64} />
            </div>
            <h2 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: 'var(--green)', fontSize: '1.75rem', marginBottom: 8 }}>Complaint Filed Successfully</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: 32 }}>Your road repair request is officially registered on the grid.</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, maxWidth: 460, margin: '0 auto 36px' }}>
                {[
                    { label: 'Complaint ID', value: complaint.complaint_number },
                    { label: 'Status Assigned', value: 'Pending' },
                    { label: 'Lead Engineer', value: complaint.officer_name || 'Officer Ravi Kumar' },
                    { label: 'Response ETA', value: '48–72 Hours' },
                ].map(f => (
                    <div key={f.label} style={{ background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)', borderRadius: 12, padding: '14px' }}>
                        <div style={{ color: 'var(--muted)', fontSize: '0.72rem', marginBottom: 4, fontWeight: 600 }}>{f.label}</div>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.95rem', color: 'var(--orange)' }}>{f.value}</div>
                    </div>
                ))}
            </div>
            <button className="btn-primary" onClick={reset}>Scan Another Road</button>
        </div>
    );

    return null;
}

// ── TAB 3: My Complaints (TRACK) ───────────────────────────────────
function TrackTab() {
    const [complaints, setComplaints] = useState<Complaint[]>([]);
    const [loading, setLoading] = useState(false);
    const [loaded, setLoaded] = useState(false);
    const [selected, setSelected] = useState<Complaint | null>(null);

    const load = async () => {
        setLoading(true);
        try {
            const data = await complaintService.getMine();
            setComplaints(data);
        } catch {
            setComplaints([
                { id: '1', complaint_number: 'RG-2401', title: 'Pothole at Kukatpally', status: 'Pending', priority: 'HIGH', severity_level: 'HIGH', address: 'Kukatpally, Hyderabad', officer_name: 'Officer Ravi Kumar', citizen_id: 'c1', description: 'Large pothole near KPHB Phase 6.' },
                { id: '2', complaint_number: 'RG-2402', title: 'Crack at Mehdipatnam', status: 'In Progress', priority: 'MEDIUM', severity_level: 'MEDIUM', address: 'Mehdipatnam, Hyderabad', officer_name: 'Officer Sunita Rao', citizen_id: 'c1', description: 'Multiple cracks along main road.' },
                { id: '3', complaint_number: 'RG-2404', title: 'Surface Crack Kukatpally', status: 'Resolved', priority: 'LOW', severity_level: 'LOW', address: 'Kukatpally, Hyderabad', officer_name: 'Officer Ravi Kumar', citizen_id: 'c1', description: 'Minor surface cracks.' },
            ]);
        }
        setLoaded(true);
        setLoading(false);
    };

    useEffect(() => { load(); }, []);

    const progressMap: Record<string, number> = { 'Pending': 20, 'In Progress': 65, 'Resolved': 100 };
    const timeline = ['Submitted', 'Under Review', 'Team Assigned', 'In Progress', 'Resolved'];

    if (loading) return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 60, gap: 12 }}>
            <Loader2 size={32} style={{ color: 'var(--orange)', animation: 'spin 1s linear infinite' }} />
            <div style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Syncing dashboard records...</div>
        </div>
    );

    if (complaints.length === 0) return <div style={{ textAlign: 'center', padding: 40, color: 'var(--muted)' }}>No complaints filed yet.</div>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: selected ? '1.2fr 1fr' : '1fr', gap: 24, transition: 'all 0.3s' }}>
            {/* List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 4 }}>Reported Issues Tracker</h3>
                {complaints.map(c => {
                    const isActive = selected?.id === c.id;
                    return (
                        <div key={c.id} onClick={() => setSelected(c)} style={{
                            padding: 18, borderRadius: 16, cursor: 'pointer',
                            background: isActive ? 'rgba(255,92,0,0.04)' : 'rgba(255,255,255,0.01)',
                            border: `1px solid ${isActive ? 'var(--orange)' : 'rgba(255,255,255,0.04)'}`,
                            boxShadow: isActive ? '0 8px 24px rgba(255,92,0,0.08)' : 'none',
                            transition: 'all 0.25s',
                        }}
                            onMouseOver={e => { if(!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'; }}
                            onMouseOut={e => { if(!isActive) e.currentTarget.style.borderColor = 'rgba(255,255,255,0.04)'; }}
                        >
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                                <span style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, color: 'var(--orange)', fontSize: '0.85rem' }}>{c.complaint_number}</span>
                                <StatusBadge status={c.status} />
                            </div>
                            <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '0.95rem', color: '#fff', marginBottom: 6 }}>{c.title}</h4>
                            <div style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 4, marginBottom: 12 }}>
                                <MapPin size={12} />
                                <span>{c.address}</span>
                            </div>
                            <div className="progress-track" style={{ height: 4 }}><div className="progress-fill" style={{ width: `${progressMap[c.status] || 0}%` }} /></div>
                        </div>
                    );
                })}
            </div>

            {/* Timeline details drawer */}
            {selected && (
                <div style={{
                    background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.04)',
                    borderRadius: 16, padding: 24, height: 'fit-content',
                    position: 'sticky', top: 20
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                        <h4 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.05rem', color: '#fff' }}>Detailed Progress</h4>
                        <button onClick={() => setSelected(null)} style={{ background: 'none', color: 'var(--muted)', display: 'flex', alignItems: 'center', border: 'none', cursor: 'pointer' }}>
                            <X size={18} />
                        </button>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 24 }}>
                        {[
                            { label: 'Issue Number', value: selected.complaint_number },
                            { label: 'Assigned Lead', value: selected.officer_name || 'Officer Ravi Kumar' },
                            { label: 'Area location', value: selected.address },
                            { label: 'Telemetry description', value: selected.description || 'No description supplied' }
                        ].map(f => (
                            <div key={f.label}>
                                <div style={{ fontSize: '0.72rem', color: 'var(--muted)', marginBottom: 2, fontWeight: 600 }}>{f.label}</div>
                                <div style={{ fontSize: '0.85rem', color: '#fff' }}>{f.value}</div>
                            </div>
                        ))}
                    </div>

                    {/* Timeline stepper */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, position: 'relative', paddingLeft: 8 }}>
                        <div style={{ position: 'absolute', top: 8, bottom: 8, left: 15, width: 2, background: 'rgba(255,255,255,0.05)' }} />
                        {timeline.map((t, i) => {
                            const pct = progressMap[selected.status] || 0;
                            const done = (i / (timeline.length - 1)) * 100 <= pct;
                            return (
                                <div key={t} style={{ display: 'flex', gap: 14, alignItems: 'center', position: 'relative', zIndex: 1 }}>
                                    <div style={{
                                        width: 16, height: 16, borderRadius: '50%',
                                        background: done ? 'var(--green)' : 'var(--card)',
                                        border: `2.5px solid ${done ? 'var(--green)' : 'var(--border)'}`,
                                        boxSizing: 'border-box'
                                    }} />
                                    <span style={{ fontSize: '0.8rem', fontWeight: done ? 700 : 400, color: done ? 'var(--green)' : 'var(--muted)' }}>{t}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}

// ── TAB 4: Feedback ───────────────────────────────────────────────
function FeedbackTab() {
    const [stars, setStars] = useState(0);
    const [hover, setHover] = useState(0);
    const [comment, setComment] = useState('');
    const [submitted, setSubmitted] = useState(false);

    if (submitted) return (
        <div style={{ textAlign: 'center', padding: 40 }}>
            <div style={{ display: 'flex', justifyContent: 'center', color: 'var(--orange)', marginBottom: 20, filter: 'drop-shadow(0 0 12px rgba(255,92,0,0.3))' }}>
                <CheckCircle2 size={48} />
            </div>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 8 }}>Rating Logged</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.88rem' }}>Thank you. Your feedback optimizes road inspection loops.</p>
        </div>
    );

    return (
        <div style={{ maxWidth: 480 }}>
            <h3 style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: '1.25rem', color: '#fff', marginBottom: 6 }}>Rate Infrastructure Fix</h3>
            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: 24 }}>Your logs directly evaluate assigned field engineering crews.</p>

            <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6, fontWeight: 600 }}>Select Resolved Case</label>
            <select className="input" style={{ marginBottom: 20 }}>
                <option>RG-2404 — Kukatpally Surface Crack (Resolved)</option>
            </select>

            <div style={{ marginBottom: 24 }}>
                <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 10, fontWeight: 600 }}>Repair Quality Rating</label>
                <div style={{ display: 'flex', gap: 10 }}>
                    {[1, 2, 3, 4, 5].map(n => (
                        <button key={n}
                            onMouseEnter={() => setHover(n)}
                            onMouseLeave={() => setHover(0)}
                            onClick={() => setStars(n)}
                            style={{
                                background: 'none', border: 'none', cursor: 'pointer',
                                padding: 0,
                                transition: 'all 0.2s ease',
                                transform: hover >= n || stars >= n ? 'scale(1.18)' : 'scale(1)',
                                filter: hover >= n || stars >= n ? 'drop-shadow(0 0 8px rgba(255,145,0,0.5))' : 'none'
                            }}
                        >
                            <Star
                                size={32}
                                fill={hover >= n || stars >= n ? 'var(--orange)' : 'none'}
                                color={hover >= n || stars >= n ? 'var(--orange)' : 'var(--muted)'}
                                style={{ transition: 'fill 0.2s, color 0.2s' }}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div style={{ marginBottom: 20 }}>
                <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6, fontWeight: 600 }}>Crew Evaluation comments</label>
                <textarea className="input" placeholder="Type comments regarding cleanup, leveling accuracy..." value={comment} onChange={e => setComment(e.target.value)} />
            </div>

            <div style={{ marginBottom: 24 }}>
                <label style={{ color: 'var(--muted)', fontSize: '0.78rem', display: 'block', marginBottom: 6, fontWeight: 600 }}>Attach After-Fix image (optional)</label>
                <input type="file" accept="image/*" className="input" />
            </div>

            <button className="btn-primary" onClick={() => setSubmitted(true)} disabled={stars === 0} style={{ width: '100%', justifyContent: 'center' }}>
                Submit Review Log
            </button>
        </div>
    );
}

// ── CITIZEN DASHBOARD ─────────────────────────────────────────────
export default function CitizenDashboard() {
    const [activeTab, setActiveTab] = useState<'overview' | 'report' | 'track' | 'feedback'>('overview');
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const menuItems = [
        { id: 'overview' as const, label: 'Overview', icon: Home },
        { id: 'report' as const, label: 'Report Damage', icon: Camera },
        { id: 'track' as const, label: 'Track Reports', icon: FileText },
        { id: 'feedback' as const, label: 'Give Feedback', icon: Star },
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
                        {user?.name?.[0]?.toUpperCase() || 'C'}
                    </div>
                    <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", fontWeight: 700, fontSize: '0.88rem', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted)' }}>Citizen Portal</div>
                    </div>
                </div>

                {/* Navigation menu */}
                <nav style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                    {menuItems.map(item => {
                        const Icon = item.icon;
                        const active = activeTab === item.id;
                        return (
                            <button key={item.id} onClick={() => setActiveTab(item.id)} style={{
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
                                <span>{item.label}</span>
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
                {activeTab === 'overview' && <OverviewTab onNavigate={setActiveTab} />}
                {activeTab === 'report' && <ReportTab />}
                {activeTab === 'track' && <TrackTab />}
                {activeTab === 'feedback' && <FeedbackTab />}
            </main>
        </div>
    );
}
