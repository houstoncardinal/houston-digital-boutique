import { Link } from "@tanstack/react-router";
import { Reveal } from "@/components/site/Reveal";
import { Code2, Smartphone, Megaphone, Film } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { WebsiteMockAnimation } from "@/components/site/WebsiteMockAnimation";

interface Banner {
  num: string;
  eyebrow: string;
  title: string;
  italic: string;
  blurb: string;
  bullets: string[];
  deliverables: string[];
  idealFor: string;
  timeline: string;
  kpi: string;
  href: string;
  cta: string;
  Icon: LucideIcon;
  animation?: "website";
}

const banners: Banner[] = [
  {
    num: "01",
    eyebrow: "Web Development",
    title: "Websites that",
    italic: "outwork your sales team.",
    blurb:
      "Custom-engineered marketing sites, e-commerce platforms, and customer portals — engineered for sub-second load times, ranked for Houston intent, and instrumented to convert from the first scroll. Every site ships with Core Web Vitals passing, structured data, and a CMS your team can actually use.",
    bullets: ["Sub-1.5s LCP", "Headless & Jamstack", "Conversion-instrumented"],
    deliverables: [
      "Custom design system",
      "Headless CMS (Sanity / Payload)",
      "On-page & technical SEO",
      "Analytics + CRO tracking",
    ],
    idealFor: "Service businesses, SaaS founders, and e-commerce brands scaling past spreadsheets.",
    timeline: "3–8 weeks",
    kpi: "Avg. 2.4× lift in qualified leads in 90 days",
    href: "/services/websites",
    cta: "See Web Work",
    Icon: Code2,
    animation: "website",
  },
  {
    num: "02",
    eyebrow: "App Development",
    title: "Mobile apps for",
    italic: "operations that run Houston.",
    blurb:
      "Native iOS, Android, and React Native apps for field crews, customers, and back-office teams. Built by senior engineers, hardened with offline-first architecture, and shipped through the App Store and Play Store by the same people who wrote the code.",
    bullets: ["iOS · Android · React Native", "Offline-first sync", "App Store launch included"],
    deliverables: [
      "Native or cross-platform build",
      "Auth, push, payments, OTA",
      "Admin dashboard + API",
      "App Store & Play Store launch",
    ],
    idealFor: "Field-service ops, healthcare, marketplaces, and consumer products with retention loops.",
    timeline: "10–16 weeks",
    kpi: "App Store launch in <120 days, 99.9% crash-free",
    href: "/services/mobile-apps",
    cta: "See App Work",
    Icon: Smartphone,
  },
  {
    num: "03",
    eyebrow: "Social Media Management",
    title: "Social that actually",
    italic: "moves the needle.",
    blurb:
      "Strategy, content production, daily posting, community management, and paid amplification — owned end-to-end by a Houston team that lives in your market. Every channel ships with a content calendar, brand voice doc, and a monthly performance review your CFO can read.",
    bullets: ["Instagram · TikTok · LinkedIn", "In-house content studio", "Monthly KPI reporting"],
    deliverables: [
      "Quarterly content strategy",
      "20–30 posts/month per channel",
      "Community management",
      "Paid social (Meta + LinkedIn)",
    ],
    idealFor: "Local brands, restaurants, real-estate teams, and B2B founders building category authority.",
    timeline: "Live in 7 days",
    kpi: "Avg. 4.1× engagement lift in 90 days",
    href: "/contact",
    cta: "Get a Strategy",
    Icon: Megaphone,
  },
  {
    num: "04",
    eyebrow: "Video Production",
    title: "Cinema-grade video,",
    italic: "shot in Houston.",
    blurb:
      "Brand films, founder stories, commercials, product launches, and short-form reels — produced with full crews, cinema-grade gear, and an in-house edit suite. We translate strategy into footage buyers feel, then cut it for every channel you sell on.",
    bullets: ["Brand films & ads", "Reels & shorts at scale", "Full crew + edit suite"],
    deliverables: [
      "Pre-production + storyboarding",
      "Director, DP, sound, lighting",
      "4K/6K cinema delivery",
      "Multi-cut for web, social, OTT",
    ],
    idealFor: "Founders launching brands, products, or capital raises that demand a cinematic story.",
    timeline: "2–6 weeks",
    kpi: "Avg. 3.2× watch-through vs. stock content",
    href: "/contact",
    cta: "Book a Shoot",
    Icon: Film,
  },
];

export function ServiceBanners() {
  return (
    <section
      aria-label="Our flagship services"
      className="border-b border-border bg-background"
    >
      <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-20 sm:pt-28 pb-12 max-w-7xl mx-auto">
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="block h-px w-12 bg-primary" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
              What We Do Best
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em] max-w-4xl">
            Four services. <span className="italic text-gold">One Houston team.</span>
          </h2>
        </Reveal>
      </div>

      <div className="flex flex-col">
        {banners.map((b, i) => {
          const reversed = i % 2 === 1;
          return (
            <article
              key={b.num}
              className={`relative border-t border-border emerald-wash overflow-hidden ${
                i === 0 ? "border-t-0" : ""
              }`}
            >
              <div
                aria-hidden
                className={`pointer-events-none absolute ${
                  reversed ? "-left-40" : "-right-40"
                } top-1/2 -translate-y-1/2 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-[120px]`}
              />
              <div
                className={`relative max-w-7xl mx-auto px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-32 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center ${
                  reversed ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="lg:col-span-7">
                  <div className="flex items-baseline gap-5 mb-6">
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-primary">
                      {b.num} / 04
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-muted-foreground">
                      {b.eyebrow}
                    </span>
                  </div>
                  <h3 className="font-serif text-[2.4rem] sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em] mb-6 sm:mb-8">
                    <span className="block">{b.title}</span>
                    <span className="block italic text-gold">{b.italic}</span>
                  </h3>
                  <p className="font-display text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
                    {b.blurb}
                  </p>
                  <ul className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
                    {b.bullets.map((bl) => (
                      <li
                        key={bl}
                        className="border border-border bg-card/50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground"
                      >
                        {bl}
                      </li>
                    ))}
                  </ul>

                  {/* Enterprise meta strip — deliverables, timeline, KPI */}
                  <div className="grid sm:grid-cols-3 gap-px bg-border border border-border mb-8 max-w-3xl">
                    <div className="bg-background p-4">
                      <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-primary mb-2">
                        Timeline
                      </div>
                      <div className="font-serif text-lg leading-tight">{b.timeline}</div>
                    </div>
                    <div className="bg-background p-4 sm:col-span-2">
                      <div className="font-mono text-[9px] uppercase tracking-[0.28em] text-primary mb-2">
                        Outcome
                      </div>
                      <div className="font-serif text-lg leading-tight">{b.kpi}</div>
                    </div>
                  </div>

                  <div className="mb-8 max-w-2xl">
                    <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary mb-3">
                      What's delivered
                    </div>
                    <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                      {b.deliverables.map((d) => (
                        <li
                          key={d}
                          className="flex items-start gap-3 font-display text-sm text-foreground/90"
                        >
                          <span className="text-primary mt-1.5">✦</span>
                          <span>{d}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <p className="font-display text-sm text-muted-foreground italic max-w-2xl mb-8">
                    <span className="not-italic font-mono text-[10px] uppercase tracking-[0.28em] text-primary mr-2">
                      Ideal for
                    </span>
                    {b.idealFor}
                  </p>

                  <Link
                    to={b.href}
                    className="inline-block cta-lux px-8 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
                  >
                    {b.cta} →
                  </Link>
                </div>

                <div className="lg:col-span-5">
                  <div className="relative border border-border bg-card/40 flex items-center justify-center overflow-hidden rounded-sm">
                    <div
                      aria-hidden
                      className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5"
                    />
                    {b.animation === "website" ? (
                      <WebsiteMockAnimation />
                    ) : (
                      <div className="aspect-square w-full flex items-center justify-center">
                        <b.Icon
                          className="relative w-32 h-32 sm:w-40 sm:h-40 text-primary"
                          strokeWidth={1}
                        />
                      </div>
                    )}
                    <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-[0.3em] text-primary/80 mix-blend-difference">
                      Atlas / {b.eyebrow}
                    </div>
                    <div className="absolute bottom-4 right-4 font-serif text-6xl sm:text-7xl text-gold/30">
                      {b.num}
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
