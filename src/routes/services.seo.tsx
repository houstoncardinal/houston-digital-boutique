import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const clientOutcomes = [
  {
    name: "BluTouch Pools",
    domain: "blutouchpools.com",
    url: "https://www.blutouchpools.com",
    sector: "Pool Construction",
    stat: "+218%",
    statLabel: "organic leads YoY",
    insight:
      "Houston pool builders face fierce local competition. We restructured the site's service-area architecture, fixed duplicate-content issues across 14 city pages, and built a review-generation flow that tripled their Google Business Profile reviews in 90 days. They now own the local pack for \"pool builder\" in 6 Houston-area neighborhoods.",
  },
  {
    name: "SVR Law Firm",
    domain: "svrlawfirm.com",
    url: "https://www.svrlawfirm.com",
    sector: "Legal Services",
    stat: "#1",
    statLabel: "local-pack for primary queries",
    insight:
      "Personal injury and immigration searches in Houston are among the highest-value SERPs in the city. We rebuilt the site's technical foundation (server-rendered HTML, proper canonicals, lawyer-level E-E-A-T signals), wrote pillar content for Spanish-speaking audiences, and implemented Attorney and LegalService schema — resulting in consistent local-pack placement for primary practice-area + geo queries.",
  },
  {
    name: "HOU GEN PROS",
    domain: "hougenpros.com",
    url: "https://www.hougenpros.com",
    sector: "Home Services",
    stat: "4.2×",
    statLabel: "organic traffic in 6 months",
    insight:
      "A generator installation and home-services contractor with no prior SEO infrastructure. We built a location-page strategy covering 22 Houston zip codes, fixed crawlability issues that had suppressed 60% of the site from being indexed, and launched a neighborhood-blog content program. Organic calls went from near-zero to the primary lead channel.",
  },
  {
    name: "Houston Enterprise",
    domain: "houinc.com",
    url: "https://www.houinc.com",
    sector: "Construction",
    stat: "Top 3",
    statLabel: "commercial construction queries",
    insight:
      "Commercial construction is dominated by long-established players with high domain authority. We built topical authority through a structured content program, earned editorial placements in Houston Business Journal and several industry verticals, and implemented a full Service + Organization schema stack — moving them into the top 3 positions on key commercial GC queries within 8 months.",
  },
  {
    name: "Vargas Tax",
    domain: "vargas.tax",
    url: "https://www.vargas.tax",
    sector: "Financial Services",
    stat: "2.8×",
    statLabel: "organic bookings during tax season",
    insight:
      "Tax services have an intense seasonal SERP. We built bilingual (English/Spanish) landing pages, optimized their Google Business Profile with category signals specific to tax preparation, and created an FAQ content cluster that now captures featured-snippet positions for over 30 high-intent questions — driving significantly more organic bookings during peak season.",
  },
  {
    name: "United CCR",
    domain: "unitedccr.com",
    url: "https://www.unitedccr.com",
    sector: "Commercial Restoration",
    stat: "0→60",
    statLabel: "ranking keywords in 90 days",
    insight:
      "A commercial cleaning and restoration company with a brand-new domain. We launched with a technical SEO foundation (indexed, canonical, schema-complete on day one), a location-authority content strategy for Greater Houston, and an outreach program targeting commercial real estate directories. From zero to 60+ ranking keywords in 90 days — a near-record onboarding velocity for a new domain in a competitive vertical.",
  },
];

const faqs = [
  {
    q: "How long does SEO actually take to work?",
    a: "Technical fixes — Core Web Vitals, indexability, schema, internal linking — typically show ranking movement within 2–6 weeks. Content authority, the work of out-ranking established competitors on commercial queries, compounds starting around month 3 and shows a step-change at month 6. We publish a baseline scorecard before any engagement so you are measuring against a real line, not vibes.",
  },
  {
    q: "Is SEO worth it for a small Houston business?",
    a: "Almost always yes — and almost always more than paid search. A roofer in Spring, a dental practice in the Heights, a freight broker in the Energy Corridor: ranking #1–3 on the queries customers actually type captures intent that never has to be re-bought. We have seen single local pages return 12-month organic value of $40k–$200k for service businesses against a one-time content investment of a fraction of that.",
  },
  {
    q: "What about AI search — ChatGPT, Perplexity, Gemini, Google AI Overviews?",
    a: "Generative engine optimization (GEO) is a first-class part of every engagement. That means structured data the LLMs actually parse (Organization, Service, FAQPage, HowTo, Product, BreadcrumbList), entity-rich content that establishes you as the authority on a topic, llms.txt and well-formed sitemaps, citation-friendly formatting, and monitoring of brand mentions inside the major AI engines. The sites we ship in 2026 are designed to win both the SERP and the AI answer box.",
  },
  {
    q: "Do you do local SEO, Google Business Profile, and citation building?",
    a: "Yes — and this is where most Houston businesses see the fastest commercial impact. Full Google Business Profile optimization, weekly post cadence, review-generation flow into Google and industry verticals, NAP consistency across 60+ citation sources, and local-pack ranking tracked by neighborhood. Heights vs. Sugar Land vs. Pearland have meaningfully different SERPs, and we treat them that way.",
  },
  {
    q: "How is your SEO different from a marketing agency or freelance consultant?",
    a: "Three differences. First, we are engineers — we can actually fix Core Web Vitals, rewrite render-blocking JavaScript, implement schema, and ship a site rebuild ourselves. Most agencies write a 40-page audit and email it to your developer. Second, we operate the sites we build, so SEO changes ship same-week without a contractor handoff. Third, we report in revenue-attributable metrics — organic leads, organic bookings, organic revenue — not vanity keyword counts.",
  },
  {
    q: "What if my site already has SEO problems — penalties, indexing issues, duplicate content?",
    a: "Bring it. We have untangled migrations that dropped 80% of indexed pages, recovered sites from manual actions, deindexed legacy staging environments leaking equity, and rebuilt URL structures without losing rank. Recovery work starts with a full Search Console export, server-log review, and a written remediation plan with a 90-day rank-recovery forecast.",
  },
  {
    q: "Do you handle content writing or just technical SEO?",
    a: "Both — and the two are inseparable in how we approach them. Technical SEO without content hits a ceiling fast; content without technical infrastructure never gets indexed properly. Our team includes senior writers with deep vertical expertise in legal, construction, healthcare, and financial services. All content is search-intent mapped before a word is written, and SEO-validated before it ships.",
  },
  {
    q: "What does a typical monthly retainer look like?",
    a: "After the 90-day onboarding (technical audit, fixes, local optimization, GEO infrastructure), a standard retainer includes: 2–4 new or updated content pieces per month, a monthly executive report tied to leads and revenue (not just keyword rankings), quarterly technical audits, core-update rapid response within 24 hours, and ongoing Google Business Profile management. Retainers start at $1,800/month for small businesses and scale with the scope of content production.",
  },
  {
    q: "Can you work alongside our existing developer or marketing team?",
    a: "Yes. Many clients bring us in as the SEO layer on top of an existing CMS or development team. We provide implementation specs, review pull requests for SEO impact, deliver structured-data snippets ready to paste, and run monthly alignment calls with the broader team. We can also take the wheel entirely — it depends on what you have in-house.",
  },
];

const tactics = [
  { n: "01", t: "Technical SEO", d: "Crawlability, indexability, canonicalization, server-rendered HTML, structured data, robots.txt, XML and image sitemaps, internal link graph engineering, hreflang for multi-region." },
  { n: "02", t: "Core Web Vitals", d: "LCP, INP, CLS budgets enforced via Lighthouse CI in your build pipeline. We don't just measure — we ship the code that fixes the numbers." },
  { n: "03", t: "Content & Topical Authority", d: "Search-intent-mapped content architecture, pillar and cluster strategy, expert-bylined long-form, and entity-rich pages designed for both classical SERP and AI answer extraction." },
  { n: "04", t: "Local SEO (Houston-first)", d: "Google Business Profile optimization, review flow automation, neighborhood-level SERP tracking, NAP consistency across 60+ citation sources, locally relevant schema." },
  { n: "05", t: "Generative Engine Optimization", d: "Structured data tuned for LLM retrieval, llms.txt, citation-friendly content patterns, and visibility tracking across ChatGPT, Perplexity, Gemini, and Google AI Overviews." },
  { n: "06", t: "Backlinks & Digital PR", d: "Editorial outreach to Houston business press, vertical publications, and authoritative directories. White-hat only. No PBNs, no link farms, no shortcuts that trigger penalties." },
];

const proof = [
  { k: "+312%", l: "Median organic traffic lift, 12-month retainer clients" },
  { k: "#1–3", l: "Local-pack ranking on primary service + geo queries" },
  { k: "98", l: "Avg Lighthouse performance score at launch" },
  { k: "0", l: "Manual actions or core-update penalties on managed sites" },
];

const industries = [
  {
    name: "Legal & Professional Services",
    insight:
      "Houston legal SERPs are among the most competitive and highest-value in any city. Personal injury, immigration, family law, and estate planning queries carry CPCs of $30–$120 in paid — which means organic placement is worth proportionally more. We build E-E-A-T signals specifically for legal (attorney bios, bar association citations, practice-area schema), bilingual content for Spanish-speaking clients, and track local-pack placement by courthouse neighborhood.",
  },
  {
    name: "Construction & Home Services",
    insight:
      "Roofing, HVAC, pool building, general contracting — Houston's extreme weather and growth market make these among the most searched service categories in the region. The difference between page 1 and page 3 is often an installation-year domain advantage we can overcome with technical foundation and neighborhood-specific location pages. We have placed 6 Houston contractors into local pack on their primary query within 90 days.",
  },
  {
    name: "Healthcare & Medical",
    insight:
      "Houston is the largest medical market in the US outside the Northeast. Practices, specialty clinics, and MedSpas compete for neighborhood-level search visibility that drives appointment bookings. Our healthcare SEO work combines HIPAA-compliant schema (no PII in structured data), patient-review strategy across Google and Healthgrades, bilingual content for Houston's multilingual patient population, and local-pack optimization by clinic ZIP.",
  },
  {
    name: "Financial, Tax & Professional Services",
    insight:
      "Tax preparers, CPAs, bookkeepers, and financial advisors face intense seasonal search pressure. We build bilingual landing pages, FAQ content clusters for featured-snippet capture, and review flows tuned for IRS-related trust signals. Our work for Vargas Tax tripled their organic bookings in a single tax season — driven almost entirely by FAQ content and Google Business Profile authority, not paid ads.",
  },
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
      { property: "og:url", content: "https://atlashouston.com/services/seo" },
    ],
    links: [{ rel: "canonical", href: "https://atlashouston.com/services/seo" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Houston SEO & AI Search Optimization",
          serviceType: "Search Engine Optimization",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston",
            url: "https://atlashouston.com",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Technical SEO, Core Web Vitals engineering, local SEO, content strategy, and Generative Engine Optimization for Houston businesses.",
          offers: { "@type": "Offer", priceRange: "$1,800–$12,000+/mo" },
          areaServed: { "@type": "City", name: "Houston" },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://atlashouston.com" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://atlashouston.com/services" },
            { "@type": "ListItem", position: 3, name: "SEO & AI Search", item: "https://atlashouston.com/services/seo" },
          ],
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
      {/* HERO */}
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

      {/* PROOF STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {proof.map((s) => (
          <div key={s.l} className="p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
            <div className="font-serif text-5xl md:text-7xl text-gold font-medium tracking-tight">{s.k}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-5">{s.l}</div>
          </div>
        ))}
      </section>

      {/* CLIENT OUTCOMES STRIP */}
      <section className="border-b border-border">
        <div className="px-6 md:px-12 pt-16 pb-8">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-3">// Houston clients — organic results</div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95]">
            Real businesses. Real rank. Real revenue.
          </h2>
        </div>
        <div className="overflow-x-auto pb-8 px-6 md:px-12">
          <div className="flex gap-4 min-w-max pb-2">
            {clientOutcomes.map((c) => (
              <article
                key={c.name}
                className="flex-shrink-0 w-72 border border-border bg-card p-7 flex flex-col gap-4 hover:border-primary/50 transition-colors duration-300"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary bg-primary/10 px-2 py-1">{c.sector}</span>
                  <a
                    href={c.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[9px] text-muted-foreground hover:text-primary transition-colors"
                  >
                    {c.domain} ↗
                  </a>
                </div>
                <div>
                  <div className="font-serif text-4xl text-gold font-medium">{c.stat}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">{c.statLabel}</div>
                </div>
                <h3 className="font-semibold text-base tracking-tight">{c.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.insight}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* EDITORIAL ESSAY */}
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
          <div className="md:col-span-8 space-y-8">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              Most SEO agencies are content shops with a Yoast plugin. They will audit your site,
              recommend changes, and email the file to your developer — who has eight other tickets
              and no SEO context. Three months later nothing has shipped, rankings have not moved, and
              someone is asking why the retainer still exists.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Atlas Houston is the developer{" "}
              <em className="text-foreground not-italic font-medium">and</em> the SEO team. We hold
              the codebase. Schema changes, redirects, structured data, server-rendered HTML, image
              optimization, internal-link graph engineering — all of it ships same-week without a
              contractor in the middle. When Google rolls a core update, we read the signal,
              diagnose impact within hours, and push the fix to production by Tuesday.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              This is also why we are unusually effective at recovery work — sites that lost rank
              after a migration, accumulated manual actions, or collapsed under a competitor's
              content expansion. We can read the server logs, the Search Console exports, and the
              codebase in the same afternoon. No ticket to file, no meeting to schedule, no
              agency-to-developer translation step.
            </p>

            {/* Pull quote */}
            <blockquote className="border-l-2 border-primary pl-8 py-2 my-8">
              <p className="font-serif text-2xl md:text-3xl font-medium tracking-tight leading-snug text-foreground">
                "91% of pages on the internet receive zero organic traffic. Not because they are bad
                pages — because they are technically invisible. We fix that at the code level."
              </p>
              <footer className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                Atlas Houston — SEO Practice Lead
              </footer>
            </blockquote>

            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              In 2026, ranking is no longer just about Google. Generative engines — ChatGPT,
              Perplexity, Gemini, Google AI Overviews — now answer questions that used to drive
              search clicks. The sites that appear in those answers are not the ones with the most
              backlinks. They are the ones with machine-readable structured data, clean entity
              graphs, and content written in a citation-friendly format. We build all of that into
              every engagement from day one.
            </p>
          </div>
        </div>
      </section>

      {/* TACTICS */}
      <section id="tactics" className="border-b border-border scroll-mt-24">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// The Practice</div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Six disciplines. One integrated retainer.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-border">
          {tactics.map((t, i) => (
            <article
              key={t.n}
              className={[
                "p-8 md:p-12 border-b border-border group",
                i % 3 !== 2 ? "lg:border-r" : "",
                i % 2 === 0 ? "md:border-r lg:border-r-0" : "md:border-r-0",
                i % 3 === 0 && i % 2 === 0 ? "md:border-r lg:border-r" : "",
              ].join(" ")}
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

      {/* COMPARISON TABLE */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="mb-12">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// How we compare</div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
            Engineer-led SEO vs. the alternatives.
          </h2>
        </div>
        <div className="overflow-x-auto border border-border">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground w-40">Capability</th>
                <th className="p-5 font-mono text-[10px] uppercase tracking-[0.2em] bg-card text-primary">Atlas Houston</th>
                <th className="p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Marketing Agency</th>
                <th className="p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Freelance SEO</th>
                <th className="p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">DIY / Plugin</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Technical fixes shipped", "✓ In-house, same week", "✗ External dev handoff", "~ Depends on skills", "✗ Audit only"],
                ["Core Web Vitals engineering", "✓ Code-level, all pages", "~ Recommendations only", "~ Partial", "✗ Plugin-limited"],
                ["Structured data / schema", "✓ Full stack, validated", "~ Template-based", "~ Basic types only", "✗ Generic"],
                ["Generative Engine Optimization", "✓ LLMs.txt + monitoring", "✗ Not standard", "✗ Not standard", "✗ Not standard"],
                ["Local SEO (multi-neighborhood)", "✓ ZIP-level tracking", "~ City-level only", "~ Varies", "~ Basic GBP"],
                ["Content production", "✓ SEO-mapped, expert-written", "✓ High volume / lower depth", "~ Varies", "✗ Self-serve"],
                ["Recovery from penalties / drops", "✓ Server-log diagnosis", "~ Report + guidance", "~ Case by case", "✗"],
                ["Reporting unit", "Revenue & leads", "Keyword rankings", "Keyword rankings", "Traffic only"],
              ].map(([cap, atlas, agency, freelance, diy]) => (
                <tr key={cap} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
                  <td className="p-5 font-medium text-foreground">{cap}</td>
                  <td className="p-5 bg-card text-foreground font-medium">{atlas}</td>
                  <td className="p-5 text-muted-foreground">{agency}</td>
                  <td className="p-5 text-muted-foreground">{freelance}</td>
                  <td className="p-5 text-muted-foreground">{diy}</td>
                </tr>
              ))}
            </tbody>
          </table>
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
              Rank in <span className="text-gold italic">ChatGPT.</span><br />
              Rank in <span className="text-gold italic">Perplexity.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              In 2026, the search bar is not the only place customers find you. Generative engines
              cite a small number of authoritative sources per question — and being one of them
              compounds as fast as a #1 SERP ranking once did. Our GEO practice is built into every
              site we ship.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {[
              { t: "LLM-parseable schema", d: "Organization, Service, FAQPage, HowTo, Product, BreadcrumbList — implemented and validated against Google's Rich Results test on every page, every update." },
              { t: "Entity-rich content", d: "Pages structured around the entities (people, places, services, concepts) that LLM retrieval grounds on, not just keywords. Topical depth over keyword density." },
              { t: "llms.txt + clean sitemaps", d: "Discovery files that signal what to read, what to skip, and how often content changes. Treated as a first-class SEO deliverable alongside robots.txt and XML sitemaps." },
              { t: "Mention monitoring", d: "Weekly tracking of brand and topic citations across ChatGPT, Perplexity, Gemini, and Google AI Overviews — reported alongside classical rank position in monthly executive reports." },
            ].map((b) => (
              <div key={b.t} className="p-8 bg-background">
                <h3 className="font-serif text-xl font-medium tracking-tight mb-3 text-primary">{b.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOUSTON INDUSTRIES */}
      <section className="border-b border-border">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// Houston industry depth</div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Deep vertical knowledge. Real Houston market intelligence.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 border-t border-border">
          {industries.map((ind, i) => (
            <article
              key={ind.name}
              className={[
                "p-8 md:p-12 border-b border-border group",
                i % 2 === 0 ? "md:border-r" : "",
              ].join(" ")}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="hairline-gold flex-1" />
                <span className="font-mono text-primary text-[11px] tracking-[0.3em]">0{i + 1}</span>
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-4 group-hover:text-primary transition-colors duration-500">
                {ind.name}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">{ind.insight}</p>
            </article>
          ))}
        </div>
      </section>

      {/* 90-DAY ONBOARDING + FREE AUDIT */}
      <section className="border-b border-border grid md:grid-cols-12">
        <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">// 90-day onboarding</div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">
            What the first 90 days look like.
          </h2>
          <ol className="space-y-8">
            {[
              { n: "Wk 1", t: "Free audit & baseline", d: "Search Console export, Lighthouse run, schema validation, server-log review, competitor SERP analysis. You receive the written audit whether you continue with us or not." },
              { n: "Wk 2–3", t: "Technical fixes shipped", d: "Indexability, canonicals, schema, sitemap, robots, Core Web Vitals quick wins, internal link graph cleanup. Most clients see measurable rank movement by week 4." },
              { n: "Wk 4–8", t: "Content & local rollout", d: "Pillar-and-cluster content plan, Google Business Profile optimization, citation cleanup, review-generation flow, neighborhood SERP tracking." },
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
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">// Free audit</div>
          <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-6">
            Get a no-cost SEO audit this week.
          </h3>
          <p className="text-base text-muted-foreground leading-relaxed mb-8">
            We'll run a full technical, content, and local SEO baseline on your existing site, deliver
            a written report within 5 business days, and walk you through the top 10 priorities on
            a 30-minute call. No retainer required. No obligation.
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
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// Frequently asked</div>
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
                  <span className="font-mono text-primary text-sm transition-transform group-open:rotate-45 shrink-0">+</span>
                </summary>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-3xl">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* RELATED SERVICES */}
      <section className="px-6 md:px-12 py-16 border-b border-border">
        <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-8">// Related services</div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-px bg-border border border-border">
          {[
            { to: "/services/websites", label: "Web Design", desc: "Conversion-focused sites with SEO baked into the architecture from day one." },
            { to: "/services/branding", label: "Branding", desc: "Brand identity that gives search engines and AI models consistent, citable entities." },
            { to: "/services/cloud-hosting", label: "Cloud & Hosting", desc: "Managed infra with Core Web Vitals SLAs and edge delivery for sub-second TTFB." },
          ].map((s) => (
            <Link
              key={s.to}
              to={s.to}
              className="bg-background p-8 group hover:bg-primary/5 transition-colors duration-200"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2 group-hover:opacity-80">
                {s.label} →
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <div>
            <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
              Ready to rank?
            </h2>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] opacity-70 mt-4">
              Serving Houston, Texas & national brands
            </p>
          </div>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg opacity-90">
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
