import { MessageSquare } from 'lucide-react';

interface HeroProps {
  onJoinClick: () => void;
}

export function Hero({ onJoinClick }: HeroProps) {
  return (
    <section className="relative pt-16 pb-16 md:pt-24 md:pb-24 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Headline & Subheading with fancy minimalist typography */}
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
          <h1 className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-[-0.015em] text-white/95 leading-[1.08] mb-6 [text-wrap:balance]">
            Where <span className="font-normal italic text-amber-100">late-night chai</span> meets{' '}
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-100 to-amber-300">
              endless conversations.
            </span>
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300/80 leading-relaxed max-w-2xl mx-auto font-light tracking-wide font-sans">
            Inspired by Kerala&apos;s nocturnal roadside tea stalls. A tranquil, welcoming sanctuary
            for casual banter, music jams, gaming squads, and genuine connections worldwide.
          </p>

          {/* Action CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onJoinClick}
              type="button"
              className="btn-smooth btn-hover-lift active:scale-95 px-7 py-3 text-sm sm:text-base font-editorial tracking-wide font-normal text-amber-200 hover:text-white bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/40 hover:border-amber-300 rounded-full transition-all duration-200 shadow-lg shadow-amber-400/5 hover:shadow-amber-400/15 flex items-center gap-2.5 backdrop-blur-sm"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Join the Discord Server</span>
            </button>

            <a
              href="#channels"
              onClick={(e) => {
                e.preventDefault();
                const el = document.getElementById('channels');
                if (el) {
                  el.scrollIntoView({ behavior: 'smooth' });
                  setTimeout(() => {
                    const input = document.getElementById('chat-input') as HTMLInputElement;
                    input?.focus();
                  }, 400);
                }
              }}
              className="btn-smooth btn-hover-lift active:scale-95 px-6 py-3 text-sm sm:text-base font-editorial tracking-wide font-normal text-slate-200 hover:text-amber-200 bg-slate-900/60 hover:bg-slate-800/80 border border-slate-700/80 hover:border-amber-300/50 rounded-full transition-all duration-200 flex items-center gap-2 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Try Live Chat</span>
            </a>
          </div>
        </div>

        {/* Proof of Community / Key Metrics Strip */}
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-y border-slate-800/80 py-8 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">30,239+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-light tracking-wide">Discord Members</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 font-mono tabular-nums">1,204+</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-light tracking-wide">Daily Online</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-amber-300 font-mono tabular-nums">14</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-light tracking-wide">Thematic Lounges</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-bold text-slate-200 font-mono tabular-nums">24/7</div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1 font-light tracking-wide">Late-Night Chaya</div>
          </div>
        </div>
      </div>
    </section>
  );
}
