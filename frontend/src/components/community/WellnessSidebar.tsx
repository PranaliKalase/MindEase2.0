import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Heart,
  CheckCircle2,
  Quote,
} from 'lucide-react';

interface WellnessSidebarProps {
  onSelectTopic: (topic: string) => void;
}

export const WellnessSidebar: React.FC<WellnessSidebarProps> = ({ onSelectTopic }) => {
  const [reflectionInput, setReflectionInput] = useState('');
  const [isWritingReflection, setIsWritingReflection] = useState(false);
  const [reflectionSaved, setReflectionSaved] = useState(false);

  const trendingTopics = [
    { name: 'Mindfulness', count: '1.2k thoughts today' },
    { name: 'SleepTips', count: '850 active discussions' },
    { name: 'WorkLifeBalance', count: '640 mentions' },
    { name: 'Breathwork', count: '420 new answers' },
    { name: 'Journaling', count: '310 thoughts shared' },
  ];

  const handleSaveReflection = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionInput.trim()) return;
    setReflectionSaved(true);
    setTimeout(() => {
      setReflectionSaved(false);
      setIsWritingReflection(false);
      setReflectionInput('');
    }, 1500);
  };

  return (
    <aside className="w-full space-y-6">
      
      {/* 1. Daily Reflection Highlight Card (Sky Blue Theme inspired by Attached UI) */}
      <div className="relative bg-gradient-to-br from-[#7DD3FC]/25 via-[#3A2E7A]/40 to-[#0B1026] border border-[#7DD3FC]/30 rounded-3xl p-6 shadow-xl shadow-[#7DD3FC]/5 overflow-hidden group">
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#7DD3FC] uppercase tracking-wider mb-2">
            <Sparkles className="w-4 h-4 text-[#FDE68A]" />
            <span>Daily Reflection</span>
          </div>

          <h3 className="text-sm md:text-base font-medium text-white/90 leading-relaxed font-serif-heading mb-4">
            What is one thing that went better than expected today, no matter how small it might seem?
          </h3>

          {!isWritingReflection ? (
            <button
              type="button"
              onClick={() => setIsWritingReflection(true)}
              className="w-full py-2.5 px-4 rounded-full bg-white text-[#0B1026] text-xs font-semibold hover:bg-white/90 transition-all cursor-pointer shadow-lg shadow-white/10 flex items-center justify-center gap-2"
            >
              <span>Write Reflection</span>
            </button>
          ) : (
            <form onSubmit={handleSaveReflection} className="space-y-2 animate-fadeIn">
              <textarea
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                placeholder="Write your note here..."
                rows={3}
                className="w-full bg-[#0B1026]/90 border border-[#7DD3FC]/40 rounded-2xl p-3 text-xs text-white placeholder-white/40 focus:outline-none"
              />
              
              {reflectionSaved && (
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Saved to your personal journal!</span>
                </div>
              )}

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWritingReflection(false)}
                  className="text-xs text-white/60 hover:text-white px-2 py-1 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!reflectionInput.trim()}
                  className="btn-primary text-xs py-1.5 px-4 rounded-xl cursor-pointer disabled:opacity-40"
                >
                  Save
                </button>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* 2. Trending Topics Widget */}
      <div className="bg-[#182235] border border-white/10 rounded-3xl p-5 shadow-xl shadow-[#8A5CFF]/5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold font-serif-heading text-white flex items-center gap-2">
            <span>Trending Topics</span>
          </h3>
          <TrendingUp className="w-4 h-4 text-[#7DD3FC]" />
        </div>

        <div className="space-y-3">
          {trendingTopics.map((topic) => (
            <button
              key={topic.name}
              type="button"
              onClick={() => onSelectTopic(topic.name)}
              className="w-full text-left p-2.5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 transition-all group cursor-pointer flex items-center justify-between"
            >
              <div>
                <div className="text-xs font-semibold text-white group-hover:text-[#7DD3FC] transition-colors">
                  #{topic.name}
                </div>
                <div className="text-[10px] text-white/40">{topic.count}</div>
              </div>
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onSelectTopic('all')}
          className="w-full text-center mt-4 text-xs font-medium text-[#B79CFF] hover:text-white transition-colors cursor-pointer"
        >
          View all topics
        </button>
      </div>

      {/* 3. Community Care Kindness Telemetry Widget */}
      <div className="bg-[#182235] border border-white/10 rounded-3xl p-5 shadow-xl shadow-[#8A5CFF]/5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold font-serif-heading text-white">Community Care</h3>
          <Heart className="w-4 h-4 text-red-400 fill-red-400/30" />
        </div>

        <p className="text-xs text-white/70 leading-relaxed mb-3">
          Together we've shared <span className="font-semibold text-white">4,203 supportive moments</span> today.
        </p>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#7DD3FC] via-[#6EE7B7] to-[#B79CFF] w-[75%] rounded-full transition-all duration-500" />
          </div>
          <div className="flex items-center justify-between text-[10px] uppercase tracking-wider text-white/40 font-semibold">
            <span>75% OF DAILY GOAL REACHED</span>
          </div>
        </div>
      </div>

      {/* 4. Quote of the Day */}
      <div className="p-4 rounded-3xl bg-[#0B1026]/60 border border-white/10 text-xs text-white/70 relative">
        <Quote className="w-5 h-5 text-[#B79CFF]/40 absolute top-3 right-3" />
        <p className="italic font-serif-heading text-white/90 mb-1">
          "Small steps are still steps forward."
        </p>
        <span className="text-[10px] text-[#B79CFF]">— MindEase Sanctuary Quote</span>
      </div>

    </aside>
  );
};
