import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { PROJECTS } from "@/data/projects";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return project;
  },
  head: ({ params }) => {
    const project = PROJECTS.find((p) => p.slug === params.slug);
    if (!project) return { meta: [], links: [] };
    return {
      meta: [
        {
          title: `${project.name} — Case Study | Atlas Houston`,
        },
        {
          name: "description",
          content: `How Atlas Houston built ${project.name}'s web presence from scratch: ${project.description.slice(0, 150)}...`,
        },
        { property: "og:title", content: `${project.name} — Atlas Houston Case Study` },
        { property: "og:description", content: project.description.slice(0, 200) },
        { property: "og:url", content: `/work/${project.slug}` },
        { name: "robots", content: "index, follow" },
      ],
      links: [{ rel: "canonical", href: `/work/${project.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: `${project.name} — Atlas Houston Case Study`,
            description: project.description,
            url: `https://atlashouston.com/work/${project.slug}`,
            about: {
              "@type": "WebSite",
              name: project.name,
              url: project.url,
              description: project.description,
              creator: {
                "@type": "Organization",
                name: "Atlas Houston",
                url: "https://atlashouston.com",
              },
            },
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://atlashouston.com" },
                { "@type": "ListItem", position: 2, name: "Work", item: "https://atlashouston.com/work" },
                { "@type": "ListItem", position: 3, name: project.name, item: `https://atlashouston.com/work/${project.slug}` },
              ],
            },
          }),
        },
      ],
    };
  },
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const project = Route.useLoaderData() as NonNullable<ReturnType<typeof Route.useLoaderData>>;
  const allProjects = PROJECTS;
  const currentIndex = allProjects.findIndex((p) => p.slug === project.slug);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  return (
    <SiteLayout>

      {/* BREADCRUMB */}
      <div className="px-6 md:px-12 py-4 border-b border-border/50">
        <div className="max-w-7xl mx-auto flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-40">/</span>
          <Link to="/work" className="hover:text-primary transition-colors">Work</Link>
          <span className="opacity-40">/</span>
          <span className="text-foreground">{project.name}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-16 md:pt-24 pb-12 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-0 h-[32rem] w-[32rem] rounded-full blur-[140px] animate-orb" style={{ backgroundColor: project.color + "20" }} />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span
              className="font-mono text-[9px] uppercase tracking-[0.3em] px-3 py-1.5 border"
              style={{ borderColor: project.color + "60", color: project.color }}
            >
              {project.industry}
            </span>
            <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.3em]">
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

          <div className="grid lg:grid-cols-12 gap-10 items-end">
            <div className="lg:col-span-8">
              <h1 className="font-serif text-5xl sm:text-7xl md:text-[7rem] font-medium tracking-[-0.025em] leading-[0.9] mb-6 text-balance">
                {project.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground italic font-light leading-relaxed max-w-2xl">
                "{project.headline}"
              </p>
            </div>
            <div className="lg:col-span-4 flex flex-wrap gap-2">
              {project.tags.map((tag: string) => (
                <span
                  key={tag}
                  className="font-mono text-[9px] uppercase tracking-[0.2em] border border-border px-2.5 py-1.5 text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SCREENSHOT */}
      <div className="relative border-b border-border overflow-hidden bg-card">
        <div className="max-w-7xl mx-auto">
          {/* Browser chrome */}
          <div className="border-b border-border h-9 flex items-center px-5 gap-2 bg-background/80">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-border" />
              <div className="w-2.5 h-2.5 rounded-full bg-border" />
            </div>
            <div className="flex-1 mx-4 h-4 bg-card border border-border/50 rounded-sm flex items-center px-3">
              <span className="font-mono text-[9px] text-muted-foreground/60 truncate">{project.url}</span>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[9px] text-primary/60 hover:text-primary transition-colors"
            >
              Open ↗
            </a>
          </div>
          {/* Screenshot */}
          <div className="relative w-full aspect-[16/9] overflow-hidden">
            <img
              src={project.image}
              alt={`${project.name} website`}
              className="absolute inset-0 w-full h-full object-cover object-top"
              onError={(e) => {
                const t = e.currentTarget;
                t.style.display = "none";
                const fb = t.nextElementSibling as HTMLElement;
                if (fb) fb.style.display = "flex";
              }}
            />
            <div
              className="absolute inset-0 items-center justify-center"
              style={{ display: "none", backgroundColor: project.color + "12" }}
            >
              <div className="text-center">
                <div className="font-serif text-8xl font-medium tracking-tight mb-4" style={{ color: project.color }}>
                  {project.initials}
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
                  {project.domain}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section className="px-6 md:px-12 py-16 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-10">
          <div className="lg:col-span-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-3">// About</div>
            <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight leading-[0.95]">{project.name}</h2>
          </div>
          <div className="lg:col-span-9 space-y-5">
            {project.about.split("\n\n").map((para, i) => (
              <p key={i} className="text-base md:text-lg text-muted-foreground leading-relaxed">{para}</p>
            ))}
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {project.stats.map((s) => (
          <div key={s.label} className="p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
            <div className="font-serif text-3xl md:text-4xl text-gold font-medium tracking-tight">{s.value}</div>
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-3">{s.label}</div>
          </div>
        ))}
      </div>

      {/* MAIN CONTENT */}
      <section className="px-6 md:px-12 py-16 md:py-24 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left: narrative */}
          <div className="lg:col-span-8 space-y-14">

            {/* The Challenge */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
                // The challenge
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[0.95] mb-6">
                What they needed.
              </h2>
              {project.challenge.split("\n\n").map((para, i) => (
                <p key={i} className={`text-base md:text-lg text-muted-foreground leading-relaxed${i > 0 ? " mt-4" : ""}`}>{para}</p>
              ))}
            </div>

            {/* What we built */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
                // What we built
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[0.95] mb-6">
                How we built it.
              </h2>
              <ul className="space-y-3">
                {project.whatWeBuilt.map((item: string) => (
                  <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="text-primary mt-1 text-[10px] shrink-0">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* SEO Work */}
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
                // SEO & search visibility
              </div>
              <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[0.95] mb-6">
                Search-first from day one.
              </h2>
              <ul className="space-y-3">
                {project.seoWork.map((item: string) => (
                  <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                    <span className="text-primary mt-1 text-[10px] shrink-0">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Lead Generation */}
            {project.leadGen && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">// Lead generation system</div>
                <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[0.95] mb-6">Built to convert.</h2>
                <ul className="space-y-3">
                  {project.leadGen.map((item: string) => (
                    <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                      <span className="text-primary mt-1 text-[10px] shrink-0">◆</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Social Media Management */}
            {project.socialMedia && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">// Social media management</div>
                <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[0.95] mb-6">Channels managed, community built.</h2>
                <ul className="space-y-3">
                  {project.socialMedia.map((item: string) => (
                    <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                      <span className="text-primary mt-1 text-[10px] shrink-0">◆</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* AI Automation */}
            {project.aiAutomation && (
              <div>
                <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">// AI automation & chat agents</div>
                <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[0.95] mb-6">Intelligent, always on.</h2>
                <ul className="space-y-3">
                  {project.aiAutomation.map((item: string) => (
                    <li key={item} className="flex items-start gap-3 text-base text-muted-foreground">
                      <span className="text-primary mt-1 text-[10px] shrink-0">◆</span>{item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right: sidebar */}
          <aside className="lg:col-span-4 space-y-8">

            {/* Tech highlights */}
            <div className="border border-border p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
                // Technical stack
              </div>
              <ul className="space-y-2.5">
                {project.techHighlights.map((item: string) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="text-primary text-[9px] mt-0.5 shrink-0">◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Results */}
            <div className="border border-border p-6" style={{ borderColor: project.color + "40" }}>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: project.color }}>
                // Results
              </div>
              <ul className="space-y-2.5">
                {project.resultDetails.map((item: string) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <span className="text-[9px] mt-0.5 shrink-0" style={{ color: project.color }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* CTA sidebar */}
            <div className="bg-primary text-primary-foreground p-6">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary-foreground/60 mb-3">
                // Start your project
              </div>
              <p className="font-serif text-xl font-medium leading-tight mb-5">
                Want results like this for your business?
              </p>
              <Link
                to="/contact"
                className="block text-center bg-background text-foreground font-mono text-[10px] uppercase tracking-[0.2em] px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
              >
                Get a Scope →
              </Link>
            </div>

          </aside>
        </div>
      </section>

      {/* OUTCOME BANNER */}
      <section className="px-6 md:px-12 py-16 border-b border-border" style={{ backgroundColor: project.color + "0a" }}>
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] mb-4" style={{ color: project.color }}>
            // Outcome
          </div>
          <p className="font-serif text-2xl md:text-4xl font-medium tracking-tight leading-[1.1] max-w-4xl">
            {project.outcome}
          </p>
        </div>
      </section>

      {/* PROJECT NAV */}
      <nav className="grid sm:grid-cols-2 border-b border-border" aria-label="Project navigation">
        <Link
          to="/work/$slug"
          params={{ slug: prevProject.slug }}
          className="group p-8 md:p-10 border-r border-border hover:bg-card/50 transition-colors"
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
            ← Previous project
          </div>
          <div className="font-serif text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">
            {prevProject.name}
          </div>
          <div className="font-mono text-[9px] text-muted-foreground mt-1 uppercase tracking-[0.2em]">
            {prevProject.industry}
          </div>
        </Link>
        <Link
          to="/work/$slug"
          params={{ slug: nextProject.slug }}
          className="group p-8 md:p-10 text-right hover:bg-card/50 transition-colors"
        >
          <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
            Next project →
          </div>
          <div className="font-serif text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">
            {nextProject.name}
          </div>
          <div className="font-mono text-[9px] text-muted-foreground mt-1 uppercase tracking-[0.2em]">
            {nextProject.industry}
          </div>
        </Link>
      </nav>

      {/* BACK TO ALL */}
      <div className="px-6 md:px-12 py-10 flex items-center justify-center">
        <Link
          to="/work"
          className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors flex items-center gap-2"
        >
          ← View all client work
        </Link>
      </div>

    </SiteLayout>
  );
}
