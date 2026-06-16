import type { MetadataRoute } from "next";
import { products } from "@/lib/data";

const BASE_URL = "https://cidfetcher.de";

const LAST_MODIFIED = new Date("2026-06-16");

const staticPages = [
  { path: "", priority: 1.0 },
  { path: "/licencias", priority: 0.9 },
  { path: "/faq", priority: 0.6 },
  { path: "/contacto", priority: 0.5 },
  { path: "/sobre-nosotros", priority: 0.7 },
  { path: "/terminos", priority: 0.3 },
  { path: "/bot-cid-fetcher", priority: 0.8 },
  { path: "/instaladores", priority: 0.5 },
  { path: "/instaladores/office", priority: 0.4 },
  { path: "/instaladores/windows", priority: 0.4 },
];

const categories = [
  { slug: "windows", priority: 0.7 },
  { slug: "office", priority: 0.7 },
  { slug: "windows-server", priority: 0.6 },
  { slug: "visio", priority: 0.5 },
  { slug: "project", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = staticPages.map((p) => ({
    url: `${BASE_URL}${p.path}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: p.priority,
  }));

  const categoryPages = categories.map((c) => ({
    url: `${BASE_URL}/licencias/${c.slug}`,
    lastModified: LAST_MODIFIED,
    changeFrequency: "weekly" as const,
    priority: c.priority,
  }));

  const productPages = products
    .filter((p) => p.isActive && p.stock > 0)
    .map((p) => ({
      url: `${BASE_URL}/producto/${p.slug}`,
      lastModified: LAST_MODIFIED,
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }));

  return [...pages, ...categoryPages, ...productPages];
}
