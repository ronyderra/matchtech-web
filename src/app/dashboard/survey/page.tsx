"use client";

import { useRouter } from "next/navigation";

export default function SurveyPage() {
  const router = useRouter();

  function markComplete() {
    window.localStorage.setItem("onboarding.surveyCompleted", "true");
    router.push("/dashboard/swipe");
  }

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
        <p style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>Survey (Sample)</p>
        <h1 style={{ margin: "6px 0 8px", fontSize: 30, lineHeight: "36px" }}>Simple survey</h1>
        <p style={{ margin: 0, color: "var(--color-text-secondary)" }}>
          This is a placeholder survey step. In production, this page will include your real survey questions.
        </p>

        <ul style={{ marginTop: 12, color: "var(--color-text-secondary)" }}>
          <li>What role are you targeting?</li>
          <li>Preferred work setup (remote/hybrid/onsite)?</li>
          <li>Target compensation range?</li>
        </ul>

        <div style={{ marginTop: 16 }}>
          <button
            type="button"
            onClick={markComplete}
            style={{
              height: 38,
              border: "none",
              borderRadius: 8,
              background: "var(--color-primary)",
              color: "#fff",
              fontWeight: 700,
              padding: "0 14px",
              cursor: "pointer",
            }}
          >
            Mark as complete (demo)
          </button>
        </div>
      </section>
    </main>
  );
}
