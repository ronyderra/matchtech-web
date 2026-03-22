/**
 * Partner page (`/partner`) form → `POST /api/partner-inquiry` → MongoDB collection `partner_inquiries`.
 * Indexes: `npm run db:partner-inquiries`
 */
import { ObjectId, type Collection } from "mongodb";
import { getMongoDb } from "@/lib/mongodb";

export type PartnerInquiryDocument = {
  _id: ObjectId;
  fullName: string;
  email: string;
  organization: string;
  message: string;
  createdAt: Date;
};

let indexesPromise: Promise<void> | null = null;

async function getPartnerInquiriesCollection(): Promise<Collection<PartnerInquiryDocument>> {
  const db = await getMongoDb();
  const collection = db.collection<PartnerInquiryDocument>("partner_inquiries");
  if (!indexesPromise) {
    indexesPromise = Promise.all([
      collection.createIndex({ createdAt: -1 }),
      collection.createIndex({ email: 1 }),
    ]).then(() => undefined);
  }
  await indexesPromise;
  return collection;
}

export type NewPartnerInquiryInput = {
  fullName: string;
  email: string;
  organization: string;
  message: string;
};

export async function insertPartnerInquiry(input: NewPartnerInquiryInput): Promise<ObjectId> {
  const collection = await getPartnerInquiriesCollection();
  const now = new Date();
  const doc: PartnerInquiryDocument = {
    _id: new ObjectId(),
    fullName: input.fullName,
    email: input.email,
    organization: input.organization,
    message: input.message,
    createdAt: now,
  };
  await collection.insertOne(doc);
  return doc._id;
}
