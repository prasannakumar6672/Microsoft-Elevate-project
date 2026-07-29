import { useEffect } from 'react';
import type { Slide } from '../data/landing.data';

interface HeroSlideshowProps {
  slides: Slide[];
  activeSlide: number;
  onSlideChange: (index: number) => void;
}

export function HeroSlideshow({ slides, activeSlide, onSlideChange }: HeroSlideshowProps) {
  useEffect(() => {
    const timer = setInterval(() => {
      onSlideChange((activeSlide + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [activeSlide, slides.length, onSlideChange]);

  return (
    <>
      {/* Background Images */}
      {slides.map((s, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url(${s.url})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: i === activeSlide ? 1 : 0,
            transition: 'opacity 1.2s ease-in-out',
            zIndex: 0,
          }}
        />
      ))}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(180deg, rgba(10,10,15,0.75) 0%, rgba(10,10,15,0.92) 100%)',
          zIndex: 1,
        }}
      />
    </>
  );
}
