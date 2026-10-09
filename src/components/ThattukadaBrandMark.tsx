interface ThattukadaBrandMarkProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
}

export function ThattukadaBrandMark({
  className = '',
  size = 'md',
  showSubtitle = false,
}: ThattukadaBrandMarkProps) {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl md:text-5xl',
    xl: 'text-6xl md:text-7xl lg:text-8xl',
  };

  return (
    <div className={`inline-flex flex-col items-center select-none ${className}`}>
      {/* Authentic fluid script rendering for തട്ടുകട */}
      <div className="relative flex items-center justify-center">
        <span
          className={`font-malayalam font-bold tracking-tight text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.6)] ${sizeClasses[size]}`}
          style={{ letterSpacing: '-0.02em', lineHeight: 1.1 }}
        >
          തട്ടുകട
        </span>
        {/* Artistic underline swoop accent inspired by the original brand artwork */}
        <div className="absolute -bottom-1.5 md:-bottom-2.5 left-1/2 -translate-x-1/2 w-4/5 max-w-[140px] pointer-events-none opacity-90">
          <svg viewBox="0 0 100 14" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full text-amber-200/90">
            <path
              d="M4 4C28 11 72 12 94 3"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <ellipse cx="62" cy="9.5" rx="4.5" ry="2" fill="currentColor" />
          </svg>
        </div>
      </div>

      {showSubtitle && (
        <span className="mt-3 text-[11px] md:text-xs font-light tracking-[0.35em] uppercase text-amber-200/80 font-sans">
          Thattukada Discord Community
        </span>
      )}
    </div>
  );
}
