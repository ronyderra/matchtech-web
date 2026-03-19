import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import { CompanySwipeDeck } from "@/components/dashboard/CompanySwipeDeck/CompanySwipeDeck";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/");
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: "48px 24px 64px" }}>
      <header
        style={{
          marginBottom: 24,
          padding: "20px 24px",
          borderRadius: 16,
          border: "1px solid var(--color-border)",
          background: "linear-gradient(135deg, #f8fbff 0%, #f2f7ff 100%)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>Dashboard (Sample)</p>
        <h1 style={{ margin: "6px 0 8px", fontSize: 34, lineHeight: "40px" }}>Welcome to MatchTech</h1>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {session.user.image ? (
            <img
              src={session.user.image}
              alt={session.user.name ? `${session.user.name} profile` : "Profile image"}
              width={44}
              height={44}
              style={{
                borderRadius: "999px",
                objectFit: "cover",
                border: "1px solid var(--color-border)",
              }}
            />
          ) : (
            <div
              aria-hidden="true"
              style={{
                width: 44,
                height: 44,
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 18,
                background: "var(--color-surface)",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
              }}
            >
              {(session.user.name || session.user.email || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <p style={{ margin: 0, fontSize: 16, color: "var(--color-text-secondary)" }}>
            Signed in as <strong>{session.user.name || session.user.email || "LinkedIn user"}</strong>
          </p>
        </div>
      </header>

      <section style={{ marginBottom: 20 }}>
        <CompanySwipeDeck />
      </section>

      <Link
        href="/"
        style={{
          color: "var(--color-primary)",
          textDecoration: "none",
          fontWeight: 600,
        }}
      >
        Go back home
      </Link>
    </main>
  );
}
