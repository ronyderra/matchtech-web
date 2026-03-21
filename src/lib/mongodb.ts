import { MongoClient, type Db } from "mongodb";

const MONGO_URI = process.env.MONGO_URI;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME || "matchtech";

if (!MONGO_URI) {
  throw new Error("Missing MONGO_URI environment variable.");
}
const MONGO_URI_SAFE: string = MONGO_URI;

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

export async function getMongoClient(): Promise<MongoClient> {
  if (client) return client;
  if (!clientPromise) {
    clientPromise = new MongoClient(MONGO_URI_SAFE).connect();
  }
  client = await clientPromise;
  return client;
}

export async function getMongoDb(): Promise<Db> {
  const mongoClient = await getMongoClient();
  return mongoClient.db(MONGO_DB_NAME);
}
