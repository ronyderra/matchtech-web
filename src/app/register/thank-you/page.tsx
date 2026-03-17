"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  Section,
  Stack,
  Grid,
  Heading,
  Text,
  Card,
  Button,
  Divider,
} from "@/components/ui";
import { useUserStore } from "@/store";
import { ProfileCardPreview } from "@/components/homepage/SwipeCardDemo/SwipeCardDemo";
import styles from "./page.module.css";

function CheckIcon() {
  return (
    <div
      aria-hidden="true"
      style={{
        width: 44,
        height: 44,
        borderRadius: 999,
        background: "rgba(34, 197, 94, 0.10)",
        border: "1px solid rgba(34, 197, 94, 0.22)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "rgb(22, 163, 74)",
        fontSize: 22,
        fontWeight: 700,
      }}
    >
      ✓
    </div>
  );
}

export default function RegisterThankYouPage() {
  const router = useRouter();
  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) {
      router.replace("/");
    }
  }, [user, router]);

  if (!user) return null;

  const email =
    user.type === "talent"
      ? user.email
      : user.type === "company"
        ? user.email
        : undefined;

  return (
    <Container>
      <div className={styles.pageShell}>
        <Section>
          <Grid
            cols={2}
            stackOnMobile
            gap={44}
            style={{ alignItems: "start" } as any}
          >
            {/* Left: copy + next steps */}
            <Stack
              gap={22}
              className={styles.leftCol}
            >
              <Stack
                gap={10}
                style={{
                  alignItems: "flex-start",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <Heading as="h1" size="lg" style={{ margin: 0 }}>
                    Thank you for registering
                  </Heading>
                  <CheckIcon />
                </div>
                <Text
                  as="p"
                  style={{
                    margin: 0,
                    color: "var(--color-text-secondary)",
                    fontSize: 16,
                    lineHeight: "26px",
                    maxWidth: 520,
                  }}
                >
                  Your MatchTech profile is now set up. We’re still getting everything ready, and
                  we’ll notify you by email as soon as the platform goes live.
                </Text>
                <Text
                  as="p"
                  className={styles.mobileHide}
                  style={{ margin: 0, color: "var(--color-text-muted)", fontSize: 13 }}
                >
                  In the meantime, here’s a preview of your profile as it currently looks.
                </Text>
              </Stack>

              {email ? (
                <Card
                  padded
                  style={{
                    width: "100%",
                    background: "rgba(148, 163, 184, 0.08)",
                    border: "1px solid rgba(148, 163, 184, 0.22)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                    <div style={{ textAlign: "left" }}>
                      <Text
                        as="p"
                        className={styles.notifyTextAlign}
                        style={{ margin: 0, fontSize: 14, color: "var(--color-text-secondary)" }}
                      >
                        We’ll notify you at:
                      </Text>
                      <Text
                        as="p"
                        style={{
                          margin: 0,
                          marginTop: 4,
                          fontSize: 16,
                          fontWeight: 600,
                          color: "var(--color-text-primary)",
                          wordBreak: "break-word",
                        }}
                      >
                        {email}
                      </Text>
                    </div>
                    <Text as="p" style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>
                      Please check your inbox when we launch.
                    </Text>
                  </div>
                </Card>
              ) : null}

              {/* Mobile: show preview under notify section */}
              <div className={styles.mobileOnly}>
                <div
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <div style={{ width: "100%", maxWidth: 560 }}>
                    <ProfileCardPreview user={user} />
                  </div>
                </div>
              </div>

              <Divider />

              <Card
                padded
                style={{
                  width: "100%",
                  background: "rgba(59, 130, 246, 0.08)",
                  border: "1px solid rgba(59, 130, 246, 0.18)",
                }}
              >
                <Text as="p" style={{ margin: 0, fontWeight: 600 }}>
                  Built from your registration details
                </Text>
                <Text as="p" style={{ margin: 0, marginTop: 6, color: "var(--color-text-secondary)" }}>
                  This preview is based on the information you provided during signup and anything we extracted from your CV. You’ll be able to review and refine everything once MatchTech goes live.
                </Text>
              </Card>

              <div className={styles.mobileHide}>
                <Heading as="h2" size="md">
                  What happens next
                </Heading>
                <ul style={{ marginTop: 8, marginBottom: 0, paddingLeft: 18, color: "var(--color-text-secondary)" }}>
                  <li>We’re preparing the platform for launch</li>
                  <li>We’ll email you as soon as MatchTech is live</li>
                  <li>Your profile will be ready to help you connect with relevant opportunities</li>
                </ul>
              </div>

              <Stack
                direction="row"
                gap={12}
                wrap
                className={styles.buttonRow}
                style={{ marginTop: 4 }}
              >
                <Link href="/">
                  <Button>Back to homepage</Button>
                </Link>
              </Stack>
              <Text as="p" style={{ margin: 0, fontSize: 13, color: "var(--color-text-muted)" }}>
                Profile editing will be available when MatchTech goes live.
              </Text>
            </Stack>

            {/* Right: preview */}
            <div className={styles.desktopOnly}>
              <Stack gap={12} style={{ alignItems: "center" }}>
                <div style={{ width: "100%", maxWidth: 560 }}>
                  <ProfileCardPreview user={user} />
                </div>
              </Stack>
            </div>
          </Grid>
        </Section>
      </div>
    </Container>
  );
}

