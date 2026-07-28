import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, RefreshCw } from 'lucide-react';

export const AIChatSection: React.FC = () => {
  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: "Welcome to your sanctuary. I am your MindEase companion. How is your spirit feeling today?",
      time: 'Just now',
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const samplePrompts = [
    "I'm feeling overwhelmed by work.",
    'Help me ground myself before sleep.',
    'I need a positive perspective right now.',
    'Can we try a quick 1-minute breathing exercise?',
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim()) return;

    const userMsg = { sender: 'user', text: query, time: 'Just now' };
    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let aiResponse = "I hear you deeply. Let's pause together for a quiet moment. Take a slow inhale through your nose... hold... and release. You don't have to carry all of this weight alone.";
      if (query.toLowerCase().includes('sleep')) {
        aiResponse = "Softening your posture now. Let's dim the inner noise. Imagine walking through a quiet twilight forest while gentle rain falls on autumn leaves.";
      } else if (query.toLowerCase().includes('breathing')) {
        aiResponse = "Inhale peace for 4 seconds... 1, 2, 3, 4. Hold gently... 1, 2, 3, 4. Now exhale all tension... 1, 2, 3, 4, 5, 6. Feel your body relaxing into the earth.";
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: aiResponse, time: 'Just now' }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <section id="ai-chat" className="relative py-24 bg-[#0B1026] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="glass-pill px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-[#B79CFF] inline-block mb-4">
            Empathy Engine
          </span>
          <h2 className="text-3xl sm:text-5xl font-bold font-serif-heading text-white tracking-tight mb-6">
            AI-Powered <span className="gradient-text">Emotional Support</span>
          </h2>
          <p className="text-base sm:text-lg text-white/75 leading-relaxed">
            Experience a non-judgmental, compassionate AI listener designed to help you process emotions, reframe stress, and find clarity 24 hours a day.
          </p>
        </div>

        {/* Interactive AI Chat Mockup */}
        <div className="max-w-4xl mx-auto glass-card p-6 sm:p-8 rounded-3xl border border-[#B79CFF]/20 shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#8A5CFF] to-[#F5A5D5] flex items-center justify-center p-0.5">
                  <div className="w-full h-full bg-[#0B1026] rounded-full flex items-center justify-center">
                    <Bot className="w-5 h-5 text-[#F5A5D5]" />
                  </div>
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-[#0B1026] rounded-full" />
              </div>
              <div>
                <h3 className="text-base font-bold font-serif-heading text-white">MindEase Sanctuary AI</h3>
                <p className="text-xs text-white/60">Always listening • End-to-end encrypted</p>
              </div>
            </div>

            <button
              onClick={() =>
                setMessages([
                  {
                    sender: 'ai',
                    text: 'Welcome to your sanctuary. I am your MindEase companion. How is your spirit feeling today?',
                    time: 'Just now',
                  },
                ])
              }
              className="text-xs text-white/60 hover:text-white flex items-center gap-1 glass-pill px-3 py-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset Demo</span>
            </button>
          </div>

          {/* Messages Container */}
          <div className="space-y-4 mb-6 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'ai' && (
                  <div className="w-8 h-8 rounded-full bg-[#3A2E7A] flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot className="w-4 h-4 text-[#B79CFF]" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-4 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    m.sender === 'user'
                      ? 'bg-gradient-to-r from-[#8A5CFF] to-[#3A2E7A] text-white rounded-br-none shadow-md'
                      : 'bg-white/5 border border-white/10 text-white/90 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                {m.sender === 'user' && (
                  <div className="w-8 h-8 rounded-full bg-[#8A5CFF]/30 flex items-center justify-center flex-shrink-0 mt-1">
                    <User className="w-4 h-4 text-[#F5A5D5]" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-xs text-white/50 pl-11">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#B79CFF]" />
                <span>MindEase AI is breathing and formulating a response...</span>
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="mb-4 flex flex-wrap gap-2">
            {samplePrompts.map((prompt, i) => (
              <button
                key={i}
                onClick={() => handleSend(prompt)}
                className="text-xs glass-pill px-3 py-1.5 text-white/80 hover:text-white hover:border-[#8A5CFF]/60 transition-all cursor-pointer"
              >
                + "{prompt}"
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex items-center gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Share what is on your heart..."
              className="flex-1 bg-white/5 border border-white/15 rounded-full px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#8A5CFF] transition-all"
            />
            <button
              onClick={() => handleSend()}
              className="btn-primary p-3 rounded-full w-11 h-11 flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
