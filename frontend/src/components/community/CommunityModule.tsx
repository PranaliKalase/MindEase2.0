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
  Sparkles,
  Mail,
  Sun,
  ChevronDown,
} from 'lucide-react';
import type { PostItem, ReactionType, CommentItem } from '../../types/community';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../hooks/useAuth';
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
  const [feedFilterTab, setFeedFilterTab] = useState<'sanctuary' | 'my_clubs' | 'saved' | 'my_posts'>('sanctuary');

  const { user } = useAuth();

  // Modals State
  const [isDiscoverClubsOpen, setIsDiscoverClubsOpen] = useState(false);
  const [isCrisisModalOpen, setIsCrisisModalOpen] = useState(false);
  const [reportToast, setReportToast] = useState(false);

  const [posts, setPosts] = useState<PostItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const { data: postsData, error: fetchError } = await supabase
        .from('community_posts')
        .select('*')
        .eq('ai_status', 'published')
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      // Extract unique user IDs
      const userIds = [...new Set((postsData || []).map(p => p.user_id))];
      
      // Fetch corresponding profiles
      let profilesMap: Record<string, any> = {};
      if (userIds.length > 0) {
        const { data: profilesData } = await supabase
          .from('profiles')
          .select('id, full_name, avatar')
          .in('id', userIds);
          
        if (profilesData) {
          profilesData.forEach(p => {
            profilesMap[p.id] = p;
          });
        }
      }

      const formattedPosts: PostItem[] = (postsData || []).map(post => {
        const profile = profilesMap[post.user_id];
        const authorNickname = post.is_anonymous ? 'Anonymous Member' : (profile?.full_name || 'Unknown');
        const authorAvatar = post.is_anonymous ? '/assets/images/mindease-logo.jpg' : (profile?.avatar || '/assets/images/mindease-logo.jpg');

        // Simple relative time formatting
        const postDate = new Date(post.created_at);
        const now = new Date();
        const diffMs = now.getTime() - postDate.getTime();
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);
        
        let timeAgo = 'Just now';
        if (diffDays > 0) timeAgo = `${diffDays} days ago`;
        else if (diffHours > 0) timeAgo = `${diffHours} hours ago`;
        else if (diffMins > 0) timeAgo = `${diffMins} mins ago`;

        return {
          id: post.id,
          userId: post.user_id, // Store for filtering
          authorNickname,
          authorAvatar,
          createdAt: timeAgo,
          topicTag: post.topic_tag || 'General',
          moodTag: post.mood_tag,
          clubId: post.club_id,
          content: post.content,
          imageUrl: post.image_url,
          reactions: { helpful: 0, relate: 0, encouraged: 0, thank_you: 0 },
          userReactions: [],
          commentsCount: 0,
          comments: []
        };
      });

      setPosts(formattedPosts);
    } catch (err) {
      console.error("Error fetching posts:", err);
      setError("Unable to load community posts.");
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPosts();
  }, []);

  // Handlers
  const handlePostCreated = () => {
    fetchPosts();
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
    } else if (feedFilterTab === 'my_posts') {
      // Filter by the logged-in user's ID
      list = list.filter((p: any) => p.userId === user?.id);
    }

    return list;
  };

  const isClubView = ['book-club', 'music-club', 'photography-club', 'yoga-club'].includes(activeView);

  return (
    <div className="min-h-screen bg-[#0B0E17] text-white selection:bg-[#8A5CFF] selection:text-white page-reveal">
      
      {/* 1. TOP STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-40 bg-[#0B0E17]/90 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Left: Logo */}
          <div className="flex items-center gap-3 cursor-pointer w-[280px]" onClick={() => setActiveView('feed')}>
            <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-400" />
            </div>
            <span className="text-xl font-bold font-serif-heading text-white tracking-wide">
              Hope Community
            </span>
            <span className="text-[10px] bg-white/10 text-white/70 px-2.5 py-0.5 rounded-full font-medium ml-2">
              Sanctuary
            </span>
          </div>

          {/* Center: Search */}
          <div className="relative flex-1 max-w-2xl mx-4">
            <Search className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts, topics, clubs..."
              className="w-full bg-[#1A1D27]/80 border border-transparent hover:border-white/10 rounded-full pl-11 pr-4 py-2.5 text-[13px] text-white placeholder-white/40 focus:outline-none focus:border-[#B79CFF]/60 transition-all"
            />
          </div>

          {/* Right: Actions & Profile */}
          <div className="flex items-center gap-4 w-[280px] justify-end">
            <div className="flex items-center gap-2">
              <button className="relative p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-3.5 h-3.5 bg-purple-500 rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-[#0B0E17]">3</span>
              </button>
              
              <button className="relative p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-5 h-5" />
                <span className="absolute top-1.5 right-1 right-1.5 w-3.5 h-3.5 bg-purple-500 rounded-full text-[9px] font-bold flex items-center justify-center border-2 border-[#0B0E17]">2</span>
              </button>

              <button className="p-2 rounded-full hover:bg-white/5 text-white/60 hover:text-white transition-colors cursor-pointer ml-1">
                <Sun className="w-5 h-5" />
              </button>
            </div>

            <div 
              className="flex items-center gap-2 pl-3 border-l border-white/10 cursor-pointer group"
              onClick={() => onNavigateToTab && onNavigateToTab('profile')}
            >
              <img
                src={userAvatar}
                alt={userNickname}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div className="flex items-center gap-1">
                <span className="text-[13px] font-medium text-white/90 group-hover:text-white transition-colors">Pranali</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80 transition-colors" />
              </div>
            </div>
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
                if (v === 'create') {
                  setActiveView('feed');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  setTimeout(() => {
                    document.getElementById('create-post-textarea')?.focus();
                  }, 100);
                  return;
                }
                
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
            ) : activeView === 'explore' ? (
              <div className="py-24 text-center flex flex-col items-center justify-center gap-4 animate-fadeIn bg-[#121524] rounded-3xl border border-white/5">
                <Compass className="w-12 h-12 text-[#6EE7B7] mb-2" />
                <h3 className="text-xl font-bold text-white/90 font-sans">Explore Communities</h3>
                <p className="text-[14px] text-white/50 max-w-sm leading-relaxed mb-4 font-sans">
                  Discover new clubs, trending topics, and connect with peers who share your journey.
                  <br /><br />
                  Coming Soon.
                </p>
                <button 
                  onClick={() => setActiveView('feed')}
                  className="px-6 py-2.5 rounded-full bg-[#2A2440] hover:bg-[#342D4F] text-white text-[13px] font-medium transition-all cursor-pointer"
                >
                  Return to Feed
                </button>
              </div>
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
                <div className="flex items-center gap-8 border-b border-white/10 pb-0 mb-6 px-1">
                  {['sanctuary', 'my_clubs', 'saved', 'my_posts'].map((tab) => (
                    <button
                      key={tab}
                      type="button"
                      onClick={() => setFeedFilterTab(tab as any)}
                      className={`pb-4 text-[14px] font-medium transition-all relative cursor-pointer ${
                        feedFilterTab === tab
                          ? 'text-white font-semibold'
                          : 'text-white/50 hover:text-white/80'
                      }`}
                    >
                      {tab === 'sanctuary' && 'Sanctuary Feed'}
                      {tab === 'my_clubs' && 'My Clubs'}
                      {tab === 'saved' && 'Saved Posts'}
                      {tab === 'my_posts' && 'My Posts'}
                      
                      {feedFilterTab === tab && (
                        <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#8A5CFF] rounded-t-full shadow-[0_-2px_15px_rgba(138,92,255,0.7)]" />
                      )}
                    </button>
                  ))}
                  
                  <div className="flex-1" />

                  <button className="flex items-center gap-2 mb-3 px-4 py-2 rounded-full border border-white/10 bg-[#1A1D27]/80 hover:bg-white/10 hover:border-white/20 text-[12px] font-medium text-white/80 transition-colors cursor-pointer shadow-sm">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/60"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
                    <span>Latest</span>
                    <ChevronDown className="w-3.5 h-3.5 text-white/50" />
                  </button>
                </div>

                {/* Posts Stream */}
                <div className="space-y-4">
                  {isLoading ? (
                    <div className="space-y-4">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="p-6 rounded-3xl bg-[#182235] border border-white/10 animate-pulse">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-full bg-white/10"></div>
                            <div className="space-y-2">
                              <div className="h-4 w-24 bg-white/10 rounded"></div>
                              <div className="h-3 w-16 bg-white/10 rounded"></div>
                            </div>
                          </div>
                          <div className="space-y-3">
                            <div className="h-4 w-full bg-white/10 rounded"></div>
                            <div className="h-4 w-5/6 bg-white/10 rounded"></div>
                            <div className="h-4 w-4/6 bg-white/10 rounded"></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : error ? (
                    <div className="py-12 text-center flex flex-col items-center justify-center gap-3">
                      <p className="text-white/60 text-sm">Couldn't load your community feed.</p>
                      <button 
                        onClick={fetchPosts}
                        className="text-[#B79CFF] hover:text-white text-xs font-medium transition-colors underline underline-offset-4 cursor-pointer"
                      >
                        Try Again
                      </button>
                    </div>
                  ) : getFilteredPosts().length === 0 ? (
                    <div className="py-24 text-center flex flex-col items-center justify-center gap-4 animate-fadeIn">
                      <div className="text-4xl mb-2">🌿</div>
                      <h3 className="text-lg font-serif-heading text-white/90">Welcome to MindEase Community</h3>
                      <p className="text-[13px] text-white/50 max-w-sm leading-relaxed mb-4">
                        A safe space to share, listen, and support one another.
                        <br /><br />
                        No posts yet. Be the first to start the conversation.
                      </p>
                      <button 
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="px-6 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-[13px] font-medium transition-all"
                      >
                        + Create Your First Post
                      </button>
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
