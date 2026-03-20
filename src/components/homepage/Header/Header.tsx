"use client";

import Link from "next/link";
import { Container } from "@/components/ui";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "rgba(255, 255, 255, 0.72)",
        backdropFilter: "saturate(180%) blur(10px)",
        WebkitBackdropFilter: "saturate(180%) blur(10px)",
        borderBottom: "1px solid rgba(224, 223, 220, 0.8)",
        boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <Container>
        <div className={styles.inner}>
          <Link href="/" aria-label="Go to MatchTech home">
            <span
              style={{
                fontWeight: 600,
                fontFamily: "Georgia, 'Times New Roman', Times, serif",
                fontSize: "clamp(21px, 2.4vw, 26px)",
                letterSpacing: "-0.05em",
                color: "var(--color-primary)",
              }}
            >
              MatchTech
            </span>
          </Link>

          <nav className={styles.nav} aria-label="Header links">
            <Link href="/partner" className={styles.navLink}>
              Partner with us
            </Link>
          </nav>
        </div>
      </Container>
    </header>
  );
}

