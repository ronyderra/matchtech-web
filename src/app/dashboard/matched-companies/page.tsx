export default function MatchedCompaniesPage() {
  return (
    <main style={{ maxWidth: 980, margin: "0 auto" }}>
      <section
        style={{
          padding: "20px 24px",
          borderRadius: 16,
          border: "1px solid var(--color-border)",
          background: "var(--color-surface)",
        }}
      >
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>Matched Companies (Sample)</p>
        <h1 style={{ margin: "6px 0 8px", fontSize: 30, lineHeight: "36px" }}>Your matches</h1>
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          Placeholder page for matched companies. We will connect this to real data next.
        </p>
      </section>
    </main>
  );
}
