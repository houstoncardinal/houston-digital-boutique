import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

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

export const Route = createFileRoute("/services/websites")({
  component: () => (
    <ServicePage
      index="02"
      eyebrow="Websites & Web Apps"
      title={
        <>
          Websites engineered <br />
          to <span className="text-gold italic">earn the click.</span>
        </>
      }
      lede="Marketing sites, headless e-commerce storefronts, tenant and customer portals — custom-built on modern React, owned by you, optimized for Core Web Vitals and the first page of Google."
      intro="A website in 2026 has to do three jobs at once: rank, convert, and run. It has to load in under a second on a mid-range Android in Pearland, it has to outrank a chain competitor with a million-dollar SEO budget, and it has to integrate cleanly with the systems your team already uses on Monday morning. We build sites that do all three — not template-deployed, not page-builder fragile, but engineered from a clean codebase by people who have shipped 120+ production projects from this zip code."
      authority={[
        { k: "98+", v: "Avg Lighthouse perf score at launch" },
        { k: "<1.5s", v: "Target LCP on 4G mid-tier device" },
        { k: "+184%", v: "Median client conversion lift, yr 1" },
        { k: "Zero", v: "Indexed-page loss on migrations" },
      ]}
      pillars={[
        { n: "i", t: "Marketing & editorial sites", d: "High-end, SEO-anchored marketing sites for law firms, clinics, agencies, and Houston-area firms that need to rank. CMS-backed when your team writes weekly; static when speed wins." },
        { n: "ii", t: "Headless e-commerce", d: "Shopify Hydrogen, BigCommerce, and Stripe-native storefronts with custom product configurators, subscriptions, and same-day Houston delivery flows." },
        { n: "iii", t: "Operator portals & web apps", d: "Tenant portals, dealer dashboards, dispatcher consoles. Persistent accounts, role-based access, audit trails, and Supabase/Postgres backends we run for you." },
        { n: "iv", t: "Migrations & rebuilds", d: "Clean migrations off WordPress, Wix, Squarespace, and legacy custom builds. URL mapping, redirect plans, content extraction, and zero SEO loss on cutover." },
      ]}
      process={[
        { n: "01", t: "Discovery (1–2 weeks)", d: "Goals workshop, analytics audit, content inventory, competitive SERP review, architecture and tech-stack proposal." },
        { n: "02", t: "Information architecture", d: "Sitemap, URL plan, content model, redirect map. Signed off before design begins." },
        { n: "03", t: "Design (3–5 weeks)", d: "Brand-faithful Figma design system, responsive layouts down to 360px, accessibility-first component spec." },
        { n: "04", t: "Build (4–10 weeks)", d: "React/Next.js/TanStack implementation with Storybook, automated visual regression, and Lighthouse CI gates." },
        { n: "05", t: "Launch & monitor", d: "DNS cutover, 301 redirect verification, search console submission, Web Vitals dashboard wired into your inbox." },
      ]}
      deliverables={[
        "Production site deployed to your domain on hardened infrastructure",
        "Source code in your GitHub/GitLab — no platform lock-in",
        "Figma design library, component documentation, brand assets",
        "Lighthouse CI report and Core Web Vitals baseline",
        "SEO setup: schema, sitemap, robots, Search Console, GA4",
        "301 redirect map and migration log (if applicable)",
        "Accessibility statement (WCAG 2.2 AA)",
        "CMS training session for your team (if applicable)",
      ]}
      faqs={faqs}
      related={[
        { to: "/services/seo", label: "SEO & Discoverability", note: "Make the site findable" },
        { to: "/services/branding", label: "Branding & Identity", note: "Visual system that ranks" },
        { to: "/services/cloud-hosting", label: "Cloud Hosting", note: "Where your site lives" },
      ]}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  ),
  head: () => ({
    meta: [
      { title: "Website Design & Development in Houston | Atlas Houston" },
      {
        name: "description",
        content:
          "Custom website and web app development in Houston. React, Next.js, headless Shopify. WCAG 2.2 AA, Core Web Vitals-tuned, owned by you. Migrations welcome.",
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
  }),
});
