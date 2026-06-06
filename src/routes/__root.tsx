import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Atlas Houston — Web Design, App Development, SEO & Social Media" },
      {
        name: "description",
        content:
          "Atlas Houston is a senior Houston web design, app development, SEO, and social media agency. Custom websites, iOS & Android apps, local SEO, and social media management for Texas businesses.",
      },
      { name: "author", content: "Atlas Houston" },
      { property: "og:site_name", content: "Atlas Houston" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0a1f17" },
      { property: "og:title", content: "Atlas Houston — Web Design, App Development, SEO & Social Media" },
      { name: "twitter:title", content: "Atlas Houston — Web Design, App Development, SEO & Social Media" },
      { property: "og:description", content: "Senior Houston studio: custom websites, mobile apps, technical SEO, and social media management. Fixed-fee, partner-led." },
      { name: "twitter:description", content: "Senior Houston studio: custom websites, mobile apps, technical SEO, and social media management." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/767035c8-deb0-40d6-99d0-de39a5c3d251/id-preview-56a809a0--1a3e3f0f-e659-495d-ab50-cc1a946e92d2.lovable.app-1779555538272.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/767035c8-deb0-40d6-99d0-de39a5c3d251/id-preview-56a809a0--1a3e3f0f-e659-495d-ab50-cc1a946e92d2.lovable.app-1779555538272.png" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Sans:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
      },
      { rel: "stylesheet", href: appCss },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "@id": "https://atlashouston.com/#org",
          name: "Atlas Houston",
          url: "https://atlashouston.com",
          logo: "https://atlashouston.com/favicon.svg",
          telephone: "+1-281-901-7016",
          email: "hello@atlashouston.com",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Houston",
            addressRegion: "TX",
            postalCode: "77002",
            addressCountry: "US",
          },
          sameAs: ["https://www.visitcardinal.com"],
          foundingDate: "2018",
          numberOfEmployees: { "@type": "QuantitativeValue", value: 7 },
          knowsAbout: [
            "Web Design", "Web Development", "App Development", "iOS Development",
            "Android Development", "React Native", "Search Engine Optimization",
            "Social Media Marketing", "Video Production", "Branding",
            "Houston Digital Marketing",
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          "@id": "https://atlashouston.com/#website",
          url: "https://atlashouston.com",
          name: "Atlas Houston",
          description: "Houston web design, app development, SEO, and social media agency",
          publisher: { "@id": "https://atlashouston.com/#org" },
          potentialAction: {
            "@type": "SearchAction",
            target: { "@type": "EntryPoint", urlTemplate: "https://atlashouston.com/blog?q={search_term_string}" },
            "query-input": "required name=search_term_string",
          },
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  );
}
