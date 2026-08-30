import React, { useState } from 'react';
import {
  Search,
  Bell,
  Settings,
  ShieldCheck,
  Home,
  Compass,
  BookOpen,
  User,
} from 'lucide-react';
import type { PostItem, ReactionType, CommentItem } from '../../types/community';
import { CommunitySidebar } from './CommunitySidebar';
import { CreatePostCard } from './CreatePostCard';
import { PostCard } from './PostCard';
import { ClubFeedView } from './ClubFeedView';
import { WellnessSidebar } from './WellnessSidebar';
import { DiscoverClubsModal } from './DiscoverClubsModal';
import { CrisisModal } from './CrisisModal';

interface CommunityModuleProps {
  userNickname?: string;
  userAvatar?: string;
  onNavigateToTab?: (tab: string) => void;
}

export const CommunityModule: React.FC<CommunityModuleProps> = ({
  userNickname = 'CalmSoul21',
  userAvatar = '/assets/images/mindease-logo.jpg',
  onNavigateToTab,
}) => {
  const [activeView, setActiveView] = useState<string>('feed'); // feed, explore, create, book-club, music-club, photography-club, yoga-club
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTopicFilter, setActiveTopicFilter] = useState<string>('all');
  const [feedFilterTab, setFeedFilterTab] = useState<'sanctuary' | 'my_clubs' | 'saved'>('sanctuary');

  // Modals State
  const [isDiscoverClubsOpen, setIsDiscoverClubsOpen] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [reportToast, setReportToast] = useState(false);

  // Initial Mock Posts Data matching context requirements
  const [posts, setPosts] = useState<PostItem[]>([
    {
      id: 'post-1',
      authorNickname: 'CalmSoul21',
      authorAvatar: '/assets/images/mindease-logo.jpg',
      isVerifiedMentor: true,
      createdAt: '2 hours ago',
      topicTag: 'AnxietyRelief',
      moodTag: 'Calm',
      content: 'How do you all handle anxiety during work meetings? I find myself getting really tense whenever I have to present, even if it’s just to my own team. Any grounding techniques that aren’t too obvious on camera?',
      reactions: { helpful: 28, relate: 14, encouraged: 9, thank_you: 12 },
      userReactions: ['helpful'],
      commentsCount: 14,
      comments: [
        {
          id: 'c-1',
          postId: 'post-1',
          authorNickname: 'MountainMist',
          authorAvatar: '/assets/images/mindease-logo.jpg',
          content: 'Box breathing (4s inhale, 4s hold, 4s exhale, 4s hold) under the table has worked wonders for me during long presentations!',
          createdAt: '1 hour ago',
          reactions: { helpful: 6, relate: 3, encouraged: 2, thank_you: 1 },
          replies: [
            {
              id: 'c-1-1',
              postId: 'post-1',
              authorNickname: 'CalmSoul21',
              authorAvatar: '/assets/images/mindease-logo.jpg',
              isAuthor: true,
              content: 'Thank you so much! I will try box breathing during tomorrow morning standup.',
              createdAt: '45 mins ago',
              reactions: { helpful: 2, relate: 1, encouraged: 1, thank_you: 1 },
            },
          ],
        },
      ],
    },
    {
      id: 'post-2',
      authorNickname: 'MountainMist',
      authorAvatar: '/assets/images/mindease-logo.jpg',
      createdAt: '4 hours ago',
      topicTag: 'SleepQuality',
      moodTag: 'Grateful',
      clubId: 'book-club',
      clubName: '📚 Book Club',
      clubIcon: '📚',
      content: 'Finally managed to stay away from my phone for 1 hour before bed for three nights in a row! I notice a huge difference in my sleep quality already. Highly recommend reading a peaceful fiction book if you struggle with insomnia.',
      reactions: { helpful: 42, relate: 18, encouraged: 15, thank_you: 8 },
      userReactions: ['relate'],
      commentsCount: 8,
      comments: [],
    },
    {
      id: 'post-3',
      authorNickname: 'HopefulHeart',
      authorAvatar: '/assets/images/mindease-logo.jpg',
      createdAt: '5 hours ago',
      topicTag: 'Mindfulness',
      moodTag: 'Reflective',
      clubId: 'yoga-club',
      clubName: '🧘 Yoga Club',
      clubIcon: '🧘',
      content: '"Small steps are still steps forward." Just completed 10 minutes of gentle evening stretching. Remember to be kind to yourself tonight, friends.',
      reactions: { helpful: 35, relate: 22, encouraged: 28, thank_you: 14 },
      userReactions: ['encouraged'],
      commentsCount: 6,
      comments: [],
    },
  ]);

  // Handlers
  const handlePostCreated = (newPost: PostItem) => {
    setPosts([newPost, ...posts]);
  };

  const handleReact = (postId: string, reaction: ReactionType) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id !== postId) return p;
        const exists = p.userReactions.includes(reaction);
        const updatedReactions = { ...p.reactions };

        if (exists) {
          updatedReactions[reaction] = Math.max(0, updatedReactions[reaction] - 1);
          return {
            ...p,
            reactions: updatedReactions,
            userReactions: p.userReactions.filter((r) => r !== reaction),
          };
        } else {
          updatedReactions[reaction] = (updatedReactions[reaction] || 0) + 1;
          return {
            ...p,
            reactions: updatedReactions,
            userReactions: [...p.userReactions, reaction],
          };
        }
      })
    );
  };

  const handleSave = (postId: string) => {
    setPosts((prevPosts) =>
      prevPosts.map((p) => (p.id === postId ? { ...p, isSaved: !p.isSaved } : p))
    );
  };

  const handleReport = (_postId: string) => {
    setReportToast(true);
    setTimeout(() => setReportToast(false), 3000);
  };

  const handleAddComment = (postId: string, commentText: string, parentId?: string | null) => {
    const newCommentObj: CommentItem = {
      id: `comment-${Date.now()}`,
      postId,
      authorNickname: userNickname,
      authorAvatar: userAvatar,
      content: commentText,
      createdAt: 'Just now',
      parentId: parentId || null,
      reactions: { helpful: 0, relate: 0, encouraged: 0, thank_you: 0 },
    };

    setPosts((prevPosts) =>
      prevPosts.map((p) => {
        if (p.id !== postId) return p;
        
        let updatedComments = [...(p.comments || [])];
        if (parentId) {
          updatedComments = updatedComments.map((c) => {
            if (c.id === parentId) {
              return { ...c, replies: [...(c.replies || []), newCommentObj] };
            }
            return c;
          });
        } else {
          updatedComments.push(newCommentObj);
        }

        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: updatedComments,
        };
      })
    );
  };

  // Filter posts based on active tab, search, or club selection
  const getFilteredPosts = () => {
    let list = [...posts];

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.content.toLowerCase().includes(q) ||
          p.topicTag.toLowerCase().includes(q) ||
          p.authorNickname.toLowerCase().includes(q)
      );
    }

    if (activeTopicFilter !== 'all') {
      list = list.filter((p) => p.topicTag.toLowerCase() === activeTopicFilter.toLowerCase());
    }

    if (feedFilterTab === 'my_clubs') {
      list = list.filter((p) => !!p.clubId);
    } else if (feedFilterTab === 'saved') {
      list = list.filter((p) => p.isSaved);
    }

    return list;
  };

  const isClubView = ['book-club', 'music-club', 'photography-club', 'yoga-club'].includes(activeView);

  return (
    <div className="min-h-screen bg-[#0B1026] text-white selection:bg-[#8A5CFF] selection:text-white page-reveal">
      
      {/* 1. TOP STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#0B1026]/90 backdrop-blur-md border-b border-white/10 px-4 md:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Search Community Input */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search community posts, topics, clubs..."
              className="w-full bg-[#182235]/80 border border-white/10 rounded-full pl-10 pr-4 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#B79CFF]/60 transition-all shadow-inner"
            />
          </div>

          {/* Center Community Title */}
          <div className="hidden md:flex items-center gap-2 cursor-pointer" onClick={() => setActiveView('feed')}>
            <span className="text-xl font-bold font-serif-heading text-white tracking-wide">
              Hope Community
            </span>
            <span className="text-[10px] bg-[#B79CFF]/20 text-[#B79CFF] px-2 py-0.5 rounded-full border border-[#B79CFF]/30 font-semibold">
              Sanctuary
            </span>
          </div>

          {/* Header Action Icons */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors relative cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="w-2 h-2 rounded-full bg-[#7DD3FC] absolute top-1 right-1 animate-pulse" />
            </button>

            <button
              type="button"
              onClick={() => onNavigateToTab && onNavigateToTab('settings')}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Settings"
            >
              <Settings className="w-4 h-4" />
            </button>

            <img
              src={userAvatar}
              alt={userNickname}
              className="w-8 h-8 rounded-full object-cover border border-[#B79CFF]/50 cursor-pointer"
              onClick={() => onNavigateToTab && onNavigateToTab('profile')}
            />
          </div>

        </div>
      </header>

      {/* Global Toast Alerts */}
      {reportToast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-red-500/20 border border-red-500/40 text-red-200 text-xs flex items-center gap-2 shadow-2xl animate-fadeIn">
          <ShieldCheck className="w-4 h-4 text-red-400 shrink-0" />
          <span>Thank you for keeping our sanctuary safe. Report submitted for AI review.</span>
        </div>
      )}

      {/* 2. MAIN WORKSPACE (3-COLUMN RESPONSIVE LAYOUT) */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* LEFT SIDEBAR (Desktop 3 Cols, Tablet collapsed drawer) */}
          <div className="hidden md:block md:col-span-3 lg:col-span-3 sticky top-20">
            <CommunitySidebar
              activeView={activeView}
              onSelectView={(v) => {
                setActiveView(v);
                if (['buddy', 'journal', 'letters', 'relief', 'companion', 'notifications', 'profile', 'settings'].includes(v) && onNavigateToTab) {
                  onNavigateToTab(v);
                }
              }}
              userNickname={userNickname}
              userAvatar={userAvatar}
              userMood="Calm"
              onOpenDiscoverClubs={() => setIsDiscoverClubsOpen(true)}
              onOpenQuickJournal={() => onNavigateToTab && onNavigateToTab('journal')}
            />
          </div>

          {/* CENTER FEED (6 Cols Desktop) */}
          <div className="col-span-1 md:col-span-9 lg:col-span-6 space-y-6">
            
            {/* If a Club Feed is active, render ClubFeedView */}
            {isClubView ? (
              <ClubFeedView
                clubId={activeView}
                userNickname={userNickname}
                userAvatar={userAvatar}
                posts={posts}
                onBackToFeed={() => setActiveView('feed')}
                onReact={handleReact}
                onSave={handleSave}
                onReport={handleReport}
                onAddComment={handleAddComment}
              />
            ) : (
              <>
                {/* Create Post Card */}
                <CreatePostCard
                  userNickname={userNickname}
                  userAvatar={userAvatar}
                  onPostCreated={handlePostCreated}
                  onTriggerCrisisModal={() => setIsCrisisModalOpen(true)}
                />

                {/* Feed Filter Tabs Bar */}
                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setFeedFilterTab('sanctuary')}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        feedFilterTab === 'sanctuary'
                          ? 'bg-[#B79CFF]/20 text-[#B79CFF] border border-[#B79CFF]/40'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Sanctuary Feed
                    </button>

                    <button
                      type="button"
                      onClick={() => setFeedFilterTab('my_clubs')}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        feedFilterTab === 'my_clubs'
                          ? 'bg-[#B79CFF]/20 text-[#B79CFF] border border-[#B79CFF]/40'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      My Clubs
                    </button>

                    <button
                      type="button"
                      onClick={() => setFeedFilterTab('saved')}
                      className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        feedFilterTab === 'saved'
                          ? 'bg-[#B79CFF]/20 text-[#B79CFF] border border-[#B79CFF]/40'
                          : 'text-white/60 hover:text-white'
                      }`}
                    >
                      Saved Posts
                    </button>
                  </div>
                </div>

                {/* Posts Stream */}
                <div className="space-y-4">
                  {getFilteredPosts().length === 0 ? (
                    <div className="p-12 text-center rounded-3xl bg-[#182235] border border-white/10 text-white/50 text-sm">
                      No posts found in this section. Be the first to share a thought.
                    </div>
                  ) : (
                    getFilteredPosts().map((post) => (
                      <PostCard
                        key={post.id}
                        post={post}
                        userNickname={userNickname}
                        userAvatar={userAvatar}
                        onReact={handleReact}
                        onSave={handleSave}
                        onReport={handleReport}
                        onAddComment={handleAddComment}
                      />
                    ))
                  )}
                </div>
              </>
            )}

          </div>

          {/* RIGHT WELLNESS SIDEBAR (3 Cols Desktop) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-20">
            <WellnessSidebar onSelectTopic={(t) => setActiveTopicFilter(t)} />
          </div>

        </div>
      </main>

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1026]/95 backdrop-blur-lg border-t border-white/10 px-4 py-2 flex items-center justify-around text-xs">
        <button
          type="button"
          onClick={() => setActiveView('feed')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${activeView === 'feed' ? 'text-[#B79CFF]' : 'text-white/60'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Home</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveView('book-club')}
          className={`flex flex-col items-center gap-1 cursor-pointer ${isClubView ? 'text-[#B79CFF]' : 'text-white/60'}`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[10px]">Clubs</span>
        </button>

        <button
          type="button"
          onClick={() => setIsDiscoverClubsOpen(true)}
          className={`flex flex-col items-center gap-1 cursor-pointer text-white/60`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Discover</span>
        </button>

        <button
          type="button"
          onClick={() => onNavigateToTab && onNavigateToTab('profile')}
          className={`flex flex-col items-center gap-1 cursor-pointer text-white/60`}
        >
          <User className="w-5 h-5" />
          <span className="text-[10px]">Profile</span>
        </button>
      </div>

      {/* DISCOVER CLUBS MODAL */}
      <DiscoverClubsModal
        isOpen={isDiscoverClubsOpen}
        onClose={() => setIsDiscoverClubsOpen(false)}
      />

      {/* CRISIS RESOURCE OVERLAY MODAL */}
      <CrisisModal
        isOpen={isCrisisModalOpen}
        onClose={() => setIsCrisisModalOpen(false)}
        onConnectAI={() => onNavigateToTab && onNavigateToTab('companion')}
      />

    </div>
  );
};
