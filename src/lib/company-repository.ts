import { ObjectId, type Collection } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";
import type { CompanyDeckPosition } from "@/lib/company-swipe-mongo";
import type { HrPartnerCompany } from "@/components/dashboard/CompanySwipeDeck/companyCards";

// Re-export for consumers
export type { CompanyDeckPosition } from "@/lib/company-swipe-mongo";

/**
 * Employer record in MongoDB collection `companies`.
 * `positions` include dashboard swipe card fields (`roleTitle`, `positionDetail`, …).
 */
export type CompanyDocument = {
  _id: ObjectId;
  /** URL-safe unique key, e.g. "acme-inc" */
  slug: string;
  companyName: string;
  logoUrl?: string;
  imageUrl?: string;
  backgroundColor?: string;
  websiteUrl?: string;
  email?: string;
  phoneNumber?: string;
  industry?: string;
  description?: string;
  companySize?: "1-10" | "11-50" | "51-200" | "201-500" | "501-1000" | "1000+";
  foundedYear?: number;
  isActivelyHiring?: boolean;
  /** Shown on swipe cards / info sheet (company block) */
  companyTagline?: string;
  about?: string;
  companyMore?: string;
  facts?: { label: string; value: string }[];
  partnerHrs?: HrPartnerCompany[];
  /** Open roles — each must satisfy dashboard `CompanySwipeCard` when mapped */
  positions: CompanyDeckPosition[];
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
};

let companiesInitPromise: Promise<void> | null = null;

/**
 * Creates the `companies` collection if it does not exist, then ensures indexes.
 * MongoDB does not show a collection in Compass until it exists — inserts used to be the only way;
 * we call `createCollection` explicitly so the namespace appears even when empty.
 */
async function ensureCompaniesDbReady(): Promise<void> {
  const db = await getMongoDb();
  try {
    await db.createCollection("companies");
  } catch (e: unknown) {
    const err = e as { code?: number; codeName?: string };
    if (err.code !== 48 && err.codeName !== "NamespaceExists") throw e;
  }
  const coll = db.collection<CompanyDocument>("companies");
  await Promise.all([
    coll.createIndex({ slug: 1 }, { unique: true }),
    coll.createIndex({ companyName: 1 }),
    coll.createIndex({ updatedAt: -1 }),
  ]);
}

async function getCompaniesCollection(): Promise<Collection<CompanyDocument>> {
  const db = await getMongoDb();
  if (!companiesInitPromise) {
    companiesInitPromise = ensureCompaniesDbReady().catch((err) => {
      companiesInitPromise = null;
      throw err;
    });
  }
  await companiesInitPromise;
  return db.collection<CompanyDocument>("companies");
}

/** Public hook: materialize `companies` + indexes (safe to call multiple times). */
export async function initCompaniesCollection(): Promise<void> {
  await getCompaniesCollection();
}

/** Ensure every position has a stable string id for updates and API responses */
export function ensureDeckPositionIds(positions: CompanyDeckPosition[]): CompanyDeckPosition[] {
  return positions.map((p) => ({
    ...p,
    id: typeof p.id === "string" && p.id.trim() ? p.id.trim() : new ObjectId().toHexString(),
  }));
}

export type NewCompanyInput = {
  slug: string;
  companyName: string;
  logoUrl?: string;
  imageUrl?: string;
  backgroundColor?: string;
  websiteUrl?: string;
  email?: string;
  phoneNumber?: string;
  industry?: string;
  description?: string;
  companySize?: CompanyDocument["companySize"];
  foundedYear?: number;
  isActivelyHiring?: boolean;
  positions: CompanyDeckPosition[];
  companyTagline?: string;
  about?: string;
  companyMore?: string;
  facts?: { label: string; value: string }[];
  partnerHrs?: HrPartnerCompany[];
  tags?: string[];
};

export async function insertCompany(input: NewCompanyInput): Promise<CompanyDocument> {
  const collection = await getCompaniesCollection();
  const now = new Date();
  const slug = input.slug.trim().toLowerCase();
  const doc: CompanyDocument = {
    _id: new ObjectId(),
    slug,
    companyName: input.companyName.trim(),
    logoUrl: input.logoUrl?.trim() || undefined,
    imageUrl: input.imageUrl?.trim() || undefined,
    backgroundColor: input.backgroundColor?.trim() || undefined,
    websiteUrl: input.websiteUrl?.trim() || undefined,
    email: input.email?.trim() || undefined,
    phoneNumber: input.phoneNumber?.trim() || undefined,
    industry: input.industry?.trim() || undefined,
    description: input.description?.trim() || undefined,
    companySize: input.companySize,
    foundedYear: input.foundedYear,
    isActivelyHiring: input.isActivelyHiring ?? true,
    companyTagline: input.companyTagline?.trim() || undefined,
    about: input.about?.trim() || undefined,
    companyMore: input.companyMore?.trim() || undefined,
    facts: input.facts,
    partnerHrs: input.partnerHrs,
    positions: ensureDeckPositionIds(input.positions),
    tags: input.tags?.length ? input.tags.map((t) => t.trim()).filter(Boolean) : undefined,
    createdAt: now,
    updatedAt: now,
  };
  await collection.insertOne(doc);
  return doc;
}

export async function listCompanies(): Promise<CompanyDocument[]> {
  const collection = await getCompaniesCollection();
  return collection.find({}).sort({ companyName: 1 }).toArray();
}

export async function findCompanyBySlug(slug: string): Promise<CompanyDocument | null> {
  const collection = await getCompaniesCollection();
  return collection.findOne({ slug: slug.trim().toLowerCase() });
}

export async function findCompanyById(id: string): Promise<CompanyDocument | null> {
  if (!ObjectId.isValid(id)) return null;
  const collection = await getCompaniesCollection();
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function updateCompanyPositions(
  companyId: string,
  positions: CompanyDeckPosition[]
): Promise<CompanyDocument | null> {
  const existing = await findCompanyById(companyId);
  if (!existing) return null;
  const collection = await getCompaniesCollection();
  const nextPositions = ensureDeckPositionIds(positions);
  const updatedAt = new Date();
  await collection.updateOne(
    { _id: existing._id },
    { $set: { positions: nextPositions, updatedAt } }
  );
  return { ...existing, positions: nextPositions, updatedAt };
}

export async function countCompanies(): Promise<number> {
  const collection = await getCompaniesCollection();
  return collection.countDocuments();
}

/** Removes every document in `companies` (destructive). Returns deleted count. */
export async function deleteAllCompanies(): Promise<number> {
  const collection = await getCompaniesCollection();
  const result = await collection.deleteMany({});
  return result.deletedCount;
}
