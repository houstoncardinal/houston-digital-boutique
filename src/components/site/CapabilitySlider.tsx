import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type SlideItem = {
  img: string;
  kicker: string;
  title: string;
  meta: string;
  blurb: string;
};

export function CapabilitySlider({
  index,
  category,
  headline,
  description,
  items,
}: {
  index: string;
  category: string;
  headline: string;
  description: string;
  items: SlideItem[];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("[data-slide]") as HTMLElement | null;
    const dx = (card?.offsetWidth ?? 480) + 24;
    el.scrollBy({ left: dir * dx, behavior: "smooth" });
  };

  return (
    <div className="border-b border-border py-16 md:py-24">
      <div className="px-6 md:px-10 grid md:grid-cols-12 gap-8 mb-10">
        <div className="md:col-span-4 font-mono text-[10px] text-primary uppercase tracking-widest">
          {index} // {category}
        </div>
        <div className="md:col-span-8">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tighter leading-[0.95] text-balance">
            {headline}
          </h2>
          <p className="mt-6 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>

      <div className="relative">
        <div
          ref={ref}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory scroll-px-6 md:scroll-px-10 px-6 md:px-10 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {items.map((it) => (
            <article
              key={it.title}
              data-slide
              className="snap-start shrink-0 w-[85%] sm:w-[60%] md:w-[46%] lg:w-[34%] border border-border bg-card group"
            >
              <div className="aspect-[4/3] overflow-hidden border-b border-border">
                <img
                  src={it.img}
                  alt={it.title}
                  width={1024}
                  height={768}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-[1200ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                />
              </div>
              <div className="p-6">
                <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  {it.kicker}
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight mt-3">
                  {it.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-3 leading-relaxed">
                  {it.blurb}
                </p>
                <div className="mt-5 pt-4 border-t border-border font-mono text-[10px] uppercase tracking-widest text-primary">
                  {it.meta}
                </div>
              </div>
            </article>
          ))}
          <div className="shrink-0 w-6 md:w-10" aria-hidden />
        </div>

        <div className="px-6 md:px-10 mt-6 flex items-center justify-between">
          <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            ← Drag · {items.length} captures on file
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => scroll(-1)}
              className="p-3 border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Previous"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scroll(1)}
              className="p-3 border border-border hover:border-primary hover:text-primary transition-colors"
              aria-label="Next"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
