import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is my emotional data and AI chat completely private?',
      a: 'Yes, absolutely. MindEase uses AES-256 end-to-end encryption for all journal entries, mood logs, and AI conversations. Your personal emotional reflections are never sold, analyzed for advertisements, or used to train public AI models.',
    },
    {
      q: 'How does the opening intro animation and video background transition work?',
      a: 'When you open MindEase, a high-definition 60 FPS opening animation plays to immerse you into the enchanted forest sanctuary. The video seamlessly dissolves directly into the Hero background video without cuts, black screens, or page reloads. The intro plays only once per session and can be skipped anytime.',
    },
    {
      q: 'Is MindEase grounded in clinical mental health science?',
      a: 'Yes. MindEase integrates evidence-based Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT) exercises, 4-7-8 breathing techniques, and 432Hz/528Hz acoustic soundscapes validated to quiet sympathetic nervous system arousal.',
    },
    {
      q: 'Is MindEase compatible with mobile devices and tablets?',
      a: 'MindEase is 100% responsive and hardware-accelerated across all smartphones, tablets, laptops, and desktops. Videos automatically adapt to save mobile bandwidth while preserving high cinematic quality.',
    },
    {
      q: 'What is included in the MindEase Free Sanctuary plan?',
      a: 'The free plan includes unlimited daily mood tracking, 24/7 basic AI emotional support conversations, 3 guided forest soundscapes, and basic journaling with reflection prompts.',
    },
  ];

  return (
    <section id="faq" className="relative py-24 bg-[#0B1026] overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="glass-pill px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F5A5D5] inline-block mb-4">
            Clear Answers
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Everything you need to know about entering your MindEase inner peace sanctuary.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className={`glass-card transition-all duration-300 border ${
                  isOpen ? 'border-[#8A5CFF]/50 bg-white/10 shadow-lg' : 'border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="text-base sm:text-lg font-bold font-serif-heading text-white flex items-center gap-3">
                    <HelpCircle className="w-5 h-5 text-[#B79CFF] flex-shrink-0" />
                    {faq.q}
                  </span>
                  <div className={`p-2 rounded-full glass-pill transition-transform duration-300 ${isOpen ? 'rotate-180 bg-[#8A5CFF]' : ''}`}>
                    <ChevronDown className="w-4 h-4 text-white" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-2 text-sm text-white/80 leading-relaxed border-t border-white/5 animate-fadeIn">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
