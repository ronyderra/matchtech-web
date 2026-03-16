"use client";

import { Container, Section, Card, CardBody, Heading, Text, Stack } from "@/components/ui";

export function OurMission() {
  return (
    <Section title="Our Mission" description="Connecting great talent with great companies.">
      <Container>
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

