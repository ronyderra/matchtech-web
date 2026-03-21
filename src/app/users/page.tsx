import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { listAllUsersForTable } from "@/lib/user-repository";
import { canListUsers } from "@/lib/users-admin-access";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Users | MatchTech",
  robots: { index: false, follow: false },
};

function formatDt(iso: string | null) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleString(undefined, {
      dateStyle: "short",
      timeStyle: "short",
    });
  } catch {
    return iso;
  }
}

export default async function UsersAdminPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  if (!canListUsers(session)) {
    return (
      <main style={{ padding: "48px 24px", maxWidth: 560, margin: "0 auto" }}>
        <h1 style={{ fontSize: 22, marginBottom: 12 }}>Access denied</h1>
        <p style={{ color: "var(--color-text-secondary)", marginBottom: 20 }}>
          You don’t have permission to view this page. In production, add your email to{" "}
          <code style={{ fontSize: 13 }}>ADMIN_EMAILS</code> in the server environment (comma-separated).
        </p>
        <Link href="/dashboard" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
          Back to dashboard
        </Link>
      </main>
    );
  }

  const rows = await listAllUsersForTable();

  return (
    <main style={{ padding: "24px 16px 48px", maxWidth: "min(1200px, 100%)", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <h1 style={{ fontSize: 26, margin: 0 }}>Users</h1>
        <Link href="/dashboard" style={{ color: "var(--color-primary)", fontWeight: 600 }}>
          Dashboard
        </Link>
      </div>
      <p style={{ color: "var(--color-text-secondary)", marginBottom: 16, fontSize: 14 }}>
        {rows.length} user{rows.length === 1 ? "" : "s"} in <code>users</code> collection.
      </p>

      <div style={{ overflowX: "auto", border: "1px solid var(--color-border)", borderRadius: 4 }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 13,
            background: "var(--color-surface)",
          }}
        >
          <thead>
            <tr style={{ background: "var(--color-surface-elevated, #f4f4f5)", textAlign: "left" }}>
              {[
                "Name",
                "Profile email",
                "Auth email",
                "Provider",
                "LinkedIn ID",
                "Created",
                "Last login",
                "CV",
                "Survey",
              ].map((label) => (
                <th
                  key={label}
                  style={{
                    padding: "10px 12px",
                    borderBottom: "1px solid var(--color-border)",
                    fontWeight: 600,
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td colSpan={9} style={{ padding: 24, textAlign: "center", color: "var(--color-text-muted)" }}>
                  No users yet.
                </td>
              </tr>
            ) : (
              rows.map((u) => (
                <tr key={u.id} style={{ borderBottom: "1px solid var(--color-border)" }}>
                  <td style={{ padding: "10px 12px", maxWidth: 160 }}>{u.fullName || "—"}</td>
                  <td style={{ padding: "10px 12px", maxWidth: 200, wordBreak: "break-all" }}>
                    {u.profileEmail || "—"}
                  </td>
                  <td style={{ padding: "10px 12px", maxWidth: 200, wordBreak: "break-all" }}>
                    {u.authEmail || "—"}
                  </td>
                  <td style={{ padding: "10px 12px" }}>{u.provider}</td>
                  <td
                    style={{
                      padding: "10px 12px",
                      maxWidth: 120,
                      wordBreak: "break-all",
                      fontFamily: "ui-monospace, monospace",
                      fontSize: 12,
                    }}
                    title={u.providerAccountId}
                  >
                    {u.providerAccountId.length > 14
                      ? `${u.providerAccountId.slice(0, 8)}…`
                      : u.providerAccountId}
                  </td>
                  <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>{formatDt(u.createdAt)}</td>
                  <td style={{ padding: "10px 12px", whiteSpace: "nowrap" }}>{formatDt(u.lastLoginAt)}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>{u.cvUploaded ? "Yes" : "No"}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center" }}>{u.surveyCompleted ? "Yes" : "No"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
