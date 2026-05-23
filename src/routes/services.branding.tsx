import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "What does a Atlas Houston branding engagement actually include?",
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
    a: "Those are exactly the industries where a real brand creates the most leverage. Most of your competitors look identical. A confident, modern, well-executed identity creates an immediate signal of operational quality — and we have the case studies (Bayou Logistics, Westheimer Dental, Texas Iron & Forge) to back it up.",
  },
];

const pillars = [
  { n: "01", t: "Naming & verbal identity", sub: "Strategy · Linguistics · IP", d: "Generative naming sprints with linguistic, domain, and USPTO screening. Tagline, value proposition, voice guidelines, and a messaging architecture your team can actually use." },
  { n: "02", t: "Visual identity system", sub: "Marks · Type · Color · Motion", d: "Wordmark and symbol design, typography pairing, accessible color system, motion principles, photography direction. Delivered as Figma libraries, brand book PDF, and exported asset kits." },
  { n: "03", t: "Packaging, signage & environment", sub: "Print · Production · Vendor liaison", d: "Physical-world execution: product packaging, retail and office signage, vehicle livery, trade-show booths, uniform direction. Production-ready files with vendor liaison." },
  { n: "04", t: "Digital implementation", sub: "Web · App · Social · Decks", d: "Brand applied across web, app, social templates, decks, email signatures, and ad systems. The brand goes live the way it was designed — because the same studio builds the site." },
];

const proof = [
  { k: "40+", l: "Brand systems shipped since 2018" },
  { k: "3", l: "Senior brand leads on staff" },
  { k: "AAA", l: "Contrast tested on every palette" },
  { k: "USPTO", l: "Preliminary clearance on every name" },
];

const system = [
  { t: "Wordmark + symbol", d: "Primary lockup with monogram, clear-space rules, minimum-size specs, and dark/light variants exported in SVG, PDF, and PNG at every required size." },
  { t: "Color system", d: "Primary, secondary, neutral, and semantic colors with WCAG 2.2 AA contrast verified across every documented pairing — AAA where possible." },
  { t: "Typography pairing", d: "Display, body, and monospace selections with licensing notes, fallback stacks, and a complete type scale tuned for the device sizes you actually ship to." },
  { t: "Voice & messaging", d: "Voice principles, do/don't examples, value proposition, elevator pitch, boilerplate, and a tone matrix that scales across formal and conversational contexts." },
  { t: "Photography & illustration", d: "Art-direction principles, sample shotlist, and an illustration system that holds up next to the photography — not at war with it." },
  { t: "Templates & components", d: "Figma library with social posts, pitch deck, email signature, business card, letterhead, and a starter web component kit your team can extend." },
];

export const Route = createFileRoute("/services/branding")({
  component: BrandingPage,
  head: () => ({
    meta: [
      { title: "Brand Identity Design in Houston | Atlas Houston" },
      {
        name: "description",
        content:
          "Houston branding studio. Naming, identity systems, packaging, signage, and digital rollout. Built for businesses that scale — not Behance. USPTO-screened, WCAG-tested.",
      },
      { property: "og:title", content: "Brand Identity — Atlas Houston Houston" },
      {
        property: "og:description",
        content:
          "Naming, marks, voice, and full identity systems for Houston businesses. From app icon to billboard, designed to last.",
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
          provider: {
            "@type": "Organization",
            name: "Atlas Houston Houston",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Brand strategy, naming, identity systems, packaging, signage, and digital rollout for Houston businesses.",
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
      {/* SIGNATURE HERO */}
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
              Houston brand team that designs for the App Store icon and the freeway billboard
              with equal care. The brand survives the third hire, the second product line, and
              the franchise rollout.
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

      {/* PROOF */}
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

      {/* INTRO */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Brand thesis
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              A brand is what people repeat about you when you are not in the room.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              We design identity systems that are confident, opinionated, and durable — built to
              look as good on a 4K hero video as on a vinyl truck wrap, and built with the kind
              of underlying system that lets your team move quickly without diluting the work.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Most of our clients are not in 'creative' industries. They are HVAC operators,
              dental groups, freight brokers, energy services firms, and law practices —
              businesses where a serious brand creates outsized commercial leverage because the
              competition still looks like 2005.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
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

      {/* SYSTEM SPOTLIGHT */}
      <section id="system" className="px-6 md:px-12 py-24 md:py-32 border-b border-border bg-card scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
              // Spotlight — Inside the brand book
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-8">
              The deliverable is a <span className="text-gold italic">working system,</span> not a PDF.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We have seen too many beautiful brand books rot in a Dropbox folder while the
              marketing team improvises with whatever Helvetica they can find. Every system we
              ship is a Figma library with live tokens, plus the templates your team will
              actually use this quarter.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {system.map((b) => (
              <div key={b.t} className="p-8 bg-background">
                <h3 className="font-serif text-xl font-medium tracking-tight mb-3 text-primary">{b.t}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{b.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS + DELIVERABLES */}
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
              { n: "01", t: "Discovery & positioning", d: "Stakeholder interviews, competitive landscape audit, customer interviews, positioning workshop. Output: a one-page strategy brief that anchors every creative decision." },
              { n: "02", t: "Verbal — naming & voice", d: "Where applicable: 3 rounds of naming with linguistic and IP screening. Voice principles and messaging architecture." },
              { n: "03", t: "Visual exploration", d: "Three distinct creative directions presented in context (storefront, website, app icon, billboard). One direction selected for refinement." },
              { n: "04", t: "System build", d: "Full Figma library, brand book, asset exports, motion guidelines, photography direction. Production templates for the touchpoints you ship every week." },
              { n: "05", t: "Rollout & guardianship", d: "Launch plan, internal training, and a quarterly brand-health review on retainer if you want us watching the work over time." },
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
              "Strategy brief and positioning statement",
              "Brand name with preliminary USPTO clearance memo (when applicable)",
              "Primary logo, symbol, monogram, and clear-space rules",
              "Color system tested for WCAG 2.2 AA + AAA where possible",
              "Typography system (display, body, mono) with licensing notes",
              "Voice and messaging guidelines with example copy",
              "Figma brand library with components and tokens",
              "Brand book PDF (print-ready) and exported asset bundle",
              "Production-ready packaging, signage, or livery files (if scoped)",
            ].map((d) => (
              <li key={d} className="flex gap-3 text-sm md:text-base text-foreground/90">
                <span className="text-primary mt-1">◆</span>
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

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-12 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Frequently Asked
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Questions we get every week.
            </h2>
          </div>
          <div className="md:col-span-8 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="cursor-pointer flex justify-between items-center gap-6 list-none">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {f.q}
                  </h3>
                  <span className="font-mono text-primary text-sm transition-transform group-open:rotate-45">
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

      {/* RELATED */}
      <section className="px-6 md:px-12 py-20 md:py-24 border-b border-border">
        <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-8">
          // Continue the walkthrough
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { to: "/services/websites", label: "Websites & Web Apps", note: "Where the brand lives online" },
            { to: "/services/mobile-apps", label: "Mobile Applications", note: "Identity on the home screen" },
            { to: "/services/seo", label: "SEO & Discoverability", note: "Make the brand findable" },
          ].map((r) => (
            <a
              key={r.to}
              href={r.to}
              className="group block p-8 border border-border hover:border-primary transition-colors"
            >
              <div className="font-serif text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">
                {r.label}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4">
                {r.note} →
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT BAND */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Ready to brief us?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Tell us what you're building. A senior brand lead replies within one business day.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cta-lux inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                File a Project →
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
