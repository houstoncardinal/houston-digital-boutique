import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import heroTexture from "@/assets/hero-texture.jpg";
import { AtlasStoryScroll } from "@/components/site/AtlasStoryScroll";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Atlas Houston — Web Design, App Development, Branding & SEO" },
      {
        name: "description",
        content:
          "Atlas Houston designs, builds, hosts, and supports websites and mobile apps for business owners across Greater Houston. Senior team. Local studio. Real accountability.",
      },
      { property: "og:title", content: "Atlas Houston — Digital products for Texas business" },
      {
        property: "og:description",
        content:
          "A Houston design and engineering studio. Apps, websites, branding, cloud and SEO for owners across Greater Houston.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const disciplines = [
  {
    n: "01",
    img: capApps,
    title: "Mobile Apps",
    one: "iOS · Android · React Native",
    href: "/services/mobile-apps",
  },
  {
    n: "02",
    img: capWebsites,
    title: "Websites",
    one: "Marketing · E-commerce · Portals",
    href: "/services/websites",
  },
  {
    n: "03",
    img: capBranding,
    title: "Branding",
    one: "Naming · Marks · Identity systems",
    href: "/services/branding",
  },
  {
    n: "04",
    img: capCloud,
    title: "Cloud & SEO",
    one: "Hosting · 24/7 support · Local SEO",
    href: "/services/cloud-hosting",
  },
];

const stepLinks = [
  { kicker: "Who we are", title: "A senior Houston studio.", href: "/about", fallback: "/services" },
  { kicker: "What we do", title: "Apps, sites, brand, cloud, SEO.", href: "/services" },
  { kicker: "Where we work", title: "All of Greater Houston.", href: "/houston" },
  { kicker: "Begin", title: "Tell us about your project.", href: "/contact" },
];

function Index() {
  return (
    <SiteLayout>
      {/* HERO — one promise, two buttons */}
      <section className="relative px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-28 md:pb-32 border-b border-border overflow-hidden emerald-wash">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-[140px] animate-orb"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-0 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[140px] animate-orb-alt"
        />
        <img
          src={heroTexture}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-[0.10] pointer-events-none mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-8 animate-reveal">
            <span className="block h-px w-12 bg-primary" />
            <span className="font-mono text-primary text-[10px] sm:text-[11px] tracking-[0.35em] uppercase">
              Atlas · Houston · Est. 2018
            </span>
          </div>

          <h1 className="font-serif text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] leading-[0.96] tracking-[-0.02em] text-balance mb-8 sm:mb-10">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>We build websites,</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "120ms" }}>apps, and brands</span></span>
            <br />
            <span className="mask-line">
              <span className="italic text-gold" style={{ animationDelay: "240ms" }}>
                for Texas business.
              </span>
            </span>
          </h1>

          <Reveal delay={420} className="max-w-2xl">
            <p className="font-display text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              A senior Houston studio. We design, build, host, and support digital products for
              owners across Greater Houston — apps for fifty-truck operations, sites for the
              Med Center, brands for restaurants on Westheimer.
            </p>
          </Reveal>

          <Reveal delay={560} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="cta-lux px-8 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors text-center"
            >
              Start a Project →
            </Link>
            <Link
              to="/services"
              className="cta-lux px-8 py-5 border border-border text-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors text-center"
            >
              See What We Do
            </Link>
          </Reveal>
        </div>
      </section>

      {/* WHAT WE DO — four big tiles linking out */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-12">
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-4">
                What We Do
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-[-0.02em]">
                Four disciplines. <em className="text-gold italic">One studio</em>.
              </h2>
            </div>
            <Link
              to="/services"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary self-start sm:self-auto"
            >
              All services →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {disciplines.map((d, i) => (
              <Reveal key={d.n} delay={i * 70}>
                <Link
                  to={d.href}
                  className="group block bg-background h-full overflow-hidden"
                >
                  <div className="aspect-[4/3] w-full overflow-hidden border-b border-border">
                    <img
                      src={d.img}
                      alt={d.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-3">
                      {d.n}
                    </div>
                    <h3 className="font-serif text-2xl leading-tight tracking-[-0.015em] mb-2 group-hover:text-gold transition-colors duration-500">
                      {d.title}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                      {d.one}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE — city quick links */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-28 border-b border-border emerald-wash">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-end mb-10">
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-4">
                Where We Work
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight tracking-[-0.02em]">
                Built for <em className="text-gold italic">Greater Houston</em>.
              </h2>
            </div>
            <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed">
              Studio in EaDo. On-site visits across the metro every week. Pick your city for a
              market-specific breakdown.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
            {cities.map((c) => (
              <Link
                key={c.slug}
                to="/houston/$city"
                params={{ city: c.slug }}
                className="group bg-background p-5 sm:p-6 hover:bg-card transition-colors"
              >
                <div className="font-serif text-xl sm:text-2xl leading-tight group-hover:text-gold transition-colors duration-500">
                  {c.name}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                  {c.region.split("·")[0].trim()}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-8">
            <Link
              to="/houston"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-primary hover:underline underline-offset-4"
            >
              All Greater Houston service areas →
            </Link>
          </div>
        </div>
      </section>

      {/* HOW THIS SITE WORKS — explicit walkthrough */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-4">
            Get Oriented
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.02em] mb-10 max-w-3xl">
            Four short pages. <em className="text-gold italic">Pick where to go next</em>.
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {stepLinks.map((s, i) => (
              <Link
                key={s.kicker}
                to={s.href}
                className="group bg-background p-6 sm:p-7 h-full block hover:bg-card transition-colors"
              >
                <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-4">
                  {String(i + 1).padStart(2, "0")} · {s.kicker}
                </div>
                <h3 className="font-serif text-xl sm:text-2xl leading-snug tracking-[-0.015em] mb-6 group-hover:text-gold transition-colors duration-500">
                  {s.title}
                </h3>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  <span>Open</span>
                  <span className="block h-px w-6 bg-primary transition-all duration-500 group-hover:w-12" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] max-w-3xl text-balance">
            Ready to <em className="italic">begin</em>?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="font-display text-base sm:text-lg font-medium leading-relaxed">
              Tell us what you're building. We'll come back within one business day with a
              scope, a rough timeline, and a price band.
            </p>
            <Link
              to="/contact"
              className="self-start inline-block px-8 py-5 bg-background text-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Start a Project →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
