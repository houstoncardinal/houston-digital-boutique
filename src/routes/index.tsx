import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import heroTexture from "@/assets/hero-texture.jpg";
import { AtlasStoryScroll } from "@/components/site/AtlasStoryScroll";
import { ServiceBanners } from "@/components/site/ServiceBanners";
import { ServiceAreaMap } from "@/components/site/ServiceAreaMap";
import { ProcessQuest } from "@/components/site/ProcessQuest";
import { MiniGolf } from "@/components/site/MiniGolf";
import { CinematicReel } from "@/components/site/CinematicReel";
import { TrustStrip } from "@/components/site/TrustStrip";
import { SectionGuide } from "@/components/site/SectionGuide";
import { EnterpriseFAQ } from "@/components/site/EnterpriseFAQ";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      {
        title:
          "Houston Web Design, App Development, Social Media & Video Production | Atlas Houston",
      },
      {
        name: "description",
        content:
          "Atlas Houston is a Houston, TX web design and app development agency. Custom websites, iOS & Android apps, social media management, and video production for businesses across Houston, Sugar Land, The Woodlands, Katy, Pearland, Spring, Cypress, and Missouri City.",
      },
      {
        name: "keywords",
        content:
          "Houston web design, Houston web developer, Houston website design company, Houston app development, mobile app developer Houston, Houston social media management, Houston video production, Houston digital marketing agency, Sugar Land web design, The Woodlands web design, Katy web design, Pearland web design",
      },
      {
        property: "og:title",
        content: "Houston Web Design, App Development, Social & Video — Atlas Houston",
      },
      {
        property: "og:description",
        content:
          "Houston-based studio building websites, mobile apps, social media, and video for businesses across Greater Houston.",
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
          "@type": "LocalBusiness",
          name: "Atlas Houston",
          "@id": "https://atlashouston.com",
          url: "https://atlashouston.com",
          telephone: "+1-281-901-7016",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Houston",
            addressRegion: "TX",
            postalCode: "77002",
            addressCountry: "US",
          },
          geo: { "@type": "GeoCoordinates", latitude: 29.7604, longitude: -95.3698 },
          areaServed: [
            "Houston, TX",
            "Sugar Land, TX",
            "The Woodlands, TX",
            "Katy, TX",
            "Pearland, TX",
            "Spring, TX",
            "Cypress, TX",
            "Missouri City, TX",
          ],
          founder: {
            "@type": "Person",
            name: "Hunain Qureshi",
            jobTitle: "Founder & CEO",
            description:
              "Tech CEO specializing in app development, web development, and SEO. Based in Houston, working with founders across Silicon Valley and the United States.",
          },
          sameAs: ["https://www.visitcardinal.com"],
          priceRange: "$$$",
        }),
      },
    ],
  }),
});


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
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>Websites. Apps.</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "120ms" }}>Social. Video.</span></span>
            <br />
            <span className="mask-line">
              <span className="italic text-gold" style={{ animationDelay: "240ms" }}>
                Built in Houston.
              </span>
            </span>
          </h1>

          <Reveal delay={420} className="max-w-2xl">
            <p className="font-display text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              Atlas Houston is a senior team building powerful web development, app development,
              social media management, and video production for Texas business owners.
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

      <TrustStrip />

      <SectionGuide />

      <div id="who" className="scroll-mt-24">
        <AtlasStoryScroll />
      </div>

      <div id="services" className="scroll-mt-24">
        <ServiceBanners />
      </div>

      <CinematicReel />

      <div id="where" className="scroll-mt-24">
        <ServiceAreaMap />
      </div>

      <div id="process" className="scroll-mt-24">
        <ProcessQuest />
      </div>

      {/* PURPOSE — why this exists */}
      <section
        id="purpose"
        aria-label="Why we built Atlas"
        className="scroll-mt-24 relative border-t border-border emerald-wash"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28">
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-12 bg-primary" />
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
                05 — Why it matters
              </p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] max-w-4xl mb-10">
              We don't ship deliverables.
              <span className="block italic text-gold">We ship outcomes.</span>
            </h2>
            <p className="font-display text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mb-12 dropcap">
              Most agencies measure success in tasks completed, slides delivered, and invoices sent.
              Atlas measures success in the only metric that pays the bills: did the business get bigger?
              Every website, app, campaign, and film we ship is wired to a number — leads, installs,
              revenue, watch-time, ranking — and reported back monthly so you always know what the
              work is actually doing.
            </p>
          </Reveal>

          <div className="grid sm:grid-cols-3 gap-px bg-border border border-border">
            {[
              {
                h: "One accountable team",
                p: "The partner who scoped the work writes the contract, ships the code, and answers the phone at 2 a.m. No account managers, no offshore relay.",
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
              <div key={c.h} className="bg-background p-6 sm:p-8">
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
                  Principle
                </div>
                <div className="font-serif text-2xl sm:text-3xl leading-tight mb-3">{c.h}</div>
                <p className="font-display text-sm text-muted-foreground leading-relaxed">{c.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <EnterpriseFAQ />

      {/* FOUNDER */}
      <section
        id="begin"
        className="scroll-mt-24 px-5 sm:px-8 md:px-12 lg:px-16 py-20 md:py-28 border-t border-border"
      >
        <div className="mx-auto max-w-6xl grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-4">
            <div className="font-mono text-primary text-[10px] tracking-[0.35em] uppercase mb-5">
              // Founder
            </div>
            <div className="aspect-[4/5] w-full border border-border bg-gradient-to-br from-primary/10 via-background to-background flex items-end p-6">
              <div>
                <div className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
                  Hunain<br />Qureshi
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mt-3">
                  Founder & CEO
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-8">
            <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05] mb-6">
              A tech CEO who actually <span className="italic text-primary">writes the code</span>.
            </h2>
            <div className="space-y-5 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
              <p>
                Atlas Houston is led by <strong className="text-foreground">Hunain Qureshi</strong>,
                a Houston-based tech CEO specializing in app development, web development, and SEO.
                He works directly with every client — no account managers, no offshore handoffs.
              </p>
              <p>
                Based in the Houston area with active projects across Silicon Valley and clients
                from coast to coast, Hunain has shipped mobile apps, headless e-commerce sites, and
                AI-powered platforms for founders who care about speed, search, and the actual
                outcome.
              </p>
              <p>
                Reach him directly:{" "}
                <a href="tel:+12819017016" className="text-primary underline underline-offset-4 hover:text-foreground">
                  (281) 901-7016
                </a>.
              </p>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/contact"
                className="cta-lux px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Book the call →
              </Link>
              <a
                href="tel:+12819017016"
                className="px-6 py-4 border border-border font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
              >
                ☎ (281) 901-7016
              </a>
            </div>
          </div>
        </div>
      </section>

      <MiniGolf />
    </SiteLayout>
  );
}
