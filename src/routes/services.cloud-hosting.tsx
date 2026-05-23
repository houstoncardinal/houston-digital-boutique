import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "What does '99.99% uptime' actually mean for my business?",
    a: "Four-nines uptime allows roughly 52 minutes of unplanned downtime per year. Over the trailing 24 months across the sites we host, we've averaged 99.994% measured externally by UptimeRobot and Better Stack — so under 30 minutes of cumulative downtime per year per property. We publish a private status page per client and credit retainer fees if we miss the SLA in any given month.",
  },
  {
    q: "Where does my site actually run, and who has access?",
    a: "Production workloads run on a combination of Cloudflare Workers, AWS (us-east-1 and us-east-2 for failover), and Fly.io for region-edge containers — chosen per workload, never one-size-fits-all. Access is restricted to a named list of senior engineers under SSO with mandatory hardware-key 2FA. We provide a full access roster on request and revoke it on offboarding.",
  },
  {
    q: "Do you handle DNS, SSL, email, DMARC, and the boring stuff?",
    a: "Yes. Cloudflare-managed DNS, automated Let's Encrypt or Cloudflare Universal SSL with renewal monitoring, SPF/DKIM/DMARC configuration with weekly aggregate reports, and Google Workspace or Microsoft 365 mail routing. Boring is the goal. Boring is what keeps your business email out of spam folders.",
  },
  {
    q: "What's covered under an LTS support retainer vs. extra?",
    a: "Covered: monitoring, backups, dependency security patching, OS-version compatibility, minor copy and image updates, monthly written health report, and same-business-day response on incidents. Extra (quoted separately): net-new features, major version migrations, integrations with new third-party systems, and after-hours emergencies for non-retainer clients. The retainer scope is in writing and reviewed quarterly.",
  },
  {
    q: "What's your backup and disaster-recovery posture?",
    a: "Daily encrypted database snapshots retained 35 days, point-in-time recovery to any second in the last 7 days, weekly off-region full backups retained 12 months, and cold-storage annual archives. We run a quarterly DR drill per client where we restore production from snapshot into a sandbox environment and document the recovery time objective — typically under 12 minutes for a standard web stack.",
  },
  {
    q: "Are you SOC 2 or HIPAA compliant?",
    a: "We operate to SOC 2 Type II controls internally (access management, vendor review, incident response, change management) and can produce our security questionnaire on request. For HIPAA-covered clients we sign a BAA, use only BAA-eligible AWS and Cloudflare services, and architect with PHI minimization. Formal SOC 2 audit completion is on the 2026 roadmap.",
  },
];

const pillars = [
  { n: "01", t: "Managed cloud hosting", sub: "Cloudflare · AWS · Fly.io", d: "Multi-region cloud chosen per workload. WAF, DDoS shielding, edge caching, image optimization, and automated SSL renewal — invisible until you look at the bill we save you." },
  { n: "02", t: "Observability & monitoring", sub: "Uptime · Logs · Traces · RUM", d: "Uptime monitoring, real-user metrics, log aggregation (Axiom/Datadog), error tracking (Sentry), and an executive monthly health report written in plain English." },
  { n: "03", t: "Backups & disaster recovery", sub: "PITR · Off-region · Quarterly DR drill", d: "Daily encrypted snapshots, point-in-time recovery, off-region weekly fulls, annual cold archives, and quarterly DR drills with documented RTO/RPO per client." },
  { n: "04", t: "Security & compliance", sub: "SOC 2 · HIPAA BAA · Pentest", d: "Dependency scanning, quarterly pentests for retainer clients, SOC 2 Type II controls operationally, HIPAA BAA available, and a security questionnaire we can deliver same-day." },
];

const sla = [
  { k: "99.99%", l: "Hosting uptime SLA, trailing 24mo measured externally" },
  { k: "<12m", l: "Avg disaster-recovery RTO across managed clients" },
  { k: "24/7", l: "On-call pod with named senior engineer per account" },
  { k: "SOC2", l: "Type II controls operated internally; report available" },
];

const stack = [
  { t: "Edge compute", d: "Cloudflare Workers fronting every site for sub-200ms TTFB globally. Smart-routed origin failover and per-route caching rules tuned per workload." },
  { t: "Origin & databases", d: "AWS us-east-1 primary with us-east-2 warm failover. RDS Postgres with point-in-time recovery, or Supabase managed Postgres for application backends." },
  { t: "Edge containers", d: "Fly.io for workloads that need region-pinned containers — typically Houston-adjacent for ultra-low latency to local users and integrations." },
  { t: "Storage & CDN", d: "Cloudflare R2 for object storage with zero egress fees, paired with the Cloudflare CDN for cached static assets and edge image transforms." },
  { t: "Observability", d: "Sentry for error tracking, Axiom for log aggregation, Better Stack for uptime, and Cloudflare Web Analytics for privacy-respecting real-user metrics." },
  { t: "Mail & DNS", d: "Cloudflare-managed DNS with DNSSEC, plus SPF/DKIM/DMARC for Google Workspace or Microsoft 365 — boring is the goal, and boring is what keeps mail out of spam." },
];

export const Route = createFileRoute("/services/cloud-hosting")({
  component: CloudHostingPage,
  head: () => ({
    meta: [
      { title: "Managed Cloud Hosting & 24/7 Support in Houston | Atlas Houston" },
      {
        name: "description",
        content:
          "99.99% uptime, 24/7 on-call senior engineers in Houston, daily encrypted backups, SOC 2 controls, HIPAA BAA. Multi-region Cloudflare + AWS + Fly.io. Hosting that never goes dark.",
      },
      { property: "og:title", content: "Cloud Hosting & LTS Support — Atlas Houston Houston" },
      {
        property: "og:description",
        content:
          "Hardened multi-region hosting and 24/7 support from a Houston-based senior engineering team. Built to last five years, not one launch.",
      },
      { property: "og:url", content: "/services/cloud-hosting" },
    ],
    links: [{ rel: "canonical", href: "/services/cloud-hosting" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Managed Cloud Hosting and Support",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston Houston",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Managed multi-region cloud hosting, observability, backups, and 24/7 senior engineering support for Houston businesses.",
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

function CloudHostingPage() {
  return (
    <SiteLayout>
      {/* SIGNATURE HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-44 pb-28 md:pb-40 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/4 h-[44rem] w-[44rem] rounded-full bg-primary/22 blur-[160px] animate-orb" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 h-[36rem] w-[36rem] rounded-full bg-primary/12 blur-[160px] animate-orb-alt" />

        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              04 — CLOUD, HOSTING & LTS SUPPORT
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-medium tracking-[-0.03em] leading-[0.88] text-balance mb-12">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>Infrastructure</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "200ms" }}>that</span></span>{" "}
            <span className="mask-line"><span style={{ animationDelay: "320ms" }} className="text-gold italic">never goes dark.</span></span>
          </h1>

          <Reveal delay={520} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Hardened multi-region cloud, 24/7 monitoring, encrypted backups, and a senior
              on-call engineering pod based in Houston. The site you launched on a Tuesday is
              still online and supported five years later.
            </p>
          </Reveal>

          <Reveal delay={700} className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="cta-lux px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Book a free hosting audit →
            </Link>
            <a
              href="#stack"
              className="px-9 py-5 border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
            >
              See the stack ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* SLA */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {sla.map((s) => (
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
              // The operations thesis
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Most agencies build it, ship it, and disappear.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              Then it breaks at 2 a.m. before a product launch and the founder is left calling a
              freelancer in another time zone. We built our operations practice as the antidote
              to that pattern.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Every product we ship runs on infrastructure we own, monitor, and patch. There is
              a named senior engineer responsible for your environment. There is a written
              incident-response runbook. There is a status page you can point your team at when
              somebody asks. And there is a phone number that rings to a human in Houston when
              it matters.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS */}
      <section className="border-b border-border">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // The Practice
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Four pillars of a hardened environment.
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

      {/* STACK SPOTLIGHT */}
      <section id="stack" className="px-6 md:px-12 py-24 md:py-32 border-b border-border bg-card scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
              // Spotlight — Reference architecture
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-8">
              The architecture, in <span className="text-gold italic">plain language.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Every client gets a written architecture diagram with vendor choices, data flow,
              and failure modes documented. Below is the reference stack we deploy unless your
              workload has a reason to deviate.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {stack.map((b) => (
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
            // Migration playbook
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">
            How we move you onto managed hosting.
          </h2>
          <ol className="space-y-8">
            {[
              { n: "01", t: "Audit & baseline", d: "Free 1-hour audit of your current hosting, DNS, SSL, backups, and incident posture. You receive a written gap analysis whether you continue with us or not." },
              { n: "02", t: "Migration plan", d: "DNS plan, downtime budget (typically zero), data-migration script, rollback strategy. Cutovers happen on a scheduled Sunday morning window." },
              { n: "03", t: "Cutover & verification", d: "DNS flip, SSL verification, automated smoke tests, Search Console health check, status-page activation. Forty-eight-hour hypercare." },
              { n: "04", t: "Steady-state operations", d: "Monitoring, patching, backups, monthly written report. Same-day response on incidents under SLA." },
              { n: "05", t: "Quarterly review", d: "Roadmap call with the senior engineer assigned to your account. We discuss what broke, what we patched, what's coming, and what to retire." },
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
              "Hardened production environment with WAF and DDoS shielding",
              "Private status page with real-time uptime and incident history",
              "Daily encrypted backups + documented disaster-recovery runbook",
              "Monthly health report (uptime, incidents, patches, security)",
              "Quarterly executive review with assigned senior engineer",
              "Security questionnaire (SOC 2 controls) on request",
              "HIPAA BAA available for covered entities",
              "Named on-call engineer with documented escalation tree",
            ].map((d) => (
              <li key={d} className="flex gap-3 text-sm md:text-base text-foreground/90">
                <span className="text-primary mt-1">◆</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Want a free audit of your current hosting? A senior engineer replies within one
              business day.
            </p>
            <Link
              to="/contact"
              className="cta-lux inline-block px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Book the audit →
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
            { to: "/services/websites", label: "Websites & Web Apps", note: "What we host" },
            { to: "/services/mobile-apps", label: "Mobile Applications", note: "Backends we operate" },
            { to: "/services/seo", label: "SEO & Discoverability", note: "Performance impacts ranking" },
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
              Tell us what you're running. A senior engineer — not a salesperson — replies within
              one business day.
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
