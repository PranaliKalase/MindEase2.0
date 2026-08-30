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
      <div className="bg-[#182235] border border-white/10 rounded-3xl p-4 shadow-xl shadow-[#8A5CFF]/5">
        <nav className="space-y-1">
          <button
            type="button"
            onClick={() => onSelectView('feed')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'feed'
                ? 'bg-gradient-to-r from-[#8A5CFF]/30 to-[#3A2E7A]/40 text-white border border-[#B79CFF]/40 shadow-lg shadow-[#8A5CFF]/10'
                : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Home className="w-4 h-4 text-[#7DD3FC]" />
            <span>Home Feed</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('explore')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'explore'
                ? 'bg-gradient-to-r from-[#8A5CFF]/30 to-[#3A2E7A]/40 text-white border border-[#B79CFF]/40 shadow-lg shadow-[#8A5CFF]/10'
                : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Compass className="w-4 h-4 text-[#6EE7B7]" />
            <span>Explore</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectView('create')}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
              activeView === 'create'
                ? 'bg-gradient-to-r from-[#8A5CFF]/30 to-[#3A2E7A]/40 text-white border border-[#B79CFF]/40 shadow-lg shadow-[#8A5CFF]/10'
                : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent'
            }`}
          >
            <Edit3 className="w-4 h-4 text-[#FDE68A]" />
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
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-2xl text-xs transition-all group cursor-pointer ${
                    isActive
                      ? 'bg-[#B79CFF]/20 text-white border border-[#B79CFF]/40 font-semibold'
                      : 'text-white/80 hover:text-white hover:bg-white/5 border border-transparent'
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
            className="w-full flex items-center justify-center gap-1.5 py-2 mt-2 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#B79CFF] font-medium transition-colors cursor-pointer"
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
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/15 text-white border border-white/20'
                    : 'text-white/60 hover:text-white hover:bg-white/5 border border-transparent'
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
      <div className="bg-[#182235] border border-white/10 rounded-3xl p-4 shadow-xl shadow-[#8A5CFF]/5 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={userAvatar}
            alt={userNickname}
            className="w-10 h-10 rounded-full object-cover border border-[#B79CFF]/40 shrink-0"
          />
          <div className="min-w-0">
            <div className="text-xs font-bold text-white truncate">{userNickname}</div>
            <div className="text-[10px] text-white/50 flex items-center gap-1">
              <span>😊 Mood:</span>
              <span className="text-[#6EE7B7] font-medium">{userMood}</span>
            </div>
          </div>
        </div>

        {onOpenQuickJournal && (
          <button
            type="button"
            onClick={onOpenQuickJournal}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#B79CFF] hover:text-white transition-colors cursor-pointer shrink-0"
            title="Quick Journal Entry"
          >
            <FileText className="w-4 h-4" />
          </button>
        )}
      </div>

    </aside>
  );
};
