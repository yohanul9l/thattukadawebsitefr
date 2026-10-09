import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X } from 'lucide-react';

interface NavbarProps {
  onJoinClick: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
}

export function Navbar({ onJoinClick, isAudioPlaying, onToggleAudio }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');

  const navLinks = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Channels', href: '#channels', id: 'channels' },
    { label: 'Guidelines', href: '#guidelines', id: 'guidelines' },
    { label: 'FAQ', href: '#faq', id: 'faq' },
  ];

  // Observe active section on scroll to maintain visible state during About and other section views
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 120;
      const sections = ['about', 'channels', 'guidelines', 'faq'];

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            return;
          }
        }
      }

      if (window.scrollY < 200) {
        setActiveSection('');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.replace('#', '');
      const element = document.getElementById(targetId);
      if (element) {
        const headerOffset = 76;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth',
        });
        if (targetId === 'channels') {
          setTimeout(() => {
            const input = document.getElementById('chat-input') as HTMLInputElement;
            input?.focus();
          }, 450);
        }
        if (mobileMenuOpen) {
          setMobileMenuOpen(false);
        }
      }
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full h-16 bg-[#080d11]/95 backdrop-blur-md border-b border-slate-800/80 transition-all">
      {/* Primary Flex Container with strict vertical centering and flex distribution */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between gap-4 md:gap-8">
        
        {/* Zone 1: Brand title — flex centered vertically */}
        <div className="h-full flex items-center shrink-0">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex items-center gap-2.5 text-white whitespace-nowrap group select-none transition-transform hover:scale-[1.02] active:scale-95 duration-200"
          >
            <span className="font-malayalam text-xl sm:text-2xl text-amber-200 font-bold leading-none group-hover:text-amber-100 transition-colors">
              തട്ടുകട
            </span>
            <span className="text-slate-600 font-light text-sm leading-none">/</span>
            <span className="font-editorial text-xl sm:text-2xl font-light text-white tracking-wide leading-none">
              Thattukada
            </span>
          </a>
        </div>

        {/* Zone 2: Navigation links — vertically centered with full-height flex alignment across screens */}
        <nav
          aria-label="Primary Navigation"
          className="hidden sm:flex items-center justify-center self-stretch h-full gap-5 md:gap-8 text-[11px] sm:text-xs uppercase tracking-widest font-sans font-light"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`relative flex items-center justify-center self-stretch h-full px-1 whitespace-nowrap shrink-0 transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                  isActive
                    ? 'text-amber-200 font-normal'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                <span className="leading-none">{link.label}</span>
                {/* Active / Hover bottom hairline indicator */}
                <span
                  className={`absolute bottom-0 left-0 right-0 h-[2px] transition-all duration-200 ${
                    isActive
                      ? 'bg-amber-300 opacity-100'
                      : 'bg-amber-400/0 hover:bg-amber-400/50'
                  }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Zone 3: Actions — flex items centered vertically */}
        <div className="h-full flex items-center justify-end gap-2.5 sm:gap-3 shrink-0">
          <button
            onClick={onToggleAudio}
            type="button"
            aria-label={isAudioPlaying ? 'Mute rain ambience' : 'Play rain ambience'}
            className="btn-smooth active:scale-95 flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-light rounded-full border border-slate-700/80 bg-slate-900/60 text-slate-300 hover:text-white hover:border-slate-600 transition-all duration-200 shrink-0"
            title={isAudioPlaying ? 'Mute rain ambience' : 'Play peaceful rain ambience'}
          >
            {isAudioPlaying ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-amber-400 animate-pulse shrink-0" />
                <span className="hidden md:inline text-amber-200 font-sans tracking-wide leading-none">Rain On</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span className="hidden md:inline font-sans tracking-wide leading-none">Ambience</span>
              </>
            )}
          </button>

          <button
            onClick={onJoinClick}
            type="button"
            className="btn-smooth btn-hover-lift active:scale-95 flex items-center justify-center px-5 py-1.5 text-sm sm:text-base font-editorial tracking-wide font-normal text-amber-200 hover:text-white bg-amber-400/10 hover:bg-amber-400/20 border border-amber-300/40 hover:border-amber-300 rounded-full transition-all duration-200 whitespace-nowrap shrink-0 leading-none shadow-sm hover:shadow-amber-400/10 backdrop-blur-sm"
          >
            Join Discord
          </button>

          {/* Mobile hamburger menu toggle — centered vertically */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            aria-label="Toggle navigation menu"
            className="btn-smooth active:scale-95 sm:hidden flex items-center justify-center p-2 text-slate-300 hover:text-white hover:bg-slate-800/60 rounded-lg transition-colors shrink-0"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer with centered flex alignment */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-slate-800 bg-[#0c1218]/98 backdrop-blur-xl px-4 py-4 flex flex-col items-center justify-center gap-3 animate-fade-in">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className={`w-full text-center py-2 text-sm uppercase tracking-widest font-sans transition-all duration-200 active:scale-95 ${
                  isActive ? 'text-amber-200 font-medium' : 'text-slate-300 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            );
          })}
          <div className="w-full pt-2 border-t border-slate-800/80 flex items-center justify-center">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onJoinClick();
              }}
              type="button"
              className="btn-smooth active:scale-95 w-full py-2.5 px-4 text-center text-sm font-editorial tracking-wide font-normal text-amber-200 hover:text-white bg-amber-400/10 border border-amber-300/40 rounded-full transition-colors"
            >
              Join Thattukada Server
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
