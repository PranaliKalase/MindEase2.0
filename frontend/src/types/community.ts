export type ReactionType = 'helpful' | 'relate' | 'encouraged' | 'thank_you';

export interface CommentItem {
  id: string;
  postId: string;
  authorNickname: string;
  authorAvatar: string;
  isAuthor?: boolean;
  content: string;
  createdAt: string;
  parentId?: string | null;
  reactions: Record<ReactionType, number>;
  userReactions?: ReactionType[];
  replies?: CommentItem[];
}

export interface PostItem {
  id: string;
  authorNickname: string;
  authorAvatar: string;
  isVerifiedMentor?: boolean;
  createdAt: string;
  topicTag: string;
  moodTag?: string;
  clubId?: string | null;
  clubName?: string | null;
  clubIcon?: string | null;
  content: string;
  imageUrl?: string;
  aiSummary?: string;
  reactions: Record<ReactionType, number>;
  userReactions: ReactionType[];
  commentsCount: number;
  comments?: CommentItem[];
  isSaved?: boolean;
}

export interface ClubItem {
  id: string;
  name: string;
  icon: string;
  description: string;
  weeklyPrompt: string;
  activityBadge?: string;
  membersCount: number;
  category: string;
  isJoined?: boolean;
}
