import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "Do you build native iOS and Android, or cross-platform?",
    a: "Both. We default to Swift/SwiftUI on iOS and Kotlin/Jetpack Compose on Android when the experience demands platform fidelity — gestures, sensors, BLE, Camera, complications, home-screen widgets. We use React Native with Expo when shared logic, a single team, and faster iteration outweigh platform-native polish. The decision is documented during discovery with an explicit trade-off matrix — performance delta, hire-ability, long-term maintenance cost — before a line of code is written.",
  },
  {
    q: "What does a realistic mobile app budget look like in 2026?",
    a: "Internal field-ops apps for a single platform typically land between $80k and $180k for a hardened v1. Consumer apps with payments, accounts, and design polish across iOS and Android usually run $150k–$400k. We provide fixed-fee proposals after a paid two-week discovery so you are not signing a blank check against an estimate. Scope creep is the industry's biggest budget killer — we break scope at every sprint and re-propose in writing before building anything outside the original agreement.",
  },
  {
    q: "How long does App Store and Google Play review take?",
    a: "Apple averages 24–48 hours for a clean binary; Google is typically same-day to 72 hours. We pre-flight every submission against current store policies — privacy nutrition labels, data deletion endpoints, account-deletion UI, age gates, permission justification strings — so first-submission rejections are rare. We have shipped over 60 binaries through Apple review since 2018 with fewer than four first-submission rejections total.",
  },
  {
    q: "Can you integrate with our existing ERP, dispatch software, or EHR?",
    a: "Yes. Common integrations include ServiceTitan, FieldEdge, Jobber, NetSuite, QuickBooks, Salesforce, HubSpot, Athenahealth, Epic FHIR, Square, Stripe, Twilio, and Shopify. For HIPAA-covered data we sign a BAA and design with PHI minimization, end-to-end transport encryption (TLS 1.3, encrypted local SQLite), and audit logging from day one. We have never shipped a covered app without a signed BAA.",
  },
  {
    q: "Who owns the code, the App Store account, and the design files?",
    a: "You do — entirely. Codebases live in your GitHub or GitLab organization from the first commit. Apple Developer and Google Play accounts are registered under your business entity. Figma libraries are transferred at handover. We retain a working copy for support; nothing is held hostage, no proprietary SDK you must license, no build system only we can run.",
  },
  {
    q: "What happens after launch?",
    a: "Most clients move onto an LTS support retainer: same-day response to production incidents, monthly OS-version compatibility maintenance (Apple releases in September/October every year and apps that haven't been updated get warnings in the App Store within 6 months), quarterly feature drops, and an on-call engineer for production incidents. The same senior team that built the app supports it — no offshore handoff, no warranty period that quietly expires.",
  },
  {
    q: "Can you take over an app another developer abandoned?",
    a: "Yes, and it's more common than you'd think. We start with a paid two-week codebase audit: dependency graph, security surface, crash rate analysis, open App Store rejections, and a written remediation plan. We'll tell you honestly whether a rewrite or an incremental rescue is more cost-effective. If the codebase is salvageable, we establish test coverage first, then refactor — we don't rewrite for the sake of it. We've inherited apps built on React Native 0.59, Objective-C, and legacy Ionic without incident.",
  },
  {
    q: "How do you handle App Store compliance for privacy labels and data deletion?",
    a: "Apple's privacy nutrition labels require you to declare every data type your app collects or links to a user's identity. We audit third-party SDKs (analytics, crash reporting, advertising) for data collection, document the full data-type manifest, and write the App Store Connect privacy responses with you. For data deletion, we implement a compliant in-app account-deletion flow (required since June 2023) with a backend endpoint that hard-deletes or anonymizes all linked data within Apple's 30-day window. We also generate the Privacy Manifest file (PrivacyInfo.xcprivacy) required since spring 2024 for all apps using specific Apple APIs.",
  },
];

const platforms = [
  {
    n: "01",
    t: "Native iOS",
    sub: "Swift 6 · SwiftUI · Combine · StoreKit 2",
    d: "Pixel-precise iOS engineering with Swift Concurrency, WidgetKit, App Intents, Live Activities, StoreKit 2, and Apple Watch complications earned by the product. We write UIKit when SwiftUI hits a platform-version wall, and we ship privacy manifests and correct entitlement declarations on first submission. Every binary is signed, notarized, and pre-flighted through App Store Connect before it reaches your hands.",
  },
  {
    n: "02",
    t: "Native Android",
    sub: "Kotlin 2 · Jetpack Compose · Material 3",
    d: "Material 3 by default, brand-overridden when the product demands distinction. Coroutines, Hilt, Room, WorkManager, Play Billing, and Play In-App Updates. Tested across Pixel, Samsung One UI, and the cheap warehouse tablet your field team actually uses. We target API 26+ with Predictive Back Gesture support and an explicit minSdk strategy you sign off on before the project kicks off.",
  },
  {
    n: "03",
    t: "React Native + Expo",
    sub: "SDK 52 · EAS Build · OTA · New Arch",
    d: "When a unified codebase makes economic sense, we ship Expo SDK 52 with the New Architecture enabled (Fabric + JSI), EAS Build for CI/CD, and EAS Update for OTA hot-fixes without App Store latency. We write native module bridges in-house when off-the-shelf libraries fall short or pose a security risk. We do not ship Expo Go to production clients.",
  },
  {
    n: "04",
    t: "Offline-first systems",
    sub: "CRDT · BLE · SQLite · Background sync",
    d: "CRDT conflict resolution with PowerSync or custom Yjs, BLE peripheral integration for IoT and field hardware, encrypted SQLite via SQLCipher, and OTA-aware analytics that queue events locally when offline. Apps that work in the field, on the rig, in the hospital basement, and underground — then sync cleanly and in order when signal returns. Houston summers test every assumption about connectivity.",
  },
];

const proof = [
  { k: "60+", l: "App Store + Play binaries shipped since 2018" },
  { k: "4.8★", l: "Average client app rating, trailing 24 months" },
  { k: "14yr", l: "Avg engineer experience on senior team" },
  { k: "HIPAA", l: "BAA-ready with PHI minimization by default" },
];

const stack = [
  "Swift 6", "SwiftUI", "Kotlin 2", "Jetpack Compose", "React Native 0.76",
  "Expo SDK 52", "Supabase", "PostgREST", "Stripe", "Twilio",
  "Sentry", "TestFlight", "Fastlane", "EAS Build", "Detox",
  "XCTest", "Espresso", "Firebase",
];

const clientOutcomes = [
  {
    name: "HOU GEN PROS",
    service: "Field ops mobile",
    outcome: "Dispatch and job-status app for generator installation crews. Offline job sheets, BLE-connected diagnostics, and photo capture that syncs to the office the moment a truck hits a cell tower.",
    url: "hougenpros.com",
    domain: "hougenpros.com",
  },
  {
    name: "United CCR",
    service: "Emergency response app",
    outcome: "24/7 disaster restoration dispatch flow with push alerts, GPS crew tracking, and offline-capable damage intake forms — critical when Harvey-level flooding kills cell capacity in entire zip codes.",
    url: "https://unitedccr.com",
    domain: "unitedccr.com",
  },
  {
    name: "BluTouch Pools",
    service: "Client project portal",
    outcome: "Mobile portal for luxury pool clients to view construction milestones, approve design selections, and message their crew lead — turning a 4.8★ rating into 5-star digital experience.",
    url: "https://blutouchpools.com",
    domain: "blutouchpools.com",
  },
  {
    name: "Houston Enterprise",
    service: "Construction field tools",
    outcome: "Mobile-first field reporting for construction site leads: daily logs, subcontractor sign-off, and equipment check-in — all CRDT-synced so foremen working underground stay in sync.",
    url: "https://houinc.com",
    domain: "houinc.com",
  },
];

const industries = [
  {
    name: "Field services & HVAC",
    insight: "Houston's $4B+ HVAC, plumbing, and electrical market runs on dispatch. Apps that survive 102°F slab work, BLE tool tracking, and ServiceTitan integration move faster than the paper forms they replace.",
  },
  {
    name: "Healthcare & clinics",
    insight: "Athenahealth, Epic FHIR, and HIPAA-covered data flows. Apps for patient intake, care-team communication, and remote monitoring — BAA signed before we touch a single PHI record.",
  },
  {
    name: "Logistics & dispatch",
    insight: "Real-time freight visibility, load confirmations, and driver communication for Houston's 2,000+ trucking and logistics firms. Offline-first — because the Port of Houston has plenty of dead zones.",
  },
  {
    name: "Property management",
    insight: "Tenant portals, maintenance ticketing, lease-document signing, and rent payment flows for Houston's fast-growing multifamily and commercial property management sector.",
  },
];

const comparisonRows = [
  {
    factor: "Cost (v1, dual platform)",
    nativeIos: "$150k–$400k; two codebases, best result",
    reactNative: "$100k–$260k; one codebase, ~90% of native quality",
    flutter: "$100k–$260k; Dart talent pool is narrower in Houston",
    noCode: "$10k–$50k; you'll outgrow it by version 1.1",
  },
  {
    factor: "Timeline",
    nativeIos: "16–28 weeks for polished v1",
    reactNative: "12–20 weeks with EAS CI/CD",
    flutter: "14–22 weeks",
    noCode: "4–10 weeks; feature walls hit fast",
  },
  {
    factor: "Performance",
    nativeIos: "Native — 60/120fps guaranteed",
    reactNative: "Near-native with New Arch (Fabric); JS bridge overhead removed",
    flutter: "Near-native; Impeller renderer is fast but Dart FFI adds complexity",
    noCode: "Acceptable for simple forms; poor for animations or offline",
  },
  {
    factor: "Hiring after us",
    nativeIos: "Large Swift + Kotlin talent pool globally",
    reactNative: "Largest mobile talent pool; any React dev can ramp",
    flutter: "Growing but thin in Texas — fewer local candidates",
    noCode: "Locked to platform vendor's proprietary environment",
  },
  {
    factor: "App Store compliance",
    nativeIos: "Full control; we've shipped 60+ clean submissions",
    reactNative: "Fully compliant; we generate PrivacyInfo.xcprivacy natively",
    flutter: "Compliant; Flutter tooling handles entitlements",
    noCode: "Platform handles it — until it doesn't; limited override control",
  },
  {
    factor: "Offline support",
    nativeIos: "First-class; SQLite, CRDT, background sync",
    reactNative: "Excellent with WatermelonDB / PowerSync + EAS Update",
    flutter: "Good; Drift (SQLite) + background isolates work well",
    noCode: "Minimal; most no-code tools are cloud-dependent by design",
  },
  {
    factor: "Long-term ownership",
    nativeIos: "You own the code; any Swift/Kotlin shop can maintain it",
    reactNative: "You own the code; largest community of any mobile framework",
    flutter: "You own the code; dependent on Google's roadmap for Dart",
    noCode: "Vendor-dependent; pricing and platform can change overnight",
  },
  {
    factor: "Best for",
    nativeIos: "Flagship consumer apps, medical devices, sensor-heavy tooling",
    reactNative: "Field-ops, B2B SaaS mobile, MVP→scale plays",
    flutter: "Cross-platform including web/desktop from one codebase",
    noCode: "Internal tools, prototypes, non-technical founders validating ideas",
  },
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
      { property: "og:title", content: "Mobile App Development — Atlas Houston" },
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
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://atlashouston.com/" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://atlashouston.com/services" },
            { "@type": "ListItem", position: 3, name: "Mobile App Development", item: "https://atlashouston.com/services/mobile-apps" },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Mobile Application Development",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston",
            url: "https://atlashouston.com",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Native iOS, native Android, and React Native mobile applications engineered by a senior Houston team. HIPAA-ready, offline-first, fixed-fee proposals.",
          areaServed: { "@type": "City", name: "Houston" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Mobile App Development Services",
            itemListElement: [
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Native iOS Development" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Native Android Development" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "React Native + Expo Development" } },
              { "@type": "Offer", itemOffered: { "@type": "Service", name: "Offline-First Mobile Systems" } },
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

function MobileAppsPage() {
  return (
    <SiteLayout>
      {/* HERO */}
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

      {/* PROOF STRIP */}
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

      {/* CLIENT OUTCOMES STRIP */}
      <section className="border-b border-border overflow-x-auto">
        <div className="px-6 md:px-12 pt-10 pb-2">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
            // Apps behind these Houston businesses
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
              // Apps built for Houston's conditions
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              A mobile app is not a website with rounded corners.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              Houston's climate and geography stress-test mobile software in ways that San
              Francisco demos never reveal. Field workers in 102° attics with sweaty, gloved
              fingers. Generator technicians in flooded substations where LTE drops entirely.
              Dispatch operators in concrete-reinforced basements where GPS and data coexist only
              in theory. We build apps for those realities, not for the conference room pitch.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Every app we ship is engineered offline-first: local SQLite with encrypted storage,
              CRDT-based conflict resolution when the team re-syncs, and background sync that
              respects battery budgets — because a dead phone on a job site is a liability, not
              just an inconvenience. We implement low-power telemetry and adaptive quality so the
              app stays functional at 15% battery in the field, not just at 100% on a desk.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              The five-year horizon matters too. Apple releases a new iOS every September and
              deprecated APIs eventually stop working — sometimes in ways that crash production
              binaries the morning of an enterprise demo. We operate the apps we build under an
              LTS retainer that catches these shifts before your customers do. The same engineer
              who wrote your onboarding flow is the one who patches it when Swift 7 ships.
            </p>
          </div>
        </div>
      </section>

      {/* PLATFORMS GRID */}
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

      {/* COMPARISON TABLE */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // How to choose
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12 max-w-3xl">
            Native, cross-platform, or no-code — the honest comparison.
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-card">
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-b border-r border-border">Factor</th>
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-primary border-b border-r border-border">Native iOS + Android</th>
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-b border-r border-border">React Native + Expo</th>
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-b border-r border-border">Flutter</th>
                  <th className="text-left px-4 py-3 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border-b last:border-r-0 border-border">No-Code (Bubble/Glide)</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.factor} className={`border-b border-border hover:bg-card/40 transition-colors ${i % 2 === 0 ? "" : "bg-card/20"}`}>
                    <td className="px-4 py-3.5 font-mono text-[10px] uppercase tracking-[0.15em] text-foreground/80 border-r border-border/50 font-medium">{row.factor}</td>
                    <td className="px-4 py-3.5 text-foreground/90 border-r border-border/50">{row.nativeIos}</td>
                    <td className="px-4 py-3.5 text-muted-foreground border-r border-border/50">{row.reactNative}</td>
                    <td className="px-4 py-3.5 text-muted-foreground border-r border-border/50">{row.flutter}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{row.noCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-[0.2em] mt-5">
            * Estimates for a v1 dual-platform consumer app with auth, payments, and custom design. Discovery scopes refine these ranges before any contract is signed.
          </p>
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
              in a senior review. No experimental dependencies on a client's dime. No tools we
              read about on Hacker News yesterday.
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
            // Engagement
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">
            How we run a mobile build.
          </h2>
          <ol className="space-y-8">
            {[
              {
                n: "01",
                t: "Discovery (2 weeks, fixed-fee)",
                d: "Stakeholder interviews, technical audit of any existing codebase, App Store/Play policy review, integration map with your ERP or dispatch system, architecture diagram, and a fixed-fee build proposal. You receive all deliverables whether you continue with us or not — no hostage discovery docs.",
              },
              {
                n: "02",
                t: "Design sprint (2–4 weeks)",
                d: "Brand-aware product design in Figma with a component library, interactive prototype, usability validation with 5 real users from your target segment, and an accessibility audit against WCAG 2.2 AA and iOS/Android Human Interface Guidelines.",
              },
              {
                n: "03",
                t: "Engineering (8–20 weeks)",
                d: "Two-week sprints with Friday demo calls. CI/CD wired from sprint one via EAS Build, Fastlane, and GitHub Actions. Beta builds through TestFlight and Play Internal Testing after every sprint. Weekly written status report including crash rate, test coverage delta, and open blockers.",
              },
              {
                n: "04",
                t: "Store launch",
                d: "App Store Connect and Google Play submission with privacy nutrition labels, data deletion flow, App Tracking Transparency (if applicable), ASO-optimized metadata, screenshot set for all device sizes, and a 7-day post-launch hypercare window with same-hour incident response.",
              },
              {
                n: "05",
                t: "Operate (ongoing)",
                d: "LTS retainer: OS-version compatibility patching before each September Apple release, dependency security triage, feature roadmap planning, and on-call incident response. Same team, same engineer. No offshore handoff.",
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
              "Production iOS and/or Android binaries in your developer account",
              "Source code in your GitHub or GitLab organization from day one",
              "Figma design library with components, tokens, and exported assets",
              "Architecture documentation, runbooks, and integration diagrams",
              "CI/CD pipelines: GitHub Actions + Fastlane + EAS Build",
              "Privacy policy, Terms scaffold, App Store and Play metadata",
              "App Privacy Manifest (PrivacyInfo.xcprivacy) for App Store compliance",
              "Test coverage report (unit, integration, snapshot) above 70%",
              "HIPAA BAA and PHI architecture documentation (if applicable)",
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

      {/* RELATED SERVICES */}
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

      {/* CTA BAND */}
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
