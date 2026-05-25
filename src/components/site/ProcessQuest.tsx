import { useState } from "react";
import { Link } from "@tanstack/react-router";

type Level = {
  id: number;
  code: string;
  title: string;
  subtitle: string;
  xp: number;
  bullets: string[];
  cta: { label: string; to: string };
};

const LEVELS: Level[] = [
  {
    id: 1,
    code: "LVL 01",
    title: "Listen & Consult",
    subtitle: "Tell us about your Houston business.",
    xp: 100,
    bullets: [
      "15-min discovery call — no sales pitch",
      "We learn your offer, audience, and goals",
      "Senior partner on the line, not a BDR",
    ],
    cta: { label: "Book the call →", to: "/contact" },
  },
  {
    id: 2,
    code: "LVL 02",
    title: "Audit & Evaluate",
    subtitle: "New build or upgrade the current site?",
    xp: 250,
    bullets: [
      "Full audit of your website + SEO footprint",
      "Houston keyword & competitor scan",
      "Clear recommendation: rebuild vs. improve",
    ],
    cta: { label: "Request an audit →", to: "/contact" },
  },
  {
    id: 3,
    code: "LVL 03",
    title: "Plan the Build",
    subtitle: "Scope, timeline, and price band.",
    xp: 500,
    bullets: [
      "Web, app, social, or video — mapped to your goals",
      "Locked Houston-SEO strategy from day one",
      "Fixed price band, no surprise invoices",
    ],
    cta: { label: "See services →", to: "/services" },
  },
  {
    id: 4,
    code: "LVL 04",
    title: "Ship & Rank",
    subtitle: "Launch. Rank. Get the phone ringing.",
    xp: 1000,
    bullets: [
      "Hand-built launch by senior Houston team",
      "On-page SEO + Google Business optimization",
      "Click-to-call wired everywhere — Houston leads in",
    ],
    cta: { label: "Start a project →", to: "/contact" },
  },
];

export function ProcessQuest() {
  const [active, setActive] = useState(1);
  const current = LEVELS.find((l) => l.id === active)!;
  const totalXp = LEVELS.filter((l) => l.id <= active).reduce((s, l) => s + l.xp, 0);
  const maxXp = LEVELS.reduce((s, l) => s + l.xp, 0);
  const progress = Math.round((totalXp / maxXp) * 100);

  return (
    <section className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 border-t border-border emerald-wash overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-0 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-6">
          <span className="block h-px w-12 bg-primary" />
          <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
            The Process · Press Start
          </p>
        </div>

        <h2 className="font-serif text-[2.4rem] sm:text-6xl md:text-7xl leading-[0.95] tracking-[-0.02em] max-w-4xl">
          Four levels.
          <br />
          <span className="italic text-gold">One easy quest.</span>
        </h2>
        <p className="mt-6 font-display text-base sm:text-lg text-muted-foreground max-w-2xl leading-relaxed">
          We made hiring a Houston web, app, social, and video team feel like a game.
          Pick a level — see exactly what happens, what you get, and how to start.
        </p>

        {/* XP bar */}
        <div className="mt-10 border border-border bg-card/60 backdrop-blur p-5 sm:p-6">
          <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
            <span className="text-primary">Quest Progress</span>
            <span>
              {totalXp.toLocaleString()} / {maxXp.toLocaleString()} XP
            </span>
          </div>
          <div className="h-2 w-full bg-border overflow-hidden rounded-full">
            <div
              className="h-full bg-gradient-to-r from-primary to-gold transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Level grid */}
        <div className="mt-10 grid lg:grid-cols-12 gap-6">
          {/* Selector */}
          <div className="lg:col-span-5 grid sm:grid-cols-2 lg:grid-cols-1 gap-3">
            {LEVELS.map((l) => {
              const isActive = l.id === active;
              const unlocked = l.id <= active;
              return (
                <button
                  key={l.id}
                  onClick={() => setActive(l.id)}
                  className={`group text-left border p-5 transition-all ${
                    isActive
                      ? "border-primary bg-primary/10 shadow-[0_0_0_1px_var(--primary)]"
                      : "border-border bg-card/40 hover:border-primary/60 hover:bg-card"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span
                      className={`font-mono text-[10px] tracking-[0.3em] uppercase ${
                        isActive ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {l.code}
                    </span>
                    <span
                      className={`font-mono text-[10px] tracking-[0.2em] uppercase ${
                        unlocked ? "text-gold" : "text-muted-foreground"
                      }`}
                    >
                      {unlocked ? `+${l.xp} XP` : "Locked"}
                    </span>
                  </div>
                  <div className="font-serif text-2xl">{l.title}</div>
                  <div className="font-display text-sm text-muted-foreground mt-1">
                    {l.subtitle}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail card */}
          <div className="lg:col-span-7 border border-border bg-background relative">
            <div
              aria-hidden
              className="absolute inset-0 opacity-[0.04] pointer-events-none"
              style={{
                backgroundImage:
                  "linear-gradient(var(--primary) 1px, transparent 1px), linear-gradient(90deg, var(--primary) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative p-6 sm:p-10">
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary">
                  Now Playing · {current.code}
                </span>
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-gold">
                  +{current.xp} XP
                </span>
              </div>

              <h3 className="font-serif text-4xl sm:text-5xl leading-[1] tracking-[-0.01em]">
                {current.title}
              </h3>
              <p className="mt-3 font-display text-base sm:text-lg text-muted-foreground">
                {current.subtitle}
              </p>

              <ul className="mt-8 space-y-3">
                {current.bullets.map((b, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 font-display text-sm sm:text-base"
                  >
                    <span className="mt-[0.45rem] inline-block h-1.5 w-1.5 bg-gold shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-col sm:flex-row gap-3">
                <Link
                  to={current.cta.to}
                  className="px-7 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors text-center"
                >
                  {current.cta.label}
                </Link>
                {active < LEVELS.length && (
                  <button
                    onClick={() => setActive(active + 1)}
                    className="px-7 py-4 border border-border font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
                  >
                    Next Level →
                  </button>
                )}
                <a
                  href="tel:+12819017016"
                  className="px-7 py-4 border border-gold/50 text-gold font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-gold hover:text-background transition-colors text-center"
                >
                  ☎ Call (281) 901-7016
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
