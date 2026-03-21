import type { HrPartnerCompany } from "@/components/dashboard/CompanySwipeDeck/companyCards";
import { COMPANY_SWIPE_CARDS } from "@/components/dashboard/CompanySwipeDeck/companyCards";
import { hrPartnerImagePath } from "@/lib/hrPartnerImage";

/** Deduplicated HR / headhunter partners from all swipe cards, plus global sample entries. */
const EXTRA_PARTNERS: HrPartnerCompany[] = [
  { name: "Apex Executive Search", tagline: "VP+ & staff eng", region: "Global" },
  { name: "Signal Talent Group", tagline: "Startup & Series B+", region: "US · UK" },
];

export function getHrPartnersCatalog(): HrPartnerCompany[] {
  const map = new Map<string, HrPartnerCompany>();
  for (const card of COMPANY_SWIPE_CARDS) {
    for (const p of card.partnerHrs) {
      if (!map.has(p.name)) map.set(p.name, p);
    }
  }
  for (const p of EXTRA_PARTNERS) {
    if (!map.has(p.name)) map.set(p.name, p);
  }
  return Array.from(map.values()).map((p) => ({
    ...p,
    /** `public/hr-partners/{slug}.svg` placeholders — replace with Canva PNGs (see public/hr-partners/README.md). */
    imageUrl: p.imageUrl ?? hrPartnerImagePath(p.name),
  }));
}
