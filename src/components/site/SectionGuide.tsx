import { Reveal } from "@/components/site/Reveal";

const STOPS: { id: string; num: string; label: string; sub: string }[] = [
  { id: "who", num: "01", label: "Who we are", sub: "Houston studio · senior team" },
  { id: "services", num: "02", label: "What we do", sub: "Web · apps · social · video" },
  { id: "where", num: "03", label: "Where we work", sub: "Greater Houston & nationwide" },
  { id: "process", num: "04", label: "How we work", sub: "Listen → ship → rank" },
  { id: "purpose", num: "05", label: "Why it matters", sub: "Outcomes, not deliverables" },
  { id: "begin", num: "06", label: "Begin", sub: "Book a 15-min discovery call" },
];

export function SectionGuide() {
  return (
    <section
      aria-label="What this page covers"
      className="relative border-b border-border bg-background"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8 md:px-12 lg:px-16 py-16 sm:py-20">
        <Reveal>
          <div className="flex items-center gap-4 mb-6">
            <span className="block h-px w-12 bg-primary" />
            <p className="font-mono text-[10px] sm:text-[11px] tracking-[0.35em] uppercase text-primary">
              Guided tour
            </p>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl leading-[1] tracking-[-0.02em] max-w-3xl mb-10">
            Six stops. <span className="italic text-gold">One clear story.</span>
          </h2>
        </Reveal>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-border border border-border">
          {STOPS.map((s, i) => (
            <li key={s.id} className="bg-background">
              <a
                href={`#${s.id}`}
                className="group flex items-start gap-5 p-5 sm:p-6 hover:bg-card/60 transition-colors"
                style={{ transitionDelay: `${i * 40}ms` }}
              >
                <span className="font-mono text-[11px] tracking-[0.3em] text-primary pt-1">
                  {s.num}
                </span>
                <span className="flex-1">
                  <span className="block font-serif text-xl sm:text-2xl leading-tight group-hover:text-primary transition-colors">
                    {s.label}
                  </span>
                  <span className="block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground mt-2">
                    {s.sub}
                  </span>
                </span>
                <span className="font-mono text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                  ↓
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
