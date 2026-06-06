import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Atlas Houston — Senior Digital Studio | Web, Apps, SEO & Social" },
      {
        name: "description",
        content:
          "Atlas Houston is a 7-person in-house expert digital studio built in Houston, TX. Custom websites, mobile apps, technical SEO, social media management, video production, and branding — partner-led, fixed-fee, no handoffs.",
      },
      { property: "og:title", content: "About Atlas Houston — Senior Digital Studio" },
      {
        property: "og:description",
        content:
          "A 7-person in-house Houston digital studio. Expert talent, fixed-fee engagements, and a no-handoff model — from web design and app development to SEO and social media.",
      },
      { property: "og:url", content: "/about" },
      { name: "robots", content: "index, follow" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "About Atlas Houston",
          url: "https://atlashouston.com/about",
          description:
            "Atlas Houston is a Houston-based digital studio offering web design, app development, SEO, social media management, video production, and branding.",
          about: {
            "@type": "Organization",
            "@id": "https://atlashouston.com/#org",
            name: "Atlas Houston",
            url: "https://atlashouston.com",
            foundingDate: "2018",
            numberOfEmployees: { "@type": "QuantitativeValue", value: 7 },
            address: {
              "@type": "PostalAddress",
              addressLocality: "Houston",
              addressRegion: "TX",
              addressCountry: "US",
            },
          },
          breadcrumb: {
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://atlashouston.com" },
              { "@type": "ListItem", position: 2, name: "About", item: "https://atlashouston.com/about" },
            ],
          },
        }),
      },
    ],
  }),
});

const VALUES = [
  {
    n: "01",
    title: "Senior talent only.",
    body: "Every person on an Atlas project is mid- to senior-level. We don't run a farm of junior staff supervised by one lead — you work with experienced professionals at every touchpoint, from discovery to deployment.",
  },
  {
    n: "02",
    title: "No handoffs. No contractors.",
    body: "We build what we scope. No white-labeling work overseas, no passing your brand to a subcontractor you'll never meet. What you see in the proposal is the team that does the work.",
  },
  {
    n: "03",
    title: "Fixed-fee. Written scope.",
    body: "Every engagement starts with a written scope and a fixed price. No retainers that creep, no 'scope change' surprise invoices. You know exactly what you're getting before you sign anything.",
  },
  {
    n: "04",
    title: "We maintain what we ship.",
    body: "The team that launches your site is the same team that manages it. Monthly care plans, security patches, SEO reporting, and content updates — not a support ticket queue, a named engineer.",
  },
  {
    n: "05",
    title: "Houston-first.",
    body: "We're based in Houston and the majority of our work is in the Texas market. We know the competitive landscape, the search behavior, and the business culture here. That local knowledge is woven into every project.",
  },
  {
    n: "06",
    title: "Results, not reports.",
    body: "We measure success by rankings, leads, and revenue — not vanity metrics. Our monthly reports show the numbers that matter to your business, not just page views and impressions.",
  },
];

const STATS = [
  { n: "2018", l: "Founded in Houston" },
  { n: "7", l: "In-house specialists" },
  { n: "6+", l: "Services under one roof" },
  { n: "100%", l: "Houston-based clients served" },
];

const DISCIPLINES = [
  { label: "Web Design & Development", href: "/services/websites" },
  { label: "Mobile App Development", href: "/services/mobile-apps" },
  { label: "Technical SEO & Local Pack", href: "/services/seo" },
  { label: "Social Media Management", href: "/services/social-media" },
  { label: "Video Production", href: "/services/video-production" },
  { label: "Branding & Identity", href: "/services/branding" },
  { label: "Cloud & Managed Hosting", href: "/services/cloud-hosting" },
];

function AboutPage() {
  return (
    <SiteLayout>

      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-40 pb-16 md:pb-20 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/3 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[160px] animate-orb" />
        <div className="relative max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-10">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em] uppercase">
              About the Studio
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-medium tracking-[-0.025em] leading-[0.9] text-balance mb-10">
            Built in Houston. <br />
            <span className="text-gold italic">Built to last.</span>
          </h1>
          <Reveal delay={300} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Atlas Houston is a 7-person in-house expert digital studio. We build websites, mobile apps,
              SEO strategies, social media programs, video content, and brand identities — all under
              one roof, with one focused team, and one point of contact.
            </p>
          </Reveal>
        </div>
      </section>

      {/* STATS STRIP */}
      <div className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {STATS.map((s) => (
          <div key={s.l} className="p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
            <div className="font-serif text-4xl md:text-5xl text-gold font-medium tracking-tight">{s.n}</div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4">{s.l}</div>
          </div>
        ))}
      </div>

      {/* STORY */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
              // Our story
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95]">
              Why we started.
            </h2>
          </div>
          <div className="lg:col-span-8 space-y-6 text-base md:text-lg text-muted-foreground leading-relaxed">
            <p>
              Atlas Houston was founded in 2018 with one conviction: Houston businesses deserved a
              digital agency that operated at the same standard as the large-market agencies in
              New York and San Francisco — without the overhead, the handoffs, or the junior teams
              hidden behind a senior pitch team.
            </p>
            <p>
              We built the studio around senior talent from day one. Web engineers, mobile
              developers, SEO strategists, social media directors, video producers, and brand
              designers — all in-house, all experienced, all on your project by name.
            </p>
            <p>
              Today, Atlas Houston serves businesses across the greater Houston metro and the
              broader Texas market. Construction companies, law firms, luxury contractors, disaster
              restoration services, financial professionals — clients who need a digital presence
              that actually performs, not just looks good in a pitch deck.
            </p>
            <p>
              We're proud of what we've built for Houston. And we're not finished.
            </p>
          </div>
        </div>
      </section>

      {/* VALUES */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
              // How we work
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95]">
              What we believe.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
            {VALUES.map((v) => (
              <Reveal key={v.n}>
                <div className="bg-background p-8 group hover:bg-card/60 transition-colors h-full">
                  <div className="font-mono text-[10px] text-primary/60 tracking-[0.3em] mb-4">{v.n}</div>
                  <h3 className="font-serif text-xl md:text-2xl font-medium tracking-tight mb-4 group-hover:text-primary transition-colors">
                    {v.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4">
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary mb-4">
              // What we do
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-6">
              Seven disciplines. One team.
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every service we offer is delivered by in-house specialists — no outsourcing,
              no subcontracting, no surprise handoffs. You get the full Atlas Houston capability
              set from one studio.
            </p>
          </div>
          <div className="lg:col-span-8">
            <div className="border border-border divide-y divide-border">
              {DISCIPLINES.map((d, i) => (
                <Link
                  key={d.label}
                  to={d.href as any}
                  className="flex items-center justify-between px-6 py-5 group hover:bg-card/40 transition-colors"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[10px] text-muted-foreground/40 tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-xl md:text-2xl font-medium tracking-tight group-hover:text-primary transition-colors">
                      {d.label}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground group-hover:text-primary transition-colors">
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-10 md:gap-16 items-start">
          <div className="md:col-span-4">
            <div className="font-mono text-primary text-[10px] tracking-[0.35em] uppercase mb-5">
              // Founder
            </div>
            <div className="aspect-[4/5] w-full border border-border bg-gradient-to-br from-primary/10 via-background to-background flex items-end p-6 relative overflow-hidden">
              <div aria-hidden className="absolute top-0 right-0 w-32 h-32 rounded-full bg-primary/20 blur-[50px]" />
              <div className="relative">
                <div className="font-serif text-3xl md:text-4xl tracking-tight leading-tight">
                  Hunain<br />Qureshi
                </div>
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mt-3">
                  Founder & CEO
                </div>
              </div>
            </div>
          </div>
          <div className="md:col-span-8 flex flex-col justify-center">
            <Reveal>
              <h2 className="font-serif text-3xl md:text-5xl tracking-tight leading-[1.05] mb-6">
                A tech CEO who actually{" "}
                <span className="italic text-primary">writes the code</span>.
              </h2>
              <div className="space-y-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl">
                <p>
                  Atlas Houston is led by{" "}
                  <strong className="text-foreground">Hunain Qureshi</strong>, a Houston-based
                  tech CEO specializing in app development, web development, and SEO. He works
                  directly with every client — no account managers, no offshore handoffs.
                </p>
                <p>
                  Based in the Houston area with active projects across Silicon Valley and clients
                  from coast to coast, Hunain has shipped mobile apps, headless e-commerce sites,
                  and AI-powered platforms for founders who care about speed, search, and the
                  actual outcome.
                </p>
                <p>
                  Reach him directly:{" "}
                  <a
                    href="tel:+12819017016"
                    className="text-primary underline underline-offset-4 hover:text-foreground transition-colors"
                  >
                    (281) 901-7016
                  </a>
                  .
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact"
                  className="cta-lux px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
                >
                  Book the call →
                </Link>
                <a
                  href="tel:+12819017016"
                  className="px-6 py-4 border border-border font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
                >
                  ☎ (281) 901-7016
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Ready to work with a real team?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Every engagement starts with a senior partner conversation — not a sales call.
              A written scope, a fixed fee, and a named team. No surprises.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Start a Conversation →
              </Link>
              <Link
                to="/work"
                className="inline-block px-8 py-4 border border-background/40 text-background font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors"
              >
                View Our Work
              </Link>
            </div>
          </div>
        </div>
      </section>

    </SiteLayout>
  );
}
