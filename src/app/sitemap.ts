import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

const indexablePaths = [
  "/",
  "/about",
  "/contact",
  "/partner",
  "/privacy",
  "/terms",
  "/cookies",
  "/user-agreement",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return indexablePaths.map((path) => {
    const url = path === "/" ? SITE_URL : `${SITE_URL}${path}`;
    return {
      url,
      lastModified: now.toISOString(),
      // Static marketing/legal pages: safe default.
      changeFrequency: "monthly",
      priority: path === "/" ? 1 : 0.6,
    };
  });
}

