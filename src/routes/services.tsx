import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services — Design, Development, Hosting & Support | Forgeyard Houston" },
      {
        name: "description",
        content:
          "Full-lifecycle services for Houston businesses: product design, web and mobile development, managed cloud hosting, and 24/7 support retainers.",
      },
      { property: "og:title", content: "Services — Forgeyard Houston" },
      {
        property: "og:description",
        content:
          "Design, development, hosting, and support for Houston business owners. One senior team, full lifecycle.",
      },
      { property: "og:url", content: "/services" },
    ],
    links: [{ rel: "canonical", href: "/services" }],
  }),
});

const detail = [
  {
    n: "01",
    t: "Product Design",
    p: "Brand-aware product design that turns operational complexity into clear, usable interfaces.",
    items: ["Discovery & workflow mapping", "Brand & visual system", "High-fidelity prototypes", "Usability validation"],
  },
  {
    n: "02",
    t: "Web & Mobile Development",
    p: "Native iOS, Android, and modern web — built by a senior team, owned by you.",
    items: ["React, Next.js, TanStack", "Swift / SwiftUI, Kotlin", "Supabase, Postgres, Stripe", "CI/CD and test coverage"],
  },
  {
    n: "03",
    t: "Managed Cloud Hosting",
    p: "Hardened infrastructure with monitoring, backups, and Houston-based humans on-call.",
    items: ["99.99% uptime SLA", "Daily encrypted backups", "DDoS & WAF protection", "Edge CDN delivery"],
  },
  {
    n: "04",
    t: "LTS Support & Retainers",
    p: "Long-term ownership for businesses that cannot afford to chase freelancers.",
    items: ["Same-day response", "Quarterly roadmap reviews", "Security patching", "Feature evolution"],
  },
];

function ServicesPage() {
  return (
    <SiteLayout>
      <section className="px-6 md:px-10 pt-24 md:pt-32 pb-16 border-b border-border">
        <div className="font-mono text-primary text-xs mb-6">// SERVICES INDEX</div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] max-w-5xl">
          Four disciplines. <span className="text-primary">One accountable team.</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mt-10">
          We don't subcontract design, hand off code, or vanish at launch. From the first sketch to
          the five-year support window, the same Houston team owns the outcome.
        </p>
      </section>

      <section className="border-b border-border">
        {detail.map((s) => (
          <article
            key={s.n}
            className="grid md:grid-cols-12 gap-8 px-6 md:px-10 py-16 md:py-24 border-b last:border-b-0 border-border"
          >
            <div className="md:col-span-3">
              <div className="font-mono text-primary font-extrabold text-5xl tracking-tighter">
                {s.n}
              </div>
            </div>
            <div className="md:col-span-6">
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mb-4">{s.t}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{s.p}</p>
            </div>
            <ul className="md:col-span-3 space-y-3 font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
              {s.items.map((i) => (
                <li key={i} className="flex gap-3 border-t border-border pt-3">
                  <span className="text-primary">+</span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </section>

      <section className="px-6 md:px-10 py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter max-w-2xl leading-[0.9]">
            Need all four? <br />Most clients do.
          </h2>
          <Link
            to="/contact"
            className="px-8 py-4 bg-background text-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
          >
            Request a Scope →
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
