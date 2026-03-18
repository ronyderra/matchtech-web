"use client";

import Link from "next/link";
import { useState } from "react";
import { Container, Stack, Button } from "@/components/ui";
import { RegisterRoleDialog } from "@/components/homepage/RegisterRoleDialog/RegisterRoleDialog";
import { LoginDialog } from "@/components/homepage/LoginDialog/LoginDialog";
import styles from "./Header.module.css";

export function Header() {
  const [registerOpen, setRegisterOpen] = useState(false);
  const [loginOpen, setLoginOpen] = useState(false);

  return (
    <>
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
                  // textShadow: "0 1px 2px rgba(15, 23, 42, 0.25)",
                }}
              >
                MatchTech
              </span>
            </Link>

            <nav aria-label="Primary navigation">
              <Stack direction="row" gap={12} align="center">
                <Button
                  type="button"
                  size="sm"
                  variant="ghost"
                  style={{
                    color: "var(--color-primary)",
                    backgroundColor: "transparent",
                  }}
                  onClick={() => setLoginOpen(true)}
                >
                  Log in
                </Button>
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
            </nav>
          </div>
        </Container>
      </header>

      <RegisterRoleDialog
        open={registerOpen}
        onClose={() => setRegisterOpen(false)}
        onOpenLogin={() => {
          setRegisterOpen(false);
          setLoginOpen(true);
        }}
      />
      <LoginDialog
        open={loginOpen}
        onClose={() => setLoginOpen(false)}
        onOpenRegister={() => {
          setLoginOpen(false);
          setRegisterOpen(true);
        }}
      />
    </>
  );
}

