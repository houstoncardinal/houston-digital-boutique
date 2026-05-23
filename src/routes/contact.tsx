import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/site/SiteLayout";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Start a Project | Forgeyard Houston" },
      {
        name: "description",
        content:
          "Tell us about your website or mobile app. Houston-based studio, senior team, full-lifecycle ownership.",
      },
      { property: "og:title", content: "Contact — Forgeyard Houston" },
      {
        property: "og:description",
        content: "Start a project with the Forgeyard Houston team.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <SiteLayout>
      <section className="px-6 md:px-10 pt-24 md:pt-32 pb-16 border-b border-border">
        <div className="font-mono text-primary text-xs mb-6">// FILE A PROJECT REQUEST</div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] max-w-5xl">
          Tell us what you're <span className="text-primary">building.</span>
        </h1>
        <p className="max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed mt-10">
          A senior engineer or designer responds within one business day. We don't route through
          BDRs or assistants.
        </p>
      </section>

      <section className="grid md:grid-cols-12 gap-0 border-b border-border">
        <aside className="md:col-span-4 p-8 md:p-10 border-b md:border-b-0 md:border-r border-border space-y-10">
          {[
            { k: "Studio", v: "2014 Lamar St, Suite 200\nHouston, TX 77003" },
            { k: "Email", v: "hello@forgeyard.studio" },
            { k: "Phone", v: "(713) 555-0140" },
            { k: "Hours", v: "Mon–Fri // 8:00 – 18:00 CT\nRetainer support: 24/7" },
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

        <div className="md:col-span-8 p-8 md:p-10">
          {submitted ? (
            <div className="border border-primary p-10 md:p-16">
              <div className="font-mono text-[10px] text-primary uppercase tracking-widest">
                // REQUEST FILED
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter mt-4">
                Received. You'll hear back within one business day.
              </h2>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="space-y-8"
            >
              <Field label="01 // Name" name="name" required />
              <Field label="02 // Company" name="company" />
              <Field label="03 // Email" name="email" type="email" required />
              <Field label="04 // Phone (optional)" name="phone" type="tel" />
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                  05 // Scope
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Website", "Mobile App", "Hosting", "Support", "Not sure yet"].map((s) => (
                    <label
                      key={s}
                      className="font-mono text-[11px] uppercase tracking-widest border border-border px-3 py-2 cursor-pointer hover:border-primary hover:text-primary transition-colors"
                    >
                      <input type="checkbox" name="scope" value={s} className="sr-only peer" />
                      <span className="peer-checked:text-primary">{s}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
                  06 // Tell us about the project
                </label>
                <textarea
                  name="brief"
                  rows={6}
                  required
                  className="w-full bg-transparent border border-border focus:border-primary outline-none p-4 text-base text-foreground"
                />
              </div>
              <button
                type="submit"
                className="px-8 py-4 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
              >
                File Request →
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-2">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        className="w-full bg-transparent border-b border-border focus:border-primary outline-none py-3 text-base text-foreground"
      />
    </div>
  );
}
