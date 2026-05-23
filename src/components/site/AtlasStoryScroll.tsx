import FlowArt, { FlowSection } from "@/components/ui/story-scroll";
import { Link } from "@tanstack/react-router";

export function AtlasStoryScroll() {
  return (
    <FlowArt aria-label="Atlas Houston story">
      {/* 01 — Who we are */}
      <FlowSection
        className="bg-background text-foreground"
        aria-label="Who we are"
      >
        <div className="relative h-screen flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 py-20 emerald-wash">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-primary" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
              01 — Who we are
            </p>
          </div>

          <div className="max-w-6xl">
            <h2 className="font-serif text-[2.4rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em]">
              <span className="block">A senior</span>
              <span className="block italic text-gold">Houston studio.</span>
              <span className="block">Partner-led work.</span>
            </h2>
            <p className="mt-8 font-display text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Atlas Houston is a thirteen-person design and engineering studio in EaDo. No
              juniors on the wheel. Every engagement is owned by the partner who pitched it.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
            {[
              ["13", "Senior team"],
              ["07", "Years in Houston"],
              ["140+", "Texas projects shipped"],
              ["24/7", "Owner-on-call"],
            ].map(([n, l]) => (
              <div key={l} className="bg-background p-5 sm:p-6">
                <div className="font-serif text-3xl sm:text-4xl text-gold">{n}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FlowSection>

      {/* 02 — What we do */}
      <FlowSection
        className="bg-card text-foreground border-t border-border"
        aria-label="What we do"
      >
        <div className="relative h-screen flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 py-20">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-primary" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
              02 — What we do
            </p>
          </div>

          <div className="max-w-6xl">
            <h2 className="font-serif text-[2.4rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em]">
              <span className="block">Apps. Websites.</span>
              <span className="block italic text-gold">Brand. Cloud. SEO.</span>
            </h2>
            <p className="mt-8 font-display text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Five disciplines, one accountable team. We design the brand, ship the product,
              host the infrastructure, and rank it on Google — under one roof.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-px bg-border border border-border">
            {[
              ["Mobile Apps", "iOS · Android · RN"],
              ["Websites", "Marketing · Portals"],
              ["Branding", "Naming · Identity"],
              ["Cloud", "Hosting · 24/7"],
              ["SEO", "Local · Technical"],
            ].map(([t, s]) => (
              <div key={t} className="bg-background p-5 sm:p-6">
                <div className="font-serif text-xl sm:text-2xl">{t}</div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3">
                  {s}
                </div>
              </div>
            ))}
          </div>
        </div>
      </FlowSection>

      {/* 03 — Why we do it */}
      <FlowSection
        className="bg-background text-foreground border-t border-border"
        aria-label="Why we do it"
      >
        <div className="relative h-screen flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 py-20 emerald-wash">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-primary" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
              03 — Why we do it
            </p>
          </div>

          <div className="max-w-6xl">
            <h2 className="font-serif text-[2.4rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em]">
              <span className="block">Houston deserves</span>
              <span className="block italic text-gold">software built here.</span>
            </h2>
            <p className="mt-8 font-display text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Offshore vendors disappear when the database fails at 2 a.m. We don't. Local
              accountability, local talent, and a studio you can walk into.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-px bg-border border border-border">
            {[
              ["Accountability", "The partner who sold it ships it. Single throat to choke."],
              ["Craft", "Hand-built systems. No template farms. No outsourced code."],
              ["Longevity", "We maintain what we ship — for years, not sprints."],
            ].map(([t, d]) => (
              <div key={t} className="bg-background p-5 sm:p-6">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                  Principle
                </div>
                <div className="font-serif text-2xl mb-2">{t}</div>
                <p className="font-display text-sm text-muted-foreground leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </FlowSection>

      {/* 04 — Where we do it */}
      <FlowSection
        className="bg-card text-foreground border-t border-border"
        aria-label="Where we do it"
      >
        <div className="relative h-screen flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 py-20">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-primary" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
              04 — Where we do it
            </p>
          </div>

          <div className="max-w-6xl">
            <h2 className="font-serif text-[2.4rem] sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] tracking-[-0.02em]">
              <span className="block">All of</span>
              <span className="block italic text-gold">Greater Houston.</span>
            </h2>
            <p className="mt-8 font-display text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              EaDo studio. On-site visits across the metro every week — from Sugar Land to
              The Woodlands, Katy to Pearland.
            </p>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-8 gap-px bg-border border border-border">
            {[
              "Houston",
              "Sugar Land",
              "The Woodlands",
              "Katy",
              "Pearland",
              "Spring",
              "Cypress",
              "Missouri City",
            ].map((c) => (
              <div key={c} className="bg-background p-4 sm:p-5">
                <div className="font-serif text-sm sm:text-base leading-tight">{c}</div>
              </div>
            ))}
          </div>
        </div>
      </FlowSection>

      {/* 05 — Begin */}
      <FlowSection
        className="bg-primary text-primary-foreground border-t border-border"
        aria-label="Begin"
      >
        <div className="relative h-screen flex flex-col justify-between px-5 sm:px-8 md:px-12 lg:px-16 py-20">
          <div className="flex items-center gap-4">
            <span className="block h-px w-12 bg-primary-foreground/60" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase opacity-80">
              05 — Begin
            </p>
          </div>

          <div className="max-w-6xl">
            <h2 className="font-serif text-[2.6rem] sm:text-7xl md:text-8xl lg:text-[9rem] leading-[0.95] tracking-[-0.02em]">
              <span className="block">Ready</span>
              <span className="block italic">to begin?</span>
            </h2>
            <p className="mt-8 font-display text-base sm:text-lg md:text-xl max-w-2xl leading-relaxed">
              Tell us what you're building. We'll come back within one business day with a
              scope, a rough timeline, and a price band.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/contact"
              className="px-8 py-5 bg-background text-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Start a Project →
            </Link>
            <Link
              to="/services"
              className="px-8 py-5 border border-primary-foreground/60 font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              See Services
            </Link>
          </div>
        </div>
      </FlowSection>
    </FlowArt>
  );
}
