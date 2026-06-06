import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";

const faqs = [
  {
    q: "What platforms do you manage?",
    a: "Instagram, Facebook, LinkedIn, TikTok, X (Twitter), YouTube Shorts, Google Business Profile posts, and Pinterest. Most Houston businesses see the highest ROI from Instagram + Facebook + LinkedIn — we'll tell you exactly which mix fits your audience after the intake call. We don't charge per platform; we charge for the outcomes we deliver.",
  },
  {
    q: "How much does social media management cost in Houston?",
    a: "Our packages start at $1,200/month for 2-platform management (12 posts/month, community response, monthly analytics report). Full-service multi-platform management with paid social runs $2,800–$5,500/month depending on content volume, ad spend, and whether we produce original video. Every engagement is fixed-fee — no hourly billing, no surprise invoices. We publish the price range because we respect your time.",
  },
  {
    q: "Do you create the content or do we?",
    a: "We handle everything: strategy, copywriting, graphic design, short-form video editing, scheduling, and community management. You approve the monthly content calendar before anything goes live. If you have brand assets, product photos, or raw footage, we integrate them — but you need nothing to get started. Clients like BluTouch Pools came to us with no active social presence and were posting polished Reels within 10 days of signing.",
  },
  {
    q: "How quickly will we see results?",
    a: "Engagement metrics (reach, impressions, follower growth, saves, shares) move within 30–60 days on most accounts. Lead flow from social — DMs, profile link clicks, call bookings — is measurable by month 3. Paid social can generate leads in week one. We set baseline benchmarks before we start so you can see exactly what changed and what we're responsible for.",
  },
  {
    q: "Can you run paid social ads in addition to organic?",
    a: "Yes — and for most Houston service businesses, the best ROI is a hybrid approach: organic posts build trust and remarketing audiences, paid ads convert the warm traffic. We manage Meta (Instagram/Facebook) Ads, LinkedIn Ads, and TikTok Ads. Ad spend is billed separately at cost; we charge a flat management fee, not a percentage of spend. HOU GEN PROS ran storm-season Facebook campaigns through us and saw a 6× return on ad spend during peak demand windows.",
  },
  {
    q: "What makes Atlas Houston different from a freelance social media manager?",
    a: "Three things. First, we're a full studio — when you need a Reel, we have a video production team, not a freelance stitcher. When your Instagram clicks need a landing page optimized to convert, we build it. Second, we report on outcomes: leads, bookings, revenue attributed to social — not just vanity follower counts. Third, we're Houston-local — we understand the Houston market, Houston events, and Houston business culture at a level a remote freelancer can't replicate.",
  },
  {
    q: "Do you post manually or use a scheduler?",
    a: "We use a hybrid approach. The majority of evergreen and planned content is scheduled in advance via professional publishing tools (Buffer/Later/Meta Business Suite depending on platform), which ensures consistency and lets you preview everything before it goes live. Time-sensitive content — breaking news, real-time Houston events, trending audio moments on TikTok — is posted manually by our team as the opportunity arises. The content calendar you approve each month covers the planned layer; our community team handles the reactive layer daily.",
  },
  {
    q: "How do you handle negative comments or a PR crisis?",
    a: "We have a documented escalation protocol for every account we manage. Routine negative feedback (a bad review, a complaint comment) is handled within 2 business hours with a de-escalation response drafted in your brand voice and sent to you for optional approval before posting. For genuine PR crises — viral negative content, media coverage, boycott campaigns — we flag the situation immediately, convene a same-day call, draft a response strategy, and coordinate response across all channels. We've navigated this for clients in law, construction, and home services. Having a team monitoring your accounts 6 days a week means you're never blindsided.",
  },
];

const tactics = [
  { n: "01", t: "Content Strategy", d: "Monthly content calendars mapped to your business goals, Houston market events, seasonal demand cycles, and audience intent signals. No filler posts, no stock graphics that look like every other account. Every post has a purpose." },
  { n: "02", t: "Short-Form Video", d: "Instagram Reels, TikTok, and YouTube Shorts scripted, shot (on-location in Houston or remote), and edited in-house. Average 3.2× watch-through rate on content we produce. We own the camera, the editing suite, and the strategy." },
  { n: "03", t: "Community Management", d: "Daily comment and DM monitoring, brand-voice replies, review responses, and proactive community outreach. Response within 2 business hours on all managed accounts. Community is where trust compounds quietly." },
  { n: "04", t: "Paid Social Advertising", d: "Meta Ads, LinkedIn Ads, and TikTok Ads. Audience research, creative testing, pixel implementation, conversion tracking, and weekly optimization. Flat management fee, not % of spend. We build for profitability, not ad budget growth." },
  { n: "05", t: "Analytics & Reporting", d: "Monthly executive report: reach, engagement, follower growth, link clicks, leads, and revenue attribution. Benchmarked against your industry median. We report on outcomes, not vanity — and we show you the math." },
  { n: "06", t: "Houston Local Presence", d: "Location-tagged content, Houston event tie-ins, local hashtag strategy, Google Business Profile post cadence, and geo-targeted ads by neighborhood — Heights to Sugar Land to Pearland. We know this city." },
];

const proof = [
  { k: "4.1×", l: "Avg engagement lift by month 3" },
  { k: "127K", l: "Avg monthly organic reach per managed account" },
  { k: "8", l: "Platforms supported (Instagram, Facebook, LinkedIn, TikTok, X, YouTube, Pinterest, GBP)" },
  { k: "90 days", l: "Avg time to measurable lead flow from organic social" },
];

const clients = [
  {
    name: "BluTouch Pools",
    stat: "4.8★ · 55 Reviews",
    outcome: "Before-and-after Reel content documenting completed Houston pool builds became their primary review-generation engine. Customers cite Instagram as the reason they called — 'I saw the video of that backyard in Katy.'",
    url: "https://blutouchpools.com",
    domain: "blutouchpools.com",
  },
  {
    name: "HOU GEN PROS",
    stat: "Storm Season · Peak ROAS 6×",
    outcome: "Geo-targeted Facebook campaigns launched within hours of storm weather alerts, reaching Houston homeowners before they'd even thought to search. Storm-season social drove 40% of annual revenue in 8 weeks.",
    url: "https://hougenpros.com",
    domain: "hougenpros.com",
  },
  {
    name: "Vargas Tax Services",
    stat: "Since 2010 · Seasonal Peaks",
    outcome: "A year-round content calendar with deliberate seasonal ramp-up — January urgency posts, February deadline content, multilingual Spanish/English posts for Houston's underserved tax prep audience — doubled returning client bookings year over year.",
    url: "https://vargastaxservices.com",
    domain: "vargastaxservices.com",
  },
  {
    name: "SVR Law Firm",
    stat: "Trilingual · PI + Criminal Defense",
    outcome: "Multilingual social content in English, Spanish, and Vietnamese connected SVR's trilingual practice to Houston's diverse communities. LinkedIn thought leadership posts generated referral attorney inquiries within the first 60 days.",
    url: "https://svrlawfirm.com",
    domain: "svrlawfirm.com",
  },
];

const industries = [
  {
    name: "Legal & Professional Services",
    insight: "Houston's legal market is hyper-competitive and trust-dependent. LinkedIn authority content, client FAQ videos, and Google Business Profile management drive referrals and direct consultations. We know what attorneys can and cannot post under Texas bar rules.",
  },
  {
    name: "Restaurants & Hospitality",
    insight: "Houston diners discover new restaurants on Instagram first. We produce the food Reels, manage the DMs, run the reservation-link campaigns, and track how many Open Table reservations come from social. Visual-first, Houston neighborhood-specific.",
  },
  {
    name: "Construction & Home Services",
    insight: "Before/after content converts. Reel documentation of completed jobs, Facebook storm-response campaigns, Google Business posts with project photos, and neighborhood geo-targeting by zip code. We've done it for pool builders, roofers, and generator installers.",
  },
  {
    name: "Healthcare & Wellness",
    insight: "HIPAA-compliant social strategy for Houston clinics, med spas, and wellness practices. Educational content that establishes clinical authority, patient FAQ videos, and conversion-optimized Instagram link-in-bio flows that drive booked appointments.",
  },
];

const contentCalendar = [
  { week: "Wk 1", theme: "Authority & Education", posts: "2 educational posts (FAQ format), 1 behind-the-scenes story, 1 Reel (how-to or process reveal)" },
  { week: "Wk 2", theme: "Social Proof", posts: "1 client testimonial graphic, 1 before/after Reel, 1 project showcase carousel, 1 Google review spotlight" },
  { week: "Wk 3", theme: "Engagement & Community", posts: "1 poll or question post, 1 Houston local tie-in, 1 team/culture post, 1 trending audio Reel" },
  { week: "Wk 4", theme: "Conversion", posts: "1 offer or CTA post, 1 service explainer Reel, 1 DM prompt post, 1 monthly recap story series" },
];

const comparisonRows = [
  { factor: "Content creation", atlas: "Full studio: copy, graphics, video", freelance: "Copy only or graphics only", inhouse: "Variable by hire", tool: "None — you create it" },
  { factor: "Video production", atlas: "In-house crew, on-location in Houston", freelance: "Usually outsourced", inhouse: "Rarely available", tool: "Not included" },
  { factor: "Paid ad management", atlas: "Included, flat fee", freelance: "Separate hire needed", inhouse: "Rarely trained", tool: "Not included" },
  { factor: "Community response time", atlas: "Within 2 business hours", freelance: "Varies, often slow", inhouse: "Depends on bandwidth", tool: "Not included" },
  { factor: "Analytics depth", atlas: "Revenue attribution, lead tracking", freelance: "Basic vanity metrics", inhouse: "Often anecdotal", tool: "Post-level only" },
  { factor: "Houston market knowledge", atlas: "Locally based, neighborhood-level", freelance: "Usually remote", inhouse: "Possible if local", tool: "None" },
  { factor: "Monthly cost", atlas: "From $1,200 (fixed fee)", freelance: "$800–$2,000 (scope varies)", inhouse: "$4,500–$7,000 fully loaded", tool: "$0–$50 + your time" },
];

const platformData = [
  { platform: "Instagram", demographic: "25–44, visual-first, local discovery", bestContent: "Reels, carousels, Stories", roiTier: "High — local service businesses" },
  { platform: "Facebook", demographic: "35–65, neighborhood groups, homeowners", bestContent: "Video ads, event posts, reviews", roiTier: "High — storm/seasonal, home services" },
  { platform: "LinkedIn", demographic: "B2B, professional, 28–55", bestContent: "Thought leadership, case studies", roiTier: "High — law, finance, consulting" },
  { platform: "TikTok", demographic: "18–35, Houston local feed", bestContent: "Trending Reels, before/after, day-in-life", roiTier: "High — restaurants, trades, beauty" },
  { platform: "YouTube Shorts", demographic: "All ages, search-intent discovery", bestContent: "How-to, explainers, service demos", roiTier: "Medium — compounds over time" },
  { platform: "Google Business Profile", demographic: "Active buyers, ready to call", bestContent: "Weekly posts, photos, Q&A", roiTier: "Very high — direct lead intent" },
];

export const Route = createFileRoute("/services/social-media")({
  component: SocialMediaPage,
  head: () => ({
    meta: [
      { title: "Houston Social Media Management — Atlas Houston Studio" },
      {
        name: "description",
        content:
          "Houston social media management that drives real leads. Content strategy, short-form video, community management, paid social ads — all from one senior Houston team.",
      },
      { property: "og:title", content: "Houston Social Media Management — Atlas Houston" },
      {
        property: "og:description",
        content:
          "Not just posts — a full social strategy. Organic content, video production, paid ads, and monthly revenue attribution from Houston's premier digital studio.",
      },
      { property: "og:url", content: "https://atlashouston.com/services/social-media" },
    ],
    links: [{ rel: "canonical", href: "https://atlashouston.com/services/social-media" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Social Media Management",
          provider: {
            "@type": "Organization",
            name: "Atlas Houston",
            url: "https://atlashouston.com",
            areaServed: { "@type": "City", name: "Houston" },
          },
          description:
            "Social media management, content creation, short-form video, paid social ads, and community management for Houston businesses.",
          areaServed: { "@type": "City", name: "Houston" },
          offers: {
            "@type": "Offer",
            priceRange: "$1,200–$5,500/month",
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
            { "@type": "ListItem", position: 3, name: "Social Media Management", item: "https://atlashouston.com/services/social-media" },
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

function SocialMediaPage() {
  return (
    <SiteLayout>
      {/* HERO */}
      <section className="relative px-6 md:px-12 pt-28 md:pt-44 pb-28 md:pb-40 border-b border-border overflow-hidden">
        <div aria-hidden className="pointer-events-none absolute -top-32 -right-32 h-[44rem] w-[44rem] rounded-full bg-primary/25 blur-[160px] animate-orb" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-20 h-[36rem] w-[36rem] rounded-full bg-primary/10 blur-[160px] animate-orb-alt" />

        <div className="relative max-w-7xl">
          <div className="flex items-center gap-4 mb-10 animate-reveal">
            <span className="font-mono text-primary text-[11px] tracking-[0.35em]">
              SERVICE — SOCIAL MEDIA MANAGEMENT
            </span>
            <span className="h-px flex-1 max-w-32 bg-border" />
          </div>

          <h1 className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[9.5rem] font-medium tracking-[-0.03em] leading-[0.88] text-balance mb-12">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>Social that</span></span>{" "}
            <span className="mask-line"><span style={{ animationDelay: "120ms" }} className="text-gold italic">drives leads.</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "260ms" }}>Not just likes.</span></span>
          </h1>

          <Reveal delay={500} className="max-w-3xl">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-light">
              Most Houston businesses post inconsistently, chase vanity metrics, and wonder why
              social "doesn't work." We build a content engine — strategy, video, copy, ads, and
              community — that turns followers into booked appointments and paying customers.
            </p>
          </Reveal>

          <Reveal delay={680} className="mt-12 flex flex-wrap gap-4">
            <Link
              to="/contact"
              className="cta-lux px-9 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
            >
              Get a Social Audit →
            </Link>
            <a
              href="#tactics"
              className="px-9 py-5 border border-border text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors"
            >
              See our approach ↓
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
            // Client outcomes — real Houston businesses
          </div>
        </div>
        <div className="flex min-w-max divide-x divide-border">
          {clients.map((c) => (
            <div key={c.name} className="flex-shrink-0 w-72 p-8 group hover:bg-card/50 transition-colors">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-primary mb-2">{c.stat}</div>
              <div className="font-serif text-xl font-medium tracking-tight mb-3 group-hover:text-primary transition-colors">{c.name}</div>
              <p className="text-sm text-muted-foreground leading-relaxed">{c.outcome}</p>
              <a href={c.url} target="_blank" rel="noopener noreferrer" className="font-mono text-[9px] text-muted-foreground hover:text-primary transition-colors mt-3 block uppercase tracking-[0.2em]">{c.domain} ↗</a>
            </div>
          ))}
        </div>
      </section>

      {/* EDITORIAL ESSAY */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-4">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
              // Why Atlas Houston social is different
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95]">
              Social is a revenue channel. We run it like one.
            </h2>
          </div>
          <div className="md:col-span-8 space-y-10">
            <p className="dropcap text-xl md:text-2xl leading-[1.55] text-foreground/90 font-light">
              Most social media agencies measure success in followers, impressions, and engagement
              rate — numbers that look good in a PDF and tell you nothing about revenue. We measure
              DMs that turned into discovery calls. Profile link clicks that became booked
              appointments. Ad campaigns with a documented return on ad spend. If we can't draw a
              line from a post to a dollar, we tell you — and we change the strategy.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              The other thing agencies won't tell you: social media doesn't work in isolation.
              The Reel gets 40,000 views, the profile link gets clicked 600 times, and those
              clicks land on a page that loads in 4 seconds, has no CTA, and is not mobile-optimized.
              You lost every one of those leads. That doesn't happen here because we built the page,
              we wrote the copy, and we're watching the conversion rate in the same dashboard we use
              to monitor your follower growth.
            </p>
            <p className="text-lg md:text-xl text-muted-foreground leading-[1.7] max-w-3xl">
              We're also a full production studio based in Houston. When a campaign needs a Reel,
              we produce it in-house — cinematographers, editors, and motion designers on staff. When
              your strategy needs a Houston storm-season urgency push, we've shot, edited, and
              published same-day before. No contractor handoffs. No "you'll need to find a videographer
              for that." One team, one conversation, one invoice.
            </p>
          </div>
        </div>
      </section>

      {/* TACTICS */}
      <section id="tactics" className="border-b border-border scroll-mt-24">
        <div className="px-6 md:px-12 pt-20 pb-10">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">
            // The Practice
          </div>
          <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] max-w-4xl">
            Six disciplines. One integrated account.
          </h2>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 border-t border-border">
          {tactics.map((t, i) => (
            <article
              key={t.n}
              className={`p-8 md:p-12 border-b border-border ${i % 3 !== 2 ? "lg:border-r" : ""} ${i % 2 !== 1 ? "md:border-r lg:border-r-0 lg:border-r" : ""} group`}
            >
              <div className="flex items-baseline gap-4 mb-6">
                <span className="font-mono text-primary text-[11px] tracking-[0.3em]">{t.n}</span>
                <span className="hairline-gold flex-1" />
              </div>
              <h3 className="font-serif text-2xl md:text-3xl font-medium tracking-tight mb-4 group-hover:text-primary transition-colors duration-500">
                {t.t}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">{t.d}</p>
            </article>
          ))}
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// Atlas vs. the alternatives</div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-10">
            Why not just hire a freelancer?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-card">
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border w-48">Factor</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary border-b border-border">Atlas Houston Full-Service</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Freelance Social Manager</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">In-House Coordinator</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Scheduling Tool Only</th>
                </tr>
              </thead>
              <tbody>
                {comparisonRows.map((row, i) => (
                  <tr key={row.factor} className={i % 2 === 0 ? "bg-background" : "bg-card/30"}>
                    <td className="p-4 font-mono text-[10px] uppercase tracking-[0.15em] text-muted-foreground border-r border-border">{row.factor}</td>
                    <td className="p-4 text-foreground font-medium border-r border-border">{row.atlas}</td>
                    <td className="p-4 text-muted-foreground border-r border-border">{row.freelance}</td>
                    <td className="p-4 text-muted-foreground border-r border-border">{row.inhouse}</td>
                    <td className="p-4 text-muted-foreground">{row.tool}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PLATFORM PERFORMANCE TABLE */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// Platform intelligence</div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-4">
            The right platform for your Houston audience.
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-3xl">
            Not every business needs every platform. We match platform, content format, and audience
            demographics to your specific Houston market position before we post a single thing.
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border">
              <thead>
                <tr className="bg-background">
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Platform</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Houston Demographic</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">Best Content Type</th>
                  <th className="text-left p-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground border-b border-border">ROI Tier</th>
                </tr>
              </thead>
              <tbody>
                {platformData.map((row, i) => (
                  <tr key={row.platform} className={i % 2 === 0 ? "bg-card/30" : "bg-background"}>
                    <td className="p-4 font-semibold text-primary border-r border-border">{row.platform}</td>
                    <td className="p-4 text-muted-foreground border-r border-border">{row.demographic}</td>
                    <td className="p-4 text-muted-foreground border-r border-border">{row.bestContent}</td>
                    <td className="p-4 text-foreground">{row.roiTier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* PLATFORM SPOTLIGHT */}
      <section className="px-6 md:px-12 py-24 md:py-32 border-b border-border">
        <div className="grid md:grid-cols-12 gap-10 max-w-7xl">
          <div className="md:col-span-5">
            <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
              // Video-first social in 2026
            </div>
            <h2 className="font-serif text-4xl md:text-6xl font-medium tracking-tight leading-[0.95] mb-8">
              Reels and TikTok <span className="text-gold italic">are not optional</span> anymore.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Instagram's algorithm now buries static posts. TikTok's Houston local feed is where
              restaurants, clinics, gyms, and service businesses go viral overnight. We produce
              short-form video that feels native to each platform — not repurposed from a TV spot
              or cropped from a photo shoot.
            </p>
          </div>
          <div className="md:col-span-7 grid sm:grid-cols-2 gap-px bg-border border border-border">
            {[
              { t: "Instagram Reels", d: "15–60 second high-production content shot on-location in Houston. On-screen text, voice-over, trending audio, and CTA overlays that drive profile link clicks. We batch 4–8 Reels per shoot day for efficiency." },
              { t: "TikTok for Local Business", d: "Platform-native content that reaches Houston users in your zip code. We manage the account, post cadence, comment moderation, and TikTok ads from one team. Houston food, trades, and home service clients see the fastest organic growth here." },
              { t: "LinkedIn for B2B", d: "Thought leadership posts, case study carousels, and video testimonials for Houston's professional and B2B audiences. SVR Law Firm generated attorney referral inquiries within 60 days of us running their LinkedIn. Direct outreach sequences managed on request." },
              { t: "Meta Ads", d: "Instagram and Facebook ad campaigns with creative testing, pixel integration, conversion-optimized landing pages, and weekly ROAS reporting. Flat fee, no % of spend. We report on revenue, not impressions." },
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

      {/* CONTENT CALENDAR PREVIEW */}
      <section className="px-6 md:px-12 py-20 md:py-28 border-b border-border bg-card">
        <div className="max-w-7xl mx-auto">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-4">// What a managed month looks like</div>
          <h2 className="font-serif text-4xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-4">
            A typical monthly content calendar.
          </h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-3xl">
            Every post has a purpose. Every week has a strategic theme. You see the full plan — with
            copy, visuals, and scheduling times — before anything goes live.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contentCalendar.map((wk) => (
              <div key={wk.week} className="border border-border p-6 bg-background">
                <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-primary mb-2">{wk.week}</div>
                <div className="font-serif text-lg font-medium tracking-tight mb-3">{wk.theme}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">{wk.posts}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-muted-foreground mt-6">
            Plus: Daily community management, DM responses within 2 hrs, and reactive posts for Houston events and trends.
          </p>
        </div>
      </section>

      {/* PROCESS + DELIVERABLES */}
      <section className="border-b border-border grid md:grid-cols-12">
        <div className="md:col-span-7 p-8 md:p-12 border-b md:border-b-0 md:border-r border-border">
          <div className="font-mono text-[10px] text-primary uppercase tracking-[0.25em] mb-6">
            // Onboarding
          </div>
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight leading-[0.95] mb-12">
            What the first 30 days look like.
          </h2>
          <ol className="space-y-8">
            {[
              { n: "Wk 1", t: "Brand & audience audit", d: "We review your existing social accounts, brand assets, competitor content, and Houston audience demographic data. You receive a written audit with specific findings: what's working, what's wasting budget, and what your three nearest Houston competitors are doing better than you. Benchmarks set." },
              { n: "Wk 2", t: "Content blueprint & calendar", d: "First 30-day content calendar: every post planned, captioned, and designed — Instagram, Facebook, and all included platforms. Caption copy written in your brand voice. Graphics and video briefs drafted. You approve everything before a single post goes live." },
              { n: "Wk 3", t: "Production shoot (if included)", d: "On-location filming of Reels, product content, team content, and B-roll at your Houston location. We supply equipment, crew, and on-set direction. A half-day shoot typically yields 4–8 edited Reels and a bank of still photos." },
              { n: "Wk 4", t: "Launch + paid launch (optional)", d: "First posts scheduled, community management active, paid campaigns launched if included. Baseline metrics captured on Day 1 so we can show you exactly what changed. You have a live, optimized, brand-consistent social presence." },
              { n: "Mo 2+", t: "Ongoing: create, post, report", d: "Monthly content calendar, 3–5 posts per week per platform, daily community management, monthly analytics report with revenue attribution and next-month strategy pivot. Quarterly strategy reviews to realign with your business goals." },
            ].map((s) => (
              <li key={s.n} className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-6">
                <div className="font-mono text-primary text-xs uppercase tracking-[0.25em] min-w-16">{s.n}</div>
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
            // Deliverables
          </div>
          <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-tight mb-6">
            What you get every month.
          </h3>
          <ul className="space-y-4 mb-10 text-sm text-foreground/90">
            {[
              "Monthly content calendar (all posts approved before publishing)",
              "Custom graphics + on-brand templates for all posts",
              "Short-form video production — Reels, TikTok, Shorts",
              "Caption copywriting + hashtag research and rotation",
              "Daily community management + DM handling (6 days/wk)",
              "Monthly analytics report: reach, leads, revenue attribution",
              "Ad creative + campaign management (if included)",
              "Google Business Profile post cadence + Q&A management",
              "Quarterly strategy review + next-quarter roadmap",
            ].map((x) => (
              <li key={x} className="flex gap-3"><span className="text-primary">◆</span><span>{x}</span></li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6">
            Monthly packages from $1,200. Full-service with paid social from $2,800.
            Fixed fee — no hourly billing, no percentage of ad spend.
          </p>
          <Link
            to="/contact"
            className="cta-lux inline-block px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
          >
            Get a Free Social Audit →
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
              Social media questions we answer every week.
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
            { to: "/services/video-production", label: "Video Production", note: "Cinema-grade content for social & brand" },
            { to: "/services/seo", label: "SEO & AI Search", note: "Rank on Google and ChatGPT" },
            { to: "/services/websites", label: "Websites & Web Apps", note: "Conversion-optimized landing pages" },
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
            Ready to make social work?
          </h2>
          <div className="flex flex-col gap-6 max-w-md">
            <p className="text-base md:text-lg">
              Free audit of your current social presence. A senior strategist — not a salesperson —
              reviews your accounts and replies within one business day with specific findings.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/contact"
                className="cta-lux inline-block px-8 py-4 bg-background text-foreground font-mono text-[11px] font-bold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors"
              >
                Get the Free Audit →
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
