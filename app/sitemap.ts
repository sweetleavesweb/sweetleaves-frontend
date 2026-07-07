import type { MetadataRoute } from "next";
import { brands } from "@/lib/brands";
import { products } from "@/lib/products";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://sweetleavesnorthloop.com";

type RouteConfig = {
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
};

const staticRoutes: Array<{ path: string } & RouteConfig> = [
  { path: "/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/about-us/", changeFrequency: "monthly", priority: 0.5 },
  { path: "/contact/", changeFrequency: "monthly", priority: 0.5 },
  { path: "/events/", changeFrequency: "monthly", priority: 0.5 },
  { path: "/faqs/", changeFrequency: "monthly", priority: 0.5 },
  { path: "/loyalty/", changeFrequency: "monthly", priority: 0.5 },
  { path: "/shop-now/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/shop-med/", changeFrequency: "weekly", priority: 1.0 },
  { path: "/certificate-of-analysis/", changeFrequency: "monthly", priority: 0.5 },
  { path: "/blog/", changeFrequency: "weekly", priority: 0.8 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const statics = staticRoutes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  const brandEntries = brands.map((brand) => ({
    url: `${BASE}/brands/${brand.slug}/`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  const productEntries = products.map((product) => ({
    url: `${BASE}/products/${product.slug}/`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority: 1.0,
  }));

  return [...statics, ...brandEntries, ...productEntries];
}
