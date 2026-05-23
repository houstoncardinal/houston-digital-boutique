import { useEffect, useState } from "react";

export type NavSection = { id: string; label: string };

export function VerticalNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <aside
      className="hidden lg:flex fixed top-1/2 -translate-y-1/2 left-6 z-30 flex-col gap-1 p-3 border border-border bg-background/70 backdrop-blur-md"
      aria-label="Section navigation"
    >
      <div className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground px-2 pb-2 border-b border-border mb-1">
        // Walkthrough
      </div>
      {sections.map((s, i) => {
        const isActive = active === s.id;
        return (
          <button
            key={s.id}
            onClick={() => go(s.id)}
            className={`group flex items-center gap-3 px-2 py-2 text-left transition-colors ${
              isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span
              className={`font-mono text-[9px] w-5 ${
                isActive ? "text-primary" : ""
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`block h-px transition-all ${
                isActive ? "w-10 bg-primary" : "w-5 bg-border group-hover:bg-foreground"
              }`}
              aria-hidden
            />
            <span className="font-mono text-[10px] uppercase tracking-widest">
              {s.label}
            </span>
          </button>
        );
      })}
    </aside>
  );
}
