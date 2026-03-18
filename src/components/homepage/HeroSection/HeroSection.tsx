"use client";

import Link from "next/link";
import { Container, Section, Stack, Heading, Text, Button, Grid } from "@/components/ui";
import { SwipeCardDemo } from "@/components/homepage/SwipeCardDemo/SwipeCardDemo";
import styles from "./HeroSection.module.css";

export function HeroSection() {
  return (
    <Section
      className={styles.section}
      style={{
        paddingTop: 80,
        paddingBottom: 80,
      }}
    >
      <Container>
        <Grid cols={2} stackOnMobile gap={64}>
          {/* Left column: text + CTAs */}
          <Stack
            gap={20}
            style={{
              maxWidth: 560,
              justifyContent: "center",
            }}
          >
            <Heading
              as="h1"
              size="xl"
              className={styles.heroTitle}
              style={{
                fontSize: 48,
                lineHeight: "56px",
              }}
            >
              Where Talent and Opportunity Meet With a Swipe.
            </Heading>
            <Text
              as="p"
              style={{
                fontSize: 18,
                lineHeight: "28px",
                color: "var(--color-text-secondary)",
                maxWidth: 520,
              }}
            >
              MatchTech is a modern hiring platform where job seekers and companies
              connect through a simple swipe-based experience.
            </Text>

            {/* Desktop CTAs: horizontal */}
            <Stack
              direction="row"
              gap={16}
              wrap
              style={{ alignItems: "center" }}
            >
              <Link href="/register/typ/job-seeker">
                <Button
                  style={{
                    height: 48,
                    paddingInline: 24,
                    borderRadius: 8,
                    boxShadow: "0px 1px 2px rgba(0,0,0,0.1)",
                    transition: "all 0.2s ease",
                  }}
                >
                  Find a Job
                </Button>
              </Link>
              <Link href="/register/employer">
                <Button
                  variant="secondary"
                  style={{
                    height: 48,
                    paddingInline: 24,
                    borderRadius: 8,
                  }}
                >
                  Hire Talent
                </Button>
              </Link>
            </Stack>

            <Text
              as="p"
              variant="muted"
              style={{
                fontSize: 12,
                maxWidth: 520,
              }}
            >
              By joining or signing in, you agree to MatchTech&apos;s User
              <br />
              <Link
                href="/user-agreement"
                style={{ color: "var(--color-primary)", textDecoration: "none" }}
              >
                User Agreement
              </Link>
              ,{" "}
              <Link
                href="/privacy"
                style={{ color: "var(--color-primary)", textDecoration: "none" }}
              >
                Privacy Policy
              </Link>
              , and{" "}
              <Link
                href="/cookies"
                style={{ color: "var(--color-primary)", textDecoration: "none" }}
              >
                Cookie Policy
              </Link>
              .
            </Text>
          </Stack>

          {/* Right column: hero illustration using SwipeLayout */}
          <Stack
            justify="center"
            style={{ alignItems: "center" }}
          >
            <div
              style={{
                width: "100%",
                maxWidth: 520,
              }}
            >
              <SwipeCardDemo />
            </div>
          </Stack>
        </Grid>
      </Container>
    </Section>
  );
}

