import { COMMUNITY_RULES } from '../data/communityData';
import { ShieldCheck } from 'lucide-react';

export function CommunityRules() {
  return (
    <section id="guidelines" className="scroll-mt-16 py-16 md:py-24 border-t border-slate-800/80 bg-[#070b0e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-[11px] font-sans tracking-[0.3em] uppercase text-amber-200/70 font-light mb-3">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Community Code</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-editorial font-light tracking-tight text-white/95">
            The <span className="italic text-amber-100 font-normal">House Rules</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-300/80 font-light tracking-wide font-sans">
            A harmonious tea stall requires mutual respect. Here are the core values we uphold together.
          </p>
        </div>

        {/* Editorial numbered rules grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {COMMUNITY_RULES.map((rule) => (
            <div
              key={rule.number}
              className="p-6 sm:p-8 rounded-2xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700/80 transition-colors"
            >
              <div className="text-sm font-mono text-amber-400 font-semibold mb-3">
                {rule.number}.
              </div>
              <h3 className="text-lg font-bold text-white font-display mb-2">
                {rule.title}
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                {rule.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
