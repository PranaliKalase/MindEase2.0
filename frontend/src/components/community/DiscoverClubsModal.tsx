import React, { useState } from 'react';
import { X, Sparkles, Plus, Check } from 'lucide-react';

interface DiscoverClubsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DiscoverClubsModal: React.FC<DiscoverClubsModalProps> = ({ isOpen, onClose }) => {
  const [joinedMap, setJoinedMap] = useState<Record<string, boolean>>({});

  if (!isOpen) return null;

  const futureClubs = [
    { id: 'art-club', name: '🎨 Art Club', desc: 'Creative expression, therapy sketching & visual art', category: 'Creative' },
    { id: 'cooking-club', name: '🍳 Cooking Club', desc: 'Nourishing recipes, mindful cooking & comfort meals', category: 'Lifestyle' },
    { id: 'gardening-club', name: '🌱 Gardening Club', desc: 'Connecting with nature, plant care & indoor greens', category: 'Nature' },
    { id: 'movie-club', name: '🎬 Movie Club', desc: 'Uplifting cinema, cozy movie nights & film reviews', category: 'Entertainment' },
    { id: 'travel-club', name: '✈️ Travel Club', desc: 'Peaceful destinations, nature escapes & wanderlust', category: 'Lifestyle' },
    { id: 'coding-club', name: '💻 Coding Club', desc: 'Mindful tech building & healthy digital balance', category: 'Skills' },
    { id: 'study-circle', name: '📖 Study Circle', desc: 'Stress-free study sessions & focus techniques', category: 'Learning' },
    { id: 'gaming-club', name: '🎮 Gaming Club', desc: 'Relaxing, non-competitive & cozy indie gaming', category: 'Entertainment' },
  ];

  const toggleJoin = (id: string) => {
    setJoinedMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#182235] border border-white/10 rounded-3xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#B79CFF]" />
            <h2 className="text-xl font-bold font-serif-heading text-white">Discover Hobby Clubs</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-xs text-white/70 mb-5 leading-relaxed">
          MindEase Clubs provide safe, encouraging spaces to connect through shared creative hobbies. Join any club to participate in weekly prompts and discussions.
        </p>

        {/* Clubs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {futureClubs.map((club) => {
            const isJoined = joinedMap[club.id];
            return (
              <div key={club.id} className="p-4 rounded-2xl bg-[#0B1026]/70 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-white text-sm">{club.name}</span>
                    <span className="text-[10px] bg-white/5 px-2 py-0.5 rounded-full text-white/50">{club.category}</span>
                  </div>
                  <p className="text-xs text-white/60 leading-relaxed mb-3">{club.desc}</p>
                </div>

                <button
                  type="button"
                  onClick={() => toggleJoin(club.id)}
                  className={`w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isJoined
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
                  }`}
                >
                  {isJoined ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Joined Club</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 text-[#B79CFF]" />
                      <span>Join Club</span>
                    </>
                  )}
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-white/10 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-primary text-xs py-2.5 px-6 rounded-xl cursor-pointer font-semibold"
          >
            Done
          </button>
        </div>

      </div>
    </div>
  );
};
