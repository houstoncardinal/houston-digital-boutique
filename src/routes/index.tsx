import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { Reveal } from "@/components/site/Reveal";
import heroTexture from "@/assets/hero-texture.jpg";
import { AtlasStoryScroll } from "@/components/site/AtlasStoryScroll";
import { ServiceBanners } from "@/components/site/ServiceBanners";


export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Atlas Houston — Web Design, App Development, Branding & SEO" },
      {
        name: "description",
        content:
          "Atlas Houston designs, builds, hosts, and supports websites and mobile apps for business owners across Greater Houston. Senior team. Local studio. Real accountability.",
      },
      { property: "og:title", content: "Atlas Houston — Digital products for Texas business" },
      {
        property: "og:description",
        content:
          "A Houston design and engineering studio. Apps, websites, branding, cloud and SEO for owners across Greater Houston.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
});


function Index() {
  return (
    <SiteLayout>
      {/* HERO — one promise, two buttons */}
      <section className="relative px-5 sm:px-8 md:px-12 lg:px-16 pt-24 sm:pt-32 md:pt-40 pb-20 sm:pb-28 md:pb-32 border-b border-border overflow-hidden emerald-wash">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 -left-40 h-[34rem] w-[34rem] rounded-full bg-primary/15 blur-[140px] animate-orb"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-40 right-0 h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[140px] animate-orb-alt"
        />
        <img
          src={heroTexture}
          alt=""
          aria-hidden
          className="absolute inset-0 h-full w-full object-cover opacity-[0.10] pointer-events-none mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background pointer-events-none" />

        <div className="relative mx-auto max-w-7xl">
          <div className="flex items-center gap-4 mb-8 animate-reveal">
            <span className="block h-px w-12 bg-primary" />
            <span className="font-mono text-primary text-[10px] sm:text-[11px] tracking-[0.35em] uppercase">
              Atlas · Houston · Est. 2018
            </span>
          </div>

          <h1 className="font-serif text-[2.6rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8.5rem] leading-[0.96] tracking-[-0.02em] text-balance mb-8 sm:mb-10">
            <span className="mask-line"><span style={{ animationDelay: "0ms" }}>We build websites,</span></span>
            <br />
            <span className="mask-line"><span style={{ animationDelay: "120ms" }}>apps, and brands</span></span>
            <br />
            <span className="mask-line">
              <span className="italic text-gold" style={{ animationDelay: "240ms" }}>
                for Texas business.
              </span>
            </span>
          </h1>

          <Reveal delay={420} className="max-w-2xl">
            <p className="font-display text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed">
              A senior Houston studio. We design, build, host, and support digital products for
              owners across Greater Houston — apps for fifty-truck operations, sites for the
              Med Center, brands for restaurants on Westheimer.
            </p>
          </Reveal>

          <Reveal delay={560} className="mt-10 flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
            <Link
              to="/contact"
              className="cta-lux px-8 py-5 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors text-center"
            >
              Start a Project →
            </Link>
            <Link
              to="/services"
              className="cta-lux px-8 py-5 border border-border text-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:border-primary hover:text-primary transition-colors text-center"
            >
              See What We Do
            </Link>
          </Reveal>
        </div>
      </section>

      <AtlasStoryScroll />
    </SiteLayout>
  );
}
