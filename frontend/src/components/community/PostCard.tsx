import React, { useState } from 'react';
import {
  Heart,
  Users,
  Sparkles,
  MessageSquare,
  Bookmark,
  Flag,
  MoreHorizontal,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import type { PostItem, ReactionType } from '../../types/community';
import { CommentSection } from './CommentSection';

interface PostCardProps {
  post: PostItem;
  userNickname: string;
  userAvatar: string;
  onReact: (postId: string, reaction: ReactionType) => void;
  onSave: (postId: string) => void;
  onReport: (postId: string) => void;
  onAddComment: (postId: string, content: string, parentId?: string | null) => void;
}

export const PostCard: React.FC<PostCardProps> = ({
  post,
  userNickname,
  userAvatar,
  onReact,
  onSave,
  onReport,
  onAddComment,
}) => {
  const [showComments, setShowComments] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const isHelpful = post.userReactions.includes('helpful');
  const isRelate = post.userReactions.includes('relate');
  const isEncouraged = post.userReactions.includes('encouraged');
  const isThankYou = post.userReactions.includes('thank_you');

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  // Pseudo-title extraction
  const lines = post.content.split('\n');
  const title = lines[0];
  const body = lines.slice(1).join('\n');

  // Hardcoded counts to match mockup look (in a real app, use post.reactions)
  // For the sake of the mockup UI requested, we will use the dynamic counts from the post if available, 
  // or default to visual numbers if missing. But let's stick to post.reactions to not break logic.
  const helpfulCount = post.reactions.helpful || 0;
  const relateCount = post.reactions.relate || 0;
  const encouragedCount = post.reactions.encouraged || 0;
  const thankYouCount = post.reactions.thank_you || 0;

  return (
    <div className="bg-[#0F1223] rounded-3xl p-6 border border-white/5 mb-6 shadow-sm hover:shadow-md transition-shadow">
      
      {/* 1. Top Header Section */}
      <div className="flex items-start justify-between mb-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="relative">
            <img
              src={post.authorAvatar}
              alt={post.authorNickname}
              className="w-12 h-12 rounded-full object-cover border-[2.5px] border-[#4A3D73]"
            />
          </div>

          {/* User Info & Badges */}
          <div className="flex flex-col justify-center gap-1">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white/95 text-[16px] tracking-wide">{post.authorNickname}</span>
              {post.isVerifiedMentor && (
                <span className="text-[11px] bg-[#8A5CFF]/15 text-[#B79CFF] px-2.5 py-0.5 rounded-full font-medium">
                  Peer Mentor
                </span>
              )}
            </div>

            <div className="flex items-center gap-2 text-[13px] text-white/50">
              <span>{post.createdAt}</span>
              <span className="text-white/30">•</span>
              
              {post.clubName ? (
                <span>{post.clubName.replace('Club', '').trim()}</span>
              ) : post.topicTag ? (
                <span>{post.topicTag}</span>
              ) : (
                <span>Mindfulness</span>
              )}

              <span className="text-white/30">•</span>
              
              <span className="flex items-center gap-1.5">
                <span className="text-[14px]">😞</span>
                <span>Stressed</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3-Dot Action Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
            aria-label="Post Options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 z-30 w-44 bg-[#1A1A2E] border border-white/10 rounded-2xl shadow-2xl p-2 space-y-1">
              <button
                type="button"
                onClick={() => {
                  onSave(post.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Bookmark className="w-3.5 h-3.5 text-[#B79CFF]" />
                <span>{post.isSaved ? 'Unsave Post' : 'Save Post'}</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Share2 className="w-3.5 h-3.5 text-[#7DD3FC]" />
                <span>Copy Link</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onReport(post.id);
                  setShowMenu(false);
                }}
                className="w-full text-left px-3 py-2 rounded-xl text-xs text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Flag className="w-3.5 h-3.5 text-red-400" />
                <span>Report Content</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Copy Toast */}
      {copiedToast && (
        <div className="mb-2 p-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs flex items-center gap-1.5 animate-fadeIn">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>Link copied to clipboard!</span>
        </div>
      )}

      {/* 2. Content Layout (Text and Optional Image) */}
      <div className="flex flex-col md:flex-row gap-5 mb-5">
        {/* Text Area */}
        <div className="flex-1">
          {/* Pseudo-Title */}
          <h2 className="text-[20px] font-bold text-white/95 mb-3 leading-snug font-sans tracking-tight">
            {title}
          </h2>
          {/* Body */}
          {body && (
            <div className="text-[15px] text-white/70 leading-[1.6] whitespace-pre-wrap font-sans break-words">
              {body}
            </div>
          )}

          {/* AI Summary Block */}
          {post.aiSummary && (
            <div className="mt-4 p-3 rounded-xl bg-purple-500/5 border border-[#8A5CFF]/20 text-[13px] text-white/70 flex items-start gap-2">
              <Sparkles className="w-4 h-4 text-[#B79CFF] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#B79CFF]">AI Summary: </span>
                <span>{post.aiSummary}</span>
              </div>
            </div>
          )}
        </div>

        {/* Optional Image Area */}
        {post.imageUrl && (
          <div className="shrink-0 w-full md:w-[220px] h-[140px]">
            <img
              src={post.imageUrl}
              alt="Post attachment"
              className="w-full h-full object-cover rounded-2xl shadow-sm"
            />
          </div>
        )}
      </div>

      {/* 3. Action Pills Row */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
          
          {/* ❤️ Helpful */}
          <button
            type="button"
            onClick={() => onReact(post.id, 'helpful')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] transition-all cursor-pointer ${
              isHelpful
                ? 'bg-red-500/20 border-transparent text-white'
                : 'bg-[#2D1B2E] border border-red-500/20 hover:border-red-500/40'
            }`}
            title="Mark as Helpful"
          >
            <span className="text-[14px]">❤️</span> 
            <span className="text-red-400 font-medium">Helpful</span> 
            <span className="text-white ml-1 font-semibold">{helpfulCount}</span>
          </button>

          {/* 🤝 I Relate */}
          <button
            type="button"
            onClick={() => onReact(post.id, 'relate')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] transition-all cursor-pointer ${
              isRelate
                ? 'bg-yellow-500/20 border-transparent text-white'
                : 'bg-[#29221C] border border-yellow-500/20 hover:border-yellow-500/40'
            }`}
            title="I Relate"
          >
            <span className="text-[14px]">🤝</span> 
            <span className="text-yellow-400 font-medium">I Relate</span> 
            <span className="text-white ml-1 font-semibold">{relateCount}</span>
          </button>

          {/* ✨ Inspiring */}
          <button
            type="button"
            onClick={() => onReact(post.id, 'encouraged')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] transition-all cursor-pointer ${
              isEncouraged
                ? 'bg-yellow-500/20 border-transparent text-white'
                : 'bg-[#20202F] border border-yellow-500/20 hover:border-yellow-500/40'
            }`}
            title="Inspiring"
          >
            <span className="text-[14px]">✨</span> 
            <span className="text-yellow-400 font-medium">Inspiring</span> 
            <span className="text-white ml-1 font-semibold">{encouragedCount}</span>
          </button>

          {/* 🙏 Thank You */}
          <button
            type="button"
            onClick={() => onReact(post.id, 'thank_you')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[13px] transition-all cursor-pointer hidden sm:flex ${
              isThankYou
                ? 'bg-purple-500/20 border-transparent text-white'
                : 'bg-[#221C3D] border border-purple-500/20 hover:border-purple-500/40'
            }`}
            title="Thank You"
          >
            <span className="text-[14px]">🙏</span> 
            <span className="text-[#B79CFF] font-medium">Thank You</span> 
            <span className="text-white ml-1 font-semibold">{thankYouCount}</span>
          </button>

        <div className="flex-1" />

        {/* Right Bookmark */}
        <button
          type="button"
          onClick={() => onSave(post.id)}
          className={`p-2 rounded-full transition-all cursor-pointer ${
            post.isSaved
              ? 'text-[#FDE68A]'
              : 'text-white/40 hover:text-white'
          }`}
          title="Save for Later"
        >
          <Bookmark className={`w-5 h-5 ${post.isSaved ? 'fill-[#FDE68A]' : ''}`} />
        </button>
      </div>

      {/* 4. Footer */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[13px] font-medium">
        <button
          onClick={() => setShowComments(!showComments)}
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
        >
          <MessageSquare className="w-4 h-4" />
          <span>{post.commentsCount || 0} Comments</span>
        </button>

        <button
          className="flex items-center gap-2 text-white/50 hover:text-white transition-colors cursor-pointer"
          onClick={handleShare}
        >
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>

      {/* Nested Comments Drawer */}
      {showComments && (
        <div className="mt-4 pt-4 border-t border-white/5">
          <CommentSection
            postId={post.id}
            comments={post.comments || []}
            userNickname={userNickname}
            userAvatar={userAvatar}
            onAddComment={onAddComment}
          />
        </div>
      )}

    </div>
  );
};
