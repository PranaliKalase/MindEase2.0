import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles } from 'lucide-react';

interface NavbarProps {
  fadeIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ fadeIn }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#hero' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Mood Log', href: '#mood-tracking' },
    { name: 'AI Support', href: '#ai-chat' },
    { name: 'Meditation', href: '#meditation' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-700 ${
        scrolled ? 'glass-nav py-3.5' : 'bg-transparent py-6'
      } ${fadeIn ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full overflow-hidden border border-[#B79CFF]/40 p-0.5 shadow-md shadow-[#8A5CFF]/30 group-hover:scale-105 transition-transform duration-300">
              <img
                src="/assets/images/mindease-logo.jpg"
                alt="MindEase Official Logo"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-heading text-xl font-bold tracking-wide text-white group-hover:text-[#B79CFF] transition-colors">
                MindEase
              </span>
              <span className="text-[10px] tracking-widest uppercase text-[#B79CFF]/80 font-medium">
                Inner Peace Sanctuary
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 glass-pill px-5 py-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-sm font-medium text-white/80 hover:text-white hover:text-glow transition-all duration-300 rounded-full hover:bg-white/5"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* CTA Button & Mobile Toggle */}
          <div className="flex items-center gap-4">
            <a href="#features" className="hidden sm:inline-flex btn-primary text-sm py-2.5 px-6">
              <Sparkles className="w-4 h-4 text-[#F5A5D5]" />
              <span>Get Started</span>
            </a>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-white/90 hover:text-white p-2 rounded-lg glass-pill cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-card mx-4 mt-3 p-6 flex flex-col space-y-4 animate-fadeIn">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium text-white/90 hover:text-[#B79CFF] py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <a
            href="#features"
            onClick={() => setMobileMenuOpen(false)}
            className="btn-primary w-full text-center mt-2"
          >
            Get Started
          </a>
        </div>
      )}
    </header>
  );
};
