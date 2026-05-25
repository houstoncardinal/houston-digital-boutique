/**
 * Animated browser mockup — sits in the "Websites that outwork your sales team"
 * banner. Pure CSS/SVG animation (no deps). Shows a browser chrome, a hero
 * loading in, a metric counter, traffic bars, and a live cursor click.
 */
export function WebsiteMockAnimation() {
  return (
    <div className="relative w-full aspect-[4/3] p-4 sm:p-6">
      {/* Glow */}
      <div
        aria-hidden
        className="absolute inset-6 rounded-lg bg-gradient-to-br from-primary/20 via-transparent to-gold/10 blur-2xl"
      />

      {/* Browser frame */}
      <div className="relative h-full w-full rounded-md border border-border bg-background/95 shadow-2xl overflow-hidden flex flex-col">
        {/* Top bar */}
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border bg-card/60">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
          <div className="ml-3 flex-1 h-5 rounded-sm bg-muted/60 px-2 flex items-center">
            <span className="font-mono text-[9px] text-muted-foreground tracking-wider truncate">
              https://yourbrand.com
            </span>
            <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          </div>
        </div>

        {/* Page body */}
        <div className="relative flex-1 p-3 sm:p-4 grid grid-cols-5 gap-3">
          {/* Left: hero */}
          <div className="col-span-3 flex flex-col gap-2">
            <div className="h-2 w-2/3 rounded bg-gold/70 animate-[mock-line_2.4s_ease-out_infinite]" />
            <div className="h-3.5 w-[90%] rounded bg-foreground/80 animate-[mock-line_2.4s_ease-out_0.15s_infinite]" />
            <div className="h-3.5 w-[75%] rounded bg-foreground/70 animate-[mock-line_2.4s_ease-out_0.3s_infinite]" />
            <div className="h-1.5 w-full rounded bg-muted-foreground/30 mt-1" />
            <div className="h-1.5 w-[85%] rounded bg-muted-foreground/30" />
            <div className="h-1.5 w-[70%] rounded bg-muted-foreground/30" />
            <div className="mt-2 inline-flex h-7 w-28 items-center justify-center rounded-sm bg-primary text-[10px] font-mono uppercase tracking-widest text-primary-foreground animate-[mock-pulse_2s_ease-in-out_infinite]">
              Get Quote →
            </div>
          </div>

          {/* Right: metric card */}
          <div className="col-span-2 rounded-sm border border-border bg-card/70 p-2.5 flex flex-col justify-between">
            <div>
              <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
                Conversions
              </div>
              <div className="font-serif text-2xl sm:text-3xl text-gold leading-none mt-1">
                <span className="inline-block animate-[mock-count_3s_ease-in-out_infinite]">
                  +287%
                </span>
              </div>
            </div>
            {/* Bars */}
            <div className="flex items-end gap-1 h-10 mt-2">
              {[40, 55, 35, 70, 50, 85, 95].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm bg-primary/70 animate-[mock-bar_2.4s_ease-in-out_infinite]"
                  style={{
                    height: `${h}%`,
                    animationDelay: `${i * 0.12}s`,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Scanning line */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent animate-[mock-scan_3.5s_linear_infinite]"
          />

          {/* Cursor */}
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="absolute h-5 w-5 text-foreground drop-shadow animate-[mock-cursor_5s_ease-in-out_infinite]"
            fill="currentColor"
          >
            <path d="M4 2l6 18 3-7 7-3z" />
          </svg>
        </div>

        {/* Status footer */}
        <div className="flex items-center justify-between px-3 py-1.5 border-t border-border bg-card/50 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
            Live · 1.2s LCP
          </span>
          <span>Lighthouse 99</span>
        </div>
      </div>

      <style>{`
        @keyframes mock-line {
          0% { opacity: 0.35; transform: translateX(-6px); }
          50% { opacity: 1; transform: translateX(0); }
          100% { opacity: 0.35; transform: translateX(-6px); }
        }
        @keyframes mock-bar {
          0%, 100% { transform: scaleY(0.4); transform-origin: bottom; }
          50% { transform: scaleY(1); transform-origin: bottom; }
        }
        @keyframes mock-scan {
          0% { transform: translateY(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(220px); opacity: 0; }
        }
        @keyframes mock-pulse {
          0%, 100% { box-shadow: 0 0 0 0 hsl(var(--primary) / 0.5); }
          50% { box-shadow: 0 0 0 8px hsl(var(--primary) / 0); }
        }
        @keyframes mock-count {
          0%, 100% { opacity: 0.6; transform: translateY(2px); }
          50% { opacity: 1; transform: translateY(0); }
        }
        @keyframes mock-cursor {
          0% { left: 20%; top: 70%; opacity: 0; }
          15% { opacity: 1; }
          40% { left: 38%; top: 78%; }
          55% { transform: scale(0.85); }
          70% { transform: scale(1); left: 38%; top: 78%; }
          100% { left: 60%; top: 40%; opacity: 0; }
        }
      `}</style>
    </div>
  );
}
