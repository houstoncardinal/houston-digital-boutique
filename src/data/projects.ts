export interface Project {
  slug: string;
  name: string;
  domain: string;
  image: string;
  url: string;
  industry: string;
  year: string;
  tags: string[];
  headline: string;
  description: string;
  outcome: string;
  color: string;
  initials: string;
  challenge: string;
  whatWeBuilt: string[];
  techHighlights: string[];
  seoWork: string[];
  resultDetails: string[];
  about: string;
  stats: { value: string; label: string }[];
  socialMedia?: string[];
  aiAutomation?: string[];
  leadGen?: string[];
}

export const PROJECTS: Project[] = [
  {
    slug: "houston-enterprise",
    name: "Houston Enterprise",
    domain: "houinc.com",
    image: "/houinc.png",
    url: "https://www.houinc.com",
    industry: "Construction",
    year: "2023",
    tags: ["Web Design", "SEO", "Managed Hosting", "CMS"],
    headline: "Building excellence from the ground up.",
    description:
      "Houston Enterprise delivers full-service residential and commercial construction — new builds, renovations, remodels, office spaces, and industrial facilities. We designed and built their entire web presence from scratch, optimized for high-intent construction queries across the Houston metro.",
    outcome:
      "Custom-built site ranking for targeted Houston construction keywords, contact-form lead flow, and ongoing managed hosting with security hardening.",
    color: "#1e40af",
    initials: "HE",
    about:
      "Houston Enterprise is a full-service residential and commercial construction company serving the Greater Houston metro area. Founded and operated by a team with decades of hands-on experience in the Texas construction market, they handle the full scope of the built environment — ground-up custom homes, residential renovations and remodels, commercial build-outs, office spaces, retail interiors, and industrial facilities. What separates Houston Enterprise from the fragmented subcontractor networks that dominate the Houston construction market is their self-performing model: the crews that show up are their crews. That means tighter timelines, cleaner quality control, and a single point of accountability for every client through every phase of a project.\n\nTheir reputation is built largely on word-of-mouth referrals across Houston's homeowner and commercial developer community — a testament to the quality of their finished work. Their portfolio spans neighborhoods from Memorial to Sugar Land, from Cypress to Pearland, and their client roster includes both first-time homeowners doing their first major renovation and commercial developers managing multi-unit buildouts. Houston Enterprise came to Atlas Houston ready to match their digital presence to the caliber of their physical work.",
    stats: [
      { value: "Page 1", label: "Houston construction keywords" },
      { value: "60 days", label: "To first inbound form leads" },
      { value: "40+", label: "Local citations built" },
      { value: "0", label: "Downtime since launch" },
    ],
    leadGen: [
      "'Get a Free Estimate' CTA engineered above the fold on every service page — not buried in a contact page",
      "Project type qualifier on the contact form (residential / commercial / industrial) routes leads to the right team member with full context",
      "Click-to-call phone number embedded in mobile sticky header — most construction referrals arrive on mobile and convert via call",
      "Gallery pages double as conversion pages: completed project photos link to relevant service pages with embedded CTAs",
      "Lead response automation: form submissions trigger immediate email notification to the sales team with full inquiry details",
    ],
    challenge:
      "Despite years of quality work and a growing portfolio of completed projects across the Houston metro, Houston Enterprise had effectively zero digital presence when they came to Atlas Houston. In a market where homeowners Google contractors before picking up the phone — and where commercial developers vet firms by their online credibility before agreeing to a meeting — being invisible was costing them real revenue. Competitors with inferior work but stronger websites were winning bids before Houston Enterprise even had a chance to compete.\n\nThe construction search market in Houston is highly competitive: queries like 'commercial construction contractor Houston' and 'home renovation Houston' drive substantial traffic at high commercial intent, and ranking for them requires both technical SEO infrastructure and genuine content depth. The challenge was not only technical but communicational. Houston Enterprise's value proposition — self-performing crews, full service breadth from residential remodels to industrial projects, and deep Houston market knowledge — wasn't being communicated anywhere. The goal was to build a digital presence that matched the quality of their physical work and captured the leads their reputation deserved.",
    whatWeBuilt: [
      "Full custom website built from scratch on a modern TypeScript stack — no WordPress, no page builders, no templates that constrain the design or create performance overhead",
      "Multi-section service architecture covering residential (custom builds, renovations, remodels), commercial (office spaces, retail fit-outs, industrial), and specialty project categories — each with dedicated landing pages",
      "Full-bleed project gallery with before/after photography system — showcasing the breadth of completed work with high-resolution imagery",
      "Admin CMS enabling the Houston Enterprise team to upload new project photos and update content without developer involvement",
      "Mobile-first responsive layout engineered for the referral traffic pattern — most construction leads arrive on mobile from a word-of-mouth recommendation",
      "Service area coverage pages for key Houston neighborhoods and surrounding municipalities: The Woodlands, Katy, Sugar Land, Pearland, Cypress, and Conroe",
      "Team and credentials section clearly establishing the self-performing crew model and the firm's combined years of Houston construction experience",
      "Contact form with project type qualifier, budget range, and timeline fields — generating qualified leads with full context for the sales team",
    ],
    techHighlights: [
      "Modern TypeScript web stack — zero WordPress overhead, no plugin vulnerabilities, no page-builder bloat",
      "Cloudflare edge deployment achieving sub-200ms TTFB across the Texas region",
      "Image optimization pipeline for before/after gallery assets: WebP delivery, responsive srcset, progressive loading",
      "Custom HTTP security headers: HSTS, X-Frame-Options, CSP, and Referrer-Policy — clean security posture with no mixed content",
      "Automated daily encrypted backups with under 1-hour recovery objective — the site never goes down during active project seasons",
      "Admin CMS for self-managed project uploads and content updates without requiring developer involvement",
      "Contact form with server-side validation, spam filtering, and immediate email notification to sales team",
    ],
    seoWork: [
      "Complete technical SEO audit and build-time remediation: canonical tags, XML sitemap, robots.txt configuration, hreflang verification, Core Web Vitals optimization before a single page went live",
      "LocalBusiness, Contractor, and HomeAndConstructionBusiness schema markup across all service pages — enabling rich result eligibility and entity recognition by Google and LLMs",
      "Location-specific service pages for Houston proper, The Woodlands, Katy, Sugar Land, Pearland, Cypress, and Conroe — capturing neighborhood-level search intent at scale",
      "Google Business Profile claimed, fully optimized, and managed monthly: service area configuration, category taxonomy, photo upload cadence, review response strategy, and seasonal promotional posts",
      "Citation building across 40+ construction-specific and local business directories including BBB, Houzz, Angi, HomeAdvisor, local chambers of commerce, and Houston contractor associations",
      "Core Web Vitals tuned to 90+ on all four Lighthouse categories: Performance, SEO, Accessibility, and Best Practices",
      "Internal link graph engineered to distribute authority between residential and commercial service verticals — ensuring Google understands the full scope of capabilities",
      "Monthly rank tracking for 50+ target keywords across Houston residential and commercial construction categories — with quarterly content refreshes tied to performance data",
    ],
    resultDetails: [
      "Page 1 rankings achieved for targeted Houston residential and commercial construction keyword categories",
      "Consistent inbound lead flow through contact form — measurable within 60 days of launch",
      "Zero downtime since launch date under managed hosting infrastructure",
      "Client self-manages project gallery and seasonal content updates via the CMS without developer involvement",
      "Google Business Profile ranking in local pack for primary construction + neighborhood query combinations",
      "40+ local citations built across construction and home services directories — supporting local SEO authority",
    ],
  },
  {
    slug: "hou-gen-pros",
    name: "HOU GEN PROS",
    domain: "hougenpros.com",
    image: "/hougenpros.png",
    url: "https://www.hougenpros.com",
    industry: "Power Solutions",
    year: "2024",
    tags: ["Web Design", "Local SEO", "Managed Hosting", "CMS"],
    headline: "Whole-home backup power when Houston needs it most.",
    description:
      "HOU GEN PROS is Houston's premier Generac-authorized dealer — specializing in same-day standby generator installation in 3–5 hours, with 500+ completed installs across Texas. We built their conversion-optimized site to capture high-intent emergency and planned power queries.",
    outcome:
      "Lead-generating site with real-time quote forms, product pricing pages, and strong local SEO performance for Houston generator installation searches.",
    color: "#c2410c",
    initials: "HGP",
    about:
      "HOU GEN PROS is Houston's premier Generac-authorized dealer for residential and commercial standby generator installation. Founded by a team with deep roots in the Texas power solutions market, they specialize in fast, professional whole-home and whole-business backup power — completing most residential installations in just 3–5 hours on the day of service. With 500+ completed installs across the Houston metro and surrounding Texas communities, HOU GEN PROS has built a reputation for reliability in a market that tests reliability on a near-annual basis.\n\nHouston's history with extreme weather — Hurricane Harvey, Winter Storm Uri, and the ongoing subtropical storm seasons — has created sustained demand for standby generator systems that goes far beyond the storm-season spike. HOU GEN PROS recognized early that the real opportunity was in serving both the emergency buyer (calling during a power outage) and the planned buyer (researching after a scare), and built their business model around being available for both. As a Generac Sales & Service (GS8) authorized dealer, they carry the full Generac residential and commercial product lineup and their technicians are factory-trained and certified.",
    stats: [
      { value: "4.2×", label: "Organic traffic in 6 months" },
      { value: "Page 1", label: "Generator installation keywords" },
      { value: "500+", label: "Completed installs supported" },
      { value: "24/7", label: "AI-assisted lead capture" },
    ],
    leadGen: [
      "'Get a Free Generator Quote' form with home size, preferred generator model, and installation timeline fields — routes to sales team with full context for a same-day response",
      "Emergency response form with SMS routing to the on-call technician — same-day service for storm-event inquiries",
      "Click-to-call prominently placed in mobile header and a persistent mobile sticky footer — critical for the emergency buyer who converts via phone",
      "Automated post-form email sequence delivers generator sizing guide and financing options within minutes — keeps the lead warm before sales contact",
      "Financing CTA integration positioned directly after the pricing section — presenting 0% APR options significantly reduces price objection and increases average ticket size",
    ],
    aiAutomation: [
      "AI chat agent deployed on the website for after-hours emergency inquiries — qualifies leads with home size, zip code, and urgency level before routing to the on-call technician via immediate SMS alert",
      "Chat agent configured to distinguish emergency buyers (during storm events, active outage) from planned buyers (researching after a scare) and respond with appropriate urgency and information",
      "Automated quote follow-up email sequence triggered on form submission — sends generator sizing calculator and financing information within minutes regardless of time of day",
      "Lead scoring logic that flags storm-event submissions (volume spike + after-hours timing) for immediate escalation — ensuring no emergency lead goes uncontacted for more than 15 minutes",
    ],
    challenge:
      "Generator installation searches in Houston are uniquely high-urgency. Most conversions happen inside a narrow window — during or immediately after a major storm or extended power outage, when homeowners are frustrated, scared, and searching frantically. The site needed to perform in that exact condition: fast enough to load on any mobile network, credible enough to win trust in the first three seconds, and clear enough to convert visitors who had never purchased a generator and needed both guidance and reassurance.\n\nHOU GEN PROS was competing against national big-box retailers, regional HVAC companies offering generator installation as an upsell, and franchise networks with substantially larger advertising budgets. Winning in this environment required absolute local SEO dominance — ranking not just for 'generator installation Houston' but capturing every neighborhood-level and emergency-intent variation of that query, with the Generac authorized dealer credential front and center as a differentiating trust signal.\n\nThere was also a customer education challenge: most homeowners don't know what size generator they need, don't understand the difference between a standby and a portable unit, and have significant sticker shock at the full installed cost before they understand the value. The site needed to be an educational resource as much as a commercial one — and to convert that education into qualified estimate requests.",
    whatWeBuilt: [
      "Conversion-focused landing architecture with 'Get a Quote' CTA above the fold on every entry point — no scrolling required to begin the conversion journey",
      "Generator product pages with home-size-based sizing guides, power requirement calculators, and transparent pricing ranges — addressing the education need before the sales conversation",
      "Emergency installation landing page specifically designed for storm-season traffic spikes: fast-loading, single-CTA, zero distracting elements — optimized for the panic buyer",
      "Service area coverage pages for all Houston metro neighborhoods and surrounding communities: The Woodlands, Katy, Sugar Land, Pearland, Conroe, Baytown, League City, Galveston, and Friendswood",
      "Generac authorized dealer badge integration and manufacturer partnership credential section — displayed prominently as the primary trust signal",
      "Review aggregation section combining Google and Generac dealer network reviews — social proof from both channels",
      "Photo gallery of completed residential and commercial installations by generator model and home type",
      "Generator comparison tool helping homeowners choose between 7kW, 10kW, 16kW, 18kW, 20kW, and 22kW Generac models based on their power requirements",
    ],
    techHighlights: [
      "Sub-2s page load on mobile — critical for storm-distressed users",
      "Click-to-call and form routing for 24/7 emergency inquiries",
      "Cloudflare edge with automatic scaling for traffic spikes",
      "Custom CMS for team to update generator availability and pricing",
      "Security hardening against form spam and bot traffic",
    ],
    seoWork: [
      "Full local SEO architecture targeting Houston, The Woodlands, Katy, Sugar Land, Pearland, Conroe, Baytown, League City, and 15+ additional neighborhood-level pages",
      "Product and Service schema for all Generac generator SKUs — including model numbers, power output, pricing ranges, and installation service specifications",
      "Generac GS8 authorized dealer markup and structured data — establishing the manufacturer-credential entity relationship in Google's knowledge graph",
      "Emergency keyword targeting strategy: 'same-day generator install Houston,' 'generator installation during storm,' 'emergency backup power Houston,' 'Generac dealer near me'",
      "Google Business Profile claimed, optimized, and managed monthly with storm-season posting cadence, photo uploads, and proactive review management",
      "Citation building across home services directories: Angi, HomeAdvisor, Houzz, Thumbtack, Nextdoor Business, BBB, and Generac's own dealer locator",
      "Review generation system integrated into the post-installation customer communication flow — systematic asks producing consistent new reviews",
      "Core Web Vitals maintained at 90+ to ensure no ranking penalty during the high-traffic storm periods when rankings matter most",
    ],
    resultDetails: [
      "Page 1 rankings for primary Houston generator installation keyword categories within 90 days of launch",
      "4.2× organic traffic increase in the 6 months following launch",
      "Qualified lead volume spikes measurably during Texas storm and weather events",
      "Quote form converting at above-industry-benchmark for the home services category",
      "Generac authorized dealer landing page driving referral traffic from manufacturer channel and dealer locator",
      "AI chat agent capturing after-hours emergency leads that would previously have gone to competitors",
    ],
  },
  {
    slug: "svr-law-firm",
    name: "SVR Law Firm",
    domain: "svrlawfirm.com",
    image: "/svrlawfirm.png",
    url: "https://www.svrlawfirm.com",
    industry: "Legal Services",
    year: "2023",
    tags: ["Web Design", "Multilingual SEO", "Security", "Managed Hosting"],
    headline: "Personal injury & criminal defense — in three languages.",
    description:
      "SVR Law is a Houston-based personal injury and criminal defense firm with a unique differentiator: full trilingual service in English, Spanish, and Vietnamese. We engineered a multilingual site architecture with hreflang implementation, practice-area schema, and attorney profile markup that reaches Houston's diverse legal market.",
    outcome:
      "Trilingual site with dedicated Vietnamese-language section, FAQPage schema, LocalBusiness markup, and free consultation CTAs generating qualified inbound leads across all three language markets.",
    color: "#1e3a2f",
    initials: "SVR",
    about:
      "SVR Law Firm is a Houston-based personal injury and criminal defense firm with a genuinely rare differentiator in the Texas legal market: full trilingual service across English, Spanish, and Vietnamese. Founded by attorneys who understand Houston's multicultural landscape at a deep level, SVR represents clients across personal injury (car accidents, truck accidents, slip and fall, workplace injuries), criminal defense (DWI, drug charges, assault, theft, juvenile matters), and immigration cases. The firm's reach extends beyond language proficiency into genuine cultural competency — their attorneys and staff communicate with clients in the language they are most comfortable in, which is a meaningful advantage in a city where over 40% of residents speak a language other than English at home.\n\nSVR Law operates in one of the most competitive and highest-spend legal advertising markets in the country. Houston personal injury firms spend millions annually on television, billboards, and pay-per-click advertising. SVR's strategy has never been to outspend those firms. It has been to outserve the communities those firms don't meaningfully reach — Houston's Vietnamese and Spanish-speaking populations — and to build a digital infrastructure that makes that advantage visible and accessible to the people who need it most.",
    stats: [
      { value: "3", label: "Language markets ranked simultaneously" },
      { value: "6", label: "Practice area categories on page 1" },
      { value: "#1–3", label: "Local pack for primary legal queries" },
      { value: "30+", label: "FAQ featured snippets captured" },
    ],
    aiAutomation: [
      "AI-powered chat agent deployed on the site for after-hours consultation intake — qualifies leads by practice area, situation description, and preferred language before routing to bilingual staff via next-business-day alert",
      "Chat responses configured in English, Spanish, and Vietnamese to match the site's trilingual architecture — no lead is lost because of a language barrier in the initial contact",
      "Automated follow-up sequence triggered on consultation form submission — sends 'What to expect' legal process guide in the client's preferred language within minutes",
      "Emergency criminal defense intake routing: after-hours form submissions for active arrest or criminal charge situations trigger immediate SMS to the on-call attorney for same-night response",
    ],
    socialMedia: [
      "Monthly Facebook and Instagram content management targeting Houston's Spanish-speaking and Vietnamese-speaking communities with know-your-rights content, case outcome highlights, and free consultation CTAs",
      "LinkedIn presence management for the firm's professional network: attorney spotlights, practice area educational content, and referral network outreach to Houston's medical, insurance, and business communities",
      "Bilingual social content calendar — English posts for general Houston audience, Spanish posts for the Southwestern Houston and Gulfton communities, and targeted content for the Vietnamese community in the Midtown and Spring Branch areas",
      "Review generation campaign integrated with case resolution workflow — multilingual review request templates sent at case close, systematically building the firm's Google and Avvo profiles",
    ],
    leadGen: [
      "Free consultation form on every practice area page with language preference field and case type routing — Spanish and Vietnamese inquiries automatically flagged for bilingual staff",
      "Click-to-call with phone number visible above the fold in all three language versions — the primary conversion pathway for personal injury and criminal defense (most clients call first)",
      "'Free case evaluation' CTA persistent in the mobile header on every page — zero friction from discovery to contact",
      "AI chat agent qualifying leads after business hours — captures name, situation summary, and preferred language, ensuring no inquiry is missed overnight",
      "Emergency criminal defense inquiry pathway: dedicated after-hours form with immediate SMS routing to on-call attorney for active arrest situations",
    ],
    challenge:
      "Houston's legal SERP is among the most competitive in the country. Major personal injury firms spend $50,000–$150,000 per month on Google Ads alone. Competing against that level of paid spend requires a fundamentally different strategy — one built on organic authority, structured data, and hyperlocal relevance rather than budget dominance.\n\nSVR Law's competitive advantage was clear: genuine, full-service trilingual representation for Houston's Vietnamese and Spanish-speaking communities. No major firm in the Houston market was truly serving those communities at the same level. The challenge was building a technical and content infrastructure that made that advantage discoverable — so that a Spanish-speaking accident victim or a Vietnamese-speaking family facing a criminal charge could find SVR Law when they needed help.\n\nThe existing site had no multilingual architecture, no hreflang implementation, no schema markup, and a Lighthouse performance score that reflected years of neglect. More critically, the site didn't communicate SVR's core value proposition clearly to any of its three target audiences. The rebuild wasn't just a redesign — it was a complete rethinking of how a multilingual law firm should present itself in the most competitive local search market in Texas.",
    whatWeBuilt: [
      "Full custom trilingual website with separate English, Spanish (/es/), and Vietnamese (/vi/) URL subdirectories — each version independently indexable, properly structured, and culturally adapted (not machine-translated)",
      "hreflang tag implementation across all three language versions on every page and in the XML sitemap — ensuring Google serves the correct language version to each searcher's locale",
      "Practice area pages for every service line: personal injury, car accidents, truck accidents, slip and fall, workplace injury, DWI defense, criminal defense, immigration — with dedicated pages per language",
      "Attorney profile pages with bar admission details, case-type specialization, language capabilities, and professional photography — establishing E-E-A-T signals at the individual attorney level",
      "Free consultation forms with language preference routing — Spanish and Vietnamese inquiry forms are automatically flagged and routed to the appropriate bilingual staff member",
      "Case results and testimonial sections per practice area — jurisdiction-specific social proof organized by injury type and outcome",
      "Comprehensive FAQ section in all three languages structured for FAQPage schema markup and featured snippet capture — addressing the most common questions for each practice area",
      "Mobile-first responsive design prioritizing fast load times and thumb-friendly navigation — critical for a demographic where mobile is the primary device for legal research",
    ],
    techHighlights: [
      "Multilingual URL architecture: /es/ and /vi/ subdirectories",
      "HTTPS with HSTS headers — critical for legal compliance trust signals",
      "Form honeypots and CAPTCHA to block spam leads",
      "Cloudflare WAF rules for legal site security requirements",
      "Load time <1.5s — fast for any connection quality in the market",
    ],
    seoWork: [
      "LegalService, Attorney, LawFirm, and LocalBusiness schema across all practice area pages — complete entity graph for the firm, its attorneys, and their specializations",
      "FAQPage schema for the most common personal injury and criminal defense questions in English and Spanish — driving featured snippet appearances for high-intent legal queries",
      "hreflang implementation at both page-level meta tag and XML sitemap level — the technical dual-signal Google requires for reliable multilingual indexing",
      "Local SEO targeting Harris County, Houston proper, and surrounding communities: Pasadena, Galveston, Baytown, The Woodlands, Katy, and Sugar Land",
      "Citation building across legal-specific directories: Avvo, Justia, FindLaw, Martindale-Hubbell, Super Lawyers, Lawyers.com, and HG.org",
      "Google Business Profile managed monthly: practice-area category taxonomy, bilingual Q&A responses, photo and team updates, and proactive response to every review in the reviewer's language",
      "Competitive keyword targeting in English ('car accident lawyer Houston,' 'criminal defense attorney Houston') and Spanish ('abogado de accidentes Houston,' 'defensa criminal Houston')",
      "Core Web Vitals tuned to 90+ across all Lighthouse categories in all three language versions — maintaining performance standards across the multilingual architecture",
    ],
    resultDetails: [
      "Page 1 rankings achieved across all three language markets within 6 months of launch",
      "Google correctly indexing and serving all three language versions to the appropriate audience by locale and language preference",
      "Free consultation form generating qualified leads in English, Spanish, and Vietnamese",
      "Attorney profiles appearing in attorney-specific Google knowledge panels for primary practice area queries",
      "FAQPage schema driving 30+ featured snippet appearances for practice area questions across English and Spanish search",
      "Strong Google Business Profile presence in local pack for Houston legal searches across personal injury and criminal defense categories",
    ],
  },
  {
    slug: "blutouch-pools",
    name: "BluTouch Pools",
    domain: "blutouchpools.com",
    image: "/blutouchpools.png",
    url: "https://www.blutouchpools.com",
    industry: "Luxury Pool Construction",
    year: "2024",
    tags: ["Web Design", "Local SEO", "CMS", "Managed Hosting"],
    headline: "Luxury custom pools. Modern build. Affordable price.",
    description:
      "BluTouch Pools designs and constructs luxury custom swimming pools and spas for Houston homeowners. With a 4.8-star rating across 55 reviews, owner Gary's direct-relationship model needed a site that communicated premium quality, speed (6-week builds), and transparent pricing. We delivered exactly that.",
    outcome:
      "Portfolio-forward site with 3D render showcases, review integration, and local SEO for Houston pool construction keywords — driving consistent free-estimate requests from high-intent homeowners.",
    color: "#0369a1",
    initials: "BTP",
    about:
      "BluTouch Pools is a Houston-based luxury custom pool and spa builder that has built its reputation on one principle: treat every pool like it's going in your own backyard. Owner Gary is personally involved in every project from design consultation through final inspection — a direct-ownership model that is vanishingly rare in a construction category where most work is brokered through subcontractors at multiple layers of remove from the original sale.\n\nWith a 4.8-star average across 55+ Google reviews and an average project completion time of 5–6 weeks (versus the 10–16 week industry norm), BluTouch competes credibly against companies three times their size. Their builds include custom in-ground pools, resort-style spa installations, outdoor kitchen and entertainment areas, and pool renovation projects across Houston's most active construction neighborhoods: the Heights, Memorial, Sugar Land, Katy, The Woodlands, and Pearland. Homeowners who choose BluTouch are choosing Gary's direct involvement, faster completion, and the personal accountability of a small, expert team over the marketing firepower of the larger regional builders.",
    stats: [
      { value: "4.8★", label: "Across 55+ Google reviews in SERP" },
      { value: "+218%", label: "Organic traffic year-over-year" },
      { value: "Page 1", label: "Pool construction keywords across 6 locations" },
      { value: "5–6 wks", label: "Average build completion featured on-site" },
    ],
    socialMedia: [
      "Instagram account management featuring completed project photography, time-lapse build video content, and homeowner testimonial clips — the highest-performing content format for luxury home services",
      "Facebook content management targeting Houston homeowner audiences with seasonal pool content, project showcases, promotions, and Gary's personal brand voice",
      "Content calendar aligned with Houston's pool planning season: January through April, when homeowners begin planning for summer installs and competition for their attention is highest",
      "Before/after transformation content series — the single highest-performing content type for pool builders on social media, consistently driving profile visits and website clicks",
      "Review amplification strategy: featuring 5-star Google reviews as social content to extend the reach of the 4.8-star reputation across every social channel",
    ],
    leadGen: [
      "Free estimate form with project type qualifier, approximate budget range, and HOA approval status fields — generates leads with context that the sales team can act on immediately",
      "Financing CTA positioned immediately after the pricing transparency section to capture high-intent visitors who might otherwise defer a purchase decision on budget grounds",
      "Click-to-call in mobile header — most luxury pool inquiry conversions happen on mobile, often during or after a neighbor's pool walkthrough or after seeing a completed project",
      "Portfolio as a lead generation engine: each gallery image links to a project detail page with a 'Start Your Build' CTA — converting visual browsers into qualified inquiries",
      "Seasonal urgency landing pages: 'Book your build now for May/June completion' — creating genuine, timeline-based urgency for buyers in the January–March planning window",
    ],
    challenge:
      "The Houston luxury pool market is intensely visual, trust-driven, and dominated by larger companies with polished marketing budgets and years of established online authority. Homeowners spending $60,000–$150,000 on a custom pool do extensive, extended research — they look at portfolios, read reviews, compare timelines and pricing, and ultimately make a trust decision as much as a price decision. BluTouch's work was significantly better than their digital presence suggested, and the gap between the quality of their pools and the quality of their online presence was costing them real leads.\n\nThe business was growing purely on word-of-mouth and referrals, which meant there was a substantial untapped opportunity in capturing search traffic from homeowners who hadn't been referred but were actively researching Houston pool builders. The strategy was to build a digital presence strong enough to compete on the visual and trust dimensions — portfolio photography front and center, the 4.8-star rating made impossible to miss, and Gary's direct-owner model positioned as the differentiator it actually is.",
    whatWeBuilt: [
      "Premium portfolio-first website design with full-bleed project photography as the primary conversion driver — every visitor's first experience is seeing the quality of the finished work",
      "Pool type pages covering every service: custom in-ground builds, spa and hot tub construction, pool renovation and remodeling, outdoor kitchen and entertainment areas, equipment upgrades",
      "Design process walkthrough section demystifying the pool build journey from consultation through excavation, gunite, plaster, equipment installation, and final inspection in 5–6 weeks",
      "Review and rating display section showcasing real Google reviews with star ratings — Gary's 4.8-star track record presented as prominently as the portfolio",
      "Financing options section addressing the most common purchase objection — presenting 12 and 24-month payment plans for qualifying homeowners to reduce price-driven deferral",
      "Free estimate form with project type, approximate budget, and HOA approval status qualifier fields",
      "Service area section with neighborhood-specific pages for Houston, Katy, Sugar Land, The Woodlands, Pearland, Memorial, and the Heights",
      "Photo gallery CMS enabling Gary to upload new completed project photos with a single drag-and-drop interface — no developer needed between project completion and website update",
    ],
    techHighlights: [
      "High-performance image loading for large portfolio photos",
      "Custom gallery CMS — Gary uploads new project photos himself",
      "Cloudflare CDN for fast delivery of image-heavy pages",
      "Mobile-optimized gallery for homeowners browsing on phones",
      "Schema markup enabling star ratings in Google search results",
    ],
    seoWork: [
      "LocalBusiness and HomeAndConstructionBusiness schema across all service pages",
      "AggregateRating schema for 4.8 stars across 55+ reviews — displaying star ratings directly in Google search results before the visitor even clicks",
      "Dedicated service pages for all pool categories: custom pools, spa construction, pool renovation, outdoor kitchens, and pool equipment upgrades",
      "Location-specific pages targeting Houston, Katy, Sugar Land, The Woodlands, Pearland, Memorial, and the Heights — capturing neighborhood-level search intent",
      "Google Business Profile managed monthly: project photo uploads (new completed pools added to GBP within days of project completion), seasonal promotional posts, and personal review response from Gary for every review",
      "Review generation system: automated post-project follow-up email sequence requesting Google and Houzz reviews — producing the consistent new review volume that sustains the 4.8-star average",
      "Citation building across pool and home contractor directories: Houzz, Pool Contractor Association, Angi, HomeAdvisor, BBB, Yelp, and local chamber listings",
      "Seasonal content strategy: 'best time to build a pool in Houston' content capturing early spring planning traffic — the highest-intent seasonal window before summer inventory fills",
    ],
    resultDetails: [
      "AggregateRating schema displaying 4.8 stars across 55+ reviews directly in Google search results — increasing click-through rate before the visitor reaches the site",
      "Page 1 rankings for Houston custom pool construction and pool renovation searches across 6 location targets",
      "+218% organic traffic year-over-year in the first 12 months",
      "Free estimate form driving consistent qualified homeowner leads throughout the spring and fall seasons",
      "Portfolio gallery cited by clients as the primary reason they chose BluTouch over competing bids",
      "Before/after social content series driving measurable profile visits and website referral traffic from Instagram",
    ],
  },
  {
    slug: "united-ccr",
    name: "United CCR",
    domain: "unitedccr.com",
    image: "/unitedccr.png",
    url: "https://www.unitedccr.com",
    industry: "Disaster Restoration",
    year: "2023",
    tags: ["Web Design", "Emergency SEO", "Security", "CMS", "Managed Hosting"],
    headline: "Respond. Recover. Restore.",
    description:
      "United CCR is a full-service disaster restoration contractor based in Cypress, TX — handling fire, water, storm damage, mold remediation, and post-disaster construction across Texas. With 50 combined years of experience and emergency response as a core offering, their site needed to perform under pressure.",
    outcome:
      "Emergency-response optimized site with click-to-call CTAs, structured service-area pages, LocalBusiness and Service schema, and 24/7 form routing — ranking for restoration keywords across the Houston metro and beyond.",
    color: "#b91c1c",
    initials: "UCCR",
    about:
      "United CCR is a full-service disaster restoration and reconstruction contractor based in Cypress, TX, serving the greater Houston metro area and surrounding Texas communities. With over 50 combined years of experience across their leadership and field teams, they handle the complete scope of property damage recovery: water damage and flood remediation, fire and smoke damage restoration, storm and wind damage repair, mold assessment and removal, and post-disaster reconstruction from cosmetic repair through full structural rebuild. They carry approvals from all major insurance carriers and maintain 24/7 emergency response availability — because property damage doesn't follow business hours.\n\nUnited CCR exists at a demanding intersection: their clients are never calling on a good day. When your home has two feet of water after a storm, or your kitchen is black with smoke damage, the company you call needs to earn your trust in the first 30 seconds. United CCR has built that trust across hundreds of Texas property restorations over two decades, and their team's technical certifications — including IICRC designations across water, fire, and mold restoration — back up every job they take.",
    stats: [
      { value: "Top 3", label: "Local pack for restoration keywords" },
      { value: "0 min", label: "Downtime during storm events" },
      { value: "24/7", label: "AI-assisted emergency intake" },
      { value: "6", label: "Metro counties with location pages" },
    ],
    aiAutomation: [
      "AI chat agent deployed for 24/7 emergency intake — handles initial damage assessment questions (damage type, square footage affected, current conditions) and collects contact information before immediately alerting the on-call project manager via SMS",
      "Emergency triage logic built into chat responses: active flood/fire/gas leak situations escalate to immediate human contact; non-emergency mold, odor, and moisture cases are queued for next-business-day scheduling",
      "Automated estimate follow-up sequence for non-emergency inquiries: sends insurance documentation checklist and claim process guide within minutes of initial contact — reducing the homeowner's anxiety about the restoration and insurance process",
      "Post-restoration customer follow-up automation: review request sequence triggered 30 days after project completion, when the homeowner has had time to fully appreciate the finished restoration",
    ],
    leadGen: [
      "24/7 emergency call CTA persistent in mobile sticky header — visible on every scroll position, on every page, always above the fold on mobile",
      "Emergency response form with SMS routing to on-call project manager — designed to deliver a response within minutes, not hours",
      "Insurance claim guidance landing pages with 'We work with your insurance carrier' as the primary CTA — significantly reducing the barrier for homeowners worried about the claims process before they call",
      "Direct insurance adjuster contact pathway — a unique B2B CTA targeting commercial property managers and insurance adjusters who need a reliable restoration partner for their clients",
      "Click-to-call tracking across all phone number instances — monitoring which pages, which times, and which traffic sources drive phone conversions to optimize the media mix",
    ],
    challenge:
      "Disaster restoration searches are the most time-pressured, high-stakes searches a homeowner will ever conduct. Someone searching 'water damage restoration Houston 24/7' at 2 AM has a crisis in progress. They will call the first credible result they find. There is no comparison-shopping session, no 'I'll think about it.' The site needed to perform in that exact moment — fast load on any network, phone number impossible to miss, credentials immediately visible, and an emergency response pathway that works whether the visitor can type or just tap a call button.\n\nUnited CCR was competing against national franchise brands — ServiceMaster, Belfor, SERVPRO — with established recognition, national advertising, and deep-pocketed marketing programs. The counter-strategy was hyper-local dominance: owning the local map pack and top organic positions for every county and neighborhood in the Houston metro, and communicating the 50 combined years of experience as a trust signal that no franchise network can manufacture.",
    whatWeBuilt: [
      "Emergency-first design architecture — 24/7 phone number above every fold, click-to-call as the single primary CTA, emergency contact form as the secondary pathway with no competing distractions",
      "Service pages covering the complete restoration scope: water damage, fire and smoke damage, storm and wind damage, mold remediation and testing, commercial property restoration, and post-disaster full reconstruction",
      "Service area pages for all six Houston metro counties: Harris, Fort Bend, Montgomery, Brazoria, Galveston, and Chambers — with neighborhood-level depth for each",
      "Insurance claim guidance section walking homeowners through the documentation and claims process step by step — reducing the anxiety of calling a restoration company and removing the primary source of lead drop-off",
      "Emergency response timeline section setting explicit expectations (2-hour emergency arrival, 24-hour full assessment, 72-hour remediation start) — building confidence at the most critical stage of the conversion",
      "Team credentials section: IICRC certifications, insurance carrier approval list, and the firm's 50 combined years of experience positioned prominently as the proof of competence",
      "Before/after photo documentation sections for each damage category — visual evidence of restoration quality across real project types",
    ],
    techHighlights: [
      "Sub-1.5s mobile load — critical for panic-driven search visits",
      "Click-to-call tracking for all phone number touchpoints",
      "24/7 form with SMS routing for immediate response",
      "Cloudflare edge with DDoS protection (critical during storm events)",
      "Automated daily backups with <1hr recovery objective",
    ],
    seoWork: [
      "LocalBusiness, EmergencyService, and HomeAndConstructionBusiness schema across all service pages — establishing the firm's emergency service entity in Google's knowledge graph",
      "Service schema for each restoration type with response-time claims and service area specifications",
      "Emergency keyword targeting at multiple urgency levels: 'water damage restoration Houston 24/7,' 'emergency flood cleanup near me,' 'fire damage restoration Houston same day,' 'mold remediation Cypress TX'",
      "Service area pages for all six metro counties with neighborhood-level keyword depth: Cypress, Spring, The Woodlands, Katy, Sugar Land, Pearland, League City, Galveston, Baytown, and Friendswood",
      "Google Business Profile managed with emergency hours configuration, all restoration service category attributes, systematic photo uploads of completed restorations, and proactive response to every Google review",
      "Citation building across restoration-specific directories: IICRC member directory, restoration association listings, insurance carrier contractor approval lists, and local home services directories",
      "Local map pack strategy resulting in top-3 placement for primary water damage and restoration queries across the metro",
      "Post-storm seasonal content strategy: blog content addressing Houston's specific disaster patterns — tropical flooding, freeze damage, hail and wind damage — published in advance of each season to capture traffic when it matters most",
    ],
    resultDetails: [
      "Top-3 local pack placement for water damage restoration and emergency service keywords across the Houston metro",
      "Site remained fully operational and performed at peak speed during major storm event traffic spikes — zero downtime when it mattered most",
      "24/7 emergency form and AI chat agent driving qualified leads at hours no competitor was capturing",
      "Service area pages capturing county-specific searches across all six Houston metro counties",
      "AI chat agent qualifying emergency leads outside business hours — converting inquiries that would otherwise have gone unanswered until the next business day",
    ],
  },
  {
    slug: "vargas-tax-services",
    name: "Vargas Tax Services",
    domain: "vargastaxservices.com",
    image: "/vargastaxservices.png",
    url: "https://www.vargastaxservices.com",
    industry: "Tax & Financial Services",
    year: "2024",
    tags: ["Web Design", "Local SEO", "CMS", "Managed Hosting"],
    headline: "Professional tax filing & financial services since 2010.",
    description:
      "Vargas Tax Preparation Services has served Houston individuals and small businesses with professional tax preparation since 2010. We designed and built their full web presence from scratch — positioning the firm's 14 years of Houston market experience against national chains and DIY software.",
    outcome:
      "Clean, trust-building site with service pages for individual and business tax filing, local SEO targeting Houston-area tax prep queries, and a free consultation CTA that drives appointment bookings.",
    color: "#064e3b",
    initials: "VTS",
    about:
      "Vargas Tax Preparation Services has served Houston individuals, families, and small businesses with professional, personalized tax preparation and financial services since 2010. Founded by a tax professional with deep roots in Houston's Southwest side and Sugar Land community, the firm has built its reputation on three things that national chains can't replicate: accuracy, personal service, and genuine bilingual access for Houston's large Spanish-speaking population.\n\nIn a market where H&R Block and TurboTax spend millions on advertising and rely on volume to drive revenue, Vargas Tax competes on relationship quality. Clients return year after year because their preparer knows their financial situation, remembers their name, and is reachable for questions throughout the year — not just between January and April. Services span individual tax filing (W-2, 1099, self-employed, gig economy), small business returns (S-Corp, LLC, sole proprietor), bookkeeping and financial management, ITIN application assistance for undocumented individuals navigating the US tax system, and year-round financial advisory consultations. The firm's 14+ years of uninterrupted Houston community service is its most compelling credential.",
    stats: [
      { value: "Page 1", label: "English & Spanish tax prep queries" },
      { value: "30+", label: "FAQ featured snippets captured" },
      { value: "2.8×", label: "Organic bookings during tax season" },
      { value: "Year-round", label: "Lead flow via educational content" },
    ],
    socialMedia: [
      "Facebook page management targeting Houston Southwest, Sugar Land, Stafford, and Missouri City communities with bilingual tax tips, IRS deadline reminders, and refund maximization guides — in both English and Spanish",
      "Seasonal content calendar: 20+ posts per month during tax season (January–April) covering IRS news, common deduction guidance, deadline reminders, and limited-time promotional offers for new clients",
      "Community-focused content strategy: Spanish-language posts for Houston's large bilingual audience, local small business spotlights, and community event participation — building the personal brand that differentiates a local firm from national chains",
      "Review amplification: featuring 5-star client reviews on Facebook to build social proof and encourage word-of-mouth referrals within the Southwest Houston community",
    ],
    aiAutomation: [
      "AI-powered appointment scheduling assistant deployed on the site — answers common tax questions, identifies service needs (individual vs. business vs. ITIN), and books preliminary consultation appointments directly into the calendar without requiring staff involvement",
      "Automated appointment reminder sequence: email and text reminders sent 48 hours and 2 hours before each scheduled appointment — reducing no-show rate significantly during peak season",
      "Post-filing follow-up automation: review request email sent 30 days after tax filing date, when clients have received their refund and are most satisfied",
      "Seasonal client blast automation: past-client IRS deadline reminder emails sent in January, early March, and April 1 with direct booking link — reactivating the existing client base at the highest-intent moment of the year",
    ],
    leadGen: [
      "Appointment booking form on every service page with service type qualifier, tax situation description, and contact method preference — generating scheduled appointments, not just inquiries",
      "Click-to-call and WhatsApp contact for Spanish-speaking clients who prefer messaging or voice over email",
      "'Get your maximum refund' CTA above the fold on all high-traffic seasonal landing pages — the single highest-converting promise in the tax preparation category",
      "Referral incentive landing page encouraging existing clients to refer neighbors, family members, and small business owners — formalizing the word-of-mouth engine that has always driven the firm's growth",
      "Year-round FAQ content as a passive lead generation engine: visitors finding tax information content convert to appointment bookings at a measurable rate across all 12 months",
    ],
    challenge:
      "Tax preparation is a market with fierce seasonal competition and highly specific, time-bound local search behavior. In January through April, Houston homeowners and small business owners actively search for tax preparers, and the searches carry immediate commercial intent — they are ready to book. The national chains dominate brand awareness, but they don't own the local map pack or the neighborhood-specific organic results. Those belong to whoever builds the best local SEO infrastructure. That's the opportunity Vargas Tax was positioned to capture.\n\nThe secondary challenge was bilingual reach. Over 40% of Houston's population speaks Spanish at home, and Vargas Tax is fully bilingual with deep roots in the Spanish-speaking Southwest Houston community. But their digital presence wasn't communicating that advantage. Spanish-speaking clients searching 'preparación de impuestos Houston' or 'taxes en español' weren't finding Vargas Tax with the prominence the firm deserved — because the site had no bilingual content architecture and no Spanish-language SEO structure.\n\nThe third challenge was seasonality: most tax firms only compete hard for four months per year, then go quiet. The opportunity was to build a year-round content engine — IRS news, tax law changes, small business financial guides — that drives consistent organic traffic and appointment bookings across all 12 months, not just the April sprint.",
    whatWeBuilt: [
      "Full custom bilingual website with English and Spanish content throughout — dedicated Spanish service sections, bilingual CTAs, and culturally adapted copy rather than literal translation",
      "Service pages for every offering: individual tax filing, self-employed and gig economy returns, small business tax preparation (S-Corp, LLC, sole proprietor), ITIN application, bookkeeping and monthly financial management, amended returns",
      "Seasonal landing page for the February–April peak: specific copy targeting 'file by April 15' urgency and 'maximum refund' messaging, optimized for the highest-traffic weeks of the firm's year",
      "Appointment booking form with service type, tax situation description, and preferred contact method — generating scheduled appointments with context, not anonymous inquiry submissions",
      "About section with founder story and 14+ years of Houston community service — the personal trust signal that differentiates the firm from any national chain",
      "Tax deadline and FAQ content hub: IRS key dates, extension rules, common deduction guides, small business tax calendar — a year-round SEO content engine generating consistent organic traffic",
      "Privacy policy and data security section with visible SSL and encryption disclosures — establishing the financial services trust signal for visitors handing over sensitive tax information",
    ],
    techHighlights: [
      "Lightweight, fast-loading design — appropriate for clients on mobile",
      "Custom CMS for seasonal promotions and deadline updates",
      "Contact form with email notifications for appointment requests",
      "Secure SSL with HSTS — critical for financial service trust signals",
      "Cloudflare managed hosting with 99.9% uptime during tax season peaks",
    ],
    seoWork: [
      "AccountingService and TaxPreparationService schema across all service pages — establishing entity-level recognition for the firm's services in Google's knowledge graph",
      "FAQPage schema for IRS deadlines, filing requirements, deduction eligibility, and common tax questions — driving 30+ featured snippet positions across English and Spanish search",
      "Bilingual keyword architecture: English targets ('tax preparer Houston,' 'CPA near me Houston,' 'small business taxes Houston') and Spanish targets ('preparación de impuestos Houston,' 'taxes en español Houston,' 'ITIN Houston')",
      "Location-specific pages for Southwest Houston, Sugar Land, Stafford, Missouri City, and Pearland — capturing neighborhood-level tax prep searches where national chains don't compete on organic",
      "Google Business Profile fully optimized with bilingual description, service attribute taxonomy for all filing types, seasonal promotional posts, and proactive review response in both English and Spanish",
      "Seasonal SEO timing aligned with IRS calendar: content and GBP posting calendar keyed to W-2 availability (January), filing deadline (April 15), and extension deadline (October 15)",
      "Citation building across financial services directories: BBB, Thumbtack, tax-specific directories, and local chamber of commerce listings",
      "Year-round educational content strategy: IRS news updates, Tax Cuts and Jobs Act implications, small business deduction guides — driving consistent informational traffic that converts to annual client relationships",
    ],
    resultDetails: [
      "Page 1 local rankings for Houston tax preparation searches in both English and Spanish within 3 months of launch",
      "Appointment form generating consistent client bookings throughout tax season — measurable 2.8× increase over the prior year's organic bookings",
      "Spanish-language content successfully reaching and converting bilingual Houston community — a previously untapped organic channel",
      "30+ FAQPage schema positions captured across English and Spanish tax-related search queries",
      "Google Business Profile ranked in local pack for primary tax prep queries in Southwest Houston and Sugar Land",
      "Year-round organic traffic via FAQ and educational content — non-seasonal lead flow from a business that previously had zero digital presence in off-season months",
    ],
  },
];
