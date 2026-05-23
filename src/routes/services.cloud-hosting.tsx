import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

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

export const Route = createFileRoute("/services/cloud-hosting")({
  component: () => (
    <ServicePage
      index="04"
      eyebrow="Cloud, Hosting & Long-Term Support"
      title={
        <>
          Infrastructure that <br />
          <span className="text-gold italic">never goes dark.</span>
        </>
      }
      lede="Hardened multi-region cloud hosting, 24/7 monitoring, encrypted backups, and a senior on-call engineering pod based in Houston. The site you launched on a Tuesday is still online and supported five years later."
      intro="Most agencies build it, ship it, and disappear. Then it breaks at 2 a.m. before a product launch and the founder is left calling a freelancer in another time zone. We built our operations practice as the antidote to that pattern. Every product we ship runs on infrastructure we own, monitor, and patch. There is a named senior engineer responsible for your environment. There is a written incident-response runbook. There is a status page you can point your team at when somebody asks. And there is a phone number that rings to a human in Houston when it matters."
      authority={[
        { k: "99.99%", v: "Hosting uptime, trailing 24mo" },
        { k: "<12m", v: "Avg disaster-recovery RTO" },
        { k: "24/7", v: "On-call pod for retainer clients" },
        { k: "SOC2", v: "Type II controls operated internally" },
      ]}
      pillars={[
        { n: "i", t: "Managed cloud hosting", d: "Cloudflare Workers, AWS, and Fly.io chosen per workload. WAF, DDoS shielding, edge caching, image optimization, and automated SSL renewal — invisible until you look at the bill we save you." },
        { n: "ii", t: "Observability & monitoring", d: "Uptime monitoring, real-user metrics, log aggregation (Axiom/Datadog), error tracking (Sentry), and an executive monthly health report written in plain English." },
        { n: "iii", t: "Backups & disaster recovery", d: "Daily encrypted snapshots, point-in-time recovery, off-region weekly fulls, annual cold archives, and quarterly DR drills with documented RTO/RPO per client." },
        { n: "iv", t: "Security & compliance posture", d: "Dependency scanning, quarterly pentests for retainer clients, SOC 2 Type II controls operationally, HIPAA BAA available, and a security questionnaire we can deliver same-day." },
      ]}
      process={[
        { n: "01", t: "Audit & baseline", d: "Free 1-hour audit of your current hosting, DNS, SSL, backups, and incident posture. You receive a written gap analysis whether you continue with us or not." },
        { n: "02", t: "Migration plan", d: "DNS plan, downtime budget (typically zero), data-migration script, rollback strategy. Cutovers happen on a scheduled Sunday morning window." },
        { n: "03", t: "Cutover & verification", d: "DNS flip, SSL verification, automated smoke tests, search console health check, status-page activation. Forty-eight-hour hypercare." },
        { n: "04", t: "Steady-state operations", d: "Monitoring, patching, backups, monthly written report. Same-day response on incidents under SLA." },
        { n: "05", t: "Quarterly review", d: "Roadmap call with the senior engineer assigned to your account. We discuss what broke, what we patched, what's coming, and what to retire." },
      ]}
      deliverables={[
        "Hardened production environment with WAF and DDoS shielding",
        "Private status page with real-time uptime and incident history",
        "Daily encrypted backups + documented disaster-recovery runbook",
        "Monthly health report (uptime, incidents, patches, security)",
        "Quarterly executive review with assigned senior engineer",
        "Security questionnaire (SOC 2 controls) on request",
        "HIPAA BAA available for covered entities",
        "Named on-call engineer with documented escalation tree",
      ]}
      faqs={faqs}
      related={[
        { to: "/services/websites", label: "Websites & Web Apps", note: "What we host" },
        { to: "/services/mobile-apps", label: "Mobile Applications", note: "Backends we operate" },
        { to: "/services/seo", label: "SEO & Discoverability", note: "Performance impacts ranking" },
      ]}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }}
    />
  ),
  head: () => ({
    meta: [
      { title: "Managed Cloud Hosting & Support in Houston | Forgeyard" },
      {
        name: "description",
        content:
          "99.99% uptime, 24/7 on-call senior engineers in Houston, daily encrypted backups, SOC 2 controls, HIPAA BAA. Hosting that never goes dark.",
      },
      { property: "og:title", content: "Cloud Hosting & LTS Support — Forgeyard Houston" },
      {
        property: "og:description",
        content:
          "Hardened multi-region hosting and 24/7 support from a Houston-based senior engineering team. Built to last five years, not one launch.",
      },
      { property: "og:url", content: "/services/cloud-hosting" },
    ],
    links: [{ rel: "canonical", href: "/services/cloud-hosting" }],
  }),
});
