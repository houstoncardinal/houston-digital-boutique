import { useEffect, useState } from "react";

export type NavSection = { id: string; label: string };

export function VerticalNav({ sections }: { sections: NavSection[] }) {
  const [active, setActive] = useState(sections[0]?.id);
  const [hovered, setHovered] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const activeIndex = sections.findIndex((s) => s.id === active);
  const current = hovered ?? active;

  return (
    <nav
      aria-label="Section walkthrough"
      className="hidden lg:flex fixed top-1/2 -translate-y-1/2 right-8 xl:right-12 z-40 flex-col items-end gap-5 mix-blend-difference"
    >
      <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.3em] text-white/70">
        <span className="text-white">
          {String(Math.max(activeIndex, 0) + 1).padStart(2, "0")}
        </span>
        <span className="text-white/40">/</span>
        <span className="text-white/40">
          {String(sections.length).padStart(2, "0")}
        </span>
      </div>

      <ul className="flex flex-col items-end gap-3">
        {sections.map((s) => {
          const isActive = active === s.id;
          const isHover = hovered === s.id;
          const show = current === s.id;
          return (
            <li key={s.id}>
              <button
                onClick={() => go(s.id)}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                className="group flex items-center gap-4 cursor-pointer"
                aria-current={isActive ? "true" : undefined}
              >
                <span
                  className={`font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    show
                      ? "opacity-100 translate-x-0 text-white"
                      : "opacity-0 -translate-x-2 text-white/60"
                  }`}
                >
                  {s.label}
                </span>
                <span
                  aria-hidden
                  className={`block h-px transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "w-12 bg-white"
                      : isHover
                        ? "w-8 bg-white"
                        : "w-5 bg-white/40"
                  }`}
                />
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
