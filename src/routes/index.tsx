import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { VerticalNav } from "@/components/site/VerticalNav";
import { CapabilitySlider, type SlideItem } from "@/components/site/CapabilitySlider";
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
      { title: "Forgeyard Houston — Apps, Websites, Branding & Cloud for Texas Business" },
      {
        name: "description",
        content:
          "Houston design and engineering studio. We build, host, brand, and support mobile apps, websites, and digital products for business owners across Texas.",
      },
      { property: "og:title", content: "Forgeyard Houston — Steel-grade digital products" },
      {
        property: "og:description",
        content:
          "Apps, websites, branding, cloud hosting and 24/7 support for Houston businesses. Full lifecycle, one senior team.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const sections = [
  { id: "intro", label: "Intro" },
  { id: "capabilities", label: "Capabilities" },
  { id: "apps", label: "Mobile Apps" },
  { id: "websites", label: "Websites" },
  { id: "branding", label: "Branding" },
  { id: "cloud", label: "Cloud & Support" },
  { id: "showcase", label: "Showcase" },
  { id: "process", label: "Process" },
  { id: "houston", label: "Houston" },
  { id: "field-report", label: "Field Report" },
  { id: "commence", label: "Commence" },
];

const appsItems: SlideItem[] = [
  {
    img: capApps,
    kicker: "iOS · Android · React Native",
    title: "Field Ops App — HVAC Co.",
    meta: "50 trucks · 200 jobs/day",
    blurb: "Dispatch, routing, invoicing and customer signatures, deployed to 50 service trucks across Harris County.",
  },
  {
    img: workSummit,
    kicker: "iOS · IoT · BLE",
    title: "Summit Energy Wellpad",
    meta: "Real-time telemetry · offline-first",
    blurb: "Offline-first iOS app for wellpad operators with live sensor feeds, alarms, and crew checklists in low-signal yards.",
  },
  {
    img: workBayou,
    kicker: "iOS · Swift",
    title: "Bayou Logistics Driver",
    meta: "Sub-150ms route updates",
    blurb: "Native iOS driver app for a Port of Houston freight broker. Live load updates, ELD-aware, paperless BOL capture.",
  },
  {
    img: capApps,
    kicker: "Android · Kotlin",
    title: "Heights Clinic Patient",
    meta: "HIPAA-aware build · 4.9★",
    blurb: "Booking, intake forms, secure messaging and refill requests for a multi-site dental and orthodontics group.",
  },
];

const websitesItems: SlideItem[] = [
  {
    img: capWebsites,
    kicker: "E-commerce · Shopify Hydrogen",
    title: "Stonecreek Outfitters",
    meta: "+184% conversion lift",
    blurb: "High-end retail rebuild with custom product configurator, headless storefront and same-day Houston delivery flows.",
  },
  {
    img: capWebsites,
    kicker: "Marketing · Next.js",
    title: "Galleria Law Group",
    meta: "98 Lighthouse · #1 local SERP",
    blurb: "Editorial marketing site with intake automation, multi-language SEO and Salesforce-piped contact routing.",
  },
  {
    img: capWebsites,
    kicker: "Web App · TanStack",
    title: "Pearland Property Portal",
    meta: "12k tenants · 99.99% uptime",
    blurb: "Tenant portal with maintenance ticketing, ACH rent, and a manager console replacing four legacy SaaS tools.",
  },
  {
    img: capWebsites,
    kicker: "Restaurant Group",
    title: "Montrose Hospitality",
    meta: "9 venues · unified ordering",
    blurb: "Unified booking and online ordering across 9 venues with kitchen display sync and loyalty wallet.",
  },
];

const brandingItems: SlideItem[] = [
  {
    img: capBranding,
    kicker: "Identity System",
    title: "Foundry Coffee Roasters",
    meta: "Naming · Mark · Packaging",
    blurb: "Full identity for an EaDo roaster — wordmark, bag system, signage, vehicle livery, and an opinionated print kit.",
  },
  {
    img: capBranding,
    kicker: "Rebrand",
    title: "Westheimer Dental Studio",
    meta: "From clinical → boutique",
    blurb: "Repositioning and visual rebuild for a boutique dental group. Patient touchpoints redesigned end to end.",
  },
  {
    img: capBranding,
    kicker: "Brand + Web",
    title: "Texas Iron & Forge",
    meta: "Logo · site · proposal kit",
    blurb: "Heritage metal fabricator rebrand including a proposal generator that turns a 3-day quote into 20 minutes.",
  },
  {
    img: capBranding,
    kicker: "Naming & Voice",
    title: "North Loop Capital",
    meta: "Name · voice · pitch deck",
    blurb: "Naming, voice guidelines, and an investor-grade pitch system for a Houston-based real estate syndicate.",
  },
];

const cloudItems: SlideItem[] = [
  {
    img: capCloud,
    kicker: "Managed Hosting",
    title: "Hardened Cloud Stack",
    meta: "AWS · Cloudflare · Fly.io",
    blurb: "Multi-region deploys with WAF, DDoS shielding, automated backups, and one-click rollback for every site we ship.",
  },
  {
    img: capCloud,
    kicker: "24/7 Support",
    title: "LTS Retainers",
    meta: "Same-day SLA · on-call eng",
    blurb: "Dedicated engineer pods on-call for retainer clients. Bugs, features, and outages handled in business hours or after.",
  },
  {
    img: capCloud,
    kicker: "Observability",
    title: "Forge Monitor",
    meta: "Uptime · logs · alerts",
    blurb: "Status pages, real-user monitoring, log aggregation and pager alerts — owners get a Monday digest in plain English.",
  },
  {
    img: capCloud,
    kicker: "Security",
    title: "SOC2-Ready Posture",
    meta: "Reviews · pentests · policies",
    blurb: "Quarterly security reviews, dependency triage, and pentest coordination for regulated and high-trust clients.",
  },
];

const capabilityHeadlines = [
  { id: "01", label: "Mobile Applications", note: "iOS · Android · React Native" },
  { id: "02", label: "Websites & Web Apps", note: "Marketing · E-comm · Portals" },
  { id: "03", label: "Branding & Identity", note: "Naming · Marks · Systems" },
  { id: "04", label: "Cloud, Hosting & Support", note: "24/7 · SLA · Observability" },
];

const stats = [
  { k: "120+", l: "Projects shipped from Houston" },
  { k: "99.99%", l: "Hosting uptime · trailing 24mo" },
  { k: "$42M+", l: "Client revenue routed through our builds" },
  { k: "14yr", l: "Average engineer experience" },
];

const process = [
  { n: "01", t: "Blueprint", d: "Two-week discovery — interviews, audit, architecture, and a fixed-fee build plan." },
  { n: "02", t: "Forge", d: "Senior pods build in two-week increments. You see working software every Friday." },
  { n: "03", t: "Launch", d: "Hardened deploy to your domain or app stores with monitoring, backups and rollback wired in." },
  { n: "04", t: "Operate", d: "Retainer-based support, feature work, and quarterly reviews. We do not disappear after launch." },
];

function Index() {
  return (
    <SiteLayout>
      <VerticalNav sections={sections} />

      {/* Intro / Hero */}
      <section
        id="intro"
        className="relative px-6 md:px-10 pt-24 md:pt-36 pb-24 md:pb-36 border-b border-border overflow-hidden scroll-mt-24"
      >
        <img
          src={heroTexture}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/75 to-background pointer-events-none" />
        <div className="relative max-w-7xl">
          <div className="font-mono text-primary text-xs mb-8 animate-reveal">
            HOUSTON, TX // EST. 2018 // LAT 29.7604°N // LON -95.3698°W
          </div>
          <h1 className="text-[3rem] sm:text-7xl md:text-8xl lg:text-[10rem] font-extrabold tracking-tighter leading-[0.82] text-balance mb-10 animate-reveal [animation-delay:120ms]">
            APPS. SITES. <br />
            BRANDS. <br />
            <span className="text-primary">BUILT IN HOUSTON.</span>
          </h1>
          <p className="max-w-3xl text-lg md:text-2xl text-muted-foreground leading-relaxed animate-reveal [animation-delay:240ms]">
            Forgeyard is a Houston studio designing, engineering, branding, hosting and
            supporting mobile applications, websites and full digital products for business
            owners across Texas — from solo founders to operators running fifty trucks.
          </p>
          <div className="mt-12 flex flex-wrap gap-4 animate-reveal [animation-delay:360ms]">
            <Link
              to="/contact"
              className="px-8 py-5 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              Start a Project →
            </Link>
            <a
              href="#capabilities"
              className="px-8 py-5 border border-border text-foreground font-mono text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
            >
              Walk the Yard
            </a>
          </div>
        </div>
      </section>

      {/* Capabilities overview */}
      <section
        id="capabilities"
        className="grid md:grid-cols-4 border-b border-border scroll-mt-24"
      >
        {capabilityHeadlines.map((c) => (
          <a
            key={c.id}
            href={`#${["apps", "websites", "branding", "cloud"][Number(c.id) - 1]}`}
            className="p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-border flex flex-col justify-between min-h-72 md:h-96 group hover:bg-card transition-colors"
          >
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">
              {c.id} // Discipline
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold tracking-tighter leading-[0.95] mb-3">
                {c.label}
              </h3>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.note}
              </p>
              <div className="mt-6 font-mono text-[10px] uppercase tracking-widest text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                See the slider ↓
              </div>
            </div>
          </a>
        ))}
      </section>

      {/* Marquee */}
      <section className="border-b border-border overflow-hidden py-6 bg-card">
        <div className="flex animate-marquee whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-12 pr-12">
              {[
                "iOS + Android Engineering", "★", "React & Next.js", "★",
                "Brand Identity Systems", "★", "Shopify Hydrogen", "★",
                "Managed Cloud Hosting", "★", "24/7 Support Retainers", "★",
                "SOC2-Ready Stacks", "★", "Stripe & Square", "★",
                "HIPAA-aware Builds", "★", "Houston-based Team", "★",
              ].map((t) => (
                <span key={`${i}-${t}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Sliders per discipline */}
      <div id="apps" className="scroll-mt-24">
        <CapabilitySlider
          index="01"
          category="Mobile Applications"
          headline="Native and cross-platform apps engineered for the field, the floor, and the front desk."
          description="From line-of-business apps for fifty-truck service ops to consumer apps shipped to the App Store, we build production iOS and Android software that holds up to real-world conditions — patchy LTE, gloved hands, and Monday morning."
          items={appsItems}
        />
      </div>

      <div id="websites" className="scroll-mt-24">
        <CapabilitySlider
          index="02"
          category="Websites & Web Apps"
          headline="Marketing sites, storefronts and operator portals built for performance and search."
          description="Custom-engineered websites and web applications that load instantly, rank on the first page, and convert. Headless e-commerce, editorial marketing sites, tenant and customer portals — fully owned codebases, no template lock-in."
          items={websitesItems}
        />
      </div>

      <div id="branding" className="scroll-mt-24">
        <CapabilitySlider
          index="03"
          category="Branding & Identity"
          headline="Naming, marks, voice and full identity systems made to scale across every touchpoint."
          description="Whether you're naming a new venture or repositioning a 30-year-old shop, our brand team builds identity systems that work in print, packaging, vehicle livery, app icons and 4K hero video — not just on a Behance slide."
          items={brandingItems}
        />
      </div>

      <div id="cloud" className="scroll-mt-24">
        <CapabilitySlider
          index="04"
          category="Cloud, Hosting & Support"
          headline="Hardened infrastructure and on-call engineers so your site never goes dark."
          description="Every product we ship runs on infrastructure we built and monitor. Multi-region deploys, WAF, automated backups, observability dashboards, and an on-call engineering pod that responds the same business day for retainer clients."
          items={cloudItems}
        />
      </div>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {stats.map((s) => (
          <div key={s.l} className="p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
            <div className="font-extrabold tracking-tighter text-5xl md:text-7xl text-foreground">
              {s.k}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-4">
              {s.l}
            </div>
          </div>
        ))}
      </section>

      {/* Showcase teaser */}
      <section id="showcase" className="p-6 md:p-10 border-b border-border scroll-mt-24">
        <div className="flex flex-wrap justify-between items-end gap-6 mb-10 md:mb-12">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tighter leading-[0.95]">
            PROVEN IN <br /> THE FIELD.
          </h2>
          <Link to="/work" className="font-mono text-xs text-muted-foreground hover:text-primary">
            VIEW ALL PROJECTS →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {[
            { img: workBayou, t: "Bayou Logistics Platform", y: "2024", tag: "Web + iOS + Brand" },
            { img: workSummit, t: "Summit Energy IoT Suite", y: "2023", tag: "iOS + Android + Cloud" },
          ].map((p) => (
            <article key={p.t} className="group cursor-pointer">
              <div className="w-full aspect-[4/3] border border-border overflow-hidden mb-5">
                <img
                  src={p.img}
                  alt={p.t}
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold">{p.t}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                    {p.tag}
                  </p>
                </div>
                <span className="font-mono text-xs px-2 py-1 border border-border">{p.y}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="px-6 md:px-10 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-4">
              // The Forge Method
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-[0.95]">
              Four phases. <br /> One senior team. <br /> No handoffs.
            </h2>
          </div>
          <div className="md:col-span-8 grid sm:grid-cols-2 gap-px bg-border">
            {process.map((p) => (
              <div key={p.n} className="p-8 bg-background min-h-56">
                <div className="font-mono text-[10px] text-primary uppercase tracking-widest">
                  {p.n}
                </div>
                <h3 className="text-2xl font-bold tracking-tight mt-3 mb-3">{p.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Houston */}
      <section id="houston" className="px-6 md:px-10 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            // Houston Operating Notes
          </div>
          <div className="md:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[0.95]">
              We work the way Houston works — early shifts, plain talk, accountable when the power flickers.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              From the Heights to Sugar Land, Pearland to the Energy Corridor — we build digital
              infrastructure for HVAC operators, law firms, energy services, clinics, restaurants,
              and retailers across Greater Houston. No offshore handoffs. No agency theater. One
              senior team, accountable for the whole stack.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              {[
                { k: "Local", v: "Studio in EaDo. On-site visits across the metro, every week." },
                { k: "Senior", v: "Every build led by 10+ year engineers, designers, and brand leads." },
                { k: "Standing by", v: "Same-day response for retainer clients. On-call after hours." },
              ].map((b) => (
                <div key={b.k} className="border-t border-border pt-4">
                  <div className="font-mono text-[10px] text-primary uppercase tracking-widest">
                    {b.k}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section id="field-report" className="px-6 md:px-10 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="max-w-6xl">
          <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-8">
            // Field Report 014
          </div>
          <blockquote className="text-2xl md:text-5xl font-bold tracking-tight leading-[1.1] text-balance">
            “They rebuilt our scheduling app in eleven weeks and have hosted it without a single
            outage since. It runs the entire field operation — fifty trucks, two hundred jobs a
            day. Best vendor decision we've made in twenty years.”
          </blockquote>
          <div className="mt-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            — Owner, HVAC Services Co. // Northwest Houston
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="commence" className="px-6 md:px-10 py-24 md:py-36 bg-primary text-primary-foreground scroll-mt-24">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <h2 className="text-5xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter max-w-3xl leading-[0.85]">
            READY TO <br /> COMMENCE?
          </h2>
          <div className="flex flex-col gap-8 max-w-md">
            <p className="text-lg md:text-xl font-medium">
              We take on a small number of new builds each quarter so every project gets senior
              attention from day one. Tell us what you're building.
            </p>
            <div>
              <Link
                to="/contact"
                className="inline-block px-8 py-5 bg-background text-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
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
