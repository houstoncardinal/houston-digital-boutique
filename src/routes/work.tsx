import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/site/SiteLayout";
import workBayou from "@/assets/work-bayou.jpg";
import workSummit from "@/assets/work-summit.jpg";

export const Route = createFileRoute("/work")({
  component: WorkPage,
  head: () => ({
    meta: [
      { title: "Work — Houston web & mobile builds | Forgeyard Houston" },
      {
        name: "description",
        content:
          "Selected projects for Houston operators: dispatch dashboards, field-service mobile apps, energy IoT, and high-traffic e-commerce.",
      },
      { property: "og:title", content: "Work — Forgeyard Houston" },
      {
        property: "og:description",
        content: "A selection of recent web and mobile builds for Houston operators.",
      },
      { property: "og:url", content: "/work" },
      { property: "og:image", content: workBayou },
    ],
    links: [{ rel: "canonical", href: "/work" }],
  }),
});

const projects = [
  {
    img: workBayou,
    t: "Bayou Logistics",
    sub: "Dispatch & telemetry platform",
    y: "2024",
    tag: "Web + iOS",
    d: "Real-time fleet dispatch and driver mobile app replacing a 12-year-old legacy system. 50+ trucks, 200+ daily jobs.",
  },
  {
    img: workSummit,
    t: "Summit Energy",
    sub: "IoT field operations app",
    y: "2023",
    tag: "iOS + Android",
    d: "Offline-first technician app for wellhead inspections across West Texas. Native iOS and Android, deployed via MDM.",
  },
  {
    img: workBayou,
    t: "Heights Dental Group",
    sub: "Patient portal & booking",
    y: "2024",
    tag: "Web + Hosting",
    d: "HIPAA-aware portal handling intake, scheduling, and payments for a 9-location Houston dental group.",
  },
  {
    img: workSummit,
    t: "Caracara Coffee Co.",
    sub: "E-commerce & loyalty app",
    y: "2023",
    tag: "iOS + Android + Web",
    d: "Subscription coffee storefront with a loyalty mobile app and Square POS integration across four Houston cafés.",
  },
];

function WorkPage() {
  return (
    <SiteLayout>
      <section className="px-6 md:px-10 pt-24 md:pt-32 pb-16 border-b border-border">
        <div className="font-mono text-primary text-xs mb-6">// SELECTED WORK // 2022 — 2025</div>
        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tighter leading-[0.9] max-w-5xl">
          Houston operators. <span className="text-primary">Production stacks.</span>
        </h1>
      </section>

      <section className="grid md:grid-cols-2 border-b border-border">
        {projects.map((p, i) => (
          <article
            key={p.t}
            className={
              "p-6 md:p-10 border-border " +
              (i % 2 === 0 ? "md:border-r " : "") +
              (i < projects.length - 2 ? "border-b" : "border-b md:border-b-0")
            }
          >
            <div className="w-full aspect-[4/3] border border-border overflow-hidden mb-6 group">
              <img
                src={p.img}
                alt={p.t}
                width={1280}
                height={960}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight">{p.t}</h2>
                <p className="font-mono text-[10px] uppercase tracking-widest text-primary mt-2">
                  {p.sub} // {p.tag}
                </p>
              </div>
              <span className="font-mono text-xs px-2 py-1 border border-border shrink-0">{p.y}</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mt-5 max-w-md">{p.d}</p>
          </article>
        ))}
      </section>

      <section className="px-6 md:px-10 py-24 md:py-32 flex flex-col md:flex-row justify-between gap-8 items-start">
        <h2 className="text-3xl md:text-5xl font-extrabold tracking-tighter max-w-xl">
          Your project, next on the line.
        </h2>
        <Link
          to="/contact"
          className="px-8 py-4 bg-primary text-primary-foreground font-mono text-xs font-bold uppercase tracking-widest hover:bg-foreground hover:text-background transition-colors"
        >
          Start a Project →
        </Link>
      </section>
    </SiteLayout>
  );
}
