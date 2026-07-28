import React from 'react';
import { Shield, ArrowRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-[#070A1A] text-white pt-20 pb-12 border-t border-white/10 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#8A5CFF]/10 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-6">
            <a href="#hero" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#B79CFF]/40 p-0.5 shadow-md shadow-[#8A5CFF]/30">
                <img
                  src="/assets/images/mindease-logo.jpg"
                  alt="MindEase Official Logo"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-serif-heading text-xl font-bold tracking-wide text-white">
                  MindEase
                </span>
                <span className="text-[10px] tracking-widest uppercase text-[#B79CFF]/80 font-medium">
                  Inner Peace Sanctuary
                </span>
              </div>
            </a>

            <p className="text-sm text-white/70 leading-relaxed max-w-sm">
              Combining AI-powered emotional support, guided mindfulness, journaling, mood tracking, and wellness tools into one calming space designed to help you heal, grow, and find balance.
            </p>

            <div className="flex items-center gap-3 text-xs text-[#B79CFF]">
              <Shield className="w-4 h-4 text-[#F5A5D5]" />
              <span>HIPAA Compliant & AES-256 Encrypted</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#B79CFF] font-serif-heading">
              Sanctuary Navigation
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><a href="#hero" className="hover:text-white transition-colors">Home & Intro</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Features Overview</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#mood-tracking" className="hover:text-white transition-colors">Mood Analytics</a></li>
              <li><a href="#ai-chat" className="hover:text-white transition-colors">24/7 AI Companion</a></li>
              <li><a href="#meditation" className="hover:text-white transition-colors">Soundscape Player</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">FAQ & Support</a></li>
            </ul>
          </div>

          {/* Newsletter Signup */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[#B79CFF] font-serif-heading">
              Receive Weekly Calmness
            </h4>
            <p className="text-xs text-white/70 leading-relaxed">
              Subscribe to get gentle mindfulness prompts, new 432Hz soundscapes, and wellness tips directly in your inbox.
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2">
              <input
                type="email"
                placeholder="Enter your email..."
                className="flex-1 bg-white/5 border border-white/15 rounded-full px-4 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-[#8A5CFF]"
              />
              <button type="submit" className="btn-primary text-xs py-2.5 px-4 rounded-full">
                <span>Join</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/50 gap-4">
          <p>© {new Date().getFullYear()} MindEase. All rights reserved. Crafting digital sanctuaries for inner peace.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
