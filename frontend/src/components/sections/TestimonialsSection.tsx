import React from 'react';
import { Star, Quote } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Dr. Elena Rostova',
      role: 'Clinical Psychologist & Wellness Author',
      quote:
        'MindEase creates a rare digital environment that actually lowers sympathetic nervous system arousal. The seamless video intro and forest atmosphere immediately induce a state of serene calm.',
      rating: 5,
      avatar: '🌿',
    },
    {
      name: 'Marcus Vance',
      role: 'Creative Director',
      quote:
        'The AI companion helped me process severe burnout when I felt isolated at 2 AM. Combining real-time emotional check-ins with 432Hz soundscapes saved my mental health.',
      rating: 5,
      avatar: '✨',
    },
    {
      name: 'Aria Chen',
      role: 'Mindfulness Practitioner',
      quote:
        'The enchanted forest theme feels so deeply peaceful without being childish. It looks and feels like Apple-grade quality with a soul.',
      rating: 5,
      avatar: '🌸',
    },
  ];

  return (
    <section className="relative py-24 bg-[#0B1026] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="glass-pill px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#B79CFF] inline-block mb-4">
            Transformational Stories
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight mb-6">
            Loved by Seekers of <span className="gradient-text">Inner Peace</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Discover how MindEase has helped thousands find emotional balance, deeper sleep, and lasting tranquility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="glass-card p-8 relative flex flex-col justify-between hover:border-[#8A5CFF]/40 transition-all duration-300 group"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-[#F5A5D5]">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <Quote className="w-8 h-8 text-[#B79CFF]/20 group-hover:text-[#B79CFF]/50 transition-colors" />
                </div>

                <p className="text-sm text-white/80 leading-relaxed italic mb-8">
                  "{t.quote}"
                </p>
              </div>

              <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                <div className="w-11 h-11 rounded-full glass-pill flex items-center justify-center text-xl border border-[#B79CFF]/30">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold font-serif-heading text-white">{t.name}</h4>
                  <p className="text-xs text-white/60">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
