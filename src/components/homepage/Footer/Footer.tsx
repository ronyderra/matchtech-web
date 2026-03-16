"use client";

import { Container, Stack, Text } from "@/components/ui";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer style={{ borderTop: "1px solid var(--color-border)", marginTop: 32 }}>
      <Container>
        <Stack
          direction="row"
          align="center"
          justify="space-between"
          style={{ paddingTop: 8, paddingBottom: 8 }}
        >
          <Text variant="muted">© {year} MatchTech. All rights reserved.</Text>
          <Text variant="muted">Built for swipe-first hiring.</Text>
        </Stack>
      </Container>
    </footer>
  );
}

