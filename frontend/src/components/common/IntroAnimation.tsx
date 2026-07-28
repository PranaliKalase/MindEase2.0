import React, { useState, useEffect, useRef } from 'react';

interface IntroAnimationProps {
  onComplete: () => void;
}

export const IntroAnimation: React.FC<IntroAnimationProps> = ({ onComplete }) => {
  const [visible, setVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    // Check if intro has already been played in this browser session
    const hasPlayed = sessionStorage.getItem('mindease_intro_played');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasPlayed || prefersReducedMotion) {
      setVisible(false);
      onComplete();
      return;
    }

    // Try playing automatically
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.warn('Autoplay prevented or video issue:', err);
      });
    }
  }, [onComplete]);

  const handleFinish = () => {
    if (isFading) return;
    setIsFading(true);
    sessionStorage.setItem('mindease_intro_played', 'true');
    
    // Notify parent immediately so underlying Hero video starts fading in content concurrently
    onComplete();

    // After fade duration, hide intro container completely
    setTimeout(() => {
      setVisible(false);
    }, 1200);
  };

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0B1026] transition-opacity duration-1200 ease-out pointer-events-auto ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      style={{ willChange: 'opacity' }}
    >
      <video
        ref={videoRef}
        src="/assets/videos/intro-anim.mp4"
        autoPlay
        muted
        playsInline
        onEnded={handleFinish}
        className="w-full h-full object-cover transform-gpu"
        style={{ transform: 'translateZ(0)' }}
      />

      {/* Subtle Enchanted Overlay to avoid any hard visual jumps */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B1026] via-transparent to-transparent opacity-60 pointer-events-none" />

      {/* Elegant Skip Button */}
      <button
        onClick={handleFinish}
        className="absolute bottom-8 right-8 z-50 glass-pill px-6 py-2.5 text-sm font-medium text-white/90 hover:text-white hover:border-[#F5A5D5]/50 transition-all duration-300 shadow-lg hover:shadow-[#8A5CFF]/30 flex items-center gap-2 cursor-pointer group"
      >
        <span>Skip Intro</span>
        <svg
          className="w-4 h-4 transform group-hover:translate-x-0.5 transition-transform"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
