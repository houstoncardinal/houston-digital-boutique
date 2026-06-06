import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "What types of video do you produce?",
    a: "Brand films, product and service explainers, Instagram Reels and TikTok content, corporate and event coverage, testimonial videos, animated explainers and motion graphics, commercial and ad creative, and YouTube series. If it moves on screen, we've shipped it — from a 15-second Reel to a 10-minute brand documentary. We work in every format that a Houston business needs to compete in 2026.",
  },
  {
    q: "How much does video production cost in Houston?",
    a: "Social Reels (3 edited clips, on-location): from $1,800. Brand film (1–3 min, scripted, professional crew): $4,500–$12,000. Commercial campaign (multi-scene, scripted, motion graphics, ad variants): $12,000–$35,000+. Event coverage (half-day, edited highlight): from $2,200. Motion graphics only (no live shoot): from $2,800. Every project gets a fixed-price written scope before a single frame rolls — no day-rate surprises, no 'extra' edits that weren't quoted.",
  },
  {
    q: "How long does production take?",
    a: "Social Reels and short clips: 2-week turnaround from shoot date. Brand films: 3–5 weeks (pre-production, shoot, post). Full commercial campaigns: 6–10 weeks. Corporate event coverage: edited highlights within 5 business days of wrap. Rush timelines are available with a rush fee. The delivery date is written into your scope before we start — and we hit it.",
  },
  {
    q: "Do you handle scripting and creative direction?",
    a: "Yes — full creative development is included in every scripted project: concept, script, storyboard, shot list, location scouting in Houston, talent casting if needed, and on-set direction. You review and approve the script and storyboard before production day. We bring the creative vision; you provide the subject matter expertise and approve the direction. For documentary-style work, we conduct pre-interviews to shape the narrative before the camera rolls.",
  },
  {
    q: "Can you produce video for social media AND for broadcast/TV?",
    a: "Yes. We shoot 4K and deliver in every format: 9:16 vertical for TikTok and Reels, 1:1 for Instagram feed, 16:9 for YouTube and broadcast, 4:5 for Facebook. One production day can yield a complete asset library across all formats. Broadcast deliverables meet spec requirements for Houston-area TV stations and OTT platforms. We've done this for clients running simultaneous Instagram campaigns and Houston-market TV spots.",
  },
  {
    q: "Do you do animation and motion graphics?",
    a: "Yes — in-house. Logo animations, explainer animations, kinetic typography, social motion graphic templates, lower thirds for corporate video, and full 2D animated explainers. Motion graphics are often bundled into brand film and social packages. If you want a fully animated video (no live production), ask about our motion-only packages starting at $2,800. Turnaround for motion-only is typically 2–3 weeks.",
  },
  {
    q: "Can I be involved in the creative direction?",
    a: "Absolutely — and we prefer it. The best videos come from clients who are engaged in the brief, share reference footage they love, and give specific feedback at the script stage. Our process is built around collaboration: you approve the creative brief, the script, and the storyboard before production day. On set, you're welcome to observe and provide direction — or you can hand it entirely to us. We've done both with equal success. What we don't do is disappear into a black box and resurface six weeks later with something you've never seen before.",
  },
  {
    q: "Do you do documentary-style or interview-led videos?",
    a: "Yes — and it's one of our most-requested formats for law firms, professional services, and established Houston businesses with strong founder or team stories. Interview-led and documentary-style videos build trust at a depth that scripted commercial content can't match. Our process: pre-interview research and question development, on-location or in-studio shooting with cinema-quality lighting, professional audio (lav + boom), and editorial post-production that shapes a narrative from the raw material. Testimonial videos for service businesses follow the same care — we don't point a camera at a client and press record. We prepare them, make them comfortable, and get something real.",
  },
];

const services = [
  { n: "01", t: "Brand Films", d: "1–5 minute cinematic brand stories shot in and around Houston. Scripted, directed, and color-graded to the level of a regional ad campaign. The asset you put on your homepage, your pitch deck, your trade show booth — and your Google Business Profile. Every brand film includes multi-format exports." },
  { n: "02", t: "Social Content Packages", d: "Instagram Reels, TikTok, and YouTube Shorts produced in recurring monthly batches. On-location, on-brand, platform-native. Average 3.2× watch-through rate vs. DIY average on our produced content. Batch shoots maximize output per day — one half-day yields 4–8 finished Reels." },
  { n: "03", t: "Product & Service Demos", d: "Close-up, detail-forward production for physical products, service processes, or SaaS interfaces. Designed to rank on YouTube and convert on product pages. Packaged with caption sets, thumbnail designs, and multi-format exports. Contractors and home-service businesses use these to show — not tell." },
  { n: "04", t: "Corporate & Event Coverage", d: "Executive interviews, conference coverage, all-hands films, Houston event highlight reels. Delivered edited within 5 business days of event wrap. Multi-camera available for conferences, panels, and ceremonies. Includes licensed music, branded lower thirds, and social-ready cuts." },
  { n: "05", t: "Commercial Ad Creative", d: "30 and 60-second spots for Meta Ads, YouTube pre-roll, OTT, and broadcast. Multiple variants for A/B testing built into every campaign. Creative research, scripting, casting, production, and post — all under one roof. Delivered with platform-specific specs, captions, and CTAs." },
  { n: "06", t: "Animation & Motion Graphics", d: "Explainer animations, logo intros, kinetic typography, SaaS product walkthroughs, and social motion templates. No live production required. From a single logo sting to a full 90-second explainer. Files delivered in all master formats — you own the source files." },
];

const proof = [
  { k: "4K", l: "Every project delivered in 4K with multiple format exports" },
  { k: "1.4M+", l: "Avg first-month views on produced brand content" },
  { k: "2 wks", l: "Standard turnaround for social content packages" },
  { k: "3.2×", l: "Watch-through rate vs. DIY average on produced Reels" },
];

const clients = [
  {
    name: "Houston Restaurant Client",
    stat: "Food & Beverage · Reel Series",
    outcome: "A 6-week Reel series documenting the kitchen, plating process, and dining experience drove a 340% increase in Instagram profile visits and became the primary 'discovery' path for new diners — confirmed by reservation comments.",
    url: "#",
    domain: "Houston food & beverage",
  },
  {
    name: "BluTouch Pools",
    stat: "Pool Construction · Project Films",
    outcome: "Before-and-after project documentation filmed on-location at completed Houston pool builds. Each video now ranks on YouTube for Houston pool builder searches and is cited by prospective clients as the reason they chose BluTouch over competitors.",
    url: "https://blutouchpools.com",
    domain: "blutouchpools.com",
  },
  {
    name: "Houston Enterprise",
    stat: "Construction · Brand Film",
    outcome: "A 3-minute brand film covering active Houston construction projects, owner interviews, and crew footage replaced text-heavy proposal decks. Enterprise reports closing larger contracts faster — clients arrive with context and trust already established.",
    url: "https://houinc.com",
    domain: "houinc.com",
  },
  {
    name: "SVR Law Firm",
    stat: "Law Firm · Attorney Testimonials",
    outcome: "Trilingual attorney introduction videos — English, Spanish, Vietnamese — posted to YouTube and embedded on SVR's site. Watch-through rates above 70%. New clients mention the videos in consultations: 'I watched your video and knew you were the right firm.'",
    url: "https://svrlawfirm.com",
    domain: "svrlawfirm.com",
  },
];

const pricingRows = [
  {
    type: "Social Reels Package",
    price: "From $1,800",
    crew: "1 cinematographer + 1 director",
    turnaround: "2 weeks from shoot",
    formats: "9:16, 1:1, 4:5 + thumbnails",
    bestFor: "Monthly social content batches",
  },
  {
    type: "Brand Film",
    price: "$4,500–$12,000",
    crew: "2–3 person crew + director",
    turnaround: "3–5 weeks",
    formats: "16:9 master + all social cuts",
    bestFor: "Homepage hero, pitch decks, GBP",
  },
  {
    type: "Commercial Spot",
    price: "$12,000–$35,000+",
    crew: "Full production crew",
    turnaround: "6–10 weeks",
    formats: "Broadcast + all digital formats",
    bestFor: "Meta Ads, YouTube, OTT, TV",
  },
  {
    type: "Product / Service Demo",
    price: "From $2,200",
    crew: "1–2 person crew",
    turnaround: "2–3 weeks",
    formats: "16:9 + 9:16 + YouTube thumbnail",
    bestFor: "Product pages, YouTube SEO",
  },
  {
    type: "Event Coverage",
    price: "From $2,200",
    crew: "1–2 cameras, 1 editor",
    turnaround: "5 business days post-event",
    formats: "16:9 highlight + social cuts",
    bestFor: "Conferences, grand openings",
  },
  {
    type: "Motion Only",
    price: "From $2,800",
    crew: "Motion designer (no shoot)",
    turnaround: "2–3 weeks",
    formats: "MP4 + source files",
    bestFor: "Explainers, logo animations",
  },
];

const comparisonRows = [
  { factor: "Equipment (4K/cinema)", atlas: "Sony FX series + cinema glass", freelance: "Varies widely, often DSLR", stock: "N/A — pre-shot footage", ugc: "Phone camera" },
  { factor: "Creative direction", atlas: "Senior director on every project", freelance: "You direct, they shoot", stock: "No direction possible", ugc: "Self-directed" },
  { factor: "Editing", atlas: "Professional editorial in-house", freelance: "Included, variable quality", stock: "You assemble yourself", ugc: "You edit yourself" },
  { factor: "Multi-format export", atlas: "All formats, every project", freelance: "Usually one format unless asked", stock: "Limited to clip format", ugc: "Manual export required" },
  { factor: "Platform optimization", atlas: "Pacing, captions, CTAs per platform", freelance: "Rarely platform-aware", stock: "Generic — not optimized", ugc: "None" },
  { factor: "Brand consistency", atlas: "Built to your brand guidelines", freelance: "Variable across projects", stock: "Off-brand by nature", ugc: "Inconsistent" },
  { factor: "Typical cost", atlas: "From $1,800 (fixed fee)", freelance: "$500–$3,000 (day rate varies)", stock: "$0–$200/clip", ugc: "$0 + staff time" },
];

const industries = [
  {
    name: "Restaurants & Food Service",
    insight: "Houston diners decide where to eat on Instagram. Food Reel production, kitchen process content, chef interviews, and seasonal menu launches are our speciality. One well-produced Reel consistently outperforms months of static posts. We've done this for casual dining, upscale, food trucks, and ghost kitchens.",
  },
  {
    name: "Contractors & Home Services",
    insight: "Before/after video is the highest-converting content format for Houston home service businesses — pool builders, roofers, remodelers, generator installers. We document projects on-location, producing content that ranks on YouTube and closes jobs in proposal meetings. Clients arrive knowing your quality.",
  },
  {
    name: "Law Firms & Professional Services",
    insight: "Trust is the product. Attorney introduction videos, trilingual client testimonials, and office walkthrough content build the credibility that text biographies never can. We produce HIPAA and bar-rules-aware video for Houston law, medical, and financial services firms.",
  },
  {
    name: "Real Estate & Property",
    insight: "Houston real estate moves on visual content. Property tour Reels, neighborhood lifestyle films, new development brand videos, and agent introduction content — all produced on-location by a Houston crew that knows the market. We've produced for residential, commercial, and investment property.",
  },
];

const productionProcess = [
  { n: "Day 1–3", t: "Creative brief & written scope", d: "Discovery call or intake form. We learn your goals, target audience, distribution plan (where does this video live?), and hard deadline. A written creative brief is delivered: concept, messaging angle, visual reference direction, and confirmed fixed price. Nothing moves until you approve." },
  { n: "Day 4–7", t: "Pre-production", d: "Script written and submitted for your review. Shot list built. Storyboard prepared for scripted work. Houston locations scouted and confirmed. Talent, equipment, and crew scheduled. Permits obtained if required. You receive a production day briefing document." },
  { n: "Day 8", t: "Production day", d: "On-location or in-studio shoot in Houston. Senior cinematographer and director on set. You don't manage anything on production day — we handle logistics, direction, and coverage. We shoot to the shot list AND capture organic moments. A half-day typically yields more coverage than you'll use." },
  { n: "Day 9–14", t: "Post-production", d: "Rough cut delivered within 5 business days of shoot. Color grade in DaVinci Resolve. Sound design, licensed music selection, and voice-over (if scripted). Motion graphics added. Two revision rounds included — and because you approved the script and storyboard, revisions are usually minimal." },
  { n: "Delivery", t: "Asset handoff + deployment", d: "Drive folder with all assets: 4K master, compressed delivery versions in all agreed formats, thumbnail sets, captions file. If included in your package: we upload to your platforms, embed on the website we manage, launch paid campaigns with the creative, and track view and conversion data." },
];

export const Route = createFileRoute("/services/video-production")({
  component: VideoProductionPage,
  head: () => ({
    meta: [
      { title: "Houston Video Production — Atlas Houston Studio" },
      {
        name: "description",
        content:
          "Houston video production for brand films, social media Reels, commercials, and corporate video. 4K production, 2-week delivery, motion graphics in-house. Fixed-fee, senior crew.",
      },
      { property: "og:title", content: "Houston Video Production — Atlas Houston" },
      {
        property: "og:description",
        content:
          "Cinema-grade video production in Houston. Brand films, Reels, ad creative, and motion graphics from one senior team. Fixed-fee, fast delivery.",
      },
      { property: "og:url", content: "https://atlashouston.com/services/video-production" },
    ],
    links: [{ rel: "canonical", href: "https://atlashouston.com/services/video-production" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Video Production",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston",
            url: "https://atlashouston.com",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Professional video production in Houston: brand films, social media content, commercials, corporate video, and motion graphics.",
          areaServed: { "@type": "City", name: "Houston" },
          offers: {
            "@type": "Offer",
            priceRange: "$1,800–$35,000+",
            priceCurrency: "USD",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://atlashouston.com" },
            { "@type": "ListItem", position: 2, name: "Services", item: "https://atlashouston.com/services" },
            { "@type": "ListItem", position: 3, name: "Video Production", item: "https://atlashouston.com/services/video-production" },
          ],
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

function VideoProductionPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-44 pb-28 md:pb-40 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[44rem] w-[44rem] rounded-full bg-primary/25 blur-[160px] animate-orb" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[160px] animate-orb-alt" />

        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              SERVICE — VIDEO PRODUCTION
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-medium tracking-[-0.03em] leading-[0.88] text-balance mb-12">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>Cinema-grade</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "120ms" }} className="text-gold italic">video.</span></span>{" "}
            <span className="mask-line"><span style={{ animationDelay: "260ms" }}>Shipped fast.</span></span>
          </h1>

          <Reveal delay={500} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Brand films. Social Reels. Commercials. Corporate documentaries. Motion graphics.
              Shot in 4K in and around Houston, edited in-house by a senior creative team,
              delivered on a date we commit to before a camera ever rolls.
            </p>
          </Reveal>

          <Reveal delay={680} className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="cta-lux px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Get a Production Quote →
            </Link>
            <a
              href="#services"
              className="px-9 py-5 border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
            >
              See what we produce ↓
            </a>
          </Reveal>
        </div>
      </section>

      {/* PROOF NUMBERS */}
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
        <div className="px-6 md:px-12 pt-10 pb-4">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
            // Client outcomes — video in action
          </div>
        </div>
        <div className="flex min-w-max divide-x divide-border">
          {clients.map((c) => (
            <div key={c.name} className="flex-shrink-0 w-72 p-8 group hover:bg-card/50 transition-colors">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary mb-2">{c.stat}</div>
              <div className="font-serif text-xl font-medium tracking-tight mb-3 group-hover:text-primary transition-colors">{c.name}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.outcome}</p>
              {c.url !== "#" ? (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] text-muted-foreground hover:text-primary transition-colors mt-3 block uppercase tracking-[0.2em]">{c.domain} ↗</a>
              ) : (
                <span className="font-mono text-[9px] text-muted-foreground mt-3 block uppercase tracking-[0.2em]">{c.domain}</span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL ESSAY */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Why Atlas Houston video is different
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              We're a digital studio. Video is part of the machine.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              Standalone video production agencies hand you a file. We hand you a deployed asset —
              embedded on the page we built, optimized for the SEO keywords we're targeting,
              distributed on the social accounts we manage, and running as the ad creative in the
              Meta campaign we're measuring. Same team. One conversation. One invoice. The video
              doesn't exist in isolation; it's a component in a larger growth system.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Most Houston businesses have been burned by a freelance videographer who delivered
              beautiful footage with no creative strategy behind it, or by a large agency that
              charged LA production rates for a three-month timeline. We operate differently. Our
              production crew is Houston-based and works at the speed your marketing calendar
              actually requires. We've shipped brand films in 12 days. We've produced and
              published social Reels on same-day timelines during Houston storm events.
              Fast doesn't mean cheap — it means a well-run operation.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              Every project starts with a creative brief from a senior strategist who understands
              your audience and your distribution plan. We don't just point a camera. We
              understand why this specific video needs to exist, who will watch it, where it will
              live, and what it needs to make them do. The camera is the last thing we pick up.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="border-b border-border scroll-mt-24">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // Production Types
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Six formats. One production house.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-border">
          {services.map((s, i) => (
            <article
              key={s.n}
              className={`p-8 md:p-12 border-b border-border ${i % 3 !== 2 ? "lg:border-r" : ""} ${i % 2 !== 1 ? "md:border-r lg:border-r-0 lg:border-r" : ""} group`}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-primary text-[11px] tracking-[0.3em]">{s.n}</span>
                <span className="hairline-gold flex-1" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-4 group-hover:text-primary transition-colors duration-500">
                {s.t}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">{s.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// Atlas vs. the alternatives</div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-4">
            Why not just hire a freelancer?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
            Or use stock footage. Or shoot it yourself. Here's an honest breakdown of what each
            option actually delivers — and costs.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-card">
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border w-44">Factor</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary border-b border-border">Atlas Houston</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Freelance Videographer</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Stock Video</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Phone Video / UGC</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.factor} className={i % 2 === 0 ? "bg-background" : "bg-card/30"}>
                    <td className="p-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground border-r border-border">{row.factor}</td>
                    <td className="p-4 text-foreground font-medium border-r border-border">{row.atlas}</td>
                    <td className="p-4 text-muted-foreground border-r border-border">{row.freelance}</td>
                    <td className="p-4 text-muted-foreground border-r border-border">{row.stock}</td>
                    <td className="p-4 text-muted-foreground">{row.ugc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRICING TRANSPARENCY TABLE */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// Transparent pricing</div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-4">
            What each production type costs.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
            Every project is fixed-fee with a written scope. No day-rate surprises.
            No "extra" edit rounds that weren't quoted. You know the number before we start.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-background">
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Production Type</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-gold border-b border-border">Starting Price</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Crew Size</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Turnaround</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Formats Included</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Best For</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, i) => (
                  <tr key={row.type} className={i % 2 === 0 ? "bg-card/30" : "bg-background"}>
                    <td className="p-4 font-semibold text-foreground border-r border-border">{row.type}</td>
                    <td className="p-4 font-mono text-gold font-medium border-r border-border">{row.price}</td>
                    <td className="p-4 text-muted-foreground border-r border-border">{row.crew}</td>
                    <td className="p-4 text-muted-foreground border-r border-border">{row.turnaround}</td>
                    <td className="p-4 text-muted-foreground border-r border-border">{row.formats}</td>
                    <td className="p-4 text-muted-foreground">{row.bestFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PRODUCTION SPOTLIGHT */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
              // Spotlight — Social video in 2026
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-8">
              One shoot. <span className="text-gold italic">30 assets.</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              The smart move in 2026 is to shoot once and repurpose with intention. A single
              half-day production day yields a brand film, six Instagram Reels, three YouTube
              Shorts, a product page hero video, thumbnail sets, and a 30-second ad variant.
              We plan every production day for maximum asset output — so you're not paying
              for a new shoot every time you need a new post.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {[
              { t: "Multi-format delivery", d: "16:9, 9:16, 1:1, and 4:5 — all from one shoot day. Platform-specific pacing, burned-in captions, and CTAs applied to each format. You receive a complete asset library, not a single file." },
              { t: "Color grading & sound design", d: "Every project color-graded in DaVinci Resolve. Sound design, licensed music, and voice-over delivered with a polished final master. The difference between 'fine' and 'this looks expensive' lives in post." },
              { t: "Asset libraries you own", d: "Raw footage, color-graded master, compressed delivery versions, thumbnail sets, and GIF previews — delivered in an organized shared drive you own forever. We don't hold your assets hostage." },
              { t: "Revision rounds included", d: "Two edit rounds included in every project scope. Because you approve the script and storyboard before production, revisions rarely use both rounds. We write scopes so 'revision creep' doesn't exist." },
            ].map((b) => (
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

      {/* PRODUCTION PROCESS */}
      <section className="border-b border-border grid md:grid-cols-12">
        <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
            // Production Process
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-4">
            From brief to delivered asset.
          </h2>
          <p className="text-base text-muted-foreground mb-12 max-w-xl">
            Every project follows a documented process with clear checkpoints. You always know
            where your project stands and what happens next.
          </p>
          <ol className="space-y-8">
            {productionProcess.map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-6">
                <div className="font-mono text-primary text-xs uppercase tracking-[0.25em] min-w-20">{s.n}</div>
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
            // What you receive
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-6">
            Deliverables on every project.
          </h3>
          <ul className="space-y-4 mb-10 text-sm text-foreground/90">
            {[
              "Written creative brief and confirmed fixed-price scope",
              "Script + storyboard approval before production",
              "4K footage shot by senior cinematographer",
              "Color-graded master edit in DaVinci Resolve",
              "Licensed music or voice-over (where scoped)",
              "Multi-format exports: 16:9, 9:16, 1:1, 4:5",
              "Thumbnail sets and animated GIF previews",
              "Organized drive folder with all assets — yours forever",
              "Two edit revision rounds included",
              "Deployment support (upload, embed, campaign launch)",
            ].map((x) => (
              <li key={x} className="flex gap-3"><span className="text-primary">◆</span><span>{x}</span></li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Social Reels from $1,800. Brand films from $4,500. Motion graphics from $2,800.
            Fixed-fee, written scope, committed delivery date.
          </p>
          <Link
            to="/contact"
            className="cta-lux inline-block px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
          >
            Get a Production Quote →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="px-6 md:px-12 py-24 md:py-32 border-b border-border scroll-mt-24">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Frequently asked
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Video production questions we answer every week.
            </h2>
          </div>
          <div className="md:col-span-8 divide-y divide-border border-y border-border">
            {faqs.map((f) => (
              <details key={f.q} className="group py-6">
                <summary className="cursor-pointer flex justify-between items-center gap-6 list-none">
                  <h3 className="text-lg md:text-xl font-semibold tracking-tight group-hover:text-primary transition-colors">
                    {f.q}
                  </h3>
                  <span className="font-mono text-primary text-sm transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-3xl">{f.a}</p>
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
            { to: "/services/social-media", label: "Social Media", note: "Let us distribute what we produce" },
            { to: "/services/branding", label: "Branding & Identity", note: "Brand strategy before the lens opens" },
            { to: "/services/seo", label: "SEO & AI Search", note: "Video content that ranks on Google" },
          ].map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group block p-8 border border-border hover:border-primary transition-colors"
            >
              <div className="font-serif text-2xl md:text-3xl font-medium tracking-tight group-hover:text-primary transition-colors">
                {r.label}
              </div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-muted-foreground mt-4">
                {r.note} →
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-6 md:px-12 py-20 md:py-28 bg-primary text-primary-foreground">
        <div className="flex flex-col md:flex-row justify-between items-start gap-10">
          <h2 className="font-serif text-4xl md:text-7xl font-medium tracking-tight max-w-2xl leading-[0.9]">
            Ready to brief a production?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Tell us what you need to film. Fixed quote, written scope, and delivery date
              confirmed before a camera rolls. Senior crew, Houston-based.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cta-lux inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Get a Quote →
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
