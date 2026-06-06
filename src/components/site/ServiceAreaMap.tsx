import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Link } from "@tanstack/react-router";
import { cities } from "@/lib/cities";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN as string;

type ServiceKey = "websites" | "seo" | "branding" | "mobile-apps";

const SERVICE_LINKS: { key: ServiceKey; label: string }[] = [
  { key: "websites", label: "Web Design" },
  { key: "seo", label: "SEO" },
  { key: "branding", label: "Branding" },
  { key: "mobile-apps", label: "App Development" },
];

export function ServiceAreaMap() {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const [activeSlug, setActiveSlug] = useState<string>(cities[0]?.slug ?? "");

  useEffect(() => {
    if (!mapContainer.current || mapRef.current) return;
    if (!MAPBOX_TOKEN) return;

    mapboxgl.accessToken = MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/dark-v11",
      center: [-95.55, 29.85],
      zoom: 8.2,
      pitch: 45,
      bearing: -10,
      attributionControl: false,
      cooperativeGestures: true,
    });
    mapRef.current = map;

    map.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    map.addControl(new mapboxgl.AttributionControl({ compact: true }));

    map.on("style.load", () => {
      // Subtle emerald wash via fog
      map.setFog({
        color: "rgb(20, 40, 36)",
        "high-color": "rgb(12, 24, 22)",
        "horizon-blend": 0.2,
        "space-color": "rgb(8, 16, 14)",
        "star-intensity": 0.15,
      });

      // 3D buildings for Houston wow factor
      const layers = map.getStyle().layers;
      const labelLayerId = layers?.find(
        (l) => l.type === "symbol" && (l.layout as any)?.["text-field"],
      )?.id;

      if (!map.getLayer("3d-buildings")) {
        map.addLayer(
          {
            id: "3d-buildings",
            source: "composite",
            "source-layer": "building",
            filter: ["==", "extrude", "true"],
            type: "fill-extrusion",
            minzoom: 11,
            paint: {
              "fill-extrusion-color": "#c9a84c",
              "fill-extrusion-height": [
                "interpolate",
                ["linear"],
                ["zoom"],
                11,
                0,
                15.05,
                ["get", "height"],
              ],
              "fill-extrusion-base": [
                "interpolate",
                ["linear"],
                ["zoom"],
                11,
                0,
                15.05,
                ["get", "min_height"],
              ],
              "fill-extrusion-opacity": 0.35,
            },
          },
          labelLayerId,
        );
      }
    });

    // Build custom markers
    cities.forEach((city) => {
      const el = document.createElement("button");
      el.type = "button";
      el.setAttribute("aria-label", `${city.name} service area`);
      el.className = "atlas-map-marker";
      el.innerHTML = `
        <span class="atlas-map-marker__ring"></span>
        <span class="atlas-map-marker__dot"></span>
        <span class="atlas-map-marker__label">${city.shortName}</span>
      `;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setActiveSlug(city.slug);
        map.flyTo({
          center: [city.geo.lng, city.geo.lat],
          zoom: 11.5,
          pitch: 55,
          bearing: -12,
          speed: 0.9,
          curve: 1.6,
        });
      });

      new mapboxgl.Marker({ element: el, anchor: "bottom" })
        .setLngLat([city.geo.lng, city.geo.lat])
        .addTo(map);
    });

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  const active = cities.find((c) => c.slug === activeSlug) ?? cities[0];

  const focusCity = (slug: string) => {
    const c = cities.find((x) => x.slug === slug);
    if (!c || !mapRef.current) return;
    setActiveSlug(slug);
    mapRef.current.flyTo({
      center: [c.geo.lng, c.geo.lat],
      zoom: 11.5,
      pitch: 55,
      bearing: -12,
      speed: 0.9,
      curve: 1.6,
    });
  };

  const resetView = () => {
    mapRef.current?.flyTo({
      center: [-95.55, 29.85],
      zoom: 8.2,
      pitch: 45,
      bearing: -10,
      speed: 0.9,
    });
  };

  return (
    <section
      id="service-area"
      className="relative px-5 sm:px-8 md:px-12 lg:px-16 py-20 sm:py-28 md:py-32 border-t border-border emerald-wash overflow-hidden"
    >
      <div className="relative mx-auto max-w-7xl">
        <div className="flex items-center gap-4 mb-6">
          <span className="block h-px w-12 bg-primary" />
          <span className="font-mono text-primary text-[10px] sm:text-[11px] tracking-[0.35em] uppercase">
            Where We Work
          </span>
        </div>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-8 lg:gap-12 items-start mb-10">
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98] tracking-[-0.02em] text-balance">
            Greater Houston <span className="italic text-gold">web design, SEO & apps.</span>
          </h2>
          <p className="font-display text-base sm:text-lg text-muted-foreground leading-relaxed lg:pt-4">
            We deliver web design, app development, SEO, and social media
            management for businesses across every corner of the Houston metro —
            from The Woodlands to Sugar Land, Katy to Clear Lake. Tap any city
            to explore the packages we offer there.
          </p>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6">
          {/* MAP */}
          <div className="relative">
            <div
              ref={mapContainer}
              className="atlas-map h-[480px] sm:h-[560px] md:h-[640px] w-full rounded-2xl overflow-hidden border border-primary/30 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.7)]"
            />
            {!MAPBOX_TOKEN && (
              <div className="absolute inset-0 flex items-center justify-center bg-card/80 rounded-2xl">
                <p className="text-muted-foreground text-sm">
                  Mapbox token missing.
                </p>
              </div>
            )}
            <button
              type="button"
              onClick={resetView}
              className="absolute top-4 left-4 px-3 py-2 bg-background/80 backdrop-blur border border-primary/30 text-primary font-mono text-[10px] tracking-[0.25em] uppercase rounded hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Reset View
            </button>
          </div>

          {/* CITY PANEL */}
          <aside className="relative bg-card/80 backdrop-blur border border-border rounded-2xl p-6 sm:p-7 flex flex-col">
            <div className="mb-4">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-primary mb-2">
                Selected · {String(cities.indexOf(active) + 1).padStart(2, "0")}
                /{String(cities.length).padStart(2, "0")}
              </p>
              <h3 className="font-serif text-3xl sm:text-4xl leading-tight tracking-[-0.01em] mb-1">
                {active.name}
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                {active.region}
              </p>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed mb-6 line-clamp-5">
              {active.intro}
            </p>

            <div className="mb-6">
              <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-3">
                Packages in {active.shortName}
              </p>
              <div className="grid grid-cols-2 gap-2">
                {SERVICE_LINKS.map((s) => (
                  <Link
                    key={s.key}
                    to="/houston/$city"
                    params={{ city: active.slug }}
                    hash={s.key}
                    className="group flex items-center justify-between px-3 py-3 border border-border hover:border-primary bg-background/40 hover:bg-primary/5 transition-colors rounded-lg"
                  >
                    <span className="text-sm text-foreground group-hover:text-primary transition-colors">
                      {s.label}
                    </span>
                    <span className="text-primary text-xs">→</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link
              to="/houston/$city"
              params={{ city: active.slug }}
              className="mt-auto cta-lux block text-center px-6 py-4 bg-primary text-primary-foreground font-mono text-[11px] font-semibold uppercase tracking-[0.25em] hover:bg-foreground hover:text-background transition-colors rounded"
            >
              Explore {active.shortName} →
            </Link>
          </aside>
        </div>

        {/* CITY CHIPS */}
        <div className="mt-8 flex flex-wrap gap-2">
          {cities.map((c) => {
            const isActive = c.slug === activeSlug;
            return (
              <Link
                key={c.slug}
                to="/houston/$city"
                params={{ city: c.slug }}
                className={`px-4 py-2 border font-mono text-[10px] tracking-[0.25em] uppercase transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background/40 text-muted-foreground border-border hover:border-primary hover:text-primary"
                }`}
              >
                {c.shortName}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
