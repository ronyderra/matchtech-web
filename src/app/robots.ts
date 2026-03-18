import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: [
          "/register",
          "/batch-a",
          "/batch-b",
          "/style-guide",
          // OG is intentionally generated; disallowing avoids crawl noise.
          "/og",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}

