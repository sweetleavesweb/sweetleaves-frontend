const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sweetleavesnorthloop.com";

export const revalidate = 3600;

export function GET() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${BASE}/sitemap.xml</loc>
  </sitemap>
  <sitemap>
    <loc>${BASE}/sitemap-posts.xml</loc>
  </sitemap>
</sitemapindex>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml" },
  });
}
