import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { WebsiteMockAnimation } from "@/components/site/WebsiteMockAnimation";
import {
  Code2, Smartphone, Megaphone, Search,
  Star, Download, TrendingUp, Heart, MessageCircle,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

// ─── Count-up hook ────────────────────────────────────────────────────────────

function useCountUp(target: number, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const done = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !done.current) {
          done.current = true;
          const t0 = performance.now();
          const tick = (now: number) => {
            const p = Math.min((now - t0) / duration, 1);
            setVal(Math.round((1 - Math.pow(1 - p, 3)) * target));
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

  return { val, ref };
}

// ─── App Development visual panel ─────────────────────────────────────────────

function AppPanel() {
  const installs = useCountUp(127450);
  const rating   = useCountUp(49, 1200); // displayed as 4.9

  const bars = [28, 42, 55, 64, 73, 82, 91, 99];

  return (
    <div ref={installs.ref} className="w-full h-full p-5 sm:p-8 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary">
          App Performance
        </div>
        <div className="flex items-center gap-1">
          {[0,1,2,3,4].map(i => (
            <Star key={i} className="w-3 h-3 fill-current text-primary" strokeWidth={0} />
          ))}
          <span className="font-mono text-[10px] text-primary ml-1">
            {(rating.val / 10).toFixed(1)}
          </span>
        </div>
      </div>

      {/* Big stat */}
      <div className="flex items-end gap-6">
        <div>
          <div className="font-serif text-5xl sm:text-6xl leading-none tabular-nums text-foreground">
            99.9<span className="text-primary text-3xl">%</span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
            Crash-free rate
          </div>
        </div>
        <div>
          <div className="font-serif text-3xl sm:text-4xl leading-none text-foreground">
            {(installs.val / 1000).toFixed(0)}
            <span className="text-primary text-xl">k+</span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-1">
            Combined installs
          </div>
        </div>
      </div>

      {/* Download bar */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <Download className="w-3 h-3 text-primary" />
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            90-day download trend
          </span>
        </div>
        <div className="flex items-end gap-1 h-10">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 bg-primary/30 rounded-sm transition-all duration-700"
              style={{
                height: `${h}%`,
                transitionDelay: `${i * 60}ms`,
                backgroundColor: i === bars.length - 1
                  ? "var(--color-primary)"
                  : `oklch(from var(--color-primary) l c h / ${0.25 + i * 0.09})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Platform badges */}
      <div className="flex gap-2 flex-wrap mt-auto">
        {["iOS", "Android", "React Native", "App Store", "Play Store"].map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 border border-border bg-card/50 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Social Media visual panel ─────────────────────────────────────────────────

function SocialPanel() {
  const lift    = useCountUp(41, 1400); // displayed as 4.1×
  const likes   = useCountUp(12400);
  const reposts = useCountUp(3200);
  const comments = useCountUp(890);

  const weekData = [18, 26, 35, 41, 55, 67, 79, 95];

  return (
    <div ref={lift.ref} className="w-full h-full p-5 sm:p-8 flex flex-col gap-5">
      {/* Header */}
      <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary">
        Engagement Metrics — 90 Days
      </div>

      {/* Hero metric */}
      <div className="flex items-end gap-2">
        <div className="font-serif text-6xl sm:text-7xl leading-none tabular-nums text-foreground">
          {(lift.val / 10).toFixed(1)}
        </div>
        <div className="pb-2">
          <span className="font-serif text-3xl text-primary">×</span>
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            avg engagement lift
          </div>
        </div>
      </div>

      {/* Chart */}
      <div>
        <div className="flex items-end gap-1 h-12 mb-1">
          {weekData.map((h, i) => (
            <div key={i} className="flex-1 rounded-sm transition-all duration-700"
              style={{
                height: `${h}%`,
                transitionDelay: `${i * 55}ms`,
                backgroundColor: i === weekData.length - 1
                  ? "var(--color-primary)"
                  : `oklch(from var(--color-primary) l c h / ${0.2 + i * 0.1})`,
              }}
            />
          ))}
        </div>
        <div className="flex justify-between font-mono text-[8px] text-muted-foreground/60">
          <span>Week 1</span>
          <span>Week 8</span>
        </div>
      </div>

      {/* Engagement stats */}
      <div className="grid grid-cols-3 gap-px bg-border border border-border mt-auto">
        {[
          { Icon: Heart,         val: likes.val,    label: "Likes" },
          { Icon: TrendingUp,    val: reposts.val,  label: "Shares" },
          { Icon: MessageCircle, val: comments.val, label: "Comments" },
        ].map(({ Icon, val, label }) => (
          <div key={label} className="bg-background/60 p-3 text-center">
            <Icon className="w-3 h-3 text-primary mx-auto mb-1" />
            <div className="font-mono text-[11px] text-foreground tabular-nums">
              {val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val}
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
              {label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── SEO & AI Search visual panel ─────────────────────────────────────────────

function SEOPanel() {
  const traffic = useCountUp(312, 1600);

  const bars = [22, 35, 44, 56, 67, 78, 89, 100];

  const keywords = [
    { kw: "houston web design",     rank: "#1", green: true },
    { kw: "houston app developer",  rank: "#2", green: true },
    { kw: "houston seo agency",     rank: "#3", green: false },
    { kw: "web design near me",     rank: "#4", green: false },
  ];

  return (
    <div ref={traffic.ref} className="w-full h-full p-5 sm:p-8 flex flex-col gap-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary">
          SEO Performance · 90 Days
        </div>
        <TrendingUp className="w-4 h-4 text-primary" strokeWidth={1.5} />
      </div>

      {/* Keyword rankings table */}
      <div className="flex flex-col gap-1.5">
        {keywords.map(({ kw, rank, green }) => (
          <div key={kw} className="flex items-center justify-between gap-3">
            <span className="font-mono text-[9px] px-2 py-0.5 border border-border bg-card/50 text-muted-foreground truncate">
              {kw}
            </span>
            <span
              className={`font-mono text-[9px] font-semibold px-2 py-0.5 shrink-0 ${
                green
                  ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                  : "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30"
              }`}
            >
              {rank}
            </span>
          </div>
        ))}
      </div>

      {/* Organic traffic count-up */}
      <div className="flex items-end gap-2">
        <div className="font-serif text-5xl sm:text-6xl leading-none tabular-nums text-foreground">
          {traffic.val}
          <span className="text-primary text-3xl">%</span>
        </div>
        <div className="pb-1.5">
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            avg traffic lift / 12mo
          </div>
        </div>
      </div>

      {/* Organic trend bar chart */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-3 h-3 text-primary" strokeWidth={1.5} />
          <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            Organic trend
          </span>
        </div>
        <div className="flex items-end gap-1 h-10">
          {bars.map((h, i) => (
            <div
              key={i}
              className="flex-1 rounded-sm transition-all duration-700"
              style={{
                height: `${h}%`,
                transitionDelay: `${i * 60}ms`,
                backgroundColor: i === bars.length - 1
                  ? "var(--color-primary)"
                  : `oklch(from var(--color-primary) l c h / ${0.2 + i * 0.1})`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Platform tags */}
      <div className="flex gap-2 flex-wrap mt-auto">
        {["Google", "Bing", "GEO", "AI Search", "Local Pack"].map((tag) => (
          <span
            key={tag}
            className="font-mono text-[9px] uppercase tracking-[0.18em] px-2.5 py-1 border border-border bg-card/50 text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Banner data ──────────────────────────────────────────────────────────────

interface Banner {
  num: string;
  eyebrow: string;
  title: string;
  italic: string;
  blurb: string;
  bullets: string[];
  href: string;
  cta: string;
  Icon: LucideIcon;
  visual: "website" | "app" | "social" | "seo";
  light: boolean;
}

const BANNERS: Banner[] = [
  {
    num: "01",
    eyebrow: "Web Development",
    title: "Websites that",
    italic: "outwork your sales team.",
    blurb:
      "Custom-engineered marketing sites, e-commerce platforms, and portals built for sub-second load times, Houston search intent, and first-scroll conversion.",
    bullets: ["Sub-1.5s LCP · Lighthouse 95+", "Headless CMS & Jamstack", "Conversion-instrumented"],
    href: "/services/websites",
    cta: "See Web Work",
    Icon: Code2,
    visual: "website",
    light: false,
  },
  {
    num: "02",
    eyebrow: "App Development",
    title: "Mobile apps that",
    italic: "run Houston operations.",
    blurb:
      "Native iOS, Android, and React Native apps for field crews, customers, and back-office teams — built offline-first and shipped to the App Store by the engineers who wrote the code.",
    bullets: ["iOS · Android · React Native", "Offline-first architecture", "App Store launch included"],
    href: "/services/mobile-apps",
    cta: "See App Work",
    Icon: Smartphone,
    visual: "app",
    light: true,
  },
  {
    num: "03",
    eyebrow: "Social Media Management",
    title: "Social that actually",
    italic: "moves the needle.",
    blurb:
      "Strategy, content production, daily posting, and paid amplification owned end-to-end by a Houston team that lives in your market — with monthly KPI reporting your CFO can read.",
    bullets: ["Instagram · TikTok · LinkedIn", "In-house content studio", "Monthly KPI reporting"],
    href: "/services/social-media",
    cta: "See the Practice",
    Icon: Megaphone,
    visual: "social",
    light: false,
  },
  {
    num: "04",
    eyebrow: "SEO & AI Search",
    title: "Rankings that",
    italic: "pay for themselves.",
    blurb:
      "Technical SEO, Core Web Vitals, Houston local-pack dominance, and Generative Engine Optimization for ChatGPT, Perplexity, and Google AI Overviews — shipped by the engineers who own the codebase.",
    bullets: ["Local pack · by neighborhood", "Core Web Vitals 95+", "GEO for AI search"],
    href: "/services/seo",
    cta: "See SEO Practice",
    Icon: Search,
    visual: "seo",
    light: true,
  },
];

// ─── Main component ───────────────────────────────────────────────────────────

export function ServiceBanners() {
  return (
    <section aria-label="Our flagship services" className="border-b border-border">

      {/* Section header */}
      <div className="bg-background px-5 sm:px-8 md:px-12 lg:px-16 pt-16 sm:pt-20 pb-10 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-5">
            <span className="block h-px w-12 bg-primary" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
              What We Do Best
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em]">
            Four services.{" "}
            <span className="italic text-gold">One Houston team.</span>
          </h2>
        </Reveal>
      </div>

      {/* Banners */}
      <div className="flex flex-col">
        {BANNERS.map((b, i) => {
          const reversed = i % 2 === 1;
          return (
            <article
              key={b.num}
              className={`relative border-t border-border ${b.light ? "section-cream" : "bg-background"}`}
            >
              {/* Ambient orb — only on dark sections */}
              {!b.light && (
                <div
                  aria-hidden
                  className={`pointer-events-none absolute ${reversed ? "-left-32" : "-right-32"} top-1/2 -translate-y-1/2 h-[22rem] w-[22rem] rounded-full bg-primary/12 blur-[100px]`}
                />
              )}

              <div
                className={`relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-10 sm:py-14 grid lg:grid-cols-2 gap-8 lg:gap-14 items-center ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                {/* ── Text column ── */}
                <div>
                  <div className="flex items-baseline gap-4 mb-5">
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-primary">
                      {b.num} / 04
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
                      {b.eyebrow}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[0.95] tracking-[-0.02em] mb-5">
                    <span className="block">{b.title}</span>
                    <span className="block italic text-gold">{b.italic}</span>
                  </h3>

                  <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mb-6">
                    {b.blurb}
                  </p>

                  {/* Bullet pills */}
                  <ul className="flex flex-wrap gap-2 mb-8">
                    {b.bullets.map((bl) => (
                      <li
                        key={bl}
                        className="group flex items-center gap-2 border border-border bg-card/40 hover:border-primary hover:bg-primary/5 px-4 py-2.5 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground transition-all cursor-default"
                      >
                        <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity text-[8px]">
                          ✦
                        </span>
                        {bl}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-3">
                    <Link
                      to={b.href}
                      className="cta-lux inline-flex items-center gap-2 px-7 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
                    >
                      {b.cta} →
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center px-7 py-4 border border-border font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
                    >
                      Get a quote
                    </Link>
                  </div>
                </div>

                {/* ── Visual column ── */}
                <div className="relative group">
                  {/* Hover lift effect wrapper */}
                  <div className="border border-border bg-card/30 overflow-hidden transition-transform duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.5)]">
                    {/* Service label */}
                    <div className="px-4 py-2 border-b border-border/60 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <b.Icon className="w-3.5 h-3.5 text-primary" strokeWidth={1.5} />
                        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-primary">
                          Atlas / {b.eyebrow}
                        </span>
                      </div>
                      <span className="font-serif text-4xl text-primary/15 leading-none select-none">
                        {b.num}
                      </span>
                    </div>

                    {/* Visual content */}
                    <div className="aspect-[4/3]">
                      {b.visual === "website" && <WebsiteMockAnimation />}
                      {b.visual === "app"     && <AppPanel />}
                      {b.visual === "social"  && <SocialPanel />}
                      {b.visual === "seo"     && <SEOPanel />}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
