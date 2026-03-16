"use client";

import { Container, Section, Grid, Card, CardBody, Heading, Text, Stack, Chip } from "@/components/ui";

export function HowItWorks() {
  return (
    <Section>
      <Container>
        <Stack gap={12} style={{ marginBottom: 12 }}>
          <Heading size="md" as="h2">
            How It Works
          </Heading>
          <Text variant="bodySm">
            Create a profile → Discover matches → Connect.
          </Text>
        </Stack>

        <Grid cols={3} stackOnMobile gap={18}>
          <Card>
            <CardBody>
              <Stack gap={10}>
                <Chip variant="primary">Step 1</Chip>
                <Heading size="md">Create a profile</Heading>
                <Text variant="bodySm">
                  Share your skills, preferences, and availability so we can tailor matches.
                </Text>
              </Stack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stack gap={10}>
                <Chip variant="primary">Step 2</Chip>
                <Heading size="md">Discover matches</Heading>
                <Text variant="bodySm">
                  Swipe through curated roles or candidates that fit what you’re looking for.
                </Text>
              </Stack>
            </CardBody>
          </Card>

          <Card>
            <CardBody>
              <Stack gap={10}>
                <Chip variant="primary">Step 3</Chip>
                <Heading size="md">Connect</Heading>
                <Text variant="bodySm">
                  When both sides say yes, it’s an instant match and you can start talking.
                </Text>
              </Stack>
            </CardBody>
          </Card>
        </Grid>
      </Container>
    </Section>
  );
}

