import { Reveal } from "@/components/site/Reveal";

const PROOFS = [
  "Custom Software",
  "Native iOS · Android",
  "Headless E-commerce",
  "Houston SEO",
  "AI Integrations",
  "Brand Films",
  "Enterprise Cloud",
  "Conversion CRO",
];

const STATS: [string, string, string][] = [
  ["140+", "Projects shipped", "Across Greater Houston & beyond"],
  ["13", "Senior specialists", "Engineers, strategists, producers"],
  ["1.4s", "Avg site LCP", "Lighthouse 95+ on launch"],
  ["24/7", "Owner-on-call", "Hunain answers — not a queue"],
];

export function TrustStrip() {
  return (
    <section
      aria-label="Why Houston operators trust Atlas"
      className="relative border-b border-border bg-card/40"
    >
      {/* Marquee */}
      <div className="overflow-hidden border-b border-border/70 py-5">
        <div className="flex gap-12 whitespace-nowrap animate-marquee">
          {[...PROOFS, ...PROOFS, ...PROOFS].map((p, i) => (
            <span
              key={`${p}-${i}`}
              className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground"
            >
              <span className="text-primary mr-3">✦</span>
              {p}
            </span>
          ))}
        </div>
      </div>

      {/* Stats grid */}
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-20">
        <Reveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {STATS.map(([n, t, s], i) => (
              <div
                key={t}
                className="bg-background p-5 sm:p-8 group transition-colors hover:bg-card/60"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold leading-none">
                  {n}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary mt-4">
                  {t}
                </div>
                <p className="font-display text-sm text-muted-foreground mt-2 leading-relaxed">
                  {s}
                </p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
