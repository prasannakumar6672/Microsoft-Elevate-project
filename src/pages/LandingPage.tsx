import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ── Road images from Unsplash (free hotlink for demos) ──────────
const SLIDES = [
    {
        url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
        caption: 'Every pothole is a life at risk.',
    },
    {
        url: 'https://images.unsplash.com/photo-1611348586804-61bf6c080437?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
        caption: '40% of road accidents start with broken infrastructure.',
    },
    {
        url: 'https://images.unsplash.com/photo-1465447142348-e9952c393450?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
        caption: 'Our roads tell the story of our governance.',
    },
    {
        url: 'https://images.unsplash.com/photo-1504376379689-8d54347b26c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=90',
        caption: 'One report. One step toward change.',
    },
];

const IMPACTS = [
    {
        icon: '💀',
        stat: '1.5 Lakh+',
        title: 'Deaths Per Year',
        desc: 'Road accidents claim over 1.5 lakh lives annually in India. A staggering 40% are directly linked to poor road conditions like potholes, uneven surfaces, and missing guardrails.',
        color: '#EF4444',
        bg: '#FEF2F2',
    },
    {
        icon: '🚗',
        stat: '3 Crore+',
        title: 'Vehicle Damages Yearly',
        desc: 'Potholes and broken roads cause severe vehicle damage — blown tyres, broken suspensions, misaligned wheels — costing citizens billions in repairs every single year.',
        color: '#F59E0B',
        bg: '#FFFBEB',
    },
    {
        icon: '💰',
        stat: '₹30,000 Cr',
        title: 'Annual Economic Loss',
        desc: 'Poor roads cost India ₹30,000 crore annually through fuel inefficiency, increased travel time, vehicle damage, and reduced productivity. Every broken road is a broken economy.',
        color: '#EF4444',
        bg: '#FEF2F2',
    },
    {
        icon: '⏱️',
        stat: '72 Hours',
        title: 'Avg. Response Without Tech',
        desc: 'Without systems like RoadGuard AI, road complaints take an average of 72 hours just to reach the right officer — by then, accidents may have already happened.',
        color: '#8B5CF6',
        bg: '#F5F3FF',
    },
    {
        icon: '🏥',
        stat: '50%',
        title: 'Preventable Injuries',
        desc: 'Half of all road-injury hospital admissions in India could be prevented with timely infrastructure repairs. The solution starts with a simple report.',
        color: '#10B981',
        bg: '#ECFDF5',
    },
    {
        icon: '🧒',
        stat: '5,000+',
        title: 'Children Injured Monthly',
        desc: 'School buses, cycles, and school routes are among the most dangerous due to unmaintained roads. Every child deserves a safe journey to school.',
        color: '#F59E0B',
        bg: '#FFFBEB',
    },
];

const STEPS = [
    { num: '01', icon: '📸', title: 'Snap a Photo', desc: 'See a pothole or damaged road? Take a photo from your phone. No special equipment needed.' },
    { num: '02', icon: '🤖', title: 'AI Detects & Rates', desc: 'Our AI instantly analyses the image, identifies the damage type, and calculates a severity score.' },
    { num: '03', icon: '📍', title: 'Auto-Tagged & Routed', desc: 'Your complaint is GPS-tagged and automatically routed to the correct government officer for your area.' },
    { num: '04', icon: '✅', title: 'Track to Resolution', desc: 'Follow your complaint in real-time. Get updates as the team is assigned and the repair is completed.' },
];

const TESTIMONIALS = [
    { quote: 'I reported a pothole that had been ignored for months. Within 3 days of using RoadGuard AI, the road was repaired!', name: 'Arjun S.', city: 'Hyderabad' },
    { quote: 'My daughter was injured due to a broken road. Now I use RoadGuard AI to make sure no other family goes through the same.', name: 'Priya M.', city: 'Bengaluru' },
    { quote: 'Finally a system where officials have to be accountable. The transparency is what I love most.', name: 'Ravi K.', city: 'Chennai' },
];

export default function LandingPage() {
    const [slide, setSlide] = useState(0);
    const [activeTestimonial, setActiveTestimonial] = useState(0);
    const navigate = useNavigate();

    // Auto-advance slideshow — just update index, CSS transition does the rest
    useEffect(() => {
        const timer = setInterval(() => {
            setSlide(s => (s + 1) % SLIDES.length);
        }, 4500);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        const t = setInterval(() => setActiveTestimonial(a => (a + 1) % TESTIMONIALS.length), 5000);
        return () => clearInterval(t);
    }, []);

    return (
        <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fff', color: '#0F172A', overflowX: 'hidden' }}>

            {/* ── NAVBAR ──────────────────────────────────────────────── */}
            <nav style={{
                position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '0 60px', height: 64,
                background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(16px)',
                borderBottom: '1px solid #F1F5F9',
                boxShadow: '0 2px 20px rgba(0,0,0,0.06)',
            }}>
                <span style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1.3rem' }}>🛡️</span>
                    RoadGuard <span style={{ color: '#FF5C00' }}>AI</span>
                </span>
                <div style={{ display: 'flex', gap: 10 }}>
                    <button onClick={() => navigate('/login')} style={{
                        padding: '8px 20px', borderRadius: 8, border: '1.5px solid #E2E8F0',
                        background: 'transparent', color: '#0F172A', fontFamily: 'Syne', fontWeight: 700,
                        fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                    }}
                        onMouseOver={e => { (e.target as HTMLElement).style.borderColor = '#FF5C00'; (e.target as HTMLElement).style.color = '#FF5C00'; }}
                        onMouseOut={e => { (e.target as HTMLElement).style.borderColor = '#E2E8F0'; (e.target as HTMLElement).style.color = '#0F172A'; }}
                    >Official Portal</button>
                    <button onClick={() => navigate('/login')} style={{
                        padding: '8px 22px', borderRadius: 8, border: 'none',
                        background: '#FF5C00', color: '#fff', fontFamily: 'Syne', fontWeight: 700,
                        fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s',
                        boxShadow: '0 4px 12px rgba(255,92,0,0.3)',
                    }}
                        onMouseOver={e => { (e.target as HTMLElement).style.background = '#E84E00'; (e.target as HTMLElement).style.transform = 'translateY(-1px)'; }}
                        onMouseOut={e => { (e.target as HTMLElement).style.background = '#FF5C00'; (e.target as HTMLElement).style.transform = 'translateY(0)'; }}
                    >Report Now →</button>
                </div>
            </nav>

            {/* ── HERO: IMAGE SLIDESHOW ────────────────────────────────── */}
            <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', marginTop: 0 }}>
                {/* All slides stacked — cross-fade, no white flash */}
                {SLIDES.map((s, i) => (
                    <div key={i} style={{
                        position: 'absolute', inset: 0, zIndex: 0,
                        backgroundImage: `url(${s.url})`,
                        backgroundSize: 'cover', backgroundPosition: 'center',
                        transition: 'opacity 1s ease-in-out',
                        opacity: i === slide ? 1 : 0,
                        filter: 'brightness(0.45)',
                    }} />
                ))}

                {/* Gradient overlay — white fade at bottom */}
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 1,
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.05) 50%, rgba(255,255,255,1) 100%)',
                }} />

                {/* Hero content */}
                <div style={{
                    position: 'relative', zIndex: 2, height: '100%',
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center',
                    textAlign: 'center', padding: '0 24px',
                }}>
                    {/* Live badge */}
                    <div style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 28,
                        background: 'rgba(255,92,0,0.15)', backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,92,0,0.4)', borderRadius: 30,
                        padding: '7px 18px',
                    }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#22C55E', boxShadow: '0 0 8px #22C55E', display: 'inline-block', animation: 'pulse 1.8s ease-in-out infinite' }} />
                        <span style={{ color: '#FFD6C0', fontSize: '0.78rem', fontWeight: 600, letterSpacing: '0.06em' }}>AI COMPLAINT SYSTEM — ACTIVE</span>
                    </div>

                    {/* Main tagline */}
                    <h1 style={{
                        fontSize: 'clamp(2.6rem, 6vw, 5.5rem)',
                        fontFamily: 'Syne', fontWeight: 800, color: '#fff',
                        lineHeight: 1.1, marginBottom: 18, maxWidth: 860,
                        textShadow: '0 4px 30px rgba(0,0,0,0.6)',
                    }}>
                        Make Your City <span style={{ color: '#FF5C00' }}>Safer</span>.
                    </h1>

                    {/* Subtitle */}
                    <p style={{
                        color: 'rgba(255,255,255,0.88)', fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
                        marginBottom: 12, fontWeight: 400, lineHeight: 1.7,
                        maxWidth: 620,
                    }}>
                        Report road damage instantly using AI-powered analysis. Help authorities
                        prioritize repairs and track progress in real-time.
                    </p>
                    {/* Slide caption */}
                    <p style={{
                        color: 'rgba(255,255,255,0.55)', fontSize: '0.88rem',
                        marginBottom: 32, fontStyle: 'italic', fontWeight: 300,
                        transition: 'opacity 0.5s ease',
                    }}>
                        ✦ {SLIDES[slide].caption}
                    </p>

                    <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button onClick={() => navigate('/login')} style={{
                            padding: '14px 36px', borderRadius: 10, border: 'none',
                            background: '#FF5C00', color: '#fff', fontFamily: 'Syne', fontWeight: 800,
                            fontSize: '1rem', cursor: 'pointer',
                            boxShadow: '0 8px 30px rgba(255,92,0,0.5)',
                            transition: 'all 0.25s', animation: 'heroPulse 2.5s ease-in-out infinite',
                        }}>📸 Report Road Damage Now</button>
                        <button onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })} style={{
                            padding: '14px 36px', borderRadius: 10,
                            border: '2px solid rgba(255,255,255,0.6)',
                            background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)',
                            color: '#fff', fontFamily: 'Syne', fontWeight: 700,
                            fontSize: '1rem', cursor: 'pointer', transition: 'all 0.25s',
                        }}>See the Impact ↓</button>
                    </div>

                    {/* Slide dots */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 40 }}>
                        {SLIDES.map((_, i) => (
                            <button key={i} onClick={() => setSlide(i)} style={{
                                width: i === slide ? 28 : 8, height: 8, borderRadius: 4, border: 'none',
                                background: i === slide ? '#FF5C00' : 'rgba(255,255,255,0.4)',
                                cursor: 'pointer', transition: 'all 0.3s ease', padding: 0,
                            }} />
                        ))}
                    </div>
                </div>

                {/* Scroll hint */}
                <div style={{ position: 'absolute', bottom: 80, left: '50%', transform: 'translateX(-50%)', zIndex: 2, textAlign: 'center' }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginBottom: 8, letterSpacing: '0.1em' }}>SCROLL TO LEARN MORE</div>
                    <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, rgba(255,92,0,0.6), transparent)', margin: '0 auto', animation: 'scrollLine 1.5s ease-in-out infinite' }} />
                </div>
            </section>

            {/* ── AWARENESS STRIP ─────────────────────────────────────── */}
            <section style={{
                background: 'linear-gradient(135deg, #FF5C00, #FF8040)',
                padding: '32px 60px',
                display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap', gap: 20,
            }}>
                {[
                    { num: '3.3L+', label: 'Road Deaths Yearly in India' },
                    { num: '40%', label: 'Caused by Poor Infrastructure' },
                    { num: '₹30K Cr', label: 'Annual Economic Loss' },
                    { num: '72 hrs', label: 'Avg Response Without Technology' },
                ].map((s, i) => (
                    <div key={i} style={{ textAlign: 'center', color: '#fff', minWidth: 140 }}>
                        <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '2.2rem', lineHeight: 1 }}>{s.num}</div>
                        <div style={{ fontSize: '0.82rem', opacity: 0.9, marginTop: 4 }}>{s.label}</div>
                    </div>
                ))}
            </section>

            {/* ── IMPACT SECTION ──────────────────────────────────────── */}
            <section id="impact" style={{ padding: '100px 60px', background: '#fff', maxWidth: 1280, margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: 60 }}>
                    <div style={{ display: 'inline-block', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 30, padding: '5px 18px', marginBottom: 16 }}>
                        <span style={{ color: '#EF4444', fontFamily: 'Syne', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em' }}>⚠️ THE HARSH REALITY</span>
                    </div>
                    <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15, marginBottom: 16 }}>
                        What Happens When<br /><span style={{ color: '#FF5C00' }}>Roads Are Neglected?</span>
                    </h2>
                    <p style={{ color: '#64748B', fontSize: '1.05rem', maxWidth: 580, margin: '0 auto' }}>
                        Poor road infrastructure is a silent crisis killing thousands every year.
                        Here's what the data reveals about the true cost of broken roads.
                    </p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
                    {IMPACTS.map((imp, i) => (
                        <div key={i} style={{
                            background: imp.bg,
                            border: `1px solid ${imp.color}22`,
                            borderRadius: 20, padding: '32px 28px',
                            transition: 'all 0.25s ease',
                            cursor: 'default',
                        }}
                            onMouseOver={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(-6px)'; (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 50px ${imp.color}22`; }}
                            onMouseOut={e => { (e.currentTarget as HTMLElement).style.transform = 'translateY(0)'; (e.currentTarget as HTMLElement).style.boxShadow = 'none'; }}
                        >
                            <div style={{ fontSize: '2.5rem', marginBottom: 14 }}>{imp.icon}</div>
                            <div style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: '2.2rem', color: imp.color, marginBottom: 4 }}>{imp.stat}</div>
                            <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.05rem', marginBottom: 12, color: '#0F172A' }}>{imp.title}</h3>
                            <p style={{ color: '#64748B', fontSize: '0.88rem', lineHeight: 1.7 }}>{imp.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* ── REAL IMAGE SECTION ──────────────────────────────────── */}
            <section style={{
                background: '#F8FAFC', padding: '80px 60px',
                borderTop: '1px solid #F1F5F9', borderBottom: '1px solid #F1F5F9',
            }}>
                <div style={{ maxWidth: 1280, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'center' }}>
                    <div>
                        <div style={{ display: 'inline-block', background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: 30, padding: '5px 18px', marginBottom: 20 }}>
                            <span style={{ color: '#FF5C00', fontFamily: 'Syne', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em' }}>🔍 THE PROBLEM</span>
                        </div>
                        <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', marginBottom: 20, lineHeight: 1.2 }}>
                            Roads That Should<br /><span style={{ color: '#EF4444' }}>Never Exist</span>
                        </h2>
                        <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.8, marginBottom: 20 }}>
                            Across Indian cities, millions of citizens face dangerous, pothole-ridden roads every day.
                            Accidents happen. Lives are lost. Vehicles are destroyed. And the complaints?
                            They sit in files — never acted on.
                        </p>
                        <p style={{ color: '#64748B', fontSize: '1rem', lineHeight: 1.8, marginBottom: 32 }}>
                            <strong style={{ color: '#0F172A' }}>RoadGuard AI changes that.</strong> With AI-powered damage detection and
                            direct routing to responsible officials, your report gets where it needs to go — fast.
                        </p>
                        <button onClick={() => navigate('/login')} style={{
                            padding: '13px 30px', borderRadius: 10, border: 'none',
                            background: '#FF5C00', color: '#fff', fontFamily: 'Syne', fontWeight: 700,
                            fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 6px 20px rgba(255,92,0,0.3)',
                            transition: 'all 0.25s',
                        }}>
                            Start Reporting →
                        </button>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, borderRadius: 20, overflow: 'hidden' }}>
                        <img
                            src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=85"
                            alt="Pothole on road"
                            style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 12, gridRow: 'span 2' }}
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <img
                            src="https://images.unsplash.com/photo-1611348586804-61bf6c080437?w=400&q=85"
                            alt="Cracked road"
                            style={{ width: '100%', height: 95, objectFit: 'cover', borderRadius: 12 }}
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                        <img
                            src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&q=85"
                            alt="Night road"
                            style={{ width: '100%', height: 95, objectFit: 'cover', borderRadius: 12 }}
                            onError={e => { (e.target as HTMLImageElement).style.display = 'none'; }}
                        />
                    </div>
                </div>
            </section>

            {/* ── HOW IT WORKS ────────────────────────────────────────── */}
            <section style={{ padding: '100px 60px', background: '#fff' }}>
                <div style={{ maxWidth: 1200, margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: 60 }}>
                        <div style={{ display: 'inline-block', background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: 30, padding: '5px 18px', marginBottom: 16 }}>
                            <span style={{ color: '#16A34A', fontFamily: 'Syne', fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.1em' }}>✅ THE SOLUTION</span>
                        </div>
                        <h2 style={{ fontFamily: 'Syne', fontWeight: 800, fontSize: 'clamp(2rem, 4vw, 3rem)', lineHeight: 1.15 }}>
                            How <span style={{ color: '#FF5C00' }}>RoadGuard AI</span> Works
                        </h2>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 0, position: 'relative' }}>
                        {/* Connector line */}
                        <div style={{ position: 'absolute', top: 44, left: '12%', right: '12%', height: 2, background: 'linear-gradient(to right, #FF5C00, #FF8040)', zIndex: 0, opacity: 0.25 }} />
                        {STEPS.map((step, i) => (
                            <div key={i} style={{ padding: '0 20px', textAlign: 'center', position: 'relative', zIndex: 1 }}>
                                <div style={{
                                    width: 88, height: 88, borderRadius: '50%', margin: '0 auto 20px',
                                    background: i === 0 || i === 3 ? '#FF5C00' : '#fff',
                                    border: `3px solid ${i === 0 || i === 3 ? '#FF5C00' : '#E2E8F0'}`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '2rem', boxShadow: `0 8px 24px rgba(255,92,0,${i === 0 || i === 3 ? '0.3' : '0.1'})`,
                                    transition: 'all 0.3s',
                                }}>
                                    {step.icon}
                                </div>
                                <div style={{ fontFamily: 'Syne', fontWeight: 800, color: '#FF5C00', fontSize: '0.75rem', marginBottom: 6, letterSpacing: '0.1em' }}>STEP {step.num}</div>
                                <h3 style={{ fontFamily: 'Syne', fontWeight: 700, fontSize: '1.05rem', marginBottom: 10 }}>{step.title}</h3>
                                <p style={{ color: '#64748B', fontSize: '0.87rem', lineHeight: 1.7 }}>{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* ── REPORT CTA ───────────────────────────────────────────── */}
            <section style={{ background: '#fff', padding: '100px 24px', textAlign: 'center' }}>
                <div style={{ maxWidth: 760, margin: '0 auto' }}>
                    <div style={{ fontSize: '3rem', marginBottom: 20 }}>🛣️</div>
                    <h2 style={{
                        fontFamily: 'Syne', fontWeight: 800,
                        fontSize: 'clamp(2rem, 5vw, 3.5rem)', lineHeight: 1.1,
                        marginBottom: 20,
                    }}>
                        Report Today.<br />
                        <span style={{ color: '#FF5C00' }}>Build a Better Tomorrow.</span>
                    </h2>
                    <p style={{ color: '#64748B', fontSize: '1.1rem', marginBottom: 40, lineHeight: 1.8, maxWidth: 560, margin: '0 auto 40px' }}>
                        Every report you file is a step toward safer roads, fewer accidents, and a better India.
                        It takes 30 seconds. It could save a life.
                    </p>

                    {/* Feature pills */}
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginBottom: 40 }}>
                        {['✓ Free to use', '✓ 30-second reporting', '✓ AI-powered', '✓ Direct to officials', '✓ Track progress', '✓ Real accountability'].map(f => (
                            <span key={f} style={{
                                padding: '7px 16px', borderRadius: 30,
                                background: '#FFF7ED', border: '1px solid #FED7AA',
                                color: '#C2410C', fontSize: '0.82rem', fontWeight: 600,
                            }}>{f}</span>
                        ))}
                    </div>

                    <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button onClick={() => navigate('/login')} style={{
                            padding: '16px 44px', borderRadius: 12, border: 'none',
                            background: '#FF5C00', color: '#fff', fontFamily: 'Syne', fontWeight: 800,
                            fontSize: '1.05rem', cursor: 'pointer',
                            boxShadow: '0 12px 36px rgba(255,92,0,0.4)',
                            transition: 'all 0.3s', animation: 'heroPulse 2.5s ease-in-out infinite',
                        }}>
                            📸 Report a Road Now — It's Free
                        </button>
                        <button onClick={() => navigate('/login')} style={{
                            padding: '16px 36px', borderRadius: 12,
                            border: '2px solid #E2E8F0',
                            background: '#fff', color: '#0F172A', fontFamily: 'Syne', fontWeight: 700,
                            fontSize: '1.05rem', cursor: 'pointer', transition: 'all 0.25s',
                        }}>
                            🏛 Official Portal
                        </button>
                    </div>
                </div>
            </section>

            {/* ── TESTIMONIALS ────────────────────────────────────────── */}
            <section style={{
                background: 'linear-gradient(135deg, #0F172A, #1E293B)',
                padding: '90px 60px', textAlign: 'center',
            }}>
                <div style={{ maxWidth: 700, margin: '0 auto' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: 24 }}>💬</div>
                    <div style={{ minHeight: 120, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                        <blockquote style={{
                            fontFamily: 'Syne', fontWeight: 700, fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                            color: '#fff', lineHeight: 1.5, marginBottom: 20, fontStyle: 'italic',
                            transition: 'opacity 0.4s',
                        }}>
                            "{TESTIMONIALS[activeTestimonial].quote}"
                        </blockquote>
                        <cite style={{ color: '#FF8040', fontWeight: 600, fontSize: '0.9rem' }}>
                            — {TESTIMONIALS[activeTestimonial].name}, <span style={{ color: '#94A3B8' }}>{TESTIMONIALS[activeTestimonial].city}</span>
                        </cite>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 28 }}>
                        {TESTIMONIALS.map((_, i) => (
                            <button key={i} onClick={() => setActiveTestimonial(i)} style={{
                                width: i === activeTestimonial ? 24 : 8, height: 8, borderRadius: 4, border: 'none',
                                background: i === activeTestimonial ? '#FF5C00' : 'rgba(255,255,255,0.2)',
                                cursor: 'pointer', transition: 'all 0.3s', padding: 0,
                            }} />
                        ))}
                    </div>
                </div>
            </section>


            {/* ── FOOTER ───────────────────────────────────────────────── */}
            <footer style={{
                background: '#0F172A', color: '#94A3B8',
                padding: '40px 60px',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', flexWrap: 'wrap', gap: 16,
                fontSize: '0.83rem',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ fontSize: '1.2rem' }}>🛡️</span>
                    <span style={{ color: '#fff', fontFamily: 'Syne', fontWeight: 800 }}>RoadGuard AI</span>
                    <span style={{ marginLeft: 4 }}>— AI for Safer Indian Roads</span>
                </div>
                <div style={{ display: 'flex', gap: 24 }}>
                    <button onClick={() => navigate('/login')} style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.83rem' }}>Citizen Portal</button>
                    <button onClick={() => navigate('/login')} style={{ color: '#94A3B8', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.83rem' }}>Official Portal</button>
                </div>
                <span>© 2026 RoadGuard AI. All rights reserved.</span>
            </footer>

            {/* ── INLINE KEYFRAMES ────────────────────────────────────── */}
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        @keyframes heroPulse {
          0%, 100% { box-shadow: 0 8px 30px rgba(255,92,0,0.4); }
          50% { box-shadow: 0 8px 40px rgba(255,92,0,0.7), 0 0 60px rgba(255,92,0,0.2); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(34,197,94,0.7); }
          50% { opacity: 0.6; box-shadow: 0 0 0 8px rgba(34,197,94,0); }
        }
        @keyframes scrollLine {
          0%, 100% { opacity: 1; transform: scaleY(1); }
          50% { opacity: 0.3; transform: scaleY(0.6); }
        }
      `}</style>
        </div>
    );
}
