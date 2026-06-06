import { Reveal } from "@/components/site/Reveal";

const FAQ: { q: string; a: string }[] = [
  {
    q: "Who actually does the work?",
    a: "We are a 7-person in-house senior team of engineers, designers, and producers — all based in Houston. No juniors on the wheel, no offshore handoffs. The senior who pitches the work also ships it.",
  },
  {
    q: "How fast can a project ship?",
    a: "Marketing sites: 3–5 weeks. E-commerce and portals: 6–10 weeks. Native mobile apps: 10–16 weeks to App Store. Social and video engagements start within 7 days of contract.",
  },
  {
    q: "Do you work outside of Houston?",
    a: "Yes. The studio is Houston-based, but active engagements run across Silicon Valley, Austin, Dallas, NYC, and remote founders nationwide. On-site Houston visits are weekly across the metro.",
  },
  {
    q: "What does engagement pricing look like?",
    a: "Project minimums start around $8K for a focused marketing site and scale into six figures for platform builds. Every proposal includes a fixed price band, a written scope, and a published timeline — no surprise invoices.",
  },
  {
    q: "Will you maintain what you ship?",
    a: "Yes. Atlas offers monthly care plans (security patches, content updates, performance audits, SEO reporting) starting at $750/mo. We maintain systems for years — not sprints.",
  },
  {
    q: "Do you guarantee SEO rankings?",
    a: "No serious agency guarantees rankings. We guarantee technical fundamentals (Core Web Vitals, structured data, indexable architecture, local-SEO setup) and report monthly against the keywords that matter to your business.",
  },
];

export function EnterpriseFAQ() {
  return (
    <section
      aria-label="Frequently asked questions"
      className="relative border-t border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-20">
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="block h-px w-12 bg-primary" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
              08 — Common questions
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[0.98] tracking-[-0.02em] max-w-3xl mb-12">
            What founders ask <span className="italic text-gold">before they sign.</span>
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {FAQ.map((f, i) => (
            <details
              key={f.q}
              className="group bg-background open:bg-card/60 transition-colors"
              style={{ transitionDelay: `${i * 30}ms` }}
            >
              <summary className="cursor-pointer list-none p-6 sm:p-8 flex items-start gap-5 hover:bg-card/40">
                <span className="font-mono text-[11px] tracking-[0.28em] text-primary pt-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 font-serif text-xl sm:text-2xl leading-snug">
                  {f.q}
                </span>
                <span className="font-mono text-xl text-primary transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <div className="px-6 sm:px-8 pb-8 pl-[3.4rem] sm:pl-[4.5rem]">
                <p className="font-display text-base text-muted-foreground leading-relaxed max-w-2xl">
                  {f.a}
                </p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
