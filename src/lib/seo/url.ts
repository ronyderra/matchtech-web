import { SITE_URL } from "./site";

export function absoluteUrl(pathname: string) {
  if (!pathname) return SITE_URL;
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  if (normalized === "/") return SITE_URL;
  return `${SITE_URL}${normalized}`;
}

