/**
 * Public URLs (under `public/`) stored on company documents for dashboard swipe cards.
 * Logos: PNGs in `public/assets/companyImages/`. HR partner marks: SVGs in `public/hr-partners/`.
 */
import type { HrPartnerCompany } from "@/components/dashboard/CompanySwipeDeck/companyCards";

const hr = (filename: string): string => `/hr-partners/${filename}`;

/** Employer logos — paths persisted as `logoUrl` / `imageUrl` on `companies` */
export const SWIPE_COMPANY_LOGO_PATHS = {
  google: "/assets/companyImages/google.png",
  microsoft: "/assets/companyImages/microsoft.png",
  apple: "/assets/companyImages/apple.png",
  amazon: "/assets/companyImages/amazon.png",
  meta: "/assets/companyImages/meta.png",
} as const;

export const SWIPE_PARTNER_HRS_GOOGLE: HrPartnerCompany[] = [
  {
    name: "TechMatch Global",
    tagline: "Executive and staff engineering",
    region: "US · EMEA",
    imageUrl: hr("techmatch-global.svg"),
  },
  {
    name: "Silicon Search Partners",
    tagline: "FAANG and high-growth scale-ups",
    region: "Bay Area",
    imageUrl: hr("silicon-search-partners.svg"),
  },
  {
    name: "BluePeak Recruiting",
    tagline: "Distributed systems and infra",
    region: "Remote-first",
    imageUrl: hr("bluepeak-recruiting.svg"),
  },
  {
    name: "Vertex Talent Collective",
    tagline: "Product and platform leadership",
    region: "North America",
    imageUrl: hr("vertex-talent-collective.svg"),
  },
];

export const SWIPE_PARTNER_HRS_MICROSOFT: HrPartnerCompany[] = [
  {
    name: "CloudStaff Executive",
    tagline: "Azure and cloud platform",
    region: "Seattle · Remote",
    imageUrl: hr("cloudstaff-executive.svg"),
  },
  {
    name: "Enterprise Hire Group",
    tagline: "Microsoft ecosystem hiring",
    region: "US and Canada",
    imageUrl: hr("enterprise-hire-group.svg"),
  },
  {
    name: "Northbridge Recruiters",
    tagline: "Security and cloud programs",
    region: "Hybrid",
    imageUrl: hr("northbridge-recruiters.svg"),
  },
  {
    name: "Stackline Partners",
    tagline: "Senior IC and engineering leads",
    region: "Global",
    imageUrl: hr("stackline-partners.svg"),
  },
];

export const SWIPE_PARTNER_HRS_APPLE: HrPartnerCompany[] = [
  {
    name: "Apex Executive Search",
    tagline: "Consumer hardware and platforms",
    region: "Bay Area",
    imageUrl: hr("apex-executive-search.svg"),
  },
  {
    name: "AI Staffing Collective",
    tagline: "ML and systems talent",
    region: "West Coast",
    imageUrl: hr("ai-staffing-collective.svg"),
  },
  {
    name: "Circuit Recruiters",
    tagline: "Staff-plus and architects",
    region: "Hybrid",
    imageUrl: hr("circuit-recruiters.svg"),
  },
  {
    name: "DeepTech Search",
    tagline: "Silicon and performance roles",
    region: "US",
    imageUrl: hr("deeptech-search.svg"),
  },
];

export const SWIPE_PARTNER_HRS_AMAZON: HrPartnerCompany[] = [
  {
    name: "Signal Talent Group",
    tagline: "Consumer and device software",
    region: "Seattle · Austin",
    imageUrl: hr("signal-talent-group.svg"),
  },
  {
    name: "GPU Talent Syndicate",
    tagline: "Applied science and ML",
    region: "North America",
    imageUrl: hr("gpu-talent-syndicate.svg"),
  },
  {
    name: "Vertex Talent Collective",
    tagline: "Principal and director hiring",
    region: "Global",
    imageUrl: hr("vertex-talent-collective.svg"),
  },
  {
    name: "BluePeak Recruiting",
    tagline: "Operations and engineering",
    region: "NA · EU",
    imageUrl: hr("bluepeak-recruiting.svg"),
  },
];

export const SWIPE_PARTNER_HRS_META: HrPartnerCompany[] = [
  {
    name: "TechMatch Global",
    tagline: "Infrastructure and production eng",
    region: "Menlo Park · Remote",
    imageUrl: hr("techmatch-global.svg"),
  },
  {
    name: "Silicon Search Partners",
    tagline: "Social product engineering",
    region: "US · UK",
    imageUrl: hr("silicon-search-partners.svg"),
  },
  {
    name: "AI Staffing Collective",
    tagline: "Research and GenAI",
    region: "Global",
    imageUrl: hr("ai-staffing-collective.svg"),
  },
  {
    name: "Stackline Partners",
    tagline: "Staff IC and tech leads",
    region: "US",
    imageUrl: hr("stackline-partners.svg"),
  },
];
