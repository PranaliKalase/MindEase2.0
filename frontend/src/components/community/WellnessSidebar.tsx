import React, { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Heart,
  CheckCircle2,
  ArrowRight,
  Compass,
} from 'lucide-react';

interface WellnessSidebarProps {
  onSelectTopic: (topic: string) => void;
  trendingTopics?: { name: string; count: number }[];
  suggestedClubs?: any[];
}

export const WellnessSidebar: React.FC<WellnessSidebarProps> = ({ 
  onSelectTopic,
}) => {
  const [isWritingReflection, setIsWritingReflection] = useState(false);
  const [reflectionInput, setReflectionInput] = useState('');
  const [reflectionSaved, setReflectionSaved] = useState(false);

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
      
      {/* 1. Daily Reflection Card (Dark Purple with Leaf Pattern) */}
      <div className="relative bg-[#1A1830] border border-purple-500/20 rounded-2xl p-5 overflow-hidden">
        {/* Leaf SVG Pattern Background */}
        <div className="absolute top-0 right-0 w-32 h-32 opacity-20 pointer-events-none transform translate-x-4 -translate-y-4">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full text-purple-300">
            <path d="M40 80 C 40 50, 70 30, 90 20 C 80 40, 60 70, 40 80 Z" />
            <path d="M40 80 C 30 50, 10 40, 0 30 C 10 50, 30 70, 40 80 Z" />
            <path d="M40 80 C 50 60, 70 60, 90 70 C 70 80, 50 90, 40 80 Z" />
            <circle cx="85" cy="15" r="3" />
            <circle cx="95" cy="35" r="2" />
          </svg>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-2 text-[10px] font-bold text-[#B79CFF] uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>Daily Reflection</span>
          </div>

          <h3 className="text-[14px] font-medium text-white/90 leading-relaxed font-sans mb-5 pr-8">
            What is one thing that went better than expected today, no matter how small it might seem?
          </h3>

          {!isWritingReflection ? (
            <button
              type="button"
              onClick={() => setIsWritingReflection(true)}
              className="w-full py-2.5 px-4 rounded-xl bg-[#E2E6FF] text-[#1A1830] text-[13px] font-semibold hover:bg-white transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Write Reflection</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <form onSubmit={handleSaveReflection} className="space-y-3 animate-fadeIn">
              <textarea
                value={reflectionInput}
                onChange={(e) => setReflectionInput(e.target.value)}
                placeholder="Write your reflection..."
                rows={3}
                className="w-full bg-[#0B0E17]/60 border border-purple-500/30 rounded-xl p-3 text-[13px] text-white placeholder-white/40 focus:outline-none"
              />
              {reflectionSaved && (
                <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Reflection saved</span>
                </div>
              )}
              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsWritingReflection(false)}
                  className="text-[12px] text-white/60 hover:text-white px-3 py-1.5 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!reflectionInput.trim()}
                  className="bg-[#8A5CFF] hover:bg-[#784BE8] text-white text-[12px] py-1.5 px-4 rounded-lg cursor-pointer disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 2. Suggested Clubs Card */}
      <div className="bg-[#131627]/60 border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-white/60 uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5 text-[#FDE68A]" />
            <span>Suggested Clubs</span>
          </div>
          <button className="text-[11px] text-[#B79CFF] hover:text-white transition-colors cursor-pointer">
            View all
          </button>
        </div>

        <div className="space-y-4">
          {/* Club 1 */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
                <span className="text-xl">🍃</span>
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-white/90 truncate group-hover:text-white">Mindful Living</div>
                <div className="text-[11px] text-white/40">1.2K members</div>
              </div>
            </div>
            <button className="px-4 py-1.5 rounded-full border border-white/10 text-[12px] text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
              Join
            </button>
          </div>

          {/* Club 2 */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                <span className="text-xl">🎨</span>
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-white/90 truncate group-hover:text-white">Art & Creativity</div>
                <div className="text-[11px] text-white/40">980 members</div>
              </div>
            </div>
            <button className="px-4 py-1.5 rounded-full border border-white/10 text-[12px] text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
              Join
            </button>
          </div>

          {/* Club 3 */}
          <div className="flex items-center justify-between group">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-slate-500/20 flex items-center justify-center shrink-0">
                <span className="text-xl">📷</span>
              </div>
              <div className="min-w-0">
                <div className="text-[13px] font-semibold text-white/90 truncate group-hover:text-white">Photography Club</div>
                <div className="text-[11px] text-white/40">760 members</div>
              </div>
            </div>
            <button className="px-4 py-1.5 rounded-full border border-white/10 text-[12px] text-white/70 hover:text-white hover:bg-white/5 transition-colors cursor-pointer">
              Join
            </button>
          </div>
        </div>
      </div>

      {/* 3. Community Topics Widget */}
      <div className="bg-[#131627]/60 border border-white/5 rounded-2xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[10px] font-bold text-white/60 uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#7DD3FC]" />
            <span>Community Topics</span>
          </div>
          <button className="text-[11px] text-[#B79CFF] hover:text-white transition-colors cursor-pointer" onClick={() => onSelectTopic('all')}>
            View all
          </button>
        </div>

        <div className="flex flex-wrap gap-2">
          {/* Topic 1 */}
          <button onClick={() => onSelectTopic('Mindfulness')} className="flex-1 min-w-[120px] text-left p-3 rounded-xl bg-[#1A2642] hover:bg-[#1E2B4A] transition-colors border border-blue-500/10 cursor-pointer">
            <div className="text-[12px] font-semibold text-[#7DD3FC] mb-0.5">#Mindfulness</div>
            <div className="text-[10px] text-white/40">1.9K posts</div>
          </button>
          
          {/* Topic 2 */}
          <button onClick={() => onSelectTopic('StudentLife')} className="flex-1 min-w-[120px] text-left p-3 rounded-xl bg-[#1C2C4A] hover:bg-[#203152] transition-colors border border-blue-400/10 cursor-pointer">
            <div className="text-[12px] font-semibold text-[#818CF8] mb-0.5">#StudentLife</div>
            <div className="text-[10px] text-white/40">1.6K posts</div>
          </button>

          {/* Topic 3 */}
          <button onClick={() => onSelectTopic('SelfCare')} className="flex-1 min-w-[120px] text-left p-3 rounded-xl bg-[#3A1E2F] hover:bg-[#422235] transition-colors border border-pink-500/10 cursor-pointer">
            <div className="text-[12px] font-semibold text-[#F472B6] mb-0.5">#SelfCare</div>
            <div className="text-[10px] text-white/40">1.4K posts</div>
          </button>

          {/* Topic 4 */}
          <button onClick={() => onSelectTopic('ExamStress')} className="flex-1 min-w-[120px] text-left p-3 rounded-xl bg-[#322F22] hover:bg-[#383526] transition-colors border border-yellow-500/10 cursor-pointer">
            <div className="text-[12px] font-semibold text-[#FBBF24] mb-0.5">#ExamStress</div>
            <div className="text-[10px] text-white/40">1.1K posts</div>
          </button>

          {/* Topic 5 */}
          <button onClick={() => onSelectTopic('Motivation')} className="flex-1 min-w-[120px] text-left p-3 rounded-xl bg-[#1B2F2A] hover:bg-[#1F3530] transition-colors border border-emerald-500/10 cursor-pointer">
            <div className="text-[12px] font-semibold text-[#34D399] mb-0.5">#Motivation</div>
            <div className="text-[10px] text-white/40">980 posts</div>
          </button>
        </div>
      </div>

    </aside>
  );
};
