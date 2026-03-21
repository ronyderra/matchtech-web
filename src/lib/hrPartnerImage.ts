/**
 * Filenames in `public/hr-partners/` match partner slugs.
 * Placeholders: `*.svg` (generated). Canva exports: use same slug as `*.png` and set extension below.
 */

/** After exporting from Canva, change to `"png"` and add files like `public/hr-partners/techmatch-global.png`. */
export const HR_PARTNER_IMAGE_EXT: "svg" | "png" = "svg";

export function hrPartnerSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function hrPartnerImagePath(name: string): string {
  return `/hr-partners/${hrPartnerSlug(name)}.${HR_PARTNER_IMAGE_EXT}`;
}
