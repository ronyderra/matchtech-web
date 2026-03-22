# Dashboard swipe assets

MongoDB `companies` documents store **URL paths** (not binary data) that point at files served from this `public/` directory.

| Use on document | Public path | Files on disk |
|-----------------|-------------|---------------|
| `logoUrl`, `imageUrl` | `/assets/companyImages/*.png` | [`../companyImages/`](../companyImages/) |
| `partnerHrs[].imageUrl` | `/hr-partners/*.svg` | [`../../hr-partners/`](../../hr-partners/) |

After changing filenames, update `src/data/swipeSeedPublicPaths.ts` and re-run `npm run db:companies:reset-seed` if you need Mongo to match.
