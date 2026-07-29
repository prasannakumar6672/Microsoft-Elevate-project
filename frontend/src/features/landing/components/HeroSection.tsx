import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Camera, ShieldCheck } from 'lucide-react';
import { HeroSlideshow } from './HeroSlideshow';
import { Button } from '../../../components/atoms/Button/Button';
import { SLIDES } from '../data/landing.data';
import { ROUTES } from '../../../constants/routes';

export function HeroSection() {
  const [slide, setSlide] = useState(0);
  const navigate = useNavigate();
  const current = SLIDES[slide];

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: '140px 48px 80px',
        overflow: 'hidden',
      }}
    >
      <HeroSlideshow slides={SLIDES} activeSlide={slide} onSlideChange={setSlide} />

      <div style={{ position: 'relative', zIndex: 2, maxWidth: 860 }}>
        {/* Tag Pill */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '6px 16px',
            borderRadius: 50,
            background: 'rgba(255,92,0,0.15)',
            border: '1px solid rgba(255,92,0,0.3)',
            color: 'var(--orange)',
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: '0.78rem',
            letterSpacing: '0.08em',
            marginBottom: 24,
          }}
        >
          <Camera size={14} />
          <span>{current.tag}</span>
        </div>

        {/* Main Headline */}
        <h1
          style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontWeight: 800,
            fontSize: 'calc(2.2rem + 1.8vw)',
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 20,
            letterSpacing: '-0.02em',
          }}
        >
          {current.headline}
        </h1>

        {/* Subtitle */}
        <p
          style={{
            color: '#A0A0B0',
            fontSize: '1.15rem',
            lineHeight: 1.7,
            maxWidth: 720,
            marginBottom: 36,
          }}
        >
          {current.sub}
        </p>

        {/* CTA Actions */}
        <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap' }}>
          <Button variant="primary" onClick={() => navigate(ROUTES.REGISTER)} style={{ padding: '16px 36px', fontSize: '1.05rem' }}>
            <span>File a Complaint</span>
            <ArrowRight size={18} />
          </Button>

          <Button variant="ghost" onClick={() => navigate(ROUTES.LOGIN)} style={{ padding: '16px 32px', fontSize: '1.05rem' }}>
            <ShieldCheck size={18} />
            <span>Official Portal</span>
          </Button>
        </div>

        {/* Slide Indicators */}
        <div style={{ display: 'flex', gap: 8, marginTop: 48 }}>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => setSlide(i)}
              style={{
                width: i === slide ? 36 : 10,
                height: 4,
                borderRadius: 2,
                background: i === slide ? 'var(--orange)' : 'rgba(255,255,255,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
