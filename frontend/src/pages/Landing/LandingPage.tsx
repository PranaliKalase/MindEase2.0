import React, { useState } from 'react';
import { ParticleCanvas } from '../../components/common/ParticleCanvas';
import { IntroAnimation } from '../../components/common/IntroAnimation';
import { Navbar } from '../../components/layout/Navbar';
import { HeroSection } from '../../components/sections/HeroSection';
import { FeaturesSection } from '../../components/sections/FeaturesSection';
import { HowItWorksSection } from '../../components/sections/HowItWorksSection';
import { MoodTrackingSection } from '../../components/sections/MoodTrackingSection';
import { AIChatSection } from '../../components/sections/AIChatSection';
import { MeditationSection } from '../../components/sections/MeditationSection';
import { TestimonialsSection } from '../../components/sections/TestimonialsSection';
import { FAQSection } from '../../components/sections/FAQSection';
import { Footer } from '../../components/layout/Footer';

export const LandingPage: React.FC = () => {
  const [introFinished, setIntroFinished] = useState(false);

  const handleIntroComplete = () => {
    setIntroFinished(true);
  };

  return (
    <div className="relative min-h-screen bg-[#0B1026] text-white overflow-x-hidden selection:bg-[#8A5CFF] selection:text-white">
      {/* Intro Fullscreen Animation */}
      <IntroAnimation onComplete={handleIntroComplete} />

      {/* Floating Particle Canvas */}
      <ParticleCanvas />

      {/* Glassmorphism Navbar */}
      <Navbar fadeIn={introFinished} />

      {/* Website Sections in Exact Order */}
      <main>
        {/* 1. Hero Section */}
        <HeroSection fadeIn={introFinished} />

        {/* 2. Features */}
        <FeaturesSection />

        {/* 3. How MindEase Works */}
        <HowItWorksSection />

        {/* 4. Mood Tracking */}
        <MoodTrackingSection />

        {/* 5. AI Chat Support */}
        <AIChatSection />

        {/* 6. Guided Meditation */}
        <MeditationSection />

        {/* 7. Testimonials */}
        <TestimonialsSection />

        {/* 8. FAQ */}
        <FAQSection />
      </main>

      {/* 9. Footer */}
      <Footer />
    </div>
  );
};
