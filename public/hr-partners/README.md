# HR & headhunters card images

## Create images in Canva

1. **Size:** **1200 × 675 px** (16∶9) — matches the sidebar card hero area.
2. **Style:** Professional recruiting / B2B look: subtle gradient, firm name, optional tagline (“Executive search”, “Tech hiring”, etc.). Keep text in the **left half** so it stays readable in the narrow column.
3. **Export:** **PNG** (recommended) or **JPG**. Use the exact filename below so the app picks it up without code changes (after switching extension in code — see below).

## Filenames (one per partner)

Use **lowercase, hyphens** (same as URL slug):

| Partner | File base name |
|--------|------------------|
| TechMatch Global | `techmatch-global` |
| Silicon Search Partners | `silicon-search-partners` |
| BluePeak Recruiting | `bluepeak-recruiting` |
| Vertex Talent Collective | `vertex-talent-collective` |
| CloudStaff Executive | `cloudstaff-executive` |
| Enterprise Hire Group | `enterprise-hire-group` |
| Northbridge Recruiters | `northbridge-recruiters` |
| Stackline Partners | `stackline-partners` |
| DeepTech Search | `deeptech-search` |
| GPU Talent Syndicate | `gpu-talent-syndicate` |
| AI Staffing Collective | `ai-staffing-collective` |
| Circuit Recruiters | `circuit-recruiters` |
| Apex Executive Search | `apex-executive-search` |
| Signal Talent Group | `signal-talent-group` |

Example: `techmatch-global.png` → place at `public/hr-partners/techmatch-global.png`.

## Wire up PNGs in the app

1. Add all PNGs under `public/hr-partners/`.
2. In `src/lib/hrPartnerImage.ts`, set:
   ```ts
   export const HR_PARTNER_IMAGE_EXT: "svg" | "png" = "png";
   ```
3. You can delete the generated `*.svg` files if you no longer need placeholders.

## Regenerate SVG placeholders (optional)

From the repo root:

```bash
npm run generate:hr-partner-images
```

This overwrites `*.svg` files using `scripts/generate-hr-partner-placeholders.mjs`.
