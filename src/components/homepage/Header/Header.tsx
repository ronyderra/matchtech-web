"use client";

import Link from "next/link";
import { Container, Stack, Button } from "@/components/ui";

export function Header() {
  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        backgroundColor: "#FFFFFF",
        borderBottom: "1px solid #E0DFDC",
        boxShadow: "0px 1px 2px rgba(0,0,0,0.05)",
      }}
    >
      <Container>
        <Stack
          direction="row"
          align="center"
          justify="space-between"
          gap={12}
          style={{ height: 64 }}
        >
          <Link href="/" aria-label="Go to MatchTech home">
            <span
              style={{
                fontWeight: 700,
                fontSize: "var(--font-size-title)",
                letterSpacing: "-0.02em",
              }}
            >
              MatchTech.com
            </span>
          </Link>

          <Stack direction="row" gap={12} align="center">
            <Link href="/login">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                style={{
                  color: "var(--color-primary)",
                  backgroundColor: "transparent",
                }}
              >
                Log in
              </Button>
            </Link>
            <Link href="/register">
              <Button
                type="button"
                size="sm"
                style={{
                  boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                }}
              >
                Register
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Container>
    </header>
  );
}

