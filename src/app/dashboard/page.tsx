import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";

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

      <section
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
          gap: 12,
          marginBottom: 24,
        }}
      >
        <article style={{ padding: 16, border: "1px solid var(--color-border)", borderRadius: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>New matches</p>
          <p style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700 }}>24</p>
        </article>
        <article style={{ padding: 16, border: "1px solid var(--color-border)", borderRadius: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>Pending applications</p>
          <p style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700 }}>7</p>
        </article>
        <article style={{ padding: 16, border: "1px solid var(--color-border)", borderRadius: 12 }}>
          <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>Profile strength</p>
          <p style={{ margin: "4px 0 0", fontSize: 26, fontWeight: 700 }}>82%</p>
        </article>
      </section>

      <section
        style={{
          padding: 18,
          border: "1px solid var(--color-border)",
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <h2 style={{ margin: "0 0 10px", fontSize: 18 }}>Next steps</h2>
        <ul style={{ margin: 0, paddingLeft: 18, color: "var(--color-text-secondary)", lineHeight: 1.6 }}>
          <li>Complete your profile details and skills.</li>
          <li>Review suggested companies and swipe to match.</li>
          <li>Track your applications from this dashboard.</li>
        </ul>
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
