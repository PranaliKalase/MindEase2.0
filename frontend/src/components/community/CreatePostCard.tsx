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
  Users,
} from 'lucide-react';
import type { PostItem } from '../../types/community';
import { supabase } from '../../lib/supabase';

interface CreatePostCardProps {
  userNickname: string;
  userAvatar: string;
  onPostCreated: () => void;
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
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
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
      setImageFile(file);
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
    if (content.length > 2000) return;

    setIsScanning(true);
    setScanMessage('Publishing post...');
    setErrorMsg(null);

    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser();
      if (authError || !user) {
        throw new Error('You must be logged in to create a post.');
      }

      let finalImageUrl: string | null = null;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;
        
        const { error: uploadError } = await supabase.storage
          .from('community-images')
          .upload(filePath, imageFile);
          
        if (uploadError) throw new Error('Unable to upload image. Please try again.');
        
        const { data: publicUrlData } = supabase.storage
          .from('community-images')
          .getPublicUrl(filePath);
          
        finalImageUrl = publicUrlData.publicUrl;
      }

      const { error: insertError } = await supabase
        .from('community_posts')
        .insert({
          user_id: user.id,
          content: content.trim(),
          topic_tag: selectedTopic,
          mood_tag: selectedMood,
          club_id: selectedClub !== 'none' ? selectedClub : null,
          is_anonymous: isAnonymous,
          image_url: finalImageUrl,
          ai_status: 'published'
        });

      if (insertError) throw insertError;

      setContent('');
      setImagePreview(null);
      setImageFile(null);
      setIsExpanded(false);
      onPostCreated();
      
    } catch (err: any) {
      console.error("Post creation error:", err);
      setErrorMsg(err.message || 'Unable to create your post. Please try again.');
    } finally {
      setIsScanning(false);
      setScanMessage(null);
    }
  };

  return (
    <div className="bg-[#131627]/60 border border-white/5 rounded-2xl p-5 transition-all duration-300 mb-6 group relative">
      
      {/* Header Profile Row & Input */}
      <div className="flex items-start gap-4">
        <img
          src={userAvatar}
          alt={userNickname}
          className="w-10 h-10 rounded-full object-cover shrink-0 mt-0.5"
        />
        
        <div className="flex-1 min-w-0">
          <textarea
            id="create-post-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setIsExpanded(true)}
            placeholder="Share a thought, ask a question, or post an encouraging moment..."
            rows={2}
            className="w-full bg-transparent border border-white/10 hover:border-white/20 rounded-xl p-3 text-[14px] text-white placeholder-white/30 focus:outline-none focus:border-purple-500/50 transition-all resize-none font-sans"
            maxLength={2000}
          />
          
          {/* Error Message */}
          {errorMsg && (
            <div className="mt-2 text-red-400 text-xs bg-red-500/10 p-2 rounded-xl border border-red-500/20">
              {errorMsg}
            </div>
          )}

          {/* Image Preview Box */}
          {imagePreview && (
            <div className="relative mt-3 max-w-sm rounded-xl overflow-hidden border border-white/10 group">
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
        </div>
      </div>

      {/* Buttons Row */}
      <div className="flex items-center justify-between mt-4 pl-[56px]">
        <div className="flex flex-wrap items-center gap-2">
          
          {/* Image Selector */}
          <label className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-transparent hover:bg-white/5 text-[12px] font-medium text-white/60 hover:text-white transition-colors cursor-pointer">
            <ImageIcon className="w-3.5 h-3.5 text-[#B79CFF]" />
            <span>Photo</span>
            <input type="file" accept="image/*" onChange={handleImageSelect} className="hidden" />
          </label>

          {/* Mood Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowMoodDropdown(!showMoodDropdown);
                setShowClubDropdown(false);
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-transparent hover:bg-white/5 text-[12px] font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <Smile className="w-3.5 h-3.5 text-[#F472B6]" />
              <span>Mood</span>
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

          {/* Club Selector */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowClubDropdown(!showClubDropdown);
                setShowMoodDropdown(false);
              }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 bg-transparent hover:bg-white/5 text-[12px] font-medium text-white/60 hover:text-white transition-colors cursor-pointer"
            >
              <Users className="w-3.5 h-3.5 text-[#8A5CFF]" />
              <span>Club</span>
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

          {/* Anonymous Toggle */}
          <button
            type="button"
            onClick={() => setIsAnonymous(!isAnonymous)}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/5 transition-colors cursor-pointer text-[12px] font-medium ${
              isAnonymous ? 'bg-[#8A5CFF]/20 text-[#B79CFF] border-[#8A5CFF]/30' : 'bg-transparent text-white/60 hover:text-white hover:bg-white/5'
            }`}
          >
            <ShieldCheck className={`w-3.5 h-3.5 ${isAnonymous ? 'text-[#B79CFF]' : 'text-white/40'}`} />
            <span>Anonymous</span>
          </button>

        </div>

        {/* Post Button */}
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!content.trim() || isScanning}
          className="bg-[#8A5CFF] hover:bg-[#784BE8] disabled:opacity-50 text-white px-5 py-2 rounded-full text-[13px] font-medium flex items-center gap-2 cursor-pointer transition-colors shadow-[0_0_15px_rgba(138,92,255,0.3)] hover:shadow-[0_0_20px_rgba(138,92,255,0.5)]"
        >
          {isScanning ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Posting...</span>
            </>
          ) : (
            <>
              <Send className="w-3.5 h-3.5" />
              <span>Post</span>
            </>
          )}
        </button>
      </div>
      
    </div>
  );
};
