import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "What does an Atlas Houston branding engagement actually include?",
    a: "At minimum: naming (when applicable), a primary wordmark or logo system, full color and typography systems with accessibility-tested contrast, voice and messaging guidelines, and a delivered Figma library plus a printable brand book. Most engagements extend into packaging, signage, vehicle livery, social templates, and a pitch-deck system. We don't sell a 'logo package' — we build identity systems that survive scale.",
  },
  {
    q: "How is this different from a freelance designer or a Fiverr logo?",
    a: "Three differences. First, research: every brand we build starts with stakeholder interviews, a competitive audit, and a positioning workshop — not a moodboard. Second, system thinking: you receive a working set of tokens, components, and templates that your team and ours can implement consistently across every touchpoint, not a single logo file. Third, accountability: we sign on for revisions, future touchpoints, and the digital implementation. The brand goes live the way it was designed.",
  },
  {
    q: "Can you rebrand without breaking the SEO and customer trust we already have?",
    a: "Yes — and it's most of what we do. A staged rebrand keeps the existing visual equity working while the new system is rolled out across digital, retail, and operational touchpoints. We provide a transition timeline, a redirect and meta-tag map for any URL or naming changes, and customer-facing comms templates. Done well, a rebrand strengthens search authority rather than resetting it.",
  },
  {
    q: "Do you handle trademark search and registration?",
    a: "We run a preliminary USPTO and common-law clearance during naming. For formal registration we partner with a Houston-based IP attorney who handles filings on a flat fee. We don't practice law, but we won't ship you a name that's going to get a cease-and-desist letter in month four.",
  },
  {
    q: "How long does a brand identity take?",
    a: "Naming alone: 3–4 weeks. Identity system without naming: 5–8 weeks. Full rebrand with packaging, signage, and digital rollout: 10–16 weeks. We work in weekly milestones with a single point of contact and one decision-maker on your side — multi-stakeholder reviews that drag projects out are the single biggest cost killer, and our process is designed to prevent them.",
  },
  {
    q: "What if our industry is 'unbrandable' — HVAC, dental, freight, B2B services?",
    a: "Those are exactly the industries where a real brand creates the most leverage. Most of your competitors look identical. A confident, modern, well-executed identity creates an immediate signal of operational quality — and we have the case studies to back it up. BluTouch Pools competes against national chains on identity alone. SVR Law Firm serves three language communities with a single coherent brand.",
  },
  {
    q: "Can you design for both English and Spanish language audiences?",
    a: "Yes — and Vietnamese, too. SVR Law Firm is a trilingual identity we built from the ground up: wordmark, typography, messaging architecture, and all production files work fluidly across English, Spanish, and Vietnamese without visual or linguistic compromise. If your Houston business serves a multilingual market, that complexity is a brand advantage we know how to design for.",
  },
  {
    q: "Do you handle social media profile and ad template design as part of the engagement?",
    a: "Yes. Every engagement includes a social-ready asset kit: profile image and cover photo variants optimized for each major platform, story and reel templates, and a static ad template set in Figma. For clients on retainer, we extend into animated ad variants, seasonal template refreshes, and campaign-specific system expansions. The brand doesn't stop at the brand book — it lives in everything you post.",
  },
];

const pillars = [
  {
    n: "01",
    t: "Naming & verbal identity",
    sub: "Strategy · Linguistics · IP",
    d: "Generative naming sprints with linguistic analysis, domain availability screening, and preliminary USPTO clearance on every candidate. We produce taglines, value propositions, voice guidelines, and a full messaging architecture with elevator pitches, boilerplate, and a do/don't tone matrix your team can actually apply. The verbal layer is not a footnote — it is where most brand failures begin.",
  },
  {
    n: "02",
    t: "Visual identity system",
    sub: "Marks · Type · Color · Motion",
    d: "Wordmark and symbol design through three distinct creative directions, presented in real context — storefront, mobile app, billboard. One direction selected and refined into a full system: accessible color palette, typography pairing with licensing notes, motion principles, and photography art direction. Delivered as a Figma library, brand book PDF, and a complete exported asset kit in SVG, PDF, and PNG at every required size and context variant.",
  },
  {
    n: "03",
    t: "Packaging, signage & environment",
    sub: "Print · Production · Vendor liaison",
    d: "Physical-world execution for the touchpoints your customers encounter before they ever visit your website: product packaging, retail and office signage, vehicle livery and truck wraps, trade-show booths, uniform direction. We produce print-ready, production-spec files and manage vendor liaison so what we design is what actually gets made — not a compromised approximation of it.",
  },
  {
    n: "04",
    t: "Digital implementation",
    sub: "Web · App · Social · Decks",
    d: "The brand applied across every digital touchpoint you ship this quarter: website, mobile app, social template library, pitch deck system, email signatures, and ad templates. Because the same studio that built the brand builds the site, nothing gets lost in translation from Figma to browser. The brand goes live the way it was designed — not the way a hand-off to a third-party developer interpreted it.",
  },
];

const proof = [
  { k: "40+", l: "Brand systems shipped since 2018" },
  { k: "3", l: "Senior brand leads on staff" },
  { k: "AAA", l: "Contrast tested on every palette" },
  { k: "USPTO", l: "Preliminary clearance on every name" },
];

const system = [
  {
    t: "Wordmark + symbol",
    d: "Primary lockup with monogram, clear-space rules, minimum-size specs, and dark/light/reversed variants exported in SVG, PDF, and PNG at every required size. Favicon and app-icon variants included.",
  },
  {
    t: "Color system",
    d: "Primary, secondary, neutral, and semantic colors with WCAG 2.2 AA contrast verified across every documented pairing. AAA where achievable. Tints, shades, and a semantic palette for digital UI states.",
  },
  {
    t: "Typography pairing",
    d: "Display, body, and monospace selections with licensing notes, fallback stacks, and a complete type scale tuned for web, mobile, and print. Variable font configurations where available for performance and flexibility.",
  },
  {
    t: "Voice & messaging",
    d: "Voice principles, do/don't examples, value proposition, elevator pitch, boilerplate, and a tone matrix that scales across formal correspondence, marketing copy, and conversational social contexts.",
  },
  {
    t: "Photography & illustration",
    d: "Art-direction principles, sample shot list, talent and styling direction, and an illustration system tuned to work alongside photography — not fighting it. Stock-photography filter criteria if original photography isn't in scope.",
  },
  {
    t: "Templates & components",
    d: "Figma library with social posts (static and animated), pitch deck master, email signature, business card, letterhead, invoice, and a starter web component kit. Every template is wired to the token system — one color change updates everything.",
  },
];

const outcomes = [
  {
    client: "BluTouch Pools",
    url: "blutouchpools.com",
    sector: "Luxury pool construction",
    rating: "4.8★",
    headline: "Competing against national chains on identity alone.",
    body: "A luxury pool brand serving the Houston suburbs needed to command premium pricing in a market where the big names had massive marketing budgets. We built an identity that signaled craftsmanship before the sales conversation began — and justifies the price point on first impression.",
  },
  {
    client: "SVR Law Firm",
    url: "svrlawfirm.com",
    sector: "Personal injury & criminal defense",
    rating: "Trilingual",
    headline: "One brand. Three languages. One coherent identity.",
    body: "Serving English, Spanish, and Vietnamese communities across Houston, SVR needed an identity that worked across all three languages without visual compromise. Wordmark, typography, messaging architecture, and all production assets were designed to hold up in all three linguistic contexts simultaneously.",
  },
  {
    client: "HOU GEN PROS",
    url: "hougenpros.com",
    sector: "Generator installation",
    rating: "Emergency services",
    headline: "A brand built for the moment of crisis.",
    body: "Emergency generator services are sold in high-stress, time-compressed moments — a power outage, a hurricane warning, a flooded neighborhood. The brand needed to convey reliability, speed, and professional credibility in the first three seconds of a phone search. We built that identity.",
  },
  {
    client: "United CCR",
    url: "unitedccr.com",
    sector: "Disaster restoration",
    rating: "Trust under pressure",
    headline: "First impression when clients are most stressed.",
    body: "Disaster restoration clients are making decisions in the worst moments of their lives. United CCR's brand needed to project calm authority and operational competence from the first touchpoint — before a single conversation. The identity communicates exactly that: trust under pressure.",
  },
];

const rebrandSignals = [
  {
    n: "01",
    t: "You're losing to competitors that look more premium than they actually are.",
    d: "If a competitor with inferior service is winning the first impression because their identity signals quality and yours doesn't — that's a solvable brand problem. Perception creates reality before a single conversation happens.",
  },
  {
    n: "02",
    t: "Your logo looks different on your truck, your Instagram, and your business card.",
    d: "Logo inconsistency is not an aesthetic problem — it is a trust and operational problem. It signals disorganization to every customer, partner, and new hire who encounters it. A real identity system prevents this structurally.",
  },
  {
    n: "03",
    t: "You're embarrassed to give someone your business card.",
    d: "If you hesitate before handing over a card, apologize for the website, or downplay the way your company looks — that feeling is data. The cost of a professional identity is almost always a fraction of the business it costs you.",
  },
  {
    n: "04",
    t: "Your brand was designed in 2009 and it shows.",
    d: "A 15-year-old logo can still be great. Most aren't. If your identity was built for a pre-smartphone, pre-social-media, pre-high-DPI world, it was not designed for the screens and contexts your customers encounter you on today.",
  },
  {
    n: "05",
    t: "You've outgrown your name — or you're expanding into new markets.",
    d: "If your name is geography-locked, service-locked, or founder-locked and you're expanding, the brand is now a ceiling. Naming and identity work done now prevents a forced, reactive rebrand later — always more expensive and always more disruptive.",
  },
];

const industries = [
  {
    sector: "Legal & Professional Services",
    insight:
      "Houston's legal market is saturated. Harris County alone has over 14,000 licensed attorneys. A confident, modern identity is the first credibility signal before a client reads a single word — and in a world where legal consumers compare three firms in twenty minutes on a phone, the one that looks most authoritative gets the call. We've built identities for personal injury, criminal defense, and multi-practice firms that compete against downtown firms twice their size.",
    tag: "Law · Accounting · Consulting · Financial advisory",
  },
  {
    sector: "Construction & Trades",
    insight:
      "Most Houston contractors look identical — same stock photos, same clipart fonts, same absence of any differentiation. A real brand is a decision that earns trust at 60 miles per hour on the freeway and justifies a premium quote over the competition. We have built identity systems for pool builders, generator installers, restoration contractors, and construction firms where the brand was the single highest-ROI investment they made that year.",
    tag: "General contractors · Trades · Restoration · Builders",
  },
  {
    sector: "Healthcare & Wellness",
    insight:
      "Houston's healthcare consumers are sophisticated and their expectations are rising. An identity that communicates clinical credibility and warmth simultaneously — without defaulting to the medical stock-photo clichés of a blue cross and a smiling family — is a subspecialty we have built multiple times. The brand has to work on a medical campus directory sign and a Google Ads creative in the same afternoon.",
    tag: "Clinics · Dental · Wellness · Medical practices",
  },
  {
    sector: "Food, Hospitality & Retail",
    insight:
      "In Houston's restaurant and retail market, brand is the product. The identity is the experience before a customer walks in the door — before the food arrives, before the fitting room, before the first service interaction. Houston's dining scene is genuinely world-class and intensely competitive. The brands that earn loyalty are the ones that create a complete, considered aesthetic world, not just a logo on a menu.",
    tag: "Restaurants · Retail · Hospitality · CPG",
  },
];

const comparisonRows = [
  {
    factor: "Deliverables scope",
    atlas: "Naming, wordmark, full color + type system, voice, Figma library, brand book, social/deck/email templates",
    freelance: "Logo files; may include basic style guide",
    logoOnly: "Logo in 2–3 file formats",
    canva: "Template-based; not original",
  },
  {
    factor: "Research & positioning",
    atlas: "Stakeholder interviews, competitive audit, positioning workshop, strategy brief",
    freelance: "Varies widely; often moodboard only",
    logoOnly: "None",
    canva: "None",
  },
  {
    factor: "USPTO screening",
    atlas: "Preliminary clearance on every name and mark",
    freelance: "Rarely; varies by individual",
    logoOnly: "None",
    canva: "None",
  },
  {
    factor: "Accessibility (WCAG contrast)",
    atlas: "AAA tested on every documented color pairing",
    freelance: "Rarely verified",
    logoOnly: "Not included",
    canva: "Not included",
  },
  {
    factor: "Digital implementation",
    atlas: "Same studio applies brand to website, app, social, ads",
    freelance: "Handoff to your developer; fidelity not guaranteed",
    logoOnly: "Not included",
    canva: "Self-service only",
  },
  {
    factor: "Revision rounds",
    atlas: "Structured: 3 creative directions → 2 revision rounds per phase",
    freelance: "Varies; often 1–2 rounds total",
    logoOnly: "Typically 1–2 included",
    canva: "Unlimited self-edits",
  },
  {
    factor: "What you own",
    atlas: "Full IP transfer; all source files; Figma library with editable tokens",
    freelance: "Varies; source files often extra",
    logoOnly: "Files in limited formats; source often extra",
    canva: "License to use; no source files; platform-dependent",
  },
  {
    factor: "Timeline",
    atlas: "5–8 weeks (identity); 10–16 weeks (full system with packaging + digital)",
    freelance: "2–8 weeks; deadline adherence varies",
    logoOnly: "1–2 weeks",
    canva: "Same day",
  },
];

export const Route = createFileRoute("/services/branding")({
  component: BrandingPage,
  head: () => ({
    meta: [
      { title: "Brand Identity Design in Houston | Atlas Houston" },
      {
        name: "description",
        content:
          "Houston branding studio. Naming, identity systems, packaging, signage, and digital rollout. 40+ brand systems shipped. USPTO-screened, WCAG AAA-tested, trilingual-capable.",
      },
      { property: "og:title", content: "Brand Identity — Atlas Houston" },
      {
        property: "og:description",
        content:
          "Naming, marks, voice, and full identity systems for Houston businesses. From app icon to billboard, designed to last. 7-person in-house expert studio since 2018.",
      },
      { property: "og:url", content: "/services/branding" },
    ],
    links: [{ rel: "canonical", href: "/services/branding" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Brand Identity Design",
          name: "Brand Identity Design — Atlas Houston",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston",
            url: "https://atlashouston.com",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Brand strategy, naming, identity systems, packaging, signage, and digital rollout for Houston businesses. USPTO-screened, WCAG AAA contrast-tested.",
          offers: {
            "@type": "Offer",
            areaServed: { "@type": "City", name: "Houston" },
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://atlashouston.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Services",
              item: "https://atlashouston.com/services",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Branding & Identity",
              item: "https://atlashouston.com/services/branding",
            },
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

function BrandingPage() {
  return (
    <SiteLayout>
      {/* ── HERO ── */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-44 pb-28 md:pb-40 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 right-1/4 h-[44rem] w-[44rem] rounded-full bg-primary/22 blur-[160px] animate-orb" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 h-[36rem] w-[36rem] rounded-full bg-primary/12 blur-[160px] animate-orb-alt" />

        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              03 — BRANDING & IDENTITY
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-medium tracking-[-0.03em] leading-[0.88] text-balance mb-12">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>Identity</span></span>{" "}
            <span className="mask-line"><span style={{ animationDelay: "120ms" }}>systems</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "260ms" }}>that</span></span>{" "}
            <span className="mask-line"><span style={{ animationDelay: "380ms" }} className="text-gold italic">scale with you.</span></span>
          </h1>

          <Reveal delay={540} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Naming, marks, voice, packaging, signage, and full digital systems — built by a
              7-person in-house Houston brand team that designs for the App Store icon and the freeway
              billboard with equal care. The brand survives the third hire, the second product
              line, and the franchise rollout.
            </p>
          </Reveal>

          <Reveal delay={720} className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="cta-lux px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Brief us on your brand →
            </Link>
            <a
              href="#system"
              className="px-9 py-5 border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
            >
              See the system ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* ── PROOF STRIP ── */}
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

      {/* ── CLIENT OUTCOMES STRIP ── */}
      <section className="border-b border-border">
        <div className="px-6 md:px-12 pt-16 pb-8">
          <div className="flex items-center justify-between gap-6 flex-wrap mb-10">
            <div>
              <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-3">
                // Client outcomes
              </div>
              <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95]">
                Brands we've built in Houston.
              </h2>
            </div>
            <p className="text-muted-foreground text-sm md:text-base max-w-sm leading-relaxed">
              Each engagement is a distinct strategic problem. These are four of ours.
            </p>
          </div>
        </div>
        <div className="grid md:grid-cols-2 border-t border-border">
          {outcomes.map((o, i) => (
            <article
              key={o.client}
              className={`p-8 md:p-12 border-b border-border ${i % 2 === 0 ? "md:border-r" : ""} group`}
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors duration-500">
                    {o.client}
                  </h3>
                  <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mt-1">
                    {o.sector}
                  </div>
                </div>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-3 py-1.5 shrink-0">
                  {o.rating}
                </span>
              </div>
              <p className="text-lg md:text-xl font-medium text-foreground/90 leading-snug mb-4">
                {o.headline}
              </p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-6">
                {o.body}
              </p>
              <a
                href={`https://${o.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary hover:text-foreground transition-colors"
              >
                {o.url} ↗
              </a>
            </article>
          ))}
        </div>
      </section>

      {/* ── EDITORIAL ESSAY ── */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Brand thesis
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              A brand is a business asset, not a design project.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-8">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              The businesses that win in Houston's competitive markets — construction, legal,
              healthcare, hospitality, energy services — are rarely the ones with the best
              operations. They are the ones whose identity creates a signal of quality before
              the first phone call, before the proposal, before the site visit. The brand is
              not decoration. It is the first commercial argument your business makes.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Most Houston businesses are under-branded relative to the quality of the work
              they actually do. A roofing company with 40 years of experience presents the same
              as a three-person operation started last year. A law firm with a proven record
              looks indistinguishable from a solo practitioner. The gap between what you are
              and what you look like is lost revenue — and it is entirely fixable.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              We design identity systems that are confident, opinionated, and durable — built
              to look as good on a 4K hero video as on a vinyl truck wrap, and built with the
              underlying system discipline that lets your team move quickly without diluting
              the work. The brand survives the third hire, the second product line, and the
              franchise rollout because it was designed to.
            </p>
          </div>
        </div>
      </section>

      {/* ── FOUR PILLARS ── */}
      <section id="pillars" className="border-b border-border scroll-mt-24">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // The Practice
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Four pillars. One coherent system.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 border-t border-border">
          {pillars.map((p, i) => (
            <article
              key={p.n}
              className={`p-8 md:p-12 border-b border-border ${i % 2 === 0 ? "md:border-r" : ""} group`}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-primary text-[11px] tracking-[0.3em]">{p.n}</span>
                <span className="hairline-gold flex-1" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-2 group-hover:text-primary transition-colors duration-500">
                {p.t}
              </h3>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-5">{p.sub}</div>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{p.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── COMPARISON TABLE ── */}
      <section id="compare" className="px-6 md:px-12 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="max-w-7xl">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // How we compare
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-4 max-w-3xl">
            Atlas Houston vs. your other options.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
            We will tell you honestly when a full engagement is not the right fit. Most of the
            time, it is — because a logo without a system will cost you twice when you grow.
          </p>
          <div className="overflow-x-auto -mx-6 md:-mx-0">
            <table className="w-full min-w-[720px] border border-border text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="p-5 text-left font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground border-r border-border w-[18%]">
                    Factor
                  </th>
                  <th className="p-5 text-left font-mono text-[10px] uppercase tracking-[0.25em] text-primary border-r border-border w-[23%] bg-card">
                    Atlas Houston Full System
                  </th>
                  <th className="p-5 text-left font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground border-r border-border w-[20%]">
                    Freelance Designer
                  </th>
                  <th className="p-5 text-left font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground border-r border-border w-[19%]">
                    Logo-Only Service
                  </th>
                  <th className="p-5 text-left font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground w-[20%]">
                    Canva / Template DIY
                  </th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, idx) => (
                  <tr key={row.factor} className={`border-b border-border last:border-b-0 ${idx % 2 === 0 ? "" : "bg-card/50"}`}>
                    <td className="p-5 font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/70 border-r border-border align-top">
                      {row.factor}
                    </td>
                    <td className="p-5 text-sm text-foreground/90 border-r border-border align-top bg-card leading-relaxed font-medium">
                      {row.atlas}
                    </td>
                    <td className="p-5 text-sm text-muted-foreground border-r border-border align-top leading-relaxed">
                      {row.freelance}
                    </td>
                    <td className="p-5 text-sm text-muted-foreground border-r border-border align-top leading-relaxed">
                      {row.logoOnly}
                    </td>
                    <td className="p-5 text-sm text-muted-foreground align-top leading-relaxed">
                      {row.canva}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── BRAND SYSTEM SPOTLIGHT ── */}
      <section id="system" className="px-6 md:px-12 py-24 md:py-32 border-b border-border bg-card scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
              // Spotlight — Inside the brand book
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-8">
              The deliverable is a{" "}
              <span className="text-gold italic">working system,</span> not a PDF.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              We have seen too many beautiful brand books rot in a Dropbox folder while the
              marketing team improvises with whatever font they can find. Every system we ship
              is a Figma library with live tokens, plus the templates your team will actually
              use this quarter. When you update a color token, every template updates with it.
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              The brand book PDF is the narrative documentation. The Figma library is the
              operational system. You receive both.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {system.map((b) => (
              <div key={b.t} className="p-8 bg-background">
                <h3 className="font-serif text-xl font-medium tracking-tight mb-3 text-primary">
                  {b.t}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── REBRAND SIGNALS ── */}
      <section id="rebrand" className="border-b border-border scroll-mt-24">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // Diagnostic
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Five signals you need a rebrand.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mt-6 leading-relaxed">
            Any one of these is enough. Most clients come to us with three or four.
          </p>
        </div>
        <div className="grid md:grid-cols-5 border-t border-border">
          {rebrandSignals.map((s, i) => (
            <div
              key={s.n}
              className={`p-8 md:p-10 border-b border-border md:border-b-0 ${i < rebrandSignals.length - 1 ? "md:border-r" : ""} group`}
            >
              <div className="font-mono text-primary text-[11px] tracking-[0.3em] mb-6">{s.n}</div>
              <h3 className="font-serif text-lg md:text-xl font-medium tracking-tight leading-snug mb-4 group-hover:text-primary transition-colors duration-500">
                {s.t}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOUSTON INDUSTRIES ── */}
      <section id="industries" className="px-6 md:px-12 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="max-w-7xl">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // Houston market context
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-4 max-w-3xl">
            Branding in Houston's four biggest markets.
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mb-16 leading-relaxed">
            Branding strategy is not generic. Houston's market dynamics, competitive densities,
            and consumer expectations differ by industry — and so does our approach.
          </p>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {industries.map((ind) => (
              <article key={ind.sector} className="p-8 md:p-12 bg-background group">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold mb-4">
                  {ind.tag}
                </div>
                <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-5 group-hover:text-primary transition-colors duration-500">
                  {ind.sector}
                </h3>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {ind.insight}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS + DELIVERABLES ── */}
      <section className="border-b border-border grid md:grid-cols-12">
        <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
            // Engagement
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">
            How we run a brand engagement.
          </h2>
          <ol className="space-y-8">
            {[
              {
                n: "01",
                t: "Discovery & positioning",
                d: "Stakeholder interviews, competitive landscape audit, customer-perception interviews, and a positioning workshop. Output: a one-page strategy brief that anchors every creative decision downstream. Nothing moves to visual until this document is signed off.",
              },
              {
                n: "02",
                t: "Verbal — naming & voice",
                d: "Where applicable: three rounds of naming with linguistic screening, domain availability, and preliminary USPTO clearance on viable candidates. Voice principles, messaging architecture, value proposition, tagline options, and a tone matrix.",
              },
              {
                n: "03",
                t: "Visual exploration",
                d: "Three distinct creative directions presented in real-world context — storefront, website hero, mobile app, billboard, business card. One direction is selected for refinement; no concepts are recycled without consent.",
              },
              {
                n: "04",
                t: "System build",
                d: "Full Figma brand library with live tokens, brand book PDF (print-ready), asset exports at every required size and format, motion guidelines, photography art direction, and production templates for the touchpoints you ship every week.",
              },
              {
                n: "05",
                t: "Rollout & guardianship",
                d: "Launch plan, internal team training, brand implementation on the website and core digital touchpoints. Optional quarterly brand-health review retainer for clients who want the brand audited and maintained over time.",
              },
            ].map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-6">
                <div className="font-serif text-3xl text-primary font-medium">{s.n}</div>
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
            // What you keep
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-8">
            Tangible deliverables.
          </h3>
          <ul className="space-y-4">
            {[
              "Strategy brief and one-page positioning statement",
              "Brand name with preliminary USPTO clearance memo (when applicable)",
              "Primary logo, symbol, monogram, and clear-space rules",
              "Color system tested for WCAG 2.2 AA + AAA where possible",
              "Typography system (display, body, mono) with licensing notes",
              "Voice and messaging guidelines with example copy",
              "Figma brand library with components and live tokens",
              "Brand book PDF (print-ready) and exported asset bundle",
              "Social media asset kit (profile, cover, story, post templates)",
              "Business card, letterhead, and email signature (print-ready)",
              "Production-ready packaging, signage, or livery files (if scoped)",
              "Full IP transfer — all source files belong to you on day one",
            ].map((d) => (
              <li key={d} className="flex gap-3 text-sm md:text-base text-foreground/90">
                <span className="text-primary mt-1 shrink-0">◆</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Want a fixed-fee proposal? A senior brand lead replies within one business day.
            </p>
            <Link
              to="/contact"
              className="cta-lux inline-block px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Start a Scope →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" className="px-6 md:px-12 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Frequently Asked
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Questions we get every week.
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mt-6 leading-relaxed">
              Eight of the most common. If yours isn't here, a senior brand lead will answer it
              within one business day.
            </p>
          </div>
          <div className="md:col-span-8 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="cursor-pointer flex justify-between items-center gap-6 list-none">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {f.q}
                  </h3>
                  <span className="font-mono text-primary text-sm transition-transform group-open:rotate-45 shrink-0">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-3xl">
                  {f.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── RELATED SERVICES ── */}
      <section className="px-6 md:px-12 py-20 md:py-24 border-b border-border">
        <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-8">
          // Continue the walkthrough
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              to: "/services/websites",
              label: "Websites & Web Apps",
              note: "Where the brand lives online",
            },
            {
              to: "/services/mobile-apps",
              label: "Mobile Applications",
              note: "Identity on the home screen",
            },
            {
              to: "/services/seo",
              label: "SEO & Discoverability",
              note: "Make the brand findable",
            },
          ].map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group block p-8 border border-border hover:border-primary transition-colors"
            >
              <div className="font-serif text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">
                {r.label}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4">
                {r.note} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ── CTA BAND ── */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10 max-w-7xl">
          <div className="max-w-2xl">
            <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight leading-[0.9] mb-4">
              Ready to brief us?
            </h2>
            <p className="text-primary-foreground/70 text-base md:text-lg leading-relaxed">
              40+ brand systems shipped from Houston. A senior brand lead — not a salesperson
              — replies within one business day.
            </p>
          </div>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Tell us what you're building, who you're trying to beat, and what you've tried before.
              We'll tell you if a full engagement is the right move — or if something smaller gets you there.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cta-lux inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                File a Project →
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
