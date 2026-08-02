import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BookOpen,
  Mail,
  Wind,
  Heart,
  Bot,
  Users,
  BarChart2,
  Settings,
  Search,
  Bell,
  Moon,
  Sun,
  ChevronDown,
  Flame,
  Book,
  Sparkles,
  ArrowRight,
  Play,
  X,
  Send,
  Music,
  Camera,
  Utensils,
  Sprout,
  Dumbbell,
  Palette,
  FileText,
  Clock,
  MessageSquare,
  Brain,
  Target
} from 'lucide-react';
import { ParticleCanvas } from '../../components/common/ParticleCanvas';
import { useAuth } from '../../hooks/useAuth';
import { supabase } from '../../lib/supabase';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  
  // Real Supabase User Profile & Metrics State
  const [profileName, setProfileName] = useState<string>(user?.user_metadata?.full_name || 'Sanskruti');
  const [profileAvatar, setProfileAvatar] = useState<string>(user?.user_metadata?.avatar || user?.user_metadata?.avatar_url || '/assets/images/mindease-logo.jpg');
  const [greetingPrefix, setGreetingPrefix] = useState<string>('Good Evening');
  const [dayStreak, setDayStreak] = useState<number>(0);
  const [journalCount, setJournalCount] = useState<number>(0);
  const [gratitudeCount, setGratitudeCount] = useState<number>(0);
  const [selectedMood, setSelectedMood] = useState<string | null>('Calm');
  const [isLoadingData, setIsLoadingData] = useState<boolean>(true);

  // Recent Activity State
  const [recentActivities, setRecentActivities] = useState<Array<{ id: string; title: string; subtitle: string; timeAgo: string; icon: string }>>([
    { id: '1', title: 'Daily Streak Active! 🔥', subtitle: 'Keep up your mindfulness journey', timeAgo: 'Today', icon: '🔥' },
    { id: '2', title: 'AI Companion Note 🌸', subtitle: '"Remember to take 3 deep breaths tonight."', timeAgo: 'Just now', icon: '🌸' },
    { id: '3', title: 'Community Club Update 📖', subtitle: 'Book Lovers posted a new weekly read.', timeAgo: '2h ago', icon: '📖' }
  ]);

  // Navigation State
  const [activeTab, setActiveTab] = useState<'dashboard' | 'journal' | 'letters' | 'relief' | 'gratitude' | 'companion' | 'clubs' | 'analytics' | 'settings'>('dashboard');

  // Active Modals & Overlay Drawers
  const [activeModal, setActiveModal] = useState<'ai_chat' | 'journal' | 'letter' | 'relief' | 'gratitude' | 'club' | 'recommendation' | null>(null);

  // Quick Notification & Theme State
  const [showNotifications, setShowNotifications] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedClub, setSelectedClub] = useState<string | null>(null);
  const [selectedRecommendation, setSelectedRecommendation] = useState<string | null>(null);

  // Chat State inside AI Companion
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'ai' | 'user'; text: string; time: string }>>([
    {
      sender: 'ai',
      text: `Good evening, ${profileName} 👋 I'm your MindEase Wellness Companion. How is your mind feeling right now? I'm here to listen, guide, and help you find peace.`,
      time: 'Just now'
    }
  ]);

  // Daily Journal Input State
  const [journalInput, setJournalInput] = useState('');
  const [journalEntries, setJournalEntries] = useState([
    { title: 'Reflections on Peace', date: 'Today, 4:30 PM', excerpt: 'Felt a calm wave of gratitude during evening tea...' },
    { title: 'Unwinding after work', date: 'Yesterday, 8:15 PM', excerpt: 'Practiced 5 mins of box breathing and listened to rain frequencies...' }
  ]);
  const [journalSavedToast, setJournalSavedToast] = useState(false);

  // Future Letter State
  const [letterSubject, setLetterSubject] = useState('');
  const [letterBody, setLetterBody] = useState('');
  const [letterDate, setLetterDate] = useState('1 Month Later');
  const [letterSentToast, setLetterSentToast] = useState(false);

  // Gratitude Post State
  const [gratitudeMessage, setGratitudeMessage] = useState('');
  const [gratitudeWallPosts, setGratitudeWallPosts] = useState([
    { author: profileName, text: 'Grateful for quiet evening moments and warm tea ☕', likes: 14, time: '2h ago' },
    { author: 'Aarav M.', text: 'Thankful to the MindEase community for keeping me grounded today ✨', likes: 28, time: '5h ago' },
    { author: 'Elena R.', text: 'Appreciating the small wins: a 20 minute walk in fresh air 🌿', likes: 19, time: '1d ago' }
  ]);

  // Dynamic Greeting based on local time
  const getGreetingByTime = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  // Time ago relative date formatter
  const formatTimeAgo = (dateStr?: string): string => {
    if (!dateStr) return 'Recently';
    const now = new Date();
    const past = new Date(dateStr);
    const diffInMs = now.getTime() - past.getTime();
    const diffInMins = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInMins < 1) return 'Just now';
    if (diffInMins < 60) return `${diffInMins}m ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInDays === 1) return 'Yesterday';
    return `${diffInDays}d ago`;
  };

  // Streak Calculation based on journal activity dates
  const calculateJournalStreak = (journalsList: Array<{ created_at: string }>) => {
    if (!journalsList || journalsList.length === 0) return 0;
    const datesSet = new Set(
      journalsList.map((j) => new Date(j.created_at).toISOString().split('T')[0])
    );
    const todayStr = new Date().toISOString().split('T')[0];
    const yesterdayStr = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    if (!datesSet.has(todayStr) && !datesSet.has(yesterdayStr)) {
      return 0;
    }

    let streak = 0;
    let curr = datesSet.has(todayStr) ? new Date(todayStr) : new Date(yesterdayStr);

    while (true) {
      const dStr = curr.toISOString().split('T')[0];
      if (datesSet.has(dStr)) {
        streak++;
        curr.setDate(curr.getDate() - 1);
      } else {
        break;
      }
    }
    return streak;
  };

  // Concurrent Promise.all Supabase Data Fetching
  useEffect(() => {
    setGreetingPrefix(getGreetingByTime());

    if (!user) {
      setIsLoadingData(false);
      return;
    }

    const loadSupabaseDataConcurrently = async () => {
      setIsLoadingData(true);
      try {
        const todayDateStr = new Date().toISOString().split('T')[0];

        const [
          profileRes,
          journalsRes,
          gratitudeRes,
          moodRes,
          latestJournalRes,
          latestGratitudeRes,
          latestMoodRes
        ] = await Promise.all([
          supabase.from('profiles').select('full_name, avatar').eq('id', user.id).maybeSingle(),
          supabase.from('journals').select('created_at', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('gratitude_posts').select('id, created_at', { count: 'exact' }).eq('user_id', user.id),
          supabase.from('moods').select('mood, created_at').eq('user_id', user.id).eq('date', todayDateStr).maybeSingle(),
          supabase.from('journals').select('title, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
          supabase.from('gratitude_posts').select('content, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle(),
          supabase.from('moods').select('mood, created_at').eq('user_id', user.id).order('created_at', { ascending: false }).limit(1).maybeSingle()
        ]);

        // Process Profile
        if (profileRes.data?.full_name) {
          setProfileName(profileRes.data.full_name);
        } else if (user.user_metadata?.full_name) {
          setProfileName(user.user_metadata.full_name);
        }

        if (profileRes.data?.avatar) {
          setProfileAvatar(profileRes.data.avatar);
        }

        // Process Journals & Day Streak
        if (journalsRes.count !== null && journalsRes.count !== undefined) {
          setJournalCount(journalsRes.count);
        }
        if (journalsRes.data) {
          setDayStreak(calculateJournalStreak(journalsRes.data));
        }

        // Process Gratitude Posts Count
        if (gratitudeRes.count !== null && gratitudeRes.count !== undefined) {
          setGratitudeCount(gratitudeRes.count);
        }

        // Process Today's Mood
        if (moodRes.data?.mood) {
          setSelectedMood(moodRes.data.mood);
        }

        // Process Live Recent Activities (Part 4)
        const liveActivities: Array<{ id: string; title: string; subtitle: string; timeAgo: string; icon: string }> = [];

        if (latestJournalRes.data) {
          liveActivities.push({
            id: 'journal-act',
            title: 'Journal Entry Created',
            subtitle: latestJournalRes.data.title || 'Daily reflection',
            timeAgo: formatTimeAgo(latestJournalRes.data.created_at),
            icon: '📖'
          });
        }

        if (latestGratitudeRes.data) {
          liveActivities.push({
            id: 'gratitude-act',
            title: 'Gratitude Post Shared',
            subtitle: latestGratitudeRes.data.content || 'Positive note',
            timeAgo: formatTimeAgo(latestGratitudeRes.data.created_at),
            icon: '💖'
          });
        }

        if (latestMoodRes.data) {
          liveActivities.push({
            id: 'mood-act',
            title: `Mood Updated: ${latestMoodRes.data.mood}`,
            subtitle: 'Daily check-in updated',
            timeAgo: formatTimeAgo(latestMoodRes.data.created_at),
            icon: '😊'
          });
        }

        if (liveActivities.length > 0) {
          setRecentActivities(liveActivities);
        }
      } catch (err) {
        console.error('Error fetching Supabase metrics concurrently:', err);
      } finally {
        setIsLoadingData(false);
      }
    };

    loadSupabaseDataConcurrently();
  }, [user]);

  // Mood Selection Handler (Updates local state & persists in Supabase moods table)
  const handleMoodSelect = async (moodLabel: string) => {
    setSelectedMood(moodLabel);
    if (!user) return;

    try {
      const todayDateStr = new Date().toISOString().split('T')[0];
      await supabase.from('moods').upsert(
        {
          user_id: user.id,
          mood: moodLabel,
          date: todayDateStr,
          created_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,date' }
      );
    } catch (err) {
      console.error('Error persisting mood to Supabase:', err);
    }
  };

  // Handlers
  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setChatLog((prev) => [...prev, { sender: 'user', text: userText, time: now }]);
    setChatMessage('');

    setTimeout(() => {
      let aiReply = `Thank you for sharing that with me, ${profileName}. Take a slow, deep breath in... and let go of any tension. I'm always here with you.`;
      if (userText.toLowerCase().includes('anxious') || userText.toLowerCase().includes('stress')) {
        aiReply = `I hear you. When stress or anxiety arises, try grounding yourself: name 3 things you can see, 2 you can feel, and 1 slow breath you can take. Would you like to try a 3-minute calm breathing exercise?`;
      } else if (userText.toLowerCase().includes('happy') || userText.toLowerCase().includes('grateful')) {
        aiReply = `That is wonderful to hear! Hold onto this positive energy and consider pinning a note on your Gratitude Wall today! ✨`;
      }
      setChatLog((prev) => [...prev, { sender: 'ai', text: aiReply, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    }, 900);
  };

  const handleSaveJournal = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalInput.trim()) return;

    if (user) {
      try {
        await supabase.from('journals').insert([
          {
            user_id: user.id,
            title: letterSubject || 'Daily Reflection',
            content: journalInput.trim(),
            created_at: new Date().toISOString(),
          }
        ]);
        setJournalCount((prev) => prev + 1);
        const { data: userJournals } = await supabase
          .from('journals')
          .select('created_at')
          .eq('user_id', user.id);
        if (userJournals) {
          setDayStreak(calculateJournalStreak(userJournals));
        }
      } catch (err) {
        console.error('Error persisting journal to Supabase:', err);
      }
    }

    setJournalEntries([
      { title: journalInput.slice(0, 30) + '...', date: 'Just now', excerpt: journalInput },
      ...journalEntries
    ]);
    setJournalInput('');
    setJournalSavedToast(true);
    setTimeout(() => {
      setJournalSavedToast(false);
      setActiveModal(null);
    }, 1800);
  };

  const handleSendLetter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!letterBody.trim()) return;
    setLetterSentToast(true);
    setTimeout(() => {
      setLetterSentToast(false);
      setLetterSubject('');
      setLetterBody('');
      setActiveModal(null);
    }, 1800);
  };

  const handlePostGratitude = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gratitudeMessage.trim()) return;

    if (user) {
      try {
        await supabase.from('gratitude_posts').insert([
          {
            user_id: user.id,
            author_name: profileName,
            content: gratitudeMessage.trim(),
            created_at: new Date().toISOString(),
          }
        ]);
        setGratitudeCount((prev) => prev + 1);
      } catch (err) {
        console.error('Error persisting gratitude post to Supabase:', err);
      }
    }

    setGratitudeWallPosts([
      { author: profileName, text: gratitudeMessage, likes: 1, time: 'Just now' },
      ...gratitudeWallPosts
    ]);
    setGratitudeMessage('');
  };

  // Data Definitions matching prompt specifications
  const moodCards = [
    { label: 'Happy', emoji: '😊', iconColor: 'text-amber-300 bg-amber-400/20 border-amber-400/30 shadow-amber-500/20' },
    { label: 'Calm', emoji: '😌', iconColor: 'text-emerald-300 bg-emerald-400/20 border-emerald-400/30 shadow-emerald-500/20' },
    { label: 'Sad', emoji: '😢', iconColor: 'text-sky-300 bg-sky-400/20 border-sky-400/30 shadow-sky-500/20' },
    { label: 'Anxious', emoji: '😟', iconColor: 'text-purple-300 bg-purple-400/20 border-purple-400/30 shadow-purple-500/20' },
    { label: 'Stressed', emoji: '😫', iconColor: 'text-rose-300 bg-rose-400/20 border-rose-400/30 shadow-rose-500/20' },
  ];

  const toolkitCards = [
    {
      id: 'journal',
      title: 'Journal Writing',
      description: 'Capture your thoughts, emotions and daily reflections securely.',
      buttonText: 'Write Now',
      buttonGradient: 'from-[#8A5CFF] to-[#3A2E7A] shadow-[#8A5CFF]/30 hover:from-[#9C72FF] hover:to-[#4C3C9E]',
      imgSrc: '/assets/images/journal-card.png',
      action: () => setActiveModal('journal')
    },
    {
      id: 'letters',
      title: 'Letters to Future Self',
      description: 'Write messages to your future self and receive them once a month.',
      buttonText: 'Send a Letter',
      buttonGradient: 'from-[#D946EF] to-[#8A5CFF] shadow-[#D946EF]/30 hover:from-[#E879F9] hover:to-[#9C72FF]',
      imgSrc: '/assets/images/future-letter-card.png',
      action: () => setActiveModal('letter')
    },
    {
      id: 'relief',
      title: 'Relief Techniques',
      description: 'Explore techniques to relieve stress and bring inner peace.',
      buttonText: 'Relax Now',
      buttonGradient: 'from-[#2563EB] to-[#3B82F6] shadow-[#2563EB]/30 hover:from-[#3B82F6] hover:to-[#60A5FA]',
      imgSrc: '/assets/images/relief-card.png',
      action: () => setActiveModal('relief')
    },
    {
      id: 'gratitude',
      title: 'Gratitude Wall',
      description: 'Share gratitude and spread positivity with people you care about.',
      buttonText: 'Spread Gratitude',
      buttonGradient: 'from-[#EC4899] to-[#8A5CFF] shadow-[#EC4899]/30 hover:from-[#F472B6] hover:to-[#9C72FF]',
      imgSrc: '/assets/images/gratitude-card.png',
      action: () => setActiveModal('gratitude')
    }
  ];

  const personalizedCards = [
    { id: 'calm_breathing', title: 'Calm Breathing', duration: '5 min', icon: Wind, color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20' },
    { id: 'yoga_poses', title: 'Yoga Poses', duration: '10 min', icon: Sparkles, color: 'text-purple-400 bg-purple-500/10 border-purple-500/20' },
    { id: 'chanting_music', title: 'Chanting Music', duration: '15 min', icon: Music, color: 'text-pink-400 bg-pink-500/10 border-pink-500/20' },
    { id: 'gratitude_exercise', title: 'Gratitude Exercise', duration: '5 min', icon: Heart, color: 'text-rose-400 bg-rose-500/10 border-rose-500/20' },
    { id: 'journal_prompt', title: 'Journal Prompt', duration: '10 min', icon: FileText, color: 'text-amber-400 bg-amber-500/10 border-amber-500/20' },
  ];

  const clubCards = [
    { name: 'Book Lovers', icon: BookOpen, color: 'from-purple-900/40 to-indigo-900/40 border-purple-500/30 text-purple-300' },
    { name: 'Music Therapy', icon: Music, color: 'from-blue-900/40 to-cyan-900/40 border-blue-500/30 text-blue-300' },
    { name: 'Fitness Club', icon: Dumbbell, color: 'from-teal-900/40 to-emerald-900/40 border-teal-500/30 text-teal-300' },
    { name: 'Art Therapy', icon: Palette, color: 'from-pink-900/40 to-rose-900/40 border-pink-500/30 text-pink-300' },
    { name: 'Photography', icon: Camera, color: 'from-violet-900/40 to-purple-900/40 border-violet-500/30 text-violet-300' },
    { name: 'Cooking Club', icon: Utensils, color: 'from-amber-900/40 to-orange-900/40 border-amber-500/30 text-amber-300' },
    { name: 'Gardening', icon: Sprout, color: 'from-emerald-900/40 to-green-900/40 border-emerald-500/30 text-emerald-300' },
  ];

  const sidebarMenuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'journal', label: 'Journal Writing', icon: BookOpen },
    { id: 'letters', label: 'Letters to Future Self', icon: Mail },
    { id: 'relief', label: 'Relief Techniques', icon: Wind },
    { id: 'gratitude', label: 'Gratitude Wall', icon: Heart },
    { id: 'companion', label: 'AI Companion', icon: Bot },
    { id: 'clubs', label: 'Community Clubs', icon: Users },
    { id: 'analytics', label: 'Wellness Analytics', icon: BarChart2 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="relative min-h-screen bg-[#0B1026] text-white selection:bg-[#8A5CFF] selection:text-white font-sans overflow-x-hidden">
      <ParticleCanvas />

      {/* Ambient background glows */}
      <div className="fixed top-0 right-1/4 w-[650px] h-[650px] bg-[#8A5CFF]/10 rounded-full blur-[170px] pointer-events-none z-0" />
      <div className="fixed bottom-0 left-1/4 w-[550px] h-[550px] bg-[#F5A5D5]/10 rounded-full blur-[150px] pointer-events-none z-0" />

      {/* ========================================================================= */}
      {/* FIXED LEFT SIDEBAR NAVIGATION */}
      {/* ========================================================================= */}
      <aside className="fixed top-0 left-0 bottom-0 w-[260px] hidden md:flex flex-col justify-between z-40 bg-[#090D22]/85 backdrop-blur-xl border-r border-white/10 p-5 overflow-y-auto custom-scrollbar">
        <div className="space-y-6">
          
          {/* Logo Header */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#8A5CFF] via-[#B79CFF] to-[#F5A5D5] p-0.5 shadow-lg shadow-[#8A5CFF]/30 flex items-center justify-center">
              <div className="w-full h-full bg-[#0B1026] rounded-[14px] flex items-center justify-center">
                <Brain className="w-5 h-5 text-[#B79CFF]" />
              </div>
            </div>
            <div>
              <h1 className="font-serif-heading text-xl font-bold tracking-wide text-white">
                MindEase
              </h1>
              <span className="text-[10px] tracking-widest uppercase text-[#B79CFF]/70 font-semibold block -mt-0.5">
                Mental Wellness
              </span>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="space-y-1.5 pt-2">
            {sidebarMenuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id as any);
                    if (item.id === 'companion') setActiveModal('ai_chat');
                    else if (item.id === 'journal') setActiveModal('journal');
                    else if (item.id === 'letters') setActiveModal('letter');
                    else if (item.id === 'relief') setActiveModal('relief');
                    else if (item.id === 'gratitude') setActiveModal('gratitude');
                  }}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer group ${
                    isActive
                      ? 'bg-gradient-to-r from-[#8A5CFF]/30 to-[#3A2E7A]/40 text-white border-l-4 border-[#8A5CFF] shadow-md shadow-[#8A5CFF]/20 font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-[#B79CFF]' : 'text-white/60'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Brain Mascot Container */}
        <div className="pt-6 border-t border-white/10">
          <div className="glass-card p-4 rounded-2xl bg-gradient-to-b from-[#141B3E]/80 to-[#0C1026]/90 border border-[#8A5CFF]/20 text-center relative overflow-hidden group">
            <div className="w-20 h-20 mx-auto relative mb-2">
              <img
                src="/assets/images/brain-mascot.png"
                alt="MindEase Brain Mascot"
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(138,92,255,0.4)] animate-float"
              />
            </div>
            <p className="text-[11px] text-white/80 font-normal leading-relaxed italic">
              "Take care of your mind like you take care of everything else."
            </p>
          </div>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* MAIN CONTENT AREA */}
      {/* ========================================================================= */}
      <div className="md:pl-[260px] flex flex-col min-h-screen z-10 relative">
        
        {/* TOP HEADER */}
        <header className="sticky top-0 z-30 bg-[#0B1026]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
          
          {/* Greeting Header */}
          <div>
            <h2 className="text-xl sm:text-2xl font-bold font-serif-heading text-white flex items-center gap-2">
              {greetingPrefix}, {profileName} <span className="animate-bounce">👋</span>
            </h2>
            <p className="text-xs text-white/60 font-sans mt-0.5">
              Let's nurture your mind and well-being today.
            </p>
          </div>

          {/* Search, Actions & Profile */}
          <div className="flex items-center gap-3.5 self-end sm:self-auto">
            
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <Search className="w-3.5 h-3.5 text-white/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-48 lg:w-64 glass-input text-xs py-2 pl-9 pr-3 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 focus:w-64 lg:focus:w-72 transition-all"
              />
            </div>

            {/* Notification Icon */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer relative"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#8A5CFF] rounded-full animate-ping" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-[#8A5CFF] rounded-full" />
              </button>

              {/* Notifications / Recent Activity Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-3 w-72 glass-card p-4 rounded-2xl bg-[#0F1535]/95 border border-[#8A5CFF]/30 shadow-2xl z-50 text-xs space-y-3">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2">
                    <span className="font-semibold text-white">Recent Activity</span>
                    <span className="text-[10px] text-[#B79CFF] font-medium bg-[#8A5CFF]/20 px-2 py-0.5 rounded-full">{recentActivities.length} Updates</span>
                  </div>
                  <div className="space-y-2">
                    {recentActivities.map((act) => (
                      <div key={act.id} className="p-2 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors flex items-start justify-between gap-2">
                        <div>
                          <p className="text-white/90 font-medium flex items-center gap-1.5">
                            <span>{act.icon}</span>
                            <span>{act.title}</span>
                          </p>
                          <p className="text-[10px] text-white/50 mt-0.5">{act.subtitle}</p>
                        </div>
                        <span className="text-[9px] text-[#B79CFF] shrink-0 font-medium">{act.timeAgo}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white/80 hover:text-white transition-all cursor-pointer"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? <Moon className="w-4 h-4 text-[#B79CFF]" /> : <Sun className="w-4 h-4 text-amber-300" />}
            </button>

            {/* User Profile Dropdown */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
              <div className="w-8 h-8 rounded-full overflow-hidden border border-[#B79CFF]/40 shadow-sm shadow-[#8A5CFF]/30 bg-gradient-to-tr from-[#8A5CFF] to-[#F5A5D5] p-0.5">
                <img
                  src={profileAvatar || "/assets/images/mindease-logo.jpg"}
                  alt={`${profileName} Profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-xs font-semibold text-white/90 hidden sm:inline">{profileName}</span>
              <button onClick={handleSignOut} title="Sign Out" className="text-white/50 hover:text-white cursor-pointer ml-1">
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </header>

        {/* MAIN BODY CONTENT */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-8 max-w-[1600px] w-full mx-auto">
          
          {/* ========================================================================= */}
          {/* TOP ROW: WELLNESS CHECK-IN & STATISTICS CARD */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT 8 COLUMNS: WELLNESS CHECK-IN */}
            <div className="lg:col-span-8">
              <div className="glass-card p-6 rounded-2xl bg-[#0F1535]/70 border border-white/10 relative overflow-hidden flex flex-col md:flex-row items-stretch justify-between gap-6 min-h-[220px]">
                
                {/* Left Side: How are you feeling today? + Mood Cards */}
                <div className="flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-bold font-serif-heading text-white">
                      How are you feeling today?
                    </h3>
                    <p className="text-xs text-white/60 mt-1">
                      Select your current emotional state for tailored guidance.
                    </p>
                  </div>

                  {/* Mood Cards */}
                  <div className="grid grid-cols-5 gap-2.5 pt-2">
                    {moodCards.map((m) => {
                      const isSelected = selectedMood === m.label;
                      return (
                        <button
                          key={m.label}
                          onClick={() => handleMoodSelect(m.label)}
                          className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-b from-[#8A5CFF]/30 to-[#3A2E7A]/50 border-[#B79CFF] shadow-lg shadow-[#8A5CFF]/30 scale-105'
                              : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                          }`}
                        >
                          <span className="text-2xl mb-1.5">{m.emoji}</span>
                          <span className={`text-xs font-semibold ${isSelected ? 'text-white font-bold' : 'text-white/70'}`}>
                            {m.label}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Right Side: Cozy Dark Window Scenery Image */}
                <div className="w-full md:w-[260px] h-[160px] md:h-auto rounded-xl overflow-hidden border border-white/10 shadow-lg shrink-0 relative">
                  <img
                    src="/assets/images/night-window.png"
                    alt="Peaceful Night Room Window"
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0F1535]/80 via-transparent to-transparent pointer-events-none" />
                </div>

              </div>
            </div>

            {/* RIGHT 4 COLUMNS: SMALL STATISTICS CARD */}
            <div className="lg:col-span-4">
              <div className="glass-card p-6 rounded-2xl bg-[#0F1535]/70 border border-white/10 h-full flex flex-col justify-between space-y-4">
                
                {/* Day Streak */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Flame className="w-5 h-5" />
                    </div>
                    <div>
                      {isLoadingData ? (
                        <div className="h-5 w-10 bg-white/10 rounded animate-pulse my-0.5" />
                      ) : (
                        <div className="text-xl font-extrabold text-white leading-none">{dayStreak}</div>
                      )}
                      <div className="text-xs text-white/60 font-medium mt-1">
                        {dayStreak === 1 ? '1 Day' : `${dayStreak} Days`}
                      </div>
                    </div>
                  </div>
                  <span className="text-[10px] text-amber-300 font-semibold bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/20">
                    {dayStreak > 0 ? 'Active' : 'Start Today'}
                  </span>
                </div>

                {/* Journal Entries */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/30 flex items-center justify-center text-purple-400">
                      <Book className="w-5 h-5" />
                    </div>
                    <div>
                      {isLoadingData ? (
                        <div className="h-5 w-10 bg-white/10 rounded animate-pulse my-0.5" />
                      ) : (
                        <div className="text-xl font-extrabold text-white leading-none">{journalCount}</div>
                      )}
                      <div className="text-xs text-white/60 font-medium mt-1">Journal Entries</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-purple-300 font-semibold bg-purple-500/10 px-2.5 py-1 rounded-full border border-purple-500/20">
                    Saved
                  </span>
                </div>

                {/* Gratitude Posts */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-rose-500/20 border border-rose-500/30 flex items-center justify-center text-rose-400">
                      <Heart className="w-5 h-5" />
                    </div>
                    <div>
                      {isLoadingData ? (
                        <div className="h-5 w-10 bg-white/10 rounded animate-pulse my-0.5" />
                      ) : (
                        <div className="text-xl font-extrabold text-white leading-none">{gratitudeCount}</div>
                      )}
                      <div className="text-xs text-white/60 font-medium mt-1">Gratitude Posts</div>
                    </div>
                  </div>
                  <span className="text-[10px] text-rose-300 font-semibold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                    Shared
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* MIDDLE ROW: YOUR WELLNESS TOOLKIT & AI WELLNESS COMPANION */}
          {/* ========================================================================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* LEFT 8 COLUMNS: YOUR WELLNESS TOOLKIT */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold font-serif-heading text-white">
                  Your Wellness Toolkit
                </h3>
              </div>

              {/* 4 Feature Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {toolkitCards.map((card) => (
                  <div
                    key={card.id}
                    className="glass-card p-5 rounded-2xl bg-[#0F1535]/70 border border-white/10 hover:border-[#8A5CFF]/40 transition-all flex flex-col justify-between group"
                  >
                    {/* Illustration Container */}
                    <div className="w-full h-36 rounded-xl overflow-hidden relative mb-4 border border-white/10 shadow-inner">
                      <img
                        src={card.imgSrc}
                        alt={card.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-1.5 flex-1 mb-4">
                      <h4 className="text-base font-bold text-white font-serif-heading">
                        {card.title}
                      </h4>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {card.description}
                      </p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={card.action}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold text-white bg-gradient-to-r ${card.buttonGradient} shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 group-hover:shadow-lg`}
                    >
                      <span>{card.buttonText}</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT 4 COLUMNS: DEDICATED AI WELLNESS COMPANION PANEL */}
            <div className="lg:col-span-4">
              <div className="glass-card p-6 rounded-2xl bg-gradient-to-b from-[#131A3E]/90 via-[#0E132E]/90 to-[#0A0E24]/90 border border-[#8A5CFF]/30 shadow-2xl h-full flex flex-col justify-between space-y-6 relative overflow-hidden">
                
                {/* Header */}
                <div className="text-center space-y-1">
                  <h3 className="text-lg font-bold font-serif-heading text-white tracking-wide">
                    Meet Your AI Wellness Companion
                  </h3>
                  <p className="text-xs text-white/60">
                    24/7 Empathetic Support & Guidance
                  </p>
                </div>

                {/* Cute Brain Mascot Floating on Clouds */}
                <div className="w-full flex justify-center py-2 relative">
                  <div className="w-40 h-40 relative flex items-center justify-center">
                    <img
                      src="/assets/images/brain-mascot.png"
                      alt="MindEase AI Mascot"
                      className="w-full h-full object-contain animate-float drop-shadow-[0_0_30px_rgba(138,92,255,0.6)]"
                    />
                  </div>
                </div>

                {/* Bullet Points with Clean Icons */}
                <div className="space-y-3 px-2">
                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <div className="p-1.5 rounded-lg bg-[#8A5CFF]/20 text-[#B79CFF] shrink-0 border border-[#8A5CFF]/30">
                      <Brain className="w-4 h-4" />
                    </div>
                    <span>Mood-aware conversations</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <div className="p-1.5 rounded-lg bg-[#8A5CFF]/20 text-[#B79CFF] shrink-0 border border-[#8A5CFF]/30">
                      <Target className="w-4 h-4" />
                    </div>
                    <span>Stress management guidance</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <div className="p-1.5 rounded-lg bg-[#8A5CFF]/20 text-[#B79CFF] shrink-0 border border-[#8A5CFF]/30">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <span>Personalized suggestions</span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-white/80">
                    <div className="p-1.5 rounded-lg bg-[#8A5CFF]/20 text-[#B79CFF] shrink-0 border border-[#8A5CFF]/30">
                      <Heart className="w-4 h-4" />
                    </div>
                    <span>Daily encouragement</span>
                  </div>
                </div>

                {/* Prominent Start Chatting Button */}
                <button
                  onClick={() => setActiveModal('ai_chat')}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-[#8A5CFF] to-[#3A2E7A] hover:from-[#9C72FF] hover:to-[#4C3C9E] text-white font-bold text-xs shadow-lg shadow-[#8A5CFF]/40 border border-[#B79CFF]/30 cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02] transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Start Chatting</span>
                </button>

              </div>
            </div>

          </div>

          {/* ========================================================================= */}
          {/* BOTTOM ROW 1: PERSONALIZED FOR YOU */}
          {/* ========================================================================= */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-serif-heading text-white">
              Personalized for You
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
              {personalizedCards.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      setSelectedRecommendation(item.title);
                      setActiveModal('recommendation');
                    }}
                    className="glass-card p-4 rounded-2xl bg-[#0F1535]/70 border border-white/10 hover:border-[#8A5CFF]/40 transition-all cursor-pointer flex flex-col justify-between space-y-4 group hover:-translate-y-1"
                  >
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center ${item.color} group-hover:scale-110 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white group-hover:text-[#B79CFF] transition-colors">
                        {item.title}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-white/50 mt-1">
                        <Clock className="w-3 h-3" />
                        <span>{item.duration}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ========================================================================= */}
          {/* BOTTOM ROW 2: EXPLORE MINDEASE CLUBS */}
          {/* ========================================================================= */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold font-serif-heading text-white">
                Explore MindEase Clubs
              </h3>
              <button
                onClick={() => setActiveModal('club')}
                className="text-xs font-semibold text-[#B79CFF] hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              >
                <span>View All</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
              {clubCards.map((club) => {
                const Icon = club.icon;
                return (
                  <div
                    key={club.name}
                    onClick={() => {
                      setSelectedClub(club.name);
                      setActiveModal('club');
                    }}
                    className={`glass-card p-4 rounded-2xl bg-gradient-to-b ${club.color} border hover:border-white/40 transition-all cursor-pointer text-center flex flex-col items-center justify-center space-y-2.5 group hover:-translate-y-1`}
                  >
                    <div className="p-3 rounded-2xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-semibold text-white/90 group-hover:text-white">
                      {club.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </main>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE MODALS & DRAWERS FOR PRODUCTION UX */}
      {/* ========================================================================= */}
      
      {/* 1. AI Companion Chat Modal */}
      {activeModal === 'ai_chat' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-revealFadeIn">
          <div className="glass-card max-w-lg w-full rounded-3xl bg-[#0F1535] border border-[#8A5CFF]/40 shadow-2xl overflow-hidden flex flex-col h-[580px]">
            {/* Modal Header */}
            <div className="p-4 px-6 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#8A5CFF]/20 to-transparent">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#8A5CFF]/20 border border-[#8A5CFF]/40 p-1 flex items-center justify-center">
                  <img src="/assets/images/brain-mascot.png" alt="AI Mascot" className="w-full h-full object-contain" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white font-serif-heading">AI Wellness Companion</h4>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Online & Encrypted
                  </span>
                </div>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-2 rounded-full hover:bg-white/10 text-white/60 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3 custom-scrollbar">
              {chatLog.map((msg, i) => (
                <div key={i} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-[#8A5CFF] to-[#3A2E7A] text-white rounded-br-none'
                      : 'bg-white/10 text-white/90 border border-white/10 rounded-bl-none'
                  }`}>
                    <p>{msg.text}</p>
                    <span className="text-[9px] text-white/40 block text-right mt-1">{msg.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChatMessage} className="p-4 border-t border-white/10 flex items-center gap-2 bg-[#090D22]">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Share what is on your mind..."
                className="flex-1 glass-input py-2.5 px-4 text-xs"
              />
              <button type="submit" className="p-2.5 rounded-xl bg-[#8A5CFF] text-white hover:bg-[#9C72FF] transition-all cursor-pointer">
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 2. Journal Writing Modal */}
      {activeModal === 'journal' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-revealFadeIn">
          <div className="glass-card max-w-xl w-full rounded-3xl bg-[#0F1535] border border-[#8A5CFF]/40 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <BookOpen className="w-5 h-5 text-[#B79CFF]" />
                <h4 className="text-base font-bold text-white font-serif-heading">Journal Writing</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveJournal} className="space-y-4">
              <div>
                <label className="text-xs text-white/70 block mb-1">Today's Reflection</label>
                <textarea
                  rows={6}
                  value={journalInput}
                  onChange={(e) => setJournalInput(e.target.value)}
                  placeholder="Express your thoughts freely. Your journal is private and end-to-end encrypted..."
                  className="w-full glass-input p-3.5 text-xs resize-none"
                />
              </div>

              {journalSavedToast ? (
                <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs text-center font-semibold">
                  ✓ Reflection saved to your private journal!
                </div>
              ) : (
                <div className="flex items-center justify-end gap-3">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 text-xs text-white/60 hover:text-white">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8A5CFF] to-[#3A2E7A] text-white text-xs font-semibold shadow-md cursor-pointer">
                    Save Journal Entry
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 3. Future Self Letter Modal */}
      {activeModal === 'letter' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-revealFadeIn">
          <div className="glass-card max-w-xl w-full rounded-3xl bg-[#0F1535] border border-[#D946EF]/40 shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#E879F9]" />
                <h4 className="text-base font-bold text-white font-serif-heading">Letter to Future Self</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSendLetter} className="space-y-4">
              <div>
                <label className="text-xs text-white/70 block mb-1">Letter Title</label>
                <input
                  type="text"
                  value={letterSubject}
                  onChange={(e) => setLetterSubject(e.target.value)}
                  placeholder="e.g. A message for my future self"
                  className="w-full glass-input p-2.5 text-xs"
                />
              </div>

              <div>
                <label className="text-xs text-white/70 block mb-1">Deliver When?</label>
                <select
                  value={letterDate}
                  onChange={(e) => setLetterDate(e.target.value)}
                  className="w-full glass-input p-2.5 text-xs bg-[#090D22]"
                >
                  <option value="1 Month Later">1 Month Later</option>
                  <option value="6 Months Later">6 Months Later</option>
                  <option value="1 Year Later">1 Year Later</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-white/70 block mb-1">Message for Future You</label>
                <textarea
                  rows={5}
                  value={letterBody}
                  onChange={(e) => setLetterBody(e.target.value)}
                  placeholder="Dear future Sanskruti..."
                  className="w-full glass-input p-3 text-xs resize-none"
                />
              </div>

              {letterSentToast ? (
                <div className="p-3 rounded-xl bg-pink-500/20 border border-pink-500/40 text-pink-300 text-xs text-center font-semibold">
                  ✉️ Letter sealed! It will arrive in {letterDate}.
                </div>
              ) : (
                <div className="flex justify-end gap-3">
                  <button type="button" onClick={() => setActiveModal(null)} className="px-4 py-2 text-xs text-white/60">
                    Cancel
                  </button>
                  <button type="submit" className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#D946EF] to-[#8A5CFF] text-white text-xs font-semibold shadow-md cursor-pointer">
                    Seal & Send
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 4. Relief Techniques Modal */}
      {activeModal === 'relief' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-revealFadeIn">
          <div className="glass-card max-w-lg w-full rounded-3xl bg-[#0F1535] border border-blue-500/40 shadow-2xl p-6 text-center space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 text-blue-400">
                <Wind className="w-5 h-5 animate-spin-slow" />
                <span className="font-bold text-sm font-serif-heading text-white">4-7-8 Breathing Relief</span>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-white/10 text-white/60">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Interactive Breathing Sphere */}
            <div className="py-6 flex flex-col items-center justify-center">
              <div className="w-36 h-36 rounded-full bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-cyan-400/40 border border-cyan-400/50 flex items-center justify-center animate-breathing shadow-[0_0_50px_rgba(59,130,246,0.5)]">
                <span className="text-sm font-bold text-cyan-200">Inhale... 4s</span>
              </div>
              <p className="text-xs text-white/60 mt-6">Follow the gentle glow to release muscle tension.</p>
            </div>

            <button onClick={() => setActiveModal(null)} className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs cursor-pointer">
              Complete Session
            </button>
          </div>
        </div>
      )}

      {/* 5. Gratitude Wall Modal */}
      {activeModal === 'gratitude' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-revealFadeIn">
          <div className="glass-card max-w-xl w-full rounded-3xl bg-[#0F1535] border border-rose-500/40 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-rose-400" />
                <h4 className="text-base font-bold text-white font-serif-heading">Gratitude Wall</h4>
              </div>
              <button onClick={() => setActiveModal(null)} className="p-1.5 rounded-full hover:bg-white/10 text-white/60 hover:text-white cursor-pointer">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handlePostGratitude} className="flex gap-2">
              <input
                type="text"
                value={gratitudeMessage}
                onChange={(e) => setGratitudeMessage(e.target.value)}
                placeholder="What are you grateful for right now?"
                className="flex-1 glass-input py-2 px-3.5 text-xs"
              />
              <button type="submit" className="px-4 py-2 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-xs font-semibold cursor-pointer shrink-0">
                Post Note
              </button>
            </form>

            <div className="space-y-3 max-h-60 overflow-y-auto pr-1 custom-scrollbar">
              {gratitudeWallPosts.map((post, index) => (
                <div key={index} className="p-3.5 rounded-2xl bg-white/5 border border-white/5 flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-semibold text-rose-300">{post.author}</span>
                    <p className="text-xs text-white/90 mt-0.5">{post.text}</p>
                  </div>
                  <span className="text-[10px] text-white/40 shrink-0">{post.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 6. MindEase Clubs Modal */}
      {activeModal === 'club' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-revealFadeIn">
          <div className="glass-card max-w-md w-full rounded-3xl bg-[#0F1535] border border-white/20 shadow-2xl p-6 space-y-4 text-center">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h4 className="text-base font-bold text-white font-serif-heading">{selectedClub || 'MindEase Community Club'}</h4>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-white/10 text-white/60">
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-white/70 leading-relaxed">
              Connect with fellow members in <strong>{selectedClub || 'this club'}</strong> for group discussions, shared exercises, and supportive weekly meetups.
            </p>

            <button
              onClick={() => {
                alert(`You have joined ${selectedClub || 'the club'}!`);
                setActiveModal(null);
              }}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#8A5CFF] to-[#3A2E7A] text-white text-xs font-semibold cursor-pointer"
            >
              Join Club
            </button>
          </div>
        </div>
      )}

      {/* 7. Personalized Recommendation Player Modal */}
      {activeModal === 'recommendation' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-revealFadeIn">
          <div className="glass-card max-w-md w-full rounded-3xl bg-[#0F1535] border border-[#8A5CFF]/40 shadow-2xl p-6 text-center space-y-5">
            <div className="flex justify-between items-center">
              <span className="text-xs text-[#B79CFF] font-semibold">Recommended Session</span>
              <button onClick={() => setActiveModal(null)} className="p-1 rounded-full hover:bg-white/10 text-white/60">
                <X className="w-4 h-4" />
              </button>
            </div>

            <h4 className="text-lg font-bold text-white font-serif-heading">{selectedRecommendation}</h4>

            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#8A5CFF]/20 border border-[#8A5CFF]/40 flex items-center justify-center text-[#B79CFF]">
                <Play className="w-6 h-6 ml-0.5" />
              </div>
              <span className="text-xs text-white/60">Tap to start audio guidance</span>
            </div>

            <button onClick={() => setActiveModal(null)} className="w-full py-2.5 rounded-xl bg-[#8A5CFF] text-white text-xs font-semibold cursor-pointer">
              Begin Session
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
