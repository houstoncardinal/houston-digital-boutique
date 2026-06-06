import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import { POSTS } from "@/data/blog-posts";

export const Route = createFileRoute("/blog/")({
  component: BlogIndex,
  head: () => ({
    meta: [
      { title: "Houston Digital Marketing & Web Design Blog — Atlas Houston" },
      {
        name: "description",
        content:
          "Expert guides on Houston web design, SEO, app development, social media, and video production from Atlas Houston's senior team.",
      },
      { property: "og:title", content: "Houston Digital Marketing Blog — Atlas Houston" },
      {
        property: "og:description",
        content:
          "Practical guides for Houston businesses: web design costs, SEO strategies, app development decisions, social media, and video production.",
      },
      { property: "og:url", content: "/blog" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "Atlas Houston Journal",
          description: "Expert guides on Houston digital marketing, web design, and SEO.",
          url: "https://atlashouston.com/blog",
          publisher: {
            "@type": "Organization",
            name: "Atlas Houston",
            url: "https://atlashouston.com",
          },
        }),
      },
    ],
  }),
});

function BlogIndex() {
  const featured = POSTS[0];
  const rest = POSTS.slice(1);

  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-40 pb-20 md:pb-28 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 h-[38rem] w-[38rem] rounded-full bg-primary/15 blur-[160px] animate-orb" />
        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              THE ATLAS JOURNAL — HOUSTON DIGITAL INSIGHTS
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-[8rem] font-medium tracking-[-0.025em] leading-[0.9] text-balance mb-8">
            Built in Houston. <br />
            <span className="text-gold italic">Written for founders.</span>
          </h1>
          <Reveal delay={350} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Practical guides on web design, SEO, app development, social media, and video
              production — written by the senior team that actually builds these things.
            </p>
          </Reveal>
        </div>
      </section>

      {/* FEATURED POST */}
      <section className="border-b border-border">
        <Link
          to="/blog/$slug"
          params={{ slug: featured.slug }}
          className="group grid md:grid-cols-12 border-b border-border hover:bg-card/40 transition-colors"
        >
          <div className="md:col-span-2 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border flex items-start">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">Featured</span>
          </div>
          <div className="md:col-span-10 p-8 md:p-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {featured.tags.map((tag) => (
                <span key={tag} className="font-mono text-[10px] uppercase tracking-[0.25em] border border-border px-3 py-1 text-muted-foreground">
                  {tag}
                </span>
              ))}
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.25em]">
                {featured.date} · {featured.readTime} read
              </span>
            </div>
            <h2 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[0.95] mb-5 group-hover:text-primary transition-colors duration-700">
              {featured.title}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mb-8">
              {featured.description}
            </p>
            <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.3em] text-primary">
              Read the guide
              <span className="block h-px w-12 bg-primary transition-all duration-700 group-hover:w-20" />
            </span>
          </div>
        </Link>
      </section>

      {/* POST GRID */}
      <section className="border-b border-border">
        <div className="grid md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className={`group block p-8 md:p-10 border-b border-border ${
                (i % 3 !== 2) ? "lg:border-r" : ""
              } ${(i % 2 !== 1) ? "md:border-r lg:border-r-0" : ""} hover:bg-card/40 transition-colors`}
            >
              <div className="flex flex-wrap gap-2 mb-5">
                {post.tags.slice(0, 2).map((tag) => (
                  <span key={tag} className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">
                    {tag}
                  </span>
                ))}
              </div>
              <h2 className="font-serif text-2xl md:text-3xl font-medium tracking-tight leading-[1.05] mb-4 group-hover:text-primary transition-colors duration-500">
                {post.title}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-3">
                {post.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                  {post.date}
                </span>
                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em]">
                  {post.readTime} read
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Ready to work with the team that writes this stuff?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Free audit, written proposal, and a senior partner on the first call — not a salesperson.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cta-lux inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Start a Project →
              </Link>
              <Link
                to="/services"
                className="inline-block px-8 py-4 border border-background/40 text-background font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors"
              >
                See Services
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
