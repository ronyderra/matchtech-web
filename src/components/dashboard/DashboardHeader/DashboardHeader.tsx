"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";

export function DashboardHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 30,
        backgroundColor: "rgba(255, 255, 255, 0.86)",
        backdropFilter: "saturate(180%) blur(10px)",
        WebkitBackdropFilter: "saturate(180%) blur(10px)",
        borderBottom: "1px solid rgba(224, 223, 220, 0.9)",
      }}
    >
      <div
        style={{
          maxWidth: 980,
          margin: "0 auto",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <Link href="/" aria-label="Go to MatchTech home" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontWeight: 600,
              fontFamily: "Georgia, 'Times New Roman', Times, serif",
              fontSize: "clamp(20px, 2.2vw, 24px)",
              letterSpacing: "-0.05em",
              color: "var(--color-primary)",
            }}
          >
            MatchTech
          </span>
        </Link>

        <button
          type="button"
          onClick={() => void signOut({ callbackUrl: "/" })}
          style={{
            height: 36,
            padding: "0 14px",
            borderRadius: 3,
            border: "1px solid var(--color-border)",
            background: "var(--color-surface)",
            color: "var(--color-text-primary)",
            fontSize: 14,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Log out
        </button>
      </div>
    </header>
  );
}
