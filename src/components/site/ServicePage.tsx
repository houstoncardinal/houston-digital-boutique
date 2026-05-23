import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { SiteLayout } from "./SiteLayout";
import { Reveal } from "./Reveal";

export interface ServicePillar {
  n: string;
  t: string;
  d: string;
}

export interface ServiceFAQ {
  q: string;
  a: string;
}

export interface ServiceAuthority {
  k: string;
  v: string;
}

export interface ServicePageProps {
  index: string;
  eyebrow: string;
  title: ReactNode;
  lede: string;
  intro: string;
  pillars: ServicePillar[];
  process: { n: string; t: string; d: string }[];
  deliverables: string[];
  authority: ServiceAuthority[];
  faqs: ServiceFAQ[];
  related: { to: string; label: string; note: string }[];
  jsonLd?: Record<string, unknown>;
}

export function ServicePage(p: ServicePageProps) {
  return (
    <SiteLayout>
      {p.jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(p.jsonLd) }}
        />
      )}

      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-40 pb-20 md:pb-28 border-b border-border overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -right-40 h-[36rem] w-[36rem] rounded-full bg-primary/20 blur-[140px] animate-orb"
        />
        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              {p.index} — {p.eyebrow}
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[8.5rem] font-medium tracking-[-0.025em] leading-[0.92] text-balance mb-10">
            {p.title}
          </h1>
          <Reveal delay={350} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              {p.lede}
            </p>
          </Reveal>
          <Reveal delay={500} className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="cta-lux px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Request a Scope →
            </Link>
            <a
              href="#faq"
              className="px-9 py-5 border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
            >
              Read the FAQ ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* AUTHORITY STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {p.authority.map((a) => (
          <div key={a.k} className="p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
            <div className="font-serif text-4xl md:text-6xl text-gold font-medium tracking-tight">{a.k}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4">
              {a.v}
            </div>
          </div>
        ))}
      </section>

      {/* INTRO ESSAY */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-3 font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
            // Practitioner Brief
          </div>
          <div className="md:col-span-9">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              {p.intro}
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-border">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            What's inside the engagement.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 border-t border-border">
          {p.pillars.map((pl) => (
            <article
              key={pl.n}
              className="p-8 md:p-12 border-b border-border md:odd:border-r last:border-b-0 group"
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-primary text-[11px] tracking-[0.3em]">{pl.n}</span>
                <span className="hairline-gold flex-1" />
              </div>
              <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-5 group-hover:text-primary transition-colors duration-500">
                {pl.t}
              </h3>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">{pl.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* PROCESS + DELIVERABLES */}
      <section className="border-b border-border grid md:grid-cols-12">
        <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
            // Method
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">
            How we run the engagement.
          </h2>
          <ol className="space-y-8">
            {p.process.map((step) => (
              <li key={step.n} className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-6">
                <div className="font-serif text-3xl text-primary font-medium">{step.n}</div>
                <div>
                  <h4 className="text-xl font-semibold tracking-tight mb-2">{step.t}</h4>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{step.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="md:col-span-5 p-8 md:p-12 bg-card">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
            // Deliverables
          </div>
          <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-8">
            Tangible outputs you keep.
          </h3>
          <ul className="space-y-4">
            {p.deliverables.map((d) => (
              <li key={d} className="flex gap-3 text-sm md:text-base text-foreground/90">
                <span className="text-primary mt-1">◆</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Want a fixed-fee proposal for your project? A senior lead replies within one business
              day — no BDRs, no discovery-fee gates.
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
            {p.faqs.map((f) => (
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
          {p.related.map((r) => (
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
              Tell us what you're building. A senior lead — not a salesperson — replies within one
              business day.
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
