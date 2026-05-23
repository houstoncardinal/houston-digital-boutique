import { createFileRoute } from "@tanstack/react-router";
import { ServicePage } from "@/components/site/ServicePage";

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

export const Route = createFileRoute("/services/branding")({
  component: () => (
    <ServicePage
      index="03"
      eyebrow="Branding & Identity"
      title={
        <>
          Identity systems <br />
          that <span className="text-gold italic">scale with you.</span>
        </>
      }
      lede="Naming, marks, voice, packaging, signage, and full digital systems — built by a Houston brand team that designs for the App Store icon and the freeway billboard with equal care."
      intro="A brand is what people repeat about you when you are not in the room. We design identity systems that are confident, opinionated, and durable — built to look as good on a 4K hero video as on a vinyl truck wrap, and built with the kind of underlying system that lets your team move quickly without diluting the work. Most of our clients are not in 'creative' industries. They are HVAC operators, dental groups, freight brokers, energy services firms, and law practices — businesses where a serious brand creates outsized commercial leverage because the competition still looks like 2005."
      authority={[
        { k: "40+", v: "Brand systems shipped since 2018" },
        { k: "3", v: "Senior brand leads on staff" },
        { k: "AAA", v: "Contrast tested on every palette" },
        { k: "USPTO", v: "Preliminary clearance on every name" },
      ]}
      pillars={[
        { n: "i", t: "Naming & verbal identity", d: "Generative naming sprints with linguistic, domain, and USPTO screening. Tagline, value proposition, voice guidelines, and a messaging architecture your team can actually use." },
        { n: "ii", t: "Visual identity system", d: "Wordmark and symbol design, typography pairing, accessible color system, motion principles, photography direction. Delivered as Figma libraries, brand book PDF, and exported asset kits." },
        { n: "iii", t: "Packaging, signage & environment", d: "Physical-world execution: product packaging, retail and office signage, vehicle livery, trade-show booths, uniform direction. Production-ready files with vendor liaison." },
        { n: "iv", t: "Digital implementation", d: "Brand applied across web, app, social templates, decks, email signatures, and ad systems. The brand goes live the way it was designed — because the same studio builds the site." },
      ]}
      process={[
        { n: "01", t: "Discovery & positioning", d: "Stakeholder interviews, competitive landscape audit, customer interviews, positioning workshop. Output: a one-page strategy brief that anchors every creative decision." },
        { n: "02", t: "Verbal — naming & voice", d: "Where applicable: 3 rounds of naming with linguistic and IP screening. Voice principles and messaging architecture." },
        { n: "03", t: "Visual exploration", d: "Three distinct creative directions presented in context (storefront, website, app icon, billboard). One direction selected for refinement." },
        { n: "04", t: "System build", d: "Full Figma library, brand book, asset exports, motion guidelines, photography direction. Production templates for the touchpoints you ship every week." },
        { n: "05", t: "Rollout & guardianship", d: "Launch plan, internal training, and a quarterly brand-health review on retainer if you want us watching the work over time." },
      ]}
      deliverables={[
        "Strategy brief and positioning statement",
        "Brand name with preliminary USPTO clearance memo (when applicable)",
        "Primary logo, symbol, monogram, and clear-space rules",
        "Color system tested for WCAG 2.2 AA + AAA where possible",
        "Typography system (display, body, mono) with licensing notes",
        "Voice and messaging guidelines with example copy",
        "Figma brand library with components and tokens",
        "Brand book PDF (print-ready) and exported asset bundle",
        "Production-ready packaging, signage, or livery files (if scoped)",
      ]}
      faqs={faqs}
      related={[
        { to: "/services/websites", label: "Websites & Web Apps", note: "Where the brand lives online" },
        { to: "/services/mobile-apps", label: "Mobile Applications", note: "Identity on the home screen" },
        { to: "/services/seo", label: "SEO & Discoverability", note: "Make the brand findable" },
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
      { title: "Brand Identity Design in Houston | Atlas Houston" },
      {
        name: "description",
        content:
          "Houston branding studio. Naming, identity systems, packaging, signage, and digital rollout. Built for businesses that scale — not Behance.",
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
  }),
});
