import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Brain,
  Sparkles,
  Moon,
  BookOpen,
  LogOut,
  Send,
  Play,
  Pause,
  Smile,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { ParticleCanvas } from '../../components/common/ParticleCanvas';
import { useAuth } from '../../hooks/useAuth';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const displayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Alex Morgan';

  // Interactive state
  const [selectedMood, setSelectedMood] = useState<string | null>('Calm & Peaceful');
  const [journalText, setJournalText] = useState('');
  const [journalSaved, setJournalSaved] = useState(false);
  const [chatMessage, setChatMessage] = useState('');
  const [chatLog, setChatLog] = useState<Array<{ sender: 'ai' | 'user'; text: string }>>([
    {
      sender: 'ai',
      text: `Hello ${displayName} 🌸 Welcome to your MindEase Sanctuary. How are you feeling right now? I'm here to listen, support, and guide you.`,
    },
  ]);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const moods = [
    { label: 'Serene', icon: '🌸', color: 'from-[#8A5CFF]/30 to-[#3A2E7A]/40' },
    { label: 'Calm & Peaceful', icon: '✨', color: 'from-[#B79CFF]/30 to-[#8A5CFF]/40' },
    { label: 'Thoughtful', icon: '🌿', color: 'from-[#F5A5D5]/30 to-[#8A5CFF]/30' },
    { label: 'Anxious', icon: '🌊', color: 'from-[#3A2E7A]/50 to-[#0B1026]/70' },
    { label: 'Exhausted', icon: '🌙', color: 'from-[#8A5CFF]/20 to-[#3A2E7A]/60' },
  ];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;

    const userText = chatMessage;
    setChatLog((prev) => [...prev, { sender: 'user', text: userText }]);
    setChatMessage('');

    // AI response simulation
    setTimeout(() => {
      setChatLog((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: `Thank you for sharing that with me. Remember to take a slow, deep breath in... and release. You are safe here, and every step forward counts.`,
        },
      ]);
    }, 1000);
  };

  const handleSaveJournal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!journalText.trim()) return;
    setJournalSaved(true);
    setTimeout(() => setJournalSaved(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#0B1026] text-white flex flex-col justify-between selection:bg-[#8A5CFF] selection:text-white page-reveal">
      <ParticleCanvas />

      {/* Ambient background glows */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#8A5CFF]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-[#F5A5D5]/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Dashboard Top Navbar */}
      <header className="relative z-30 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-5 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-[#B79CFF]/50 p-0.5 shadow-md shadow-[#8A5CFF]/30">
            <img
              src="/assets/images/mindease-logo.jpg"
              alt="MindEase Official Logo"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <h1 className="font-serif-heading text-lg font-bold tracking-wide text-white">
              MindEase Sanctuary
            </h1>
            <span className="text-[10px] tracking-widest uppercase text-[#B79CFF]/80 font-medium">
              Encrypted Personal Dashboard
            </span>
          </div>
        </div>

        {/* User profile & Sign out */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 glass-pill px-4 py-1.5 border border-[#B79CFF]/30">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-white/90 font-medium">{displayName}</span>
          </div>

          <button
            onClick={handleSignOut}
            className="inline-flex items-center gap-2 glass-pill px-4 py-2 text-xs font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Dashboard Body */}
      <main className="relative z-20 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 space-y-8">
        
        {/* Welcome Header Banner */}
        <div className="glass-card p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 glass-pill px-3 py-1 text-xs text-[#B79CFF] font-semibold border border-[#B79CFF]/30">
              <Sparkles className="w-3.5 h-3.5 text-[#F5A5D5]" />
              <span>Daily Sanctuary Reflection</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold font-serif-heading text-white">
              Welcome back to your safe space, {displayName} ✨
            </h2>
            <p className="text-sm text-white/70 max-w-xl">
              Today is a clean slate. Take a moment to check in with your mind and nurture your inner peace.
            </p>
          </div>

          {/* Quick Stat Pill */}
          <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/10 shrink-0">
            <div className="p-3 rounded-xl bg-[#8A5CFF]/20 text-[#B79CFF]">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="text-xl font-bold text-white">7 Days Streak</div>
              <div className="text-xs text-white/60">Mindfulness & Care</div>
            </div>
          </div>
        </div>

        {/* Dashboard Grid Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT 7 COLUMNS: AI Chat Support & Daily Journal */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* 1. 24/7 AI Companion Chat */}
            <div className="glass-card p-6 flex flex-col h-[420px] justify-between">
              <div className="flex items-center justify-between pb-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-[#8A5CFF]/20 text-[#B79CFF] border border-[#8A5CFF]/30">
                    <Brain className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white font-serif-heading">
                      AI Companion Sanctuary
                    </h3>
                    <p className="text-xs text-white/60">Encrypted & Empathetic listener</p>
                  </div>
                </div>
                <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  Online
                </span>
              </div>

              {/* Chat Message Box */}
              <div className="flex-1 overflow-y-auto py-4 space-y-3.5 pr-2">
                {chatLog.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                        msg.sender === 'user'
                          ? 'bg-gradient-to-r from-[#8A5CFF] to-[#3A2E7A] text-white rounded-br-none'
                          : 'bg-white/10 text-white/90 border border-white/10 rounded-bl-none'
                      }`}
                    >
                      {msg.text}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Bar */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2 pt-3 border-t border-white/10">
                <input
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type your thoughts or feelings..."
                  className="flex-1 glass-input py-2.5 px-4 text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  className="btn-primary p-2.5 rounded-xl shrink-0 cursor-pointer"
                  aria-label="Send message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>

            {/* 2. Daily Journaling */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#F5A5D5]/20 text-[#F5A5D5] border border-[#F5A5D5]/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif-heading">
                    Daily Guided Journal
                  </h3>
                  <p className="text-xs text-white/60">"What is one thing you are grateful for today?"</p>
                </div>
              </div>

              <form onSubmit={handleSaveJournal} className="space-y-3">
                <textarea
                  rows={3}
                  value={journalText}
                  onChange={(e) => setJournalText(e.target.value)}
                  placeholder="Write freely in your encrypted journal..."
                  className="w-full glass-input p-3 text-xs sm:text-sm resize-none"
                />
                <div className="flex items-center justify-between">
                  {journalSaved ? (
                    <span className="text-xs text-emerald-400 font-medium">✓ Journal saved to Sanctuary</span>
                  ) : (
                    <span className="text-[11px] text-white/40">Encrypted with AES-256</span>
                  )}
                  <button type="submit" className="btn-primary text-xs py-2 px-5 rounded-xl cursor-pointer">
                    Save Entry
                  </button>
                </div>
              </form>
            </div>

          </div>

          {/* RIGHT 5 COLUMNS: Mood Log & Soundscapes */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* 3. Mood Log Selector */}
            <div className="glass-card p-6 space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#B79CFF]/20 text-[#B79CFF] border border-[#B79CFF]/30">
                  <Smile className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif-heading">
                    How Are You Feeling Today?
                  </h3>
                  <p className="text-xs text-white/60">Log your emotional state</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-2.5 pt-2">
                {moods.map((m) => (
                  <button
                    key={m.label}
                    onClick={() => setSelectedMood(m.label)}
                    className={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
                      selectedMood === m.label
                        ? 'bg-gradient-to-r ' + m.color + ' border-[#B79CFF] shadow-lg shadow-[#8A5CFF]/20 text-white'
                        : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-lg">{m.icon}</span>
                      <span className="text-xs font-semibold">{m.label}</span>
                    </div>
                    {selectedMood === m.label && (
                      <span className="text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-bold">Selected</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. 432Hz Soundscape Player */}
            <div className="glass-card p-6 space-y-4 relative overflow-hidden">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-xl bg-[#3A2E7A]/40 text-[#E2D9FF] border border-[#B79CFF]/30">
                  <Moon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white font-serif-heading">
                    432Hz Ambient Soundscape
                  </h3>
                  <p className="text-xs text-white/60">Deep Forest Rain & Healing Frequency</p>
                </div>
              </div>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsPlayingAudio(!isPlayingAudio)}
                    className="p-3 rounded-full bg-gradient-to-r from-[#8A5CFF] to-[#3A2E7A] text-white hover:scale-105 transition-transform cursor-pointer shadow-md shadow-[#8A5CFF]/40"
                  >
                    {isPlayingAudio ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                  </button>
                  <div>
                    <div className="text-xs font-semibold text-white">Forest Moonlight Harmony</div>
                    <div className="text-[11px] text-[#B79CFF]">
                      {isPlayingAudio ? 'Playing soothing soundscape...' : 'Click to begin listening'}
                    </div>
                  </div>
                </div>

                {isPlayingAudio && (
                  <div className="flex items-center gap-1">
                    <div className="w-1 h-4 bg-[#F5A5D5] rounded-full animate-bounce" />
                    <div className="w-1 h-6 bg-[#8A5CFF] rounded-full animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1 h-3 bg-[#B79CFF] rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                )}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-20 py-4 border-t border-white/10 text-center text-xs text-white/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>MindEase Sanctuary • Your Safe Digital Haven</span>
          <div className="flex items-center gap-2 text-[#B79CFF]">
            <ShieldCheck className="w-4 h-4" />
            <span>Encrypted Session Active</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
