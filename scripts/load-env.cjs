/**
 * Preloads `.env` then `.env.local` (local overrides) before tsx runs CLI scripts.
 * Used by npm scripts so `MONGO_URI` is available when `src/lib/mongodb.ts` loads.
 */
const { existsSync } = require("node:fs");
const { resolve } = require("node:path");
const dotenv = require("dotenv");

const root = resolve(__dirname, "..");
for (const [name, override] of [
  [".env", false],
  [".env.local", true],
]) {
  const p = resolve(root, name);
  if (existsSync(p)) {
    dotenv.config({ path: p, override });
  }
}
