import React from 'react';
import { Compass, HeartPulse, Sparkles, TrendingUp } from 'lucide-react';

export const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      number: '01',
      icon: <Compass className="w-6 h-6 text-[#F5A5D5]" />,
      title: 'Personalize Your Sanctuary',
      description:
        'Set your daily intentions, whether seeking deep focus, anxiety relief, emotional healing, or restful sleep.',
    },
    {
      number: '02',
      icon: <HeartPulse className="w-6 h-6 text-[#B79CFF]" />,
      title: 'Daily Check-in & Reflect',
      description:
        'Log your mood slider and express your feelings through confidential voice notes or journal prompts.',
    },
    {
      number: '03',
      icon: <Sparkles className="w-6 h-6 text-[#8A5CFF]" />,
      title: 'Heal with AI Companion',
      description:
        'Connect with MindEase AI for gentle emotional grounding, or immerse in soundscapes designed to calm your nervous system.',
    },
    {
      number: '04',
      icon: <TrendingUp className="w-6 h-6 text-[#F5A5D5]" />,
      title: 'Grow & Flourish',
      description:
        'Track your emotional evolution over weeks and months, celebrating milestones as inner peace becomes second nature.',
    },
  ];

  return (
    <section id="how-it-works" className="relative py-24 bg-[#0B1026] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="glass-pill px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#B79CFF] inline-block mb-4">
            The Journey
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight mb-6">
            How <span className="gradient-text">MindEase Works</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Four gentle steps to transform daily stress into lasting inner peace and clarity.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {steps.map((step, index) => (
            <div key={index} className="glass-card p-8 relative flex flex-col justify-between group hover:border-[#8A5CFF]/50 transition-all duration-300">
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-12 h-12 rounded-xl glass-pill flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                    {step.icon}
                  </div>
                  <span className="font-serif-heading text-3xl font-black text-[#B79CFF]/30 group-hover:text-[#B79CFF]/70 transition-colors">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-bold font-serif-heading text-white mb-3 group-hover:text-[#B79CFF] transition-colors">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
