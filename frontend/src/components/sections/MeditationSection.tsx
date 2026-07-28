import React, { useState } from 'react';
import { Play, Pause, Volume2, Sparkles, Trees, Moon, CloudRain, Clock } from 'lucide-react';

export const MeditationSection: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedTrack, setSelectedTrack] = useState('Enchanted Forest Rain');
  const [duration, setDuration] = useState('10 Min');

  const tracks = [
    { title: 'Enchanted Forest Rain', freq: '432 Hz Solfeggio', icon: <Trees className="w-5 h-5 text-[#F5A5D5]" />, desc: 'Soft rain drops landing on sacred cedar leaves' },
    { title: 'Midnight Whispering Pines', freq: '528 Hz Transformation', icon: <Moon className="w-5 h-5 text-[#B79CFF]" />, desc: 'Gentle wind rushing through ancient forest canopy' },
    { title: 'Celestial Stream & Chimes', freq: '639 Hz Harmony', icon: <CloudRain className="w-5 h-5 text-[#8A5CFF]" />, desc: 'Crystalline water flow blended with resonant silver bells' },
  ];

  return (
    <section id="meditation" className="relative py-24 bg-[#0B1026] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="glass-pill px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#F5A5D5] inline-block mb-4">
            Auditory Sanctuary
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight mb-6">
            Guided Meditation & <span className="gradient-text">Enchanted Soundscapes</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Tune into therapeutic acoustic frequencies scientifically calibrated to lower cortisol levels, quiet racing thoughts, and guide you into deep meditative stillness.
          </p>
        </div>

        {/* Player Container */}
        <div className="max-w-4xl mx-auto glass-card p-8 sm:p-12 border border-[#8A5CFF]/30 shadow-2xl relative">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Left Track Selector */}
            <div className="md:col-span-6 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#B79CFF] mb-4">
                Select Ambient Soundscape
              </h3>
              {tracks.map((t) => (
                <div
                  key={t.title}
                  onClick={() => {
                    setSelectedTrack(t.title);
                    setIsPlaying(true);
                  }}
                  className={`p-4 rounded-2xl cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    selectedTrack === t.title
                      ? 'bg-gradient-to-r from-[#3A2E7A]/80 to-[#8A5CFF]/40 border border-[#F5A5D5]/50 shadow-md'
                      : 'glass-pill hover:bg-white/5 border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/10">{t.icon}</div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{t.title}</h4>
                      <p className="text-xs text-white/60">{t.desc}</p>
                    </div>
                  </div>
                  <span className="text-[10px] glass-pill px-2.5 py-1 text-[#B79CFF] font-medium">{t.freq}</span>
                </div>
              ))}
            </div>

            {/* Right Active Player Controls */}
            <div className="md:col-span-6 flex flex-col items-center justify-center p-6 glass-card border-white/10 text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-[#8A5CFF] via-[#3A2E7A] to-[#F5A5D5] p-1 mb-6 animate-pulse-glow">
                <div className="w-full h-full bg-[#0B1026] rounded-full flex items-center justify-center relative overflow-hidden">
                  <Sparkles className="w-8 h-8 text-[#B79CFF]" />
                </div>
              </div>

              <h3 className="text-lg font-bold font-serif-heading text-white mb-1">{selectedTrack}</h3>
              <p className="text-xs text-[#F5A5D5] mb-6 flex items-center gap-1.5">
                <Volume2 className="w-3.5 h-3.5" />
                <span>3D Spatial Forest Audio</span>
              </p>

              {/* Animated Waveform Bars */}
              <div className="flex items-center gap-1.5 h-8 mb-8">
                {[40, 70, 30, 90, 50, 80, 40, 100, 60, 30, 70].map((h, i) => (
                  <div
                    key={i}
                    className={`w-1.5 rounded-full transition-all duration-300 ${
                      isPlaying ? 'bg-[#8A5CFF] animate-pulse' : 'bg-white/20'
                    }`}
                    style={{ height: isPlaying ? `${h}%` : '20%' }}
                  />
                ))}
              </div>

              {/* Controls */}
              <div className="flex items-center gap-6">
                {/* Duration Pills */}
                <div className="flex items-center gap-1 glass-pill px-3 py-1 text-xs">
                  <Clock className="w-3.5 h-3.5 text-[#B79CFF]" />
                  {['5M', '10M', '20M'].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`px-2 py-0.5 rounded-full transition-all ${
                        duration === d ? 'bg-[#8A5CFF] text-white font-bold' : 'text-white/60 hover:text-white'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                {/* Play/Pause Button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="btn-primary w-14 h-14 rounded-full flex items-center justify-center shadow-lg shadow-[#8A5CFF]/50 hover:scale-105 transition-transform cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white translate-x-0.5" />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
