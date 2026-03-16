"use client";

import Link from "next/link";
import { useState } from "react";
import { Container, Stack, Button } from "@/components/ui";
import { RegisterRoleDialog } from "@/components/homepage/RegisterRoleDialog/RegisterRoleDialog";
import styles from "./Header.module.css";

export function Header() {
  const [registerOpen, setRegisterOpen] = useState(false);

  return (
    <>
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
          <div className={styles.inner}>
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
              <Button
                type="button"
                size="sm"
                style={{
                  boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                  transition: "all 0.2s ease",
                }}
                onClick={() => setRegisterOpen(true)}
              >
                Register
              </Button>
            </Stack>
          </div>
        </Container>
      </header>

      <RegisterRoleDialog
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
      />
    </>
  );
}

