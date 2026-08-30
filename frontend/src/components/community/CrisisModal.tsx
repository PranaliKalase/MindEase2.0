import React from 'react';
import { Heart, Phone, Bot, ShieldCheck } from 'lucide-react';

interface CrisisModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnectAI: () => void;
}

export const CrisisModal: React.FC<CrisisModalProps> = ({ isOpen, onClose, onConnectAI }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg animate-fadeIn">
      <div className="bg-gradient-to-b from-[#182235] to-[#0B1026] border border-red-500/30 rounded-3xl max-w-md w-full p-6 shadow-2xl relative text-center">
        
        {/* Top Icon */}
        <div className="w-16 h-16 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto mb-4 text-red-400">
          <Heart className="w-8 h-8 fill-red-500/40" />
        </div>

        <h2 className="text-xl font-bold font-serif-heading text-white mb-2">
          We hear you, and you are not alone.
        </h2>

        <p className="text-xs text-white/70 leading-relaxed mb-6">
          MindEase cares deeply about your well-being. If you are feeling overwhelmed or going through a difficult crisis right now, please reach out to professional support. People are available 24/7 to listen safely and without judgment.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          
          {/* Call 988 Lifeline */}
          <a
            href="tel:988"
            className="w-full py-3 px-4 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-semibold text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 transition-all cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Call or Text 988 Suicide & Crisis Lifeline (24/7 Free)</span>
          </a>

          {/* Connect AI Companion */}
          <button
            type="button"
            onClick={() => {
              onClose();
              onConnectAI();
            }}
            className="w-full py-3 px-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/10 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Bot className="w-4 h-4 text-[#B79CFF]" />
            <span>Talk to MindEase AI Grounding Session</span>
          </button>

          {/* Close */}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs text-white/50 hover:text-white transition-colors cursor-pointer mt-2"
          >
            Return to Sanctuary
          </button>

        </div>

        {/* Footer Shield */}
        <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-center gap-1.5 text-[10px] text-white/40">
          <ShieldCheck className="w-3.5 h-3.5 text-[#6EE7B7]" />
          <span>Encrypted Private Safety Protocol</span>
        </div>

      </div>
    </div>
  );
};
