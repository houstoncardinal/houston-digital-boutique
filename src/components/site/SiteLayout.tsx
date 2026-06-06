import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { type ReactNode } from "react";
import { ScrollProgress } from "./ScrollProgress";

// Shared AudioContext — created once on first hover, reused thereafter
let _audioCtx: AudioContext | null = null;
let _lastPlay = 0;

function playMenuHover() {
  if (typeof window === "undefined") return;
  const now = Date.now();
  if (now - _lastPlay < 80) return;
  _lastPlay = now;
  try {
    const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctor) return;
    if (!_audioCtx || _audioCtx.state === "closed") _audioCtx = new Ctor();
    const ctx = _audioCtx;
    const t = ctx.currentTime;

    // Primary tone — warm mid-range, no sweep, no transient harshness
    const osc1 = ctx.createOscillator();
    const g1 = ctx.createGain();
    osc1.connect(g1);
    g1.connect(ctx.destination);
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(600, t);
    g1.gain.setValueAtTime(0, t);
    g1.gain.linearRampToValueAtTime(0.024, t + 0.011); // soft 11ms attack
    g1.gain.exponentialRampToValueAtTime(0.0001, t + 0.22);
    osc1.start(t);
    osc1.stop(t + 0.22);

    // Micro-detuned twin (603Hz) — 3Hz beating creates natural warmth, inaudible as separate tone
    const osc2 = ctx.createOscillator();
    const g2 = ctx.createGain();
    osc2.connect(g2);
    g2.connect(ctx.destination);
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(603, t);
    g2.gain.setValueAtTime(0, t);
    g2.gain.linearRampToValueAtTime(0.011, t + 0.011);
    g2.gain.exponentialRampToValueAtTime(0.0001, t + 0.24);
    osc2.start(t);
    osc2.stop(t + 0.24);
  } catch {
    // silently fail — audio unavailable or blocked
  }
}

const SERVICE_ICONS: Record<string, string> = {
  "/services/websites": "◈",
  "/services/mobile-apps": "◉",
  "/services/seo": "◎",
  "/services/social-media": "◐",
  "/services/video-production": "◑",
  "/services/branding": "◆",
  "/services/cloud-hosting": "◇",
  "/services": "✦",
};

const serviceLinks = [
  {
    to: "/services/websites",
    label: "Web Design",
    desc: "Conversion-focused sites & portals",
  },
  {
    to: "/services/mobile-apps",
    label: "App Development",
    desc: "iOS, Android & React Native",
  },
  {
    to: "/services/seo",
    label: "SEO & AI Search",
    desc: "Technical SEO, local pack & AI visibility",
  },
  {
    to: "/services/social-media",
    label: "Social Media",
    desc: "Strategy, content & managed growth",
  },
  {
    to: "/services/video-production",
    label: "Video Production",
    desc: "Brand films, ads & short-form reels",
  },
  {
    to: "/services/branding",
    label: "Branding",
    desc: "Identity systems & brand guidelines",
  },
  {
    to: "/services/cloud-hosting",
    label: "Cloud & Hosting",
    desc: "Managed infra, uptime & deployments",
  },
  {
    to: "/services",
    label: "View All Services →",
    desc: "See the full capabilities list",
  },
] as const;

const navItems = [
  { to: "/blog", label: "Journal" },
  { to: "/houston", label: "Houston" },
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const isServicesActive = pathname.startsWith("/services");

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-2xl">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10 flex items-center justify-between py-4 md:py-5">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0" onClick={() => setMobileOpen(false)}>
          <span className="font-mono text-primary font-bold text-xs tracking-widest transition-transform duration-700 group-hover:rotate-90 inline-block select-none">
            [ ✦ ]
          </span>
          <span className="font-extrabold tracking-tighter text-base md:text-lg leading-none">
            ATLAS
            <span className="text-muted-foreground font-light ml-1 tracking-normal">/HOUSTON</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Services with mega-menu */}
          <div className="group relative">
            <Link
              to="/services"
              className={[
                "relative flex items-center gap-1.5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-300",
                isServicesActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <span className="relative">
                Services
                {isServicesActive && (
                  <span className="absolute -bottom-[9px] left-0 right-0 h-px bg-primary" />
                )}
              </span>
              <svg
                className="w-2.5 h-2.5 opacity-40 group-hover:opacity-100 transition-all duration-300 group-hover:translate-y-0.5"
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </Link>

            {/* Mega-menu panel */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-px pt-3 w-[700px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-250 ease-out translate-y-2 group-hover:translate-y-0">
              {/* Gold hairline accent */}
              <div className="mx-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent mb-px" />
              <div className="bg-background/98 backdrop-blur-xl border border-border shadow-2xl shadow-black/20 overflow-hidden">

                {/* Top editorial strip */}
                <div className="grid grid-cols-[200px_1fr] divide-x divide-border">

                  {/* Left: studio identity column */}
                  <div className="p-6 flex flex-col justify-between bg-card/60 min-h-[320px]">
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-primary mb-4">
                        Atlas Houston
                      </div>
                      <p className="font-serif text-xl leading-snug tracking-tight text-foreground mb-3">
                        7 in-house experts. Zero handoffs.
                      </p>
                      <p className="font-mono text-[10px] text-muted-foreground leading-relaxed">
                        Apps, websites, social, video, branding, cloud &amp; SEO — all local, all senior, all under one roof.
                      </p>
                    </div>
                    <div className="space-y-3 mt-6">
                      <Link
                        to="/contact"
                        className="block text-center bg-primary text-primary-foreground font-mono text-[9px] uppercase tracking-[0.2em] px-4 py-2.5 hover:bg-foreground hover:text-background transition-colors duration-200"
                      >
                        Get a Scope →
                      </Link>
                      <a
                        href="tel:+12819017016"
                        className="block text-center font-mono text-[9px] text-muted-foreground hover:text-primary transition-colors tabular-nums"
                      >
                        (281) 901-7016
                      </a>
                    </div>
                  </div>

                  {/* Right: service grid */}
                  <div className="grid grid-cols-2 divide-y divide-border">
                    {serviceLinks.slice(0, -1).map((svc) => (
                      <Link
                        key={svc.to}
                        to={svc.to}
                        onMouseEnter={playMenuHover}
                        className="group/item relative px-5 py-4 hover:bg-primary/[0.04] transition-colors duration-150 flex flex-col gap-1 border-b border-border last:border-b-0 [&:nth-child(odd)]:border-r [&:nth-child(odd)]:border-border overflow-hidden"
                      >
                        {/* Hover accent line */}
                        <span className="absolute left-0 top-0 bottom-0 w-[2px] bg-primary scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-top" />
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-primary text-[11px] opacity-50 group-hover/item:opacity-100 transition-opacity">
                            {SERVICE_ICONS[svc.to]}
                          </span>
                          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground group-hover/item:text-primary transition-colors duration-150">
                            {svc.label}
                          </span>
                        </div>
                        <span className="font-display text-[11px] text-muted-foreground leading-snug pl-5">
                          {svc.desc}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA strip */}
                <div className="border-t border-border bg-card/40 px-6 py-3 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                    Houston's full-service digital studio since 2018
                  </span>
                  <Link
                    to="/services"
                    className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary hover:text-foreground transition-colors flex items-center gap-1.5"
                  >
                    View all services
                    <span className="text-[10px]">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Other nav items */}
          {navItems.map((item) => {
            const active = pathname === item.to || pathname.startsWith(item.to + "/");
            return (
              <Link
                key={item.label}
                to={item.to}
                className={[
                  "relative px-4 py-2 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors duration-300",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                ].join(" ")}
              >
                <span className="relative">
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-[9px] left-0 right-0 h-px bg-primary" />
                  )}
                </span>
              </Link>
            );
          })}
        </nav>

        {/* Desktop right: phone + CTA */}
        <div className="hidden md:flex items-center gap-5 shrink-0">
          <a
            href="tel:+12819017016"
            className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors duration-300 tracking-wider tabular-nums"
          >
            (281) 901-7016
          </a>
          <Link
            to="/contact"
            className="bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-2.5 hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            Get a Scope →
          </Link>
        </div>

        {/* Mobile: hamburger toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          onClick={() => { setMobileOpen((v) => !v); setMobileServicesOpen(false); }}
          className="md:hidden font-mono text-sm text-foreground w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border/50 bg-background/98 backdrop-blur-2xl">
          <div className="max-w-screen-xl mx-auto px-6 py-4 flex flex-col">

            {/* Services accordion trigger */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className={[
                "flex items-center justify-between py-4 border-b border-border/40 w-full text-left transition-colors",
                isServicesActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.25em]">Services</span>
              <svg
                className={[
                  "w-3 h-3 text-primary transition-transform duration-300",
                  mobileServicesOpen ? "rotate-180" : "",
                ].join(" ")}
                viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.5"
              >
                <path d="M1 1l4 4 4-4" />
              </svg>
            </button>

            {/* Services sub-list */}
            {mobileServicesOpen && (
              <div className="border-b border-border/40 py-2 bg-card/30">
                {serviceLinks.map((svc) => (
                  <Link
                    key={svc.to}
                    to={svc.to}
                    onMouseEnter={playMenuHover}
                    onClick={() => { setMobileOpen(false); setMobileServicesOpen(false); }}
                    className="flex items-start gap-3 px-4 py-3.5 group hover:bg-primary/5 transition-colors"
                  >
                    <span className="font-mono text-primary text-sm mt-0.5 opacity-60 group-hover:opacity-100 transition-opacity shrink-0">
                      {SERVICE_ICONS[svc.to]}
                    </span>
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground group-hover:text-primary transition-colors">
                        {svc.label}
                      </div>
                      <div className="text-[11px] text-muted-foreground mt-0.5 leading-snug">
                        {svc.desc}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Other nav links */}
            {navItems.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={[
                    "font-mono text-[11px] uppercase tracking-[0.25em] py-4 border-b border-border/40 transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {item.label}
                </Link>
              );
            })}

            {/* Phone + CTA */}
            <div className="pt-5 pb-2 flex flex-col gap-3">
              <a
                href="tel:+12819017016"
                className="font-mono text-[10px] text-muted-foreground hover:text-foreground transition-colors tabular-nums"
              >
                ☎ (281) 901-7016
              </a>
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-4 text-center hover:bg-foreground hover:text-background transition-colors"
              >
                Get a Scope →
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-6 md:px-10 py-16 border-t border-border">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-6">
            // Atlas Houston Studio
          </div>
          <h3 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tighter leading-[0.9] mb-6">
            Built in Houston. <br /> Hosted by hand.
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            7 in-house specialists. Apps, websites, social, video, branding, cloud, and SEO — all local, all expert, no handoffs.
          </p>
        </div>
        <div className="md:col-span-2 font-mono text-[10px] text-muted-foreground space-y-3 uppercase tracking-[0.2em]">
          <p className="text-foreground mb-4">Services</p>
          <Link to="/services/websites" className="block hover:text-primary transition-colors">Websites</Link>
          <Link to="/services/mobile-apps" className="block hover:text-primary transition-colors">Mobile Apps</Link>
          <Link to="/services/social-media" className="block hover:text-primary transition-colors">Social Media</Link>
          <Link to="/services/video-production" className="block hover:text-primary transition-colors">Video</Link>
          <Link to="/services/branding" className="block hover:text-primary transition-colors">Branding</Link>
          <Link to="/services/seo" className="block hover:text-primary transition-colors">SEO</Link>
        </div>
        <div className="md:col-span-2 font-mono text-[10px] text-muted-foreground space-y-3 uppercase tracking-[0.2em]">
          <p className="text-foreground mb-4">Company</p>
          <Link to="/work" className="block hover:text-primary transition-colors">Our Work</Link>
          <Link to="/about" className="block hover:text-primary transition-colors">About</Link>
          <Link to="/blog" className="block hover:text-primary transition-colors">Journal</Link>
          <Link to="/houston" className="block hover:text-primary transition-colors">Houston</Link>
          <Link to="/contact" className="block hover:text-primary transition-colors">Contact</Link>
        </div>
        <div className="md:col-span-2 font-mono text-[10px] text-muted-foreground space-y-3 uppercase tracking-[0.2em]">
          <p className="text-foreground mb-4">Studio</p>
          <p>Houston, TX</p>
          <a href="tel:+12819017016" className="block hover:text-primary transition-colors">+1 (281) 901-7016</a>
        </div>
        <div className="md:col-span-2 font-mono text-[10px] text-muted-foreground space-y-3 uppercase tracking-[0.2em]">
          <p className="text-foreground mb-4">Channels</p>
          <a href="#" className="block hover:text-primary transition-colors">Instagram ↗</a>
          <a href="#" className="block hover:text-primary transition-colors">LinkedIn ↗</a>
          <a href="#" className="block hover:text-primary transition-colors">Clutch.co ↗</a>
          <a href="#" className="block hover:text-primary transition-colors">Dribbble ↗</a>
        </div>
      </div>
      <div className="mt-16 pt-6 border-t border-border flex flex-col md:flex-row justify-between gap-4 font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
        <p>&copy; {new Date().getFullYear()} Atlas Houston Studio LLC · All rights reserved</p>
        <p>29.7604°N · 95.3698°W</p>
      </div>
    </footer>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-display grain">
      <ScrollProgress />
      <SiteHeader />
      <main className="relative z-10 pt-20">{children}</main>
      <SiteFooter />
    </div>
  );
}

export function SiteOutletLayout() {
  return (
    <SiteLayout>
      <Outlet />
    </SiteLayout>
  );
}
