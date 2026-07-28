import React, { useState } from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const MoodTrackingSection: React.FC = () => {
  const [selectedMood, setSelectedMood] = useState('Serene');
  const [score, setScore] = useState(8);

  const moods = [
    { name: 'Serene', icon: '🌿', color: 'from-[#8A5CFF] to-[#3A2E7A]', note: 'Calm, grounded, and connected to your inner peace.' },
    { name: 'Peaceful', icon: '🌸', color: 'from-[#F5A5D5] to-[#8A5CFF]', note: 'Gently resting in emotional equilibrium.' },
    { name: 'Hopeful', icon: '✨', color: 'from-[#B79CFF] to-[#3A2E7A]', note: 'Looking forward to new opportunities with light.' },
    { name: 'Reflective', icon: '🌙', color: 'from-[#3A2E7A] to-[#0B1026]', note: 'Contemplating your thoughts and personal growth.' },
    { name: 'Anxious', icon: '🌧️', color: 'from-[#8A5CFF]/70 to-[#0B1026]', note: 'Mind Ease AI recommends 3 minutes of forest breathing.' },
  ];

  const currentMoodObj = moods.find((m) => m.name === selectedMood) || moods[0];

  return (
    <section id="mood-tracking" className="relative py-24 bg-[#0B1026] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Description Column */}
          <div className="lg:col-span-5 space-y-6">
            <span className="glass-pill px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F5A5D5] inline-block">
              Intelligent Emotion Analytics
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight leading-tight">
              Understand Your <br />
              <span className="gradient-text">Emotional Spectrum</span>
            </h2>
            <p className="text-base text-white/80 leading-relaxed">
              Track daily emotions with fluid visual selectors. MindEase analyzes mood patterns over time, helping you uncover personal wellness triggers and offering instant AI guidance tailored to how you feel right now.
            </p>

            <ul className="space-y-3.5 pt-2">
              {[
                'Real-time emotion trend visualization',
                'Correlate sleep quality with mood fluctuations',
                'Encrypted end-to-end mood journal logs',
                'Personalized AI reflection prompts',
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-sm text-white/90">
                  <CheckCircle2 className="w-5 h-5 text-[#B79CFF] flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Interactive Mood Logger Card */}
          <div className="lg:col-span-7">
            <div className="glass-card p-8 sm:p-10 relative overflow-hidden border border-[#B79CFF]/20 shadow-2xl">
              <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
                <div>
                  <h3 className="text-xl font-bold font-serif-heading text-white">Daily Mood Check-In</h3>
                  <p className="text-xs text-white/60">How is your mind feeling right now?</p>
                </div>
                <div className="glass-pill px-3 py-1 text-xs text-[#B79CFF] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Live Interactive Preview</span>
                </div>
              </div>

              {/* Mood Selector Buttons */}
              <div className="grid grid-cols-5 gap-3 mb-8">
                {moods.map((m) => (
                  <button
                    key={m.name}
                    onClick={() => setSelectedMood(m.name)}
                    className={`flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl transition-all duration-300 cursor-pointer ${
                      selectedMood === m.name
                        ? 'bg-gradient-to-b from-[#8A5CFF]/40 to-[#3A2E7A]/60 border border-[#F5A5D5]/50 scale-105 shadow-lg shadow-[#8A5CFF]/30'
                        : 'glass-pill hover:bg-white/5 border-transparent'
                    }`}
                  >
                    <span className="text-2xl mb-1">{m.icon}</span>
                    <span className="text-[11px] sm:text-xs font-medium text-white/90">{m.name}</span>
                  </button>
                ))}
              </div>

              {/* Intensity Slider */}
              <div className="mb-8 bg-white/5 p-5 rounded-2xl border border-white/5">
                <div className="flex justify-between items-center mb-3 text-sm">
                  <span className="text-white/80 font-medium">Emotional Harmony Score</span>
                  <span className="font-bold text-[#F5A5D5] text-lg">{score} / 10</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={score}
                  onChange={(e) => setScore(Number(e.target.value))}
                  className="w-full h-2 bg-[#3A2E7A] rounded-lg appearance-none cursor-pointer accent-[#8A5CFF]"
                />
              </div>

              {/* AI Insight Box */}
              <div className="p-5 rounded-2xl bg-gradient-to-r from-[#3A2E7A]/40 to-[#0B1026]/80 border border-[#B79CFF]/30 flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-[#8A5CFF]/30 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-[#F5A5D5]" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#B79CFF] mb-1">
                    AI Wellness Insight ({selectedMood})
                  </h4>
                  <p className="text-xs sm:text-sm text-white/90 leading-relaxed">{currentMoodObj.note}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
