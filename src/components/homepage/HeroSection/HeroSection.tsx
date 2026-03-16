"use client";

import Link from "next/link";
import { Container, Section, Stack, Heading, Text, Button, Grid } from "@/components/ui";
import { SwipeLayout } from "@/components/SwipeLayout";

export function HeroSection() {
  return (
    <Section
      style={{
        paddingTop: 80,
        paddingBottom: 80,
        marginTop: 40,
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
              <Link href="/register/job-seeker">
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
              <SwipeLayout />
            </div>
          </Stack>
        </Grid>
      </Container>
    </Section>
  );
}

