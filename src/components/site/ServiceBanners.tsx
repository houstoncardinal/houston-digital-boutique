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
      "Custom-engineered marketing sites, e-commerce, and customer portals — fast, secure, and built to convert Houston buyers from the first scroll.",
    bullets: ["Sub-1.5s load times", "SEO-ready architecture", "Built to scale"],
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
      "Native iOS, Android, and React Native apps for field crews, customers, and back-office teams. Built by senior engineers who maintain what they ship.",
    bullets: ["iOS · Android · React Native", "Offline-first", "App Store launch included"],
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
      "Strategy, content, posting, and growth — managed end-to-end by a Houston team that knows your market and creates content your customers stop scrolling for.",
    bullets: ["Instagram · TikTok · LinkedIn", "Content calendars", "Monthly performance reports"],
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
      "Brand films, commercials, product videos, and short-form reels. Full crews, professional gear, and edit teams that turn raw footage into a story buyers feel.",
    bullets: ["Brand films & ads", "Reels & shorts", "Full crew + edit suite"],
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
                  <ul className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-10">
                    {b.bullets.map((bl) => (
                      <li
                        key={bl}
                        className="border border-border bg-card/50 px-4 py-3 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground"
                      >
                        {bl}
                      </li>
                    ))}
                  </ul>
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
