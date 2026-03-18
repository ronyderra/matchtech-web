import type { Metadata } from "next";
import {
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE_SLUG,
  HOMEPAGE_OG_IMAGE_SLUG,
  SITE_NAME,
} from "./site";
import { absoluteUrl } from "./url";

type PageSeoInput = {
  pathname: string;
  title?: string;
  description?: string;
  ogImageSlug?: string;
  robots?: Metadata["robots"];
};

export function createPageMetadata(input: PageSeoInput): Metadata {
  const canonicalUrl = absoluteUrl(input.pathname);
  const title = input.title ?? SITE_NAME;
  const description = input.description ?? DEFAULT_DESCRIPTION;

  const ogSlug = input.ogImageSlug ?? DEFAULT_OG_IMAGE_SLUG;
  const ogImageUrl = absoluteUrl(ogSlug);

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    robots: input.robots,
    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - Swipe-first hiring`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}

export const defaultSeoMetadata = {
  ogDefault: absoluteUrl(DEFAULT_OG_IMAGE_SLUG),
  ogHomepage: absoluteUrl(HOMEPAGE_OG_IMAGE_SLUG),
  siteName: SITE_NAME,
};

