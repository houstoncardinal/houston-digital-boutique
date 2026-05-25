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
];

const products = [
  { n: "01", t: "Marketing & editorial sites", sub: "Convert · Rank · Tell the story", d: "High-end, SEO-anchored marketing sites for law firms, clinics, agencies, and Houston-area firms that need to rank. CMS-backed when your team writes weekly; static when speed wins." },
  { n: "02", t: "Headless e-commerce", sub: "Shopify Hydrogen · Stripe · Square", d: "Shopify Hydrogen, BigCommerce, and Stripe-native storefronts with custom product configurators, subscriptions, and same-day Houston delivery flows." },
  { n: "03", t: "Operator portals & web apps", sub: "Auth · Roles · Audit trails", d: "Tenant portals, dealer dashboards, dispatcher consoles. Persistent accounts, role-based access, audit trails, and Supabase/Postgres backends we run for you." },
  { n: "04", t: "Migrations & rebuilds", sub: "Zero indexed-page loss", d: "Clean migrations off WordPress, Wix, Squarespace, and legacy custom builds. URL mapping, redirect plans, content extraction, and zero SEO loss on cutover." },
];

const proof = [
  { k: "98+", l: "Avg Lighthouse performance score at launch" },
  { k: "<1.5s", l: "Target LCP on a mid-tier 4G device" },
  { k: "+184%", l: "Median client conversion lift, year one" },
  { k: "Zero", l: "Indexed-page loss on migrations" },
];

const vitals = [
  { t: "LCP", v: "< 1.5s", d: "Largest Contentful Paint on a mid-tier Android over 4G — not a lab number." },
  { t: "INP", v: "< 120ms", d: "Interaction to Next Paint, measured against real-user telemetry in your dashboard." },
  { t: "CLS", v: "< 0.05", d: "Cumulative Layout Shift, well under Google's 0.1 threshold across every breakpoint." },
  { t: "TTFB", v: "< 200ms", d: "Edge-rendered HTML from Cloudflare Workers, cached at 300+ global PoPs." },
];

export const Route = createFileRoute("/services/websites")({
  component: WebsitesPage,
  head: () => ({
    meta: [
      { title: "Website Design & Development in Houston | Atlas Houston" },
      {
        name: "description",
        content:
          "Custom website and web app development in Houston. React, Next.js, TanStack Start, headless Shopify. WCAG 2.2 AA, Core Web Vitals-tuned, owned by you. Migrations welcome.",
      },
      { property: "og:title", content: "Website Development — Atlas Houston Houston" },
      {
        property: "og:description",
        content:
          "Marketing sites, web apps, and headless e-commerce engineered to rank, convert, and run. Houston studio, senior team, no template lock-in.",
      },
      { property: "og:url", content: "/services/websites" },
    ],
    links: [{ rel: "canonical", href: "/services/websites" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Website Design and Development",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston Houston",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Custom marketing sites, headless e-commerce, web apps, and tenant portals engineered for Core Web Vitals and SEO.",
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
    ],
  }),
});

function WebsitesPage() {
  return (
    <SiteLayout>
      {/* SIGNATURE HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-44 pb-28 md:pb-40 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[44rem] w-[44rem] rounded-full bg-primary/25 blur-[160px] animate-orb" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[160px] animate-orb-alt" />

        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              02 — WEBSITES & WEB APPS
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-medium tracking-[-0.03em] leading-[0.88] text-balance mb-12">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>Sites engineered</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "200ms" }}>to</span></span>{" "}
            <span className="mask-line"><span style={{ animationDelay: "320ms" }} className="text-gold italic">earn the click.</span></span>
          </h1>

          <Reveal delay={520} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Marketing sites, headless e-commerce storefronts, and tenant portals — custom-built
              on modern React, owned by you, optimized for Core Web Vitals and the first page of
              Google. No templates. No platform tax. No re-platform in two years.
            </p>
          </Reveal>

          <Reveal delay={700} className="mt-12 flex flex-wrap gap-4">
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
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-5">
              {s.l}
            </div>
          </div>
        ))}
      </section>

      {/* INTRO ESSAY */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Why websites still matter
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              A website in 2026 has to do three jobs at once.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              It has to rank, convert, and run. It has to load in under a second on a mid-range
              Android in Pearland. It has to outrank a chain competitor with a million-dollar
              SEO budget. And it has to integrate cleanly with the systems your team already
              uses on Monday morning.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              We build sites that do all three — not template-deployed, not page-builder fragile,
              but engineered from a clean codebase by people who have shipped 120+ production
              projects from this zip code. You own the repository on day one. We host it,
              support it, and rank it.
            </p>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="border-b border-border scroll-mt-24">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // The Practice
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Four products. One codebase discipline.
          </h2>
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

      {/* CORE WEB VITALS SPOTLIGHT */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border bg-card">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
              // Spotlight — Performance budgets
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-8">
              The budget is in the <span className="text-gold italic">build pipeline.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every site we ship has a Lighthouse CI budget wired into the GitHub Actions
              pipeline. If a commit regresses a Core Web Vital past the threshold below, the
              build fails and the pull request cannot merge. Performance is not a launch
              celebration — it is a continuous engineering constraint.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {vitals.map((b) => (
              <div key={b.t} className="p-8 bg-background">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-3">{b.t}</div>
                <div className="font-serif text-4xl md:text-5xl text-gold font-medium tracking-tight mb-4">{b.v}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS + DELIVERABLES */}
      <section className="border-b border-border grid md:grid-cols-12">
        <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
            // Engagement
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">
            How we run a website build.
          </h2>
          <ol className="space-y-8">
            {[
              { n: "01", t: "Discovery (1–2 weeks)", d: "Goals workshop, analytics audit, content inventory, competitive SERP review, architecture and tech-stack proposal." },
              { n: "02", t: "Information architecture", d: "Sitemap, URL plan, content model, redirect map. Signed off before design begins." },
              { n: "03", t: "Design (3–5 weeks)", d: "Brand-faithful Figma design system, responsive layouts down to 360px, accessibility-first component spec." },
              { n: "04", t: "Build (4–10 weeks)", d: "React/Next.js/TanStack implementation with Storybook, automated visual regression, and Lighthouse CI gates." },
              { n: "05", t: "Launch & monitor", d: "DNS cutover, 301 redirect verification, Search Console submission, Web Vitals dashboard wired into your inbox." },
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
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
            // What you keep
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-8">
            Tangible deliverables.
          </h3>
          <ul className="space-y-4">
            {[
              "Production site deployed to your domain on hardened infrastructure",
              "Source code in your GitHub or GitLab — no platform lock-in",
              "Figma design library, component documentation, brand assets",
              "Lighthouse CI report and Core Web Vitals baseline",
              "SEO setup: schema, sitemap, robots, Search Console, GA4",
              "301 redirect map and migration log (when applicable)",
              "Accessibility statement (WCAG 2.2 AA)",
              "CMS training session for your team (when applicable)",
            ].map((d) => (
              <li key={d} className="flex gap-3 text-sm md:text-base text-foreground/90">
                <span className="text-primary mt-1">◆</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Want a fixed-fee proposal? A senior lead replies within one business day.
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
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Frequently Asked
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Questions we get every week.
            </h2>
          </div>
          <div className="md:col-span-8 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="cursor-pointer flex justify-between items-center gap-6 list-none">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {f.q}
                  </h3>
                  <span className="font-mono text-primary text-sm transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-3xl">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="px-6 md:px-12 py-20 md:py-24 border-b border-border">
        <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-8">
          // Continue the walkthrough
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { to: "/services/seo", label: "SEO & Discoverability", note: "Make the site findable" },
            { to: "/services/branding", label: "Branding & Identity", note: "Visual system that ranks" },
            { to: "/services/cloud-hosting", label: "Cloud Hosting", note: "Where your site lives" },
          ].map((r) => (
            <a
              key={r.to}
              href={r.to}
              className="group block p-8 border border-border hover:border-primary transition-colors"
            >
              <div className="font-serif text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">
                {r.label}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4">
                {r.note} →
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT BAND */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Ready to brief us?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Tell us what you're building. A senior lead — not a salesperson — replies within
              one business day.
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
