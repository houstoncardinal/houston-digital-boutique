import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "What's the difference between a marketing site, a web app, and a portal?",
    a: "A marketing site exists to convert visitors into leads — speed, story, SEO, and a clear CTA. A web app is a product itself: persistent accounts, complex state, business logic. A portal is a private web app for an existing audience (tenants, employees, dealers). We build all three, and most engagements blend two of them. The architecture, hosting, and budget profile change accordingly, and we'll tell you which one you actually need during discovery.",
  },
  {
    q: "Do you use WordPress, Webflow, Framer, or custom code?",
    a: "For most Houston business owners we build custom on React, Next.js, TanStack Start, or Astro — fully owned, no monthly platform tax, and uncapped on SEO. We use Webflow when the client's team needs to update marketing pages daily and a senior developer is not in the budget. We avoid WordPress for new builds; the security and performance trade-offs no longer pencil out in 2026.",
  },
  {
    q: "How fast does the site actually have to load to rank?",
    a: "Google's Core Web Vitals thresholds are: LCP under 2.5 seconds, INP under 200 milliseconds, CLS under 0.1. We target LCP under 1.5 seconds on a mid-range Android over 4G — a real-world target, not a lab score. Every site we ship is monitored continuously through Cloudflare Web Analytics and a Lighthouse CI budget that fails the build if metrics regress.",
  },
  {
    q: "Can you migrate us off Wix, Squarespace, GoDaddy, or Shopify?",
    a: "Yes — and most of our Houston clients arrive that way. Migration includes URL mapping and 301 redirects so you don't lose existing SEO equity, content extraction, image re-optimization, and a staging environment for review before cutover. We've executed clean migrations from all four with zero indexed-page loss.",
  },
  {
    q: "How do you handle e-commerce, payments, and inventory?",
    a: "Shopify Hydrogen for high-volume retail (storefront API, headless checkout, custom product configurators). Stripe Checkout or Stripe Elements for subscriptions, services, and custom flows. Square for restaurant and POS-integrated commerce. Inventory syncs through native APIs — we don't paste CSVs.",
  },
  {
    q: "What about accessibility and Texas/federal compliance?",
    a: "Every site ships to WCAG 2.2 AA as the baseline — semantic HTML, keyboard navigation, contrast audits, screen-reader testing on VoiceOver and NVDA. For ADA Title III risk profiles we provide an accessibility statement and an annual re-audit. For Texas BOPA and federal Section 508 contexts we extend the testing matrix accordingly.",
  },
  {
    q: "Do you redesign existing sites or only build from scratch?",
    a: "Both. Redesigns are the majority of our engagements. We start with an audit of your existing analytics, Search Console data, and content inventory — we keep what's ranking and performing, redesign what isn't, and migrate everything without breaking what works. We've rebuilt dozens of Houston sites without losing a single indexed page or existing ranking.",
  },
  {
    q: "What happens after the site launches? Is there ongoing support?",
    a: "Yes. Every client gets a 30-day included post-launch support period. Most move onto an LTS care plan ($750–$2,500/month) that covers security patches, performance monitoring, CMS updates, SEO reporting, and a named engineer available for quick fixes. The team that built your site is the same team that maintains it — no outsourcing, no support queue.",
  },
  {
    q: "Can you build sites for multi-location businesses across the Houston metro?",
    a: "Yes, and we specialize in location-based SEO architecture. We build out individual location pages with unique, substantive content for each Houston neighborhood or suburb you serve — with distinct schema markup, local keyword targeting, and Google Business Profile alignment per location. This is how businesses with 3–20 Houston locations capture neighborhood-level search traffic instead of competing citywide.",
  },
];

const products = [
  {
    n: "01",
    t: "Marketing & editorial sites",
    sub: "Convert · Rank · Tell the story",
    d: "High-end, SEO-anchored marketing sites for law firms, clinics, agencies, and Houston-area businesses that need to rank and convert. CMS-backed when your team writes weekly; static when speed wins. Built from a clean codebase — no page builders, no template frameworks.",
  },
  {
    n: "02",
    t: "Headless e-commerce",
    sub: "Shopify Hydrogen · Stripe · Square",
    d: "Shopify Hydrogen, BigCommerce, and Stripe-native storefronts with custom product configurators, subscriptions, and same-day Houston delivery flows. Decoupled frontend means your storefront can be redesigned without touching backend logic or losing sales history.",
  },
  {
    n: "03",
    t: "Operator portals & web apps",
    sub: "Auth · Roles · Audit trails",
    d: "Tenant portals, dealer dashboards, dispatcher consoles, and field-ops tools. Persistent accounts, role-based access, audit trails, and Supabase/Postgres backends we run and maintain. Built for internal teams who use the product eight hours a day.",
  },
  {
    n: "04",
    t: "Migrations & rebuilds",
    sub: "Zero indexed-page loss",
    d: "Clean migrations off WordPress, Wix, Squarespace, and legacy custom builds. URL mapping, redirect plans, content extraction, image re-optimization, and zero SEO loss on cutover. We've never lost a ranked page on a migration we managed.",
  },
];

const proof = [
  { k: "98+", l: "Avg Lighthouse performance score at launch" },
  { k: "<1.5s", l: "Target LCP on a mid-tier 4G device" },
  { k: "+184%", l: "Median client conversion lift, year one" },
  { k: "Zero", l: "Indexed-page loss on migrations we've managed" },
];

const vitals = [
  { t: "LCP", v: "< 1.5s", d: "Largest Contentful Paint on a mid-tier Android over 4G — not a lab number, a real-device target." },
  { t: "INP", v: "< 120ms", d: "Interaction to Next Paint, measured against real-user telemetry in your analytics dashboard." },
  { t: "CLS", v: "< 0.05", d: "Cumulative Layout Shift, well under Google's 0.1 threshold across every breakpoint and font-load state." },
  { t: "TTFB", v: "< 200ms", d: "Edge-rendered HTML from Cloudflare Workers, cached at 300+ global PoPs — fast everywhere, fastest in Texas." },
];

const clientOutcomes = [
  {
    name: "Houston Enterprise",
    domain: "houinc.com",
    url: "https://www.houinc.com",
    stat: "Construction",
    outcome: "Ground-up custom site ranking for high-intent Houston construction keywords. Contact-form lead flow generating consistent inbound inquiries.",
  },
  {
    name: "HOU GEN PROS",
    domain: "hougenpros.com",
    url: "https://www.hougenpros.com",
    stat: "Power Solutions",
    outcome: "Sub-2s mobile load — critical for storm-driven emergency traffic. Real-time quote form with product sizing guide converting at above-benchmark rates.",
  },
  {
    name: "SVR Law Firm",
    domain: "svrlawfirm.com",
    url: "https://www.svrlawfirm.com",
    stat: "Legal Services",
    outcome: "Trilingual architecture (English, Spanish, Vietnamese) with hreflang implementation. Ranking in all three language markets for Houston legal queries.",
  },
  {
    name: "BluTouch Pools",
    domain: "blutouchpools.com",
    url: "https://www.blutouchpools.com",
    stat: "Luxury Pool Construction",
    outcome: "Portfolio-forward site with AggregateRating schema surfacing 4.8★ in search results. Free-estimate form driving qualified homeowner leads.",
  },
  {
    name: "United CCR",
    domain: "unitedccr.com",
    url: "https://www.unitedccr.com",
    stat: "Disaster Restoration",
    outcome: "Emergency-optimized site with 24/7 routing. Ranking for restoration keywords across Harris, Fort Bend, Montgomery, and Brazoria counties.",
  },
  {
    name: "Vargas Tax Services",
    domain: "vargastaxservices.com",
    url: "https://www.vargastaxservices.com",
    stat: "Tax & Financial",
    outcome: "Trust-building site for a 14-year Houston firm. Appointment booking flow + seasonal SEO driving consistent tax-season client bookings.",
  },
];

const industries = [
  {
    name: "Legal & Professional Services",
    insight: "Houston law firms and professional service businesses need sites that project credibility in under 3 seconds. We've built for personal injury, criminal defense, tax, and consulting — with LegalService schema and free-consultation CTAs that convert.",
  },
  {
    name: "Construction & Trades",
    insight: "Generator installers, pool builders, roofing contractors, disaster restoration — we understand the Houston trades market. Project gallery CMSs, service-area architecture, and local pack optimization built in from day one.",
  },
  {
    name: "Healthcare & Medical",
    insight: "HIPAA-aware contact forms, provider profile pages, multilingual patient access, and the schema markup (Physician, MedicalClinic, Hospital) that gets healthcare sites into Google's knowledge panels.",
  },
  {
    name: "Retail & E-commerce",
    insight: "Houston consumers shop on mobile. Headless Shopify storefronts with sub-1.5s mobile LCP, product schema for Google Shopping, and same-day delivery flows for local retailers.",
  },
];

export const Route = createFileRoute("/services/websites")({
  component: WebsitesPage,
  head: () => ({
    meta: [
      { title: "Custom Website Design & Development Houston | Atlas Houston" },
      {
        name: "description",
        content:
          "Custom website design and development in Houston, TX. React, Next.js, TanStack Start — built for Core Web Vitals, SEO, and long-term ownership. Marketing sites, e-commerce, and web apps. No templates.",
      },
      { property: "og:title", content: "Website Design & Development — Atlas Houston" },
      {
        property: "og:description",
        content:
          "Marketing sites, web apps, and headless e-commerce engineered to rank, convert, and run. Houston studio, senior team, no template lock-in.",
      },
      { property: "og:url", content: "https://atlashouston.com/services/websites" },
    ],
    links: [{ rel: "canonical", href: "https://atlashouston.com/services/websites" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Website Design & Development",
          serviceType: "Website Design and Development",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston",
            url: "https://atlashouston.com",
            areaServed: { "@type": "City", name: "Houston", containedIn: { "@type": "State", name: "Texas" } },
          },
          areaServed: { "@type": "City", name: "Houston" },
          description: "Custom marketing sites, headless e-commerce, web apps, and tenant portals engineered for Core Web Vitals and SEO. No templates, no platform tax.",
          offers: {
            "@type": "Offer",
            priceRange: "$8,000–$60,000+",
            priceCurrency: "USD",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://atlashouston.com" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://atlashouston.com/services" },
            { "@type": "ListItem", position: 3, name: "Website Design & Development", item: "https://atlashouston.com/services/websites" },
          ],
        }),
      },
    ],
  }),
});

function WebsitesPage() {
  return (
    <SiteLayout>

      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-44 pb-28 md:pb-40 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[44rem] w-[44rem] rounded-full bg-primary/25 blur-[160px] animate-orb" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[160px] animate-orb-alt" />
        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">02 — WEBSITES & WEB APPS</span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-medium tracking-[-0.03em] leading-[0.88] text-balance mb-8">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>Sites engineered</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "200ms" }}>to</span></span>{" "}
            <span className="mask-line"><span style={{ animationDelay: "320ms" }} className="text-gold italic">earn the click.</span></span>
          </h1>
          <Reveal delay={450} className="max-w-3xl mb-4">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Marketing sites, headless storefronts, and operator portals — custom-built on modern
              React, owned entirely by you, optimized for Core Web Vitals and the first page of
              Google. No templates. No platform tax. No re-platform in two years.
            </p>
          </Reveal>
          <Reveal delay={550} className="mb-12">
            <p className="text-base text-muted-foreground/70 max-w-2xl leading-relaxed">
              Every Atlas Houston site is engineered from a clean codebase by a senior team that has
              shipped 50+ production sites from this zip code. You own the repository on day one. We
              host it, support it, and rank it.
            </p>
          </Reveal>
          <Reveal delay={700} className="flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="cta-lux px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Brief us on your site →
            </Link>
            <a
              href="#products"
              className="px-9 py-5 border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
            >
              See the practice ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* PROOF */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {proof.map((s) => (
          <div key={s.l} className="p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
            <div className="font-serif text-5xl md:text-7xl text-gold font-medium tracking-tight">{s.k}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-5">{s.l}</div>
          </div>
        ))}
      </section>

      {/* CLIENT OUTCOMES STRIP */}
      <section className="border-b border-border overflow-x-auto">
        <div className="px-6 md:px-12 pt-8 pb-4">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
            // Atlas-built Houston sites
          </div>
        </div>
        <div className="flex min-w-max divide-x divide-border pb-0">
          {clientOutcomes.map((c) => (
            <div key={c.name} className="flex-shrink-0 w-[300px] px-8 py-6 group hover:bg-card/50 transition-colors">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary mb-2">{c.stat}</div>
              <div className="font-serif text-lg font-medium tracking-tight mb-2 group-hover:text-primary transition-colors">{c.name}</div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{c.outcome}</p>
              <a
                href={c.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]"
              >
                {c.domain} ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL ESSAY */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Why most Houston sites underperform
            </div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[0.95]">
              A website in 2026 has to do three jobs at once.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              It has to rank, convert, and run. It has to load in under 1.5 seconds on a mid-range
              Android in Pearland. It has to outrank a chain competitor with a million-dollar SEO
              budget. And it has to integrate cleanly with the systems your team already uses.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              The problem: 74% of Houston small business sites we audit fail Core Web Vitals on mobile.
              Of those, 91% are invisible on their primary target keywords. A $3,500 website that
              loads in 5 seconds and has no structured data is not a business asset — it's a liability
              that turns qualified leads away the moment they arrive.
            </p>
            <p className="text-lg text-muted-foreground leading-[1.7] max-w-3xl">
              We build sites that work in all three dimensions — not template-deployed, not
              page-builder fragile, but engineered from a clean codebase by people who have shipped
              50+ production projects from this zip code. You own the repository on day one.
            </p>
            <div className="border-l-2 border-primary pl-6 py-2">
              <p className="text-base text-foreground/80 italic leading-relaxed">
                "The clients who hesitated at the price of a professional build later told us the
                months they spent on a cheap site were the most expensive months of their business."
              </p>
              <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary mt-3">
                — Atlas Houston, from client retrospectives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="border-b border-border scroll-mt-24">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// The Practice</div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Four products. One engineering discipline.
          </h2>
          <p className="text-lg text-muted-foreground mt-4 max-w-2xl">
            Every engagement uses the same foundation — clean React codebase, Core Web Vitals budget,
            structured data, and owned infrastructure. What changes is the application.
          </p>
        </div>
        <div className="grid md:grid-cols-2 border-t border-border">
          {products.map((p, i) => (
            <article
              key={p.n}
              className={`p-8 md:p-12 border-b border-border ${i % 2 === 0 ? "md:border-r" : ""} group`}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-primary text-[11px] tracking-[0.3em]">{p.n}</span>
                <span className="hairline-gold flex-1" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-2 group-hover:text-primary transition-colors duration-500">
                {p.t}
              </h3>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-5">{p.sub}</div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // Atlas vs. the alternatives
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-3">
            Why not just use a template?
          </h2>
          <p className="text-base text-muted-foreground mb-10 max-w-2xl">
            Template builders and cheap freelancers look appealing at the price. Here's what you're
            actually choosing between.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-card">
                  {["Factor", "Atlas Custom Build", "Freelance (Budget)", "Webflow/Wix Template", "DIY Builder"].map((h) => (
                    <th key={h} className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-b border-r last:border-r-0 border-border">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Core Web Vitals", "98+ Lighthouse, <1.5s LCP guaranteed", "Varies — often fails on mobile", "Often fails — CLS and LCP issues common", "Consistently fails mobile"],
                  ["SEO Architecture", "Schema, structured data, SSR, CWV — built-in", "Rarely included", "Partial — basic meta tags only", "Minimal — no schema support"],
                  ["Custom Design", "Brand-specific, conversion-optimized", "Variable quality", "Template-constrained", "Template-only"],
                  ["Code Ownership", "Your repo, your GitHub, day one", "Usually yes, but quality varies", "Platform-locked, no raw code", "Platform-locked completely"],
                  ["Security", "Custom headers, bot mitigation, WAF, patching", "Basic HTTPS only", "Platform-managed (shared exposure)", "Platform-managed"],
                  ["Post-launch Support", "Named engineer, care plan available", "Often none or slow response", "Platform support tickets", "DIY or paid plans"],
                  ["Houston Market SEO", "Neighborhood-level targeting, local schema", "Generic SEO at best", "Not applicable", "Not applicable"],
                  ["Typical Cost", "$8,000–$60,000+ (fixed-fee)", "$1,500–$7,000 (variable quality)", "$200–$800/yr (platform fee)", "$100–$600/yr"],
                ].map(([factor, ...cols]) => (
                  <tr key={factor} className="border-b last:border-b-0 border-border hover:bg-card/40 transition-colors">
                    <td className="px-4 py-3.5 font-medium text-foreground border-r border-border/50">{factor}</td>
                    {cols.map((c, j) => (
                      <td key={j} className={`px-4 py-3.5 border-r last:border-r-0 border-border/50 text-muted-foreground ${j === 0 ? "text-primary font-medium" : ""}`}>
                        {c}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CORE WEB VITALS SPOTLIGHT */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border bg-card">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
              // Spotlight — Performance budgets
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-6">
              The budget is in the <span className="text-gold italic">build pipeline.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Every site we ship has a Lighthouse CI budget wired into the GitHub Actions pipeline.
              If a commit regresses a Core Web Vital past the threshold, the build fails and the
              pull request cannot merge. Performance is not a launch celebration — it is a continuous
              engineering constraint.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Google's PageSpeed Insights uses real-user data from Chrome users. Our targets are set
              against a mid-tier Android device on a 4G connection — the actual conditions your
              Houston customers are using, not a fiber lab test.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {vitals.map((b) => (
              <div key={b.t} className="p-8 bg-background group hover:bg-card/50 transition-colors">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">{b.t}</div>
                <div className="font-serif text-4xl md:text-5xl text-gold font-medium tracking-tight mb-4">{b.v}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOUSTON INDUSTRIES */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // Houston industries we serve
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-4">
            We know your market.
          </h2>
          <p className="text-base text-muted-foreground mb-12 max-w-2xl">
            Every Houston industry has its own search behavior, conversion patterns, and competitive
            landscape. We've built for all of them.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {industries.map((ind) => (
              <div key={ind.name} className="bg-background p-8 group hover:bg-card/50 transition-colors">
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary mb-4">{ind.name}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{ind.insight}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS + DELIVERABLES */}
      <section className="border-b border-border grid md:grid-cols-12">
        <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">// Engagement</div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">
            How we run a website build.
          </h2>
          <ol className="space-y-8">
            {[
              {
                n: "01",
                t: "Discovery (1–2 weeks)",
                d: "Goals workshop, analytics and Search Console audit, content inventory, competitive SERP analysis, architecture and tech-stack proposal. Signed off before design begins.",
              },
              {
                n: "02",
                t: "Information architecture",
                d: "Sitemap, URL plan, content model, redirect map (for migrations), and keyword-to-page mapping. Every URL is assigned a primary keyword intent before a Figma frame is opened.",
              },
              {
                n: "03",
                t: "Design (3–5 weeks)",
                d: "Brand-faithful Figma design system, responsive layouts down to 360px viewport, accessibility-first component spec, and your approval at two structured review points.",
              },
              {
                n: "04",
                t: "Build (4–10 weeks)",
                d: "React/Next.js/TanStack implementation with Storybook, automated visual regression testing, and Lighthouse CI gates. Schema markup, Core Web Vitals targeting, and CMS integration wired in before QA.",
              },
              {
                n: "05",
                t: "Launch & monitor",
                d: "DNS cutover with zero-downtime deployment, 301 redirect verification, Search Console re-submission, and a Core Web Vitals dashboard wired into your inbox from day one.",
              },
            ].map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-6">
                <div className="font-serif text-3xl text-primary font-medium">{s.n}</div>
                <div>
                  <h4 className="text-xl font-semibold tracking-tight mb-2">{s.t}</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="md:col-span-5 p-8 md:p-12 bg-card">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">// What you keep</div>
          <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-8">
            Tangible deliverables.
          </h3>
          <ul className="space-y-4">
            {[
              "Production site deployed to your domain on hardened Cloudflare infrastructure",
              "Source code in your GitHub or GitLab — you own it completely, no lock-in",
              "Figma design library, component documentation, and exportable brand assets",
              "Lighthouse CI report and Core Web Vitals performance baseline",
              "Full SEO setup: JSON-LD schema, XML sitemap, robots.txt, Search Console, GA4",
              "301 redirect map and migration log (on migration engagements)",
              "Accessibility statement and WCAG 2.2 AA audit report",
              "CMS training session and documentation for your team",
              "30 days post-launch support included — named engineer, same-day response",
            ].map((d) => (
              <li key={d} className="flex gap-3 text-sm md:text-base text-foreground/90">
                <span className="text-primary mt-1 shrink-0">◆</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
          <div className="mt-10 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Fixed-fee proposal. A senior lead replies within one business day.
            </p>
            <Link
              to="/contact"
              className="cta-lux inline-block px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Start a Scope →
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-12 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// Frequently asked</div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Questions we answer every week.
            </h2>
          </div>
          <div className="md:col-span-8 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="cursor-pointer flex justify-between items-center gap-6 list-none">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {f.q}
                  </h3>
                  <span className="font-mono text-primary text-sm shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="px-6 md:px-12 py-20 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-8">
            // Continue the walkthrough
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {[
              { to: "/services/seo", label: "SEO & AI Search", note: "Make your site findable" },
              { to: "/services/branding", label: "Branding & Identity", note: "The visual system behind the site" },
              { to: "/services/cloud-hosting", label: "Cloud Hosting", note: "Where your site lives and stays live" },
            ].map((r) => (
              <Link
                key={r.to}
                to={r.to}
                className="group block bg-background p-8 hover:bg-card/50 transition-colors"
              >
                <div className="font-serif text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors mb-3">
                  {r.label}
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                  {r.note} →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Ready to brief us?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Tell us what you're building. A senior lead — not a salesperson — replies within
              one business day with a written scope and a fixed-fee range.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cta-lux inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                File a Project →
              </Link>
              <a
                href="tel:+12819017016"
                className="inline-block px-8 py-4 border border-background/40 text-background font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors"
              >
                (281) 901-7016
              </a>
            </div>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
