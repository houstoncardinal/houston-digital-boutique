import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import heroTexture from "@/assets/hero-texture.jpg";
import { ServiceBanners } from "@/components/site/ServiceBanners";
import { TrustStrip } from "@/components/site/TrustStrip";
import { EnterpriseFAQ } from "@/components/site/EnterpriseFAQ";
import { SEOAuditTool } from "@/components/site/SEOAuditTool";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "Houston Web Design, App Development, SEO & Social Media | Atlas Houston",
      },
      {
        name: "description",
        content:
          "Atlas Houston is a senior Houston web design, app development, SEO, and social media agency. Custom websites, iOS & Android apps, local SEO, and social media management for businesses across Houston, Sugar Land, The Woodlands, Katy, Pearland, Spring, and Cypress.",
      },
      {
        name: "keywords",
        content:
          "Houston web design, Houston web developer, Houston website design company, Houston app development, mobile app developer Houston, Houston SEO agency, Houston social media management, Houston digital marketing agency, Sugar Land web design, The Woodlands web design, Katy web design, Pearland web design, Houston SEO company",
      },
      {
        property: "og:title",
        content: "Houston Web Design, App Development, SEO & Social Media — Atlas Houston",
      },
      {
        property: "og:description",
        content:
          "Senior Houston studio: custom websites, mobile apps, technical SEO, and social media management. Fixed-fee proposals, partner-led execution.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["LocalBusiness", "ProfessionalService"],
          name: "Atlas Houston",
          "@id": "https://atlashouston.com",
          url: "https://atlashouston.com",
          telephone: "+1-281-901-7016",
          description: "Senior Houston web design, app development, SEO, and social media agency. Custom websites, iOS & Android apps, technical SEO, and social media management for Texas businesses.",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Houston",
            addressRegion: "TX",
            postalCode: "77002",
            addressCountry: "US",
          },
          geo: { "@type": "GeoCoordinates", latitude: 29.7604, longitude: -95.3698 },
          areaServed: [
            { "@type": "City", name: "Houston", containedIn: { "@type": "State", name: "Texas" } },
            { "@type": "City", name: "Sugar Land", containedIn: { "@type": "State", name: "Texas" } },
            { "@type": "City", name: "The Woodlands", containedIn: { "@type": "State", name: "Texas" } },
            { "@type": "City", name: "Katy", containedIn: { "@type": "State", name: "Texas" } },
            { "@type": "City", name: "Pearland", containedIn: { "@type": "State", name: "Texas" } },
            { "@type": "City", name: "Spring", containedIn: { "@type": "State", name: "Texas" } },
            { "@type": "City", name: "Cypress", containedIn: { "@type": "State", name: "Texas" } },
            { "@type": "City", name: "Missouri City", containedIn: { "@type": "State", name: "Texas" } },
          ],
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Digital Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Web Design & Development", url: "https://atlashouston.com/services/websites" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Mobile App Development", url: "https://atlashouston.com/services/mobile-apps" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "SEO & AI Search", url: "https://atlashouston.com/services/seo" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Social Media Management", url: "https://atlashouston.com/services/social-media" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Video Production", url: "https://atlashouston.com/services/video-production" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Branding & Identity", url: "https://atlashouston.com/services/branding" } },
            ],
          },
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "47",
            bestRating: "5",
            worstRating: "1",
          },
          founder: {
            "@type": "Person",
            name: "Hunain Qureshi",
            jobTitle: "Founder & CEO",
            description: "Tech CEO specializing in web development, app development, and SEO. Based in Houston, working with founders across Texas and the United States.",
          },
          sameAs: ["https://www.visitcardinal.com"],
          priceRange: "$$$",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: [
            {
              "@type": "Question",
              name: "Who actually does the work at Atlas Houston?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "We are a 7-person in-house senior team of engineers, designers, and producers — all based in Houston. The senior who pitches the work also ships it.",
              },
            },
            {
              "@type": "Question",
              name: "How fast can a project ship?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Marketing sites in 3–5 weeks, e-commerce and portals in 6–10 weeks, native mobile apps in 10–16 weeks to App Store. Social and video engagements start within 7 days.",
              },
            },
            {
              "@type": "Question",
              name: "Do you work outside of Houston, TX?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Yes. Atlas is Houston-based but works with founders across Silicon Valley, Austin, Dallas, NYC, and remote clients nationwide.",
              },
            },
            {
              "@type": "Question",
              name: "What does Atlas Houston pricing look like?",
              acceptedAnswer: {
                "@type": "Answer",
                text: "Project minimums start around $8K for a focused marketing site and scale into six figures for platform builds. Every proposal includes a fixed price band and published timeline.",
              },
            },
          ],
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <SiteLayout>

      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-24 border-b border-border overflow-hidden emerald-wash">
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
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-8 animate-reveal">
            <span className="block h-px w-12 bg-primary" />
            <span className="font-mono text-primary text-[10px] sm:text-[11px] tracking-[0.35em] uppercase">
              Atlas · Houston · Est. 2018
            </span>
            <span className="font-mono text-[10px] tracking-[0.22em] uppercase px-3 py-1 border border-primary/35 text-primary/80">
              ★ Houston's Top-Rated Digital Studio
            </span>
          </div>

          <h1 className="font-serif text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] leading-[0.96] tracking-[-0.02em] text-balance mb-8 sm:mb-10">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>Web. Apps.</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "120ms" }}>SEO. Social.</span></span>
            <br />
            <span className="mask-line">
              <span className="italic text-gold" style={{ animationDelay: "240ms" }}>
                Built in Houston.
              </span>
            </span>
          </h1>

          <Reveal delay={420} className="max-w-2xl">
            <p className="font-display text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Atlas Houston is a senior team delivering custom web development, mobile app development,
              technical SEO, and social media management for Texas businesses that expect real results.
            </p>
          </Reveal>

          <Reveal delay={560} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="cta-lux px-8 py-4 sm:py-5 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors text-center"
            >
              Start a Project →
            </Link>
            <Link
              to="/services"
              className="cta-lux px-8 py-4 sm:py-5 border border-border text-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors text-center"
            >
              See What We Do
            </Link>
            <a
              href="#seo-audit"
              className="px-8 py-4 sm:py-5 border border-border/50 text-muted-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors text-center"
            >
              Free SEO Audit ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── 2. TRUST STRIP ─────────────────────────────────────────────────── */}
      <TrustStrip />

      {/* ── 3. SERVICES ────────────────────────────────────────────────────── */}
      <div id="services" className="scroll-mt-20">
        <ServiceBanners />
      </div>

      {/* ── 5. FREE SEO AUDIT (LIGHT) ───────────────────────────────────────
          Placed immediately after services — interactive value prop that
          captures lead intent before the visitor scrolls away.
      ─────────────────────────────────────────────────────────────────────── */}
      <div className="section-cream">
        <SEOAuditTool />
      </div>

      {/* ── 5. PRINCIPLES ──────────────────────────────────────────────────── */}
      <section
        id="purpose"
        aria-label="Why we built Atlas"
        className="scroll-mt-20 border-t border-border bg-background"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-20">
          <Reveal>
            <div className="flex items-center gap-4 mb-5">
              <span className="block h-px w-12 bg-primary" />
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
                05 — Why it matters
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] max-w-4xl mb-8">
              We don't ship deliverables.
              <span className="block italic text-gold">We ship outcomes.</span>
            </h2>
            <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed max-w-3xl mb-10 dropcap">
              Most agencies measure success in tasks completed, slides delivered, and invoices sent.
              Atlas measures success in the only metric that pays the bills: did the business get bigger?
              Every website, app, SEO campaign, and social strategy we ship is wired to a number — leads, installs,
              revenue, organic traffic, ranking — and reported back monthly.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                h: "One accountable team",
                p: "The partner who scoped the work writes the contract, ships the code, and answers the phone. No account managers, no offshore relay.",
              },
              {
                h: "Craft, not templates",
                p: "Every system is hand-built for the business it serves. No template farms, no white-labeled themes, no recycled brand kits.",
              },
              {
                h: "Built to last",
                p: "We maintain what we ship — for years, not sprints. Security patches, performance reviews, and SEO reporting bundled into care plans.",
              },
            ].map((c) => (
              <div key={c.h} className="bg-background p-6 sm:p-8 hover:bg-card/60 transition-colors">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">
                  Principle
                </div>
                <div className="font-serif text-2xl sm:text-3xl leading-tight mb-3">{c.h}</div>
                <p className="font-display text-sm text-muted-foreground leading-relaxed">{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. FAQ (LIGHT) ────────────────────────────────────────────────── */}
      <div className="section-cream">
        <EnterpriseFAQ />
      </div>


    </SiteLayout>
  );
}
