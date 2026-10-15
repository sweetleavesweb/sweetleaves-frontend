import { SITE_URL } from "@/lib/site";

export const revalidate = 3600;

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-posts.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
