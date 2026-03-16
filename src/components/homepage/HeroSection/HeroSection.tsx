"use client";

import { Container, Section, Stack, Heading, Text, Button } from "@/components/ui";

export function HeroSection() {
  return (
    <Section>
      <Container>
        <Stack gap={24}>
          <Stack gap={8}>
            <Heading size="xl" as="h1">
              Swipe to your next role.
            </Heading>
            <Text variant="bodySm">
              MatchTech lets candidates and teams swipe on each other. When both sides say
              yes, it is an instant match.
            </Text>
            <Stack direction="row" gap={8} wrap>
              <Button>Browse roles</Button>
              <Button variant="secondary">I&apos;m hiring</Button>
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </Section>
  );
}

