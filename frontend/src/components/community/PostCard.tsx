import React, { useState } from 'react';
import {
  Heart,
  Users,
  Sparkles,
  MessageSquare,
  Bookmark,
  Flag,
  MoreHorizontal,
  ShieldCheck,
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

  return (
    <div className="bg-[#182235] border border-white/10 rounded-3xl p-5 md:p-6 shadow-xl shadow-[#8A5CFF]/5 hover:border-white/20 transition-all duration-300 mb-6 group">
      
      {/* Top Header Section */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="relative">
            <img
              src={post.authorAvatar}
              alt={post.authorNickname}
              className="w-11 h-11 rounded-full object-cover border-2 border-[#B79CFF]/40 shadow-sm"
            />
            {post.isVerifiedMentor && (
              <div className="absolute -bottom-1 -right-1 bg-[#6EE7B7] text-[#0B1026] p-0.5 rounded-full" title="Verified Mental Health Peer/Mentor">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
            )}
          </div>

          {/* User Info & Badges */}
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white text-sm tracking-wide">{post.authorNickname}</span>
              {post.isVerifiedMentor && (
                <span className="text-[10px] bg-[#6EE7B7]/20 text-[#6EE7B7] px-2 py-0.5 rounded-full border border-[#6EE7B7]/30 font-medium">
                  Peer Mentor
                </span>
              )}
            </div>

            {/* Topic & Club Metadata Tags */}
            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs">
              <span className="text-white/40">{post.createdAt}</span>
              
              <span className="bg-[#7DD3FC]/15 text-[#7DD3FC] px-2.5 py-0.5 rounded-full border border-[#7DD3FC]/30 text-[11px] font-medium">
                #{post.topicTag}
              </span>

              {post.moodTag && (
                <span className="bg-purple-500/15 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30 text-[11px]">
                  Mood: {post.moodTag}
                </span>
              )}

              {post.clubName && (
                <span className="bg-[#B79CFF]/15 text-[#B79CFF] px-2.5 py-0.5 rounded-full border border-[#B79CFF]/30 text-[11px] font-medium flex items-center gap-1">
                  <span>{post.clubIcon || '🌿'}</span>
                  <span>{post.clubName}</span>
                </span>
              )}
            </div>
          </div>
        </div>

        {/* 3-Dot Action Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowMenu(!showMenu)}
            className="p-1.5 rounded-xl text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Post Options"
          >
            <MoreHorizontal className="w-5 h-5" />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 z-30 w-44 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-2 space-y-1">
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

      {/* Post Text Body */}
      <div className="text-white/90 text-sm md:text-base leading-relaxed my-3 whitespace-pre-line font-sans">
        {post.content}
      </div>

      {/* Optional Attachment Image */}
      {post.imageUrl && (
        <div className="my-3 rounded-2xl overflow-hidden border border-white/10 max-h-96">
          <img src={post.imageUrl} alt="Post Attachment" className="w-full h-full object-cover hover:scale-[1.01] transition-transform duration-300" />
        </div>
      )}

      {/* AI Summary Block (for long posts) */}
      {post.aiSummary && (
        <div className="my-3 p-3 rounded-2xl bg-[#0B1026]/70 border border-[#B79CFF]/20 text-xs text-white/80 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-[#B79CFF] shrink-0 mt-0.5" />
          <div>
            <span className="font-semibold text-[#B79CFF]">AI Summary: </span>
            <span>{post.aiSummary}</span>
          </div>
        </div>
      )}

      {/* Footer Reaction Controls (Zero Likes System) */}
      <div className="pt-3 mt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Supportive Actions Group */}
        <div className="flex flex-wrap items-center gap-1.5 sm:gap-3">
          
          {/* Answers / Comments */}
          <button
            type="button"
            onClick={() => setShowComments(!showComments)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 transition-colors cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-[#7DD3FC]" />
            <span className="font-medium">{post.commentsCount} Answers</span>
          </button>

          {/* ❤️ Helpful */}
          <button
            type="button"
            onClick={() => onReact(post.id, 'helpful')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              isHelpful
                ? 'bg-red-500/20 text-red-300 border-red-500/40'
                : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            title="Mark as Helpful"
          >
            <Heart className={`w-4 h-4 ${isHelpful ? 'fill-red-400 text-red-400' : 'text-red-400'}`} />
            <span>{post.reactions.helpful || 0} Helped</span>
          </button>

          {/* 🤝 I Relate */}
          <button
            type="button"
            onClick={() => onReact(post.id, 'relate')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
              isRelate
                ? 'bg-sky-500/20 text-sky-300 border-sky-500/40'
                : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            title="I Relate"
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>{post.reactions.relate || 0} Relate</span>
          </button>

          {/* 🌸 Encouraged Me */}
          <button
            type="button"
            onClick={() => onReact(post.id, 'encouraged')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer hidden sm:flex ${
              isEncouraged
                ? 'bg-pink-500/20 text-pink-300 border-pink-500/40'
                : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            title="Encouraged Me"
          >
            <span className="text-sm">🌸</span>
            <span>{post.reactions.encouraged || 0}</span>
          </button>

          {/* 🙏 Thank You */}
          <button
            type="button"
            onClick={() => onReact(post.id, 'thank_you')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border transition-all cursor-pointer hidden sm:flex ${
              isThankYou
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                : 'bg-white/5 border-transparent text-white/70 hover:bg-white/10 hover:text-white'
            }`}
            title="Thank You"
          >
            <span className="text-sm">🙏</span>
            <span>{post.reactions.thank_you || 0}</span>
          </button>

        </div>

        {/* Right Bookmark & Share */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSave(post.id)}
            className={`p-2 rounded-xl transition-colors cursor-pointer ${
              post.isSaved ? 'text-[#B79CFF] bg-[#B79CFF]/15' : 'text-white/50 hover:text-white hover:bg-white/5'
            }`}
            title="Save for Later"
          >
            <Bookmark className={`w-4 h-4 ${post.isSaved ? 'fill-[#B79CFF]' : ''}`} />
          </button>
        </div>

      </div>

      {/* Nested Comments Drawer */}
      {showComments && (
        <CommentSection
          postId={post.id}
          comments={post.comments || []}
          userNickname={userNickname}
          userAvatar={userAvatar}
          onAddComment={onAddComment}
        />
      )}

    </div>
  );
};
