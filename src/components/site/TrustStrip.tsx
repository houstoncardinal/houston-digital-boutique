import { useEffect, useRef, useState } from "react";
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
  "React Native",
  "Local Business SEO",
  "Paid Social",
  "Video Production",
];

interface StatItem {
  display: string;
  countTo: number | null;
  suffix: string;
  label: string;
  sub: string;
}

const STATS: StatItem[] = [
  {
    display: "500+",
    countTo: 500,
    suffix: "+",
    label: "Projects shipped",
    sub: "Across Greater Houston & beyond",
  },
  {
    display: "7",
    countTo: 7,
    suffix: "",
    label: "In-house specialists",
    sub: "Engineers, strategists, producers",
  },
  {
    display: "1.4s",
    countTo: null,
    suffix: "",
    label: "Avg site LCP",
    sub: "Lighthouse 95+ on launch",
  },
  {
    display: "24/7",
    countTo: null,
    suffix: "",
    label: "Always on",
    sub: "We answer — not a queue",
  },
];

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number | null, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    if (target === null) return;
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          obs.disconnect();
          const startTime = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(Math.round(eased * target));
            if (p < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, duration]);

  return { value, ref };
}

// ─── Stat card ────────────────────────────────────────────────────────────────

function StatCard({ stat, index }: { stat: StatItem; index: number }) {
  const { value, ref } = useCountUp(stat.countTo);

  const displayValue =
    stat.countTo !== null ? `${value}${stat.suffix}` : stat.display;

  return (
    <div
      ref={ref}
      className="bg-background p-5 sm:p-8 group transition-colors hover:bg-card/60"
      style={{ transitionDelay: `${index * 60}ms` }}
    >
      <div className="font-serif text-4xl sm:text-5xl md:text-6xl text-gold leading-none tabular-nums">
        {displayValue}
      </div>
      <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary mt-4">
        {stat.label}
      </div>
      <p className="font-display text-sm text-muted-foreground mt-2 leading-relaxed">
        {stat.sub}
      </p>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

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
            {STATS.map((stat, i) => (
              <StatCard key={stat.label} stat={stat} index={i} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
