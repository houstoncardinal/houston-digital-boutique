import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import { GuidedLeadForm } from "@/components/site/GuidedLeadForm";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact Atlas Houston — Houston Web Design, App Development & SEO" },
      {
        name: "description",
        content:
          "Start a project with Atlas Houston — Houston's web design, app development, social media management, and video production studio. Senior team replies within one business day.",
      },
      { property: "og:title", content: "Contact — Atlas Houston" },
      {
        property: "og:description",
        content: "Tell us about your Houston website, app, social, or video project.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  return (
    <SiteLayout>
      <section className="px-6 md:px-10 pt-20 md:pt-28 pb-12 border-b border-border">
        <div className="font-mono text-primary text-[10px] tracking-[0.3em] uppercase mb-5">
          // Start a project
        </div>
        <h1 className="font-serif text-4xl md:text-7xl tracking-tight leading-[0.95] max-w-4xl">
          Let's build something <span className="italic text-primary">powerful</span> in Houston.
        </h1>
        <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed mt-6">
          Six short questions. A senior engineer or designer responds within one business day —
          no BDRs, no assistants.
        </p>
      </section>

      <section className="px-6 md:px-10 py-16 md:py-24 grid md:grid-cols-12 gap-12">
        <aside className="md:col-span-4 space-y-8 md:border-r md:border-border md:pr-10">
          {[
            { k: "Studio", v: "Houston, TX" },
            { k: "Email", v: "hello@atlashouston.com" },
            { k: "Phone", v: "(713) 555-0188" },
            { k: "Response", v: "Within 1 business day" },
          ].map((b) => (
            <div key={b.k} className="border-t border-border pt-4">
              <div className="font-mono text-[10px] text-primary uppercase tracking-widest">
                {b.k}
              </div>
              <p className="text-sm text-foreground mt-2 whitespace-pre-line leading-relaxed">
                {b.v}
              </p>
            </div>
          ))}
        </aside>
        <div className="md:col-span-8">
          <GuidedLeadForm />
        </div>
      </section>
    </SiteLayout>
  );
}
