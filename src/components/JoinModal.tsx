import { X, ExternalLink } from 'lucide-react';

interface JoinModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function JoinModal({ isOpen, onClose }: JoinModalProps) {
  const inviteUrl = 'https://discord.gg/malayalam';

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="join-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-sm rounded-2xl border border-slate-800/80 bg-[#0a0f16]/95 p-6 sm:p-8 shadow-2xl backdrop-blur-xl">
        {/* Minimalist Close button */}
        <button
          onClick={onClose}
          type="button"
          className="btn-smooth active:scale-90 absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800/60 transition-all duration-200"
          aria-label="Close dialog"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Minimalist Header */}
        <div className="text-center pt-4">
          <h3
            id="join-dialog-title"
            className="text-3xl sm:text-4xl font-editorial font-light text-white tracking-tight leading-tight"
          >
            Thattukada
          </h3>

          <p className="text-xs sm:text-sm text-slate-400 font-light font-sans tracking-wide mt-2.5 max-w-xs mx-auto leading-relaxed">
            The late-night Kerala sanctuary for hot chai, candid conversations, gaming squads, and creative jams.
          </p>
        </div>

        {/* Primary Action Button */}
        <div className="mt-8 space-y-3">
          <a
            href={inviteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-smooth btn-hover-lift active:scale-95 w-full py-3.5 px-6 text-center text-sm font-editorial tracking-wider font-normal text-amber-200 hover:text-white bg-amber-400/15 hover:bg-amber-400/25 border border-amber-300/40 hover:border-amber-300 rounded-full transition-all duration-200 shadow-md flex items-center justify-center gap-2 backdrop-blur-sm"
          >
            <span>Open in Discord</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={onClose}
            type="button"
            className="btn-smooth active:scale-95 w-full py-2 text-center text-xs font-light text-slate-500 hover:text-slate-300 transition-colors duration-200"
          >
            Continue browsing
          </button>
        </div>
      </div>
    </div>
  );
}
