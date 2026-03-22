/**
 * DESTRUCTIVE: Removes all documents from the MongoDB `companies` collection, then inserts
 * five major technology employers—Apple, Microsoft, Google (Alphabet), Amazon, and Meta—each
 * with two open roles (real job titles and full card copy for `/dashboard/swipe`).
 * Uses public asset paths for logos and HR partner artwork (`swipeSeedPublicPaths.ts`).
 *
 * Requires `MONGO_URI` and optional `MONGO_DB_NAME` in `.env` or `.env.local` (loaded via
 * `scripts/load-env.cjs` when using npm).
 *
 * Run: npm run db:companies:reset-seed
 */
import { deleteAllCompanies, initCompaniesCollection, insertCompany } from "../src/lib/company-repository";
import { MONGO_COMPANY_SEED_INPUTS } from "../src/data/mongoCompaniesSeed";

async function main(): Promise<void> {
  await initCompaniesCollection();
  const deleted = await deleteAllCompanies();
  console.log(`Cleared companies collection (${deleted} document(s) removed).`);

  for (const row of MONGO_COMPANY_SEED_INPUTS) {
    await insertCompany(row);
    console.log(`Inserted employer: ${row.companyName} — ${row.positions.length} open roles`);
  }

  const totalPositions = MONGO_COMPANY_SEED_INPUTS.reduce((n, c) => n + c.positions.length, 0);
  console.log(
    `Finished. ${MONGO_COMPANY_SEED_INPUTS.length} employers, ${totalPositions} open roles total.`
  );
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
