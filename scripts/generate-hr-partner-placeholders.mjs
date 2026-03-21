/**
 * Generates SVG placeholders in public/hr-partners/ for each HR partner name.
 * Replace these with PNG exports from Canva (see public/hr-partners/README.md).
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = join(__dirname, "..", "public", "hr-partners");

const PARTNERS = [
  "TechMatch Global",
  "Silicon Search Partners",
  "BluePeak Recruiting",
  "Vertex Talent Collective",
  "CloudStaff Executive",
  "Enterprise Hire Group",
  "Northbridge Recruiters",
  "Stackline Partners",
  "DeepTech Search",
  "GPU Talent Syndicate",
  "AI Staffing Collective",
  "Circuit Recruiters",
  "Apex Executive Search",
  "Signal Talent Group",
];

function slugify(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

function hueFromName(name) {
  let h = 0;
  for (let i = 0; i < name.length; i++) {
    h = (h + name.charCodeAt(i) * (i + 1)) % 360;
  }
  return h;
}

function svgFor(name) {
  const slug = slugify(name);
  const h = hueFromName(name);
  const h2 = (h + 40) % 360;
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" width="640" height="360" role="img" aria-label="${escapeXml(name)}">
  <defs>
    <linearGradient id="bg-${slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:hsl(${h},55%,32%)"/>
      <stop offset="100%" style="stop-color:hsl(${h2},45%,18%)"/>
    </linearGradient>
    <linearGradient id="shine-${slug}" x1="0%" y1="100%" x2="80%" y2="0%">
      <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0"/>
      <stop offset="45%" style="stop-color:#ffffff;stop-opacity:0.08"/>
      <stop offset="100%" style="stop-color:#ffffff;stop-opacity:0"/>
    </linearGradient>
  </defs>
  <rect width="640" height="360" fill="url(#bg-${slug})"/>
  <rect width="640" height="360" fill="url(#shine-${slug})"/>
  <circle cx="520" cy="80" r="120" fill="#ffffff" opacity="0.06"/>
  <text x="40" y="200" fill="#ffffff" font-family="system-ui,Segoe UI,sans-serif" font-size="26" font-weight="700">${escapeXml(name)}</text>
  <text x="40" y="238" fill="#ffffff" font-family="system-ui,Segoe UI,sans-serif" font-size="13" opacity="0.85">HR partner · MatchTech</text>
</svg>
`;
}

function escapeXml(s) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

mkdirSync(OUT, { recursive: true });
for (const name of PARTNERS) {
  const slug = slugify(name);
  const path = join(OUT, `${slug}.svg`);
  writeFileSync(path, svgFor(name), "utf8");
  console.log("Wrote", path);
}

console.log("Done. Replace with Canva PNGs when ready (see public/hr-partners/README.md).");
