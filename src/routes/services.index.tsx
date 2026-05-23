import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/services/")({
  component: ServicesHub,
  head: () => ({
    meta: [
      { title: "Services — Apps, Websites, Branding, Cloud, SEO | Atlas Houston Houston" },
      {
        name: "description",
        content:
          "Five disciplines, one senior Houston team: mobile apps, websites, brand identity, managed cloud hosting, and engineered SEO. Full lifecycle, fixed-fee proposals.",
      },
      { property: "og:title", content: "Services — Atlas Houston Houston" },
      {
        property: "og:description",
        content:
          "Apps, websites, branding, cloud and a signature SEO practice. Built and operated by a Houston-based senior team.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

const services = [
  {
    n: "01",
    to: "/services/mobile-apps" as const,
    label: "Mobile Applications",
    tagline: "Native iOS, native Android, considered React Native.",
    body: "60+ shipped binaries. Offline-first, HIPAA-aware, built for the field and the front desk.",
    bullets: ["Swift / SwiftUI", "Kotlin / Compose", "React Native + Expo", "BLE · IoT · Offline sync"],
  },
  {
    n: "02",
    to: "/services/websites" as const,
    label: "Websites & Web Apps",
    tagline: "Marketing, headless e-commerce, operator portals.",
    body: "React, Next.js, TanStack and Shopify Hydrogen — fully owned codebases tuned to rank and convert.",
    bullets: ["LCP < 1.5s target", "Headless Shopify", "Operator portals", "Zero-loss migrations"],
  },
  {
    n: "03",
    to: "/services/branding" as const,
    label: "Branding & Identity",
    tagline: "Naming, marks, voice, packaging, livery.",
    body: "Identity systems built for the App Store icon and the freeway billboard with equal care.",
    bullets: ["Naming + USPTO clearance", "Figma brand libraries", "Packaging + signage", "Voice + messaging"],
  },
  {
    n: "04",
    to: "/services/cloud-hosting" as const,
    label: "Cloud, Hosting & LTS Support",
    tagline: "99.99% uptime. 24/7 on-call. Houston-based.",
    body: "Multi-region cloud, encrypted backups, observability, and a named senior engineer for every account.",
    bullets: ["AWS · Cloudflare · Fly", "Daily encrypted backups", "Status page per client", "SOC2 controls · HIPAA BAA"],
  },
  {
    n: "05",
    to: "/services/seo" as const,
    label: "SEO & AI Search",
    tagline: "The first result is engineered.",
    body: "Technical SEO, Core Web Vitals, local pack, content authority, and Generative Engine Optimization for ChatGPT, Perplexity, Gemini, and Google AI Overviews.",
    bullets: ["Technical + schema", "Local pack (by neighborhood)", "Content authority", "GEO for AI engines"],
    signature: true,
  },
];

function ServicesHub() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-40 pb-24 md:pb-32 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 h-[40rem] w-[40rem] rounded-full bg-primary/15 blur-[160px] animate-orb" />
        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              SERVICES INDEX — FIVE DISCIPLINES
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-medium tracking-[-0.025em] leading-[0.9] text-balance mb-12">
            One senior team. <br />
            <span className="text-gold italic">Five disciplines.</span> <br />
            Full lifecycle.
          </h1>
          <Reveal delay={400} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Atlas Houston is a Houston design and engineering studio. We design the brand, build the
              site and the app, host the infrastructure, and rank it on Google — under one roof,
              with one accountable team. Pick a discipline to read the long form.
            </p>
          </Reveal>
        </div>
      </section>

      {/* SERVICES GRID */}
      <section className="border-b border-border">
        {services.map((s, i) => (
          <Link
            key={s.n}
            to={s.to}
            className={`group block border-b last:border-b-0 border-border ${s.signature ? "bg-card" : ""}`}
          >
            <div className="grid md:grid-cols-12 gap-8 px-6 md:px-12 py-16 md:py-20 relative overflow-hidden">
              {s.signature && (
                <div className="absolute top-6 right-6 font-mono text-[10px] text-primary uppercase tracking-[0.3em] border border-primary px-3 py-1">
                  ★ Signature
                </div>
              )}
              <div className="md:col-span-2 font-serif text-6xl md:text-8xl text-gold font-medium tracking-tight">
                {s.n}
              </div>
              <div className="md:col-span-6">
                <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[0.95] mb-4 group-hover:text-primary transition-colors duration-700">
                  {s.label}
                </h2>
                <p className="text-lg md:text-xl text-foreground/85 leading-relaxed font-light mb-3">
                  {s.tagline}
                </p>
                <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {s.body}
                </p>
                <div className="mt-8 inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
                  <span>Read the practice</span>
                  <span className="block h-px w-12 bg-primary transition-all duration-700 group-hover:w-20" />
                </div>
              </div>
              <ul className="md:col-span-4 grid grid-cols-2 gap-x-6 gap-y-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground self-center">
                {s.bullets.map((b) => (
                  <li key={b} className="border-t border-border pt-3">
                    <span className="text-primary mr-2">+</span>{b}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        ))}
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Need two of these? Most clients do.
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              The most valuable engagements blend disciplines — branding plus website plus SEO, or
              app plus cloud plus support. Tell us the outcome and we'll scope the right mix.
            </p>
            <Link
              to="/contact"
              className="cta-lux inline-block self-start px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Request a Scope →
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
