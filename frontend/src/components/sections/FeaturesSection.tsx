import React from 'react';
import { Bot, Headphones, Smile, BookOpen, Moon, Activity, ArrowUpRight } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Bot className="w-7 h-7 text-[#F5A5D5]" />,
      title: 'AI Emotional Companion',
      description:
        'A compassionate, 24/7 AI confidant trained on evidence-based CBT and mindfulness principles to help reframe anxious thoughts.',
      accent: 'border-[#F5A5D5]/30',
    },
    {
      icon: <Headphones className="w-7 h-7 text-[#B79CFF]" />,
      title: 'Enchanted Soundscapes',
      description:
        'Immerse yourself in high-definition forest rain, night breeze, celestial chimes, and deep alpha wave frequency music.',
      accent: 'border-[#B79CFF]/30',
    },
    {
      icon: <Smile className="w-7 h-7 text-[#8A5CFF]" />,
      title: 'Interactive Mood Logging',
      description:
        'Track daily emotions with intuitive visual sliders and receive intelligent pattern analysis regarding triggers and sleep quality.',
      accent: 'border-[#8A5CFF]/30',
    },
    {
      icon: <BookOpen className="w-7 h-7 text-[#F5A5D5]" />,
      title: 'Reflective Journaling',
      description:
        'Express your thoughts freely in end-to-end encrypted journals with smart prompt suggestions tailored to your mood.',
      accent: 'border-[#F5A5D5]/30',
    },
    {
      icon: <Moon className="w-7 h-7 text-[#B79CFF]" />,
      title: 'Sleep & Relaxation Sanctuary',
      description:
        'Drift into restful slumber with bedtime stories, 4-7-8 breathing exercises, and ambient night forest visuals.',
      accent: 'border-[#B79CFF]/30',
    },
    {
      icon: <Activity className="w-7 h-7 text-[#8A5CFF]" />,
      title: 'Personal Growth Analytics',
      description:
        'Monitor your mental clarity journey with weekly wellness scores, stress reduction graphs, and milestone badges.',
      accent: 'border-[#8A5CFF]/30',
    },
  ];

  return (
    <section id="features" className="relative py-24 bg-[#0B1026] overflow-hidden">
      {/* Background Glow Orbs */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-[#8A5CFF]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-[#F5A5D5]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="glass-pill px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#B79CFF] inline-block mb-4">
            Sanctuary Features
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight mb-6">
            Designed for Your <span className="gradient-text">Emotional Well-Being</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Every feature in MindEase is thoughtfully crafted to foster tranquility, offering you an intuitive digital refuge whenever life feels overwhelming.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`glass-card p-8 relative group hover:border-opacity-60 transition-all duration-500 flex flex-col justify-between ${feature.accent}`}
            >
              <div>
                <div className="w-14 h-14 rounded-2xl glass-pill flex items-center justify-center mb-6 shadow-inner border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold font-serif-heading text-white mb-3 group-hover:text-[#B79CFF] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  {feature.description}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold text-[#B79CFF] group-hover:text-[#F5A5D5] transition-colors">
                <span>Explore Feature</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
