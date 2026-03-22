import type { JobPosition, EmploymentType, Seniority, WorkPreference } from "@/types";
import type {
  CompanySwipeCard,
  HrPartnerCompany,
  PositionDetail,
  RequirementMatrixRow,
} from "@/components/dashboard/CompanySwipeDeck/companyCards";

/** One open role: matching filters (JobPosition) + everything the dashboard swipe card UI needs */
export type CompanyDeckPosition = JobPosition & {
  roleTitle: string;
  roleMeta: string;
  compensation: string;
  tags: string[];
  highlights: string[];
  positionDetail: PositionDetail;
};

const DEFAULT_MATRIX: RequirementMatrixRow[] = [
  {
    category: "Experience",
    requirement: "Relevant product or platform experience",
    level: "3+ yrs",
    required: "Yes",
    weight: 4,
  },
  {
    category: "Skills",
    requirement: "Strong fundamentals in your discipline",
    level: "Solid",
    required: "Yes",
    weight: 5,
  },
  {
    category: "Domain",
    requirement: "Familiarity with the product space",
    level: "Preferred",
    required: "Nice-to-have",
    weight: 3,
  },
  {
    category: "Soft",
    requirement: "Clear communication and collaboration",
    level: "Strong",
    required: "Yes",
    weight: 4,
  },
  {
    category: "Tools",
    requirement: "Modern engineering workflow (CI, code review)",
    level: "Working knowledge",
    required: "Yes",
    weight: 3,
  },
  {
    category: "Education",
    requirement: "BS+ in a relevant field or equivalent experience",
    level: "Typical",
    required: "Nice-to-have",
    weight: 2,
  },
];

function minimalPositionDetail(partial: Partial<PositionDetail> & Pick<PositionDetail, "summary">): PositionDetail {
  return {
    summary: partial.summary,
    positionTeaser: partial.positionTeaser ?? partial.summary.slice(0, 120),
    teamDomain: partial.teamDomain ?? "Engineering",
    locationType: partial.locationType ?? "Hybrid",
    coreImpact: partial.coreImpact ?? partial.summary,
    requirementMatrix: partial.requirementMatrix ?? DEFAULT_MATRIX,
    roleOverview: partial.roleOverview ?? partial.summary,
    responsibilities: partial.responsibilities ?? ["Ship high-quality features with the team.", "Collaborate across disciplines."],
    requirements: partial.requirements ?? ["3+ years relevant experience.", "Strong communication skills."],
    niceToHave: partial.niceToHave,
    benefits: partial.benefits ?? ["Competitive compensation.", "Health benefits.", "Flexible work arrangements."],
    teamAndCulture: partial.teamAndCulture ?? "Collaborative team with high ownership and clear goals.",
    employmentType: partial.employmentType ?? "Full-time",
    seniority: partial.seniority ?? "Senior",
    location: partial.location ?? "See role meta",
    teamSize: partial.teamSize,
    postedAgo: partial.postedAgo ?? "Posted recently",
  };
}

function parseSeniority(s: string): Seniority {
  const x = s.toLowerCase();
  if (x.includes("student")) return "student";
  if (x.includes("junior") || x.includes("associate")) return "junior";
  if (x.includes("principal") || x.includes("staff") || x.includes("lead") || x.includes("l7")) return "lead";
  if (x.includes("senior") || x.includes("l5") || x.includes("l6")) return "senior";
  if (x.includes("mid")) return "mid";
  return "senior";
}

function parseEmploymentType(s: string): EmploymentType {
  const x = s.toLowerCase();
  if (x.includes("contract")) return "contract";
  if (x.includes("part-time")) return "part-time";
  if (x.includes("freelance")) return "freelance";
  if (x.includes("intern")) return "student";
  return "full-time";
}

function parseWorkPreference(locationType: string): WorkPreference {
  const x = locationType.toLowerCase();
  if (x.includes("remote")) return "remote";
  if (x.includes("onsite") || x.includes("on-site")) return "onsite";
  if (x.includes("hybrid")) return "hybrid";
  return "hybrid";
}

/** Build Mongo position + JobPosition fields from a dashboard swipe card (static or DB-backed). */
export function companySwipeCardToDeckPosition(card: CompanySwipeCard): CompanyDeckPosition {
  const pd = card.positionDetail;
  const industry = card.facts.find((f) => f.label === "Industry")?.value ?? "Technology";
  return {
    id: card.id,
    industry,
    departments: [pd.teamDomain],
    seniority: parseSeniority(pd.seniority),
    employmentType: parseEmploymentType(pd.employmentType),
    workPreference: parseWorkPreference(pd.locationType),
    city: undefined,
    country: undefined,
    shortDescription: pd.summary,
    skillsRequired: card.tags,
    roleTitle: card.roleTitle,
    roleMeta: card.roleMeta,
    compensation: card.compensation,
    tags: card.tags,
    highlights: card.highlights,
    positionDetail: pd,
  };
}

/** Expand a company document into one CompanySwipeCard per position (for the deck). */
export function companyDocumentToSwipeCards(doc: {
  companyName: string;
  logoUrl?: string;
  description?: string;
  industry?: string;
  companyTagline?: string;
  about?: string;
  companyMore?: string;
  facts?: { label: string; value: string }[];
  partnerHrs?: HrPartnerCompany[];
  positions: Array<
    JobPosition & {
      roleTitle?: string;
      roleMeta?: string;
      compensation?: string;
      tags?: string[];
      highlights?: string[];
      positionDetail?: PositionDetail;
    }
  >;
}): CompanySwipeCard[] {
  const logoUrl = doc.logoUrl ?? "";
  const companyTagline = doc.companyTagline ?? doc.description ?? "";
  const about = doc.about ?? doc.description ?? "";
  const companyMore = doc.companyMore ?? "";
  const facts =
    doc.facts?.length ? doc.facts : doc.industry ? [{ label: "Industry", value: doc.industry }] : [];
  const partnerHrs = doc.partnerHrs?.length ? doc.partnerHrs : [{ name: "MatchTech Partners", tagline: "Hiring support", region: "Global" }];

  return doc.positions.map((p) => {
    if (
      p.roleTitle &&
      p.roleMeta &&
      p.compensation &&
      p.positionDetail &&
      p.tags &&
      p.highlights
    ) {
      return {
        id: p.id,
        companyName: doc.companyName,
        logoUrl,
        roleTitle: p.roleTitle,
        roleMeta: p.roleMeta,
        compensation: p.compensation,
        companyTagline,
        about,
        companyMore,
        tags: p.tags,
        facts,
        highlights: p.highlights,
        positionDetail: p.positionDetail,
        partnerHrs,
      };
    }

    const summary = p.shortDescription ?? `${doc.companyName} — open role`;
    const pd = minimalPositionDetail({
      summary,
      teamDomain: p.industry || doc.industry || "General",
      locationType:
        p.workPreference === "remote"
          ? "Remote"
          : p.workPreference === "onsite"
            ? "On-site"
            : "Hybrid",
      seniority: String(p.seniority),
      employmentType: p.employmentType,
      location: [p.city, p.country].filter(Boolean).join(", ") || "Location TBD",
    });

    return {
      id: p.id,
      companyName: doc.companyName,
      logoUrl,
      roleTitle: "Open position",
      roleMeta: `${p.industry} · ${pd.location}`,
      compensation: p.currency && p.salaryMin ? `${p.currency} ${p.salaryMin}+` : "See employer for compensation",
      companyTagline,
      about,
      companyMore,
      tags: p.skillsRequired?.length ? p.skillsRequired : ["General"],
      facts,
      highlights: [p.shortDescription ?? "See position details."],
      positionDetail: pd,
      partnerHrs,
    };
  });
}

export function flattenCompaniesToSwipeCards(
  companies: Array<Parameters<typeof companyDocumentToSwipeCards>[0]>
): CompanySwipeCard[] {
  return companies.flatMap((c) => companyDocumentToSwipeCards(c));
}
