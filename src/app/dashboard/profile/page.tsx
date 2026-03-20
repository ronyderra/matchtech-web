export default function ProfilePage() {
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
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>Profile page (Sample)</p>
        <h1 style={{ margin: "6px 0 8px", fontSize: 34, lineHeight: "40px" }}>Your profile</h1>
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          Dedicated profile page placeholder. We will connect your personal details here.
        </p>
      </header>
    </main>
  );
}
