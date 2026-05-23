import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import heroTexture from "@/assets/hero-texture.jpg";
import workBayou from "@/assets/work-bayou.jpg";
import workSummit from "@/assets/work-summit.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Forgeyard Houston — Steel-grade web & mobile apps for Texas business" },
      {
        name: "description",
        content:
          "Houston design and engineering studio building, hosting, and supporting websites and mobile apps for small and mid-sized business owners across Texas.",
      },
      { property: "og:title", content: "Forgeyard Houston — Steel-grade web & mobile apps" },
      {
        property: "og:description",
        content:
          "Design, development, hosting, and 24/7 support for Houston business owners. Full lifecycle, no handoffs.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});

const services = [
  { n: "01 // Concept", t: "Product Design", d: "Precision-engineered UX for heavy-duty business operations and customer-facing experiences." },
  { n: "02 // Construct", t: "Development", d: "iOS, Android, and web architecture engineered to scale from Post Oak to the rest of the world." },
  { n: "03 // Launch", t: "Cloud Hosting", d: "Hardened, high-availability infrastructure with monitoring, backups, and zero-downtime deploys." },
  { n: "04 // Maintain", t: "LTS Support", d: "Dedicated retainers and on-call response for businesses that cannot afford to go offline." },
];

const stats = [
  { k: "47", l: "Houston clients shipped" },
  { k: "99.99%", l: "Hosting uptime, last 24 months" },
  { k: "$18M+", l: "Revenue routed through our builds" },
  { k: "12yr", l: "Avg. engineer experience" },
];

function Index() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative px-6 md:px-10 pt-24 md:pt-32 pb-20 md:pb-24 border-b border-border overflow-hidden">
        <img
          src={heroTexture}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-25 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/70 to-background pointer-events-none" />
        <div className="relative max-w-6xl">
          <div className="font-mono text-primary text-xs mb-6 animate-reveal">
            HOUSTON, TX // EST. 2018 // LAT 29.7604°N
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter leading-[0.85] text-balance mb-10 animate-reveal [animation-delay:120ms]">
            WE BUILD <br />
            STEEL-GRADE <br />
            <span className="text-primary">APPLICATIONS.</span>
          </h1>
          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed animate-reveal [animation-delay:240ms]">
            Design, development, hosting, and support for Houston business owners. We handle the
            full lifecycle of your website or mobile app — from blueprint to long-term operations —
            so you can run the business, not the build.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 animate-reveal [animation-delay:360ms]">
            <Link
              to="/contact"
              className="px-7 py-4 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
            >
              Start a Project
            </Link>
            <Link
              to="/work"
              className="px-7 py-4 border border-border text-foreground font-mono text-xs font-bold uppercase tracking-widest hover:border-primary hover:text-primary transition-colors"
            >
              See the Field
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <section className="border-b border-border overflow-hidden py-6 bg-card">
        <div className="flex animate-marquee whitespace-nowrap font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 gap-12 pr-12">
              {[
                "iOS + Android Engineering",
                "★",
                "React & Next.js",
                "★",
                "Managed Cloud Hosting",
                "★",
                "24/7 Support Retainers",
                "★",
                "SOC2-Ready Stacks",
                "★",
                "Stripe & Square Integrations",
                "★",
                "HIPAA-aware Builds",
                "★",
                "Houston-based Team",
                "★",
              ].map((t) => (
                <span key={`${i}-${t}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="grid md:grid-cols-4 border-b border-border" id="services">
        {services.map((s) => (
          <div
            key={s.n}
            className="p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-border flex flex-col justify-between min-h-72 md:h-80 group hover:bg-card transition-colors"
          >
            <div className="font-mono text-[10px] text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">
              {s.n}
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight">{s.t}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Stats */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {stats.map((s) => (
          <div key={s.l} className="p-8 md:p-10 border-b md:border-b-0 md:border-r last:border-r-0 border-border">
            <div className="font-extrabold tracking-tighter text-4xl md:text-6xl text-foreground">
              {s.k}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-3">
              {s.l}
            </div>
          </div>
        ))}
      </section>

      {/* Portfolio teaser */}
      <section className="p-6 md:p-10 border-b border-border">
        <div className="flex justify-between items-end mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter">
            PROVEN IN THE FIELD
          </h2>
          <Link to="/work" className="font-mono text-xs text-muted-foreground hover:text-primary">
            VIEW ALL PROJECTS →
          </Link>
        </div>
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {[
            { img: workBayou, t: "Bayou Logistics Dashboard", y: "2024", tag: "Web + iOS" },
            { img: workSummit, t: "Summit Energy IoT App", y: "2023", tag: "iOS + Android" },
          ].map((p) => (
            <article key={p.t} className="group cursor-pointer">
              <div className="w-full aspect-[4/3] border border-border overflow-hidden mb-5">
                <img
                  src={p.img}
                  alt={p.t}
                  width={1280}
                  height={960}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold">{p.t}</h3>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mt-1">
                    {p.tag}
                  </p>
                </div>
                <span className="font-mono text-xs px-2 py-1 border border-border">{p.y}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Houston */}
      <section id="houston" className="px-6 md:px-10 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 font-mono text-[10px] text-muted-foreground uppercase tracking-widest">
            // Houston Operating Notes
          </div>
          <div className="md:col-span-8 space-y-8">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter leading-tight">
              We work the way Houston works — early shifts, plain talk, and accountability when the
              power flickers.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
              From the Heights to Sugar Land, Pearland to the Energy Corridor — we build digital
              infrastructure for HVAC operators, law firms, energy services, clinics, restaurants,
              and retailers across Greater Houston. No offshore handoffs. No agency theater. One
              senior team, accountable for the whole stack.
            </p>
            <div className="grid sm:grid-cols-3 gap-6 pt-4">
              {[
                { k: "Local", v: "Studio in EaDo, on-site visits across the metro." },
                { k: "Senior", v: "Every build led by 10+ year engineers and designers." },
                { k: "Standing by", v: "Same-day response for retainer clients, 24/7." },
              ].map((b) => (
                <div key={b.k} className="border-t border-border pt-4">
                  <div className="font-mono text-[10px] text-primary uppercase tracking-widest">
                    {b.k}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 leading-relaxed">{b.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="px-6 md:px-10 py-24 md:py-32 border-b border-border">
        <div className="max-w-5xl">
          <div className="font-mono text-[10px] text-primary uppercase tracking-widest mb-8">
            // Field Report 014
          </div>
          <blockquote className="text-2xl md:text-4xl font-bold tracking-tight leading-snug text-balance">
            “They rebuilt our scheduling app in eleven weeks and have hosted it without a single
            outage since. It runs the entire field operation — fifty trucks, two hundred jobs a
            day. Best vendor decision we've made in twenty years.”
          </blockquote>
          <div className="mt-10 font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            — Owner, HVAC Services Co. // Northwest Houston
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 md:px-10 py-24 md:py-32 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter max-w-2xl leading-[0.9]">
            READY TO <br />
            COMMENCE?
          </h2>
          <div className="flex flex-col gap-8 max-w-md">
            <p className="text-lg md:text-xl font-medium">
              We take on a small number of new builds each quarter so every project gets senior
              attention from day one. Tell us what you're building.
            </p>
            <div>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-background text-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
              >
                Start a Project →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
