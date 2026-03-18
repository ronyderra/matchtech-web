export const SITE_NAME = "MatchTech";

// Use NEXT_PUBLIC_SITE_URL in production (Search Console / OG / canonical URLs rely on it).
// Fallback to the known domain for local/dev.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/+$/, "") ?? "https://www.matchtec.co";

export const SITE_LOCALE = "en";

export const SITE_THEME_COLOR = "#0a66c2";

export const CONTACT_EMAIL = "hello@matchtech.com";
export const SUPPORT_EMAIL = "support@matchtech.com";
export const PARTNERS_EMAIL = "partners@matchtech.com";
export const PRIVACY_EMAIL = "privacy@matchtech.com";
export const PRESS_EMAIL = "press@matchtech.com";

export const DEFAULT_OG_IMAGE_SLUG = "/og/default";
export const HOMEPAGE_OG_IMAGE_SLUG = "/og/homepage";

export const DEFAULT_TITLE = `${SITE_NAME} - Swipe-first hiring`;
export const DEFAULT_DESCRIPTION =
  "MatchTech is a swipe-based recruitment platform for job seekers and employers—designed for fast, high-signal matching and introductions.";

export const HOMEPAGE_TITLE = `${SITE_NAME}`;
export const HOMEPAGE_DESCRIPTION =
  "Swipe to match with opportunities. Find the right fit faster with MatchTech's swipe-first recruitment platform.";

