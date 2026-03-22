import { NextResponse } from "next/server";
import { listCompanies } from "@/lib/company-repository";

/**
 * Lists all companies and their embedded `positions` from MongoDB.
 * First request also creates the empty `companies` collection + indexes if missing.
 */
export async function GET() {
  try {
    const docs = await listCompanies();
    const companies = docs.map((c) => ({
      id: c._id.toHexString(),
      slug: c.slug,
      companyName: c.companyName,
      logoUrl: c.logoUrl,
      imageUrl: c.imageUrl,
      backgroundColor: c.backgroundColor,
      websiteUrl: c.websiteUrl,
      email: c.email,
      phoneNumber: c.phoneNumber,
      industry: c.industry,
      description: c.description,
      companySize: c.companySize,
      foundedYear: c.foundedYear,
      isActivelyHiring: c.isActivelyHiring,
      companyTagline: c.companyTagline,
      about: c.about,
      companyMore: c.companyMore,
      facts: c.facts,
      partnerHrs: c.partnerHrs,
      positions: c.positions,
      tags: c.tags,
      createdAt: c.createdAt.toISOString(),
      updatedAt: c.updatedAt.toISOString(),
    }));
    return NextResponse.json({ companies });
  } catch {
    return NextResponse.json({ error: "Failed to load companies" }, { status: 500 });
  }
}
