// Greater Houston service-area data — drives /houston hub + /houston/$city pages.

export interface CityData {
  slug: string;
  name: string;
  shortName: string;
  region: string;
  population: string;
  zipPrefix: string;
  drive: string;
  geo: { lat: number; lng: number };
  intro: string;
  economy: string;
  whyUs: string;
  industries: { name: string; note: string }[];
  neighborhoods: string[];
  services: { title: string; blurb: string; href: string }[];
  caseStudy: { client: string; result: string; detail: string };
  faqs: { q: string; a: string }[];
}

const sharedServices = [
  {
    title: "Mobile Applications",
    blurb:
      "Native iOS, Android, and React Native apps built for field crews, customers, and back-office operators.",
    href: "/services/mobile-apps",
  },
  {
    title: "Websites & Web Apps",
    blurb:
      "Custom-engineered marketing sites, e-commerce stores, and customer portals that rank and convert.",
    href: "/services/websites",
  },
  {
    title: "Branding & Identity",
    blurb:
      "Naming, logo systems, packaging, signage, and brand voice tuned to your market and your customers.",
    href: "/services/branding",
  },
  {
    title: "Cloud, Hosting & Support",
    blurb:
      "Hardened multi-region infrastructure, 99.99% uptime, automated backups, and on-call engineering.",
    href: "/services/cloud-hosting",
  },
  {
    title: "Local SEO & GEO",
    blurb:
      "Technical SEO, Google Business Profile optimization, schema, and generative-engine visibility.",
    href: "/services/seo",
  },
];

export const cities: CityData[] = [
  {
    slug: "houston",
    name: "Houston",
    shortName: "Houston",
    region: "Inner Loop · Downtown · EaDo · Midtown",
    population: "2.3M residents · 7.5M metro",
    zipPrefix: "770xx · 772xx",
    drive: "Studio is on Navigation Blvd in EaDo — five minutes from Downtown.",
    geo: { lat: 29.7604, lng: -95.3698 },
    intro:
      "Houston is our home market. From a studio in EaDo, we power prestigious downtown law firms, River Oaks and Memorial physician groups, and Inner Loop operators with the same caliber of digital work our partner studio, Cardinal, ships nationally.",
    economy:
      "Houston anchors a $700B regional economy — energy, healthcare, aerospace, the Port of Houston, and a fast-scaling startup corridor. Owners here expect software that performs like the rest of their operation.",
    whyUs:
      "We are a senior in-town team. On-site discovery, weekly working software, and an engineer you can drive to meet — not a sales rep on a Zoom call from another time zone.",
    industries: [
      { name: "Energy & Industrial", note: "Upstream, midstream, oilfield services, EPC" },
      { name: "Healthcare", note: "Med Center clinics, specialty practices, telehealth" },
      { name: "Legal & Professional Services", note: "Downtown firms, corporate counsel" },
      { name: "Hospitality & Retail", note: "Restaurant groups, boutique retail, events" },
    ],
    neighborhoods: ["Downtown", "EaDo", "Midtown", "Heights", "Montrose", "Med Center", "River Oaks", "Memorial"],
    services: sharedServices,
    caseStudy: {
      client: "Bayou Logistics — Port of Houston freight broker",
      result: "Sub-150ms route updates · paperless BOL · 12 months zero downtime",
      detail:
        "Replaced a fragmented stack of spreadsheets and a legacy TMS with a native iOS driver app, dispatcher web console, and a hardened cloud platform we still operate.",
    },
    faqs: [
      {
        q: "Do you only work with Houston businesses?",
        a: "Most clients are within Beltway 8, but we serve all of Greater Houston and ship for owners across Texas. Our studio is in EaDo, which means on-site discovery for anyone in the metro.",
      },
      {
        q: "How fast can you start a project in Houston?",
        a: "Discovery typically begins within two weeks of a signed engagement. For retainer clients, support requests are picked up the same business day.",
      },
      {
        q: "Can you meet at our office downtown?",
        a: "Yes. We do on-site workshops across the Inner Loop and Med Center every week, and we host clients at the EaDo studio for kickoff and design reviews.",
      },
    ],
  },
  {
    slug: "sugar-land",
    name: "Sugar Land",
    shortName: "Sugar Land",
    region: "Fort Bend County · Southwest Houston",
    population: "118,000 residents · 800,000 in Fort Bend",
    zipPrefix: "774xx",
    drive: "22 minutes from EaDo via US-59 / I-69.",
    geo: { lat: 29.6196, lng: -95.6349 },
    intro:
      "Sugar Land is one of the fastest-growing affluent submarkets in Texas. We build for the construction firms developing shopping centers across Sugar Land and Riverstone, the MRI clinics and physician groups along US-59, and the professional services firms anchoring Fort Bend's expansion.",
    economy:
      "A $30B+ submarket anchored by First Colony, Telfair, and Riverstone master-planned communities. High household income, demanding consumers, and a heavy concentration of physician-owned practices and franchise multi-unit operators.",
    whyUs:
      "We understand Sugar Land's buyer — busy, brand-aware, mobile-first, and quick to leave for a competitor whose website loads first. Our builds are tuned to that audience.",
    industries: [
      { name: "Healthcare & Dental", note: "Multi-site physician groups, specialty practices" },
      { name: "Wealth Management & Legal", note: "Boutique firms serving Fort Bend families" },
      { name: "Multi-unit Retail & Restaurants", note: "Franchise operators, regional chains" },
      { name: "Engineering & Energy Services", note: "Subsidiaries and HQs along US-59" },
    ],
    neighborhoods: ["First Colony", "Telfair", "Riverstone", "Greatwood", "New Territory", "Sugar Creek"],
    services: sharedServices,
    caseStudy: {
      client: "Westheimer Dental Studio — multi-site practice",
      result: "+62% new-patient bookings · #1 'Sugar Land dentist' in 9 months",
      detail:
        "Rebrand, new patient-facing website, online booking integration, and a local SEO program targeting Sugar Land, Missouri City, and Richmond.",
    },
    faqs: [
      {
        q: "Do you serve dental and medical practices in Sugar Land?",
        a: "Yes. Healthcare is one of our largest verticals here — patient-facing websites, online intake, HIPAA-aware build practices, and local SEO targeting Fort Bend zip codes.",
      },
      {
        q: "Can you meet at our Sugar Land office?",
        a: "Yes. Discovery and on-site workshops in Sugar Land, Missouri City, and Richmond are part of our standard engagement.",
      },
      {
        q: "How do you handle local SEO for Sugar Land businesses?",
        a: "Google Business Profile optimization, location-page schema, citation cleanup across the major directories, and content tuned for Fort Bend search intent.",
      },
    ],
  },
  {
    slug: "the-woodlands",
    name: "The Woodlands",
    shortName: "The Woodlands",
    region: "Montgomery County · North Houston",
    population: "120,000 residents",
    zipPrefix: "773xx · 77380–77389",
    drive: "35 minutes from EaDo via I-45 North.",
    geo: { lat: 30.1658, lng: -95.4613 },
    intro:
      "The Woodlands is a corporate-headquartered submarket with luxury-market design expectations. We build for the energy HQs, boutique law and wealth firms, and concept restaurants that hold the standard up here.",
    economy:
      "Home to ExxonMobil, Huntsman, Anadarko's successor entities, and dozens of Tier-1 energy and healthcare firms. A market that expects executive-grade design and zero tolerance for cheap-looking software.",
    whyUs:
      "Senior, brand-aware execution. Every Woodlands engagement is led by a partner who has shipped at the enterprise level — the same standard of work without the enterprise overhead.",
    industries: [
      { name: "Energy Corporate HQs", note: "ExxonMobil and the upstream/midstream cluster" },
      { name: "Healthcare Systems", note: "Memorial Hermann, Houston Methodist North" },
      { name: "Wealth Management", note: "Family offices and boutique RIAs" },
      { name: "Hospitality & Wellness", note: "Concept restaurants, med-spas, fitness brands" },
    ],
    neighborhoods: ["Town Center", "Hughes Landing", "Creekside Park", "Grogan's Mill", "Panther Creek"],
    services: sharedServices,
    caseStudy: {
      client: "North Loop Capital — Woodlands-based real-estate syndicate",
      result: "Investor portal · 28% faster capital raise cycle",
      detail:
        "Full brand system, marketing site, and an investor portal with subscription docs, distribution reporting, and Plaid-backed funding flows.",
    },
    faqs: [
      {
        q: "Do you work with enterprise clients in The Woodlands?",
        a: "Yes. We have shipped for energy, healthcare, and financial clients in Town Center and Hughes Landing under both standalone engagements and as a senior partner to internal teams.",
      },
      {
        q: "Can you sign enterprise paperwork — MSAs, NDAs, vendor onboarding?",
        a: "Yes. We routinely complete enterprise vendor onboarding (including SOC2 and insurance certificates) for clients headquartered in The Woodlands.",
      },
      {
        q: "Do you do on-site discovery in The Woodlands?",
        a: "Yes. Weekly on-site visits in Town Center are standard for active Woodlands engagements.",
      },
    ],
  },
  {
    slug: "katy",
    name: "Katy",
    shortName: "Katy",
    region: "Fort Bend / Harris / Waller · West Houston",
    population: "23,000 city · 350,000+ in Katy ISD area",
    zipPrefix: "774xx · 77449, 77450, 77493, 77494",
    drive: "30 minutes from EaDo via I-10 West.",
    geo: { lat: 29.7858, lng: -95.8244 },
    intro:
      "Katy is the fastest-growing master-planned market west of Houston. We build for the home-services operators running fifty-truck fleets out here, the retail concepts opening along LaCenterra, and the medical groups serving Cinco Ranch families.",
    economy:
      "Cinco Ranch, Cross Creek Ranch, and Cane Island anchor one of the most demographically attractive submarkets in the US — high household income, large young families, and explosive demand for services.",
    whyUs:
      "Katy operators win on speed and trust. We build sites that load in under 1.5 seconds and brand systems that look like they belong on a billboard along the Grand Parkway.",
    industries: [
      { name: "Youth Sports & Activities", note: "Soccer, gymnastics, music, tutoring" },
      { name: "Home Services", note: "HVAC, roofing, pools, landscaping, remodelers" },
      { name: "Retail & Restaurants", note: "Katy Mills corridor, LaCenterra concepts" },
      { name: "Healthcare", note: "Pediatrics, family practice, urgent care" },
    ],
    neighborhoods: ["Cinco Ranch", "Cross Creek Ranch", "Cane Island", "Firethorne", "Old Katy", "Falcon Ranch"],
    services: sharedServices,
    caseStudy: {
      client: "HVAC Services Co. — 50-truck operation serving Katy + West Houston",
      result: "11-week rebuild · zero outages in 24 months · 50 trucks live",
      detail:
        "Field-ops app, dispatch console, and customer-facing portal for an HVAC operator running 200+ jobs per day across Katy, Fulshear, and Cypress.",
    },
    faqs: [
      {
        q: "Do you work with home-services companies in Katy?",
        a: "Yes — HVAC, roofing, pool, and landscaping operators are some of our core clients in the Katy market. Field-ops apps, dispatch tools, and lead-gen sites tuned to ServiceTitan-class operations.",
      },
      {
        q: "Can you build for high-growth retail concepts?",
        a: "Yes. We design and build for LaCenterra and Katy Mills tenants — brand systems, in-store digital touchpoints, and Shopify-backed e-commerce.",
      },
      {
        q: "Do you understand Katy ISD-driven seasonality?",
        a: "Yes. Most of our Katy clients have August/September and May/June peaks. We tune launches, campaigns, and infrastructure spend accordingly.",
      },
    ],
  },
  {
    slug: "pearland",
    name: "Pearland",
    shortName: "Pearland",
    region: "Brazoria / Harris · South Houston",
    population: "126,000 residents",
    zipPrefix: "775xx · 77581, 77584, 77588",
    drive: "25 minutes from EaDo via SH-288.",
    geo: { lat: 29.5636, lng: -95.2861 },
    intro:
      "Pearland has become a multi-billion-dollar suburban economy of its own. We build for the MRI clinics, dental groups, and physician practices anchored to Memorial Hermann Pearland, plus the property managers and consumer brands scaling along SH-288.",
    economy:
      "Anchored by Memorial Hermann Pearland, the Pearland Town Center corridor, and a heavy concentration of medical, dental, and ambulatory care. One of the highest-growth zip code clusters in Texas.",
    whyUs:
      "Pearland customers research everything on their phones first. We build mobile-first sites and portals that load instantly and convert without a salesperson on the line.",
    industries: [
      { name: "Healthcare & Dental", note: "Memorial Hermann ecosystem, OB-GYN, dental groups" },
      { name: "Property Management", note: "SFR portfolios, HOA management, multifamily" },
      { name: "Consumer Brands & Retail", note: "Pearland Town Center tenants and DTC operators" },
      { name: "Education", note: "Charter schools, tutoring, enrichment programs" },
    ],
    neighborhoods: ["Shadow Creek Ranch", "Silverlake", "Southern Trails", "Pomona", "Old Pearland"],
    services: sharedServices,
    caseStudy: {
      client: "Pearland Property Portal — 12,000-tenant operator",
      result: "Replaced 4 SaaS tools · 99.99% uptime · ACH-native rent",
      detail:
        "Tenant portal, maintenance ticketing, ACH rent, and a manager console that retired a multi-vendor stack for a portfolio operator across Pearland and Friendswood.",
    },
    faqs: [
      {
        q: "Do you build for medical and dental practices in Pearland?",
        a: "Yes. Patient-facing sites, online booking, secure messaging, and HIPAA-aware infrastructure for practices in and around the Memorial Hermann Pearland ecosystem.",
      },
      {
        q: "Can you build a tenant portal for our property portfolio?",
        a: "Yes — that's a recurring engagement type for us in Pearland. Maintenance ticketing, ACH rent, lease document workflows, and a manager console.",
      },
      {
        q: "Do you handle Google Business Profiles across our locations?",
        a: "Yes. Multi-location GBP setup, schema, reviews workflows, and local SEO are part of our standard support retainers.",
      },
    ],
  },
  {
    slug: "spring",
    name: "Spring",
    shortName: "Spring",
    region: "Harris / Montgomery · North Houston",
    population: "62,000 residents · 250,000+ in 77373/77379/77386/77389",
    zipPrefix: "773xx",
    drive: "30 minutes from EaDo via I-45 / Hardy Toll.",
    geo: { lat: 30.0799, lng: -95.4172 },
    intro:
      "Spring is where North Houston scales. We build for the apparel and clothing retailers opening flagship locations up here, the home-services and light-industrial operators running the northern arc, and the multi-site clinics serving Klein and Champions.",
    economy:
      "A mix of corporate satellites (HP, ExxonMobil adjacency), home services, light industrial, and rapidly expanding healthcare. Demand for line-of-business software and field-ready tools is high.",
    whyUs:
      "We build for owners who care more about whether the dispatch tool works at 6:30am than what it looks like on Dribbble. Then we make it look good anyway.",
    industries: [
      { name: "Home Services", note: "HVAC, plumbing, electrical, pest control" },
      { name: "Light Industrial", note: "Fabrication, distribution, equipment rental" },
      { name: "Healthcare", note: "Multi-site family practice, urgent care" },
      { name: "Corporate Satellites", note: "Tech and energy back-office operations" },
    ],
    neighborhoods: ["Klein", "Old Town Spring", "Champions", "Gleannloch Farms", "Augusta Pines"],
    services: sharedServices,
    caseStudy: {
      client: "Field-Ops Dispatch — North Houston home-services operator",
      result: "200 jobs/day · sub-second dispatch · 50% less paperwork",
      detail:
        "Replaced a paper-and-radio dispatch process with a native field app, real-time dispatcher console, and invoice-on-completion flow with Stripe.",
    },
    faqs: [
      {
        q: "Do you build field-ops software for Spring-based operators?",
        a: "Yes. Field apps, dispatch consoles, ELD-aware driver tools, and invoice-on-completion flows are recurring builds for us in the Spring/Klein/Champions corridor.",
      },
      {
        q: "Can you integrate with ServiceTitan, Housecall Pro, or our existing CRM?",
        a: "Yes. Most engagements include integrations with the operator's existing stack — we build around the tools you already pay for rather than ripping them out.",
      },
      {
        q: "Do you provide on-call support after launch?",
        a: "Yes. Retainer clients get same-business-day SLAs and an on-call engineer for after-hours outages.",
      },
    ],
  },
  {
    slug: "cypress",
    name: "Cypress",
    shortName: "Cypress",
    region: "Harris · Northwest Houston",
    population: "200,000+ in 77429 / 77433",
    zipPrefix: "77429 · 77433",
    drive: "35 minutes from EaDo via US-290.",
    geo: { lat: 29.9691, lng: -95.6972 },
    intro:
      "Cypress is the explosive Northwest Houston growth corridor — Bridgeland, Towne Lake, and a wave of new healthcare, retail, and restaurant development. We build for the operators and developers planting flags before the corridor fills out.",
    economy:
      "One of the fastest-growing master-planned belts in the country. Young families, high household income, and operators racing to plant flags before the corridor fills out.",
    whyUs:
      "Speed wins in Cypress — speed to market, speed of site, speed of response. Our engagements are built around shipping the launch version in weeks, then iterating live.",
    industries: [
      { name: "Healthcare & Pediatrics", note: "Pediatric, dental, OB-GYN, urgent care" },
      { name: "Home Services", note: "HVAC, roofing, pools, landscaping" },
      { name: "Retail & Restaurants", note: "Boardwalk, Towne Lake, Bridgeland concepts" },
      { name: "Education & Enrichment", note: "Cy-Fair ISD-adjacent operators" },
    ],
    neighborhoods: ["Bridgeland", "Towne Lake", "Cypress Creek Lakes", "Fairfield", "Coles Crossing"],
    services: sharedServices,
    caseStudy: {
      client: "Pediatric Group — Cypress + Tomball locations",
      result: "Mobile bookings up 4× · 30% drop in phone-call volume",
      detail:
        "Patient-facing site, online booking, and a parent app with vaccine records and refill requests for a pediatric group expanding across Northwest Houston.",
    },
    faqs: [
      {
        q: "Do you serve Bridgeland and Towne Lake operators?",
        a: "Yes. Several of our Cypress clients are master-planned-community-anchored operators — retail, healthcare, services — and we know the buyer profile well.",
      },
      {
        q: "How fast can a new Cypress business launch with you?",
        a: "Most launch-ready websites ship in 4–8 weeks. Field-ops apps and portals run 8–16 weeks depending on integrations.",
      },
      {
        q: "Do you handle Google Business Profile for multi-location operators?",
        a: "Yes — multi-location GBP, citations, schema, and review workflows are part of our standard local SEO program.",
      },
    ],
  },
  {
    slug: "missouri-city",
    name: "Missouri City",
    shortName: "Missouri City",
    region: "Fort Bend · Southwest Houston",
    population: "75,000 residents",
    zipPrefix: "77459 · 77489",
    drive: "30 minutes from EaDo via Beltway 8 / SH-6.",
    geo: { lat: 29.6186, lng: -95.5377 },
    intro:
      "Missouri City sits at the heart of one of the most diverse and economically active stretches of Fort Bend. We build for the construction firms developing along Riverstone, the medical and MRI clinics serving Sienna, and the professional brands operating Southwest Houston.",
    economy:
      "Anchored by Sienna, Riverstone, and Quail Valley. A high-income, professional, multi-cultural market with strong demand for healthcare, financial services, and lifestyle brands.",
    whyUs:
      "We build for buyers who research carefully and expect their digital experience to match the rest of their lives. Our engagements are deliberate, designed, and supported long after launch.",
    industries: [
      { name: "Healthcare & Specialty Medicine", note: "Multi-site practices, ambulatory care" },
      { name: "Financial & Insurance", note: "Independent advisors, agencies, planners" },
      { name: "Professional Services", note: "Legal, accounting, consulting" },
      { name: "Lifestyle Retail", note: "Boutique fitness, wellness, and dining" },
    ],
    neighborhoods: ["Sienna", "Riverstone", "Quail Valley", "Lake Olympia", "Hunters Glen"],
    services: sharedServices,
    caseStudy: {
      client: "Independent Wealth Advisor — Missouri City / Sugar Land",
      result: "Brand + site refresh · 3× qualified inbound leads",
      detail:
        "Full brand refresh, a marketing site engineered for compliance, and a Calendly-backed intake flow that increased qualified inbound by 3× in six months.",
    },
    faqs: [
      {
        q: "Do you work with financial advisors and RIAs in Missouri City?",
        a: "Yes. Compliance-aware marketing sites, secure intake, and brand systems for independent advisors and small firms across Fort Bend.",
      },
      {
        q: "Can you build multi-language sites for the Missouri City market?",
        a: "Yes. Bilingual and multi-language sites with hreflang, localized SEO, and translated brand voice are part of our standard offering.",
      },
      {
        q: "Do you understand the Sienna and Riverstone demographic?",
        a: "Yes — high-income, mobile-first, design-aware. Most of our Missouri City builds are tuned for that buyer profile.",
      },
    ],
  },
];

export const getCity = (slug: string) => cities.find((c) => c.slug === slug);
