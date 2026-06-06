import React from "react";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

// ---------------------------------------------------------------------------
// Route definition
// ---------------------------------------------------------------------------

export const Route = createFileRoute("/templates/$slug")({
  loader: ({ params }) => {
    const found = TEMPLATES.find((t) => t.slug === params.slug);
    if (!found) throw notFound();
    return found;
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.metaTitle} — Atlas Houston Template Preview`
          : "Template Preview — Atlas Houston",
      },
      {
        name: "description",
        content: loaderData?.metaDesc ?? "Preview a professionally designed website template from Atlas Houston.",
      },
      { property: "og:title", content: loaderData ? `${loaderData.metaTitle} — Atlas Houston` : "Template Preview" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: TemplatePreviewPage,
});

// ---------------------------------------------------------------------------
// Template registry
// ---------------------------------------------------------------------------

interface TemplateConfig {
  slug: string;
  name: string;
  tagline: string;
  metaTitle: string;
  metaDesc: string;
  component: React.FC;
}

const TEMPLATE_SLUGS = [
  "obsidian",
  "coastal",
  "advocate",
  "forge",
  "bloom",
  "velocity",
  "grove",
  "summit",
] as const;

type TemplateSlug = (typeof TEMPLATE_SLUGS)[number];

// ---------------------------------------------------------------------------
// Preview bar
// ---------------------------------------------------------------------------

function PreviewBar({ name, tagline }: { name: string; tagline: string }) {
  const barStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    height: "48px",
    background: "rgba(0,0,0,0.92)",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    zIndex: 9999,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0 16px",
    borderBottom: "1px solid rgba(255,255,255,0.08)",
    gap: "12px",
  };

  const monoSm: React.CSSProperties = {
    fontFamily: "'IBM Plex Mono', 'Courier New', monospace",
    fontSize: "10px",
    letterSpacing: "0.08em",
    lineHeight: 1,
  };

  return (
    <div style={barStyle}>
      {/* Left */}
      <Link
        to="/templates"
        style={{
          ...monoSm,
          color: "rgba(255,255,255,0.6)",
          textDecoration: "none",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        ← All Templates
      </Link>

      {/* Center */}
      <div style={{ textAlign: "center", overflow: "hidden", flexShrink: 1, minWidth: 0 }}>
        <div style={{ ...monoSm, color: "rgba(255,255,255,0.4)", fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
          You're previewing
        </div>
        <div style={{ ...monoSm, color: "#fff", fontWeight: 700, fontSize: "11px", letterSpacing: "0.12em", textTransform: "uppercase", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {name}
          <span style={{ color: "rgba(255,255,255,0.35)", fontWeight: 400, marginLeft: "6px" }}>{tagline}</span>
        </div>
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px", flexShrink: 0 }}>
        <span style={{ ...monoSm, color: "rgba(255,255,255,0.4)", fontSize: "9px", whiteSpace: "nowrap" }}>
          From $2,500
        </span>
        <Link
          to="/contact"
          style={{
            ...monoSm,
            background: "#c9a96e",
            color: "#080808",
            fontWeight: 700,
            fontSize: "9px",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            padding: "6px 12px",
            textDecoration: "none",
            whiteSpace: "nowrap",
          }}
        >
          Build My Site →
        </Link>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// OBSIDIAN — Meridian Properties (Luxury Real Estate)
// ---------------------------------------------------------------------------

function ObsidianTemplate() {
  const bg = "#080808";
  const text = "#f5f5f0";
  const gold = "#c9a96e";
  const muted = "#888";
  const border = "#1c1c1c";
  const serif: React.CSSProperties = { fontFamily: "'Georgia', 'Times New Roman', serif" };
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Arial, system-ui, sans-serif" };

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", ...sans }}>
      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 48px", borderBottom: `1px solid ${border}`, position: "sticky", top: "48px", background: "rgba(8,8,8,0.96)", backdropFilter: "blur(16px)", zIndex: 100 }}>
        <div style={{ ...serif, fontSize: "18px", letterSpacing: "0.25em", color: gold }}>MERIDIAN</div>
        <div style={{ display: "flex", gap: "40px" }}>
          {["Properties", "Portfolio", "About", "Contact"].map((l) => (
            <a key={l} href="#" style={{ color: muted, fontSize: "12px", letterSpacing: "0.15em", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = gold; }}
              onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = muted; }}>
              {l}
            </a>
          ))}
        </div>
        <a href="#" style={{ border: `1px solid ${gold}`, color: gold, fontSize: "11px", letterSpacing: "0.2em", padding: "10px 24px", textDecoration: "none" }}>
          SCHEDULE VIEWING
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: `linear-gradient(90deg, transparent, ${gold}, transparent)` }} />
        <div style={{ position: "absolute", right: "48px", top: "80px", width: "1px", height: "40%", background: `linear-gradient(180deg, ${gold}44, transparent)` }} />
        <div style={{ maxWidth: "900px" }}>
          <div style={{ color: gold, fontSize: "11px", letterSpacing: "0.4em", marginBottom: "32px", ...sans }}>
            HOUSTON LUXURY REAL ESTATE
          </div>
          <h1 style={{ ...serif, fontSize: "clamp(52px, 7vw, 96px)", lineHeight: 1.05, fontWeight: 400, letterSpacing: "-0.01em", marginBottom: "32px", color: text }}>
            Exceptional properties<br />for exceptional lives.
          </h1>
          <p style={{ fontSize: "17px", color: muted, lineHeight: 1.75, maxWidth: "560px", marginBottom: "48px" }}>
            Meridian Properties represents Houston's most distinguished residential and commercial real
            estate — with 18 years of curated transactions across Memorial, River Oaks, and the
            Museum District.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#" style={{ background: gold, color: "#080808", fontSize: "11px", letterSpacing: "0.2em", padding: "16px 36px", fontWeight: 700, textDecoration: "none" }}>
              SCHEDULE VIEWING
            </a>
            <a href="#" style={{ border: `1px solid ${border}`, color: text, fontSize: "11px", letterSpacing: "0.2em", padding: "16px 36px", textDecoration: "none" }}>
              VIEW PORTFOLIO
            </a>
          </div>
        </div>
        <div style={{ position: "absolute", bottom: "48px", left: "48px", color: muted, fontSize: "11px", letterSpacing: "0.2em" }}>
          SCROLL ↓
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "80px 48px", borderTop: `1px solid ${border}` }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "56px", flexWrap: "wrap", gap: "24px" }}>
          <div>
            <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "16px" }}>OUR PRACTICE</div>
            <h2 style={{ ...serif, fontSize: "clamp(32px, 4vw, 52px)", fontWeight: 400, color: text }}>A complete real estate service.</h2>
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1px", background: border }}>
          {[
            { t: "Residential Sales", d: "From Tanglewood bungalows to River Oaks estates — representing buyers and sellers in Houston's most distinguished neighborhoods." },
            { t: "Commercial Portfolio", d: "Office, retail, and mixed-use acquisitions with institutional-grade due diligence and a 28-year market relationship database." },
            { t: "Luxury Rentals", d: "Curated short and long-term leases for executive relocations, corporate housing, and discerning individuals seeking premium Houston addresses." },
          ].map((s) => (
            <div key={s.t} style={{ background: bg, padding: "40px 36px" }}>
              <div style={{ width: "32px", height: "1px", background: gold, marginBottom: "24px" }} />
              <h3 style={{ ...serif, fontSize: "22px", fontWeight: 400, marginBottom: "16px", color: text }}>{s.t}</h3>
              <p style={{ color: muted, fontSize: "14px", lineHeight: 1.75 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ borderTop: `1px solid ${border}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { k: "847", l: "Properties Sold" },
          { k: "$2.4B", l: "Total Sales Volume" },
          { k: "18", l: "Years in Houston" },
          { k: "100%", l: "Client Satisfaction" },
        ].map((s) => (
          <div key={s.l} style={{ padding: "48px 36px", borderRight: `1px solid ${border}`, textAlign: "center" }}>
            <div style={{ ...serif, fontSize: "48px", color: gold, fontWeight: 400, lineHeight: 1 }}>{s.k}</div>
            <div style={{ color: muted, fontSize: "10px", letterSpacing: "0.25em", marginTop: "12px" }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* GALLERY */}
      <section style={{ padding: "80px 48px", borderTop: `1px solid ${border}` }}>
        <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "16px" }}>FEATURED LISTINGS</div>
        <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, marginBottom: "48px", color: text }}>Current portfolio.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "16px" }}>
          {[
            { name: "River Oaks Estate", price: "$4,200,000", type: "6 BR / 7 BA / 8,400 sf", bg: "linear-gradient(135deg, #1a1208 0%, #0c0c0c 100%)" },
            { name: "Memorial Tower Penthouse", price: "$2,850,000", type: "4 BR / 4 BA / 5,100 sf", bg: "linear-gradient(135deg, #0c1208 0%, #080808 100%)" },
            { name: "West University Colonial", price: "$1,750,000", type: "5 BR / 5 BA / 4,200 sf", bg: "linear-gradient(135deg, #12100c 0%, #0a0808 100%)" },
            { name: "Tanglewood Contemporary", price: "$3,100,000", type: "5 BR / 6 BA / 6,800 sf", bg: "linear-gradient(135deg, #0c0c14 0%, #08080c 100%)" },
          ].map((p) => (
            <div key={p.name} style={{ background: p.bg, border: `1px solid ${border}`, overflow: "hidden" }}>
              <div style={{ height: "180px", background: p.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "48px", height: "48px", border: `1px solid ${gold}44`, transform: "rotate(45deg)" }} />
              </div>
              <div style={{ padding: "20px 24px", borderTop: `1px solid ${border}` }}>
                <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.2em", marginBottom: "6px" }}>{p.type}</div>
                <div style={{ ...serif, fontSize: "16px", color: text, marginBottom: "8px" }}>{p.name}</div>
                <div style={{ color: text, fontSize: "20px", fontWeight: 300 }}>{p.price}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 48px", borderTop: `1px solid ${border}`, background: "#040404" }}>
        <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "48px" }}>CLIENT VOICES</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }}>
          {[
            { q: "Meridian handled our River Oaks estate sale with a level of discretion and market knowledge I've never experienced elsewhere. The result exceeded our expectations by $400,000.", a: "— James & Catherine W., River Oaks" },
            { q: "We've acquired four commercial properties through Meridian over 12 years. Their network and due diligence process is simply unmatched in the Houston market.", a: "— Marcus T., Commercial Investor" },
          ].map((t) => (
            <div key={t.a} style={{ borderLeft: `2px solid ${gold}`, paddingLeft: "32px" }}>
              <p style={{ ...serif, fontSize: "17px", color: text, lineHeight: 1.8, fontStyle: "italic", marginBottom: "16px" }}>"{t.q}"</p>
              <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.2em" }}>{t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: "80px 48px", borderTop: `1px solid ${border}`, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
        <div>
          <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400, color: text, marginBottom: "16px" }}>
            Ready to find your next acquisition?
          </h2>
          <p style={{ color: muted, fontSize: "15px", maxWidth: "500px" }}>
            Private consultations available Monday through Saturday. All inquiries handled with complete discretion.
          </p>
        </div>
        <a href="#" style={{ background: gold, color: "#080808", fontSize: "11px", letterSpacing: "0.2em", padding: "18px 40px", fontWeight: 700, textDecoration: "none", whiteSpace: "nowrap" }}>
          REQUEST CONSULTATION
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: `1px solid ${border}`, padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px" }}>
        <div style={{ ...serif, color: gold, fontSize: "16px", letterSpacing: "0.25em" }}>MERIDIAN PROPERTIES</div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Privacy", "Terms", "Accessibility"].map((l) => (
            <a key={l} href="#" style={{ color: muted, fontSize: "10px", letterSpacing: "0.15em", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div style={{ color: muted, fontSize: "11px" }}>© 2025 Meridian Properties · Houston, TX</div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// COASTAL — Azure Pools & Spas
// ---------------------------------------------------------------------------

function CoastalTemplate() {
  const bg = "#ffffff";
  const dark = "#0c1a2e";
  const blue = "#0ea5e9";
  const coral = "#f97316";
  const muted = "#64748b";
  const lightBg = "#f0f9ff";
  const border = "#e2e8f0";
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Arial, system-ui, sans-serif" };

  return (
    <div style={{ background: bg, color: dark, minHeight: "100vh", ...sans }}>
      {/* NAV */}
      <nav style={{ background: blue, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 48px", position: "sticky", top: "48px", zIndex: 100 }}>
        <div style={{ color: "#fff", fontSize: "20px", fontWeight: 800, letterSpacing: "-0.02em" }}>Azure Pools &amp; Spas</div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Services", "Projects", "Reviews", "Contact"].map((l) => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.85)", fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <a href="#" style={{ background: coral, color: "#fff", fontSize: "12px", fontWeight: 700, padding: "10px 24px", textDecoration: "none", borderRadius: "2px" }}>
          FREE QUOTE
        </a>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", overflow: "hidden" }}>
        <div style={{ height: "88vh", background: `linear-gradient(180deg, ${lightBg} 0%, #bae6fd 40%, ${blue}33 100%)`, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 48px", position: "relative" }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(14,165,233,0.15) 0%, transparent 60%)" }} />
          {/* Wave decoration */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "80px", overflow: "hidden" }}>
            <svg viewBox="0 0 1200 80" style={{ width: "100%", height: "80px" }} preserveAspectRatio="none">
              <path d="M0 40 Q150 10 300 40 Q450 70 600 40 Q750 10 900 40 Q1050 70 1200 40 L1200 80 L0 80Z" fill="white" />
            </svg>
          </div>
          <div style={{ position: "relative", maxWidth: "700px" }}>
            <div style={{ color: blue, fontSize: "12px", fontWeight: 700, letterSpacing: "0.25em", marginBottom: "24px" }}>
              HOUSTON'S PREMIER POOL BUILDER
            </div>
            <h1 style={{ fontSize: "clamp(44px, 6vw, 80px)", fontWeight: 800, lineHeight: 1.05, letterSpacing: "-0.03em", marginBottom: "24px", color: dark }}>
              Your backyard,<br />reimagined.
            </h1>
            <p style={{ fontSize: "18px", color: muted, lineHeight: 1.7, maxWidth: "500px", marginBottom: "40px" }}>
              Serving the Greater Houston area since 1998. Custom pool design, expert installation,
              and guaranteed craftsmanship that lasts a lifetime.
            </p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <a href="#" style={{ background: coral, color: "#fff", fontSize: "13px", fontWeight: 700, padding: "16px 36px", textDecoration: "none", borderRadius: "2px" }}>
                GET FREE QUOTE
              </a>
              <a href="#" style={{ border: `2px solid ${blue}`, color: blue, fontSize: "13px", fontWeight: 700, padding: "16px 36px", textDecoration: "none", borderRadius: "2px" }}>
                SEE OUR WORK
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "80px 48px", background: bg }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ color: blue, fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", marginBottom: "12px" }}>WHAT WE DO</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 800, letterSpacing: "-0.02em", color: dark }}>Everything your pool needs.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px" }}>
          {[
            { icon: "◆", t: "Custom Pool Design", d: "Award-winning design team creates your dream pool with 3D renderings before the first shovel hits the ground." },
            { icon: "◈", t: "Spa & Hot Tubs", d: "Integrated spa experiences with hydrotherapy jets, mood lighting, and smart temperature control." },
            { icon: "◎", t: "Pool Renovation", d: "Transforming dated pools into stunning resort-style retreats — resurfacing, remodeling, and equipment upgrades." },
            { icon: "◉", t: "Maintenance Plans", d: "Year-round care from certified technicians. Weekly service, chemistry balancing, and equipment monitoring." },
          ].map((s) => (
            <div key={s.t} style={{ background: lightBg, border: `1px solid ${border}`, padding: "32px 28px" }}>
              <div style={{ color: blue, fontSize: "24px", marginBottom: "16px" }}>{s.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "12px", color: dark }}>{s.t}</h3>
              <p style={{ color: muted, fontSize: "14px", lineHeight: 1.7 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: dark, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { k: "500+", l: "Pools Built" },
          { k: "25 Yrs", l: "In Business" },
          { k: "4.9★", l: "Google Rating" },
          { k: "Lifetime", l: "Workmanship Warranty" },
        ].map((s) => (
          <div key={s.l} style={{ padding: "48px 32px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ fontSize: "42px", fontWeight: 800, color: coral, lineHeight: 1, marginBottom: "8px" }}>{s.k}</div>
            <div style={{ color: "rgba(255,255,255,0.6)", fontSize: "11px", letterSpacing: "0.15em" }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* GALLERY */}
      <section style={{ padding: "80px 48px", background: lightBg }}>
        <div style={{ marginBottom: "48px" }}>
          <div style={{ color: blue, fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", marginBottom: "12px" }}>RECENT PROJECTS</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 800, letterSpacing: "-0.02em", color: dark }}>See the transformation.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            { name: "The Martinez Residence", type: "Resort Pool + Spa", bg: "linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)" },
            { name: "Shadow Creek Estate", type: "Infinity Pool", bg: "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)" },
            { name: "The Johnson Family", type: "Family Pool + Waterslide", bg: "linear-gradient(135deg, #38bdf8 0%, #0ea5e9 100%)" },
            { name: "Katy Oaks HOA", type: "Community Pool Complex", bg: "linear-gradient(135deg, #0369a1 0%, #1e3a5f 100%)" },
          ].map((p) => (
            <div key={p.name} style={{ background: p.bg, overflow: "hidden" }}>
              <div style={{ height: "200px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "8px" }}>🏊</div>
                  <div style={{ color: "rgba(255,255,255,0.9)", fontSize: "13px", fontWeight: 600 }}>{p.type}</div>
                </div>
              </div>
              <div style={{ padding: "16px 20px", background: "rgba(0,0,0,0.2)" }}>
                <div style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>{p.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "80px 48px", background: bg }}>
        <div style={{ color: blue, fontSize: "11px", fontWeight: 700, letterSpacing: "0.25em", marginBottom: "48px" }}>HAPPY HOMEOWNERS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {[
            { q: "Azure built our dream pool in Sugar Land last spring. The process was seamless from design to final inspection, and our pool looks even better than the 3D rendering they showed us.", a: "— The Rodriguez Family, Sugar Land" },
            { q: "We've had our Azure pool for 6 years and the maintenance team has been phenomenal. Always on time, always thorough. We tell every neighbor who to call.", a: "— David & Lisa K., Pearland" },
          ].map((t) => (
            <div key={t.a} style={{ background: lightBg, border: `1px solid ${border}`, padding: "36px 32px" }}>
              <div style={{ color: coral, fontSize: "36px", lineHeight: 1, marginBottom: "16px" }}>"</div>
              <p style={{ fontSize: "15px", color: dark, lineHeight: 1.75, marginBottom: "20px" }}>{t.q}</p>
              <div style={{ color: blue, fontSize: "12px", fontWeight: 600 }}>{t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: blue, padding: "80px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
        <div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", marginBottom: "12px" }}>
            Get your free pool design consultation.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
            No obligation. Meet our design team and see 3D concepts for your backyard.
          </p>
        </div>
        <a href="#" style={{ background: coral, color: "#fff", fontSize: "13px", fontWeight: 700, padding: "18px 40px", textDecoration: "none", whiteSpace: "nowrap", borderRadius: "2px" }}>
          BOOK FREE CONSULT
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: dark, color: "rgba(255,255,255,0.5)", padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", fontSize: "13px" }}>
        <div style={{ color: "#fff", fontWeight: 800, fontSize: "16px" }}>Azure Pools &amp; Spas</div>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Services", "About", "Reviews", "Privacy"].map((l) => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div>© 2025 Azure Pools &amp; Spas · Houston, TX · Licensed &amp; Insured</div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// ADVOCATE — Sterling Law Group
// ---------------------------------------------------------------------------

function AdvocateTemplate() {
  const bg = "#0a1628";
  const text = "#f5f0e8";
  const gold = "#c9a238";
  const muted = "#8899aa";
  const border = "#1e2d45";
  const serif: React.CSSProperties = { fontFamily: "'Georgia', 'Times New Roman', serif" };
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Arial, system-ui, sans-serif" };

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", ...sans }}>
      {/* Gold top bar */}
      <div style={{ background: gold, height: "4px" }} />

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: `1px solid ${border}`, position: "sticky", top: "48px", background: "rgba(10,22,40,0.97)", backdropFilter: "blur(16px)", zIndex: 100 }}>
        <div style={{ ...serif, fontSize: "18px", letterSpacing: "0.12em", color: text }}>
          Sterling Law Group
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          {["Practice Areas", "Attorneys", "Results", "Contact"].map((l) => (
            <a key={l} href="#" style={{ color: muted, fontSize: "12px", letterSpacing: "0.08em", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <a href="#" style={{ border: `1px solid ${gold}`, color: gold, fontSize: "11px", letterSpacing: "0.18em", padding: "10px 24px", textDecoration: "none" }}>
          FREE CONSULTATION
        </a>
      </nav>

      {/* CREDENTIALS STRIP */}
      <div style={{ background: `${gold}18`, borderBottom: `1px solid ${border}`, padding: "10px 48px", display: "flex", gap: "40px", overflowX: "auto" }}>
        {["Board Certified — Texas Board of Legal Specialization", "Rated AV Preeminent® by Martindale-Hubbell", "Best Lawyers in Houston 2024", "Texas Super Lawyers 2019–2025"].map((c) => (
          <div key={c} style={{ color: gold, fontSize: "10px", letterSpacing: "0.15em", whiteSpace: "nowrap" }}>{c}</div>
        ))}
      </div>

      {/* HERO */}
      <section style={{ padding: "100px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "40%", background: `linear-gradient(135deg, ${border} 0%, ${bg} 100%)`, opacity: 0.4 }} />
        <div style={{ position: "relative", maxWidth: "780px" }}>
          <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.4em", marginBottom: "28px" }}>
            HOUSTON LITIGATION &amp; ADVISORY
          </div>
          <h1 style={{ ...serif, fontSize: "clamp(40px, 5.5vw, 72px)", fontWeight: 400, lineHeight: 1.08, marginBottom: "28px", color: text }}>
            Decades of experience.<br />Relentless advocacy.
          </h1>
          <p style={{ fontSize: "17px", color: muted, lineHeight: 1.8, maxWidth: "600px", marginBottom: "40px" }}>
            Sterling Law Group has represented thousands of Houston clients across personal injury,
            criminal defense, family law, and corporate matters — with a track record of
            $340 million recovered and a 94% success rate over 28 years.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#" style={{ background: gold, color: "#0a1628", fontSize: "11px", letterSpacing: "0.2em", padding: "16px 36px", fontWeight: 700, textDecoration: "none" }}>
              FREE CONSULTATION
            </a>
            <a href="#" style={{ border: `1px solid ${border}`, color: muted, fontSize: "11px", letterSpacing: "0.15em", padding: "16px 36px", textDecoration: "none" }}>
              CASE RESULTS
            </a>
          </div>
        </div>
      </section>

      {/* PRACTICE AREAS */}
      <section style={{ padding: "72px 48px", borderTop: `1px solid ${border}` }}>
        <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "16px" }}>PRACTICE AREAS</div>
        <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 400, marginBottom: "48px", color: text }}>Comprehensive legal representation.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: border }}>
          {[
            { n: "01", t: "Personal Injury", d: "Auto accidents, workplace injuries, premises liability, and catastrophic injury — fighting for maximum compensation for Houston victims and families." },
            { n: "02", t: "Criminal Defense", d: "Felony and misdemeanor defense across Harris, Fort Bend, and Montgomery counties. Former prosecutor advantage protecting your rights and freedom." },
            { n: "03", t: "Family Law", d: "Divorce, child custody, property division, and restraining orders handled with skill and sensitivity. Protecting Houston families through difficult transitions." },
            { n: "04", t: "Corporate Law", d: "Business formation, contracts, M&A, employment disputes, and commercial litigation for Houston entrepreneurs, startups, and established enterprises." },
          ].map((s) => (
            <div key={s.t} style={{ background: bg, padding: "40px 36px" }}>
              <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.3em", marginBottom: "16px" }}>{s.n}</div>
              <h3 style={{ ...serif, fontSize: "22px", fontWeight: 400, marginBottom: "14px", color: text }}>{s.t}</h3>
              <p style={{ color: muted, fontSize: "14px", lineHeight: 1.75 }}>{s.d}</p>
              <div style={{ marginTop: "20px", color: gold, fontSize: "11px", letterSpacing: "0.15em" }}>Learn more →</div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: `${gold}12`, borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { k: "2,400+", l: "Cases Handled" },
          { k: "94%", l: "Success Rate" },
          { k: "28 Yrs", l: "Serving Houston" },
          { k: "$340M", l: "Recovered" },
        ].map((s) => (
          <div key={s.l} style={{ padding: "48px 32px", textAlign: "center", borderRight: `1px solid ${border}` }}>
            <div style={{ ...serif, fontSize: "44px", color: gold, fontWeight: 400, lineHeight: 1 }}>{s.k}</div>
            <div style={{ color: muted, fontSize: "10px", letterSpacing: "0.25em", marginTop: "12px" }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "72px 48px", borderTop: `1px solid ${border}` }}>
        <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "48px" }}>CLIENT TESTIMONIALS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "32px" }}>
          {[
            { q: "After my accident on I-45, Sterling Law recovered $2.1 million for my family. They treated us like people, not a case number.", a: "— Rafael M., Houston" },
            { q: "The criminal defense team got my charges dismissed in 6 weeks. Their knowledge of Harris County courts is something you simply cannot buy at a big firm.", a: "— Anonymous Client" },
            { q: "Sterling handled our company's acquisition — a complex $18M deal. Their corporate team found issues our previous counsel missed entirely.", a: "— Priya S., CEO" },
          ].map((t) => (
            <div key={t.a} style={{ borderTop: `2px solid ${gold}`, paddingTop: "24px" }}>
              <p style={{ ...serif, fontSize: "15px", color: text, lineHeight: 1.8, fontStyle: "italic", marginBottom: "16px" }}>"{t.q}"</p>
              <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.15em" }}>{t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: gold, padding: "72px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
        <div>
          <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: "#0a1628", marginBottom: "12px" }}>
            Schedule a free confidential consultation.
          </h2>
          <p style={{ color: "#0a1628cc", fontSize: "15px" }}>
            No fees unless we win. Call now or complete the secure intake form.
          </p>
        </div>
        <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
          <a href="#" style={{ background: "#0a1628", color: text, fontSize: "12px", letterSpacing: "0.2em", padding: "16px 36px", fontWeight: 700, textDecoration: "none" }}>
            FREE CONSULTATION
          </a>
          <a href="#" style={{ border: "2px solid #0a162888", color: "#0a1628", fontSize: "12px", letterSpacing: "0.15em", padding: "16px 36px", textDecoration: "none" }}>
            (281) 555-9900
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "48px", borderTop: `1px solid ${border}`, display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "32px" }}>
        <div>
          <div style={{ ...serif, color: gold, fontSize: "16px", letterSpacing: "0.12em", marginBottom: "16px" }}>Sterling Law Group</div>
          <div style={{ color: muted, fontSize: "12px", lineHeight: 1.75 }}>1000 Main Street, Suite 2400<br />Houston, TX 77002<br />(281) 555-9900</div>
        </div>
        {[
          { t: "Practice", ls: ["Personal Injury", "Criminal Defense", "Family Law", "Corporate"] },
          { t: "Firm", ls: ["Our Attorneys", "Case Results", "About", "Blog"] },
          { t: "Contact", ls: ["Free Consult", "Directions", "Emergency Line"] },
        ].map((col) => (
          <div key={col.t}>
            <div style={{ color: gold, fontSize: "10px", letterSpacing: "0.25em", marginBottom: "16px" }}>{col.t.toUpperCase()}</div>
            {col.ls.map((l) => (
              <div key={l} style={{ color: muted, fontSize: "12px", marginBottom: "8px" }}>{l}</div>
            ))}
          </div>
        ))}
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// FORGE — Ironclad Build Co.
// ---------------------------------------------------------------------------

function ForgeTemplate() {
  const bg = "#111827";
  const text = "#f9fafb";
  const amber = "#f59e0b";
  const muted = "#6b7280";
  const border = "#1f2937";
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Arial, system-ui, sans-serif" };

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", ...sans }}>
      {/* Amber top accent */}
      <div style={{ background: amber, height: "4px" }} />

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 48px", borderBottom: `1px solid ${border}`, position: "sticky", top: "48px", background: "rgba(17,24,39,0.97)", backdropFilter: "blur(16px)", zIndex: 100 }}>
        <div style={{ color: text, fontSize: "20px", fontWeight: 800, letterSpacing: "0.08em" }}>
          <span style={{ color: amber }}>✦</span> IRONCLAD
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          {["Projects", "Services", "About", "Contact"].map((l) => (
            <a key={l} href="#" style={{ color: muted, fontSize: "12px", fontWeight: 600, letterSpacing: "0.08em", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <a href="#" style={{ background: amber, color: "#111827", fontSize: "11px", fontWeight: 800, letterSpacing: "0.15em", padding: "12px 28px", textDecoration: "none" }}>
          GET ESTIMATE
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "90vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: "45%", background: "linear-gradient(135deg, #1f2937 0%, #111827 100%)" }} />
        <div style={{ position: "absolute", top: "20%", right: "10%", width: "180px", height: "180px", border: `2px solid ${amber}22`, transform: "rotate(15deg)" }} />
        <div style={{ position: "absolute", top: "30%", right: "15%", width: "100px", height: "100px", border: `1px solid ${amber}11`, transform: "rotate(30deg)" }} />
        <div style={{ position: "relative", maxWidth: "760px" }}>
          <div style={{ color: amber, fontSize: "11px", fontWeight: 800, letterSpacing: "0.4em", marginBottom: "24px" }}>
            HOUSTON CONSTRUCTION — EST. 2012
          </div>
          <h1 style={{ fontSize: "clamp(56px, 8vw, 108px)", fontWeight: 800, lineHeight: 0.95, letterSpacing: "-0.03em", marginBottom: "28px", textTransform: "uppercase" }}>
            WE BUILD<br /><span style={{ color: amber }}>WHAT</span><br />LASTS.
          </h1>
          <p style={{ fontSize: "17px", color: muted, lineHeight: 1.75, maxWidth: "520px", marginBottom: "44px" }}>
            Houston's most trusted commercial and residential builder — 340 projects
            delivered, on schedule, on budget, built to stand for generations.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#" style={{ background: amber, color: "#111827", fontSize: "12px", fontWeight: 800, letterSpacing: "0.2em", padding: "18px 40px", textDecoration: "none" }}>
              FREE PROJECT ESTIMATE
            </a>
            <a href="#" style={{ border: `2px solid ${border}`, color: muted, fontSize: "12px", fontWeight: 600, letterSpacing: "0.15em", padding: "18px 40px", textDecoration: "none" }}>
              VIEW PROJECTS
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "72px 48px", borderTop: `1px solid ${border}` }}>
        <div style={{ color: amber, fontSize: "11px", fontWeight: 800, letterSpacing: "0.35em", marginBottom: "16px" }}>WHAT WE BUILD</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "48px", color: text }}>
          No project too large. No detail too small.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: border }}>
          {[
            { n: "01", t: "Commercial Construction", d: "Office buildings, retail centers, warehouses, and mixed-use developments. Ground-up commercial builds and tenant improvements across the Houston metro." },
            { n: "02", t: "Residential Builds", d: "Custom homes from Sugar Land to The Woodlands. Full-service design-build with a dedicated project manager from permit to keys." },
            { n: "03", t: "Industrial Projects", d: "Manufacturing facilities, distribution centers, and industrial expansions. Heavy construction expertise with bonded and insured crews." },
            { n: "04", t: "Renovation & Restoration", d: "Complete commercial and residential renovations, historical restoration, and code-compliance upgrades for Houston's existing building stock." },
          ].map((s) => (
            <div key={s.t} style={{ background: bg, padding: "40px 36px", borderBottom: `1px solid ${border}` }}>
              <div style={{ color: amber, fontSize: "10px", fontWeight: 800, letterSpacing: "0.3em", marginBottom: "16px" }}>{s.n}</div>
              <h3 style={{ fontSize: "22px", fontWeight: 800, letterSpacing: "-0.01em", marginBottom: "14px", color: text }}>{s.t}</h3>
              <p style={{ color: muted, fontSize: "14px", lineHeight: 1.75 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#0d1421", borderTop: `1px solid ${border}`, borderBottom: `1px solid ${border}`, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { k: "12", l: "Years in Business" },
          { k: "340+", l: "Projects Delivered" },
          { k: "50+", l: "Crew Members" },
          { k: "#1", l: "Houston Trusted Builder" },
        ].map((s) => (
          <div key={s.l} style={{ padding: "48px 32px", textAlign: "center", borderRight: `1px solid ${border}` }}>
            <div style={{ fontSize: "52px", fontWeight: 800, color: amber, lineHeight: 1, letterSpacing: "-0.02em" }}>{s.k}</div>
            <div style={{ color: muted, fontSize: "10px", letterSpacing: "0.2em", marginTop: "12px", fontWeight: 600 }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* GALLERY */}
      <section style={{ padding: "72px 48px" }}>
        <div style={{ color: amber, fontSize: "11px", fontWeight: 800, letterSpacing: "0.35em", marginBottom: "16px" }}>RECENT PROJECTS</div>
        <h2 style={{ fontSize: "clamp(24px, 3vw, 40px)", fontWeight: 800, letterSpacing: "-0.02em", marginBottom: "40px", color: text }}>Built in Houston.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {[
            { name: "Westchase Office Park", type: "Commercial — 180,000 sf", bg: "linear-gradient(135deg, #1c1404 0%, #111827 100%)" },
            { name: "Heights Custom Home", type: "Residential — 4,800 sf", bg: "linear-gradient(135deg, #1a1204 0%, #0d1421 100%)" },
            { name: "Port of Houston Distribution", type: "Industrial — 420,000 sf", bg: "linear-gradient(135deg, #1f1a04 0%, #111827 100%)" },
            { name: "Midtown Historic Renovation", type: "Renovation — 1920s Landmark", bg: "linear-gradient(135deg, #1a1008 0%, #0d1421 100%)" },
          ].map((p) => (
            <div key={p.name} style={{ background: p.bg, border: `1px solid ${border}`, overflow: "hidden" }}>
              <div style={{ height: "180px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "56px", height: "56px", border: `2px solid ${amber}44` }} />
              </div>
              <div style={{ padding: "16px 20px", borderTop: `1px solid ${border}` }}>
                <div style={{ color: amber, fontSize: "10px", letterSpacing: "0.15em", marginBottom: "6px" }}>{p.type}</div>
                <div style={{ color: text, fontSize: "15px", fontWeight: 700 }}>{p.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "64px 48px", borderTop: `1px solid ${border}`, background: "#0d1421" }}>
        <div style={{ color: amber, fontSize: "11px", fontWeight: 800, letterSpacing: "0.35em", marginBottom: "40px" }}>WHAT CLIENTS SAY</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          {[
            { q: "Ironclad finished our Westchase office park two weeks ahead of schedule and $40,000 under budget. I've been in Houston commercial real estate for 20 years. These are the best builders in the city.", a: "— Tom H., Commercial Developer" },
            { q: "Our Heights custom home came in exactly as designed — not a single punch-list surprise at closing. The project manager was responsive every single week for 14 months.", a: "— Amanda &amp; Will P., River Oaks" },
          ].map((t) => (
            <div key={t.a} style={{ borderLeft: `3px solid ${amber}`, paddingLeft: "28px" }}>
              <p style={{ fontSize: "16px", color: text, lineHeight: 1.75, marginBottom: "16px" }}>"{t.q}"</p>
              <div style={{ color: amber, fontSize: "11px", letterSpacing: "0.12em", fontWeight: 600 }} dangerouslySetInnerHTML={{ __html: t.a }} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: amber, padding: "72px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
        <div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 800, letterSpacing: "-0.02em", color: "#111827", marginBottom: "10px" }}>
            Get a free project estimate.
          </h2>
          <p style={{ color: "#111827aa", fontSize: "16px" }}>
            Senior estimator responds within one business day. Fixed-fee bids on all projects.
          </p>
        </div>
        <a href="#" style={{ background: "#111827", color: text, fontSize: "12px", fontWeight: 800, letterSpacing: "0.2em", padding: "18px 40px", textDecoration: "none", whiteSpace: "nowrap" }}>
          REQUEST ESTIMATE
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#080d14", padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", borderTop: `1px solid ${border}` }}>
        <div style={{ fontSize: "18px", fontWeight: 800, color: amber, letterSpacing: "0.1em" }}>IRONCLAD BUILD CO.</div>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Projects", "Services", "Careers", "Contact"].map((l) => (
            <a key={l} href="#" style={{ color: muted, fontSize: "12px", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div style={{ color: muted, fontSize: "12px" }}>© 2025 Ironclad Build Co. · Houston, TX · Bonded &amp; Insured</div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// BLOOM — Lumière Spa & Wellness
// ---------------------------------------------------------------------------

function BloomTemplate() {
  const bg = "#fdf8f4";
  const text = "#2d1b12";
  const rose = "#d4a0a0";
  const green = "#4a7c59";
  const muted = "#8a6a5a";
  const border = "#f0d8d0";
  const cream = "#fef5ef";
  const serif: React.CSSProperties = { fontFamily: "'Georgia', 'Times New Roman', serif" };
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Arial, system-ui, sans-serif" };

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", ...sans }}>
      {/* Rose top accent */}
      <div style={{ background: `linear-gradient(90deg, ${rose}, #c084a0, ${rose})`, height: "3px" }} />

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 48px", borderBottom: `1px solid ${border}`, position: "sticky", top: "48px", background: "rgba(253,248,244,0.97)", backdropFilter: "blur(16px)", zIndex: 100 }}>
        <div style={{ ...serif, fontSize: "20px", letterSpacing: "0.2em", fontStyle: "italic", color: text }}>
          Lumière
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          {["Treatments", "Packages", "Gift Cards", "Contact"].map((l) => (
            <a key={l} href="#" style={{ color: muted, fontSize: "12px", letterSpacing: "0.08em", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <a href="#" style={{ background: rose, color: "#fff", fontSize: "11px", letterSpacing: "0.18em", padding: "10px 24px", textDecoration: "none" }}>
          BOOK NOW
        </a>
      </nav>

      {/* HERO */}
      <section style={{ padding: "100px 48px", position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${bg} 0%, #fce7e7 50%, ${bg} 100%)` }}>
        <div style={{ position: "absolute", top: "-60px", right: "-60px", width: "400px", height: "400px", borderRadius: "50%", background: `radial-gradient(circle, ${rose}22 0%, transparent 70%)` }} />
        <div style={{ position: "absolute", bottom: "-40px", left: "-40px", width: "300px", height: "300px", borderRadius: "50%", background: `radial-gradient(circle, ${green}11 0%, transparent 70%)` }} />
        <div style={{ position: "relative", maxWidth: "700px", textAlign: "center", margin: "0 auto" }}>
          <div style={{ color: rose, fontSize: "10px", letterSpacing: "0.4em", marginBottom: "24px" }}>
            HOUSTON'S PREMIER SPA &amp; WELLNESS STUDIO
          </div>
          <h1 style={{ ...serif, fontSize: "clamp(48px, 6vw, 80px)", fontWeight: 400, lineHeight: 1.1, marginBottom: "24px", color: text }}>
            Restore. Renew. Radiate.
          </h1>
          <p style={{ fontSize: "17px", color: muted, lineHeight: 1.8, marginBottom: "40px" }}>
            A sanctuary of calm in the heart of Houston. Award-winning therapeutic treatments,
            expert estheticians, and a team dedicated to your complete wellness — mind, body, and spirit.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#" style={{ background: rose, color: "#fff", fontSize: "11px", letterSpacing: "0.2em", padding: "16px 36px", textDecoration: "none" }}>
              BOOK YOUR VISIT
            </a>
            <a href="#" style={{ border: `1px solid ${border}`, color: muted, fontSize: "11px", letterSpacing: "0.15em", padding: "16px 36px", textDecoration: "none" }}>
              VIEW TREATMENTS
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "72px 48px", borderTop: `1px solid ${border}` }}>
        <div style={{ textAlign: "center", marginBottom: "56px" }}>
          <div style={{ color: green, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "12px" }}>OUR TREATMENTS</div>
          <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: text }}>Every experience, curated for you.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            { t: "Therapeutic Massage", d: "Swedish, deep tissue, prenatal, and hot stone — tailored to your needs by licensed therapists with 10+ years of Houston clientele.", price: "From $120", icon: "◈" },
            { t: "Facials & Skincare", d: "Medical-grade facials, custom HydraFacials, and advanced anti-aging treatments using Environ and SkinCeuticals protocols.", price: "From $95", icon: "◆" },
            { t: "Body Treatments", d: "Body wraps, exfoliation rituals, and detox treatments designed to leave you glowing and restored from head to toe.", price: "From $140", icon: "◎" },
            { t: "Wellness Packages", d: "Full-day retreats, couples packages, and bridal party experiences that combine our signature treatments into a seamless sanctuary day.", price: "From $280", icon: "◉" },
          ].map((s) => (
            <div key={s.t} style={{ background: cream, border: `1px solid ${border}`, padding: "36px 32px" }}>
              <div style={{ color: rose, fontSize: "20px", marginBottom: "14px" }}>{s.icon}</div>
              <h3 style={{ ...serif, fontSize: "20px", fontWeight: 400, marginBottom: "10px", color: text }}>{s.t}</h3>
              <p style={{ color: muted, fontSize: "14px", lineHeight: 1.75, marginBottom: "16px" }}>{s.d}</p>
              <div style={{ color: green, fontSize: "11px", fontWeight: 600, letterSpacing: "0.1em" }}>{s.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: green, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { k: "8 Years", l: "Houston Spa" },
          { k: "4.97★", l: "Google Rating" },
          { k: "3,200+", l: "Guests Served" },
          { k: "Award", l: "2024 Best Spa" },
        ].map((s) => (
          <div key={s.l} style={{ padding: "40px 28px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ ...serif, fontSize: "36px", color: "#fff", fontWeight: 400, lineHeight: 1 }}>{s.k}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "10px", letterSpacing: "0.2em", marginTop: "10px" }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* GALLERY */}
      <section style={{ padding: "72px 48px", background: bg }}>
        <div style={{ textAlign: "center", marginBottom: "48px" }}>
          <div style={{ color: rose, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "12px" }}>THE EXPERIENCE</div>
          <h2 style={{ ...serif, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: text }}>Your retreat awaits.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            { name: "The Sanctuary Suite", sub: "Full-day retreat experience", bg: "linear-gradient(135deg, #f9d9d9 0%, #fce7e7 100%)" },
            { name: "Couples Journey", sub: "Shared wellness experience", bg: "linear-gradient(135deg, #fce7e7 0%, #f0d0d0 100%)" },
            { name: "Bridal Package", sub: "Preparation for your perfect day", bg: "linear-gradient(135deg, #ffe4f0 0%, #fce7e7 100%)" },
            { name: "Monthly Membership", sub: "Regular renewal, lasting results", bg: "linear-gradient(135deg, #e8f5e8 0%, #d4eed4 100%)" },
          ].map((p) => (
            <div key={p.name} style={{ background: p.bg, border: `1px solid ${border}`, overflow: "hidden" }}>
              <div style={{ height: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: "rgba(212,160,160,0.4)" }} />
              </div>
              <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.6)", borderTop: `1px solid ${border}` }}>
                <div style={{ ...serif, color: text, fontSize: "16px", marginBottom: "4px" }}>{p.name}</div>
                <div style={{ color: muted, fontSize: "12px" }}>{p.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "72px 48px", borderTop: `1px solid ${border}`, background: cream }}>
        <div style={{ color: rose, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "40px" }}>GUEST EXPERIENCES</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          {[
            { q: "I've been coming to Lumière every month for three years. The hot stone massage alone is worth the drive from Katy. This is genuinely the most peaceful two hours of my week.", a: "— Christine B., Memorial" },
            { q: "Our bridal party spent the whole day here the Friday before my wedding. Every single person in our group left glowing and relaxed. We cannot recommend them highly enough.", a: "— Morgan L., Bride" },
          ].map((t) => (
            <div key={t.a} style={{ background: bg, border: `1px solid ${border}`, padding: "36px 32px" }}>
              <div style={{ color: rose, fontSize: "32px", ...serif, lineHeight: 1, marginBottom: "16px" }}>"</div>
              <p style={{ ...serif, fontSize: "15px", color: text, lineHeight: 1.8, fontStyle: "italic", marginBottom: "20px" }}>{t.q}</p>
              <div style={{ color: green, fontSize: "11px", letterSpacing: "0.15em" }}>{t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: rose, padding: "72px 48px", textAlign: "center" }}>
        <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400, color: "#fff", marginBottom: "16px" }}>
          Book your sanctuary experience.
        </h2>
        <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px", marginBottom: "36px" }}>
          Online booking available 24/7. Gift cards always in season.
        </p>
        <div style={{ display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="#" style={{ background: "#fff", color: rose, fontSize: "12px", fontWeight: 700, letterSpacing: "0.2em", padding: "16px 36px", textDecoration: "none" }}>
            BOOK YOUR VISIT
          </a>
          <a href="#" style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: "12px", letterSpacing: "0.15em", padding: "16px 36px", textDecoration: "none" }}>
            GIFT A TREATMENT
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#2d1b12", color: "rgba(255,255,255,0.5)", padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", fontSize: "13px" }}>
        <div style={{ ...serif, color: rose, fontSize: "18px", fontStyle: "italic" }}>Lumière Spa &amp; Wellness</div>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Treatments", "Packages", "Gift Cards", "About"].map((l) => (
            <a key={l} href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div>© 2025 Lumière Spa · Houston, TX</div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// VELOCITY — APEX Fitness
// ---------------------------------------------------------------------------

function VelocityTemplate() {
  const bg = "#050505";
  const text = "#f0f0f0";
  const green = "#22c55e";
  const muted = "#6b7280";
  const border = "#111";
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Arial, system-ui, sans-serif" };

  return (
    <div style={{ background: bg, color: text, minHeight: "100vh", ...sans }}>
      {/* Green accent */}
      <div style={{ background: green, height: "3px" }} />

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 48px", borderBottom: `1px solid ${border}`, position: "sticky", top: "48px", background: "rgba(5,5,5,0.97)", backdropFilter: "blur(16px)", zIndex: 100 }}>
        <div style={{ color: text, fontSize: "22px", fontWeight: 900, letterSpacing: "0.15em", textTransform: "uppercase" }}>
          APEX <span style={{ color: green }}>FITNESS</span>
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          {["Training", "Classes", "Membership", "Locations"].map((l) => (
            <a key={l} href="#" style={{ color: muted, fontSize: "12px", fontWeight: 700, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase" }}>{l}</a>
          ))}
        </div>
        <a href="#" style={{ background: green, color: "#050505", fontSize: "11px", fontWeight: 900, letterSpacing: "0.2em", padding: "12px 28px", textDecoration: "none", textTransform: "uppercase" }}>
          JOIN NOW
        </a>
      </nav>

      {/* HERO */}
      <section style={{ minHeight: "92vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 48px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, background: "radial-gradient(ellipse at 70% 50%, rgba(34,197,94,0.06) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", right: "48px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "4px" }}>
          {Array.from({ length: 8 }, (_, i) => (
            <div key={i} style={{ height: "2px", width: `${20 + i * 12}px`, background: green, opacity: 0.15 + i * 0.08 }} />
          ))}
        </div>
        <div style={{ position: "relative", maxWidth: "800px" }}>
          <div style={{ color: green, fontSize: "12px", fontWeight: 900, letterSpacing: "0.5em", textTransform: "uppercase", marginBottom: "20px" }}>
            6 HOUSTON LOCATIONS
          </div>
          <h1 style={{ fontSize: "clamp(64px, 10vw, 128px)", fontWeight: 900, lineHeight: 0.92, letterSpacing: "-0.03em", textTransform: "uppercase", marginBottom: "20px" }}>
            BREAK<br />YOUR<br /><span style={{ color: green }}>LIMIT.</span>
          </h1>
          <div style={{ height: "3px", width: "80px", background: green, marginBottom: "24px" }} />
          <p style={{ fontSize: "17px", color: muted, lineHeight: 1.7, maxWidth: "520px", marginBottom: "40px" }}>
            Elite coaching, world-class facilities, and a community of 2,400 members pushing the
            limits of what's possible. Your transformation starts today.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#" style={{ background: green, color: "#050505", fontSize: "12px", fontWeight: 900, letterSpacing: "0.2em", padding: "18px 40px", textDecoration: "none", textTransform: "uppercase" }}>
              START 7-DAY FREE TRIAL
            </a>
            <a href="#" style={{ border: `2px solid ${border}`, color: muted, fontSize: "12px", fontWeight: 700, letterSpacing: "0.15em", padding: "18px 40px", textDecoration: "none", textTransform: "uppercase" }}>
              VIEW CLASSES
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "72px 48px", borderTop: `1px solid ${border}` }}>
        <div style={{ color: green, fontSize: "11px", fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "16px" }}>
          WHAT WE OFFER
        </div>
        <h2 style={{ fontSize: "clamp(32px, 5vw, 60px)", fontWeight: 900, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: "48px", color: text }}>
          ELITE TRAINING. REAL RESULTS.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1px", background: border }}>
          {[
            { n: "01", t: "Personal Training", d: "Certified elite coaches designing custom programs to hit your specific goals — strength, performance, weight loss, or athletic conditioning." },
            { n: "02", t: "Group Classes", d: "45 classes per week — HIIT, boxing, spin, yoga, and functional strength — in small-group settings that maximize coaching attention." },
            { n: "03", t: "Nutrition Coaching", d: "Registered dietitians building personalized meal plans that fuel your workouts and sustain your results long-term." },
            { n: "04", t: "Athletic Performance", d: "Speed, power, and agility training for competitive athletes. Our performance team has trained Houston's amateur and professional competitors." },
          ].map((s) => (
            <div key={s.t} style={{ background: bg, padding: "40px 36px", borderBottom: `1px solid ${border}` }}>
              <div style={{ color: green, fontSize: "11px", fontWeight: 900, letterSpacing: "0.35em", marginBottom: "16px" }}>{s.n}</div>
              <h3 style={{ fontSize: "22px", fontWeight: 900, letterSpacing: "-0.01em", textTransform: "uppercase", marginBottom: "14px", color: text }}>{s.t}</h3>
              <p style={{ color: muted, fontSize: "14px", lineHeight: 1.75 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: green, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { k: "2,400", l: "Members" },
          { k: "45", l: "Classes / Week" },
          { k: "15", l: "Elite Coaches" },
          { k: "6", l: "Houston Locations" },
        ].map((s) => (
          <div key={s.l} style={{ padding: "44px 28px", textAlign: "center", borderRight: "1px solid rgba(0,0,0,0.12)" }}>
            <div style={{ fontSize: "52px", fontWeight: 900, color: "#050505", lineHeight: 1, letterSpacing: "-0.03em" }}>{s.k}</div>
            <div style={{ color: "rgba(0,0,0,0.6)", fontSize: "10px", letterSpacing: "0.25em", textTransform: "uppercase", marginTop: "8px", fontWeight: 700 }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* GALLERY */}
      <section style={{ padding: "72px 48px", borderTop: `1px solid ${border}` }}>
        <div style={{ color: green, fontSize: "11px", fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "16px" }}>OUR CLASSES</div>
        <h2 style={{ fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 900, letterSpacing: "-0.02em", textTransform: "uppercase", marginBottom: "40px", color: text }}>
          45 CLASSES. ZERO EXCUSES.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {[
            { name: "APEX HIIT", type: "High Intensity Interval Training", bg: "linear-gradient(135deg, #022c0a 0%, #050505 100%)" },
            { name: "Elite Boxing", type: "Cardio & Combat Conditioning", bg: "linear-gradient(135deg, #041a08 0%, #020202 100%)" },
            { name: "Power Spin", type: "Indoor Cycling Performance", bg: "linear-gradient(135deg, #021c06 0%, #050505 100%)" },
            { name: "Strength Lab", type: "Barbell & Functional Strength", bg: "linear-gradient(135deg, #031504 0%, #020202 100%)" },
          ].map((p) => (
            <div key={p.name} style={{ background: p.bg, border: `1px solid ${border}`, overflow: "hidden" }}>
              <div style={{ height: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center" }}>
                  <div style={{ height: "3px", width: "48px", background: green, margin: "0 auto 12px" }} />
                  <div style={{ color: green, fontSize: "24px", fontWeight: 900, letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.name}</div>
                </div>
              </div>
              <div style={{ padding: "14px 20px", borderTop: `1px solid ${border}` }}>
                <div style={{ color: muted, fontSize: "12px", letterSpacing: "0.1em", textTransform: "uppercase" }}>{p.type}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "64px 48px", borderTop: `1px solid ${border}`, background: "#020202" }}>
        <div style={{ color: green, fontSize: "11px", fontWeight: 900, letterSpacing: "0.4em", textTransform: "uppercase", marginBottom: "40px" }}>
          TRANSFORMATIONS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          {[
            { q: "I joined APEX with 60 pounds to lose and zero gym experience. 14 months later I've lost 55 pounds and I'm deadlifting more than my old bodyweight. The coaches genuinely changed my life.", a: "— Marcus T., Memorial" },
            { q: "I've trained at gyms in Houston, Dallas, and Austin. APEX Greenway is the best gym I've ever set foot in. The equipment, the coaching, and the community are on a completely different level.", a: "— Sarah K., Greenway Plaza" },
          ].map((t) => (
            <div key={t.a} style={{ borderLeft: `3px solid ${green}`, paddingLeft: "28px" }}>
              <p style={{ fontSize: "16px", color: text, lineHeight: 1.75, marginBottom: "16px" }}>"{t.q}"</p>
              <div style={{ color: green, fontSize: "11px", fontWeight: 700, letterSpacing: "0.12em" }}>{t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: green, padding: "80px 48px", textAlign: "center" }}>
        <h2 style={{ fontSize: "clamp(36px, 6vw, 80px)", fontWeight: 900, letterSpacing: "-0.02em", textTransform: "uppercase", color: "#050505", marginBottom: "16px" }}>
          START YOUR 7-DAY FREE TRIAL.
        </h2>
        <p style={{ color: "rgba(5,5,5,0.65)", fontSize: "16px", fontWeight: 600, marginBottom: "40px" }}>
          No contract. No commitment. Just results.
        </p>
        <a href="#" style={{ background: "#050505", color: text, fontSize: "13px", fontWeight: 900, letterSpacing: "0.25em", padding: "20px 52px", textDecoration: "none", textTransform: "uppercase", display: "inline-block" }}>
          CLAIM FREE TRIAL →
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#020202", padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", borderTop: `1px solid ${border}` }}>
        <div style={{ fontSize: "18px", fontWeight: 900, color: green, letterSpacing: "0.15em", textTransform: "uppercase" }}>APEX FITNESS</div>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Classes", "Membership", "Locations", "Contact"].map((l) => (
            <a key={l} href="#" style={{ color: muted, fontSize: "12px", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</a>
          ))}
        </div>
        <div style={{ color: muted, fontSize: "12px" }}>© 2025 APEX FITNESS HOUSTON · ALL RIGHTS RESERVED</div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// GROVE — Canopy Land & Garden
// ---------------------------------------------------------------------------

function GroveTemplate() {
  const bg = "#f7f3ec";
  const dark = "#1c2e1c";
  const green = "#3d7a3d";
  const earth = "#8b5e3c";
  const muted = "#6b5844";
  const border = "#ddd5c8";
  const lightGreen = "#e8f0e8";
  const serif: React.CSSProperties = { fontFamily: "'Georgia', 'Times New Roman', serif" };
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Arial, system-ui, sans-serif" };

  return (
    <div style={{ background: bg, color: dark, minHeight: "100vh", ...sans }}>
      {/* Forest green header */}
      <nav style={{ background: green, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 48px", position: "sticky", top: "48px", zIndex: 100 }}>
        <div style={{ ...serif, fontSize: "20px", letterSpacing: "0.12em", color: "#f7f3ec" }}>
          Canopy
        </div>
        <div style={{ display: "flex", gap: "36px" }}>
          {["Services", "Portfolio", "About", "Contact"].map((l) => (
            <a key={l} href="#" style={{ color: "rgba(247,243,236,0.8)", fontSize: "12px", letterSpacing: "0.08em", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <a href="#" style={{ background: earth, color: "#fff", fontSize: "11px", letterSpacing: "0.15em", padding: "10px 24px", textDecoration: "none" }}>
          FREE CONSULT
        </a>
      </nav>

      {/* Earth-tone divider stripe */}
      <div style={{ height: "5px", background: `linear-gradient(90deg, ${earth}, ${green}, ${earth})` }} />

      {/* HERO */}
      <section style={{ padding: "100px 48px", position: "relative", overflow: "hidden", background: `linear-gradient(135deg, ${bg} 0%, ${lightGreen} 50%, ${bg} 100%)` }}>
        <div style={{ position: "absolute", top: "-80px", right: "-80px", width: "500px", height: "500px", borderRadius: "50%", background: `radial-gradient(circle, ${green}11 0%, transparent 70%)` }} />
        <div style={{ maxWidth: "720px" }}>
          <div style={{ color: earth, fontSize: "11px", letterSpacing: "0.35em", marginBottom: "24px" }}>
            HOUSTON LANDSCAPE DESIGN &amp; INSTALLATION
          </div>
          <h1 style={{ ...serif, fontSize: "clamp(48px, 6.5vw, 86px)", fontWeight: 400, lineHeight: 1.08, marginBottom: "24px", color: dark }}>
            Nature,<br />shaped by craft.
          </h1>
          <p style={{ fontSize: "17px", color: muted, lineHeight: 1.8, maxWidth: "560px", marginBottom: "44px" }}>
            Canopy transforms Houston outdoor spaces with expert landscape design, native plantings,
            precision irrigation, and ongoing seasonal care — delivering sustainable beauty since 2009.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <a href="#" style={{ background: green, color: "#f7f3ec", fontSize: "11px", letterSpacing: "0.2em", padding: "16px 36px", textDecoration: "none" }}>
              FREE CONSULTATION
            </a>
            <a href="#" style={{ border: `1px solid ${earth}`, color: earth, fontSize: "11px", letterSpacing: "0.15em", padding: "16px 36px", textDecoration: "none" }}>
              OUR PORTFOLIO
            </a>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "72px 48px", borderTop: `1px solid ${border}` }}>
        <div style={{ marginBottom: "56px" }}>
          <div style={{ color: earth, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "12px" }}>WHAT WE DO</div>
          <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 400, color: dark }}>Complete outdoor transformation.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            { t: "Landscape Design", d: "Master planning, planting design, and 3D visualization for residential and commercial outdoor spaces across the Greater Houston area.", icon: "◈" },
            { t: "Installation", d: "Expert crews installing trees, shrubs, perennials, hardscaping, and lighting systems — with a five-year plant replacement guarantee.", icon: "◆" },
            { t: "Irrigation Systems", d: "Smart drip irrigation, sprinkler systems, and rainwater collection designed for Houston's climate — efficient, automated, and precise.", icon: "◎" },
            { t: "Seasonal Maintenance", d: "Year-round care programs including fertilization, pruning, pest management, and seasonal color rotation for lasting landscape health.", icon: "◉" },
          ].map((s) => (
            <div key={s.t} style={{ background: lightGreen, border: `1px solid ${border}`, padding: "32px 28px" }}>
              <div style={{ color: green, fontSize: "20px", marginBottom: "14px" }}>{s.icon}</div>
              <h3 style={{ ...serif, fontSize: "20px", fontWeight: 400, marginBottom: "12px", color: dark }}>{s.t}</h3>
              <p style={{ color: muted, fontSize: "14px", lineHeight: 1.75 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: green, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { k: "15 Yrs", l: "Serving Houston" },
          { k: "1,200+", l: "Properties" },
          { k: "Certified", l: "Horticulturalists" },
          { k: "5★ Rated", l: "Google & Angi" },
        ].map((s) => (
          <div key={s.l} style={{ padding: "44px 28px", textAlign: "center", borderRight: "1px solid rgba(255,255,255,0.15)" }}>
            <div style={{ ...serif, fontSize: "38px", color: "#f7f3ec", fontWeight: 400, lineHeight: 1 }}>{s.k}</div>
            <div style={{ color: "rgba(247,243,236,0.7)", fontSize: "10px", letterSpacing: "0.2em", marginTop: "10px" }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* GALLERY */}
      <section style={{ padding: "72px 48px", background: bg }}>
        <div style={{ marginBottom: "48px" }}>
          <div style={{ color: earth, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "12px" }}>RECENT WORK</div>
          <h2 style={{ ...serif, fontSize: "clamp(28px, 3.5vw, 44px)", fontWeight: 400, color: dark }}>Houston gardens we love.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            { name: "River Oaks Garden Estate", type: "Full Landscape Design", bg: `linear-gradient(135deg, ${lightGreen} 0%, #c8dcc8 100%)` },
            { name: "Memorial Pool Garden", type: "Outdoor Living + Water Feature", bg: `linear-gradient(135deg, #d4e8d4 0%, ${lightGreen} 100%)` },
            { name: "Sugar Land Town Square", type: "Commercial Landscape", bg: `linear-gradient(135deg, ${lightGreen} 0%, #bcd4bc 100%)` },
            { name: "The Woodlands Native Garden", type: "Native Planting + Irrigation", bg: `linear-gradient(135deg, #dce8d4 0%, ${lightGreen} 100%)` },
          ].map((p) => (
            <div key={p.name} style={{ background: p.bg, border: `1px solid ${border}`, overflow: "hidden" }}>
              <div style={{ height: "160px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "48px", height: "48px", borderRadius: "50%", background: green, opacity: 0.3 }} />
              </div>
              <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.5)", borderTop: `1px solid ${border}` }}>
                <div style={{ color: earth, fontSize: "10px", letterSpacing: "0.15em", marginBottom: "6px" }}>{p.type}</div>
                <div style={{ ...serif, color: dark, fontSize: "15px" }}>{p.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "72px 48px", borderTop: `1px solid ${border}`, background: lightGreen }}>
        <div style={{ color: earth, fontSize: "10px", letterSpacing: "0.35em", marginBottom: "40px" }}>HOMEOWNER REVIEWS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "40px" }}>
          {[
            { q: "Canopy redesigned our entire backyard — pool surround, garden beds, and lighting. They understood exactly what we wanted, delivered on time, and every plant they placed is thriving three years later.", a: "— Susan &amp; Paul R., River Oaks" },
            { q: "We have a maintenance contract with Canopy that's been running for 7 years. The yard has never looked better. Reliable, knowledgeable, and genuinely caring about the plants they maintain.", a: "— David M., The Woodlands" },
          ].map((t) => (
            <div key={t.a} style={{ background: bg, border: `1px solid ${border}`, padding: "36px 32px" }}>
              <div style={{ color: green, fontSize: "32px", ...serif, lineHeight: 1, marginBottom: "16px" }}>"</div>
              <p style={{ ...serif, fontSize: "15px", color: dark, lineHeight: 1.8, fontStyle: "italic", marginBottom: "20px" }}>{t.q}</p>
              <div style={{ color: earth, fontSize: "11px", letterSpacing: "0.15em" }} dangerouslySetInnerHTML={{ __html: t.a }} />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: earth, padding: "72px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
        <div>
          <h2 style={{ ...serif, fontSize: "clamp(28px, 4vw, 52px)", fontWeight: 400, color: "#fff", marginBottom: "12px" }}>
            Get your free landscape consultation.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.8)", fontSize: "16px" }}>
            We visit your property, assess your soil and sun, and present a design plan — no charge, no obligation.
          </p>
        </div>
        <a href="#" style={{ background: green, color: "#f7f3ec", fontSize: "11px", letterSpacing: "0.2em", padding: "18px 40px", textDecoration: "none", whiteSpace: "nowrap" }}>
          BOOK CONSULT
        </a>
      </section>

      {/* FOOTER */}
      <footer style={{ background: dark, color: "rgba(247,243,236,0.5)", padding: "48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", fontSize: "13px" }}>
        <div style={{ ...serif, color: "#a8d5a2", fontSize: "18px" }}>Canopy Land &amp; Garden</div>
        <div style={{ display: "flex", gap: "28px" }}>
          {["Services", "Portfolio", "Blog", "Contact"].map((l) => (
            <a key={l} href="#" style={{ color: "rgba(247,243,236,0.5)", textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <div>© 2025 Canopy Land &amp; Garden · Houston, TX · Licensed Irrigator</div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUMMIT — Summit Medical Group
// ---------------------------------------------------------------------------

function SummitTemplate() {
  const bg = "#f8fafc";
  const dark = "#0f1729";
  const teal = "#0d9488";
  const muted = "#64748b";
  const border = "#e2e8f0";
  const lightTeal = "#e6faf8";
  const sans: React.CSSProperties = { fontFamily: "'Helvetica Neue', Arial, system-ui, sans-serif" };

  return (
    <div style={{ background: bg, color: dark, minHeight: "100vh", ...sans }}>
      {/* Teal top accent */}
      <div style={{ background: teal, height: "4px" }} />

      {/* NAV */}
      <nav style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 48px", borderBottom: `1px solid ${border}`, position: "sticky", top: "48px", background: "rgba(248,250,252,0.97)", backdropFilter: "blur(16px)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "32px", height: "32px", background: teal, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "14px" }}>+</div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: dark, letterSpacing: "-0.01em" }}>Summit Medical Group</div>
        </div>
        <div style={{ display: "flex", gap: "32px" }}>
          {["Services", "Providers", "Locations", "Patient Portal"].map((l) => (
            <a key={l} href="#" style={{ color: muted, fontSize: "13px", fontWeight: 500, textDecoration: "none" }}>{l}</a>
          ))}
        </div>
        <a href="#" style={{ background: teal, color: "#fff", fontSize: "12px", fontWeight: 700, padding: "10px 24px", textDecoration: "none", borderRadius: "2px" }}>
          BOOK APPOINTMENT
        </a>
      </nav>

      {/* HERO */}
      <section style={{ padding: "80px 48px", background: "#fff", borderBottom: `1px solid ${border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "64px", alignItems: "center" }}>
          <div>
            <div style={{ background: lightTeal, color: teal, display: "inline-block", fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", padding: "6px 14px", marginBottom: "24px", borderRadius: "2px" }}>
              SAME-DAY APPOINTMENTS AVAILABLE
            </div>
            <h1 style={{ fontSize: "clamp(36px, 4.5vw, 60px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.02em", marginBottom: "20px", color: dark }}>
              Advanced care.<br />Personal attention.
            </h1>
            <p style={{ fontSize: "17px", color: muted, lineHeight: 1.75, marginBottom: "36px" }}>
              Summit Medical Group delivers comprehensive primary care and specialist services
              to Houston families — with 12 compassionate providers, 18 years of community
              trust, and same-day appointments for urgent needs.
            </p>
            <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
              <a href="#" style={{ background: teal, color: "#fff", fontSize: "13px", fontWeight: 700, padding: "14px 32px", textDecoration: "none", borderRadius: "2px" }}>
                BOOK ONLINE
              </a>
              <a href="#" style={{ border: `2px solid ${border}`, color: dark, fontSize: "13px", fontWeight: 600, padding: "14px 32px", textDecoration: "none", borderRadius: "2px" }}>
                (281) 555-7700
              </a>
            </div>
          </div>
          {/* Placeholder visual */}
          <div style={{ background: lightTeal, border: `1px solid ${teal}33`, height: "380px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "16px" }}>
            <div style={{ width: "72px", height: "72px", background: teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", color: "#fff" }}>+</div>
            <div style={{ color: teal, fontSize: "14px", fontWeight: 600, letterSpacing: "0.05em" }}>Summit Medical Group</div>
            <div style={{ color: muted, fontSize: "12px" }}>Serving Houston Since 2007</div>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "72px 48px", borderBottom: `1px solid ${border}` }}>
        <div style={{ marginBottom: "48px" }}>
          <div style={{ color: teal, fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", marginBottom: "12px" }}>OUR SERVICES</div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 700, letterSpacing: "-0.02em", color: dark }}>Comprehensive care, close to home.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
          {[
            { t: "Primary Care", d: "Preventive wellness visits, chronic disease management, annual physicals, and sick visits — your long-term medical home in Houston.", icon: "◈" },
            { t: "Preventive Medicine", d: "Comprehensive health screenings, immunizations, cancer risk assessments, and wellness coaching to protect your health proactively.", icon: "◆" },
            { t: "Specialist Referrals", d: "Coordinated referrals to Houston's top specialists — cardiology, dermatology, orthopedics, and more — with warm hand-offs from your primary provider.", icon: "◎" },
            { t: "Telehealth", d: "Same-day virtual visits from your phone or computer. Full access to your care team, medical records, and prescriptions from anywhere.", icon: "◉" },
          ].map((s) => (
            <div key={s.t} style={{ background: "#fff", border: `1px solid ${border}`, padding: "28px 24px" }}>
              <div style={{ color: teal, fontSize: "20px", marginBottom: "12px" }}>{s.icon}</div>
              <h3 style={{ fontSize: "18px", fontWeight: 700, marginBottom: "10px", color: dark }}>{s.t}</h3>
              <p style={{ color: muted, fontSize: "14px", lineHeight: 1.75 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: dark, display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}>
        {[
          { k: "12", l: "Providers" },
          { k: "18 Yrs", l: "Serving Houston" },
          { k: "35,000+", l: "Patients" },
          { k: "Same Day", l: "Appointments" },
        ].map((s) => (
          <div key={s.l} style={{ padding: "44px 28px", textAlign: "center", borderRight: `1px solid rgba(255,255,255,0.06)` }}>
            <div style={{ fontSize: "44px", fontWeight: 700, color: teal, lineHeight: 1, marginBottom: "8px" }}>{s.k}</div>
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "10px", letterSpacing: "0.2em" }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* GALLERY */}
      <section style={{ padding: "72px 48px", background: bg }}>
        <div style={{ marginBottom: "48px" }}>
          <div style={{ color: teal, fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", marginBottom: "12px" }}>SPECIALTY AREAS</div>
          <h2 style={{ fontSize: "clamp(24px, 3.5vw, 40px)", fontWeight: 700, letterSpacing: "-0.02em", color: dark }}>Expert care in every discipline.</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "12px" }}>
          {[
            { name: "Family Medicine", type: "All ages, all stages of life", bg: `linear-gradient(135deg, ${lightTeal} 0%, #b2f0ec 100%)` },
            { name: "Women's Health", type: "Preventive + reproductive care", bg: `linear-gradient(135deg, #f0e8f8 0%, #e4d4f4 100%)` },
            { name: "Chronic Care Management", type: "Diabetes, hypertension & more", bg: `linear-gradient(135deg, ${lightTeal} 0%, #c2e8e4 100%)` },
            { name: "Pediatric Care", type: "From newborn through adolescent", bg: `linear-gradient(135deg, #fff8e6 0%, #fef0c8 100%)` },
          ].map((p) => (
            <div key={p.name} style={{ background: p.bg, border: `1px solid ${border}`, overflow: "hidden" }}>
              <div style={{ height: "140px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: "48px", height: "48px", background: teal, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "20px", fontWeight: 700, opacity: 0.7 }}>+</div>
              </div>
              <div style={{ padding: "16px 20px", background: "rgba(255,255,255,0.6)", borderTop: `1px solid ${border}` }}>
                <div style={{ color: muted, fontSize: "10px", letterSpacing: "0.15em", marginBottom: "5px" }}>{p.type}</div>
                <div style={{ color: dark, fontSize: "15px", fontWeight: 600 }}>{p.name}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ padding: "72px 48px", background: "#fff", borderTop: `1px solid ${border}` }}>
        <div style={{ color: teal, fontSize: "11px", fontWeight: 700, letterSpacing: "0.2em", marginBottom: "40px" }}>PATIENT REVIEWS</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {[
            { q: "Dr. Patel has been my primary care physician for 10 years. She remembers everything about my history, my family, my work. She doesn't just treat symptoms — she cares about my whole life.", a: "— Maria G., Pearland" },
            { q: "When I called at 8am for a same-day appointment, I was seen by noon and had a prescription sent to my pharmacy by 1pm. I've never experienced that kind of responsiveness from a medical practice.", a: "— James T., Sugar Land" },
          ].map((t) => (
            <div key={t.a} style={{ background: lightTeal, border: `1px solid ${teal}22`, padding: "32px 28px" }}>
              <div style={{ color: teal, fontSize: "28px", fontWeight: 300, lineHeight: 1, marginBottom: "14px" }}>"</div>
              <p style={{ fontSize: "15px", color: dark, lineHeight: 1.75, marginBottom: "16px" }}>{t.q}</p>
              <div style={{ color: teal, fontSize: "12px", fontWeight: 600 }}>{t.a}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: teal, padding: "72px 48px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "32px" }}>
        <div>
          <h2 style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, letterSpacing: "-0.02em", color: "#fff", marginBottom: "12px" }}>
            Book your appointment online.
          </h2>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "16px" }}>
            Same-day appointments available. New patients welcome.
          </p>
        </div>
        <div style={{ display: "flex", gap: "14px", flexWrap: "wrap" }}>
          <a href="#" style={{ background: "#fff", color: teal, fontSize: "13px", fontWeight: 700, padding: "16px 36px", textDecoration: "none", borderRadius: "2px" }}>
            BOOK ONLINE
          </a>
          <a href="#" style={{ border: "2px solid rgba(255,255,255,0.5)", color: "#fff", fontSize: "13px", fontWeight: 600, padding: "16px 36px", textDecoration: "none", borderRadius: "2px" }}>
            (281) 555-7700
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: dark, color: "rgba(255,255,255,0.5)", padding: "48px", fontSize: "13px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "24px", marginBottom: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ width: "28px", height: "28px", background: teal, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: "12px" }}>+</div>
            <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>Summit Medical Group</span>
          </div>
          <div style={{ display: "flex", gap: "28px" }}>
            {["Services", "Providers", "Patient Portal", "Privacy"].map((l) => (
              <a key={l} href="#" style={{ color: "rgba(255,255,255,0.5)", textDecoration: "none" }}>{l}</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: "20px" }}>
          © 2025 Summit Medical Group · Houston, TX · HIPAA Compliant · Accepting Most Insurance
        </div>
      </footer>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Template registry map
// ---------------------------------------------------------------------------

const TEMPLATE_COMPONENTS: Record<TemplateSlug, React.FC> = {
  obsidian: ObsidianTemplate,
  coastal: CoastalTemplate,
  advocate: AdvocateTemplate,
  forge: ForgeTemplate,
  bloom: BloomTemplate,
  velocity: VelocityTemplate,
  grove: GroveTemplate,
  summit: SummitTemplate,
};

const TEMPLATE_META: Record<TemplateSlug, { name: string; tagline: string; metaTitle: string; metaDesc: string }> = {
  obsidian: {
    name: "Obsidian",
    tagline: "Luxury & Premium",
    metaTitle: "Obsidian — Luxury & Premium Website Template",
    metaDesc: "Preview the Obsidian website template: a dark luxury design system for real estate, hospitality, and premium brands.",
  },
  coastal: {
    name: "Coastal",
    tagline: "Pool, Spa & Marine",
    metaTitle: "Coastal — Pool, Spa & Marine Website Template",
    metaDesc: "Preview the Coastal website template: a clean, bright design system for pool companies, marinas, and water businesses.",
  },
  advocate: {
    name: "Advocate",
    tagline: "Legal & Finance",
    metaTitle: "Advocate — Legal & Finance Website Template",
    metaDesc: "Preview the Advocate website template: a navy-and-gold design for law firms, financial advisors, and consultants.",
  },
  forge: {
    name: "Forge",
    tagline: "Construction & Trades",
    metaTitle: "Forge — Construction & Trades Website Template",
    metaDesc: "Preview the Forge website template: a bold dark design for contractors, builders, and trade businesses.",
  },
  bloom: {
    name: "Bloom",
    tagline: "Spa, Wellness & Beauty",
    metaTitle: "Bloom — Spa & Wellness Website Template",
    metaDesc: "Preview the Bloom website template: an elegant cream-and-rose design for day spas, salons, and wellness studios.",
  },
  velocity: {
    name: "Velocity",
    tagline: "Fitness & Sports",
    metaTitle: "Velocity — Fitness & Sports Website Template",
    metaDesc: "Preview the Velocity website template: a high-energy dark design with electric-green accents for gyms and fitness businesses.",
  },
  grove: {
    name: "Grove",
    tagline: "Landscaping & Outdoor",
    metaTitle: "Grove — Landscaping & Outdoor Website Template",
    metaDesc: "Preview the Grove website template: an earthy organic design for landscapers, arborists, and garden businesses.",
  },
  summit: {
    name: "Summit",
    tagline: "Medical & Healthcare",
    metaTitle: "Summit — Medical & Healthcare Website Template",
    metaDesc: "Preview the Summit website template: a clean professional design for medical practices, clinics, and healthcare providers.",
  },
};

const TEMPLATES: TemplateConfig[] = TEMPLATE_SLUGS.map((slug) => ({
  slug,
  ...TEMPLATE_META[slug],
  component: TEMPLATE_COMPONENTS[slug],
}));

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

function TemplatePreviewPage() {
  const template = Route.useLoaderData();
  const TemplateComponent = template.component;

  return (
    <>
      <PreviewBar name={template.name} tagline={template.tagline} />
      <div
        style={{
          position: "fixed",
          inset: 0,
          overflowY: "auto",
          paddingTop: "48px",
          background: "#fff",
          zIndex: 0,
        }}
      >
        <TemplateComponent />
      </div>
    </>
  );
}
