import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { cities, getCity } from "@/lib/cities";

export const Route = createFileRoute("/houston/$city")({
  loader: ({ params }) => {
    const city = getCity(params.city);
    if (!city) throw notFound();
    return { city };
  },
  component: CityPage,
  notFoundComponent: () => (
    <SiteLayout>
      <section className="px-6 py-40 text-center">
        <h1 className="font-serif text-5xl mb-4">City not found</h1>
        <p className="text-muted-foreground mb-8">We couldn't find that Greater Houston city.</p>
        <Link to="/houston" className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          ← All service areas
        </Link>
      </section>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <section className="px-6 py-40 text-center">
        <h1 className="font-serif text-5xl mb-4">Something went wrong</h1>
        <Link to="/houston" className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
          ← Back to service areas
        </Link>
      </section>
    </SiteLayout>
  ),
  head: ({ params, loaderData }) => {
    const city = loaderData?.city ?? getCity(params.city);
    if (!city) {
      return {
        meta: [{ title: "City not found — Atlas Houston" }],
      };
    }
    const title = `${city.name} Web Design, App Development & SEO — Atlas Houston`;
    const description = `Atlas Houston builds websites, mobile apps, brand systems, and managed cloud infrastructure for business owners in ${city.name}, TX. ${city.intro}`;
    const url = `/houston/${city.slug}`;

    const localBusiness = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      name: `Atlas Houston — ${city.name}`,
      description,
      url,
      telephone: "+1-713-555-0188",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "2412 Navigation Blvd",
        addressLocality: "Houston",
        addressRegion: "TX",
        postalCode: "77003",
        addressCountry: "US",
      },
      areaServed: {
        "@type": "City",
        name: city.name,
        containedInPlace: { "@type": "AdministrativeArea", name: "Texas" },
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: city.geo.lat,
        longitude: city.geo.lng,
      },
      serviceType: [
        "Web Design",
        "Mobile App Development",
        "Branding",
        "Cloud Hosting",
        "Local SEO",
      ],
    };

    const breadcrumb = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "/" },
        { "@type": "ListItem", position: 2, name: "Service Areas", item: "/houston" },
        { "@type": "ListItem", position: 3, name: city.name, item: url },
      ],
    };

    const faq = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: city.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    };

    return {
      meta: [
        { title },
        { name: "description", content: description.slice(0, 160) },
        { name: "geo.region", content: "US-TX" },
        { name: "geo.placename", content: `${city.name}, Texas` },
        { name: "geo.position", content: `${city.geo.lat};${city.geo.lng}` },
        { property: "og:title", content: title },
        { property: "og:description", content: description.slice(0, 200) },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        { type: "application/ld+json", children: JSON.stringify(localBusiness) },
        { type: "application/ld+json", children: JSON.stringify(breadcrumb) },
        { type: "application/ld+json", children: JSON.stringify(faq) },
      ],
    };
  },
});

function CityPage() {
  const { city } = Route.useLoaderData() as { city: NonNullable<ReturnType<typeof getCity>> };

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <nav
        aria-label="Breadcrumb"
        className="px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-28 pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
      >
        <Link to="/" className="hover:text-primary">Home</Link>
        <span className="mx-3 text-border">/</span>
        <Link to="/houston" className="hover:text-primary">Service Areas</Link>
        <span className="mx-3 text-border">/</span>
        <span className="text-foreground">{city.name}</span>
      </nav>

      {/* Hero */}
      <section className="relative px-5 sm:px-8 md:px-12 lg:px-16 pt-8 pb-16 sm:pb-24 md:pb-28 border-b border-border emerald-wash overflow-hidden">
        <div className="relative mx-auto max-w-7xl grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-8">
            <div className="flex items-center gap-4 mb-8">
              <span className="block h-px w-10 bg-primary" />
              <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.35em] text-primary">
                {city.region}
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] tracking-[-0.02em] text-balance">
              Web design, apps & SEO for <em className="text-gold italic">{city.name}, Texas</em>.
            </h1>
            <p className="mt-8 font-display text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl">
              {city.intro}
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-3">
              <Link
                to="/contact"
                className="cta-lux px-7 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors text-center"
              >
                Start a {city.shortName} Project →
              </Link>
              <Link
                to="/work"
                className="cta-lux px-7 py-4 border border-border font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors text-center"
              >
                See Our Work
              </Link>
            </div>
          </div>

          <aside className="lg:col-span-4 lg:pt-2">
            <div className="border border-border bg-card/40 backdrop-blur-sm p-6 sm:p-7 space-y-5">
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                  Market
                </div>
                <div className="font-serif text-xl">{city.population}</div>
              </div>
              <div className="hairline-gold" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                  Zip Codes
                </div>
                <div className="font-mono text-sm">{city.zipPrefix}</div>
              </div>
              <div className="hairline-gold" />
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-2">
                  From Our Studio
                </div>
                <div className="font-display text-sm text-muted-foreground leading-relaxed">
                  {city.drive}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* Economy + Why us */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-10 md:gap-16">
          <Reveal>
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-5">
              The {city.shortName} Market
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-6">
              What we see on the ground.
            </h2>
            <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed">
              {city.economy}
            </p>
          </Reveal>
          <Reveal delay={120}>
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-5">
              Why Atlas
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.05] tracking-[-0.02em] mb-6">
              Why owners hire us here.
            </h2>
            <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed">
              {city.whyUs}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-28 border-b border-border emerald-wash">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10">
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-4">
                Industries We Serve in {city.shortName}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.02em]">
                Who we build for.
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {city.industries.map((ind, i) => (
              <Reveal key={ind.name} delay={i * 70}>
                <div className="bg-background p-6 h-full">
                  <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-serif text-xl leading-snug mb-2">{ind.name}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {ind.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Neighborhoods */}
          <div className="mt-12 pt-10 border-t border-border">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-4">
              Neighborhoods & Submarkets
            </div>
            <div className="flex flex-wrap gap-2">
              {city.neighborhoods.map((n) => (
                <span
                  key={n}
                  className="px-3 py-1.5 border border-border font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground"
                >
                  {n}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-28 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-16 mb-12">
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-4">
                What We Build in {city.shortName}
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.02em]">
                Five disciplines. <em className="text-gold italic">One senior team</em>.
              </h2>
            </div>
            <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed md:pt-12">
              Every engagement is delivered by the same in-house Atlas team — designers,
              engineers, brand directors, and platform operators sitting in our EaDo studio.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {city.services.map((s, i) => (
              <Reveal key={s.title} delay={i * 70}>
                <Link
                  to={s.href}
                  className="group bg-background p-6 sm:p-7 h-full block transition-colors hover:bg-card"
                >
                  <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-3">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h3 className="font-serif text-2xl leading-tight tracking-[-0.015em] mb-3 group-hover:text-gold transition-colors duration-500">
                    {s.title}
                  </h3>
                  <p className="font-display text-sm text-muted-foreground leading-relaxed mb-5">
                    {s.blurb}
                  </p>
                  <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-primary">
                    <span>Learn more</span>
                    <span className="block h-px w-6 bg-primary transition-all duration-500 group-hover:w-12" />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Case study */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-28 border-b border-border emerald-wash">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-6">
            Local Case Study · {city.shortName}
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.02em] mb-8">
            {city.caseStudy.client}
          </h2>
          <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl leading-[1.3] text-foreground/95 text-balance border-l-2 border-primary pl-6 mb-8">
            {city.caseStudy.detail}
          </blockquote>
          <div className="font-mono text-[11px] uppercase tracking-[0.3em] text-gold">
            {city.caseStudy.result}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-24 md:py-28 border-b border-border">
        <div className="mx-auto max-w-5xl">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.3em] mb-4">
            Questions {city.shortName} Owners Ask
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-tight tracking-[-0.02em] mb-10">
            Answers, on the record.
          </h2>
          <dl className="divide-y divide-border border-y border-border">
            {city.faqs.map((f) => (
              <div key={f.q} className="py-7 grid md:grid-cols-12 gap-4">
                <dt className="md:col-span-5 font-serif text-xl leading-snug tracking-[-0.01em]">
                  {f.q}
                </dt>
                <dd className="md:col-span-7 font-display text-base text-muted-foreground leading-relaxed">
                  {f.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Cross-link other cities */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20 border-b border-border">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
            <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl leading-tight tracking-[-0.02em]">
              Other Greater Houston cities we serve
            </h2>
            <Link
              to="/houston"
              className="font-mono text-[11px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary"
            >
              All service areas →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px bg-border border border-border">
            {cities
              .filter((c) => c.slug !== city.slug)
              .map((c) => (
                <Link
                  key={c.slug}
                  to="/houston/$city"
                  params={{ city: c.slug }}
                  className="bg-background p-5 group hover:bg-card transition-colors"
                >
                  <div className="font-serif text-lg leading-tight group-hover:text-gold transition-colors duration-500">
                    {c.name}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-2">
                    {c.region.split("·")[0].trim()}
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[0.98] tracking-[-0.02em] max-w-3xl text-balance">
            Building something in {city.name}?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="font-display text-base sm:text-lg font-medium leading-relaxed">
              Tell us about your project. We'll come back within one business day with a scope,
              a rough timeline, and a price band.
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
