import type { MetadataRoute } from "next";
import { readCMS } from "@/lib/cms";

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://zypp.app";

const STATIC_ROUTES: { path: string; priority: number }[] = [
  { path: "/", priority: 1 },
  { path: "/riders", priority: 0.9 },
  { path: "/zypp-pilot", priority: 0.9 },
  { path: "/zypp-rental", priority: 0.9 },
  { path: "/rent-to-own", priority: 0.8 },
  { path: "/2w-Service-Zypp-Pilot", priority: 0.7 },
  { path: "/3w-Service-Zypp-Pilot", priority: 0.8 },
  { path: "/ev-for-delivery", priority: 0.9 },
  { path: "/fleetease", priority: 0.8 },
  { path: "/franchise", priority: 0.8 },
  { path: "/fofo", priority: 0.7 },
  { path: "/foco", priority: 0.7 },
  { path: "/advertising", priority: 0.7 },
  { path: "/technologies", priority: 0.7 },
  { path: "/hustleos", priority: 0.6 },
  { path: "/environment", priority: 0.6 },
  { path: "/investors", priority: 0.8 },
  { path: "/about", priority: 0.8 },
  { path: "/careers", priority: 0.7 },
  { path: "/life-at-zypp", priority: 0.6 },
  { path: "/zypp-evolve", priority: 0.6 },
  { path: "/zyppNews", priority: 0.6 },
  { path: "/contact", priority: 0.8 },
  { path: "/find-hub", priority: 0.8 },
  { path: "/privacy-policy", priority: 0.3 },
  { path: "/term-and-conditions", priority: 0.3 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: `${BASE}${r.path}`,
    lastModified: now,
    changeFrequency: r.path === "/" ? "weekly" : "monthly",
    priority: r.priority,
  }));

  // Published CMS pages that live under the catch-all [slug] route.
  try {
    const dynamic = (readCMS().dynamicPages ?? []).filter((p) => p.published);
    for (const p of dynamic) {
      entries.push({
        url: `${BASE}/${p.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.5,
      });
    }
  } catch {
    // CMS store unavailable at build time — static routes still cover the site.
  }

  return entries;
}
