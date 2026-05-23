import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

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

export const Route = createFileRoute("/services/mobile-apps")({
  component: () => (
    <ServicePage
      index="01"
      eyebrow="Mobile Applications"
      title={
        <>
          Mobile apps built <br />
          for <span className="text-gold italic">real conditions.</span>
        </>
      }
      lede="Native iOS, native Android, and considered React Native — engineered by a senior Houston team that has shipped over 60 production binaries to the App Store and Google Play since 2018."
      intro="A mobile app is not a website with rounded corners. It runs on a device with a battery, in a basement with no signal, in gloved hands in a 102° attic, in a courtroom on silent. Our practice is built around those realities. Every app we ship is engineered for offline-first behavior, low-power telemetry, accessibility compliance, and a five-year maintenance horizon — not a launch-day demo. We work the way Houston works: in production, under load, with the lights on."
      authority={[
        { k: "60+", v: "App Store + Play binaries shipped" },
        { k: "4.8★", v: "Avg client app rating, trailing 24mo" },
        { k: "14yr", v: "Avg engineer experience on team" },
        { k: "HIPAA", v: "BAA-ready for clinical builds" },
      ]}
      pillars={[
        {
          n: "i",
          t: "Native iOS — Swift & SwiftUI",
          d: "Pixel-precise iOS engineering with Combine, Swift Concurrency, WidgetKit, App Intents, Live Activities, and StoreKit 2. Built for iPhone, iPad, and Apple Watch where it matters.",
        },
        {
          n: "ii",
          t: "Native Android — Kotlin & Compose",
          d: "Jetpack Compose, Coroutines, Hilt, Room, and Play Billing — Material 3 by default, brand-overridden where the product demands distinction. Tested across Pixel, Samsung, and the cheap warehouse tablet you actually use.",
        },
        {
          n: "iii",
          t: "Cross-platform — React Native + Expo",
          d: "When a unified codebase makes economic sense, we ship Expo SDK 52 with EAS Build, OTA updates, and native module bridges written in-house when off-the-shelf libraries fall short.",
        },
        {
          n: "iv",
          t: "Offline-first & telemetry",
          d: "CRDT sync, conflict resolution, BLE peripheral integration, and OTA-aware analytics. Apps that work in the field, on the rig, and underground — then sync cleanly when signal returns.",
        },
      ]}
      process={[
        { n: "01", t: "Discovery (2 weeks, fixed-fee)", d: "Stakeholder interviews, technical audit, store-policy review, architecture diagram, fixed-fee build proposal. You leave with the deliverables whether you continue with us or not." },
        { n: "02", t: "Design sprint (2–4 weeks)", d: "Brand-aware product design in Figma, clickable prototype, usability validation with 5 real users from your target segment, accessibility audit against WCAG 2.2 AA." },
        { n: "03", t: "Engineering (8–20 weeks)", d: "Two-week sprints with Friday demos. CI/CD from sprint one, beta builds through TestFlight and Play Internal Testing, weekly written status report." },
        { n: "04", t: "Store launch", d: "App Store Connect and Google Play submission, privacy policy, ASO copy, screenshots, and a 7-day post-launch hypercare window." },
        { n: "05", t: "Operate (ongoing)", d: "LTS retainer: OS-version compatibility, dependency triage, feature roadmap, on-call incident response." },
      ]}
      deliverables={[
        "Production iOS and/or Android binaries in your developer account",
        "Source code in your GitHub or GitLab organization (MIT-internal license)",
        "Figma design library with components, tokens, and exported assets",
        "Architecture documentation, runbooks, and integration diagrams",
        "CI/CD pipelines: GitHub Actions, Fastlane, EAS Build",
        "Privacy policy, ToS scaffold, App Store/Play store metadata",
        "Test coverage report (unit, integration, snapshot) above 70%",
        "30-day post-launch warranty + optional LTS support retainer",
      ]}
      faqs={faqs}
      related={[
        { to: "/services/websites", label: "Websites & Web Apps", note: "Marketing, e-commerce, portals" },
        { to: "/services/cloud-hosting", label: "Cloud Hosting & Support", note: "Where your app runs after launch" },
        { to: "/services/seo", label: "SEO & Discoverability", note: "How customers find you" },
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
      { title: "Mobile App Development in Houston | Forgeyard" },
      {
        name: "description",
        content:
          "Houston-based native iOS, native Android, and React Native app development. 60+ binaries shipped, HIPAA-ready, fixed-fee proposals. Senior team, full lifecycle.",
      },
      { property: "og:title", content: "Mobile App Development — Forgeyard Houston" },
      {
        property: "og:description",
        content:
          "Native iOS, Android, and React Native apps engineered by a senior Houston team. Offline-first, store-ready, supported for the long haul.",
      },
      { property: "og:url", content: "/services/mobile-apps" },
    ],
    links: [{ rel: "canonical", href: "/services/mobile-apps" }],
  }),
});
