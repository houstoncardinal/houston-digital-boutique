import { Link, Outlet, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";

const navItems = [
  { to: "/services", label: "Services" },
  { to: "/work", label: "Work" },
  { to: "/", label: "Houston", hash: "houston" },
  { to: "/contact", label: "Inquire" },
] as const;

export function SiteHeader() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav className="sticky top-0 z-40 flex items-center justify-between px-6 md:px-10 py-5 border-b border-border bg-background/80 backdrop-blur-md">
      <Link to="/" className="flex items-center gap-3">
        <span className="font-mono text-primary font-bold text-xs md:text-sm">[ ARC-03 ]</span>
        <span className="font-extrabold tracking-tighter text-base md:text-xl">FORGEYARD HOUSTON</span>
      </Link>
      <div className="hidden md:flex gap-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
        {navItems.map((item) => {
          const active = item.to === pathname;
          return (
            <Link
              key={item.label}
              to={item.to}
              className={
                active
                  ? "text-foreground border-b border-primary pb-1"
                  : "hover:text-primary transition-colors"
              }
            >
              {item.label}
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
    <footer className="p-8 md:p-10 border-t border-border flex flex-col md:flex-row justify-between gap-8">
      <div className="font-mono text-[10px] text-muted-foreground space-y-2 uppercase">
        <p>&copy; {new Date().getFullYear()} Forgeyard Studio LLC</p>
        <p>Made in Houston, Texas</p>
      </div>
      <div className="font-mono text-[10px] text-muted-foreground flex gap-8 uppercase">
        <a href="#" className="hover:text-primary">Instagram</a>
        <a href="#" className="hover:text-primary">LinkedIn</a>
        <a href="#" className="hover:text-primary">Clutch.co</a>
      </div>
    </footer>
  );
}

export function GridOverlay() {
  return (
    <>
      <div className="pointer-events-none fixed top-0 left-1/4 w-px h-full bg-border/40 z-0" aria-hidden />
      <div className="pointer-events-none fixed top-0 left-2/4 w-px h-full bg-border/40 z-0" aria-hidden />
      <div className="pointer-events-none fixed top-0 left-3/4 w-px h-full bg-border/40 z-0" aria-hidden />
    </>
  );
}

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground font-display">
      <GridOverlay />
      <SiteHeader />
      <main className="relative z-10">{children}</main>
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
