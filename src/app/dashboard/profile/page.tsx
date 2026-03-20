import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: "1px solid var(--color-border)", borderRadius: 10, padding: "10px 12px" }}>
      <p style={{ margin: 0, fontSize: 12, color: "var(--color-text-muted)" }}>{label}</p>
      <p style={{ margin: "4px 0 0", fontSize: 15, color: "var(--color-text-primary)", wordBreak: "break-word" }}>
        {value}
      </p>
    </div>
  );
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = (user as { id?: string } | undefined)?.id ?? "Not available";

  return (
    <main style={{ maxWidth: 980, margin: "0 auto" }}>
      <header
        style={{
          marginBottom: 24,
          padding: "20px 24px",
          borderRadius: 16,
          border: "1px solid var(--color-border)",
          background: "linear-gradient(135deg, #f8fbff 0%, #f2f7ff 100%)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>Profile page</p>
        <h1 style={{ margin: "6px 0 8px", fontSize: 34, lineHeight: "40px" }}>Your profile</h1>
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          All account details currently available from LinkedIn/Auth.js.
        </p>
      </header>

      <section
        style={{
          padding: "20px 24px",
          borderRadius: 16,
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
          {user?.image ? (
            <img
              src={user.image}
              alt={user.name ? `${user.name} profile` : "Profile image"}
              width={72}
              height={72}
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
                width: 72,
                height: 72,
                borderRadius: "999px",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 700,
                fontSize: 28,
                background: "#f8fbff",
                border: "1px solid var(--color-border)",
                color: "var(--color-text-secondary)",
              }}
            >
              {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h2 style={{ margin: 0, fontSize: 24 }}>{user?.name || "LinkedIn user"}</h2>
            <p style={{ margin: "4px 0 0", color: "var(--color-text-secondary)" }}>
              {user?.email || "No email provided"}
            </p>
          </div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 10,
          }}
        >
          <Field label="User ID" value={userId} />
          <Field label="Name" value={user?.name || "Not available"} />
          <Field label="Email" value={user?.email || "Not available"} />
          <Field label="Image URL" value={user?.image || "Not available"} />
          <Field label="Session expires" value={session?.expires || "Not available"} />
          <Field label="Auth provider" value="LinkedIn (OAuth / OIDC)" />
        </div>
      </section>
    </main>
  );
}
