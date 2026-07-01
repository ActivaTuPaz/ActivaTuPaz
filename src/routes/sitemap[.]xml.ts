import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly";
  priority?: string;
  lastmod?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async ({ request }: { request: Request }) => {
        const base = new URL(request.url).origin;
        const today = new Date().toISOString().split("T")[0];
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0", lastmod: today },
          { path: "/desde-la-raiz", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/mujer-re-nace", changefreq: "monthly", priority: "0.8", lastmod: today },
          { path: "/sobre-mi", changefreq: "monthly", priority: "0.6", lastmod: today },
          { path: "/contacto", changefreq: "monthly", priority: "0.6", lastmod: today },
        ];

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${base}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});