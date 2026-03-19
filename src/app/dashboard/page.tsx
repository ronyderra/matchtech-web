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
    <main style={{ maxWidth: 880, margin: "0 auto", padding: "80px 24px" }}>
      <h1 style={{ fontSize: 40, lineHeight: "48px", marginBottom: 12 }}>
        Welcome to MatchTech
      </h1>
      <p style={{ fontSize: 18, color: "var(--color-text-secondary)", marginBottom: 24 }}>
        Signed in as {session.user.name || session.user.email || "LinkedIn user"}.
      </p>
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
