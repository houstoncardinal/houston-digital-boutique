import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { ScrollProgress } from "./ScrollProgress";

const navItems = [
  { to: "/services", label: "Services" },
  { to: "/services/seo", label: "SEO" },
  { to: "/work", label: "Work" },
  { to: "/contact", label: "Inquire" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="fixed top-0 inset-x-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 border-b border-border/60 bg-background/60 backdrop-blur-xl">
      <Link to="/" className="flex items-center gap-3 group">
        <span className="font-mono text-primary font-bold text-xs md:text-sm tracking-widest transition-transform duration-700 group-hover:rotate-90 inline-block">
          [ ✦ ]
        </span>
        <span className="font-extrabold tracking-tighter text-base md:text-xl">
          ATLAS <span className="text-muted-foreground font-light">/ HOUSTON</span>
        </span>
      </Link>
      <div className="hidden md:flex gap-10 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
        {navItems.map((item) => {
          const active = item.to === pathname;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={
                active
                  ? "text-foreground"
                  : "hover:text-foreground transition-colors duration-500"
              }
            >
              <span className="relative">
                {item.label}
                {active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-px bg-primary" />
                )}
              </span>
            </Link>
          );
        })}
      </div>
      <Link
        to="/contact"
        className="md:hidden font-mono text-[10px] uppercase tracking-widest text-primary border border-primary px-3 py-2"
      >
        Inquire
      </Link>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="px-6 md:px-10 py-16 border-t border-border">
      <div className="grid md:grid-cols-12 gap-10">
        <div className="md:col-span-6">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-6">
            // Atlas Houston Studio
          </div>
          <h3 className="text-4xl md:text-6xl font-extrabold tracking-tighter leading-[0.9]">
            Built in Houston. <br /> Hosted by hand.
          </h3>
        </div>
        <div className="md:col-span-3 font-mono text-[10px] text-muted-foreground space-y-3 uppercase tracking-[0.2em]">
          <p className="text-foreground">Studio</p>
          <p>2412 Navigation Blvd</p>
          <p>EaDo, Houston TX 77003</p>
          <p>+1 (713) 555 — 0188</p>
        </div>
        <div className="md:col-span-3 font-mono text-[10px] text-muted-foreground space-y-3 uppercase tracking-[0.2em]">
          <p className="text-foreground">Channels</p>
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
