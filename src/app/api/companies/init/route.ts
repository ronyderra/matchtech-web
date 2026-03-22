import { NextResponse } from "next/server";
import { initCompaniesCollection } from "@/lib/company-repository";

async function handleInit() {
  try {
    await initCompaniesCollection();
    return NextResponse.json({
      ok: true,
      message: "MongoDB collection `companies` exists and indexes are ensured.",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to initialize companies collection. Check MONGO_URI and DB access." },
      { status: 500 }
    );
  }
}

/**
 * Materializes the `companies` collection and indexes (empty collection is visible in Compass).
 * Idempotent — safe to call multiple times.
 * Open in browser: GET /api/companies/init
 */
export async function GET() {
  return handleInit();
}

export async function POST() {
  return handleInit();
}
