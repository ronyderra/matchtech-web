/**
 * Run from repo root: npx tsx scripts/seed-companies-cli.ts
 * Inserts Mongo companies (same as GET /api/companies/seed).
 */
import { seedSampleCompanies } from "../src/lib/seed-companies";

seedSampleCompanies()
  .then((r) => {
    console.log(r);
    process.exit(0);
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
