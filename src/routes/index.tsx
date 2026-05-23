import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VerticalNav } from "@/components/site/VerticalNav";
import { Reveal } from "@/components/site/Reveal";
import heroTexture from "@/assets/hero-texture.jpg";
import workBayou from "@/assets/work-bayou.jpg";
import workSummit from "@/assets/work-summit.jpg";
import capApps from "@/assets/cap-apps.jpg";
import capWebsites from "@/assets/cap-websites.jpg";
import capBranding from "@/assets/cap-branding.jpg";
import capCloud from "@/assets/cap-cloud.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Atlas Houston — Apps, Websites, Branding & Cloud for Texas Business" },
      {
        name: "description",
        content:
          "Atlas Houston is a Texas design and engineering studio that builds, brands, hosts, and supports mobile apps and websites for business owners across Greater Houston.",
      },
      { property: "og:title", content: "Atlas Houston — Digital products for Texas business" },
      {
        property: "og:description",
        content:
          "Who we are. What we do. Why we do it. Where we do it. A senior Houston team building apps, websites, brands and cloud platforms for owners across Texas.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const sections = [
  { id: "intro", label: "Atlas" },
  { id: "who", label: "Who We Are" },
  { id: "what", label: "What We Do" },
  { id: "why", label: "Why We Do It" },
  { id: "where", label: "Where We Do It" },
  { id: "proof", label: "Proof" },
  { id: "commence", label: "Begin" },
];

const disciplines = [
  {
    n: "01",
    img: capApps,
    title: "Mobile Applications",
    note: "iOS · Android · React Native",
    blurb:
      "Native and cross-platform applications engineered for the field, the floor, and the front desk — production-grade software that holds up to gloved hands and patchy LTE.",
    href: "/services/mobile-apps",
  },
  {
    n: "02",
    img: capWebsites,
    title: "Websites & Web Apps",
    note: "Marketing · E-commerce · Portals",
    blurb:
      "Custom-engineered websites and web platforms that load instantly, rank on the first page, and convert — no template lock-in, fully owned codebases.",
    href: "/services/websites",
  },
  {
    n: "03",
    img: capBranding,
    title: "Branding & Identity",
    note: "Naming · Marks · Systems",
    blurb:
      "Identity systems built to scale across packaging, signage, livery, app icons, and 4K hero video — verbal, visual, and operational in one cohesive language.",
    href: "/services/branding",
  },
  {
    n: "04",
    img: capCloud,
    title: "Cloud, Hosting & Support",
    note: "24/7 · SLA · Observability",
    blurb:
      "Hardened multi-region infrastructure with on-call engineers, automated backups, observability dashboards, and a same-day SLA for retainer clients.",
    href: "/services/cloud-hosting",
  },
];

const principles = [
  {
    k: "Senior, in-house, accountable",
    v: "Every line of code, every brand mark, every server is owned by a 10+ year practitioner inside our Houston studio. No offshore handoffs, no agency theater.",
  },
  {
    k: "Built to be operated",
    v: "We do not ship and disappear. Every product we make is documented, monitored, and supported by the same team that built it — for years, not months.",
  },
  {
    k: "Plain talk, fixed scopes",
    v: "Weekly working software. Fixed-fee phases. Owners know what they're buying, what it costs, and when it ships before we write a single line of code.",
  },
];

const regions = [
  { area: "EaDo · Heights · Montrose", note: "Studio + creative core" },
  { area: "Energy Corridor · Galleria", note: "Enterprise & legal clients" },
  { area: "Sugar Land · Pearland", note: "Healthcare & multi-site retail" },
  { area: "Spring · The Woodlands", note: "Service ops & field software" },
  { area: "Port of Houston · Pasadena", note: "Logistics & industrial" },
  { area: "Greater Texas", note: "Austin · San Antonio · DFW remote" },
];

const proofWork = [
  { img: workBayou, t: "Bayou Logistics Platform", y: "2024", tag: "Web + iOS + Brand" },
  { img: workSummit, t: "Summit Energy IoT Suite", y: "2023", tag: "iOS + Android + Cloud" },
];

const stats = [
  { k: "120+", l: "Projects shipped from Houston" },
  { k: "99.99%", l: "Hosting uptime · trailing 24mo" },
  { k: "$42M+", l: "Client revenue routed through our builds" },
  { k: "14yr", l: "Average practitioner experience" },
];

function SectionLabel({ kicker, index }: { kicker: string; index: string }) {
  return (
    <div className="flex items-center gap-4 mb-8">
      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-primary">
        {index}
      </span>
      <span className="block h-px w-10 bg-primary/60" />
      <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
        {kicker}
      </span>
    </div>
  );
}

function Index() {
  return (
    <SiteLayout>
      <VerticalNav sections={sections} />

      {/* ───────────────────────────── INTRO / HERO ───────────────────────────── */}
      <section
        id="intro"
        className="relative px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-40 pb-24 sm:pb-32 md:pb-40 border-b border-border overflow-hidden scroll-mt-24 emerald-wash"
      >
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-8 sm:mb-12 animate-reveal">
            <span className="block h-px w-10 sm:w-14 bg-primary" />
            <span className="font-mono text-primary text-[10px] sm:text-[11px] tracking-[0.35em] uppercase">
              Atlas · Houston · Est. 2018
            </span>
          </div>

          <h1 className="font-serif text-[2.5rem] xs:text-[3rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] leading-[0.95] tracking-[-0.02em] text-balance mb-10 sm:mb-14">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>A studio for</span></span>
            <br />
            <span className="mask-line">
              <span className="italic text-gold" style={{ animationDelay: "180ms" }}>
                Texas&nbsp;business
              </span>
            </span>
            <span className="mask-line"><span style={{ animationDelay: "340ms" }}>.</span></span>
          </h1>

          <Reveal delay={500} className="max-w-2xl">
            <p className="font-display text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Atlas Houston designs, engineers, brands, hosts, and supports mobile applications
              and websites for owners across Greater Houston — from solo founders to operators
              running fifty trucks.
            </p>
          </Reveal>

          <Reveal delay={680} className="mt-10 sm:mt-14 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="cta-lux px-7 sm:px-9 py-4 sm:py-5 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors text-center"
            >
              Begin a Project →
            </Link>
            <a
              href="#who"
              className="cta-lux px-7 sm:px-9 py-4 sm:py-5 border border-border text-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors text-center"
            >
              Read the Atlas ↓
            </a>
          </Reveal>

          {/* Wayfinding */}
          <div className="relative mt-16 sm:mt-24 pt-6 sm:pt-8 border-t border-border grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
            {[
              ["I", "Who we are"],
              ["II", "What we do"],
              ["III", "Why we do it"],
              ["IV", "Where we do it"],
            ].map(([n, l]) => (
              <div key={n} className="flex items-baseline gap-3">
                <span className="text-primary">{n}</span>
                <span className="text-foreground">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────── I · WHO WE ARE ───────────────────────────── */}
      <section
        id="who"
        className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36 border-b border-border scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="I" kicker="Who We Are" />
            <Reveal>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] text-balance">
                A senior Houston team, <em className="text-gold not-italic font-serif italic">building under one roof</em>.
              </h2>
            </Reveal>
          </div>
          <div className="lg:col-span-7 space-y-8 sm:space-y-10">
            <Reveal delay={120}>
              <p className="dropcap font-display text-lg sm:text-xl leading-relaxed text-foreground/90">
                Atlas Houston is a thirteen-person design and engineering studio in EaDo. We
                are product designers, native mobile engineers, brand directors, and platform
                operators who chose to keep our practice small, senior, and accountable. Every
                project we take on is led personally by a partner — not handed to a junior team
                or routed offshore. We have shipped software for owner-operated businesses,
                venture-backed startups, and mid-market enterprises across Texas since 2018.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="hairline-gold" />
            </Reveal>

            <div className="grid sm:grid-cols-3 gap-px bg-border">
              {principles.map((p, i) => (
                <Reveal key={p.k} delay={300 + i * 100}>
                  <div className="bg-background p-6 sm:p-7 h-full">
                    <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-3">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <h3 className="font-serif text-xl sm:text-2xl leading-snug mb-3">{p.k}</h3>
                    <p className="font-display text-sm text-muted-foreground leading-relaxed">
                      {p.v}
                    </p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── II · WHAT WE DO ───────────────────────────── */}
      <section
        id="what"
        className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36 border-b border-border scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 mb-14 sm:mb-20">
            <div className="lg:col-span-5">
              <SectionLabel index="II" kicker="What We Do" />
              <Reveal>
                <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] text-balance">
                  Four disciplines. <em className="text-gold not-italic italic">One studio</em>.
                </h2>
              </Reveal>
            </div>
            <div className="lg:col-span-7 lg:pt-20">
              <Reveal delay={120}>
                <p className="font-display text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                  We deliberately keep our practice within four interlocking capabilities so
                  every project is built by the same team — strategy, brand, product, and
                  platform — sitting in the same room.
                </p>
              </Reveal>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
            {disciplines.map((d, i) => (
              <Reveal key={d.n} delay={i * 90}>
                <Link
                  to={d.href}
                  className="group relative block bg-background p-6 sm:p-8 md:p-10 h-full overflow-hidden"
                >
                  <div className="aspect-[16/10] w-full overflow-hidden mb-6 border border-border">
                    <img
                      src={d.img}
                      alt={d.title}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-[1400ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                    />
                  </div>
                  <div className="flex items-baseline gap-4 mb-3">
                    <span className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">
                      {d.n}
                    </span>
                    <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
                      {d.note}
                    </span>
                  </div>
                  <h3 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.05] tracking-[-0.015em] mb-4 transition-colors duration-500 group-hover:text-gold">
                    {d.title}
                  </h3>
                  <p className="font-display text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
                    {d.blurb}
                  </p>
                  <div className="mt-6 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    <span>Explore practice</span>
                    <span className="block h-px w-6 bg-primary transition-all duration-500 group-hover:w-12" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───────────────────────────── III · WHY WE DO IT ───────────────────────────── */}
      <section
        id="why"
        className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36 border-b border-border scroll-mt-24 emerald-wash"
      >
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="III" kicker="Why We Do It" />
            <Reveal>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] text-balance">
                Houston <em className="text-gold not-italic italic">builds things</em>. So do we.
              </h2>
            </Reveal>
          </div>

          <div className="lg:col-span-7 space-y-10">
            <Reveal delay={120}>
              <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.25] tracking-[-0.01em] text-foreground/95 text-balance border-l-2 border-primary pl-6 sm:pl-8">
                We believe small and mid-market business owners deserve the same caliber of
                digital infrastructure that Fortune 500s buy — engineered with care, branded
                with intent, and supported by people who answer the phone.
              </blockquote>
            </Reveal>

            <Reveal delay={220}>
              <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                For too long, the choice for Houston operators has been a cheap template that
                breaks in eighteen months, or a coastal agency that bills like a law firm and
                ships like a contractor. Atlas Houston exists to give Texas owners a third
                option: a senior, local studio that builds things that last and stands behind
                them in person.
              </p>
            </Reveal>

            <Reveal delay={320}>
              <div className="grid sm:grid-cols-4 gap-px bg-border border border-border">
                {stats.map((s) => (
                  <div key={s.l} className="bg-background p-5 sm:p-6">
                    <div className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[-0.02em] text-gold">
                      {s.k}
                    </div>
                    <div className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-3 leading-snug">
                      {s.l}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── IV · WHERE WE DO IT ───────────────────────────── */}
      <section
        id="where"
        className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36 border-b border-border scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-5">
            <SectionLabel index="IV" kicker="Where We Do It" />
            <Reveal>
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] text-balance mb-8">
                EaDo studio. <em className="text-gold not-italic italic">All of Greater Houston</em>.
              </h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed max-w-md">
                Our studio sits on Navigation Boulevard in EaDo. We work on-site across the
                metro every week — Heights to Sugar Land, Pearland to the Energy Corridor —
                and remotely across Texas for clients in Austin, San Antonio, and DFW.
              </p>
            </Reveal>
            <Reveal delay={220}>
              <div className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground space-y-2">
                <p className="text-foreground">Atlas Houston Studio</p>
                <p>2412 Navigation Blvd · EaDo · 77003</p>
                <p>29.7604° N · 95.3698° W</p>
                <p className="text-primary pt-2">+1 (713) 555 — 0188</p>
              </div>
            </Reveal>
          </div>

          <div className="lg:col-span-7">
            <div className="grid sm:grid-cols-2 gap-px bg-border border border-border">
              {regions.map((r, i) => (
                <Reveal key={r.area} delay={i * 70}>
                  <div className="bg-background p-5 sm:p-6 md:p-7 h-full flex flex-col justify-between gap-6 min-h-[10rem]">
                    <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em]">
                      {String(i + 1).padStart(2, "0")} / 06
                    </div>
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl leading-snug mb-2">
                        {r.area}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                        {r.note}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ───────────────────────────── PROOF ───────────────────────────── */}
      <section
        id="proof"
        className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36 border-b border-border scroll-mt-24"
      >
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10 sm:mb-14">
            <div>
              <SectionLabel index="V" kicker="Proof of Work" />
              <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.02] tracking-[-0.02em]">
                Shipped in <em className="text-gold not-italic italic">Texas</em>.
              </h2>
            </div>
            <Link
              to="/work"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors self-start sm:self-auto"
            >
              View all projects →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
            {proofWork.map((p, i) => (
              <Reveal key={p.t} delay={i * 120}>
                <article className="group cursor-pointer">
                  <div className="w-full aspect-[4/3] border border-border overflow-hidden mb-5">
                    <img
                      src={p.img}
                      alt={p.t}
                      width={1280}
                      height={960}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
                    />
                  </div>
                  <div className="flex justify-between items-baseline gap-4">
                    <div>
                      <h3 className="font-serif text-xl sm:text-2xl md:text-3xl leading-tight tracking-[-0.01em] group-hover:text-gold transition-colors duration-500">
                        {p.t}
                      </h3>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                        {p.tag}
                      </p>
                    </div>
                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] px-2.5 py-1 border border-border whitespace-nowrap">
                      {p.y}
                    </span>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal delay={300}>
            <blockquote className="mt-16 sm:mt-24 max-w-5xl font-serif text-2xl sm:text-3xl md:text-4xl leading-[1.25] tracking-[-0.01em] text-balance">
              <span className="text-gold">“</span>They rebuilt our scheduling app in eleven
              weeks and have hosted it without a single outage since. It runs the entire field
              operation — fifty trucks, two hundred jobs a day. Best vendor decision we've made
              in twenty years.<span className="text-gold">”</span>
            </blockquote>
            <div className="mt-6 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              — Owner, HVAC Services Co. // Northwest Houston
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────────────────────── BEGIN ───────────────────────────── */}
      <section
        id="commence"
        className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-36 bg-primary text-primary-foreground scroll-mt-24 overflow-hidden"
      >
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:justify-between lg:items-end gap-10 lg:gap-16">
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem] leading-[0.95] tracking-[-0.025em] max-w-3xl text-balance">
            Ready to <em className="italic">begin</em>?
          </h2>
          <div className="flex flex-col gap-6 sm:gap-8 max-w-md">
            <p className="font-display text-base sm:text-lg md:text-xl font-medium leading-relaxed">
              We take on a small number of new builds each quarter so every project gets senior
              attention from day one. Tell us what you're building.
            </p>
            <div>
              <Link
                to="/contact"
                className="inline-block px-8 py-5 bg-background text-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Start a Project →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
