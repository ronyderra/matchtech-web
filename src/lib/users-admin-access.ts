import type { Session } from "next-auth";

/**
 * Who may open `/users` and list all accounts.
 * - If `ADMIN_EMAILS` is set (comma-separated), the signed-in user's email must match (case-insensitive).
 * - If unset: allowed only in development (NODE_ENV=development) so production is not wide open.
 */
export function canListUsers(session: Session | null): boolean {
  const email = session?.user?.email?.trim().toLowerCase();
  if (!email) return false;

  const raw = process.env.ADMIN_EMAILS;
  const admins = raw
    ? raw.split(",").map((s) => s.trim().toLowerCase()).filter(Boolean)
    : [];

  if (admins.length === 0) {
    return process.env.NODE_ENV === "development";
  }

  return admins.includes(email);
}
