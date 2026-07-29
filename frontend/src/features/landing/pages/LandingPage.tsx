import { PublicLayout } from '../../../components/layout/PublicLayout/PublicLayout';
import { LandingNavbar } from '../components/LandingNavbar';
import { HeroSection } from '../components/HeroSection';
import { AwarenessStrip } from '../components/AwarenessStrip';
import { ImpactSection } from '../components/ImpactSection';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { CtaSection } from '../components/CtaSection';
import { LandingFooter } from '../components/LandingFooter';

export function LandingPage() {
  return (
    <PublicLayout>
      <LandingNavbar />
      <HeroSection />
      <AwarenessStrip />
      <ImpactSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <CtaSection />
      <LandingFooter />
    </PublicLayout>
  );
}
