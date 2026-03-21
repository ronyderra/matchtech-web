import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import type { Session } from "next-auth";
import { authOptions } from "@/auth";
import {
  findUserById,
  normalizeTalentPatch,
  updateTalentProfileByUserId,
} from "@/lib/user-repository";

function getSessionUserId(session: Session | null) {
  return (session?.user as { id?: string } | undefined)?.id;
}

export async function GET() {
  const session = await getServerSession(authOptions);
  const userId = getSessionUserId(session);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const user = await findUserById(userId);
  if (!user) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
  return NextResponse.json({ profile: user.profile });
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const userId = getSessionUserId(session);
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const patch = normalizeTalentPatch(body);
  const updated = await updateTalentProfileByUserId(userId, patch);
  if (!updated) {
    return NextResponse.json({ error: "Profile not found" }, { status: 404 });
  }
  return NextResponse.json({ profile: updated });
}
