import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { PROJECTS, type Project } from "@/data/projects";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Client Work — Houston Web Design & App Development Portfolio | Atlas Houston" },
      {
        name: "description",
        content:
          "Portfolio of Houston web design, SEO, and digital projects. Real clients across construction, legal, pool services, disaster restoration, tax, and home services — all built from scratch by Atlas Houston.",
      },
      { property: "og:title", content: "Client Work — Atlas Houston Portfolio" },
      {
        property: "og:description",
        content:
          "Six Houston businesses, six ground-up web builds. Custom development, technical SEO, managed hosting, and ongoing content management.",
      },
      { property: "og:url", content: "/work" },
    ],
    links: [{ rel: "canonical", href: "/work" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Atlas Houston Client Portfolio",
          description: "Selected web design and digital marketing projects for Houston-area businesses",
          numberOfItems: 6,
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@type": "WebSite",
                name: "Houston Enterprise",
                url: "https://www.houinc.com",
                description: "Full-service residential and commercial construction company in Houston, TX.",
                creator: { "@type": "Organization", name: "Atlas Houston", url: "https://atlashouston.com" },
              },
            },
            {
              "@type": "ListItem",
              position: 2,
              item: {
                "@type": "WebSite",
                name: "HOU GEN PROS",
                url: "https://www.hougenpros.com",
                description: "Generac-authorized generator installation and service in Houston.",
                creator: { "@type": "Organization", name: "Atlas Houston", url: "https://atlashouston.com" },
              },
            },
            {
              "@type": "ListItem",
              position: 3,
              item: {
                "@type": "WebSite",
                name: "SVR Law Firm",
                url: "https://www.svrlawfirm.com",
                description: "Houston personal injury and criminal defense law firm serving English, Spanish, and Vietnamese-speaking clients.",
                creator: { "@type": "Organization", name: "Atlas Houston", url: "https://atlashouston.com" },
              },
            },
            {
              "@type": "ListItem",
              position: 4,
              item: {
                "@type": "WebSite",
                name: "BluTouch Pools",
                url: "https://www.blutouchpools.com",
                description: "Luxury custom pool construction and spa services in Houston.",
                creator: { "@type": "Organization", name: "Atlas Houston", url: "https://atlashouston.com" },
              },
            },
            {
              "@type": "ListItem",
              position: 5,
              item: {
                "@type": "WebSite",
                name: "United CCR",
                url: "https://www.unitedccr.com",
                description: "Disaster restoration, cleaning, and construction services in Cypress, TX.",
                creator: { "@type": "Organization", name: "Atlas Houston", url: "https://atlashouston.com" },
              },
            },
            {
              "@type": "ListItem",
              position: 6,
              item: {
                "@type": "WebSite",
                name: "Vargas Tax Preparation Services",
                url: "https://www.vargastaxservices.com",
                description: "Professional tax preparation and financial services for Houston individuals and businesses.",
                creator: { "@type": "Organization", name: "Atlas Houston", url: "https://atlashouston.com" },
              },
            },
          ],
        }),
      },
    ],
  }),
});

// PROJECTS imported from @/data/projects

const SERVICES_DELIVERED = [
  "Custom web development from scratch",
  "Technical SEO & local pack optimization",
  "Custom security hardening",
  "Managed hosting & 99.9% uptime",
  "Content management system",
] as const;


function ScreenshotCard({ project }: { project: Project }) {
  return (
    <div className="relative w-full aspect-[16/10] bg-card border-b border-border overflow-hidden group-hover:brightness-105 transition-all duration-500">
      <img
        src={project.image}
        alt={`${project.name} website screenshot`}
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover object-top"
        onError={(e) => {
          const target = e.currentTarget;
          target.style.display = "none";
          const fallback = target.nextElementSibling as HTMLElement;
          if (fallback) fallback.style.display = "flex";
        }}
      />
      {/* Fallback monogram card (hidden unless screenshot fails) */}
      <div
        className="absolute inset-0 items-center justify-center"
        style={{ display: "none", backgroundColor: project.color + "18" }}
      >
        <div className="text-center">
          <div
            className="font-serif text-6xl font-medium tracking-tight mb-3"
            style={{ color: project.color }}
          >
            {project.initials}
          </div>
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {project.domain}
          </div>
        </div>
      </div>
      {/* Browser chrome overlay */}
      <div className="absolute inset-x-0 top-0 h-7 bg-background/90 border-b border-border/40 flex items-center px-3 gap-2 backdrop-blur-sm">
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-border/80" />
          <div className="w-2 h-2 rounded-full bg-border/80" />
          <div className="w-2 h-2 rounded-full bg-border/80" />
        </div>
        <div className="flex-1 mx-3 h-3.5 bg-card/80 border border-border/40 rounded-sm flex items-center px-2">
          <span className="font-mono text-[8px] text-muted-foreground/60 truncate">{project.domain}</span>
        </div>
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[8px] text-primary/60 hover:text-primary transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          ↗
        </a>
      </div>
    </div>
  );
}

function ProjectCard({ project, reversed }: { project: Project; reversed: boolean }) {
  return (
    <article className={`group grid lg:grid-cols-2 border-b border-border ${reversed ? "" : ""}`}>
      {/* Screenshot — full left or right depending on reversed */}
      <div className={`relative overflow-hidden ${reversed ? "lg:order-2" : ""}`}>
        <ScreenshotCard project={project} />
        {/* Overlay link hint on hover */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center bg-background/30 backdrop-blur-[1px]"
          aria-label={`Visit ${project.name} website`}
        >
          <span className="bg-background/90 border border-border font-mono text-[10px] uppercase tracking-[0.25em] px-4 py-2.5 text-foreground">
            View Live Site ↗
          </span>
        </a>
      </div>

      {/* Content */}
      <div className={`p-8 md:p-12 flex flex-col justify-between border-border ${reversed ? "lg:border-r lg:order-1" : "lg:border-l"}`}>
        <div>
          {/* Meta row */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.3em] px-2.5 py-1 border"
              style={{ borderColor: project.color + "50", color: project.color }}
            >
              {project.industry}
            </span>
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.25em]">
              {project.year}
            </span>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] text-muted-foreground hover:text-primary transition-colors uppercase tracking-[0.2em]"
            >
              {project.domain} ↗
            </a>
          </div>

          {/* Company name */}
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight leading-[0.95] mb-4 group-hover:text-primary transition-colors duration-500">
            {project.name}
          </h2>

          {/* Headline */}
          <p className="font-display text-base text-muted-foreground italic mb-5 leading-relaxed">
            "{project.headline}"
          </p>

          {/* Description */}
          <p className="font-display text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-lg">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-[0.2em] border border-border px-2.5 py-1 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Outcome */}
        <div className="border-t border-border pt-6">
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary mb-2">
            // Outcome
          </div>
          <p className="font-display text-sm text-foreground/80 leading-relaxed mb-6">
            {project.outcome}
          </p>
          <Link
            to="/work/$slug"
            params={{ slug: project.slug }}
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-primary border border-primary/30 px-4 py-2.5 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
          >
            View Case Study →
          </Link>
        </div>
      </div>
    </article>
  );
}

function WorkPage() {
  return (
    <SiteLayout>

      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-40 pb-16 md:pb-20 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-1/4 h-[36rem] w-[36rem] rounded-full bg-primary/12 blur-[160px] animate-orb" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              CLIENT PORTFOLIO — HOUSTON, TX
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-medium tracking-[-0.025em] leading-[0.9] text-balance mb-10">
            Real clients. <br />
            <span className="text-gold italic">Real results.</span>
          </h1>
          <Reveal delay={350} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Every project below was built from scratch by the Atlas Houston team —
              custom web development, technical SEO, security hardening, managed hosting,
              and ongoing content management. No templates. No handoffs.
            </p>
          </Reveal>

          {/* Services-delivered strip */}
          <Reveal delay={550} className="mt-12">
            <div className="flex flex-wrap gap-3">
              {SERVICES_DELIVERED.map((s) => (
                <span
                  key={s}
                  className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] border border-border px-3 py-2 text-muted-foreground"
                >
                  <span className="text-primary text-[8px]">◆</span>
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {[
          { n: "6", l: "Active client sites" },
          { n: "100%", l: "Built from scratch" },
          { n: "5", l: "Services per engagement" },
          { n: "↑", l: "All ranking & growing" },
        ].map((s) => (
          <div key={s.l} className="p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
            <div className="font-serif text-4xl md:text-5xl text-gold font-medium tracking-tight">{s.n}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4">{s.l}</div>
          </div>
        ))}
      </div>

      {/* PROJECT LIST */}
      <section className="border-b border-border">
        {PROJECTS.map((project, i) => (
          <ProjectCard key={project.slug} project={project} reversed={i % 2 === 1} />
        ))}
      </section>

      {/* WHAT WE DELIVER SECTION */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-10">
            <div className="md:col-span-4">
              <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
                // Every engagement includes
              </div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95]">
                What every client gets from us.
              </h2>
            </div>
            <div className="md:col-span-8 grid sm:grid-cols-2 gap-px bg-border border border-border">
              {[
                {
                  t: "Built from scratch",
                  d: "No page builders, no templates, no recycled code. Every site is engineered for the specific business — its audience, its SEO targets, and its conversion goals.",
                },
                {
                  t: "Technical SEO from day one",
                  d: "Schema markup, structured data, Core Web Vitals targets, local pack optimization, sitemap, canonicals, and hreflang (where needed) — wired in before launch, not bolted on after.",
                },
                {
                  t: "Custom security hardening",
                  d: "HTTPS enforcement, HTTP security headers, bot mitigation, form honeypots, rate limiting, and monthly vulnerability scanning. Enterprise-grade on any budget.",
                },
                {
                  t: "Managed hosting & uptime",
                  d: "Cloudflare edge hosting with daily encrypted backups, 99.9% uptime SLA, and a named engineer on call. Never wonder if your site is up again.",
                },
                {
                  t: "Content management system",
                  d: "Every client gets a CMS they can actually use — whether that's a headless solution, a custom admin, or a lightweight editor. Update your own content without calling a developer.",
                },
                {
                  t: "Ongoing care & reporting",
                  d: "Monthly SEO reporting, performance audits, security patches, and content updates included in care plans. We maintain what we ship — for years, not sprints.",
                },
              ].map((item) => (
                <div key={item.t} className="bg-background p-7 md:p-8 group hover:bg-card/60 transition-colors">
                  <div className="flex items-baseline gap-3 mb-3">
                    <span className="text-primary text-[10px]">◆</span>
                    <h3 className="font-serif text-xl md:text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">
                      {item.t}
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.d}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Your business, next on the wall.
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Every client above started with one conversation. A senior partner — not a salesperson —
              handles every inquiry. Fixed-fee proposals, written scope, real timeline.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cta-lux inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Start a Project →
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
