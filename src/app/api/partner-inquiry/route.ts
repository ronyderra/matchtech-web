import { NextResponse } from "next/server";
import { insertPartnerInquiry } from "@/lib/partner-inquiry-repository";

/**
 * Public endpoint — consider rate limiting (edge/WAF), honeypot, or captcha for production abuse protection.
 */

const MAX_NAME = 200;
const MAX_EMAIL = 320;
const MAX_ORG = 200;
const MAX_MESSAGE = 5000;

function isValidEmail(value: string): boolean {
  if (value.length > MAX_EMAIL) return false;
  // Practical check: single @, local and domain parts, TLD-ish segment
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(value);
}

function parseBody(body: unknown): { fullName: string; email: string; organization: string; message: string } | null {
  if (!body || typeof body !== "object") return null;
  const o = body as Record<string, unknown>;
  const fullName = typeof o.fullName === "string" ? o.fullName.trim() : "";
  const emailRaw = typeof o.email === "string" ? o.email.trim().toLowerCase() : "";
  const organization = typeof o.organization === "string" ? o.organization.trim() : "";
  const message = typeof o.message === "string" ? o.message.trim() : "";

  if (!fullName || fullName.length > MAX_NAME) return null;
  if (!emailRaw || !isValidEmail(emailRaw)) return null;
  if (organization.length > MAX_ORG) return null;
  if (!message || message.length > MAX_MESSAGE) return null;

  return { fullName, email: emailRaw, organization, message };
}

export async function POST(req: Request) {
  let json: unknown;
  try {
    json = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = parseBody(json);
  if (!parsed) {
    return NextResponse.json(
      { error: "Invalid or missing fields. Check name, email, and message." },
      { status: 400 }
    );
  }

  try {
    const id = await insertPartnerInquiry(parsed);
    return NextResponse.json({ ok: true, id: id.toHexString() }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Could not save your inquiry. Please try again later." }, { status: 500 });
  }
}
