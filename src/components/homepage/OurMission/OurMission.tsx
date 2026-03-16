"use client";

import { Container, Section, Card, CardBody, Heading, Text, Stack } from "@/components/ui";

export function OurMission() {
  return (
    <Section>
      <Container>
        <Stack gap={12} style={{ marginBottom: 12 }}>
          <Heading size="md" as="h2">
            Our Mission
          </Heading>
          <Text variant="bodySm">
            Connecting great talent with great companies.
          </Text>
        </Stack>

        <Card>
          <CardBody>
            <Stack gap={8}>
              <Heading size="md">Connecting great talent with great companies.</Heading>
              <Text variant="bodySm">
                We’re building a swipe-first hiring platform that reduces noise and helps both sides
                reach real conversations faster.
              </Text>
            </Stack>
          </CardBody>
        </Card>
      </Container>
    </Section>
  );
}

