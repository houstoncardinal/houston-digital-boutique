import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/templates/")({
  component: TemplatesCatalog,
  head: () => ({
    meta: [
      { title: "Website Templates for Houston Businesses — Atlas Houston" },
      {
        name: "description",
        content:
          "Browse 8 professionally designed website templates built for Houston industries — law firms, construction, spas, fitness, landscaping, medical, real estate, and pool companies. Custom-built from $2,500.",
      },
      { property: "og:title", content: "Website Templates — Atlas Houston" },
      {
        property: "og:description",
        content:
          "Get a professionally designed, custom-built site in your industry. 8 templates built for Houston businesses — launch-ready from $2,500.",
      },
      { property: "og:url", content: "https://atlashouston.com/templates" },
    ],
    links: [{ rel: "canonical", href: "https://atlashouston.com/templates" }],
  }),
});

type BadgeVariant = "popular" | "new" | "premium" | "favorite";

interface Template {
  slug: string;
  name: string;
  category: string;
  bestFor: string[];
  badge: { label: string; variant: BadgeVariant };
  proof: string;
  preview: React.ReactNode;
}

const templates: Template[] = [
  {
    slug: "obsidian",
    name: "Obsidian",
    category: "Luxury & Premium",
    bestFor: ["Real Estate", "Hospitality", "Premium Retail", "High-End Services"],
    badge: { label: "Most Popular", variant: "popular" },
    proof: "11 Houston businesses launched with this",
    preview: (
      <div
        style={{
          background: "#0c0c0c",
          height: "180px",
          position: "relative",
          overflow: "hidden",
          fontFamily: "'Georgia', 'Times New Roman', serif",
        }}
      >
        {/* Gold accent bar top */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #c9a96e, transparent)" }} />
        {/* Nav simulation */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 16px" }}>
          <div style={{ color: "#c9a96e", fontSize: "10px", letterSpacing: "0.2em", fontFamily: "system-ui" }}>MERIDIAN</div>
          <div style={{ display: "flex", gap: "12px" }}>
            {["Properties", "About", "Contact"].map((l) => (
              <div key={l} style={{ color: "#666", fontSize: "7px", letterSpacing: "0.1em", fontFamily: "system-ui" }}>{l}</div>
            ))}
          </div>
        </div>
        {/* Hero text block */}
        <div style={{ padding: "8px 16px" }}>
          <div style={{ color: "#c9a96e", fontSize: "7px", letterSpacing: "0.25em", fontFamily: "system-ui", marginBottom: "6px" }}>LUXURY REAL ESTATE</div>
          <div style={{ color: "#f5f5f0", fontSize: "15px", lineHeight: 1.2, marginBottom: "8px" }}>Exceptional<br />properties.</div>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ background: "#c9a96e", color: "#0c0c0c", fontSize: "6px", padding: "3px 8px", fontFamily: "system-ui", letterSpacing: "0.1em" }}>VIEW PORTFOLIO</div>
            <div style={{ border: "1px solid #444", color: "#f5f5f0", fontSize: "6px", padding: "3px 8px", fontFamily: "system-ui", letterSpacing: "0.1em" }}>SCHEDULE</div>
          </div>
        </div>
        {/* Gold strip decorations */}
        <div style={{ position: "absolute", right: "16px", top: "50px", width: "60px", height: "1px", background: "#c9a96e", opacity: 0.4 }} />
        <div style={{ position: "absolute", right: "16px", top: "60px", width: "40px", height: "1px", background: "#c9a96e", opacity: 0.2 }} />
        {/* Bottom stat row */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #1a1a1a", display: "flex", padding: "8px 16px", gap: "16px" }}>
          {["847 Sold", "$2.4B", "18 Yrs"].map((s) => (
            <div key={s} style={{ color: "#888", fontSize: "7px", letterSpacing: "0.1em", fontFamily: "system-ui" }}>{s}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    slug: "coastal",
    name: "Coastal",
    category: "Pool, Spa & Marine",
    bestFor: ["Pool Companies", "Marinas", "Coastal Real Estate", "Water Sports"],
    badge: { label: "Fan Favorite", variant: "favorite" },
    proof: "9 Houston businesses launched with this",
    preview: (
      <div style={{ background: "#f0f9ff", height: "180px", position: "relative", overflow: "hidden", fontFamily: "system-ui" }}>
        {/* Blue header bar */}
        <div style={{ background: "#0ea5e9", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ color: "#fff", fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em" }}>Azure Pools</div>
          <div style={{ background: "#f97316", color: "#fff", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>FREE QUOTE</div>
        </div>
        {/* Ocean gradient */}
        <div style={{ height: "60px", background: "linear-gradient(180deg, #bae6fd 0%, #e0f2fe 60%, #f0f9ff 100%)", position: "relative" }}>
          {/* Wave line */}
          <svg viewBox="0 0 200 20" style={{ position: "absolute", bottom: 0, width: "100%", height: "14px" }} preserveAspectRatio="none">
            <path d="M0 10 Q25 0 50 10 Q75 20 100 10 Q125 0 150 10 Q175 20 200 10 L200 20 L0 20Z" fill="#f0f9ff" />
          </svg>
        </div>
        {/* Body */}
        <div style={{ padding: "6px 16px" }}>
          <div style={{ fontSize: "13px", fontWeight: 700, color: "#0c1a2e", marginBottom: "4px" }}>Your backyard,<br />reimagined.</div>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ background: "#f97316", color: "#fff", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>GET STARTED</div>
            <div style={{ border: "1px solid #0ea5e9", color: "#0ea5e9", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>OUR WORK</div>
          </div>
        </div>
        {/* Stat strip */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#0c1a2e", display: "flex", padding: "7px 16px", gap: "14px" }}>
          {["500+ Pools", "25 Years", "4.9★"].map((s) => (
            <div key={s} style={{ color: "#7dd3fc", fontSize: "7px", letterSpacing: "0.1em" }}>{s}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    slug: "advocate",
    name: "Advocate",
    category: "Legal & Finance",
    bestFor: ["Law Firms", "Financial Advisors", "Consultants", "CPAs"],
    badge: { label: "Premium", variant: "premium" },
    proof: "14 Houston businesses launched with this",
    preview: (
      <div style={{ background: "#0f172a", height: "180px", position: "relative", overflow: "hidden", fontFamily: "system-ui" }}>
        {/* Gold header bar */}
        <div style={{ background: "#c9a238", height: "3px" }} />
        <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #1e2d45" }}>
          <div style={{ fontFamily: "Georgia, serif", color: "#f5f0e8", fontSize: "10px", letterSpacing: "0.1em" }}>Sterling Law</div>
          <div style={{ color: "#c9a238", fontSize: "6px", border: "1px solid #c9a238", padding: "2px 7px", letterSpacing: "0.1em" }}>FREE CONSULT</div>
        </div>
        <div style={{ padding: "12px 16px" }}>
          <div style={{ color: "#c9a238", fontSize: "7px", letterSpacing: "0.2em", marginBottom: "6px" }}>PROVEN ADVOCACY</div>
          <div style={{ fontFamily: "Georgia, serif", color: "#f5f0e8", fontSize: "13px", lineHeight: 1.3, marginBottom: "8px" }}>Decades of experience.<br />Relentless advocacy.</div>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ background: "#c9a238", color: "#0a1628", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em", fontWeight: 700 }}>SCHEDULE NOW</div>
          </div>
        </div>
        {/* Stats */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #1e2d45", display: "flex", padding: "8px 16px", gap: "12px" }}>
          {["2,400+ Cases", "94% Success", "$340M Won"].map((s) => (
            <div key={s} style={{ color: "#c9a238", fontSize: "6px", letterSpacing: "0.08em", opacity: 0.9 }}>{s}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    slug: "forge",
    name: "Forge",
    category: "Construction & Trades",
    bestFor: ["Contractors", "Builders", "Manufacturers", "HVAC"],
    badge: { label: "Most Popular", variant: "popular" },
    proof: "17 Houston businesses launched with this",
    preview: (
      <div style={{ background: "#111827", height: "180px", position: "relative", overflow: "hidden", fontFamily: "system-ui" }}>
        {/* Amber accent top stripe */}
        <div style={{ background: "#f59e0b", height: "3px" }} />
        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 16px" }}>
          <div style={{ color: "#f9fafb", fontSize: "10px", fontWeight: 800, letterSpacing: "0.05em" }}>IRONCLAD</div>
          <div style={{ background: "#f59e0b", color: "#111827", fontSize: "6px", padding: "3px 8px", fontWeight: 700, letterSpacing: "0.1em" }}>GET ESTIMATE</div>
        </div>
        {/* Hero */}
        <div style={{ padding: "6px 16px 8px" }}>
          <div style={{ color: "#f59e0b", fontSize: "7px", letterSpacing: "0.25em", marginBottom: "5px" }}>HOUSTON CONSTRUCTION</div>
          <div style={{ color: "#f9fafb", fontSize: "16px", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "8px" }}>WE BUILD<br />WHAT LASTS.</div>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ background: "#f59e0b", color: "#111827", fontSize: "6px", padding: "3px 8px", fontWeight: 700, letterSpacing: "0.1em" }}>START PROJECT</div>
            <div style={{ border: "1px solid #374151", color: "#9ca3af", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>OUR WORK</div>
          </div>
        </div>
        {/* Bottom stats strip */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #1f2937", background: "#0d1421", display: "flex", padding: "7px 16px", gap: "12px" }}>
          {["340+ Projects", "12 Years", "50+ Crew"].map((s) => (
            <div key={s} style={{ color: "#6b7280", fontSize: "7px", letterSpacing: "0.1em" }}>{s}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    slug: "bloom",
    name: "Bloom",
    category: "Spa, Wellness & Beauty",
    bestFor: ["Day Spas", "Salons", "Wellness Studios", "Bridal"],
    badge: { label: "New", variant: "new" },
    proof: "6 Houston businesses launched with this",
    preview: (
      <div style={{ background: "#fdf6f0", height: "180px", position: "relative", overflow: "hidden", fontFamily: "system-ui" }}>
        {/* Rose header */}
        <div style={{ padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid #f8e0d8" }}>
          <div style={{ fontFamily: "Georgia, serif", color: "#2d1b12", fontSize: "10px", letterSpacing: "0.15em", fontStyle: "italic" }}>Lumière</div>
          <div style={{ background: "#d4a0a0", color: "#fff", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>BOOK NOW</div>
        </div>
        {/* Gradient banner */}
        <div style={{ height: "44px", background: "linear-gradient(135deg, #fce7e7 0%, #fdf0e8 50%, #fef3e8 100%)", display: "flex", alignItems: "center", padding: "0 16px" }}>
          <div style={{ width: "36px", height: "36px", borderRadius: "50%", background: "linear-gradient(135deg, #d4a0a0, #c084a0)", opacity: 0.5 }} />
          <div style={{ marginLeft: "8px" }}>
            <div style={{ fontFamily: "Georgia, serif", color: "#2d1b12", fontSize: "11px", lineHeight: 1.2 }}>Restore. Renew.<br />Radiate.</div>
          </div>
        </div>
        {/* Services row */}
        <div style={{ display: "flex", gap: "4px", padding: "8px 16px" }}>
          {["Massage", "Facials", "Wellness"].map((s) => (
            <div key={s} style={{ border: "1px solid #f0c8c0", color: "#8b4a4a", fontSize: "6px", padding: "3px 6px", letterSpacing: "0.1em", flex: 1, textAlign: "center" }}>{s}</div>
          ))}
        </div>
        {/* Bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #f0d8d0", display: "flex", padding: "8px 16px", gap: "14px", background: "#fff8f4" }}>
          {["8 Years", "4.97★", "3,200+ Guests"].map((s) => (
            <div key={s} style={{ color: "#a07060", fontSize: "7px", letterSpacing: "0.08em" }}>{s}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    slug: "velocity",
    name: "Velocity",
    category: "Fitness & Sports",
    bestFor: ["Gyms", "Personal Training", "Sports Clubs", "Martial Arts"],
    badge: { label: "Fan Favorite", variant: "favorite" },
    proof: "12 Houston businesses launched with this",
    preview: (
      <div style={{ background: "#050505", height: "180px", position: "relative", overflow: "hidden", fontFamily: "system-ui" }}>
        {/* Electric green accent line */}
        <div style={{ background: "#22c55e", height: "2px" }} />
        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 16px" }}>
          <div style={{ color: "#f0f0f0", fontSize: "10px", fontWeight: 900, letterSpacing: "0.1em" }}>APEX</div>
          <div style={{ background: "#22c55e", color: "#050505", fontSize: "6px", padding: "3px 8px", fontWeight: 900, letterSpacing: "0.1em" }}>JOIN NOW</div>
        </div>
        {/* Hero */}
        <div style={{ padding: "4px 16px 8px" }}>
          <div style={{ color: "#22c55e", fontSize: "7px", fontWeight: 900, letterSpacing: "0.3em", marginBottom: "5px" }}>FITNESS</div>
          <div style={{ color: "#f0f0f0", fontSize: "17px", fontWeight: 900, lineHeight: 1.0, letterSpacing: "-0.01em", textTransform: "uppercase", marginBottom: "4px" }}>BREAK<br />YOUR LIMIT.</div>
          <div style={{ height: "2px", width: "40px", background: "#22c55e", marginBottom: "7px" }} />
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ background: "#22c55e", color: "#050505", fontSize: "6px", padding: "3px 8px", fontWeight: 900, letterSpacing: "0.15em" }}>START TRIAL</div>
          </div>
        </div>
        {/* Stats */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #111", display: "flex", padding: "7px 16px", gap: "12px" }}>
          {["2,400 Members", "45 Classes", "15 Coaches"].map((s) => (
            <div key={s} style={{ color: "#22c55e", fontSize: "7px", letterSpacing: "0.1em", opacity: 0.8 }}>{s}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    slug: "grove",
    name: "Grove",
    category: "Landscaping & Outdoor",
    bestFor: ["Landscapers", "Arborists", "Farm-to-Table", "Garden Centers"],
    badge: { label: "New", variant: "new" },
    proof: "7 Houston businesses launched with this",
    preview: (
      <div style={{ background: "#f5f1eb", height: "180px", position: "relative", overflow: "hidden", fontFamily: "system-ui" }}>
        {/* Forest green header */}
        <div style={{ background: "#3d7a3d", padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontFamily: "Georgia, serif", color: "#f7f3ec", fontSize: "10px", letterSpacing: "0.1em" }}>Canopy</div>
          <div style={{ display: "flex", gap: "10px" }}>
            {["Work", "Services", "Contact"].map((l) => (
              <div key={l} style={{ color: "#a8d5a2", fontSize: "7px", letterSpacing: "0.1em" }}>{l}</div>
            ))}
          </div>
        </div>
        {/* Earth gradient divider */}
        <div style={{ height: "4px", background: "linear-gradient(90deg, #8b5e3c, #3d7a3d, #8b5e3c)" }} />
        {/* Hero */}
        <div style={{ padding: "10px 16px 6px" }}>
          <div style={{ color: "#8b5e3c", fontSize: "7px", letterSpacing: "0.2em", marginBottom: "5px" }}>LANDSCAPE DESIGN</div>
          <div style={{ fontFamily: "Georgia, serif", color: "#1c2e1c", fontSize: "13px", lineHeight: 1.3, marginBottom: "8px" }}>Nature,<br />shaped by craft.</div>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ background: "#3d7a3d", color: "#f7f3ec", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>FREE CONSULT</div>
            <div style={{ border: "1px solid #8b5e3c", color: "#8b5e3c", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>OUR WORK</div>
          </div>
        </div>
        {/* Bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #ddd5c8", display: "flex", padding: "7px 16px", gap: "12px" }}>
          {["15 Years", "1,200+ Properties", "5★ Rated"].map((s) => (
            <div key={s} style={{ color: "#5a7a3a", fontSize: "7px", letterSpacing: "0.08em" }}>{s}</div>
          ))}
        </div>
      </div>
    ),
  },
  {
    slug: "summit",
    name: "Summit",
    category: "Medical & Healthcare",
    bestFor: ["Dental", "Medical Clinics", "Physical Therapy", "Mental Health"],
    badge: { label: "Premium", variant: "premium" },
    proof: "10 Houston businesses launched with this",
    preview: (
      <div style={{ background: "#f8fafc", height: "180px", position: "relative", overflow: "hidden", fontFamily: "system-ui" }}>
        {/* Teal accent top */}
        <div style={{ background: "#0d9488", height: "3px" }} />
        {/* Nav */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 16px", borderBottom: "1px solid #e2e8f0" }}>
          <div style={{ color: "#0f1729", fontSize: "10px", fontWeight: 700, letterSpacing: "0.05em" }}>Summit Medical</div>
          <div style={{ background: "#0d9488", color: "#fff", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>BOOK APPT</div>
        </div>
        {/* Hero */}
        <div style={{ padding: "10px 16px 8px" }}>
          <div style={{ color: "#0d9488", fontSize: "7px", letterSpacing: "0.2em", marginBottom: "5px" }}>ADVANCED CARE</div>
          <div style={{ color: "#0f1729", fontSize: "13px", fontWeight: 600, lineHeight: 1.3, marginBottom: "8px" }}>Advanced care.<br />Personal attention.</div>
          <div style={{ display: "flex", gap: "6px" }}>
            <div style={{ background: "#0d9488", color: "#fff", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>BOOK ONLINE</div>
            <div style={{ border: "1px solid #cbd5e1", color: "#475569", fontSize: "6px", padding: "3px 8px", letterSpacing: "0.1em" }}>LEARN MORE</div>
          </div>
        </div>
        {/* Services row */}
        <div style={{ display: "flex", gap: "4px", padding: "4px 16px" }}>
          {["Primary Care", "Preventive", "Telehealth"].map((s) => (
            <div key={s} style={{ background: "#e6faf8", border: "1px solid #99e6df", color: "#0d9488", fontSize: "6px", padding: "3px 6px", letterSpacing: "0.05em", flex: 1, textAlign: "center" }}>{s}</div>
          ))}
        </div>
        {/* Bottom */}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, borderTop: "1px solid #e2e8f0", display: "flex", padding: "7px 16px", gap: "12px" }}>
          {["12 Providers", "35,000+ Patients", "Same-Day Appts"].map((s) => (
            <div key={s} style={{ color: "#64748b", fontSize: "7px", letterSpacing: "0.06em" }}>{s}</div>
          ))}
        </div>
      </div>
    ),
  },
];

const badgeStyles: Record<BadgeVariant, string> = {
  popular: "bg-primary text-primary-foreground",
  new: "bg-green-600 text-white",
  premium: "border border-border text-muted-foreground",
  favorite: "bg-secondary text-secondary-foreground",
};

function TemplateCard({ t }: { t: Template }) {
  return (
    <article className="border border-border bg-card flex flex-col group hover:border-primary/50 transition-colors duration-500">
      {/* CSS preview thumbnail */}
      <div className="overflow-hidden border-b border-border relative">
        {t.preview}
        {/* Badge overlay */}
        <div className="absolute top-3 right-3">
          <span className={`font-mono text-[9px] uppercase tracking-[0.2em] px-2 py-1 ${badgeStyles[t.badge.variant]}`}>
            {t.badge.label}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        {/* Name + category */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-serif text-2xl font-medium tracking-tight group-hover:text-primary transition-colors duration-500">
            {t.name}
          </h3>
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground border border-border px-2 py-1 shrink-0 mt-0.5">
            {t.category}
          </span>
        </div>

        {/* Best for */}
        <div>
          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-primary mb-2">
            Best for:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {t.bestFor.map((ind) => (
              <span
                key={ind}
                className="font-mono text-[9px] text-muted-foreground bg-background border border-border/60 px-2 py-0.5"
              >
                {ind}
              </span>
            ))}
          </div>
        </div>

        {/* Price + proof */}
        <div className="flex items-center justify-between gap-3 pt-1 border-t border-border">
          <span className="font-mono text-[10px] text-foreground/80 tracking-wide">
            Custom builds from <span className="text-primary font-bold">$2,500</span>
          </span>
        </div>

        {/* Social proof */}
        <p className="font-mono text-[9px] text-muted-foreground tracking-wide">
          ↑ {t.proof}
        </p>

        {/* Actions */}
        <div className="flex gap-3 mt-auto pt-2">
          <Link
            to="/templates/$slug"
            params={{ slug: t.slug }}
            className="flex-1 text-center bg-primary text-primary-foreground font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-3 hover:bg-foreground hover:text-background transition-colors duration-200"
          >
            Preview Live →
          </Link>
          <Link
            to="/contact"
            className="flex-1 text-center border border-border text-foreground font-mono text-[10px] uppercase tracking-[0.2em] px-4 py-3 hover:border-primary hover:text-primary transition-colors duration-200"
          >
            Start This Design
          </Link>
        </div>
      </div>
    </article>
  );
}

function TemplatesCatalog() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-44 pb-24 md:pb-32 border-b border-border overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[44rem] w-[44rem] rounded-full bg-primary/12 blur-[160px] animate-orb"
        />
        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              WEBSITE TEMPLATES — 8 INDUSTRIES
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9rem] font-medium tracking-[-0.025em] leading-[0.9] text-balance mb-12">
            Website Templates —<br />
            <span className="text-gold italic">Built for Houston</span>
            <br />
            Businesses.
          </h1>
          <Reveal delay={400} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Get a professionally designed, custom-built site in your industry. Every template is a
              full design system — hero, services, social proof, and conversion — engineered from
              scratch for the Houston market and launched in your brand's colors from day one.
            </p>
          </Reveal>
          <Reveal delay={600} className="flex flex-wrap gap-4 mt-10">
            <Link
              to="/contact"
              className="cta-lux px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Start My Site →
            </Link>
            <a
              href="#templates"
              className="px-9 py-5 border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
            >
              Browse Templates ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="grid grid-cols-2 md:grid-cols-4 border-b border-border">
        {[
          { k: "8", l: "Industry templates" },
          { k: "$2,500", l: "Starts from" },
          { k: "50+", l: "Houston launches" },
          { k: "14 days", l: "Avg. time to live" },
        ].map((s) => (
          <div
            key={s.l}
            className="p-8 md:p-12 border-b md:border-b-0 md:border-r last:border-r-0 border-border"
          >
            <div className="font-serif text-4xl md:text-6xl text-gold font-medium tracking-tight">
              {s.k}
            </div>
            <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4">
              {s.l}
            </div>
          </div>
        ))}
      </section>

      {/* TEMPLATE GRID */}
      <section id="templates" className="px-6 md:px-12 py-20 md:py-28 border-b border-border scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-12">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Browse the collection
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Eight templates. One standard:<br />
              <span className="text-gold italic">ready to convert.</span>
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
            {templates.map((t) => (
              <Reveal key={t.slug} delay={100}>
                <TemplateCard t={t} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <Reveal className="mb-14">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // The process
            </div>
            <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95]">
              From template to live site in 14 days.
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-px bg-border border border-border">
            {[
              { n: "01", t: "Pick a template", d: "Browse the collection, preview it live, then tell us which one fits your industry and brand." },
              { n: "02", t: "Brand intake", d: "Share your logo, colors, copy, and any photos. We do the rest — no design experience needed." },
              { n: "03", t: "We build it", d: "A senior Atlas engineer builds your site on the template's design system, custom to your brand." },
              { n: "04", t: "Go live", d: "You review, approve, and launch. Ongoing SEO, hosting, and support available from day one." },
            ].map((s) => (
              <div key={s.n} className="p-8 bg-background group hover:bg-card/50 transition-colors">
                <div className="font-serif text-4xl text-gold font-medium mb-4">{s.n}</div>
                <h3 className="font-serif text-xl font-medium tracking-tight mb-3 group-hover:text-primary transition-colors duration-500">
                  {s.t}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOTTOM CTA BAND */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <Reveal className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <div className="max-w-2xl">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-5">
              // Not sure where to start?
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Can't decide? We'll help you pick —<br />
              <span className="text-gold italic">no pressure.</span>
            </h2>
            <p className="text-lg text-muted-foreground mt-5 leading-relaxed max-w-xl">
              Tell us your industry and what you need from a website. A senior Atlas team member will
              reply within one business day with a recommendation and a fixed-fee quote. No sales
              calls, no pitch decks.
            </p>
          </div>
          <div className="flex flex-col gap-4 shrink-0">
            <Link
              to="/contact"
              className="cta-lux inline-block px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Get a Recommendation →
            </Link>
            <p className="font-mono text-[10px] text-muted-foreground text-center tracking-wide">
              Replies within 1 business day.
            </p>
          </div>
        </Reveal>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Your industry.<br />Your brand.<br />Built to rank.
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Every template starts from $2,500 and includes a custom domain, Cloudflare hosting,
              Google Analytics 4, and 30 days of post-launch support. No platform tax. You own
              the code.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cta-lux inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Start My Template →
              </Link>
              <Link
                to="/services/websites"
                className="inline-block px-8 py-4 border border-background/40 text-background font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-background hover:text-foreground transition-colors"
              >
                Custom Builds →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
