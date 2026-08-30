import React from 'react';
import {
  Home,
  Compass,
  Edit3,
  PlusCircle,
  Users,
  FileText,
  Mail,
  Wind,
  Bot,
  Bell,
  User,
  Settings,
} from 'lucide-react';
import type { ClubItem } from '../../types/community';

interface CommunitySidebarProps {
  activeView: string;
  onSelectView: (view: string) => void;
  userNickname: string;
  userAvatar: string;
  userMood?: string;
  onOpenDiscoverClubs: () => void;
  onOpenQuickJournal?: () => void;
}

export const CommunitySidebar: React.FC<CommunitySidebarProps> = ({
  activeView,
  onSelectView,
  userNickname,
  userAvatar,
  userMood = 'Calm',
  onOpenDiscoverClubs,
  onOpenQuickJournal,
}) => {
  const clubsList: ClubItem[] = [
    {
      id: 'book-club',
      name: 'Book Club',
      icon: '📚',
      description: 'Mindful reading & literary discussions',
      weeklyPrompt: 'What book changed your mindset?',
      activityBadge: 'New Prompt',
      membersCount: 1420,
      category: 'Hobbies',
    },
    {
      id: 'music-club',
      name: 'Music Club',
      icon: '🎵',
      description: 'Relaxation playlists & sound therapy',
      weeklyPrompt: 'Share a song that calms you',
      activityBadge: 'Playlist Updated',
      membersCount: 1890,
      category: 'Hobbies',
    },
    {
      id: 'photography-club',
      name: 'Photography Club',
      icon: '📸',
      description: 'Peaceful moments in photos',
      weeklyPrompt: 'Capture quiet moments',
      activityBadge: '3 New Photos',
      membersCount: 1150,
      category: 'Hobbies',
    },
    {
      id: 'yoga-club',
      name: 'Yoga Club',
      icon: '🧘',
      description: 'Daily stretch & pose guidance',
      weeklyPrompt: 'Beginner 15-min stretch',
      activityBadge: 'Daily Session',
      membersCount: 2100,
      category: 'Hobbies',
    },
  ];

  const secondaryNavItems = [
    { id: 'buddy', label: 'Buddy System', icon: Users },
    { id: 'journal', label: 'Journal', icon: FileText },
    { id: 'letters', label: 'Future Letters', icon: Mail },
    { id: 'relief', label: 'Relief Techniques', icon: Wind },
    { id: 'companion', label: 'AI Assistant', icon: Bot },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-full space-y-6">
      
      {/* Primary Navigation Hub */}
      <div className="bg-transparent border-none p-0 space-y-4">
        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectView('feed')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[14px] font-medium transition-all cursor-pointer ${
              activeView === 'feed'
                ? 'bg-[#2A2440] text-white font-bold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Home className={`w-5 h-5 ${activeView === 'feed' ? 'text-[#7DD3FC]' : 'text-[#7DD3FC]/80'}`} />
            <span>Home Feed</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('explore')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[14px] font-medium transition-all cursor-pointer ${
              activeView === 'explore'
                ? 'bg-[#2A2440] text-white font-bold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Compass className={`w-5 h-5 ${activeView === 'explore' ? 'text-[#6EE7B7]' : 'text-[#6EE7B7]/80'}`} />
            <span>Explore</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('create')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-[14px] font-medium transition-all cursor-pointer ${
              activeView === 'create'
                ? 'bg-[#2A2440] text-white font-bold shadow-sm'
                : 'text-white/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Edit3 className={`w-5 h-5 ${activeView === 'create' ? 'text-[#FDE68A]' : 'text-[#FDE68A]/80'}`} />
            <span>Create Post</span>
          </button>
        </nav>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* 🌿 MY CLUBS SECTION */}
        <div className="space-y-2">
          <div className="flex items-center justify-between px-2 text-[11px] font-bold text-[#B79CFF] uppercase tracking-wider">
            <span>🌿 My Clubs</span>
            <span className="text-[10px] bg-[#B79CFF]/20 px-1.5 py-0.5 rounded-full">4 Joined</span>
          </div>

          <div className="space-y-1">
            {clubsList.map((club) => {
              const isActive = activeView === club.id;
              return (
                <button
                  key={club.id}
                  type="button"
                  onClick={() => onSelectView(club.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-[13px] transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-[#221C3D] text-white font-semibold border border-purple-500/20 shadow-[inset_0_0_12px_rgba(138,92,255,0.1)]'
                      : 'text-white/80 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <span className="text-base shrink-0">{club.icon}</span>
                    <span className="truncate">{club.name}</span>
                  </div>

                  {club.activityBadge && (
                    <span className="text-[9px] bg-sky-500/20 text-sky-300 border border-sky-500/30 px-1.5 py-0.5 rounded-full shrink-0">
                      {club.activityBadge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Discover More Clubs Button */}
          <button
            type="button"
            onClick={onOpenDiscoverClubs}
            className="w-full flex items-center justify-center gap-1.5 py-2 mt-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-[#B79CFF] font-medium transition-colors cursor-pointer"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Discover More Clubs</span>
          </button>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-white/10" />

        {/* Secondary Links */}
        <div className="space-y-1">
          {secondaryNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-[13px] font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#221C3D] text-white font-semibold border border-purple-500/20 shadow-[inset_0_0_12px_rgba(138,92,255,0.1)]'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 text-white/50 group-hover:text-white" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Compact User Card at Bottom */}
      <div className="bg-[#181A2A]/40 border border-white/5 rounded-2xl p-3 flex items-center justify-between gap-3 mt-4 hover:bg-white/5 transition-colors cursor-pointer group">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={userAvatar}
            alt={userNickname}
            className="w-10 h-10 rounded-full object-cover border border-white/10 shrink-0"
          />
          <div className="min-w-0 flex flex-col justify-center">
            <div className="text-[13px] font-semibold text-white/90 truncate">Pranali Kalase</div>
            <div className="text-[11px] text-white/50 flex items-center gap-1.5 mt-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              <span>Mood: {userMood}</span>
            </div>
          </div>
        </div>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30 group-hover:text-white/60 transition-colors shrink-0 mr-1"><path d="m6 9 6 6 6-6"/></svg>
      </div>

    </aside>
  );
};
