import { useState, useEffect, useRef } from "react";
import { Link } from "@tanstack/react-router";
import {
  Search, CheckCircle, XCircle, AlertCircle, Globe, Loader2, ExternalLink,
  Code2, BarChart3, Shield, ArrowRight, RefreshCw, Zap, FileText,
  ChevronDown, ChevronUp, Brain, Download, ImageIcon, Link2,
} from "lucide-react";
import {
  RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
} from "recharts";
import { Reveal } from "@/components/site/Reveal";

// ─── Security ─────────────────────────────────────────────────────────────────

function isSafeUrl(url: string): { ok: boolean; reason?: string } {
  let parsed: URL;
  try { parsed = new URL(url); } catch {
    return { ok: false, reason: "Invalid URL format." };
  }
  if (!["http:", "https:"].includes(parsed.protocol)) {
    return { ok: false, reason: `Protocol "${parsed.protocol}" is not allowed.` };
  }
  if (parsed.username || parsed.password) {
    return { ok: false, reason: "URLs with embedded credentials are not allowed." };
  }
  const host = parsed.hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "::1" || host === "0.0.0.0") {
    return { ok: false, reason: "Loopback/localhost addresses are not allowed." };
  }
  if (host.endsWith(".local") || host.endsWith(".internal") || host.endsWith(".localhost")) {
    return { ok: false, reason: "Reserved TLD (.local/.internal/.localhost) is not allowed." };
  }
  const ipv4Match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const [, a, b, c] = ipv4Match.map(Number);
    if (a === 10 || (a === 172 && b >= 16 && b <= 31) || (a === 192 && b === 168) || (a === 169 && b === 254)) {
      return { ok: false, reason: "Private/reserved IP ranges are not allowed." };
    }
  }
  return { ok: true };
}

// ─── Types ────────────────────────────────────────────────────────────────────

interface CWVMetric { displayValue: string; score: number | null; }
interface SchemaItem { type: string; name?: string; }

interface SEOIssue {
  severity: "critical" | "warning" | "info";
  category: "technical" | "content" | "performance" | "schema" | "social";
  title: string;
  detail: string;
  fix: string;
}

interface AuditResults {
  url: string; strategy: "mobile" | "desktop";
  performance: number | null; seo: number | null;
  accessibility: number | null; bestPractices: number | null;
  fcp: CWVMetric | null; lcp: CWVMetric | null; cls: CWVMetric | null;
  tbt: CWVMetric | null; si: CWVMetric | null; inp: CWVMetric | null;
  title: string | null; titleLength: number;
  metaDescription: string | null; metaDescLength: number;
  duplicateMetaDesc: boolean; h1Count: number; h1First: string | null;
  h2Count: number; h3Count: number; canonical: string | null;
  robots: string | null; hasOG: boolean; hasOGImage: boolean;
  hasTwitterCard: boolean; isHttps: boolean; hasViewport: boolean;
  langAttr: string | null; hasHreflang: boolean; hasFavicon: boolean;
  hasPreconnect: boolean; imagesTotal: number; imagesMissingAlt: number;
  lazyImages: number; nofollowLinks: number; internalLinks: number;
  externalLinks: number; schemas: SchemaItem[]; isCrawlable: boolean | null;
  htmlOnly: boolean; wordCount: number; paragraphCount: number;
  urlLength: number; urlPath: string; issues: SEOIssue[];
  geoScore: number; geoChecks: { label: string; achieved: boolean }[];
  overallScore: number; overallGrade: "A+" | "A" | "B" | "C" | "D" | "F";
}

// ─── Utilities ────────────────────────────────────────────────────────────────

function scoreColor(score: number | null): string {
  if (score === null) return "#6b7280";
  if (score >= 0.9) return "#22c55e";
  if (score >= 0.5) return "#f97316";
  return "#ef4444";
}
function scoreLabel(score: number | null): string {
  if (score === null) return "N/A";
  if (score >= 0.9) return "Good";
  if (score >= 0.5) return "Improve";
  return "Poor";
}
function cwvStatus(key: string, raw: string): "good" | "needs-improvement" | "poor" {
  const n = parseFloat(raw.replace(/[^0-9.]/g, ""));
  if (isNaN(n)) return "good";
  const bands: Record<string, [number, number]> = {
    lcp: [2.5, 4.0], fcp: [1.8, 3.0], cls: [0.1, 0.25],
    tbt: [200, 600], si: [3.4, 5.8], inp: [200, 500],
  };
  const [good, poor] = bands[key] ?? [1, 2];
  if (n <= good) return "good";
  if (n <= poor) return "needs-improvement";
  return "poor";
}
function gradeColorHex(grade: string): string {
  if (grade === "A+" || grade === "A") return "#22c55e";
  if (grade === "B") return "#84cc16";
  if (grade === "C") return "#eab308";
  if (grade === "D") return "#f97316";
  return "#ef4444";
}

// ─── HTML Fetching ────────────────────────────────────────────────────────────

async function fetchHTML(url: string): Promise<string | null> {
  const timeout = 10000;
  try {
    const ctrl = new AbortController();
    const tid = setTimeout(() => ctrl.abort(), timeout);
    const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`, { signal: ctrl.signal });
    clearTimeout(tid);
    const data = await res.json();
    if (typeof data.contents === "string" && data.contents.length > 0) return data.contents;
  } catch {}
  try {
    const ctrl2 = new AbortController();
    const tid2 = setTimeout(() => ctrl2.abort(), timeout);
    const res2 = await fetch(`https://corsproxy.io/?${encodeURIComponent(url)}`, { signal: ctrl2.signal });
    clearTimeout(tid2);
    if (res2.ok) return await res2.text();
  } catch {}
  return null;
}

// ─── HTML Parser ──────────────────────────────────────────────────────────────

function parseHTML(html: string, baseUrl: string) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");
  let baseHost = ""; let urlPath = "/"; let urlLength = baseUrl.length;
  try {
    const u = new URL(baseUrl);
    baseHost = u.hostname; urlPath = u.pathname + u.search; urlLength = baseUrl.length;
  } catch {}

  const title = doc.querySelector("title")?.textContent?.trim() ?? null;
  const metaDescEls = [...doc.querySelectorAll('meta[name="description"]')];
  const metaDescription = metaDescEls[0]?.getAttribute("content")?.trim() ?? null;
  const duplicateMetaDesc = metaDescEls.length > 1;
  const h1Els = [...doc.querySelectorAll("h1")];
  const h2Count = doc.querySelectorAll("h2").length;
  const h3Count = doc.querySelectorAll("h3").length;
  const canonical = doc.querySelector('link[rel="canonical"]')?.getAttribute("href") ?? null;
  const robots = doc.querySelector('meta[name="robots"]')?.getAttribute("content") ?? null;
  const hasOG = !!doc.querySelector('meta[property="og:title"]');
  const hasOGImage = !!doc.querySelector('meta[property="og:image"]');
  const hasTwitterCard = !!doc.querySelector('meta[name="twitter:card"]');
  const hasViewport = !!doc.querySelector('meta[name="viewport"]');
  const langAttr = doc.documentElement.getAttribute("lang") ?? null;
  const hasHreflang = !!doc.querySelector('link[rel="alternate"][hreflang]');
  const hasFavicon = !!(doc.querySelector('link[rel="icon"]') || doc.querySelector('link[rel="shortcut icon"]') || doc.querySelector('link[rel="apple-touch-icon"]'));
  const hasPreconnect = !!doc.querySelector('link[rel="preconnect"]');
  const images = [...doc.querySelectorAll("img")];
  const imagesMissingAlt = images.filter(img => !img.getAttribute("alt") || img.getAttribute("alt")!.trim() === "").length;
  const lazyImages = images.filter(img => img.getAttribute("loading") === "lazy").length;
  const nofollowLinks = [...doc.querySelectorAll('a[rel*="nofollow"]')].length;
  const links = [...doc.querySelectorAll("a[href]")];
  let internalLinks = 0; let externalLinks = 0;
  for (const a of links) {
    const href = a.getAttribute("href") ?? "";
    if (href.startsWith("#") || href === "") continue;
    if (href.startsWith("http") || href.startsWith("//")) {
      try {
        const linkHost = new URL(href.startsWith("//") ? "https:" + href : href).hostname;
        if (linkHost === baseHost) internalLinks++; else externalLinks++;
      } catch { externalLinks++; }
    } else { internalLinks++; }
  }

  let wordCount = 0; let paragraphCount = 0;
  try {
    const bodyClone = doc.body.cloneNode(true) as HTMLElement;
    for (const tag of ["nav", "header", "footer", "script", "style", "noscript"]) {
      bodyClone.querySelectorAll(tag).forEach(el => el.remove());
    }
    wordCount = (bodyClone.textContent ?? "").split(/\s+/).filter(w => w.length > 2).length;
    paragraphCount = doc.querySelectorAll("p").length;
  } catch {}

  const schemas: SchemaItem[] = [];
  for (const script of doc.querySelectorAll('script[type="application/ld+json"]')) {
    try {
      const data = JSON.parse(script.textContent ?? "{}");
      const items: any[] = Array.isArray(data) ? data : data["@graph"] ? data["@graph"] : [data];
      for (const item of items) {
        const raw = item["@type"];
        if (!raw) continue;
        const type = Array.isArray(raw) ? raw[0] : raw;
        schemas.push({ type: String(type), name: item.name ?? item.headline ?? undefined });
      }
    } catch {}
  }

  return {
    title, titleLength: title?.length ?? 0, metaDescription,
    metaDescLength: metaDescription?.length ?? 0, duplicateMetaDesc,
    h1Count: h1Els.length, h1First: h1Els[0]?.textContent?.trim() ?? null,
    h2Count, h3Count, canonical, robots, hasOG, hasOGImage, hasTwitterCard,
    hasViewport, langAttr, hasHreflang, hasFavicon, hasPreconnect,
    imagesTotal: images.length, imagesMissingAlt, lazyImages, nofollowLinks,
    internalLinks, externalLinks, schemas,
    isHttps: baseUrl.startsWith("https"),
    wordCount, paragraphCount, urlLength, urlPath,
  };
}

// ─── Issues Engine ────────────────────────────────────────────────────────────

function buildIssues(data: ReturnType<typeof parseHTML> | null, performance: number | null, noindex: boolean): SEOIssue[] {
  const issues: SEOIssue[] = [];

  if (data && !data.isHttps) issues.push({ severity: "critical", category: "technical", title: "Site not served over HTTPS", detail: "The page is served over plain HTTP. Google uses HTTPS as a ranking signal and modern browsers flag HTTP sites as insecure.", fix: "Install an SSL/TLS certificate and configure a permanent 301 redirect from http:// to https://." });
  if (noindex || (data?.robots && data.robots.includes("noindex"))) issues.push({ severity: "critical", category: "technical", title: "Noindex directive detected", detail: "A noindex robots directive is present. This page will be excluded from Google's index and cannot rank.", fix: "Remove the noindex directive from the robots meta tag unless intentionally blocking this page." });
  if (data && !data.title) issues.push({ severity: "critical", category: "content", title: "Missing title tag", detail: "The page has no <title> element. The title tag is one of the most important on-page SEO factors.", fix: "Add a descriptive <title> tag (30–65 characters) that includes your primary keyword." });
  if (data && data.h1Count === 0) issues.push({ severity: "critical", category: "content", title: "No H1 heading found", detail: "The page has no H1 heading. The H1 is a primary content signal Google uses to understand your page topic.", fix: "Add exactly one H1 tag per page. Include your primary keyword." });
  if (performance !== null && performance < 0.5) issues.push({ severity: "critical", category: "performance", title: `Performance score critically low (${Math.round(performance * 100)}/100)`, detail: "A performance score below 50 indicates serious Core Web Vitals issues. Google uses CWV as a direct ranking factor.", fix: "Optimize LCP, reduce CLS, minimize TBT. Use a CDN, lazy loading, and next-gen image formats." });
  if (data && !data.hasViewport) issues.push({ severity: "critical", category: "technical", title: "Missing viewport meta tag", detail: "No viewport meta tag was found. Mobile browsers render the page at desktop width, harming mobile UX and SEO.", fix: 'Add <meta name="viewport" content="width=device-width, initial-scale=1"> to your <head>.' });

  if (data && !data.metaDescription) issues.push({ severity: "warning", category: "content", title: "Missing meta description", detail: "No meta description found. Descriptions appear in SERP snippets and heavily impact click-through rate.", fix: "Write a compelling meta description between 100–165 characters with a call to action." });
  if (data && data.title) {
    if (data.titleLength < 30) issues.push({ severity: "warning", category: "content", title: `Title tag too short (${data.titleLength} chars)`, detail: "Your title tag is shorter than 30 characters. Google may rewrite it.", fix: "Expand your title to 30–65 characters with your brand and primary keyword." });
    else if (data.titleLength > 65) issues.push({ severity: "warning", category: "content", title: `Title tag too long (${data.titleLength} chars)`, detail: "Your title exceeds 65 characters and will be truncated in search results.", fix: "Shorten your title to under 65 characters." });
  }
  if (data && data.metaDescription) {
    if (data.metaDescLength < 100) issues.push({ severity: "warning", category: "content", title: `Meta description too short (${data.metaDescLength} chars)`, detail: "Your meta description is under 100 characters. Google may replace it with auto-generated text.", fix: "Write a meta description of 100–165 characters." });
    else if (data.metaDescLength > 165) issues.push({ severity: "warning", category: "content", title: `Meta description too long (${data.metaDescLength} chars)`, detail: "Your meta description exceeds 165 characters and will be truncated.", fix: "Trim your meta description to under 165 characters." });
  }
  if (data && data.h1Count > 1) issues.push({ severity: "warning", category: "content", title: `Multiple H1 headings (${data.h1Count} found)`, detail: "More than one H1 dilutes the primary topic signal.", fix: "Use exactly one H1 per page. Convert extras to H2." });
  if (data && !data.canonical) issues.push({ severity: "warning", category: "technical", title: "No canonical URL set", detail: "Without a canonical tag, Google may index multiple URL variants as duplicates.", fix: 'Add <link rel="canonical" href="https://yourdomain.com/page"> to your <head>.' });
  if (data && !data.hasOG) issues.push({ severity: "warning", category: "social", title: "Missing Open Graph tags", detail: "No og:title was found. OG tags control how your page appears when shared on social platforms.", fix: "Add og:title, og:description, og:image, and og:url to your <head>." });
  if (data && data.hasOG && !data.hasOGImage) issues.push({ severity: "warning", category: "social", title: "Open Graph image missing", detail: "og:title is present but og:image is missing. Social shares will show no preview image.", fix: 'Add <meta property="og:image"> with an image at least 1200×630px.' });
  if (data && data.imagesMissingAlt > 0) issues.push({ severity: "warning", category: "content", title: `${data.imagesMissingAlt} image${data.imagesMissingAlt > 1 ? "s" : ""} missing alt text`, detail: "Images without alt text are invisible to screen readers and search engines.", fix: "Add descriptive alt attributes to all <img> elements." });
  if (data && !data.langAttr) issues.push({ severity: "warning", category: "technical", title: "Missing lang attribute on <html>", detail: "The <html> element has no lang attribute. Affects accessibility and international SEO.", fix: 'Add lang attribute: <html lang="en">.' });
  if (data && data.schemas.length === 0) issues.push({ severity: "warning", category: "schema", title: "No structured data / JSON-LD detected", detail: "No schema.org markup found. Structured data enables rich results and improves AI visibility.", fix: "Add JSON-LD structured data. Start with Organization, WebPage, or LocalBusiness schema." });
  if (data && data.wordCount > 0 && data.wordCount < 300) issues.push({ severity: "warning", category: "content", title: `Thin content detected (${data.wordCount} words)`, detail: "Pages with fewer than 300 words may not rank for competitive queries.", fix: "Expand your page content to at least 600–800 words." });
  if (data && data.urlLength > 100) issues.push({ severity: "warning", category: "technical", title: `URL too long (${data.urlLength} characters)`, detail: "Excessively long URLs are harder to share and may be truncated.", fix: "Shorten to under 75 characters. Use hyphens to separate words." });
  if (data && data.duplicateMetaDesc) issues.push({ severity: "warning", category: "technical", title: "Duplicate meta description tags detected", detail: "More than one meta description tag found. Only the first will be used.", fix: "Ensure only one meta description per page." });

  if (data && !data.hasTwitterCard) issues.push({ severity: "info", category: "social", title: "Missing Twitter / X card meta tags", detail: "No twitter:card meta tag found. X won't show image previews when shared.", fix: 'Add <meta name="twitter:card" content="summary_large_image">.' });
  if (data && !data.hasFavicon) issues.push({ severity: "info", category: "technical", title: "No favicon detected", detail: "No favicon link tag found. Favicons appear in browser tabs and search results.", fix: 'Add <link rel="icon" href="/favicon.ico"> to your <head>.' });
  if (data && data.imagesTotal > 0 && data.lazyImages === 0) issues.push({ severity: "info", category: "performance", title: "Images are not lazy loaded", detail: `${data.imagesTotal} image${data.imagesTotal > 1 ? "s" : ""} found but none use loading="lazy".`, fix: 'Add loading="lazy" to all off-screen <img> tags.' });
  if (data && data.externalLinks > 0 && !data.hasPreconnect) issues.push({ severity: "info", category: "performance", title: "No preconnect hints found", detail: "The page has external links but no preconnect hints. These reduce DNS lookup time.", fix: 'Add <link rel="preconnect"> for key third-party origins.' });
  if (performance !== null && performance >= 0.5 && performance < 0.9) issues.push({ severity: "info", category: "performance", title: `Performance needs improvement (${Math.round(performance * 100)}/100)`, detail: "Performance is in the needs-improvement range. Optimization will improve rankings.", fix: "Compress images, defer non-critical JS, enable browser caching." });

  const order = { critical: 0, warning: 1, info: 2 };
  issues.sort((a, b) => order[a.severity] - order[b.severity]);
  return issues;
}

// ─── GEO / AI Visibility ──────────────────────────────────────────────────────

function buildGeoScore(data: ReturnType<typeof parseHTML> | null, metaDescLength: number) {
  const schemaTypes = (data?.schemas ?? []).map(s => s.type.toLowerCase());
  const hasOrgOrLocal = schemaTypes.some(t => t === "organization" || t === "localbusiness");
  const hasFAQ = schemaTypes.some(t => t === "faqpage");
  const hasBreadcrumb = schemaTypes.some(t => t === "breadcrumblist");
  const hasArticleOrPage = schemaTypes.some(t => t === "article" || t === "webpage" || t === "blogposting");
  const hasServiceOrProduct = schemaTypes.some(t => t === "service" || t === "product" || t === "localbusiness");
  const checks = [
    { label: "Organization or LocalBusiness schema", achieved: hasOrgOrLocal },
    { label: "FAQPage schema", achieved: hasFAQ },
    { label: "BreadcrumbList schema", achieved: hasBreadcrumb },
    { label: "Article, WebPage, or BlogPosting schema", achieved: hasArticleOrPage },
    { label: "Service, Product, or LocalBusiness schema", achieved: hasServiceOrProduct },
    { label: "Meta description ≥ 80 chars", achieved: metaDescLength >= 80 },
    { label: "Exactly one H1 heading", achieved: (data?.h1Count ?? 0) === 1 },
    { label: "Word count ≥ 400 words", achieved: (data?.wordCount ?? 0) >= 400 },
  ];
  const achieved = checks.filter(c => c.achieved).length;
  return { score: Math.round((achieved / 8) * 100), checks };
}

// ─── Overall Score ────────────────────────────────────────────────────────────

function buildOverallScore(performance: number | null, seo: number | null, data: ReturnType<typeof parseHTML> | null) {
  let totalWeight = 0; let weightedSum = 0;
  if (performance !== null) { weightedSum += performance * 30; totalWeight += 30; }
  if (seo !== null) { weightedSum += seo * 25; totalWeight += 25; }
  if (data) {
    const checks = [
      data.titleLength >= 30 && data.titleLength <= 65, data.metaDescLength >= 100,
      data.h1Count === 1, !!data.canonical, data.isHttps, data.hasViewport,
      data.imagesTotal === 0 || data.imagesMissingAlt === 0,
      !data.robots?.includes("noindex"), !!data.langAttr, data.hasFavicon,
    ];
    weightedSum += (checks.filter(Boolean).length / checks.length) * 25; totalWeight += 25;
  }
  if (data) {
    const schemaTypes = data.schemas.map(s => s.type.toLowerCase());
    const checks = [
      data.schemas.length > 0, data.hasOG, data.hasOGImage, data.hasTwitterCard,
      schemaTypes.some(t => t === "organization" || t === "localbusiness"),
      schemaTypes.some(t => t === "faqpage"),
    ];
    weightedSum += (checks.filter(Boolean).length / checks.length) * 20; totalWeight += 20;
  }
  if (totalWeight === 0) return { overallScore: 0, overallGrade: "F" as const };
  const overallScore = Math.round((weightedSum / totalWeight) * 100);
  let overallGrade: "A+" | "A" | "B" | "C" | "D" | "F";
  if (overallScore >= 93) overallGrade = "A+";
  else if (overallScore >= 85) overallGrade = "A";
  else if (overallScore >= 75) overallGrade = "B";
  else if (overallScore >= 60) overallGrade = "C";
  else if (overallScore >= 45) overallGrade = "D";
  else overallGrade = "F";
  return { overallScore, overallGrade };
}

// ─── Build Results ────────────────────────────────────────────────────────────

type ParsedHTML = ReturnType<typeof parseHTML>;

function buildResults(psi: any, html: ParsedHTML | null, url: string, strategy: "mobile" | "desktop"): AuditResults {
  const lhr = psi?.lighthouseResult;
  const audits = lhr?.audits ?? {};
  const cats = lhr?.categories ?? {};
  const metric = (key: string): CWVMetric | null => {
    const a = audits[key];
    if (!a) return null;
    return { displayValue: a.displayValue ?? "—", score: a.score ?? null };
  };
  const performance = cats.performance?.score ?? null;
  const seo = cats.seo?.score ?? null;
  const noindex = (audits["is-crawlable"]?.score != null && audits["is-crawlable"]?.score !== 1) || !!(html?.robots?.includes("noindex"));
  const issues = buildIssues(html, performance, noindex);
  const { score: geoScore, checks: geoChecks } = buildGeoScore(html, html?.metaDescLength ?? 0);
  const { overallScore, overallGrade } = buildOverallScore(performance, seo, html);

  return {
    url, strategy, performance, seo,
    accessibility: cats.accessibility?.score ?? null,
    bestPractices: cats["best-practices"]?.score ?? null,
    fcp: metric("first-contentful-paint"), lcp: metric("largest-contentful-paint"),
    cls: metric("cumulative-layout-shift"), tbt: metric("total-blocking-time"),
    si: metric("speed-index"), inp: metric("interaction-to-next-paint"),
    title: html?.title ?? null, titleLength: html?.titleLength ?? 0,
    metaDescription: html?.metaDescription ?? null, metaDescLength: html?.metaDescLength ?? 0,
    duplicateMetaDesc: html?.duplicateMetaDesc ?? false, h1Count: html?.h1Count ?? 0,
    h1First: html?.h1First ?? null, h2Count: html?.h2Count ?? 0, h3Count: html?.h3Count ?? 0,
    canonical: html?.canonical ?? null, robots: html?.robots ?? null,
    hasOG: html?.hasOG ?? false, hasOGImage: html?.hasOGImage ?? false,
    hasTwitterCard: html?.hasTwitterCard ?? false,
    isHttps: html?.isHttps ?? url.startsWith("https"),
    hasViewport: html?.hasViewport ?? audits.viewport?.score === 1,
    langAttr: html?.langAttr ?? null, hasHreflang: html?.hasHreflang ?? false,
    hasFavicon: html?.hasFavicon ?? false, hasPreconnect: html?.hasPreconnect ?? false,
    imagesTotal: html?.imagesTotal ?? 0, imagesMissingAlt: html?.imagesMissingAlt ?? 0,
    lazyImages: html?.lazyImages ?? 0, nofollowLinks: html?.nofollowLinks ?? 0,
    internalLinks: html?.internalLinks ?? 0, externalLinks: html?.externalLinks ?? 0,
    schemas: html?.schemas ?? [],
    isCrawlable: audits["is-crawlable"]?.score == null ? null : audits["is-crawlable"]?.score === 1,
    htmlOnly: !psi, wordCount: html?.wordCount ?? 0, paragraphCount: html?.paragraphCount ?? 0,
    urlLength: html?.urlLength ?? url.length, urlPath: html?.urlPath ?? "/",
    issues, geoScore, geoChecks, overallScore, overallGrade,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// DISPLAY COMPONENTS
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Animated Score Ring ──────────────────────────────────────────────────────

function ScoreRing({ score, size = 100, strokeWidth = 7 }: { score: number | null; size?: number; strokeWidth?: number; }) {
  const [filled, setFilled] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setFilled(true), 200);
    return () => clearTimeout(t);
  }, [score]);

  const pct = score !== null ? Math.round(score * 100) : 0;
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const cx = size / 2; const cy = size / 2;
  const color = scoreColor(score);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-border" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={`${filled ? dash : 0} ${circ}`} transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: "stroke-dasharray 1.3s cubic-bezier(0.16,1,0.3,1)" }} />
      <text x={cx} y={cy - 4} textAnchor="middle" fontSize={size * 0.21} fill="currentColor"
        fontFamily="Libre Baskerville, Georgia, serif" fontWeight="400">
        {score !== null ? pct : "—"}
      </text>
      <text x={cx} y={cy + size * 0.14} textAnchor="middle" fontSize={size * 0.075} fill={color}
        fontFamily="IBM Plex Mono, monospace" letterSpacing="1">
        {scoreLabel(score).toUpperCase()}
      </text>
    </svg>
  );
}

// ─── Large Overall Score Ring ─────────────────────────────────────────────────

function OverallRing({ score, grade }: { score: number; grade: string; }) {
  const [filled, setFilled] = useState(false);
  useEffect(() => { const t = setTimeout(() => setFilled(true), 300); return () => clearTimeout(t); }, [score]);
  const size = 160; const strokeWidth = 9;
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const cx = size / 2; const cy = size / 2;
  const color = gradeColorHex(grade);

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="currentColor" strokeWidth={strokeWidth} className="text-border" />
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round"
        strokeDasharray={`${filled ? dash : 0} ${circ}`} transform={`rotate(-90 ${cx} ${cy})`}
        style={{ transition: "stroke-dasharray 1.6s cubic-bezier(0.16,1,0.3,1)" }} />
      <text x={cx} y={cy - 6} textAnchor="middle" fontSize={36} fill="currentColor"
        fontFamily="Libre Baskerville, Georgia, serif" fontWeight="400">{score}</text>
      <text x={cx} y={cy + 18} textAnchor="middle" fontSize={9} fill={color}
        fontFamily="IBM Plex Mono, monospace" letterSpacing="2">OVERALL SCORE</text>
    </svg>
  );
}

// ─── Score Radar ──────────────────────────────────────────────────────────────

function ScoreRadar({ results }: { results: AuditResults }) {
  const data = [
    { label: "Perf", value: Math.round((results.performance ?? 0) * 100) },
    { label: "SEO", value: Math.round((results.seo ?? 0) * 100) },
    { label: "Access.", value: Math.round((results.accessibility ?? 0) * 100) },
    { label: "Best Pr.", value: Math.round((results.bestPractices ?? 0) * 100) },
  ].filter(d => d.value > 0);

  if (data.length < 2) return null;

  return (
    <ResponsiveContainer width="100%" height={160}>
      <RadarChart data={data} cx="50%" cy="50%" outerRadius="65%">
        <PolarGrid stroke="rgba(255,255,255,0.07)" radialLines={false} />
        <PolarAngleAxis dataKey="label"
          tick={{ fontSize: 9, fontFamily: "IBM Plex Mono, monospace", fill: "hsl(var(--muted-foreground))", letterSpacing: 1 }} />
        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
        <Radar dataKey="value" stroke="#d4a96a" fill="#d4a96a" fillOpacity={0.13}
          strokeWidth={1.5} dot={{ fill: "#d4a96a", r: 2.5, strokeWidth: 0 } as any} />
      </RadarChart>
    </ResponsiveContainer>
  );
}

// ─── Grade Hero ───────────────────────────────────────────────────────────────

function GradeHero({ results }: { results: AuditResults }) {
  const gradeColor = gradeColorHex(results.overallGrade);
  const criticals = results.issues.filter(i => i.severity === "critical").length;
  const warnings = results.issues.filter(i => i.severity === "warning").length;

  return (
    <div className="grid md:grid-cols-3 gap-px bg-border border border-border overflow-hidden">
      {/* Grade */}
      <div className="bg-background p-8 md:p-10 flex flex-col justify-between">
        <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-muted-foreground mb-4">
          SEO Health Grade
        </div>
        <div>
          <div className="font-serif leading-none mb-3" style={{ fontSize: "6rem", color: gradeColor }}>
            {results.overallGrade}
          </div>
          <div className="flex flex-wrap gap-2 mt-4">
            {criticals > 0 && (
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 border border-red-500/30 bg-red-500/10 text-red-400">
                {criticals} Critical
              </span>
            )}
            {warnings > 0 && (
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 border border-orange-500/30 bg-orange-500/10 text-orange-400">
                {warnings} Warnings
              </span>
            )}
            {criticals === 0 && warnings === 0 && (
              <span className="font-mono text-[9px] uppercase tracking-[0.15em] px-2.5 py-1 border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                No Critical Issues
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Score ring */}
      <div className="bg-background p-8 md:p-10 flex flex-col items-center justify-center gap-4">
        <OverallRing score={results.overallScore} grade={results.overallGrade} />
        <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground text-center">
          {results.strategy} audit
          {results.htmlOnly && <span className="block text-orange-400 mt-1">On-page only</span>}
        </div>
      </div>

      {/* Radar or bars */}
      <div className="bg-background p-6 md:p-8 flex flex-col">
        <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
          Score Radar
        </div>
        {!results.htmlOnly ? (
          <div className="flex-1">
            <ScoreRadar results={results} />
          </div>
        ) : (
          <div className="flex-1 space-y-3 pt-2">
            {([
              [results.performance, "Performance"],
              [results.seo, "SEO"],
              [results.accessibility, "Accessibility"],
              [results.bestPractices, "Best Practices"],
            ] as [number | null, string][]).map(([s, label]) => (
              <div key={label}>
                <div className="flex justify-between mb-1">
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">{label}</span>
                  <span className="font-mono text-[9px]" style={{ color: scoreColor(s) }}>
                    {s !== null ? Math.round(s * 100) : "N/A"}
                  </span>
                </div>
                <div className="h-1 bg-border overflow-hidden">
                  <div className="h-full" style={{ width: `${s !== null ? Math.round(s * 100) : 0}%`, backgroundColor: scoreColor(s), transition: "width 1.2s cubic-bezier(0.16,1,0.3,1)" }} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Lighthouse Grid ──────────────────────────────────────────────────────────

function LighthouseGrid({ results }: { results: AuditResults }) {
  if (results.htmlOnly) return null;
  return (
    <div>
      <SectionLabel icon={<BarChart3 className="w-3.5 h-3.5" />}>
        Google Lighthouse — {results.strategy.charAt(0).toUpperCase() + results.strategy.slice(1)}
      </SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border border border-border">
        {([
          [results.performance, "Performance"],
          [results.seo, "SEO"],
          [results.accessibility, "Accessibility"],
          [results.bestPractices, "Best Practices"],
        ] as [number | null, string][]).map(([score, label]) => (
          <div key={label} className="bg-background p-6 sm:p-8 flex flex-col items-center gap-4">
            <ScoreRing score={score} size={96} strokeWidth={6} />
            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground text-center">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CWV Metric Card ──────────────────────────────────────────────────────────

const CWV_INFO: Record<string, { full: string; unit: string; goodMax: string; poorMin: string }> = {
  lcp:  { full: "Largest Contentful Paint",   unit: "s",  goodMax: "≤2.5s", poorMin: ">4.0s" },
  fcp:  { full: "First Contentful Paint",     unit: "s",  goodMax: "≤1.8s", poorMin: ">3.0s" },
  cls:  { full: "Cumulative Layout Shift",    unit: "",   goodMax: "≤0.1",  poorMin: ">0.25" },
  tbt:  { full: "Total Blocking Time",        unit: "ms", goodMax: "≤200ms",poorMin: ">600ms" },
  si:   { full: "Speed Index",               unit: "s",  goodMax: "≤3.4s", poorMin: ">5.8s" },
  inp:  { full: "Interaction to Next Paint",  unit: "ms", goodMax: "≤200ms",poorMin: ">500ms" },
};

const CWV_STATUS_STYLES = {
  good:              { bg: "bg-emerald-500/8",  border: "border-emerald-500/20", text: "text-emerald-400", badge: "bg-emerald-500/15 text-emerald-400", dot: "#22c55e" },
  "needs-improvement":{ bg: "bg-orange-500/8",  border: "border-orange-500/20", text: "text-orange-400",  badge: "bg-orange-500/15 text-orange-400",  dot: "#f97316" },
  poor:              { bg: "bg-red-500/8",     border: "border-red-500/20",    text: "text-red-400",    badge: "bg-red-500/15 text-red-400",    dot: "#ef4444" },
};

function CWVCard({ metricKey, metric }: { metricKey: string; metric: CWVMetric }) {
  const status = cwvStatus(metricKey, metric.displayValue);
  const styles = CWV_STATUS_STYLES[status];
  const info = CWV_INFO[metricKey];
  const statusLabel = { good: "Good", "needs-improvement": "Needs Work", poor: "Poor" }[status];

  return (
    <div className={`${styles.bg} border ${styles.border} p-4 sm:p-5 flex flex-col gap-3`}>
      <div className="flex items-start justify-between gap-2">
        <div className="font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground leading-tight">
          {metricKey.toUpperCase()}
        </div>
        <span className={`font-mono text-[8px] uppercase tracking-[0.12em] px-1.5 py-0.5 rounded-sm ${styles.badge} shrink-0`}>
          {statusLabel}
        </span>
      </div>
      <div className={`font-serif text-2xl sm:text-3xl leading-none ${styles.text}`}>
        {metric.displayValue}
      </div>
      <div className="font-mono text-[8px] text-muted-foreground/70 leading-snug">
        {info.full}
      </div>
      <div className="flex gap-3 font-mono text-[8px] text-muted-foreground/60">
        <span>✓ {info.goodMax}</span>
        <span>✗ {info.poorMin}</span>
      </div>
    </div>
  );
}

function CWVPanel({ results }: { results: AuditResults }) {
  const metrics = [
    { key: "lcp", m: results.lcp }, { key: "fcp", m: results.fcp },
    { key: "cls", m: results.cls }, { key: "tbt", m: results.tbt },
    { key: "si",  m: results.si  }, { key: "inp", m: results.inp },
  ].filter(x => x.m !== null) as { key: string; m: CWVMetric }[];

  if (metrics.length === 0) return null;

  return (
    <div>
      <SectionLabel icon={<Zap className="w-3.5 h-3.5" />}>Core Web Vitals</SectionLabel>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {metrics.map(({ key, m }) => (
          <CWVCard key={key} metricKey={key} metric={m} />
        ))}
      </div>
    </div>
  );
}

// ─── Section Label ────────────────────────────────────────────────────────────

function SectionLabel({ children, icon }: { children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2.5 mb-4">
      {icon && <span className="text-primary">{icon}</span>}
      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-primary">{children}</span>
    </div>
  );
}

// ─── Issue Card ───────────────────────────────────────────────────────────────

const SEVERITY_STYLES = {
  critical: { bar: "bg-red-500",    icon: <XCircle className="w-4 h-4 text-red-400 shrink-0" />,     badge: "border-red-500/30 bg-red-500/10 text-red-400" },
  warning:  { bar: "bg-orange-400", icon: <AlertCircle className="w-4 h-4 text-orange-400 shrink-0" />, badge: "border-orange-500/30 bg-orange-500/10 text-orange-400" },
  info:     { bar: "bg-sky-400",    icon: <AlertCircle className="w-4 h-4 text-sky-400 shrink-0" />,   badge: "border-sky-500/30 bg-sky-500/10 text-sky-400" },
};
const CATEGORY_STYLES: Record<string, string> = {
  technical: "border-primary/30 bg-primary/5 text-primary",
  content:   "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  performance:"border-orange-500/30 bg-orange-500/5 text-orange-400",
  schema:    "border-violet-500/30 bg-violet-500/5 text-violet-400",
  social:    "border-pink-500/30 bg-pink-500/5 text-pink-400",
};

function IssueCard({ issue }: { issue: SEOIssue }) {
  const [open, setOpen] = useState(false);
  const sev = SEVERITY_STYLES[issue.severity];

  return (
    <div className="border-b border-border/40 last:border-0">
      <button type="button" onClick={() => setOpen(v => !v)}
        className="w-full flex items-center gap-3 py-3.5 text-left group hover:bg-card/40 px-3 -mx-3 transition-colors">
        <div className={`w-1 self-stretch shrink-0 rounded-full ${sev.bar}`} />
        {sev.icon}
        <span className="flex-1 font-display text-sm text-foreground leading-snug">{issue.title}</span>
        <span className={`font-mono text-[8px] uppercase tracking-[0.15em] px-2 py-0.5 border shrink-0 hidden sm:inline ${CATEGORY_STYLES[issue.category]}`}>
          {issue.category}
        </span>
        {open
          ? <ChevronUp className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
          : <ChevronDown className="w-3.5 h-3.5 text-muted-foreground/60 shrink-0" />
        }
      </button>
      {open && (
        <div className="pb-4 pl-10 pr-3 space-y-3">
          <p className="font-display text-sm text-muted-foreground leading-relaxed">{issue.detail}</p>
          <div className="border-l-2 border-primary/40 pl-3 font-mono text-[9px] text-foreground/80 leading-relaxed">
            <span className="text-primary uppercase tracking-[0.2em]">Fix: </span>{issue.fix}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Priority Issues Panel ────────────────────────────────────────────────────

function PriorityIssuesPanel({ issues }: { issues: SEOIssue[] }) {
  const [filter, setFilter] = useState<"all" | "critical" | "warning" | "info">("all");
  const criticals = issues.filter(i => i.severity === "critical");
  const warnings  = issues.filter(i => i.severity === "warning");
  const infos     = issues.filter(i => i.severity === "info");
  const filtered  = filter === "all" ? issues : issues.filter(i => i.severity === filter);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <SectionLabel icon={<Shield className="w-3.5 h-3.5" />}>
          {issues.length} Issues Detected
        </SectionLabel>
        <div className="flex flex-wrap gap-2 ml-auto">
          {(["all", "critical", "warning", "info"] as const).map(f => {
            const count = f === "all" ? issues.length : f === "critical" ? criticals.length : f === "warning" ? warnings.length : infos.length;
            if (count === 0 && f !== "all") return null;
            const active = filter === f;
            const colors = { all: "border-border text-muted-foreground", critical: "border-red-500/40 text-red-400", warning: "border-orange-500/40 text-orange-400", info: "border-sky-500/40 text-sky-400" };
            return (
              <button key={f} type="button" onClick={() => setFilter(f)}
                className={`font-mono text-[9px] uppercase tracking-[0.15em] px-3 py-1 border transition-colors ${active ? colors[f] + " bg-card" : "border-border/40 text-muted-foreground/50 hover:text-muted-foreground"}`}>
                {f === "all" ? `All (${count})` : `${f} (${count})`}
              </button>
            );
          })}
        </div>
      </div>

      <div className="border border-border bg-background p-4 sm:p-5">
        {filtered.length === 0 ? (
          <div className="flex items-center gap-3 py-3">
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
            <span className="font-display text-sm text-foreground">No issues in this category — great work!</span>
          </div>
        ) : (
          filtered.map((issue, i) => <IssueCard key={i} issue={issue} />)
        )}
      </div>
    </div>
  );
}

// ─── SERP Preview ─────────────────────────────────────────────────────────────

function SERPPreview({ url, title, description }: { url: string; title: string | null; description: string | null }) {
  let displayUrl = url;
  try { const u = new URL(url); displayUrl = u.hostname + (u.pathname !== "/" ? u.pathname : ""); } catch {}
  const titleText  = title       ?? "(No title tag — Google will auto-generate)";
  const descText   = description ?? "(No meta description — Google will auto-generate a snippet from the page content)";
  const titleTrunc = titleText.length > 60 ? titleText.slice(0, 60) + "…" : titleText;
  const descTrunc  = descText.length  > 155 ? descText.slice(0, 155) + "…" : descText;

  return (
    <div>
      <SectionLabel icon={<Search className="w-3.5 h-3.5" />}>Google SERP Preview</SectionLabel>
      <div className="border border-border bg-card/30 p-6 sm:p-7 max-w-2xl">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-5 h-5 rounded-full bg-border/60 flex items-center justify-center shrink-0">
            <Globe className="w-3 h-3 text-muted-foreground" />
          </div>
          <span className="font-display text-xs text-muted-foreground truncate">{displayUrl}</span>
        </div>
        <div className={`font-display text-base sm:text-lg leading-snug mb-2 ${!title ? "text-muted-foreground/60 italic" : "text-blue-400 hover:underline cursor-pointer"}`}>
          {titleTrunc}
        </div>
        <div className={`font-display text-sm leading-relaxed ${!description ? "text-muted-foreground/50 italic" : "text-muted-foreground"}`}>
          {descTrunc}
        </div>
        <div className="flex gap-4 mt-4 pt-3 border-t border-border/40">
          <div className="text-center">
            <div className={`font-mono text-[11px] font-semibold ${title && title.length >= 30 && title.length <= 65 ? "text-emerald-400" : "text-orange-400"}`}>
              {title ? `${title.length} chars` : "Missing"}
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-0.5">Title</div>
          </div>
          <div className="text-center">
            <div className={`font-mono text-[11px] font-semibold ${description && description.length >= 100 && description.length <= 165 ? "text-emerald-400" : "text-orange-400"}`}>
              {description ? `${description.length} chars` : "Missing"}
            </div>
            <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground/60 mt-0.5">Description</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Check Row ────────────────────────────────────────────────────────────────

function CheckRow({ label, status, detail }: { label: string; status: "pass" | "warn" | "fail"; detail?: string }) {
  const icon = status === "pass"
    ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
    : status === "warn"
    ? <AlertCircle className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
    : <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />;

  return (
    <div className="flex items-start gap-3 py-3 border-b border-border/30 last:border-0">
      {icon}
      <div className="flex-1 min-w-0">
        <div className="font-display text-sm text-foreground leading-snug">{label}</div>
        {detail && <div className="font-mono text-[9px] text-muted-foreground mt-0.5 break-all">{detail}</div>}
      </div>
    </div>
  );
}

// ─── Technical Panel ──────────────────────────────────────────────────────────

function TechnicalPanel({ results }: { results: AuditResults }) {
  return (
    <div className="space-y-8">
      {/* On-Page SEO */}
      <div>
        <SectionLabel icon={<Code2 className="w-3.5 h-3.5" />}>On-Page SEO Signals</SectionLabel>
        <div className="border border-border bg-background p-5 sm:p-6">
          <CheckRow label="HTTPS / SSL" status={results.isHttps ? "pass" : "fail"}
            detail={results.isHttps ? "Secure connection detected — Google ranking signal satisfied" : "Not HTTPS — active ranking penalty"} />
          <CheckRow label="Viewport meta tag" status={results.hasViewport ? "pass" : "fail"}
            detail={results.hasViewport ? "Mobile viewport configured" : "Missing — mobile SEO heavily impacted"} />
          <CheckRow label="Canonical URL"
            status={results.canonical ? "pass" : "warn"}
            detail={results.canonical ?? "Not set — potential duplicate content issues"} />
          <CheckRow label="Robots meta" status={results.robots?.includes("noindex") ? "fail" : "pass"}
            detail={results.robots?.includes("noindex") ? "noindex detected — page won't rank" : results.robots ?? "Not set (defaults to index, follow)"} />
          <CheckRow label={`Language: ${results.langAttr ?? "Not set"}`} status={results.langAttr ? "pass" : "warn"}
            detail={results.langAttr ? `lang="${results.langAttr}" on <html>` : 'Missing lang attribute on <html> element'} />
          <CheckRow label="Favicon" status={results.hasFavicon ? "pass" : "warn"}
            detail={results.hasFavicon ? "Favicon link tag detected" : "No favicon — add one for brand trust"} />
          <CheckRow label="Open Graph tags" status={results.hasOG ? "pass" : "warn"}
            detail={results.hasOG ? "og:title present" : "Missing — social sharing previews won't show"} />
          <CheckRow label="OG Image" status={results.hasOGImage ? "pass" : results.hasOG ? "warn" : "warn"}
            detail={results.hasOGImage ? "og:image tag present" : "Missing — social shares show no preview image"} />
          <CheckRow label="Twitter / X Card" status={results.hasTwitterCard ? "pass" : "warn"}
            detail={results.hasTwitterCard ? "twitter:card meta present" : "Missing — X won't show image previews"} />
          <CheckRow label="Preconnect hints" status={results.hasPreconnect ? "pass" : "warn"}
            detail={results.hasPreconnect ? "Preconnect resource hints found" : "None detected — add for key third-party origins"} />
          {results.langAttr && results.langAttr !== "en" && results.langAttr !== "en-US" && (
            <CheckRow label="Hreflang" status={results.hasHreflang ? "pass" : "warn"}
              detail={results.hasHreflang ? "Hreflang alternate tags detected" : `lang="${results.langAttr}" but no hreflang tags found`} />
          )}
          {results.isCrawlable !== null && (
            <CheckRow label="Crawlable by Google" status={results.isCrawlable ? "pass" : "fail"}
              detail={results.isCrawlable ? "Page is indexable" : "Blocked — robots.txt or noindex preventing indexing"} />
          )}
        </div>
      </div>

      {/* Title + Meta */}
      <div>
        <SectionLabel>Meta Tag Analysis</SectionLabel>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Title */}
          <div className="border border-border bg-background p-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-3">Page Title</div>
            <div className={`font-display text-sm mb-4 leading-snug ${results.title ? "text-foreground" : "text-muted-foreground/50 italic"}`}>
              {results.title ? `"${results.title}"` : "No title tag found"}
            </div>
            {results.title && (
              <>
                <div className="h-1.5 bg-border overflow-hidden rounded-full mb-2">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min((results.titleLength / 65) * 100, 100)}%`,
                      backgroundColor: results.titleLength >= 30 && results.titleLength <= 65 ? "#22c55e" : "#f97316",
                    }} />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-muted-foreground">
                  <span>{results.titleLength} chars</span>
                  <span className={results.titleLength >= 30 && results.titleLength <= 65 ? "text-emerald-400" : "text-orange-400"}>
                    {results.titleLength >= 30 && results.titleLength <= 65 ? "Ideal (30–65)" : results.titleLength < 30 ? "Too short" : "Too long"}
                  </span>
                </div>
              </>
            )}
          </div>
          {/* Meta description */}
          <div className="border border-border bg-background p-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-3">Meta Description</div>
            <div className={`font-display text-sm mb-4 leading-snug line-clamp-3 ${results.metaDescription ? "text-foreground" : "text-muted-foreground/50 italic"}`}>
              {results.metaDescription ? `"${results.metaDescription}"` : "No meta description found"}
            </div>
            {results.metaDescription && (
              <>
                <div className="h-1.5 bg-border overflow-hidden rounded-full mb-2">
                  <div className="h-full rounded-full transition-all duration-1000"
                    style={{
                      width: `${Math.min((results.metaDescLength / 165) * 100, 100)}%`,
                      backgroundColor: results.metaDescLength >= 100 && results.metaDescLength <= 165 ? "#22c55e" : "#f97316",
                    }} />
                </div>
                <div className="flex justify-between font-mono text-[9px] text-muted-foreground">
                  <span>{results.metaDescLength} chars</span>
                  <span className={results.metaDescLength >= 100 && results.metaDescLength <= 165 ? "text-emerald-400" : "text-orange-400"}>
                    {results.metaDescLength >= 100 && results.metaDescLength <= 165 ? "Ideal (100–165)" : results.metaDescLength < 100 ? "Too short" : "Too long"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Content Panel ────────────────────────────────────────────────────────────

function ContentPanel({ results }: { results: AuditResults }) {
  return (
    <div className="space-y-8">
      <SERPPreview url={results.url} title={results.title} description={results.metaDescription} />

      {/* Content signals */}
      <div>
        <SectionLabel icon={<FileText className="w-3.5 h-3.5" />}>Content Signals</SectionLabel>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border">
          {[
            { label: "Word Count", value: results.wordCount > 0 ? results.wordCount.toLocaleString() : "—", note: results.wordCount >= 600 ? "Good depth" : results.wordCount >= 300 ? "Acceptable" : "Thin", ok: results.wordCount >= 300 },
            { label: "Paragraphs", value: results.paragraphCount > 0 ? results.paragraphCount.toString() : "—", note: "Detected", ok: results.paragraphCount > 0 },
            { label: "Heading Structure", value: `${results.h1Count}·${results.h2Count}·${results.h3Count}`, note: "H1 · H2 · H3", ok: results.h1Count === 1 },
            { label: "URL Length", value: `${results.urlLength}`, note: results.urlLength < 75 ? "Clean" : "Long", ok: results.urlLength < 75 },
          ].map(({ label, value, note, ok }) => (
            <div key={label} className="bg-background p-5 sm:p-6">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</div>
              <div className={`font-serif text-3xl leading-none mb-1 ${ok ? "text-foreground" : "text-orange-400"}`}>{value}</div>
              <div className={`font-mono text-[9px] uppercase tracking-[0.15em] ${ok ? "text-emerald-400/80" : "text-orange-400/80"}`}>{note}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Heading breakdown */}
      <div>
        <SectionLabel>Heading Hierarchy</SectionLabel>
        <div className="border border-border bg-background p-5 sm:p-6">
          <CheckRow label={`H1 heading${results.h1Count !== 1 ? "s" : ""}`}
            status={results.h1Count === 1 ? "pass" : results.h1Count === 0 ? "fail" : "warn"}
            detail={results.h1Count === 0 ? "No H1 found" : results.h1Count > 1 ? `${results.h1Count} H1s — use exactly one` : results.h1First ? `"${results.h1First.slice(0, 70)}"` : "H1 present"} />
          <CheckRow label={`${results.h2Count} H2 subheadings`} status={results.h2Count > 0 ? "pass" : "warn"}
            detail={results.h2Count > 0 ? "Content organized with subheadings" : "No H2 tags found — consider adding section headers"} />
          <CheckRow label={`${results.h3Count} H3 subheadings`} status={results.h3Count > 0 ? "pass" : "warn"}
            detail={results.h3Count > 0 ? "Tertiary heading structure present" : "No H3 tags"} />
          <CheckRow label="Duplicate meta description"
            status={results.duplicateMetaDesc ? "warn" : "pass"}
            detail={results.duplicateMetaDesc ? "Multiple meta description tags found" : "Single meta description — no duplicates"} />
        </div>
      </div>
    </div>
  );
}

// ─── Schema + AI Panel ────────────────────────────────────────────────────────

function SchemaAIPanel({ results }: { results: AuditResults }) {
  const geoColor = results.geoScore >= 75 ? "text-emerald-400" : results.geoScore >= 50 ? "text-orange-400" : "text-red-400";
  const geoLabel = results.geoScore >= 75 ? "AI-Ready" : results.geoScore >= 50 ? "Developing" : "Not Optimized";

  return (
    <div className="space-y-8">
      {/* Schema */}
      <div>
        <SectionLabel icon={<Code2 className="w-3.5 h-3.5" />}>Structured Data / JSON-LD</SectionLabel>
        <div className="border border-border bg-background p-5 sm:p-6">
          {results.schemas.length === 0 ? (
            <div className="flex items-start gap-3 py-2">
              <XCircle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <div className="font-display text-sm text-foreground mb-1">No structured data detected</div>
                <div className="font-display text-xs text-muted-foreground leading-relaxed">
                  Schema markup helps Google understand your content and enables rich results — star ratings, FAQ dropdowns, breadcrumbs.
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-5">
                <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="font-display text-sm text-foreground">{results.schemas.length} schema{results.schemas.length > 1 ? "s" : ""} detected</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {results.schemas.map((s, i) => (
                  <span key={`${s.type}-${i}`} className="font-mono text-[9px] uppercase tracking-[0.2em] px-3 py-1.5 border border-primary/30 bg-primary/5 text-primary">
                    {s.type}
                  </span>
                ))}
              </div>
              {results.schemas.some(s => s.name) && (
                <div className="space-y-1.5 pt-3 border-t border-border/40">
                  {results.schemas.filter(s => s.name).map((s, i) => (
                    <div key={i} className="font-mono text-[9px] text-muted-foreground tracking-[0.1em]">
                      <span className="text-primary">{s.type}:</span> {s.name!.slice(0, 60)}
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* AI/GEO */}
      <div>
        <SectionLabel icon={<Brain className="w-3.5 h-3.5" />}>AI Search Visibility (GEO)</SectionLabel>
        <div className="border border-border bg-background overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-border/40">
            <div className="flex items-center gap-5">
              <div>
                <div className={`font-serif text-5xl leading-none ${geoColor}`}>{results.geoScore}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mt-1">/ 100</div>
              </div>
              <div>
                <div className={`font-mono text-[11px] uppercase tracking-[0.2em] mb-1 ${geoColor}`}>{geoLabel}</div>
                <p className="font-display text-xs text-muted-foreground leading-relaxed max-w-xs">
                  How well this page is positioned to be cited by ChatGPT, Perplexity & Google AI Overviews
                </p>
              </div>
            </div>
            {/* Score bar */}
            <div className="mt-4 h-1.5 bg-border overflow-hidden rounded-full">
              <div className="h-full rounded-full transition-all duration-1500"
                style={{ width: `${results.geoScore}%`, backgroundColor: results.geoScore >= 75 ? "#22c55e" : results.geoScore >= 50 ? "#f97316" : "#ef4444" }} />
            </div>
          </div>
          <div className="divide-y divide-border/30">
            {results.geoChecks.map((check, i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-3">
                {check.achieved
                  ? <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  : <XCircle className="w-4 h-4 text-border shrink-0" />
                }
                <span className={`font-display text-sm leading-snug ${check.achieved ? "text-foreground" : "text-muted-foreground/50"}`}>
                  {check.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Social tags */}
      <div>
        <SectionLabel>Social Sharing Tags</SectionLabel>
        <div className="border border-border bg-background p-5 sm:p-6">
          <CheckRow label="Open Graph tags (og:title)" status={results.hasOG ? "pass" : "warn"}
            detail={results.hasOG ? "og:title present — Facebook/LinkedIn sharing enabled" : "Missing — social previews won't render"} />
          <CheckRow label="Open Graph image" status={results.hasOGImage ? "pass" : "warn"}
            detail={results.hasOGImage ? "og:image present (1200×630px recommended)" : "No og:image — shares show no preview image"} />
          <CheckRow label="Twitter / X Card" status={results.hasTwitterCard ? "pass" : "warn"}
            detail={results.hasTwitterCard ? "twitter:card meta present" : "Missing — X won't display image previews"} />
        </div>
      </div>
    </div>
  );
}

// ─── Links + Images Panel ─────────────────────────────────────────────────────

function LinksPanel({ results }: { results: AuditResults }) {
  return (
    <div className="space-y-8">
      <div>
        <SectionLabel icon={<Link2 className="w-3.5 h-3.5" />}>Link Intelligence</SectionLabel>
        <div className="grid grid-cols-3 gap-px bg-border border border-border">
          {[
            { label: "Internal Links", value: results.internalLinks, note: "Same domain", color: "text-primary" },
            { label: "External Links", value: results.externalLinks, note: "Other domains", color: "text-foreground" },
            { label: "Nofollow", value: results.nofollowLinks, note: results.nofollowLinks > 0 ? "Equity blocked" : "None", color: results.nofollowLinks > 0 ? "text-orange-400" : "text-foreground" },
          ].map(({ label, value, note, color }) => (
            <div key={label} className="bg-background p-5 sm:p-6">
              <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</div>
              <div className={`font-serif text-4xl leading-none mb-1 ${color}`}>{value}</div>
              <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/70">{note}</div>
            </div>
          ))}
        </div>
      </div>

      {results.imagesTotal > 0 && (
        <div>
          <SectionLabel icon={<ImageIcon className="w-3.5 h-3.5" />}>Image Optimization</SectionLabel>
          <div className="grid grid-cols-3 gap-px bg-border border border-border mb-4">
            {[
              { label: "Total Images", value: results.imagesTotal, color: "text-foreground", note: "Found on page" },
              { label: "Missing Alt", value: results.imagesMissingAlt, color: results.imagesMissingAlt > 0 ? "text-orange-400" : "text-emerald-400", note: results.imagesMissingAlt === 0 ? "All tagged" : "Need alt text" },
              { label: "Lazy Loaded", value: results.lazyImages, color: results.lazyImages > 0 ? "text-emerald-400" : "text-orange-400", note: results.lazyImages > 0 ? "Optimized" : "None detected" },
            ].map(({ label, value, color, note }) => (
              <div key={label} className="bg-background p-5 sm:p-6">
                <div className="font-mono text-[9px] uppercase tracking-[0.25em] text-muted-foreground mb-2">{label}</div>
                <div className={`font-serif text-4xl leading-none mb-1 ${color}`}>{value}</div>
                <div className="font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground/70">{note}</div>
              </div>
            ))}
          </div>
          <div className="border border-border bg-background p-5">
            <CheckRow label={`Alt text coverage: ${results.imagesTotal - results.imagesMissingAlt}/${results.imagesTotal} images`}
              status={results.imagesMissingAlt === 0 ? "pass" : results.imagesMissingAlt <= 3 ? "warn" : "fail"}
              detail={results.imagesMissingAlt === 0 ? "All images have descriptive alt attributes" : `${results.imagesMissingAlt} images missing alt text — affects accessibility and image SEO`} />
            <CheckRow label={`Lazy loading: ${results.lazyImages}/${results.imagesTotal} images`}
              status={results.lazyImages > 0 ? "pass" : "warn"}
              detail={results.lazyImages > 0 ? `${results.lazyImages} images use loading="lazy" — reduces initial page weight` : 'No images use loading="lazy" — add to off-screen images'} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Tab Navigation ───────────────────────────────────────────────────────────

const TABS = [
  { id: "overview",  label: "Overview",   icon: <BarChart3 className="w-3.5 h-3.5" /> },
  { id: "issues",    label: "Issues",     icon: <Shield className="w-3.5 h-3.5" /> },
  { id: "technical", label: "Technical",  icon: <Code2 className="w-3.5 h-3.5" /> },
  { id: "content",   label: "Content",    icon: <FileText className="w-3.5 h-3.5" /> },
  { id: "schema",    label: "Schema & AI",icon: <Brain className="w-3.5 h-3.5" /> },
  { id: "links",     label: "Links",      icon: <Link2 className="w-3.5 h-3.5" /> },
] as const;
type TabId = typeof TABS[number]["id"];

function TabNav({ active, onChange, criticals }: { active: TabId; onChange: (t: TabId) => void; criticals: number }) {
  return (
    <div className="border-b border-border overflow-x-auto scrollbar-none">
      <div className="flex min-w-max">
        {TABS.map(tab => (
          <button key={tab.id} type="button" onClick={() => onChange(tab.id)}
            className={`flex items-center gap-2 px-4 sm:px-5 py-3.5 font-mono text-[9px] uppercase tracking-[0.2em] border-b-2 transition-colors whitespace-nowrap ${
              active === tab.id
                ? "border-primary text-primary bg-primary/5"
                : "border-transparent text-muted-foreground/70 hover:text-foreground hover:border-border"
            }`}>
            {tab.icon}
            {tab.label}
            {tab.id === "issues" && criticals > 0 && (
              <span className="font-mono text-[8px] px-1.5 py-0.5 bg-red-500/20 text-red-400 border border-red-500/30 rounded-sm">
                {criticals}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Print Report ─────────────────────────────────────────────────────────────

function PrintReport({ results }: { results: AuditResults }) {
  const now = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
  const gradeColor = gradeColorHex(results.overallGrade);
  const criticals = results.issues.filter(i => i.severity === "critical");
  const warnings  = results.issues.filter(i => i.severity === "warning");

  const ScoreBar = ({ score }: { score: number | null }) => {
    const pct = score !== null ? Math.round(score * 100) : 0;
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{ flex: 1, height: 6, background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", width: `${pct}%`, background: score && score >= 0.9 ? "#22c55e" : score && score >= 0.5 ? "#f97316" : "#ef4444", borderRadius: 3 }} />
        </div>
        <span style={{ fontFamily: "monospace", fontSize: 11, fontWeight: 600, color: score && score >= 0.9 ? "#16a34a" : score && score >= 0.5 ? "#ea580c" : "#dc2626", minWidth: 28, textAlign: "right" }}>
          {score !== null ? Math.round(score * 100) : "N/A"}
        </span>
      </div>
    );
  };

  return (
    <div style={{ fontFamily: "Georgia, serif", color: "#111", background: "#fff", padding: "48px 52px", maxWidth: 800, margin: "0 auto" }}>
      {/* Header */}
      <div style={{ borderBottom: "2px solid #111", paddingBottom: 20, marginBottom: 28 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <div style={{ fontFamily: "monospace", fontSize: 20, fontWeight: 700, letterSpacing: 3, color: "#111" }}>ATLAS HOUSTON</div>
            <div style={{ fontFamily: "monospace", fontSize: 9, letterSpacing: 4, color: "#6b7280", marginTop: 3, textTransform: "uppercase" }}>SEO Audit Report</div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", textTransform: "uppercase", letterSpacing: 2 }}>{now}</div>
            <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", marginTop: 3, textTransform: "uppercase", letterSpacing: 2 }}>{results.strategy} audit</div>
          </div>
        </div>
        <div style={{ marginTop: 12, fontFamily: "monospace", fontSize: 11, color: "#374151" }}>
          URL: <span style={{ color: "#1d4ed8" }}>{results.url}</span>
        </div>
      </div>

      {/* Grade + Score */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 28 }}>
        <div style={{ border: "1px solid #e5e7eb", padding: 20 }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", textTransform: "uppercase", letterSpacing: 3, marginBottom: 8 }}>Overall Grade</div>
          <div style={{ fontSize: 80, lineHeight: 1, color: gradeColor, fontWeight: 400 }}>{results.overallGrade}</div>
          <div style={{ fontFamily: "monospace", fontSize: 11, color: "#6b7280", marginTop: 6 }}>{results.overallScore}/100 overall score</div>
        </div>
        <div style={{ border: "1px solid #e5e7eb", padding: 20 }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12 }}>Issues Summary</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#dc2626" }}>● {criticals.length} Critical issue{criticals.length !== 1 ? "s" : ""}</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#ea580c" }}>● {warnings.length} Warning{warnings.length !== 1 ? "s" : ""}</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#0284c7" }}>● {results.issues.filter(i => i.severity === "info").length} Informational</div>
            <div style={{ fontFamily: "monospace", fontSize: 11, color: "#059669", marginTop: 4 }}>GEO / AI Score: {results.geoScore}/100</div>
          </div>
        </div>
      </div>

      {/* Lighthouse Scores */}
      {!results.htmlOnly && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, borderBottom: "1px solid #e5e7eb", paddingBottom: 6 }}>Google Lighthouse Scores</div>
          {[
            [results.performance, "Performance"],
            [results.seo, "SEO"],
            [results.accessibility, "Accessibility"],
            [results.bestPractices, "Best Practices"],
          ].map(([s, label]) => (
            <div key={label as string} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <div style={{ fontFamily: "monospace", fontSize: 10, width: 110, flexShrink: 0 }}>{label as string}</div>
              <div style={{ flex: 1 }}><ScoreBar score={s as number | null} /></div>
            </div>
          ))}
        </div>
      )}

      {/* CWV */}
      {(results.lcp || results.fcp || results.cls) && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, borderBottom: "1px solid #e5e7eb", paddingBottom: 6 }}>Core Web Vitals</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
            {[
              { key: "lcp", m: results.lcp, label: "LCP" }, { key: "fcp", m: results.fcp, label: "FCP" },
              { key: "cls", m: results.cls, label: "CLS" }, { key: "tbt", m: results.tbt, label: "TBT" },
              { key: "si",  m: results.si,  label: "SI"  }, { key: "inp", m: results.inp, label: "INP" },
            ].filter(x => x.m).map(({ key, m, label }) => {
              const st = cwvStatus(key, m!.displayValue);
              const c = st === "good" ? "#16a34a" : st === "needs-improvement" ? "#ea580c" : "#dc2626";
              return (
                <div key={key} style={{ border: "1px solid #e5e7eb", padding: 10 }}>
                  <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", textTransform: "uppercase", letterSpacing: 2 }}>{label}</div>
                  <div style={{ fontSize: 18, color: c, marginTop: 4, marginBottom: 2 }}>{m!.displayValue}</div>
                  <div style={{ fontFamily: "monospace", fontSize: 8, color: c, textTransform: "uppercase", letterSpacing: 2 }}>
                    {st === "good" ? "Good" : st === "needs-improvement" ? "Needs Work" : "Poor"}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Top Issues */}
      {results.issues.length > 0 && (
        <div style={{ marginBottom: 28 }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, borderBottom: "1px solid #e5e7eb", paddingBottom: 6 }}>
            Priority Issues (Top {Math.min(results.issues.length, 8)})
          </div>
          {results.issues.slice(0, 8).map((issue, i) => {
            const c = issue.severity === "critical" ? "#dc2626" : issue.severity === "warning" ? "#ea580c" : "#0284c7";
            return (
              <div key={i} style={{ borderLeft: `3px solid ${c}`, paddingLeft: 12, marginBottom: 12 }}>
                <div style={{ fontFamily: "monospace", fontSize: 9, color: c, textTransform: "uppercase", letterSpacing: 2 }}>{issue.severity}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 12, color: "#111", marginTop: 2, marginBottom: 4 }}>{issue.title}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 10, color: "#6b7280", lineHeight: 1.5 }}>{issue.fix}</div>
              </div>
            );
          })}
        </div>
      )}

      {/* On-Page Signals */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", textTransform: "uppercase", letterSpacing: 3, marginBottom: 12, borderBottom: "1px solid #e5e7eb", paddingBottom: 6 }}>Key On-Page Signals</div>
        {[
          { label: "HTTPS", ok: results.isHttps },
          { label: `Title tag (${results.titleLength} chars)`, ok: !!results.title && results.titleLength >= 30 && results.titleLength <= 65 },
          { label: `Meta description (${results.metaDescLength} chars)`, ok: !!results.metaDescription && results.metaDescLength >= 100 },
          { label: "H1 heading", ok: results.h1Count === 1 },
          { label: "Canonical URL", ok: !!results.canonical },
          { label: "Open Graph tags", ok: results.hasOG },
          { label: `Structured data (${results.schemas.length} types)`, ok: results.schemas.length > 0 },
          { label: "Mobile viewport", ok: results.hasViewport },
        ].map(({ label, ok }) => (
          <div key={label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "4px 0", borderBottom: "1px solid #f3f4f6" }}>
            <span style={{ color: ok ? "#16a34a" : "#dc2626", fontFamily: "monospace", fontSize: 12 }}>{ok ? "✓" : "✗"}</span>
            <span style={{ fontFamily: "monospace", fontSize: 10, color: "#374151" }}>{label}</span>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div style={{ borderTop: "1px solid #e5e7eb", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontFamily: "monospace", fontSize: 10, fontWeight: 700, letterSpacing: 2 }}>ATLAS HOUSTON</div>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280", marginTop: 3 }}>atlashouston.com · Enterprise Digital Studio</div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#6b7280" }}>Grade: {results.overallGrade} · Score: {results.overallScore}/100</div>
          <div style={{ fontFamily: "monospace", fontSize: 9, color: "#9ca3af", marginTop: 2 }}>Confidential — prepared for review purposes</div>
        </div>
      </div>
    </div>
  );
}

// ─── Results Dashboard ────────────────────────────────────────────────────────

function ResultsDashboard({
  results,
  onReset,
}: {
  results: AuditResults;
  onReset: () => void;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const criticals = results.issues.filter(i => i.severity === "critical").length;

  function handlePrint() {
    window.print();
  }

  return (
    <div className="mt-10 space-y-0 print:hidden">
      {/* URL Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 border border-border bg-card/30 mb-6">
        <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">Audited:</span>
        <a href={results.url} target="_blank" rel="noopener noreferrer"
          className="font-mono text-sm text-primary hover:text-foreground transition-colors flex items-center gap-1 truncate">
          {results.url}<ExternalLink className="w-3 h-3 shrink-0" />
        </a>
        <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground border border-border/60 px-2 py-0.5">
          {results.strategy}
        </span>
        {results.htmlOnly && (
          <span className="font-mono text-[9px] uppercase tracking-[0.15em] text-orange-400 border border-orange-500/30 px-2 py-0.5">
            PageSpeed unavailable
          </span>
        )}
        <div className="ml-auto flex items-center gap-3">
          <button onClick={handlePrint}
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors">
            <Download className="w-3 h-3" />
            Export PDF
          </button>
          <button onClick={onReset}
            className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground hover:text-primary transition-colors">
            <RefreshCw className="w-3 h-3" />
            New Audit
          </button>
        </div>
      </div>

      {/* Grade Hero */}
      <GradeHero results={results} />

      {/* Tabs */}
      <div className="border border-border bg-background mt-6">
        <TabNav active={activeTab} onChange={setActiveTab} criticals={criticals} />

        <div className="p-5 sm:p-7">
          {activeTab === "overview" && (
            <div className="space-y-10">
              <LighthouseGrid results={results} />
              <CWVPanel results={results} />
              {/* Quick issues summary */}
              {results.issues.length > 0 && (
                <div>
                  <SectionLabel icon={<Shield className="w-3.5 h-3.5" />}>
                    Top Issues — <button type="button" onClick={() => setActiveTab("issues")} className="text-primary hover:underline">View All {results.issues.length}</button>
                  </SectionLabel>
                  <div className="border border-border bg-background p-4 sm:p-5">
                    {results.issues.slice(0, 5).map((issue, i) => <IssueCard key={i} issue={issue} />)}
                    {results.issues.length > 5 && (
                      <button type="button" onClick={() => setActiveTab("issues")}
                        className="mt-3 font-mono text-[9px] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors">
                        + {results.issues.length - 5} more issues →
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "issues" && <PriorityIssuesPanel issues={results.issues} />}
          {activeTab === "technical" && <TechnicalPanel results={results} />}
          {activeTab === "content" && <ContentPanel results={results} />}
          {activeTab === "schema" && <SchemaAIPanel results={results} />}
          {activeTab === "links" && <LinksPanel results={results} />}
        </div>
      </div>

      {/* CTA */}
      <div className="relative border border-primary/25 bg-primary/5 p-8 sm:p-12 overflow-hidden mt-6">
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[22rem] w-[22rem] rounded-full bg-primary/12 blur-[90px]" />
        <div className="relative">
          <div className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary mb-3">
            Overall score: {results.overallScore}/100 — Grade {results.overallGrade}
          </div>
          <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1.0] tracking-[-0.02em] mb-5">
            Ready to rank higher?
            <span className="block italic text-gold">Let's walk through this together.</span>
          </h3>
          <p className="font-display text-base text-muted-foreground leading-relaxed max-w-xl mb-8">
            Our senior SEO team will review your results line by line — what's holding you back, what to fix first, and exactly what Atlas would do to move your rankings in 90 days. Free, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Link to="/contact"
              className="cta-lux inline-flex items-center justify-center gap-2 px-8 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors">
              <FileText className="w-3.5 h-3.5" />
              Schedule a Free SEO Strategy Call
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link to="/services/seo"
              className="cta-lux inline-flex items-center justify-center gap-2 px-8 py-5 border border-border font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors">
              See Our SEO Service →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Loading State ────────────────────────────────────────────────────────────

const STEPS = [
  "Resolving & validating URL",
  "Connecting to Google PageSpeed Insights",
  "Running Lighthouse audit engine",
  "Fetching page source HTML",
  "Parsing on-page signals & content",
  "Running SEO issues analysis",
  "Computing scores & generating report",
];

function LoadingState() {
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(3);

  useEffect(() => {
    const delays = [400, 800, 2800, 1500, 1000, 700, 500];
    let i = 0;
    const totalMs = delays.reduce((a, b) => a + b, 0);
    let elapsed = 0;
    function advance(): ReturnType<typeof setTimeout> | undefined {
      if (i >= delays.length) return;
      setStep(i);
      const t = setTimeout(() => {
        elapsed += delays[i];
        setProgress(Math.min(Math.round((elapsed / totalMs) * 88), 88));
        i++; advance();
      }, delays[i]);
      return t;
    }
    const handle = advance();
    return () => clearTimeout(handle as unknown as number);
  }, []);

  return (
    <div className="py-16 flex flex-col items-center gap-8">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-2 border-primary/20 animate-ping" />
        <div className="absolute inset-0 border border-primary/50" />
        <div className="absolute inset-0 flex items-center justify-center">
          <Search className="w-6 h-6 text-primary" />
        </div>
      </div>
      <div className="w-full max-w-sm">
        <div className="h-0.5 bg-border overflow-hidden">
          <div className="h-full bg-primary transition-all duration-700 ease-out" style={{ width: `${progress}%` }} />
        </div>
        <div className="font-mono text-[10px] text-muted-foreground mt-2 text-center tracking-[0.2em]">{progress}% complete</div>
      </div>
      <div className="w-full max-w-sm space-y-2.5">
        {STEPS.map((s, i) => (
          <div key={s} className="flex items-center gap-3">
            {i < step ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              : i === step ? <Loader2 className="w-3.5 h-3.5 text-primary shrink-0 animate-spin" />
              : <div className="w-3.5 h-3.5 border border-border/40 rounded-full shrink-0" />}
            <span className={`font-mono text-[10px] tracking-[0.18em] transition-colors ${i <= step ? "text-foreground" : "text-muted-foreground/35"}`}>{s}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function SEOAuditTool() {
  const [url, setUrl] = useState("");
  const [strategy, setStrategy] = useState<"mobile" | "desktop">("mobile");
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [results, setResults] = useState<AuditResults | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const resultsRef = useRef<HTMLDivElement>(null);

  function normalizeUrl(raw: string) {
    let u = raw.trim();
    if (!u.match(/^https?:\/\//)) u = "https://" + u;
    return u;
  }

  async function runAudit(e?: React.FormEvent) {
    e?.preventDefault();
    const normalized = normalizeUrl(url);
    try { new URL(normalized); } catch {
      setErrorMsg("Enter a valid domain, e.g. atlashouston.com"); return;
    }
    const safeCheck = isSafeUrl(normalized);
    if (!safeCheck.ok) { setErrorMsg(safeCheck.reason ?? "This URL is not allowed."); return; }

    setStatus("loading"); setErrorMsg(""); setResults(null);

    try {
      const psiUrl =
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed` +
        `?url=${encodeURIComponent(normalized)}` +
        `&strategy=${strategy}` +
        `&category=performance&category=seo&category=accessibility&category=best-practices`;

      const [psiRes, htmlContent] = await Promise.allSettled([
        fetch(psiUrl).then(r => r.json()),
        fetchHTML(normalized),
      ]);

      const psi = psiRes.status === "fulfilled" && !psiRes.value?.error ? psiRes.value : null;
      const htmlText = htmlContent.status === "fulfilled" ? htmlContent.value : null;
      const htmlData = htmlText ? parseHTML(htmlText, normalized) : null;

      if (!psi && !htmlData) throw new Error("Could not reach the site. Check the URL is publicly accessible and try again.");

      const r = buildResults(psi, htmlData, normalized, strategy);
      setResults(r); setStatus("done");
      setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
    } catch (err: any) {
      setErrorMsg(err.message || "Audit failed. Verify the URL is live and try again.");
      setStatus("error");
    }
  }

  return (
    <>
      {/* Print-only report */}
      {results && (
        <div className="hidden print:block">
          <PrintReport results={results} />
        </div>
      )}

      <section id="seo-audit" aria-label="Free SEO Audit Tool"
        className="scroll-mt-20 relative border-t border-border bg-background overflow-hidden print:hidden">
        <div aria-hidden className="pointer-events-none absolute -top-60 right-1/3 h-[40rem] w-[40rem] rounded-full bg-primary/8 blur-[160px]" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 py-14 sm:py-20">
          {/* Header */}
          <Reveal>
            <div className="flex items-center gap-4 mb-6">
              <span className="block h-px w-12 bg-primary" />
              <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">Free Tool — No Account Required</p>
            </div>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-[-0.02em] max-w-4xl mb-5">
              Your instant
              <span className="block italic text-gold">SEO audit.</span>
            </h2>
            <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">
              Enter any URL and get a full breakdown — Core Web Vitals, Lighthouse scores, schema detection, on-page signals, AI visibility score, and a prioritized issues list — in under 30 seconds.
            </p>
          </Reveal>

          {/* Input */}
          <Reveal delay={100}>
            <form onSubmit={runAudit} className="flex flex-col sm:flex-row gap-3 max-w-2xl mb-3">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <input type="text" value={url} onChange={e => setUrl(e.target.value)}
                  placeholder="yourdomain.com" autoComplete="off" spellCheck={false}
                  className="w-full bg-card border border-border pl-11 pr-4 py-4 font-mono text-sm text-foreground placeholder:text-muted-foreground/45 focus:outline-none focus:border-primary transition-colors"
                  disabled={status === "loading"} />
              </div>
              <div className="flex border border-border bg-card shrink-0">
                <button type="button" onClick={() => setStrategy("mobile")} disabled={status === "loading"}
                  className={`flex-1 sm:flex-none px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors ${strategy === "mobile" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  Mobile
                </button>
                <button type="button" onClick={() => setStrategy("desktop")} disabled={status === "loading"}
                  className={`flex-1 sm:flex-none px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors border-l border-border ${strategy === "desktop" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  Desktop
                </button>
              </div>
              <button type="submit" disabled={status === "loading" || !url.trim()}
                className="cta-lux px-7 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-2 justify-center whitespace-nowrap">
                {status === "loading" ? <><Loader2 className="w-3.5 h-3.5 animate-spin" />Scanning…</> : <><Search className="w-3.5 h-3.5" />Analyze Site</>}
              </button>
            </form>

            <div className="flex flex-wrap items-center gap-4">
              {errorMsg && <p className="font-mono text-[10px] text-red-400 tracking-[0.15em]">{errorMsg}</p>}
              {status === "idle" && (
                <button type="button" onClick={() => setUrl("atlashouston.com")}
                  className="font-mono text-[10px] text-muted-foreground hover:text-primary transition-colors tracking-[0.18em] uppercase">
                  ↳ Try an example
                </button>
              )}
            </div>
          </Reveal>

          {/* Idle feature grid */}
          {status === "idle" && (
            <Reveal delay={220}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border border border-border mt-12">
                {[
                  { Icon: BarChart3, title: "Lighthouse Scores", desc: "Performance, SEO, Accessibility & Best Practices from Google." },
                  { Icon: Zap, title: "Core Web Vitals", desc: "LCP, FCP, CLS, TBT, INP — the exact signals Google ranks you on." },
                  { Icon: Code2, title: "Schema Detection", desc: "Full JSON-LD inventory — every schema type on your page, visualized." },
                  { Icon: Shield, title: "~20 Ranked Issues", desc: "Prioritized SEO issues with severity, detail, and exact fixes." },
                ].map(({ Icon, title, desc }) => (
                  <div key={title} className="bg-background p-5 sm:p-6 flex flex-col gap-3">
                    <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
                    <div className="font-serif text-lg leading-tight">{title}</div>
                    <p className="font-display text-sm text-muted-foreground leading-relaxed">{desc}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}

          {status === "loading" && <LoadingState />}

          {status === "done" && results && (
            <div ref={resultsRef}>
              <ResultsDashboard results={results} onReset={() => { setStatus("idle"); setResults(null); setUrl(""); }} />
            </div>
          )}

          {status === "error" && (
            <div className="mt-8 p-6 border border-red-500/20 bg-red-500/5">
              <div className="flex items-start gap-3">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-display text-sm text-foreground mb-1">Audit could not complete</div>
                  <div className="font-mono text-[10px] text-muted-foreground tracking-[0.15em]">{errorMsg}</div>
                  <button onClick={() => setStatus("idle")} className="mt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-primary hover:text-foreground transition-colors">
                    ← Try another URL
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
