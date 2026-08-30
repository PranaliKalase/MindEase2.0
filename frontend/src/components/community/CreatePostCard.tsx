import React, { useState } from 'react';
import {
  Image as ImageIcon,
  Smile,
  Hash,
  BookOpen,
  Lock,
  ShieldCheck,
  Send,
  X,
} from 'lucide-react';
import type { PostItem } from '../../types/community';

interface CreatePostCardProps {
  userNickname: string;
  userAvatar: string;
  onPostCreated: (newPost: PostItem) => void;
  onTriggerCrisisModal?: () => void;
}

export const CreatePostCard: React.FC<CreatePostCardProps> = ({
  userNickname,
  userAvatar,
  onPostCreated,
  onTriggerCrisisModal,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState<string>('Calm');
  const [selectedTopic, setSelectedTopic] = useState<string>('Mindfulness');
  const [selectedClub, setSelectedClub] = useState<string>('none');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Modals & Safety States
  const [isScanning, setIsScanning] = useState(false);
  const [_scanMessage, setScanMessage] = useState<string | null>(null);
  const [showMoodDropdown, setShowMoodDropdown] = useState(false);
  const [showTopicDropdown, setShowTopicDropdown] = useState(false);
  const [showClubDropdown, setShowClubDropdown] = useState(false);

  const moodOptions = [
    { label: 'Calm', icon: '🧘', color: 'bg-sky-500/20 text-sky-300 border-sky-500/30' },
    { label: 'Anxious', icon: '🌊', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
    { label: 'Hopeful', icon: '🌱', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
    { label: 'Overwhelmed', icon: '☁️', color: 'bg-purple-500/20 text-purple-300 border-purple-500/30' },
    { label: 'Grateful', icon: '🌸', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
    { label: 'Reflective', icon: '📖', color: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30' },
  ];

  const topicOptions = [
    'Mindfulness',
    'AnxietyRelief',
    'SleepTips',
    'WorkLifeBalance',
    'Breathwork',
    'Journaling',
    'BurnoutRecovery',
    'SelfCare',
    'Gratitude',
  ];

  const clubOptions = [
    { id: 'none', name: 'General Sanctuary', icon: '🌿' },
    { id: 'book-club', name: '📚 Book Club', icon: '📚' },
    { id: 'music-club', name: '🎵 Music Club', icon: '🎵' },
    { id: 'photography-club', name: '📸 Photography Club', icon: '📸' },
    { id: 'yoga-club', name: '🧘 Yoga Club', icon: '🧘' },
  ];

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsScanning(true);
    setScanMessage('AI Safety Scan in progress...');

    // Simulate AI Safety Pipeline scan
    setTimeout(() => {
      // Check for crisis trigger words
      const lower = content.toLowerCase();
      if (lower.includes('end my life') || lower.includes('suicide') || lower.includes('want to die')) {
        setIsScanning(false);
        setScanMessage(null);
        if (onTriggerCrisisModal) {
          onTriggerCrisisModal();
        }
        return;
      }

      // Check if long post needs AI Summary
      let aiSummary: string | undefined = undefined;
      if (content.length > 250) {
        aiSummary = `User shares thoughts on ${selectedTopic.toLowerCase()} and seeking community connection.`;
      }

      const clubObj = clubOptions.find((c) => c.id === selectedClub);

      const newPost: PostItem = {
        id: `post-${Date.now()}`,
        authorNickname: isAnonymous ? userNickname : userNickname,
        authorAvatar: userAvatar,
        createdAt: 'Just now',
        topicTag: selectedTopic,
        moodTag: selectedMood,
        clubId: selectedClub !== 'none' ? selectedClub : undefined,
        clubName: selectedClub !== 'none' ? clubObj?.name : undefined,
        clubIcon: selectedClub !== 'none' ? clubObj?.icon : undefined,
        content: content.trim(),
        imageUrl: imagePreview || undefined,
        aiSummary,
        reactions: { helpful: 0, relate: 0, encouraged: 0, thank_you: 0 },
        userReactions: [],
        commentsCount: 0,
        comments: [],
      };

      setIsScanning(false);
      setScanMessage(null);
      setContent('');
      setImagePreview(null);
      setIsExpanded(false);

      onPostCreated(newPost);
    }, 1200);
  };

  return (
    <div className="relative bg-[#182235] border border-white/10 rounded-3xl p-5 shadow-xl shadow-[#8A5CFF]/5 transition-all duration-300 mb-6">
      
      {/* Header Profile Row */}
      <div className="flex items-start gap-3">
        <img
          src={userAvatar}
          alt={userNickname}
          className="w-11 h-11 rounded-full object-cover border border-[#B79CFF]/40 shadow-sm shrink-0"
        />
        
        <div className="flex-1">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Share a thought, ask a question, or post an encouraging moment..."
            rows={isExpanded ? 4 : 2}
            className="w-full bg-[#0B1026]/60 border border-white/10 rounded-2xl p-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#B79CFF]/60 transition-all resize-none"
            maxLength={2000}
          />
          
          {/* Character Count */}
          {isExpanded && (
            <div className="flex justify-end mt-1 text-[11px] text-white/40">
              {content.length} / 2000
            </div>
          )}
        </div>
      </div>

      {/* Image Preview Box */}
      {imagePreview && (
        <div className="relative my-3 ml-14 max-w-sm rounded-2xl overflow-hidden border border-white/10 group">
          <img src={imagePreview} alt="Upload Preview" className="w-full h-48 object-cover" />
          <button
            type="button"
            onClick={() => setImagePreview(null)}
            className="absolute top-2 right-2 bg-black/70 hover:bg-black p-1.5 rounded-full text-white/80 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Expanded Controls & Toolbar */}
      {isExpanded && (
        <div className="mt-4 pt-3 border-t border-white/10 space-y-3">
          {/* Tag Selection Row */}
          <div className="flex flex-wrap items-center gap-2">
            
            {/* Image Selector */}
            <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 cursor-pointer transition-colors">
              <ImageIcon className="w-4 h-4 text-[#7DD3FC]" />
              <span>Add Image</span>
              <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
            </label>

            {/* Mood Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowMoodDropdown(!showMoodDropdown);
                  setShowTopicDropdown(false);
                  setShowClubDropdown(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Smile className="w-4 h-4 text-[#FDE68A]" />
                <span>Mood: {selectedMood}</span>
              </button>

              {showMoodDropdown && (
                <div className="absolute top-full left-0 mt-2 z-30 w-44 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-2 grid grid-cols-1 gap-1">
                  {moodOptions.map((m) => (
                    <button
                      key={m.label}
                      type="button"
                      onClick={() => {
                        setSelectedMood(m.label);
                        setShowMoodDropdown(false);
                      }}
                      className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium text-left transition-colors cursor-pointer ${m.color}`}
                    >
                      <span>{m.icon}</span>
                      <span>{m.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Topic Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowTopicDropdown(!showTopicDropdown);
                  setShowMoodDropdown(false);
                  setShowClubDropdown(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Hash className="w-4 h-4 text-[#6EE7B7]" />
                <span>#{selectedTopic}</span>
              </button>

              {showTopicDropdown && (
                <div className="absolute top-full left-0 mt-2 z-30 w-48 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-2 max-h-48 overflow-y-auto space-y-1">
                  {topicOptions.map((topic) => (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => {
                        setSelectedTopic(topic);
                        setShowTopicDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer"
                    >
                      #{topic}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Club Selector Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowClubDropdown(!showClubDropdown);
                  setShowMoodDropdown(false);
                  setShowTopicDropdown(false);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-medium text-white/80 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#B79CFF]" />
                <span>{clubOptions.find((c) => c.id === selectedClub)?.name}</span>
              </button>

              {showClubDropdown && (
                <div className="absolute top-full left-0 mt-2 z-30 w-52 bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-2 space-y-1">
                  {clubOptions.map((club) => (
                    <button
                      key={club.id}
                      type="button"
                      onClick={() => {
                        setSelectedClub(club.id);
                        setShowClubDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 rounded-xl text-xs text-white/80 hover:bg-white/10 hover:text-white transition-colors cursor-pointer flex items-center gap-2"
                    >
                      <span>{club.icon}</span>
                      <span>{club.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          {/* Anonymous Toggle & AI Pipeline Banner */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
            
            {/* Anonymous Identity Toggle */}
            <label className="flex items-center gap-2 text-xs text-white/80 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={isAnonymous}
                onChange={(e) => setIsAnonymous(e.target.checked)}
                className="w-3.5 h-3.5 rounded border-white/20 bg-white/5 text-[#8A5CFF] accent-[#8A5CFF]"
              />
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-[#B79CFF]" />
                <span>Post Anonymously</span>
              </span>
            </label>

            {/* AI Safety Notice */}
            <div className="flex items-center gap-1.5 text-[11px] text-white/50">
              <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
              <span>AI Safety Scanned</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={() => {
                  setIsExpanded(false);
                  setContent('');
                  setImagePreview(null);
                }}
                className="px-4 py-2 text-xs text-white/60 hover:text-white transition-colors cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!content.trim() || isScanning}
                className="btn-primary px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isScanning ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Scanning...</span>
                  </>
                ) : (
                  <>
                    <span>Publish</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
