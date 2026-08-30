import React, { useState } from 'react';
import { Send, CornerDownRight, Heart, Users } from 'lucide-react';
import type { CommentItem, ReactionType } from '../../types/community';

interface CommentSectionProps {
  postId: string;
  comments: CommentItem[];
  userNickname: string;
  userAvatar: string;
  onAddComment: (postId: string, content: string, parentId?: string | null) => void;
  onReactComment?: (commentId: string, reaction: ReactionType) => void;
}

export const CommentSection: React.FC<CommentSectionProps> = ({
  postId,
  comments,
  userNickname,
  userAvatar,
  onAddComment,
  onReactComment,
}) => {
  const [newComment, setNewComment] = useState('');
  const [replyingToId, setReplyingToId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(postId, newComment.trim(), null);
    setNewComment('');
  };

  const handleCreateReply = (parentId: string) => {
    if (!replyText.trim()) return;
    onAddComment(postId, replyText.trim(), parentId);
    setReplyText('');
    setReplyingToId(null);
  };

  const renderCommentTree = (commentList: CommentItem[], depth = 0) => {
    return commentList.map((c) => (
      <div key={c.id} className={`relative ${depth > 0 ? 'ml-6 pl-4 border-l border-white/10 mt-3' : 'mt-4'}`}>
        
        {/* Comment Header & Body */}
        <div className="bg-[#0B1026]/40 border border-white/10 rounded-2xl p-3 text-xs">
          <div className="flex items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <img src={c.authorAvatar} alt={c.authorNickname} className="w-6 h-6 rounded-full object-cover border border-[#B79CFF]/30" />
              <span className="font-semibold text-white/90">{c.authorNickname}</span>
              {c.isAuthor && (
                <span className="bg-[#B79CFF]/20 text-[#B79CFF] text-[10px] px-1.5 py-0.5 rounded-full font-medium border border-[#B79CFF]/30">
                  Author
                </span>
              )}
            </div>
            <span className="text-[10px] text-white/40">{c.createdAt}</span>
          </div>

          <p className="text-white/80 leading-relaxed mb-2">{c.content}</p>

          {/* Comment Footer Controls */}
          <div className="flex items-center gap-4 text-[11px] text-white/60 pt-1 border-t border-white/5">
            
            {/* Reply Button */}
            {depth < 2 && (
              <button
                type="button"
                onClick={() => setReplyingToId(replyingToId === c.id ? null : c.id)}
                className="hover:text-white flex items-center gap-1 cursor-pointer transition-colors"
              >
                <CornerDownRight className="w-3 h-3 text-[#B79CFF]" />
                <span>Reply</span>
              </button>
            )}

            {/* Reaction Buttons */}
            <button
              type="button"
              onClick={() => onReactComment && onReactComment(c.id, 'helpful')}
              className="hover:text-red-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Heart className="w-3 h-3 text-red-400" />
              <span>{c.reactions.helpful || 0}</span>
            </button>

            <button
              type="button"
              onClick={() => onReactComment && onReactComment(c.id, 'relate')}
              className="hover:text-sky-300 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Users className="w-3 h-3 text-sky-400" />
              <span>{c.reactions.relate || 0}</span>
            </button>
          </div>
        </div>

        {/* Reply Input Box */}
        {replyingToId === c.id && (
          <div className="mt-2 ml-4 flex items-center gap-2">
            <input
              type="text"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder={`Replying to ${c.authorNickname}...`}
              className="flex-1 bg-[#0B1026] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#B79CFF]/60"
            />
            <button
              type="button"
              onClick={() => handleCreateReply(c.id)}
              className="btn-primary p-2 rounded-xl text-xs cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Render Child Replies */}
        {c.replies && c.replies.length > 0 && (
          <div className="space-y-1">
            {renderCommentTree(c.replies, depth + 1)}
          </div>
        )}

      </div>
    ));
  };

  return (
    <div className="mt-4 pt-4 border-t border-white/10">
      
      {/* Top New Comment Box */}
      <form onSubmit={handleCreateComment} className="flex items-center gap-2 mb-4">
        <img src={userAvatar} alt={userNickname} className="w-7 h-7 rounded-full object-cover border border-white/20 shrink-0" />
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Offer a supportive answer or encouraging response..."
          className="flex-1 bg-[#0B1026]/70 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#B79CFF]/60"
        />
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="btn-primary p-2 rounded-xl text-xs cursor-pointer disabled:opacity-40"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>

      {/* Render Comment List */}
      {comments.length === 0 ? (
        <div className="text-center py-4 text-xs text-white/40 italic">
          No replies yet. Be the first to offer encouragement.
        </div>
      ) : (
        <div className="space-y-2">
          {renderCommentTree(comments)}
        </div>
      )}

    </div>
  );
};
