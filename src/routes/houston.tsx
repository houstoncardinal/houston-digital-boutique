import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { cities } from "@/lib/cities";

export const Route = createFileRoute("/houston")({
  component: HoustonHub,
  head: () => ({
    meta: [
      { title: "Greater Houston Service Areas — Atlas Houston" },
      {
        name: "description",
        content:
          "Atlas Houston designs, builds, and supports websites and mobile apps across Greater Houston — Sugar Land, The Woodlands, Katy, Pearland, Spring, Cypress, Missouri City, and Inner Loop.",
      },
      { property: "og:title", content: "Greater Houston Service Areas — Atlas Houston" },
      {
        property: "og:description",
        content:
          "City-by-city web design, app development, branding, and SEO across the Greater Houston metro.",
      },
      { property: "og:url", content: "/houston" },
    ],
    links: [{ rel: "canonical", href: "/houston" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Atlas Houston — Greater Houston Service Areas",
          itemListElement: cities.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: `${c.name}, TX`,
            url: `/houston/${c.slug}`,
          })),
        }),
      },
    ],
  }),
});

function HoustonHub() {
  return (
    <SiteLayout>
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-40 pb-16 sm:pb-20 border-b border-border emerald-wash relative overflow-hidden">
        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-8">
            <span className="block h-px w-12 bg-primary" />
            <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-primary">
              Service Areas · Greater Houston
            </span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] text-balance max-w-4xl">
            Built for <em className="text-gold italic">every corner</em> of Greater Houston.
          </h1>
          <p className="mt-8 font-display text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Atlas Houston serves business owners across the metro — from clothing stores in
            North Houston and prestigious law firms downtown, to construction companies
            building shopping centers in Sugar Land, Memorial, Galleria, Riverstone, and
            River Oaks, to physician groups and MRI clinics across Fort Bend and Brazoria.
            We're the Houston-rooted extension of{" "}
            <a
              href="https://www.visitcardinal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold underline-offset-4 hover:underline"
            >
              Cardinal
            </a>
            , our partner studio serving clients nationwide. Pick your city below for a
            tailored breakdown.
          </p>
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {cities.map((c, i) => (
            <Reveal key={c.slug} delay={i * 60}>
              <Link
                to="/houston/$city"
                params={{ city: c.slug }}
                className="group block bg-background p-6 sm:p-7 h-full transition-colors hover:bg-card"
              >
                <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-4">
                  {String(i + 1).padStart(2, "0")} / {String(cities.length).padStart(2, "0")}
                </div>
                <h2 className="font-serif text-2xl sm:text-3xl leading-tight tracking-[-0.015em] mb-3 transition-colors duration-500 group-hover:text-gold">
                  {c.name}, TX
                </h2>
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mb-4">
                  {c.region}
                </p>
                <p className="font-display text-sm text-muted-foreground leading-relaxed mb-6">
                  {c.intro}
                </p>
                <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                  <span>Explore {c.shortName}</span>
                  <span className="block h-px w-6 bg-primary transition-all duration-500 group-hover:w-12" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.02em] max-w-2xl">
            Don't see your city? We still build for you.
          </h2>
          <Link
            to="/contact"
            className="inline-block px-8 py-5 bg-background text-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors self-start lg:self-auto"
          >
            Start a Project →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
