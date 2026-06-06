import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "What does '99.99% uptime' actually mean for my business?",
    a: "Four-nines uptime allows roughly 52 minutes of unplanned downtime per year. Over the trailing 24 months across the sites we host, we've averaged 99.994% measured externally by UptimeRobot and Better Stack — under 30 minutes of cumulative downtime per year per property. We publish a private status page per client and credit retainer fees if we miss the SLA in any given month. We don't hide incidents behind vague 'maintenance windows.'",
  },
  {
    q: "Where does my site actually run, and who has access?",
    a: "Production workloads run on a combination of Cloudflare Workers (edge compute, sub-200ms TTFB globally), AWS us-east-1 primary with us-east-2 warm failover, and Fly.io region-edge containers for Houston-adjacent latency — chosen per workload, never one-size-fits-all. Access is restricted to a named list of senior engineers under SSO with mandatory hardware-key 2FA. We provide a full access roster on request and revoke all access on offboarding within the hour.",
  },
  {
    q: "Do you handle DNS, SSL, email, DMARC, and the boring stuff?",
    a: "Yes. Cloudflare-managed DNS with DNSSEC, automated Let's Encrypt or Cloudflare Universal SSL with renewal monitoring 30 days before expiry, SPF/DKIM/DMARC configuration with weekly aggregate report forwarding, and Google Workspace or Microsoft 365 mail routing. We've seen more than a dozen Houston businesses lose days of email delivery to a lapsed DMARC record. Boring is the goal — and boring is what keeps your business email out of spam folders.",
  },
  {
    q: "What's covered under an LTS support retainer vs. extra?",
    a: "Covered: uptime monitoring, daily encrypted backups, dependency security patching, OS-version compatibility, minor copy and image updates (under 30 minutes), monthly written health report, and same-business-day incident response. Extra (quoted separately): net-new features, major version migrations (e.g. Next.js 14 → 15), integrations with new third-party systems, and after-hours emergencies for non-retainer clients. The retainer scope is in writing and reviewed quarterly so there are no surprises on either side.",
  },
  {
    q: "What's your backup and disaster-recovery posture?",
    a: "Daily encrypted database snapshots retained 35 days, point-in-time recovery to any second in the last 7 days, weekly off-region full backups retained 12 months, and cold-storage annual archives. We run a quarterly DR drill per client: restore production from snapshot into a sandbox environment, document the recovery time objective, and send you the report. Our current average RTO across managed clients is under 12 minutes for a standard web stack.",
  },
  {
    q: "Are you SOC 2 or HIPAA compliant?",
    a: "We operate to SOC 2 Type II controls internally (access management, vendor review, incident response, change management) and can produce our security questionnaire same-day on request. For HIPAA-covered clients we sign a BAA, use only BAA-eligible AWS and Cloudflare services, and architect with PHI minimization, encrypted transport (TLS 1.3), and audit logging from day one. Formal SOC 2 audit completion is on the 2026 roadmap.",
  },
  {
    q: "Can you migrate us from GoDaddy, WP Engine, or Kinsta?",
    a: "Yes — and it's one of the most common engagements we run. Migration starts with a free 1-hour audit of your current hosting, DNS, SSL, and backup posture. We then produce a written migration plan with a zero-downtime DNS-cutover strategy, data-migration script, rollback procedure, and a scheduled Sunday-morning maintenance window. We've executed clean migrations from GoDaddy, WP Engine, Kinsta, SiteGround, Bluehost, and legacy cPanel hosts with zero indexed-page loss. You receive the migration runbook whether you continue with us or not.",
  },
  {
    q: "What's your incident response process when something breaks at 2am?",
    a: "Every managed client has a named on-call engineer and a documented escalation tree. Better Stack and UptimeRobot alert our on-call pod within 60 seconds of a downtime event. The on-call engineer acknowledges within 5 minutes, posts a status-page update within 10 minutes, and executes the pre-written runbook for the failure mode. You get a plain-English incident report the next business day with root cause, remediation steps taken, and a prevention plan. We don't wait for you to notice something is wrong — you find out from us, not from a customer complaint.",
  },
];

const pillars = [
  {
    n: "01",
    t: "Managed cloud hosting",
    sub: "Cloudflare · AWS · Fly.io · Multi-region",
    d: "Multi-region cloud chosen per workload, never defaulted. WAF with custom ruleset, DDoS shielding at the edge, smart-routed origin failover, per-route caching tuned to your content model, image optimization, and automated SSL renewal monitored 30 days in advance. You pay for performance, not for infrastructure management time.",
  },
  {
    n: "02",
    t: "Observability & monitoring",
    sub: "Uptime · Logs · Traces · RUM · Alerts",
    d: "External uptime monitoring from 20+ global probes, real-user metrics with Cloudflare Web Analytics (privacy-respecting, no cookie consent banner required), error tracking with Sentry, log aggregation with Axiom, and a monthly written health report in plain English that your non-technical team can actually read.",
  },
  {
    n: "03",
    t: "Backups & disaster recovery",
    sub: "PITR · Off-region · Quarterly DR drill",
    d: "Daily encrypted database snapshots retained 35 days, point-in-time recovery, weekly off-region full backups retained 12 months, annual cold-storage archives, and quarterly DR drills with documented RTO/RPO per client. We test the backups — not just the backup job. There is a difference, and it matters at 2 a.m.",
  },
  {
    n: "04",
    t: "Security & compliance",
    sub: "SOC 2 · HIPAA BAA · Dep scanning · Pentest",
    d: "Dependency scanning via Dependabot and Snyk with auto-PR on critical CVEs, quarterly manual pentests for retainer clients, SOC 2 Type II controls operated internally, HIPAA BAA available and signed before any PHI touches our infrastructure, and a security questionnaire deliverable same-day on request.",
  },
];

const sla = [
  { k: "99.99%", l: "Hosting uptime SLA, trailing 24mo external measurement" },
  { k: "<12m", l: "Avg disaster-recovery RTO across managed clients" },
  { k: "24/7", l: "On-call pod — named senior engineer per account" },
  { k: "SOC2", l: "Type II controls operated; report available same-day" },
];

const stack = [
  {
    t: "Edge compute",
    d: "Cloudflare Workers fronting every site for sub-200ms TTFB globally. Smart-routed origin failover, per-route cache rules tuned per workload, and WAF with custom rulesets blocking OWASP Top 10 at the edge before it touches your origin.",
  },
  {
    t: "Origin & databases",
    d: "AWS us-east-1 primary with us-east-2 warm failover. RDS Postgres with point-in-time recovery, or Supabase managed Postgres for application backends. Reserved instances for predictable workloads, Spot for non-critical background jobs.",
  },
  {
    t: "Edge containers",
    d: "Fly.io for workloads that need region-pinned containers — Houston-adjacent for ultra-low latency to local users and integrations. Fly Machines with sub-second cold-start for event-driven workloads that don't justify always-on instances.",
  },
  {
    t: "Storage & CDN",
    d: "Cloudflare R2 for object storage with zero egress fees, paired with the Cloudflare CDN for cached static assets and edge image transforms. No surprise bandwidth bills — we size storage costs upfront and alert you before thresholds.",
  },
  {
    t: "Observability",
    d: "Sentry for error tracking with release-aware alerting, Axiom for log aggregation with 90-day retention, Better Stack for uptime with 60-second probe intervals from 20+ locations, and Cloudflare Web Analytics for privacy-respecting real-user metrics.",
  },
  {
    t: "Mail & DNS",
    d: "Cloudflare-managed DNS with DNSSEC, HTTPS records, and sub-second propagation. SPF/DKIM/DMARC for Google Workspace or Microsoft 365 with weekly aggregate report forwarding. Boring is the goal — boring is what keeps mail out of spam.",
  },
];

const clientOutcomes = [
  {
    name: "SVR Law Firm",
    service: "Legal website hosting",
    outcome: "Zero-downtime infrastructure for a trilingual personal injury and criminal defense practice. HTTPS enforced, 99.99% uptime tracked externally, and DMARC hardened so client intake emails never hit spam folders.",
    url: "https://svrlawfirm.com",
    domain: "svrlawfirm.com",
  },
  {
    name: "United CCR",
    service: "Disaster restoration ops",
    outcome: "24/7 emergency-response site that cannot go offline during a Harvey or freeze event — the exact moment they get the most traffic. Cloudflare DDoS shielding and multi-region failover keep the site reachable when Houston floods.",
    url: "https://unitedccr.com",
    domain: "unitedccr.com",
  },
  {
    name: "BluTouch Pools",
    service: "Luxury pool web presence",
    outcome: "High-traffic marketing site for a 4.8★ pool construction company. Edge-cached images, sub-1.5s LCP, and daily encrypted backups — so a five-star reputation is backed by five-star infrastructure.",
    url: "https://blutouchpools.com",
    domain: "blutouchpools.com",
  },
  {
    name: "Vargas Tax Services",
    service: "Tax services platform",
    outcome: "HTTPS-enforced, SOC 2 controlled hosting for a tax preparation practice handling sensitive financial data since 2010. Daily backups, encrypted at rest, with a signed data-handling agreement.",
    url: "https://vargastaxservices.com",
    domain: "vargastaxservices.com",
  },
  {
    name: "HOU GEN PROS",
    service: "Generator installation site",
    outcome: "High-availability site for a generator company whose customers need service most during power outages — the exact moment site reliability is existential. Offline-resilient edge caching keeps the site live when the grid isn't.",
    url: "https://hougenpros.com",
    domain: "hougenpros.com",
  },
  {
    name: "Houston Enterprise",
    service: "Construction firm hosting",
    outcome: "Managed cloud infrastructure for a Houston construction company, including daily encrypted backups, monitoring, and patching — so the firm's principals focus on projects, not server dashboards.",
    url: "https://houinc.com",
    domain: "houinc.com",
  },
];

const industries = [
  {
    name: "Law firms & professional services",
    insight: "A law firm's website going down during a news cycle costs leads worth thousands per hour. We host four Houston firms with hardened WAF rules, DMARC-enforced email, and a named on-call engineer.",
  },
  {
    name: "Medical & dental practices",
    insight: "HIPAA-covered entities need BAA-eligible infrastructure, encrypted backups, and an access roster you can show an auditor. We sign the BAA before a single patient record touches our stack.",
  },
  {
    name: "E-commerce & retail",
    insight: "Every minute of downtime on a Houston e-commerce site costs ~$400 in lost revenue. Our multi-region failover, Cloudflare DDoS shielding, and 60-second uptime probes keep stores online through traffic spikes.",
  },
  {
    name: "Construction & field services",
    insight: "Field-service companies need their job-dispatch portals and customer sites online 24/7 — including during Houston freeze events when demand spikes and the rest of the internet slows down.",
  },
];

const comparisonRows = [
  {
    factor: "Uptime SLA",
    atlas: "99.99% — externally verified, credited if missed",
    vps: "No SLA; you manage it",
    shared: "99.9% typical — that's 8.7 hrs/yr of allowed downtime",
    diy: "Depends on your ops discipline; no SLA",
  },
  {
    factor: "On-call engineer",
    atlas: "Named senior engineer, 60-second alert response",
    vps: "You are on-call",
    shared: "Generic support ticket, 24–72hr response",
    diy: "You or a freelancer you call at 2am",
  },
  {
    factor: "Security patches",
    atlas: "Auto-PR on critical CVEs, applied within 24hrs",
    vps: "Manual; you forget, you get breached",
    shared: "Platform-managed, but you can't verify timing",
    diy: "You set up Dependabot and remember to merge it",
  },
  {
    factor: "Backup & recovery",
    atlas: "Daily encrypted snapshots, PITR, quarterly DR drill",
    vps: "You configure it — most people don't",
    shared: "Daily snapshots, 30-day retention, no drill",
    diy: "You configure it; RTO undefined",
  },
  {
    factor: "TTFB / CDN",
    atlas: "Sub-200ms globally via Cloudflare edge, 300+ PoPs",
    vps: "Single-region origin, 300–800ms for distant users",
    shared: "Shared resources; highly variable",
    diy: "Depends on your CDN setup and origin region",
  },
  {
    factor: "Cost / month",
    atlas: "$400–$1,200/mo depending on retainer scope",
    vps: "$40–$200/mo infra + your time (worth $150–$300/hr)",
    shared: "$15–$80/mo — the risk is priced in",
    diy: "$50–$400/mo infra + ops overhead",
  },
  {
    factor: "Hidden risks",
    atlas: "None — SLA, scope, and credits in writing",
    vps: "Unpatched vulnerabilities, no backup verification",
    shared: "Noisy neighbors, resource throttling, no root access",
    diy: "Alert fatigue, missed patches, no DR procedure",
  },
];

const downtimeCosts = [
  { biz: "E-commerce store", perHour: "$400/hr", note: "Average order value × conversion rate × hourly visitors" },
  { biz: "Personal injury law firm", perHour: "$600/hr", note: "Average contingency case value × lost lead rate during downtime" },
  { biz: "Medical / dental practice", perHour: "$800/hr", note: "Missed appointment bookings + reputational cost with Google reviews" },
  { biz: "Disaster restoration (24/7)", perHour: "$1,200/hr", note: "Emergency jobs are time-sensitive; competitor captures the call instead" },
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
      { property: "og:title", content: "Cloud Hosting & LTS Support — Atlas Houston" },
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://atlashouston.com/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://atlashouston.com/services" },
            { "@type": "ListItem", position: 3, name: "Cloud Hosting & LTS Support", item: "https://atlashouston.com/services/cloud-hosting" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Managed Cloud Hosting and Support",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston",
            url: "https://atlashouston.com",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Managed multi-region cloud hosting, observability, backups, and 24/7 senior engineering support for Houston businesses. 99.99% uptime SLA, SOC 2 controls, HIPAA BAA.",
          areaServed: { "@type": "City", name: "Houston" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Managed Hosting Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Managed Cloud Hosting" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Observability and Monitoring" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Backup and Disaster Recovery" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Security and Compliance" } },
            ],
          },
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
      {/* HERO */}
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
              Hardened multi-region cloud, 24/7 monitoring with a named on-call engineer,
              encrypted backups with tested recovery, and a Houston team that answers the phone
              at 2 a.m. The site you launched on a Tuesday is still online and supported five
              years later.
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

      {/* PROOF STRIP */}
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

      {/* CLIENT OUTCOMES STRIP */}
      <section className="border-b border-border overflow-x-auto">
        <div className="px-6 md:px-12 pt-10 pb-2">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
            // Infrastructure behind these Houston businesses
          </div>
        </div>
        <div className="flex min-w-max">
          {clientOutcomes.map((c) => (
            <div
              key={c.name}
              className="flex-shrink-0 w-72 p-8 border-r last:border-r-0 border-border group hover:bg-card/50 transition-colors"
            >
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary mb-2">{c.service}</div>
              <div className="font-serif text-xl font-medium tracking-tight mb-3 group-hover:text-primary transition-colors">{c.name}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.outcome}</p>
              <a
                href={`https://${c.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-[9px] text-muted-foreground hover:text-primary transition-colors mt-3 block uppercase tracking-[0.2em]"
              >
                {c.domain} ↗
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL ESSAY */}
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
              Then it breaks at 2 a.m. before a product launch, a Harvey hits and knocks out
              half of Houston's connectivity, or Apple releases a Safari update that breaks a
              checkout flow — and the founder is left calling a freelancer in another time zone
              who hasn't touched the codebase in eight months. We built our operations practice
              as the direct antidote to that pattern.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Every product we ship runs on infrastructure we own, monitor, and patch. There is
              a named senior engineer responsible for your environment. There is a written
              incident-response runbook reviewed quarterly. There is a status page you can point
              your team at when somebody asks. And there is a phone number that rings to a human
              in Houston when it matters — not a ticketing system that auto-responds with a
              24-hour SLA while your site is hemorrhaging revenue.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Houston's businesses face infrastructure risks that coastal tech companies don't
              design for: grid instability during freeze events, traffic surges from emergency
              services during flood events, and aging internet infrastructure in industrial
              corridors. We know those failure modes. We've operated through them. Our
              architecture accounts for them before the first deployment.
            </p>
          </div>
        </div>
      </section>

      {/* PILLARS GRID */}
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

      {/* COMPARISON TABLE */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // How we compare
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12 max-w-3xl">
            Managed hosting vs. the alternatives — the honest comparison.
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-card">
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-b border-r border-border">Factor</th>
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-primary border-b border-r border-border">Atlas Managed Hosting</th>
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-b border-r border-border">Self-Hosted VPS</th>
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-b border-r border-border">Shared Hosting (GoDaddy)</th>
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-b last:border-r-0 border-border">Cheap Cloud (DigitalOcean DIY)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.factor} className={`border-b border-border hover:bg-card/40 transition-colors ${i % 2 === 0 ? "" : "bg-card/20"}`}>
                    <td className="px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/80 border-r border-border/50 font-medium">{row.factor}</td>
                    <td className="px-4 py-3.5 text-foreground/90 border-r border-border/50">{row.atlas}</td>
                    <td className="px-4 py-3.5 text-muted-foreground border-r border-border/50">{row.vps}</td>
                    <td className="px-4 py-3.5 text-muted-foreground border-r border-border/50">{row.shared}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{row.diy}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* WHAT DOWNTIME COSTS YOU */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // What downtime costs you
          </div>
          <div className="grid md:grid-cols-12 gap-10 mb-14">
            <div className="md:col-span-5">
              <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95]">
                Every minute offline is <span className="text-gold italic">revenue lost.</span>
              </h2>
            </div>
            <div className="md:col-span-7">
              <p className="text-lg text-muted-foreground leading-relaxed">
                Downtime is rarely abstract for Houston businesses. Below are conservative
                estimates of revenue impact per hour of unplanned downtime, based on average
                conversion rates, order values, and lead volumes for each business type. The
                99.99% SLA we operate to allows 52 minutes of downtime per year — managed
                together, spread across planned maintenance windows.
              </p>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {downtimeCosts.map((d) => (
              <div key={d.biz} className="bg-background p-8">
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary mb-3">{d.biz}</div>
                <div className="font-serif text-4xl text-gold font-medium tracking-tight mb-4">{d.perHour}</div>
                <p className="text-xs text-muted-foreground leading-relaxed">{d.note}</p>
              </div>
            ))}
          </div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-5">
            * Estimates based on Houston market averages. Your actual exposure depends on traffic volume, conversion rate, and average deal size. Book a free audit for a custom calculation.
          </p>
        </div>
      </section>

      {/* STACK SPOTLIGHT */}
      <section id="stack" className="px-6 md:px-12 py-24 md:py-32 border-b border-border scroll-mt-24">
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
              failure modes, and egress cost projections documented. Below is the reference
              stack we deploy unless your workload has a documented reason to deviate — and we
              always document the reason.
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

      {/* HOUSTON INDUSTRIES SERVED */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// Houston industries we serve</div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">We know your market.</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
            {industries.map((ind) => (
              <div key={ind.name} className="bg-background p-8 group hover:bg-card/50 transition-colors">
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary mb-3">{ind.name}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{ind.insight}</p>
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
              {
                n: "01",
                t: "Audit & baseline (free)",
                d: "A 1-hour senior-engineer review of your current hosting, DNS configuration, SSL expiry dates, backup posture, and incident-response capability. You receive a written gap analysis with severity ratings. No obligation to continue — the document is yours.",
              },
              {
                n: "02",
                t: "Migration plan",
                d: "DNS cutover plan with a zero-downtime strategy (typically using Cloudflare's orange-cloud proxying for seamless switchover), data-migration scripts with checksums, rollback procedure, and a scheduled Sunday-morning maintenance window. Cutovers outside business hours by default.",
              },
              {
                n: "03",
                t: "Cutover & 48-hour hypercare",
                d: "DNS flip, SSL verification across all domains and subdomains, automated smoke tests against every critical user path, Search Console indexing health check, and status-page activation. We are on-call for the 48 hours post-cutover with 5-minute acknowledgment SLA.",
              },
              {
                n: "04",
                t: "Steady-state operations",
                d: "Monitoring with 60-second external probes from 20+ locations, daily encrypted backups with weekly restore verification, dependency patching with auto-PR on critical CVEs, and monthly written health report. Same-day response on incidents under SLA.",
              },
              {
                n: "05",
                t: "Quarterly review",
                d: "Roadmap call with the named senior engineer on your account. We review what broke, what we patched, what's approaching end-of-life, what to deprecate, and what the next 90 days looks like. No surprises in the invoice.",
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
              "Hardened production environment — WAF, DDoS shielding, HTTPS enforced",
              "Private status page with real-time uptime and full incident history",
              "Daily encrypted backups with documented disaster-recovery runbook",
              "Cloudflare-managed DNS with DNSSEC and sub-second propagation",
              "SPF/DKIM/DMARC configuration with weekly aggregate report forwarding",
              "Monthly health report (uptime %, incidents, patches applied, CVEs triaged)",
              "Quarterly executive review with your named senior engineer",
              "Security questionnaire (SOC 2 Type II controls) deliverable same-day",
              "HIPAA BAA available and signed before PHI touches our infrastructure",
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

      {/* RELATED SERVICES */}
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

      {/* CTA BAND */}
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
