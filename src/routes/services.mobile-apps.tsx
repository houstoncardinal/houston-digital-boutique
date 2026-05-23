import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "Do you build native iOS and Android, or cross-platform?",
    a: "Both. We default to Swift/SwiftUI on iOS and Kotlin on Android when the experience demands platform fidelity — gestures, sensors, BLE, complications. We use React Native or Expo when shared logic, faster shipping, and a single team economy outweigh the platform-native polish. The choice is part of discovery and is documented with trade-offs before a line of code is written.",
  },
  {
    q: "What does a realistic mobile app budget look like in 2026?",
    a: "Internal field-ops apps for a single platform typically land between $80k and $180k for a hardened v1. Consumer apps with payments, accounts, and design polish across iOS and Android usually run $150k–$400k. We provide fixed-fee proposals after a paid two-week discovery so you are not signing a blank check against an estimate.",
  },
  {
    q: "How long does App Store and Google Play review take?",
    a: "Apple averages 24–48 hours for a clean binary; Google is typically same-day. We pre-flight against current store policies (privacy nutrition labels, data deletion endpoints, account-deletion UI, age gates) so first-submission rejections are rare. We have shipped over 60 binaries through Apple review since 2018.",
  },
  {
    q: "Can you integrate with our existing ERP, dispatch software, or EHR?",
    a: "Yes. Common integrations include ServiceTitan, FieldEdge, NetSuite, QuickBooks, Salesforce, HubSpot, Athenahealth, Epic FHIR, Square, Stripe, Twilio, and Shopify. For HIPAA-covered data we sign a BAA and design with PHI minimization, end-to-end transport encryption, and audit logging from day one.",
  },
  {
    q: "Who owns the code, the App Store account, and the design files?",
    a: "You do — entirely. Codebases live in your GitHub or GitLab organization from the first commit. Apple Developer and Google Play accounts are registered under your business entity. Figma libraries are transferred at handover. We retain a working copy for support; nothing is held hostage.",
  },
  {
    q: "What happens after launch?",
    a: "Most clients move onto an LTS support retainer: same-day response, monthly OS-version maintenance, quarterly feature drops, and an on-call engineer for production incidents. The same senior team that built the app supports it — no offshore handoff, no warranty period that quietly ends.",
  },
];

const platforms = [
  { n: "01", t: "Native iOS", sub: "Swift · SwiftUI · Combine", d: "Pixel-precise iOS engineering with Swift Concurrency, WidgetKit, App Intents, Live Activities, StoreKit 2, and Apple Watch complications when the product earns them." },
  { n: "02", t: "Native Android", sub: "Kotlin · Jetpack Compose", d: "Material 3 by default, brand-overridden when the product demands distinction. Coroutines, Hilt, Room, Play Billing. Tested across Pixel, Samsung, and the cheap warehouse tablet you actually use." },
  { n: "03", t: "React Native + Expo", sub: "SDK 52 · EAS · OTA", d: "When a unified codebase makes economic sense, we ship Expo with EAS Build, OTA updates, and native module bridges written in-house when off-the-shelf libraries fall short." },
  { n: "04", t: "Offline-first systems", sub: "CRDT · BLE · Sync", d: "CRDT conflict resolution, BLE peripheral integration, and OTA-aware analytics. Apps that work in the field, on the rig, and underground — then sync cleanly when signal returns." },
];

const proof = [
  { k: "60+", l: "App Store + Play binaries shipped" },
  { k: "4.8★", l: "Average client app rating, trailing 24mo" },
  { k: "14yr", l: "Avg engineer experience on team" },
  { k: "HIPAA", l: "BAA-ready for clinical builds" },
];

const stack = [
  "Swift 6", "SwiftUI", "Kotlin 2", "Jetpack Compose", "React Native 0.76", "Expo SDK 52",
  "Supabase", "PostgREST", "Stripe", "Twilio", "Sentry", "TestFlight",
  "Fastlane", "EAS Build", "Detox", "XCTest", "Espresso", "Firebase",
];

export const Route = createFileRoute("/services/mobile-apps")({
  component: MobileAppsPage,
  head: () => ({
    meta: [
      { title: "Mobile App Development in Houston — iOS, Android, React Native | Atlas Houston" },
      {
        name: "description",
        content:
          "Houston-based native iOS, native Android, and React Native app development. 60+ binaries shipped to the App Store and Google Play, HIPAA-ready, fixed-fee proposals. Senior team, full lifecycle.",
      },
      { property: "og:title", content: "Mobile App Development — Atlas Houston Houston" },
      {
        property: "og:description",
        content:
          "Native iOS, Android, and React Native apps engineered by a senior Houston team. Offline-first, store-ready, supported for the long haul.",
      },
      { property: "og:url", content: "/services/mobile-apps" },
    ],
    links: [{ rel: "canonical", href: "/services/mobile-apps" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Mobile Application Development",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston Houston",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Native iOS, native Android, and React Native mobile applications engineered by a senior Houston team.",
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

function MobileAppsPage() {
  return (
    <SiteLayout>
      {/* SIGNATURE HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-44 pb-28 md:pb-40 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-32 -left-32 h-[44rem] w-[44rem] rounded-full bg-primary/25 blur-[160px] animate-orb" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -right-20 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[160px] animate-orb-alt" />

        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              01 — MOBILE APPLICATIONS
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] font-medium tracking-[-0.03em] leading-[0.88] text-balance mb-12">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>Apps built</span></span>{" "}
            <span className="mask-line"><span style={{ animationDelay: "120ms" }}>for</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "260ms" }} className="text-gold italic">real conditions.</span></span>
          </h1>

          <Reveal delay={500} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Native iOS, native Android, and considered React Native — engineered by a senior
              Houston team that has shipped over 60 production binaries to the App Store and
              Google Play since 2018. Built for the basement with no signal, the gloved hands in
              a 102° attic, and the five-year maintenance horizon.
            </p>
          </Reveal>

          <Reveal delay={680} className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="cta-lux px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Brief us on your app →
            </Link>
            <a
              href="#platforms"
              className="px-9 py-5 border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
            >
              See the practice ↓
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
              // Why our apps survive
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              A mobile app is not a website with rounded corners.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              It runs on a device with a battery, in a basement with no signal, in gloved hands
              in a 102° attic, in a courtroom on silent. Our practice is built around those
              realities. Every app we ship is engineered for offline-first behavior, low-power
              telemetry, accessibility compliance, and a five-year maintenance horizon — not a
              launch-day demo.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              We work the way Houston works: in production, under load, with the lights on. When
              a foreman drops a tablet onto the bed of an F-350 at 60 mph, the dispatch app
              still has the work order. When Apple rolls out iOS 19 the morning of a sales
              demo, your binary still launches. That is the bar.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORMS */}
      <section id="platforms" className="border-b border-border scroll-mt-24">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // The Practice
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Four platforms. One senior team.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 border-t border-border">
          {platforms.map((p, i) => (
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
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border bg-card">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
              // Spotlight — The stack
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-8">
              The tools we trust in <span className="text-gold italic">production.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              We are unfashionably opinionated. Every tool below is one we have shipped to
              production in the last twelve months, monitored at scale, and would happily defend
              in a senior review. No experimental dependencies on a client's dime.
            </p>
          </div>
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-px bg-border border border-border">
            {stack.map((s) => (
              <div key={s} className="p-5 bg-background font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors">
                <span className="text-primary mr-2">◆</span>{s}
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
            How we run a mobile build.
          </h2>
          <ol className="space-y-8">
            {[
              { n: "01", t: "Discovery (2 weeks, fixed-fee)", d: "Stakeholder interviews, technical audit, store-policy review, architecture diagram, fixed-fee build proposal. You leave with the deliverables whether you continue with us or not." },
              { n: "02", t: "Design sprint (2–4 weeks)", d: "Brand-aware product design in Figma, clickable prototype, usability validation with 5 real users from your target segment, accessibility audit against WCAG 2.2 AA." },
              { n: "03", t: "Engineering (8–20 weeks)", d: "Two-week sprints with Friday demos. CI/CD from sprint one, beta builds through TestFlight and Play Internal Testing, weekly written status report." },
              { n: "04", t: "Store launch", d: "App Store Connect and Google Play submission, privacy policy, ASO copy, screenshots, and a 7-day post-launch hypercare window." },
              { n: "05", t: "Operate (ongoing)", d: "LTS retainer: OS-version compatibility, dependency triage, feature roadmap, on-call incident response." },
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
              "Production iOS and/or Android binaries in your developer account",
              "Source code in your GitHub or GitLab organization",
              "Figma design library with components, tokens, exported assets",
              "Architecture documentation, runbooks, integration diagrams",
              "CI/CD pipelines: GitHub Actions, Fastlane, EAS Build",
              "Privacy policy, ToS scaffold, App Store/Play store metadata",
              "Test coverage report (unit, integration, snapshot) above 70%",
              "30-day post-launch warranty + optional LTS support retainer",
            ].map((d) => (
              <li key={d} className="flex gap-3 text-sm md:text-base text-foreground/90">
                <span className="text-primary mt-1">◆</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>

          <div className="mt-12 pt-8 border-t border-border">
            <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
              Want a fixed-fee proposal? A senior lead replies within one business day.
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
            { to: "/services/websites", label: "Websites & Web Apps", note: "Marketing, e-commerce, portals" },
            { to: "/services/cloud-hosting", label: "Cloud Hosting & Support", note: "Where your app runs after launch" },
            { to: "/services/seo", label: "SEO & Discoverability", note: "How customers find you" },
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
              Tell us what you're building. A senior lead — not a salesperson — replies within
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
