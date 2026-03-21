import type { Session } from "next-auth";

function sessionUserId(session: Session | null): string | undefined {
  return (session?.user as { id?: string } | undefined)?.id;
}

/**
 * Who may open `/users` and list all accounts.
 * - If `ADMIN_EMAILS` is set (comma-separated), the signed-in user's email must match (case-insensitive).
 * - If unset: in development, any signed-in user (email or Mongo user id on session). In production, denied unless `ADMIN_EMAILS` is set.
 *
 * Note: LinkedIn / NextAuth sometimes omit `user.email` on the session; the app still sets `user.id` from Mongo.
 */
export function canListUsers(session: Session | null): boolean {
  if (!session?.user) return false;

  const email = session.user.email?.trim().toLowerCase() ?? "";
  const userId = sessionUserId(session);
  const signedIn = Boolean(email || userId);

  const raw = process.env.ADMIN_EMAILS;
  const admins = raw
    ? raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
    : [];

  if (admins.length === 0) {
    return process.env.NODE_ENV === "development" && signedIn;
  }

  if (!email) return false;
  return admins.includes(email);
}
