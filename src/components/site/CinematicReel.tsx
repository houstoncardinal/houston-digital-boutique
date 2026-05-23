import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import cinematicHouston from "@/assets/cinematic-houston.jpg";
import cinematicGold from "@/assets/cinematic-gold.jpg";
import cinematicMarble from "@/assets/cinematic-marble.jpg";
import cinematicCraft from "@/assets/cinematic-craft.jpg";
import houstonVideo from "@/assets/cinematic-houston.mp4.asset.json";

/**
 * CinematicReel — luxury parallax + ambient video section.
 * Mouse-reactive frames, scroll parallax, drifting gold particles,
 * masked headline reveal. Pure presentation, no business logic.
 */
export function CinematicReel() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = sectionRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight || 1;
        // -1 (above) → 0 (centered) → 1 (below)
        const progress = (rect.top + rect.height / 2 - vh / 2) / vh;
        setScrollY(Math.max(-1.2, Math.min(1.2, progress)));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMove = (e: React.MouseEvent) => {
    const el = sectionRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - r.left) / r.width - 0.5) * 2,
      y: ((e.clientY - r.top) / r.height - 0.5) * 2,
    });
  };

  return (
    <section
      ref={sectionRef}
      onMouseMove={onMove}
      aria-label="Cinematic reel"
      className="relative overflow-hidden bg-background border-y border-border"
    >
      {/* Ambient video backdrop */}
      <div className="relative h-[140vh] sm:h-[160vh]">
        <video
          src={houstonVideo.url}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
          style={{
            transform: `scale(1.15) translate3d(${mouse.x * -12}px, ${
              scrollY * -40 + mouse.y * -10
            }px, 0)`,
            transition: "transform 600ms cubic-bezier(0.22, 1, 0.36, 1)",
            filter: "saturate(1.05) contrast(1.05)",
          }}
        />

        {/* Cinematic gradient stack */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/30 to-background pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,hsl(var(--background))_85%)] pointer-events-none" />
        <div className="absolute inset-0 mix-blend-overlay opacity-40 bg-[linear-gradient(115deg,transparent_30%,rgba(201,168,76,0.18)_50%,transparent_70%)] pointer-events-none" />

        {/* Drifting gold particles */}
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 28 }).map((_, i) => {
            const left = (i * 37) % 100;
            const delay = (i * 0.37) % 8;
            const size = 1 + ((i * 13) % 4);
            const dur = 14 + ((i * 7) % 12);
            return (
              <span
                key={i}
                className="absolute rounded-full bg-gold/60"
                style={{
                  left: `${left}%`,
                  bottom: "-10%",
                  width: size,
                  height: size,
                  animation: `cinematic-drift ${dur}s linear ${delay}s infinite`,
                  boxShadow: "0 0 8px rgba(201,168,76,0.55)",
                }}
              />
            );
          })}
        </div>

        {/* Film grain */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.6'/></svg>\")",
          }}
        />

        {/* HEADLINE — sticky cinematic title */}
        <div className="sticky top-0 h-screen flex items-center px-5 sm:px-10 md:px-16">
          <div className="relative max-w-7xl w-full">
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-12 bg-gold" />
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-gold">
                Reel · 2026 · Houston
              </span>
            </div>

            <h2
              className="font-serif text-[3rem] sm:text-7xl md:text-8xl lg:text-[10rem] leading-[0.92] tracking-[-0.025em]"
              style={{
                transform: `translate3d(${mouse.x * -18}px, ${
                  scrollY * 30
                }px, 0)`,
                transition: "transform 800ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <span className="block">Cinema-grade</span>
              <span className="block italic text-gold">craft.</span>
              <span className="block text-foreground/80">Shipped from</span>
              <span className="block italic">the bayou.</span>
            </h2>

            <p
              className="mt-10 max-w-xl font-display text-base sm:text-lg md:text-xl text-foreground/75 leading-relaxed"
              style={{
                transform: `translate3d(0, ${scrollY * 50}px, 0)`,
                transition: "transform 800ms cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              Every brand we touch gets the same treatment as a feature film —
              color graded, art directed, and engineered with the patience of a
              master craftsman. This is what Houston-built looks like when no
              corners are cut.
            </p>
          </div>
        </div>
      </div>

      {/* PARALLAX TRIPTYCH */}
      <div className="relative px-5 sm:px-10 md:px-16 py-24 sm:py-32">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 max-w-7xl mx-auto">
          <FrameCard
            src={cinematicGold}
            offset={scrollY * -60}
            mouseX={mouse.x * 10}
            mouseY={mouse.y * 10}
            className="col-span-12 sm:col-span-6 lg:col-span-5 aspect-[3/4]"
            tag="01 / Liquid"
            title="Gold-grade brand systems"
          />
          <FrameCard
            src={cinematicMarble}
            offset={scrollY * -120}
            mouseX={mouse.x * -14}
            mouseY={mouse.y * -8}
            className="col-span-12 sm:col-span-7 aspect-[16/10] sm:translate-y-12"
            tag="02 / Material"
            title="Architecture-first interfaces"
          />
          <FrameCard
            src={cinematicCraft}
            offset={scrollY * -90}
            mouseX={mouse.x * 16}
            mouseY={mouse.y * 6}
            className="col-span-12 sm:col-span-8 aspect-[16/9]"
            tag="03 / Craft"
            title="Hand-built, line by line"
          />
          <FrameCard
            src={cinematicHouston}
            offset={scrollY * -40}
            mouseX={mouse.x * -10}
            mouseY={mouse.y * -12}
            className="col-span-12 sm:col-span-4 aspect-[3/4] sm:translate-y-20"
            tag="04 / Place"
            title="Built in Houston, Texas"
          />
        </div>

        <div className="mt-24 sm:mt-32 flex flex-col items-start gap-8 max-w-3xl mx-auto text-center sm:items-center">
          <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.4em] uppercase text-primary">
            // The standard
          </span>
          <p className="font-serif text-3xl sm:text-5xl md:text-6xl leading-[1.05] tracking-[-0.02em]">
            We don't ship anything we wouldn't{" "}
            <span className="italic text-gold">screen at a premiere.</span>
          </p>
          <Link
            to="/contact"
            className="cta-lux mt-4 px-10 py-5 bg-gold text-background font-mono text-[11px] font-semibold uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-colors"
          >
            Direct your project →
          </Link>
        </div>
      </div>
    </section>
  );
}

function FrameCard({
  src,
  offset,
  mouseX,
  mouseY,
  className,
  tag,
  title,
}: {
  src: string;
  offset: number;
  mouseX: number;
  mouseY: number;
  className?: string;
  tag: string;
  title: string;
}) {
  return (
    <figure
      className={`group relative overflow-hidden bg-card border border-border ${className ?? ""}`}
      style={{
        transform: `translate3d(${mouseX}px, ${offset + mouseY}px, 0)`,
        transition: "transform 700ms cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      <img
        src={src}
        alt={title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover scale-110 group-hover:scale-100 transition-transform duration-[1400ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent" />
      <div className="absolute inset-0 ring-1 ring-inset ring-gold/0 group-hover:ring-gold/40 transition-colors duration-700" />
      <figcaption className="absolute bottom-0 left-0 right-0 p-4 sm:p-6">
        <div className="font-mono text-[9px] sm:text-[10px] tracking-[0.3em] uppercase text-gold mb-2">
          {tag}
        </div>
        <div className="font-serif text-lg sm:text-xl md:text-2xl lg:text-3xl leading-[1.1] text-foreground">
          {title}
        </div>
      </figcaption>
    </figure>
  );
}
