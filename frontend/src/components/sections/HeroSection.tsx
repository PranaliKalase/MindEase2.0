import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Heart, Moon } from 'lucide-react';

interface HeroSectionProps {
  fadeIn: boolean;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ fadeIn }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Hero Video */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          src="/assets/videos/hero-bg.mp4"
          className="w-full h-full object-cover transform scale-105"
        />
        {/* Subtle Dark Gradient Overlay - Preserves video's cinematic quality while assuring crystal readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B1026]/75 via-[#0B1026]/40 to-[#0B1026]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0B1026]/30 to-[#0B1026]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div
          className={`transition-all duration-1000 transform ${
            fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Mystical Forest Badge */}
          <div className="inline-flex items-center gap-2 glass-pill px-5 py-2 mb-8 border border-[#B79CFF]/30 shadow-lg shadow-[#8A5CFF]/20 animate-float">
            <Sparkles className="w-4 h-4 text-[#F5A5D5] animate-pulse" />
            <span className="text-xs sm:text-sm font-medium tracking-wide text-gradient">
              Welcome to Your Enchanted Sanctuary
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white font-serif-heading leading-[1.15] mb-6">
            Your Journey to <br className="hidden sm:inline" />
            <span className="gradient-text text-glow">Inner Peace Begins Here</span>
          </h1>

          {/* Subheadline */}
          <p className="max-w-3xl mx-auto text-base sm:text-xl text-white/85 font-normal leading-relaxed mb-10 text-shadow">
            MindEase combines AI-powered emotional support, guided mindfulness, journaling, mood tracking, and wellness tools into one calming space designed to help you heal, grow, and find balance.
          </p>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 mb-16">
            <a href="#features" className="btn-primary text-base px-8 py-4 w-full sm:w-auto group">
              <span>Start Your Journey</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#how-it-works" className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
              <span>Learn More</span>
            </a>
          </div>

          {/* Trust Highlights */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-2xl mx-auto pt-6 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-white/75 text-xs sm:text-sm">
              <ShieldCheck className="w-4 h-4 text-[#B79CFF]" />
              <span>100% Private & Encrypted</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/75 text-xs sm:text-sm">
              <Heart className="w-4 h-4 text-[#F5A5D5]" />
              <span>Personalized AI Care</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/75 text-xs sm:text-sm col-span-2 md:col-span-1">
              <Moon className="w-4 h-4 text-[#8A5CFF]" />
              <span>Scientific Mindfulness</span>
            </div>
          </div>
        </div>
      </div>

      {/* Drifting Mist Accent */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0B1026] to-transparent pointer-events-none z-10" />
    </section>
  );
};
