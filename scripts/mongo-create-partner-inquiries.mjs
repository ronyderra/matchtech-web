/**
 * Creates the `partner_inquiries` collection and indexes (no Next.js required).
 * Usage: npm run db:partner-inquiries
 *
 * Partner page form POSTs to /api/partner-inquiry; documents land in this collection.
 * Uses MONGO_URI and MONGO_DB_NAME from .env in the project root (default DB: matchtech).
 */

import { MongoClient } from "mongodb";
import { readFileSync, existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const envPath = join(root, ".env");

function loadEnv() {
  if (!existsSync(envPath)) {
    console.error("Missing .env at", envPath);
    process.exit(1);
  }
  const raw = readFileSync(envPath, "utf8");
  for (const line of raw.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#")) continue;
    const i = t.indexOf("=");
    if (i === -1) continue;
    const k = t.slice(0, i).trim();
    let v = t.slice(i + 1).trim();
    if (
      (v.startsWith('"') && v.endsWith('"')) ||
      (v.startsWith("'") && v.endsWith("'"))
    ) {
      v = v.slice(1, -1);
    }
    if (k && process.env[k] === undefined) process.env[k] = v;
  }
}

loadEnv();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB_NAME || "matchtech";

if (!uri) {
  console.error("MONGO_URI is not set in .env");
  process.exit(1);
}

const client = new MongoClient(uri);

try {
  await client.connect();
  const db = client.db(dbName);
  const coll = db.collection("partner_inquiries");

  try {
    await db.createCollection("partner_inquiries");
    console.log(`Created collection "${dbName}.partner_inquiries"`);
  } catch (e) {
    const code = e?.code;
    const name = e?.codeName;
    if (code === 48 || name === "NamespaceExists") {
      console.log(`Collection "${dbName}.partner_inquiries" already exists`);
    } else {
      throw e;
    }
  }

  await coll.createIndex({ createdAt: -1 });
  await coll.createIndex({ email: 1 });
  console.log("Indexes ensured: createdAt (desc), email");

  console.log("\nIn MongoDB Compass, open database:", dbName, "→ collection: partner_inquiries");
} finally {
  await client.close();
}
