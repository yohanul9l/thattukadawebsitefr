import { ThattukadaBrandMark } from './ThattukadaBrandMark';

interface FooterProps {
  onJoinClick: () => void;
}

export function Footer({ onJoinClick }: FooterProps) {
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
      }
    }
  };

  return (
    <footer className="border-t border-slate-800/80 bg-[#06090c] py-12 md:py-16 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 pb-10 border-b border-slate-800/80 text-center md:text-left">
          <div>
            <div className="inline-block">
              <ThattukadaBrandMark size="md" showSubtitle={false} />
            </div>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 max-w-sm">
              The late-night chai corner for Malayalis and global friends. Conversations, gaming squads, and cozy lo-fi vibes.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 text-xs uppercase tracking-widest font-sans font-light text-slate-300">
            <a
              href="#about"
              onClick={(e) => handleNavClick(e, '#about')}
              className="hover:text-white transition-colors duration-200 hover:-translate-y-0.5"
            >
              About
            </a>
            <a
              href="#channels"
              onClick={(e) => handleNavClick(e, '#channels')}
              className="hover:text-white transition-colors duration-200 hover:-translate-y-0.5"
            >
              Channels
            </a>
            <a
              href="#guidelines"
              onClick={(e) => handleNavClick(e, '#guidelines')}
              className="hover:text-white transition-colors duration-200 hover:-translate-y-0.5"
            >
              Rules
            </a>
            <a
              href="#faq"
              onClick={(e) => handleNavClick(e, '#faq')}
              className="hover:text-white transition-colors duration-200 hover:-translate-y-0.5"
            >
              FAQ
            </a>
            <button
              onClick={onJoinClick}
              type="button"
              className="btn-smooth btn-hover-lift active:scale-95 text-amber-300 hover:text-amber-200 transition-colors font-medium px-2 py-1"
            >
              Join Server
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Thattukada Discord Community. All rights reserved.
          </div>
          <div>
            Crafted for the night owls, chai lovers, and storytellers.
          </div>
        </div>
      </div>
    </footer>
  );
}
