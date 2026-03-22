import { findCompanyBySlug, initCompaniesCollection, insertCompany } from "@/lib/company-repository";
import { MONGO_COMPANY_SEED_INPUTS } from "@/data/mongoCompaniesSeed";

/**
 * Inserts each company if its slug is not already present—same payload as the swipe deck
 * (Apple, Microsoft, Google, Amazon, Meta, two roles each, with public asset paths).
 */
export async function seedSampleCompanies(): Promise<{
  inserted: number;
  skipped: number;
  slugs: string[];
}> {
  await initCompaniesCollection();
  let inserted = 0;
  let skipped = 0;
  const slugs: string[] = [];

  for (const row of MONGO_COMPANY_SEED_INPUTS) {
    const exists = await findCompanyBySlug(row.slug);
    if (exists) {
      skipped += 1;
      slugs.push(row.slug);
      continue;
    }
    await insertCompany(row);
    inserted += 1;
    slugs.push(row.slug);
  }

  return { inserted, skipped, slugs };
}
