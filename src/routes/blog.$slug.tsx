import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";
import { POSTS } from "@/data/blog-posts";

export const Route = createFileRoute("/blog/$slug")({
  component: BlogPost,
  head: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) return { meta: [], links: [] };
    const title = post.title;
    const description = post.description;
    const slug = post.slug;
    const faqSchema = post.faqs?.length
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: post.faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            }),
          },
        ]
      : [];
    return {
      meta: [
        { title: `${title} | Atlas Houston` },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `/blog/${slug}` },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "index, follow, max-snippet:-1" },
      ],
      links: [{ rel: "canonical", href: `https://atlashouston.com/blog/${slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "@id": `https://atlashouston.com/blog/${slug}#article`,
            headline: title,
            description: description,
            datePublished: post.date,
            dateModified: post.lastUpdated ?? post.date,
            inLanguage: "en-US",
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": `https://atlashouston.com/blog/${slug}`,
            },
            author: {
              "@type": "Organization",
              name: "Atlas Houston",
              url: "https://atlashouston.com",
            },
            publisher: {
              "@type": "Organization",
              name: "Atlas Houston",
              url: "https://atlashouston.com",
              logo: {
                "@type": "ImageObject",
                url: "https://atlashouston.com/favicon.svg",
              },
            },
            keywords: post.keywords?.join(", ") ?? post.tags.join(", "),
            articleSection: post.category ?? post.tags[0],
            breadcrumb: {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "https://atlashouston.com" },
                { "@type": "ListItem", position: 2, name: "Journal", item: "https://atlashouston.com/blog" },
                { "@type": "ListItem", position: 3, name: title, item: `https://atlashouston.com/blog/${slug}` },
              ],
            },
          }),
        },
        ...faqSchema,
      ],
    };
  },
  loader: ({ params }) => {
    const post = POSTS.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
});

function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-border/30">
      <div
        className="h-full bg-primary transition-none"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

function TableOfContents({ toc, activeId }: { toc: { id: string; label: string }[]; activeId: string }) {
  return (
    <nav aria-label="Table of contents">
      <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-primary mb-4">
        // In This Article
      </div>
      <ol className="space-y-1">
        {toc.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={[
                "flex items-start gap-2.5 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] leading-snug transition-colors duration-150",
                activeId === item.id
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              ].join(" ")}
            >
              <span className="shrink-0 mt-px opacity-40">{String(i + 1).padStart(2, "0")}</span>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

function BlogPost() {
  const post = Route.useLoaderData() as NonNullable<ReturnType<typeof Route.useLoaderData>>;
  const postIndex = POSTS.findIndex((p) => p.slug === post.slug);
  const related = POSTS.filter((_, i) => i !== postIndex).slice(0, 3);
  const [activeId, setActiveId] = useState("");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (!post.toc?.length) return;
    const ids = post.toc.map((t: { id: string; label: string }) => t.id);
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-20% 0px -70% 0px" }
    );
    ids.forEach((id: string) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [post.toc]);

  return (
    <SiteLayout>
      <ReadingProgress />

      {/* BREADCRUMB */}
      <div className="px-6 md:px-12 py-3 border-b border-border/40 bg-card/30">
        <div className="max-w-7xl mx-auto flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="opacity-30">/</span>
          <Link to="/blog" className="hover:text-primary transition-colors">Journal</Link>
          <span className="opacity-30">/</span>
          <span className="text-foreground truncate max-w-[200px]">{post.tags[0]}</span>
        </div>
      </div>

      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-16 md:pt-24 pb-12 md:pb-16 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-0 h-[36rem] w-[36rem] rounded-full bg-primary/12 blur-[160px]" />
        <div className="relative max-w-5xl">
          <div className="flex flex-wrap items-center gap-3 mb-8">
            <Link
              to="/blog"
              className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground hover:text-primary transition-colors flex items-center gap-1.5"
            >
              ← Journal
            </Link>
            <span className="h-3 w-px bg-border" />
            {post.tags.map((tag: string) => (
              <span
                key={tag}
                className="font-mono text-[9px] uppercase tracking-[0.25em] border border-border px-2.5 py-1 text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-[-0.02em] leading-[0.95] text-balance mb-6">
            {post.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed font-light max-w-3xl mb-8">
            {post.description}
          </p>

          <div className="flex flex-wrap items-center gap-5 font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground border-t border-border pt-5">
            <span className="flex items-center gap-2">
              <span className="text-primary">◆</span>
              {post.date}
            </span>
            <span>{post.readTime} read</span>
            <span>By Atlas Houston</span>
            {post.lastUpdated && (
              <span className="text-primary/60">Updated {post.lastUpdated}</span>
            )}
          </div>
        </div>
      </section>

      {/* BODY */}
      <section className="px-6 md:px-12 py-12 md:py-20 border-b border-border">
        <div className="grid lg:grid-cols-12 gap-10 max-w-7xl mx-auto">

          {/* SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="sticky top-28 space-y-8">
              {post.toc?.length ? (
                <TableOfContents toc={post.toc} activeId={activeId} />
              ) : null}

              <div className="border border-border p-5">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary mb-3">
                  // Work with us
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  We wrote this guide because we do this work every day — for Houston businesses.
                </p>
                <Link
                  to="/contact"
                  className="block px-4 py-2.5 bg-primary text-primary-foreground font-mono text-[9px] font-bold uppercase tracking-[0.25em] hover:opacity-90 transition-opacity text-center"
                >
                  Get a Free Audit →
                </Link>
              </div>

              {/* Share */}
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
                  // Share
                </div>
                <div className="flex flex-col gap-2">
                  {[
                    { label: "LinkedIn ↗", href: `https://www.linkedin.com/sharing/share-offsite/?url=https://atlashouston.com/blog/${post.slug}` },
                    { label: "X / Twitter ↗", href: `https://twitter.com/intent/tweet?url=https://atlashouston.com/blog/${post.slug}&text=${encodeURIComponent(post.title)}` },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT */}
          <div className="lg:col-span-9 min-w-0">
            <article className="prose-atlas">
              {post.body}
            </article>

            {/* FAQ SECTION */}
            {post.faqs?.length ? (
              <div className="mt-14 border-t border-border pt-10">
                <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-primary mb-2">
                  // Frequently Asked Questions
                </div>
                <h2 className="font-serif text-3xl md:text-4xl font-medium tracking-tight leading-[0.95] mb-8">
                  Common Questions
                </h2>
                <div className="space-y-px border border-border">
                  {post.faqs.map((faq: { q: string; a: string }, i: number) => (
                    <details
                      key={i}
                      className="group bg-background border-b last:border-b-0 border-border"
                    >
                      <summary className="flex items-start justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-card/50 transition-colors">
                        <span className="font-serif text-lg md:text-xl font-medium tracking-tight leading-snug pr-4">
                          {faq.q}
                        </span>
                        <span className="font-mono text-[10px] text-primary shrink-0 mt-1 group-open:rotate-45 transition-transform duration-200 inline-block">
                          +
                        </span>
                      </summary>
                      <div className="px-6 pb-6 text-base text-muted-foreground leading-relaxed">
                        {faq.a}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ) : null}

            {/* AUTHOR BOX */}
            <div className="mt-14 border border-border p-7 flex gap-5 items-start">
              <div className="shrink-0 w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center">
                <span className="font-mono text-[10px] font-bold text-primary">AH</span>
              </div>
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary mb-1">
                  // Written by
                </div>
                <div className="font-serif text-xl font-medium tracking-tight mb-2">Atlas Houston Editorial</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  The Atlas Houston team is a 7-person in-house expert digital studio based in Houston, TX. We build
                  websites, mobile apps, technical SEO programs, social media strategies, and brand identities
                  for Houston-area businesses. Every article in this journal is written from direct client experience
                  — not theory.
                </p>
              </div>
            </div>

            {/* MOBILE CTA */}
            <div className="mt-10 border border-border p-6 lg:hidden">
              <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-primary mb-3">
                // Work with us
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                We wrote this guide. We also build, rank, and ship exactly what it describes — for Houston businesses.
              </p>
              <Link
                to="/contact"
                className="inline-block px-6 py-3 bg-primary text-primary-foreground font-mono text-[9px] font-bold uppercase tracking-[0.25em] hover:opacity-90 transition-opacity"
              >
                Get a Free Audit →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* RELATED */}
      <section className="px-6 md:px-12 py-14 md:py-20 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-primary mb-8">
            // More from the journal
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border border border-border">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/blog/$slug"
                params={{ slug: r.slug }}
                className="group block bg-background p-8 hover:bg-card/50 transition-colors"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  {r.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary">
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="font-serif text-xl md:text-2xl font-medium tracking-tight leading-[1.05] mb-3 group-hover:text-primary transition-colors duration-300">
                  {r.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">{r.description}</p>
                <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-[0.2em]">
                  {r.readTime} read →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Ready to put this into practice?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Free audit of your current digital presence. A senior partner replies within one business day — not a salesperson.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-background text-foreground font-mono text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Start a Project →
              </Link>
              <Link
                to="/blog"
                className="inline-block px-8 py-4 border border-background/40 text-background font-mono text-[10px] font-bold uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors"
              >
                More Guides
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
