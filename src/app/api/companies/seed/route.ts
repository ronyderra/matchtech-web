import { NextResponse } from "next/server";
import { seedSampleCompanies } from "@/lib/seed-companies";

async function handleSeed() {
  try {
    const result = await seedSampleCompanies();
    return NextResponse.json({
      ok: true,
      inserted: result.inserted,
      skipped: result.skipped,
      slugs: result.slugs,
      message:
        result.inserted > 0
          ? `Inserted ${result.inserted} company document(s) with 2 positions each.`
          : "All seed companies already exist (Google, Microsoft, Apple, Amazon, NVIDIA — matched by slug). Nothing inserted.",
    });
  } catch {
    return NextResponse.json(
      { error: "Seed failed. Check MONGO_URI and that the companies collection can be written." },
      { status: 500 }
    );
  }
}

/** Seeds Google, Microsoft, Apple, Amazon, NVIDIA (2 positions each) where slugs are missing. */
export async function POST() {
  return handleSeed();
}

export async function GET() {
  return handleSeed();
}
