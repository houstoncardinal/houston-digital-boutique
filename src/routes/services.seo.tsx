import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "How long does SEO actually take to work?",
    a: "Technical fixes (Core Web Vitals, indexability, schema, internal linking) move rankings within 2–6 weeks. Content authority — the work of out-ranking established competitors on commercial queries — typically shows compounding movement at month 3 and a step-change at month 6. We publish a baseline scorecard before any engagement starts so we are both measuring against the same line, not vibes.",
  },
  {
    q: "Is SEO worth it for a small Houston business?",
    a: "Almost always yes — and almost always more than paid search. A roofer in Spring, a dental practice in the Heights, a freight broker in Houston: ranking #1–3 in your immediate service-area on the queries customers actually type captures intent that never has to be re-bought. We've seen single local pages return 12-month organic value of $40k–$200k for service businesses, against a one-time build of a fraction of that.",
  },
  {
    q: "What about AI search — ChatGPT, Perplexity, Gemini, Google AI Overviews?",
    a: "Generative engine optimization (GEO) is now a first-class part of every engagement. That means structured data the LLMs actually parse (Organization, Service, FAQPage, HowTo, Product, BreadcrumbList), entity-rich content that establishes you as the source on a topic, llms.txt and well-formed sitemaps, citation-friendly formatting, and monitoring of mentions inside the major AI engines. The websites we ship in 2026 are designed to win both the SERP and the AI answer box.",
  },
  {
    q: "Do you do local SEO, Google Business Profile, and citation building?",
    a: "Yes — and this is where most Houston businesses see the fastest commercial impact. Full Google Business Profile optimization, weekly post cadence, review-generation flow into Google and industry verticals, NAP consistency across 60+ citation sources, and local-pack ranking tracking by neighborhood (Heights vs. Sugar Land vs. Pearland have different SERPs, and we treat them that way).",
  },
  {
    q: "How is your SEO different from a marketing agency or a freelance consultant?",
    a: "Three differences. First, we are engineers — we can actually implement schema, fix Core Web Vitals, rewrite render-blocking JavaScript, and ship a Next.js or TanStack rebuild ourselves. Most agencies write a 40-page audit and email it to your developer. Second, we operate the site we built, so SEO changes ship same-week without a contractor handoff. Third, we report in revenue-attributable metrics — organic-driven leads, organic-driven bookings, organic-driven revenue — not vanity keyword counts.",
  },
  {
    q: "What if my site already has SEO problems — duplicate content, manual actions, indexing issues?",
    a: "Bring it. We've untangled migrations that dropped 80% of indexed pages, recovered sites from manual actions, deindexed legacy staging environments leaking equity, and rebuilt URL structures without losing rank. Recovery work starts with a full Search Console export, server-log review, and a written remediation plan with a 90-day rank-recovery forecast.",
  },
];

const tactics = [
  { n: "01", t: "Technical SEO", d: "Crawlability, indexability, canonicalization, server-rendered HTML, structured data, robots.txt, XML and image sitemaps, internal link graph engineering, hreflang for multi-region." },
  { n: "02", t: "Core Web Vitals", d: "LCP, INP, CLS budgets enforced via Lighthouse CI in your build pipeline. We don't just measure — we ship the code that fixes the numbers." },
  { n: "03", t: "Content & topical authority", d: "Search-intent-mapped content architecture, pillar and cluster strategy, expert-bylined long-form, and entity-rich pages designed for both classical SERP and AI answer extraction." },
  { n: "04", t: "Local SEO (Houston-first)", d: "Google Business Profile optimization, review flow automation, neighborhood-by-neighborhood SERP tracking, NAP consistency across 60+ citation sources, locally relevant schema." },
  { n: "05", t: "Generative Engine Optimization", d: "Structured data tuned for LLM retrieval, llms.txt, citation-friendly content patterns, and visibility tracking across ChatGPT, Perplexity, Gemini, and Google AI Overviews." },
  { n: "06", t: "Backlinks & digital PR", d: "Editorial outreach to Houston business press, vertical publications, and authoritative directories. White-hat only. No PBNs, no link farms, no shortcuts that get you penalized in 18 months." },
];

const proof = [
  { k: "+312%", l: "Median organic traffic lift, 12mo retainer clients" },
  { k: "#1–3", l: "Local-pack ranking on primary service+geo queries" },
  { k: "98", l: "Avg Lighthouse performance score at launch" },
  { k: "0", l: "Manual actions or core-update penalties on managed sites" },
];

export const Route = createFileRoute("/services/seo")({
  component: SeoPage,
  head: () => ({
    meta: [
      { title: "Houston SEO Services — Rank on Google & AI Search | Atlas Houston" },
      {
        name: "description",
        content:
          "Houston SEO engineered by developers, not marketers. Technical SEO, Core Web Vitals, local pack, content strategy, and Generative Engine Optimization for ChatGPT, Perplexity, and Google AI Overviews.",
      },
      { property: "og:title", content: "Houston SEO Services — Atlas Houston" },
      {
        property: "og:description",
        content:
          "We don't write reports — we ship the code that ranks. Houston technical SEO, local pack, and AI search visibility from a senior engineering team.",
      },
      { property: "og:url", content: "/services/seo" },
    ],
    links: [{ rel: "canonical", href: "/services/seo" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Search Engine Optimization",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston Houston",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Technical SEO, Core Web Vitals engineering, local SEO, content strategy, and Generative Engine Optimization for Houston businesses.",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
});

function SeoPage() {
  return (
    <SiteLayout>
      {/* SIGNATURE HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-44 pb-28 md:pb-40 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[44rem] w-[44rem] rounded-full bg-primary/25 blur-[160px] animate-orb" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[160px] animate-orb-alt" />

        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              SIGNATURE PRACTICE — SEO & AI SEARCH
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-medium tracking-[-0.03em] leading-[0.88] text-balance mb-12">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>The</span></span>{" "}
            <span className="mask-line"><span style={{ animationDelay: "120ms" }} className="text-gold italic">first result</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "260ms" }}>is engineered.</span></span>
          </h1>

          <Reveal delay={500} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              We don't write 40-page SEO reports and email them to your developer. We{" "}
              <em className="text-foreground not-italic font-medium">are</em> the developer. We
              build the site, fix the schema, ship the structured data, hit the Core Web Vitals
              budget, and watch the SERP move — same week.
            </p>
          </Reveal>

          <Reveal delay={680} className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="cta-lux px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Book a Free SEO Audit →
            </Link>
            <a
              href="#tactics"
              className="px-9 py-5 border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
            >
              See the practice ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* PROOF NUMBERS */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {proof.map((s) => (
          <div key={s.l} className="p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
            <div className="font-serif text-5xl md:text-7xl text-gold font-medium tracking-tight">{s.k}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-5">
              {s.l}
            </div>
          </div>
        ))}
      </section>

      {/* WHY WE'RE DIFFERENT */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Why Atlas Houston SEO is different
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              SEO is engineering. We are engineers.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              Most SEO agencies are content shops with a Yoast plugin. They will audit your site,
              recommend changes, and then send the file to your developer — who has eight other
              tickets and no SEO context. Three months later nothing has shipped, rankings have not
              moved, and someone is asking why the retainer exists.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Atlas Houston is the developer{" "}
              <em className="text-foreground not-italic">and</em> the SEO team. We hold the
              codebase. We ship the schema, the redirects, the structured data, the rendered HTML,
              the image optimization, and the internal-link graph — same week. When Google rolls out
              a core update we read the chatter, diagnose impact within hours, and push the fix to
              production by Tuesday. There is no contractor in the middle.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              This is also why we are unusually good at recovery work — sites that lost rank after
              a migration, picked up a manual action, or got crushed by a competitor's content
              expansion. We can read the server logs, the Search Console exports, and the codebase
              in the same afternoon.
            </p>
          </div>
        </div>
      </section>

      {/* TACTICS */}
      <section id="tactics" className="border-b border-border scroll-mt-24">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // The Practice
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Six disciplines. One integrated retainer.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-border">
          {tactics.map((t, i) => (
            <article
              key={t.n}
              className={`p-8 md:p-12 border-b border-border ${i % 3 !== 2 ? "lg:border-r" : ""} ${i % 2 !== 1 ? "md:border-r lg:border-r" : ""} group`}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-primary text-[11px] tracking-[0.3em]">{t.n}</span>
                <span className="hairline-gold flex-1" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-4 group-hover:text-primary transition-colors duration-500">
                {t.t}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">{t.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* AI SEARCH SPOTLIGHT */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border bg-card">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
              // Spotlight — Generative Engine Optimization
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-8">
              Rank in <span className="text-gold italic">ChatGPT.</span> Rank in <span className="text-gold italic">Perplexity.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In 2026, the search bar is not the only place customers find you. Generative engines
              cite a small number of authoritative sources for any given question — and being one
              of them compounds as fast as a #1 SERP ranking once did. Our GEO practice is built
              into every site we ship.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {[
              { t: "LLM-parseable schema", d: "Organization, Service, FAQPage, HowTo, Product, BreadcrumbList — implemented and validated against Google's Rich Results test on every page." },
              { t: "Entity-rich content", d: "Pages structured around the entities (people, places, services, concepts) that LLM retrieval grounds on, not just keywords." },
              { t: "llms.txt + clean sitemaps", d: "Discovery files that signal what to read, what to skip, and how often things change. Treated as a first-class deliverable." },
              { t: "Mention monitoring", d: "Weekly tracking of brand and topic citations across ChatGPT, Perplexity, Gemini, and Google AI Overviews — reported alongside classical rank." },
            ].map((b) => (
              <div key={b.t} className="p-8 bg-background">
                <h3 className="font-serif text-xl font-medium tracking-tight mb-3 text-primary">{b.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section className="border-b border-border grid md:grid-cols-12">
        <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
            // 90-day onboarding
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">
            What the first 90 days look like.
          </h2>
          <ol className="space-y-8">
            {[
              { n: "Wk 1", t: "Free audit & baseline", d: "Search Console export, Lighthouse run, schema validation, server-log review, competitor SERP analysis. You receive the written audit whether you continue with us or not." },
              { n: "Wk 2–3", t: "Technical fixes shipped", d: "Indexability, canonicals, schema, sitemap, robots, Core Web Vitals quick wins, internal link graph cleanup. Most show measurable rank movement by week 4." },
              { n: "Wk 4–8", t: "Content & local rollout", d: "Pillar-and-cluster content plan, Google Business Profile optimization, citation cleanup, review-generation flow installation, neighborhood SERP tracking." },
              { n: "Wk 9–12", t: "GEO & authority", d: "LLM-parseable schema, entity expansion, digital PR outreach, llms.txt deployment, mention-tracking dashboard delivered." },
              { n: "Mo 4+", t: "Ongoing retainer", d: "Monthly content cadence, quarterly technical audits, core-update rapid response, monthly executive report tied to revenue." },
            ].map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-6">
                <div className="font-mono text-primary text-xs uppercase tracking-[0.25em] min-w-16">{s.n}</div>
                <div>
                  <h4 className="text-xl font-semibold tracking-tight mb-2">{s.t}</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{s.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="md:col-span-5 p-8 md:p-12 bg-card">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
            // Free audit
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-6">
            Get a no-cost SEO audit this week.
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            We'll run a full technical, content, and local SEO baseline on your existing site, deliver
            a written report within 5 business days, and walk you through the top 10 priorities on
            a 30-minute call. No retainer required, no obligation.
          </p>
          <ul className="space-y-3 mb-10 text-sm text-foreground/90">
            {[
              "Lighthouse + Core Web Vitals scorecard",
              "Search Console & indexation review",
              "Schema and structured-data audit",
              "Top 25 competitor SERP gap analysis",
              "Google Business Profile + local pack diagnosis",
              "AI search visibility check (ChatGPT, Perplexity, Gemini)",
            ].map((x) => (
              <li key={x} className="flex gap-3"><span className="text-primary">◆</span><span>{x}</span></li>
            ))}
          </ul>
          <Link
            to="/contact"
            className="cta-lux inline-block px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
          >
            Request the Audit →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-12 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Frequently asked
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              SEO questions we answer every week.
            </h2>
          </div>
          <div className="md:col-span-8 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="cursor-pointer flex justify-between items-center gap-6 list-none">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {f.q}
                  </h3>
                  <span className="font-mono text-primary text-sm transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Ready to rank?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Free audit, written report, walkthrough call. If we're not the right fit you still
              walk away with a 30-page document worth keeping.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cta-lux inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Book the Free Audit →
              </Link>
              <a
                href="tel:+17135550140"
                className="inline-block px-8 py-4 border border-background/40 text-background font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors"
              >
                (713) 555-0140
              </a>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
