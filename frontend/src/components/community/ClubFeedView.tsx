import React from 'react';
import {
  Sparkles,
  Flame,
  ArrowLeft,
} from 'lucide-react';
import type { PostItem, ReactionType } from '../../types/community';
import { PostCard } from './PostCard';

interface ClubFeedViewProps {
  clubId: string;
  userNickname: string;
  userAvatar: string;
  posts: PostItem[];
  onBackToFeed: () => void;
  onReact: (postId: string, reaction: ReactionType) => void;
  onSave: (postId: string) => void;
  onReport: (postId: string) => void;
  onAddComment: (postId: string, content: string, parentId?: string | null) => void;
}

export const ClubFeedView: React.FC<ClubFeedViewProps> = ({
  clubId,
  userNickname,
  userAvatar,
  posts,
  onBackToFeed,
  onReact,
  onSave,
  onReport,
  onAddComment,
}) => {
  const getClubDetails = () => {
    switch (clubId) {
      case 'book-club':
        return {
          name: '📚 Book Club',
          tagline: 'Mindful Reading & Thoughtful Discussions',
          icon: '📚',
          bannerGradient: 'from-amber-900/40 via-amber-600/10 to-transparent',
          badgeColor: 'text-amber-300 border-amber-500/30 bg-amber-500/10',
          weeklyPromptTitle: 'Weekly Reading Prompt',
          weeklyPrompt: '"What book has positively changed your mindset?"',
          activeMembers: 1420,
          highlights: [
            { title: 'Monthly Challenge', desc: 'Read 2 chapters of reflective literature this week' },
            { title: 'Live Discussion', desc: 'Text Reading Circle every Sunday at 6 PM' },
          ],
        };
      case 'music-club':
        return {
          name: '🎵 Music Club',
          tagline: 'Calming Frequencies & Healing Playlists',
          icon: '🎵',
          bannerGradient: 'from-indigo-900/40 via-purple-600/10 to-transparent',
          badgeColor: 'text-indigo-300 border-indigo-500/30 bg-indigo-500/10',
          weeklyPromptTitle: 'Weekly Music Prompt',
          weeklyPrompt: '"Share one song that helps you unwind and relax."',
          activeMembers: 1890,
          highlights: [
            { title: 'Community Playlist', desc: '432Hz Ambient Chillout (42 Tracks Shared)' },
            { title: 'Sound Therapy', desc: 'Rain & Deep Delta Wave Frequencies' },
          ],
        };
      case 'photography-club':
        return {
          name: '📸 Photography Club',
          tagline: 'Capturing Peace in Everyday Moments',
          icon: '📸',
          bannerGradient: 'from-emerald-900/40 via-teal-600/10 to-transparent',
          badgeColor: 'text-emerald-300 border-emerald-500/30 bg-emerald-500/10',
          weeklyPromptTitle: 'Weekly Photo Challenge',
          weeklyPrompt: '"Capture something that gives you a sense of inner peace."',
          activeMembers: 1150,
          highlights: [
            { title: 'Gallery Spotlight', desc: 'Nature & Sunset Serenity Submissions' },
            { title: 'Peaceful Angles', desc: 'Macro Photography of raindrops & foliage' },
          ],
        };
      case 'yoga-club':
        return {
          name: '🧘 Yoga Club',
          tagline: 'Mindful Movement & Gentle Stretching',
          icon: '🧘',
          bannerGradient: 'from-sky-900/40 via-blue-600/10 to-transparent',
          badgeColor: 'text-sky-300 border-sky-500/30 bg-sky-500/10',
          weeklyPromptTitle: "Today's Guided Practice",
          weeklyPrompt: '"Beginner Gentle Stretch - 15 Minute Evening Session"',
          activeMembers: 2100,
          highlights: [
            { title: 'Daily Pose', desc: 'Child’s Pose (Balasana) for lower back relief' },
            { title: 'Breathing Tip', desc: 'Combine 4-7-8 breathing with cat-cow stretches' },
          ],
        };
      default:
        return {
          name: '🌿 MindEase Club',
          tagline: 'Shared Hobbies & Mindful Connections',
          icon: '🌿',
          bannerGradient: 'from-purple-900/40 via-indigo-600/10 to-transparent',
          badgeColor: 'text-purple-300 border-purple-500/30 bg-purple-500/10',
          weeklyPromptTitle: 'Weekly Community Prompt',
          weeklyPrompt: '"What small act of self-care nourished your soul today?"',
          activeMembers: 1500,
          highlights: [
            { title: 'Community Goal', desc: 'Support 500 members with encouraging thoughts' },
          ],
        };
    }
  };

  const details = getClubDetails();
  const filteredPosts = posts.filter((p) => p.clubId === clubId || posts.length < 3);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Back Header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onBackToFeed}
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 hover:text-white text-xs font-medium transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Sanctuary Feed</span>
        </button>

        <span className="text-xs text-white/50">{details.activeMembers.toLocaleString()} Members Active</span>
      </div>

      {/* Hero Club Banner Card */}
      <div className={`relative bg-gradient-to-r ${details.bannerGradient} border border-white/10 rounded-3xl p-6 md:p-8 overflow-hidden shadow-2xl backdrop-blur-md`}>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{details.icon}</span>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white font-serif-heading">{details.name}</h1>
              <p className="text-xs md:text-sm text-white/70">{details.tagline}</p>
            </div>
          </div>

          {/* Weekly Prompt Container */}
          <div className="mt-5 p-4 rounded-2xl bg-[#0B1026]/70 border border-white/10 backdrop-blur-sm">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B79CFF] mb-1">
              <Sparkles className="w-4 h-4 text-[#FDE68A]" />
              <span>{details.weeklyPromptTitle}</span>
            </div>
            <p className="text-sm md:text-base italic text-white font-serif-heading">
              {details.weeklyPrompt}
            </p>
          </div>

          {/* Highlights Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
            {details.highlights.map((h, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-start gap-2">
                <Flame className="w-4 h-4 text-[#FDE68A] shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white">{h.title}</div>
                  <div className="text-white/60">{h.desc}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Club Discussions Feed Header */}
      <div className="flex items-center justify-between pt-2">
        <h2 className="text-lg font-bold font-serif-heading text-white flex items-center gap-2">
          <span>Active Discussions in {details.name}</span>
        </h2>
      </div>

      {/* Club Posts List */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="p-8 text-center rounded-3xl bg-[#182235] border border-white/10 text-white/50 text-sm">
            No posts in this club yet. Be the first to share an answer to this week's prompt!
          </div>
        ) : (
          filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              userNickname={userNickname}
              userAvatar={userAvatar}
              onReact={onReact}
              onSave={onSave}
              onReport={onReport}
              onAddComment={onAddComment}
            />
          ))
        )}
      </div>

    </div>
  );
};
